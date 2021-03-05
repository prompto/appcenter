package prompto.codefactory;

import java.io.IOException;
import java.net.URL;
import java.util.Arrays;
import java.util.Collection;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import prompto.code.BaseCodeStore;
import prompto.code.Dependency;
import prompto.code.ICodeStore;
import prompto.code.ImmutableCodeStore;
import prompto.code.Library;
import prompto.code.Module;
import prompto.code.ModuleStatus;
import prompto.code.QueryableCodeStore;
import prompto.config.CodeFactoryConfiguration;
import prompto.config.ICodeFactoryConfiguration;
import prompto.config.IConfigurationReader;
import prompto.config.IPortRangeConfiguration;
import prompto.config.IStoreConfiguration;
import prompto.config.ITargetConfiguration;
import prompto.config.auth.IAuthenticationConfiguration;
import prompto.config.auth.source.IAuthenticationSourceConfiguration;
import prompto.config.auth.source.IStoredAuthenticationSourceConfiguration;
import prompto.declaration.CategoryDeclaration;
import prompto.grammar.Identifier;
import prompto.imports.SampleImporter;
import prompto.intrinsic.PromptoVersion;
import prompto.libraries.Libraries;
import prompto.runtime.ApplicationContext;
import prompto.runtime.Context;
import prompto.runtime.Mode;
import prompto.runtime.Standalone;
import prompto.server.AppServer;
import prompto.server.DataServlet;
import prompto.store.AttributeInfo;
import prompto.store.DataStore;
import prompto.store.IQueryBuilder;
import prompto.store.IStore;
import prompto.store.IStoreFactory;
import prompto.store.IStored;
import prompto.store.IStoredIterable;
import prompto.store.memory.MemStore;
import prompto.store.IQueryBuilder.MatchOp;
import prompto.store.IStorable.IDbIdFactory;
import prompto.store.IStorable;
import prompto.utils.CmdLineParser;
import prompto.utils.Logger;
import prompto.utils.ResourceUtils;

public class Application {

	static Logger logger = new Logger();
	static ICodeFactoryConfiguration config;
	
	public static void main(String[] args) throws Throwable {
		main(args, null);
	}
	
	public static void main(String[] args, Mode runtimeMode) throws Throwable {
		ICodeFactoryConfiguration config = loadConfiguration(args);
		config = adjustConfiguration(config, runtimeMode);
		main(config);
	}
	
	public static void main(ICodeFactoryConfiguration config) throws Throwable {
		Application.config = config;
		AppServer.main(config, Application::migrateDataModelIfRequired, null, null, Application::init); 
	}
	
	public static ICodeFactoryConfiguration loadConfiguration(String[] args) throws Exception {
		Map<String, String> argsMap = CmdLineParser.read(args);
		IConfigurationReader reader = Standalone.readerFromArgs(argsMap);
		ICodeFactoryConfiguration config = new CodeFactoryConfiguration(reader, argsMap);
		return config.withRuntimeLibs(()->Libraries.getPromptoLibraries(Libraries.class, AppServer.class, BaseCodeStore.class));
	}

	public static ICodeFactoryConfiguration adjustConfiguration(ICodeFactoryConfiguration config, Mode runtimeMode) throws Exception {
		config = config.withServerAboutToStartMethod("serverAboutToStart")
				.withHttpConfiguration(config.getHttpConfiguration()
						.withWelcomePage("/projects/index.page")
						.withSendsXAuthorization(true))
				.withApplicationName("CodeFactory")
				.withApplicationVersion(PromptoVersion.LATEST)
				.withResourceURLs(Application.getResourceURLs());
		if(runtimeMode!=null)
			config = config.withRuntimeMode(runtimeMode);
		return config;
	}
	
	
	private static void init(ICodeFactoryConfiguration config) {
		initDataServletStores(config);
		initModuleProcessPortRange(config);
	}
	
	private static void migrateDataModelIfRequired() {
		migrateStuffsToResourcesIfRequired();
	}

