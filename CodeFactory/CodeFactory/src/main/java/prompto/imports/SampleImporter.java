package prompto.imports;

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
import java.util.function.Function;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import prompto.code.Dependency;
import prompto.code.ICodeStore;
import prompto.code.ImmutableCodeStore;
import prompto.code.Module;
import prompto.code.ModuleType;
import prompto.code.TextResource;
import prompto.code.WebLibrary;
import prompto.imports.populator.ModulePopulator;
import prompto.intrinsic.PromptoVersion;
import prompto.utils.Logger;
import prompto.utils.StreamUtils;
import prompto.value.ImageValue;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;

public class SampleImporter {

	static Logger logger = new Logger();

	Module module;
	PromptoVersion migrateFrom;
	URL imageResource;
	URL codeResource;
	URL stubResource;
	List<URLWithMimeType> javaScripts;
	List<URLWithMimeType> styleSheets;
	List<URLWithMimeType> resources;
	
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

	private void populateResources(URL moduleUrl, JsonNode descriptor) {
		imageResource = makeResourceUrlFromField(moduleUrl, descriptor, "imageResource");
		codeResource = makeResourceUrlFromField(moduleUrl, descriptor, "codeResource");
		stubResource = makeResourceUrlFromField(moduleUrl, descriptor, "stubResource");
		javaScripts = makeResourceUrlsWithMimeType(descriptor, "javaScripts", node -> this.makeResourceUrlWithMimeTypeFromTextualNode(moduleUrl, node, "text/javascript"));
		if(javaScripts==null) {
			URL nativeResource = makeResourceUrlFromField(moduleUrl, descriptor, "nativeResource");
			if(nativeResource != null)
				javaScripts = Collections.singletonList(new URLWithMimeType(nativeResource, "text/javascript"));
		}
		styleSheets = makeResourceUrlsWithMimeType(descriptor, "styleSheets", node -> this.makeResourceUrlWithMimeTypeFromTextualNode(moduleUrl, node, "text/css"));
		resources = makeResourceUrlsWithMimeType(descriptor, "resources", node -> this.makeResourceUrlWithMimeTypeFromObjectNode(moduleUrl, node));
	}

	private URL makeResourceUrlFromField(URL moduleUrl, JsonNode descriptor, String name) {
		JsonNode node = descriptor.get(name);
		if(node==null || !node.isTextual())
			return null;
		else
			return makeResourceUrlFromString(moduleUrl, node.asText());
	}
	
	private URL makeResourceUrlFromString(URL moduleUrl, String value) {
		try {
			if(value.startsWith("http"))
				return new URL(value);
			else
				return new URL(moduleUrl, value);
		} catch(MalformedURLException e) {
			throw new RuntimeException(e);
		}
	}

	private List<URLWithMimeType> makeResourceUrlsWithMimeType(JsonNode descriptor, String name, Function<JsonNode, URLWithMimeType> supplier) {
		JsonNode node = descriptor.get(name);
		if(node==null || !node.isArray())
			return null;
		return StreamSupport.stream(((ArrayNode)node).spliterator(), false)
				.map(supplier)
				.collect(Collectors.toList());
			
	}
	
	
	private URLWithMimeType makeResourceUrlWithMimeTypeFromTextualNode(URL moduleUrl, JsonNode node, String mimeType) {
		if(node==null || !node.isTextual())
			return null;
		else {
			URL url = makeResourceUrlFromString(moduleUrl, node.asText());
			return new URLWithMimeType(url, mimeType);
		}
	}
	
	
	private URLWithMimeType makeResourceUrlWithMimeTypeFromObjectNode(URL moduleUrl, JsonNode node) {
		if(node!=null && node.isObject()) {
			JsonNode mimeType = node.get("mimeType");
			if(mimeType!=null && mimeType.isTextual()) {
				URL url = makeResourceUrlFromField(moduleUrl, node, "url");
				return 	new URLWithMimeType(url, mimeType.asText());	
			}
		}
		return null;
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
			if(stubResource!=null && isLocalResource(stubResource)) 
				storeTextResource(codeStore, stubResource, "text/javascript");
			if(javaScripts!=null) 
				javaScripts.forEach(res -> storeTextResource(codeStore, res));
			if(styleSheets!=null) 
				styleSheets.forEach(res -> storeTextResource(codeStore, res));
			if(resources!=null) 
				resources.forEach(res -> storeTextResource(codeStore, res));
		}
	}

	private void storeAssociatedCode(ICodeStore codeStore) throws Exception {
		ImmutableCodeStore rcs = new ImmutableCodeStore(null, module.getType(), codeResource, module.getVersion());
		codeStore.storeDeclarations(rcs.getDeclarations(), rcs.getModuleDialect(), module.getDbId());
	}
	
	private void storeTextResource(ICodeStore codeStore, URLWithMimeType res) {
		try {
			if(isLocalResource(res.getUrl()))
				storeTextResource(codeStore, res.getUrl(), res.getMimeType());
		} catch(Exception e) {
			throw new RuntimeException(e);
		}
	}

	private boolean isLocalResource(URL resource) throws URISyntaxException {
		if("file".equals(resource.getProtocol()))
			return Paths.get(resource.toURI()).toFile().exists();
		else 
			return "jar".equals(resource.getProtocol());
	}

	private void storeTextResource(ICodeStore codeStore, URL resourceUrl, String mimeType) throws IOException, URISyntaxException {
		initializeJarFileSystem(resourceUrl.toURI());
		String fileName = Paths.get(resourceUrl.toURI()).getFileName().toString();
		String fullName = module.getName().toLowerCase().replaceAll(" ", "-") + "/" + fileName;
		TextResource resource = new TextResource();
		resource.setMimeType(mimeType);
		resource.setName(fullName);
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
