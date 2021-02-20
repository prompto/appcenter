package prompto.codefactory;

import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.URL;
import java.nio.file.FileSystemNotFoundException;
import java.nio.file.Paths;
import java.nio.file.spi.FileSystemProvider;
import java.time.OffsetDateTime;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import prompto.code.Dependency;
import prompto.code.ICodeStore;
import prompto.code.ImmutableCodeStore;
import prompto.code.Module;
import prompto.code.ModuleType;
import prompto.code.TextResource;
import prompto.code.WebLibrary;
import prompto.intrinsic.PromptoVersion;
import prompto.utils.Logger;
import prompto.utils.StreamUtils;
import prompto.value.ImageValue;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

public class SampleImporter {

	static Logger logger = new Logger();

	Module module;
	PromptoVersion migrateFrom;
	URL imageResource;
	URL codeResource;
	URL nativeResource;
	URL stubResource;
	
	public SampleImporter(Module module, URL codeResource) {
		this.module = module;
		this.codeResource = codeResource;
	}
	
	public SampleImporter(String resourcePath) {
		this(Thread.currentThread().getContextClassLoader().getResource(resourcePath));
	}
	
	public SampleImporter(URL url) {
		try {
			JsonNode descriptor = readDescriptor(url);
			Module module = newModule(descriptor);
			populateModule(module, descriptor);
			populateResources(url, descriptor);
			populateMigrateFrom(descriptor);
			// done
			this.module = module;
		} catch(Exception e) {
			e.printStackTrace(System.err);
		}
	}

	private void populateMigrateFrom(JsonNode descriptor) {
		if(descriptor.get("migrateFrom")!=null)
			this.migrateFrom = PromptoVersion.parse(descriptor.get("migrateFrom").asText());
	}

	private void populateResources(URL url, JsonNode descriptor) throws MalformedURLException {
		this.imageResource = makeResourceURL(url, descriptor, "imageResource");
		this.codeResource = makeResourceURL(url, descriptor, "codeResource");
		this.nativeResource = makeResourceURL(url, descriptor, "nativeResource");
		this.stubResource = makeResourceURL(url, descriptor, "stubResource");
	}

	private URL makeResourceURL(URL url, JsonNode descriptor, String name) throws MalformedURLException {
		if(descriptor.get(name)==null)
			return null;
		String value = descriptor.get(name).asText();
		if(value.startsWith("http"))
			return new URL(value);
		else
			return new URL(url, value);
	}

	private void populateModule(Module module, JsonNode descriptor) throws Exception {
		ModulePopulator populator = ModulePopulator.forType(module);
		populator.populate(module, descriptor);
	}
	
	

	private Module newModule(JsonNode descriptor) throws InstantiationException, IllegalAccessException {
		String typeName = descriptor.get("type").asText();
		ModuleType type = ModuleType.valueOf(typeName);
		return type.getModuleClass().newInstance();
	}

	private JsonNode readDescriptor(URL path) throws JsonProcessingException, IOException {
		URL json = new URL(path, "module.json");
		try(InputStream input = json.openStream()) {
			return new ObjectMapper().readTree(input);
		}
	}

	public boolean importModule(ICodeStore codeStore) throws Exception {
		Module existing = codeStore.fetchVersionedModule(module.getType(), module.getName(), module.getVersion());
		if(existing!=null)
			return false;
		createModule(codeStore);
		List<Module> toMigrate = fetchModulesToMigrate(codeStore);
		return migrateModules(codeStore, toMigrate);
	}

	private List<Module> fetchModulesToMigrate(ICodeStore codeStore) {
		if(migrateFrom==null)
			return null;
		else
			return StreamSupport.stream(codeStore.fetchAllModules().spliterator(), false)
					.filter(m->m.getName().equals(module.getName()))
					.filter(m->m.getVersion().asInt() >= migrateFrom.asInt())
					.filter(m->m.getVersion().asInt() < module.getVersion().asInt())
					.collect(Collectors.toList());
	}

	private boolean migrateModules(ICodeStore codeStore, List<Module> toMigrate) throws Exception {
		if(toMigrate!=null) for(Module existing : toMigrate) {
			updateDependencies(codeStore, existing.getVersion());
			codeStore.dropModule(existing);
		}
		return true;
	}

	private void updateDependencies(ICodeStore codeStore, PromptoVersion minVersion) {
		StreamSupport.stream(codeStore.fetchAllModules().spliterator(), false)
			.filter(m->m.hasDependency(module.getName()))
			.forEach(m->{
				Dependency d = m.getDependency(module.getName());
				if(d.getVersion().asInt() >= minVersion.asInt() && d.getVersion().asInt()<module.getVersion().asInt()) {
					d.setVersion(module.getVersion());
					codeStore.storeDependency(d);
				}
			});
	}

	private void createModule(ICodeStore codeStore) throws Exception {
		logger.info(()->"Importing module: " + module.getName() + " - " + module.getVersion());
		if(imageResource!=null)
			module.setImage(ImageValue.fromURL(imageResource).getStorableData());
		codeStore.storeModule(module);	
		if(codeResource!=null)
			storeAssociatedCode(codeStore);
		if(module instanceof WebLibrary) {
			if(nativeResource!=null && isLocalResource(nativeResource)) 
				storeResource(codeStore, nativeResource);
			if(stubResource!=null && isLocalResource(stubResource)) 
				storeResource(codeStore, stubResource);
		}
	}

	private void storeAssociatedCode(ICodeStore codeStore) throws Exception {
		ImmutableCodeStore rcs = new ImmutableCodeStore(null, module.getType(), codeResource, module.getVersion());
		codeStore.storeDeclarations(rcs.getDeclarations(), rcs.getModuleDialect(), module.getVersion(), module.getDbId());
	}
	
	private boolean isLocalResource(URL resource) throws URISyntaxException {
		if("file".equals(resource.getProtocol()))
			return Paths.get(resource.toURI()).toFile().exists();
		else 
			return "jar".equals(resource.getProtocol());
	}

	private void storeResource(ICodeStore codeStore, URL resourceUrl) throws Exception {
		initializeJarFileSystem(resourceUrl.toURI());
		String fileName = Paths.get(resourceUrl.toURI()).getFileName().toString();
		String fullName = module.getName().toLowerCase().replaceAll(" ", "-") + "/" + fileName;
		TextResource resource = new TextResource();
		resource.setMimeType("text/javascript");
		resource.setName(fullName);
		resource.setVersion(PromptoVersion.LATEST);
		resource.setLastModified(OffsetDateTime.now());
		resource.setBody(StreamUtils.readString(resourceUrl));
		codeStore.storeResource(resource, module.getDbId());
	}

	private void initializeJarFileSystem(URI uri) throws IOException {
		if("jar".equals(uri.getScheme())) {
		  for (FileSystemProvider provider: FileSystemProvider.installedProviders()) {
		        if (provider.getScheme().equalsIgnoreCase("jar")) {
		            try {
		                provider.getFileSystem(uri);
		            } catch (FileSystemNotFoundException e) {
		                // in this case we need to initialize it first:
		                provider.newFileSystem(uri, Collections.emptyMap());
		            }
		        }
		    }
		}
	}

}