	private static void migrateStuffsToResourcesIfRequired() {
		// migrate this factory if required
		IStore codeStore = storeFromCodeStore();
		if(migratableStore(codeStore) && isMigratingStuffsToResourcesRequired(codeStore, codeStore))
			migrateStuffsToResources(codeStore);
		// migrate projects if required
		IStore dataStore = DataStore.getInstance();
		if(migratableStore(dataStore) && isMigratingStuffsToResourcesRequired(codeStore, dataStore))
			migrateStuffsToResources(dataStore);
	}
	
	private static boolean migratableStore(IStore store) {
		return store!=null && !(store instanceof MemStore);
	}

	private static IStore storeFromCodeStore() {
		ICodeStore codeStore = ICodeStore.getInstance();
		if(codeStore instanceof QueryableCodeStore)
			return ((QueryableCodeStore)codeStore).getStore();
		else
			return null;
	}

	private static boolean isMigratingStuffsToResourcesRequired(IStore codeStore, IStore dataStore) {
		// does the data store contain any "Stuff"
		IQueryBuilder builder = dataStore.newQueryBuilder()
				.verify(AttributeInfo.CATEGORY, MatchOp.HAS, "Stuff");
		IStored stored = dataStore.fetchOne(builder.build());
		if(stored==null)
			return false;
		// does the code store supportNamedResource
		builder = codeStore.newQueryBuilder()
				.verify(AttributeInfo.NAME, MatchOp.EQUALS, "NamedResource");
		stored = codeStore.fetchOne(builder.build());
		return stored!=null;
	}

	private static void migrateStuffsToResources(IStore store) {
		logger.info(()->"Migrating Stuff records to Resource records...");
		// fetch all the "Stuff"
		IQueryBuilder builder = store.newQueryBuilder()
				.verify(AttributeInfo.CATEGORY, MatchOp.HAS, "Stuff");
		IStoredIterable stuffs = store.fetchMany(builder.build());
		logger.info(()->"Found " + stuffs.count() + " Stuff records to migrate");
		for(IStored stuff : stuffs)
			migrateStuffToResource(store, stuff);
		logger.info(()->"Done migrating Stuff records");
	}

	private static void migrateStuffToResource(IStore store, IStored stuff) {
		String[] oldCategories = stuff.getCategories();
		String category = oldCategories[oldCategories.length - 1];
		Context context = ApplicationContext.get();
		CategoryDeclaration decl = context.getRegisteredDeclaration(CategoryDeclaration.class, new Identifier(category));
		List<String> newCategories = decl.collectCategories(context);
		IStorable storable = store.newStorable(newCategories, new IDbIdFactory() {
			@Override public void accept(Object t) { }
			@Override public Object get() { return stuff.getDbId(); }
			@Override public boolean isUpdate() { return true; }
		});
		// force dirty
		storable.setData("category", newCategories);
		store.store(storable);
	}

	private static void initModuleProcessPortRange(ICodeFactoryConfiguration config) {
		try {
			ITargetConfiguration target = config.getTargetConfiguration();
			if(target!=null) {
				IPortRangeConfiguration portRange = target.getPortRangeConfiguration();
				if(portRange!=null) {
					logger.info(()->"Target port range is " + portRange.getMinPort() + " to " + portRange.getMaxPort());
					ModuleProcess.portRangeConfiguration = portRange;
				}
			}
		} catch(Throwable t) {
			throw new RuntimeException(t);
		}		
	}

	private static void initDataServletStores(ICodeFactoryConfiguration config) {
		try {
			Map<String, IStore> stores = new HashMap<>();
			IStore store = fetchLoginStore(config);
			if(store!=null)
				stores.put("LOGIN", store);
			store = DataStore.getInstance();
			if(store!=null)
				stores.put("APPS", store);
			store = readTargetStoreConfiguration(config);
			if(store!=null)
				stores.put("DATA", store);
			DataServlet.setStores(stores);
		} catch(Throwable t) {
			throw new RuntimeException(t);
		}
	}

	private static IStore readTargetStoreConfiguration(ICodeFactoryConfiguration config) throws Throwable {
		ITargetConfiguration target = config.getTargetConfiguration();
		return target == null ? null : newStore(target.getDataStoreConfiguration());
	}

	public static IStore fetchLoginStore(ICodeFactoryConfiguration config) throws Throwable {
		IAuthenticationConfiguration auth = config.getHttpConfiguration()
			.getAuthenticationConfiguration();
		return auth==null ? null : fetchLoginStore(auth);
	}

	private static IStore fetchLoginStore(IAuthenticationConfiguration config) throws Throwable {
		IAuthenticationSourceConfiguration source = config.getAuthenticationSourceConfiguration();
		if(source instanceof IStoredAuthenticationSourceConfiguration)
			return newStore(((IStoredAuthenticationSourceConfiguration)source).getStoreConfiguration());
		else
			return null;
	}

	private static IStore newStore(IStoreConfiguration config) throws Throwable {
		if(config==null)
			return null;
		else {
			IStoreFactory factory = IStoreFactory.newStoreFactory(config.getFactory());
			return factory.newStore(config);
		}
	}

	private static URL[] getResourceURLs() {
		Collection<URL> urls = Libraries.getPromptoLibraries(BaseCodeStore.class, Application.class);
		return urls.toArray(new URL[urls.size()]);
	}

	public static void createLibraries() {
		try {
			ICodeStore codeStore = codeStoreUsingDataStore();
			createResourceLibraries(codeStore, "thesaurus/", "react-file-uploader/", "react-bootstrap-3/", "react-bootstrap-4/");
			if(isSeedDataStore()) {
				createResourceLibraries(codeStore, "resource-editors/");
				createSeedLibraries(codeStore);
			}
		} catch(Throwable t) {
			t.printStackTrace();
		}
	}
	
	
	private static void createResourceLibraries(ICodeStore codeStore, String ... resources) throws Exception {
		for(String resource : resources) {
			createResourceLibrary(codeStore, resource);
		}
	}

	private static void createResourceLibrary(ICodeStore codeStore, String resource) throws Exception {
		URL url = Thread.currentThread().getContextClassLoader().getResource("libraries/" + resource);
		doImportModule(codeStore, url);
	}

	private static ICodeStore codeStoreUsingDataStore() {
		ICodeStore runtime = ImmutableCodeStore.bootstrapRuntime(()->Libraries.getPromptoLibraries(Libraries.class, AppServer.class));
		return new QueryableCodeStore(DataStore.getInstance(), runtime, null, null, null);
	}

	private static void doImportModule(ICodeStore codeStore, URL url) throws Exception {
		SampleImporter importer = new SampleImporter(url);
		importer.importModule(codeStore);
	}

	public static void importSamples(String root) throws IOException {
		Collection<URL> samples = ResourceUtils.listResourcesAt(root, null);
		samples.forEach(Application::importSample);
	}
	
	public static void importSample(String name) {
		importSample(Thread.currentThread().getContextClassLoader().getResource(name));
	}
	
	public static void importSample(URL sample) {
		try {
			ICodeStore codeStore = codeStoreUsingDataStore();
			doImportModule(codeStore, sample);
		} catch(Throwable t) {
			t.printStackTrace();
		}
	}
	

	private static void createSeedLibraries(ICodeStore codeStore) throws Exception {
		PromptoVersion version = PromptoVersion.parse("1.0.0.0");
		createSeedLibrary(codeStore, "CodeStore", "Code store model", version, "libraries/CodeStore.pec");
		createSeedLibrary(codeStore, "AppStore", "App store model", version, "libraries/AppStore.pec", new Dependency("CodeStore", version));
	}
	
	private static void createSeedLibrary(ICodeStore codeStore, String name, String description, PromptoVersion version, String resource, Dependency ...dependencies ) throws Exception {
		Module library = new Library();
		library.setName(name);
		library.setDescription(description);
		library.setVersion(version);
		library.setModuleStatus(ModuleStatus.PROVIDED);
		if(dependencies!=null && dependencies.length>0)
			library.setDependencies(Arrays.asList(dependencies));
		URL url = Thread.currentThread().getContextClassLoader().getResource(resource);
		SampleImporter importer = new SampleImporter(library, url);
		importer.importModule(codeStore);
	}

	private static boolean isSeedDataStore() {
		final Set<String> names = new HashSet<>(Arrays.asList("tools", "factory-ide"));
		return names.contains(config.getDataStoreConfiguration().getDbName().toLowerCase());
	}




}
