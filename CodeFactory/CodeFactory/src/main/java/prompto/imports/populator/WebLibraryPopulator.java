package prompto.imports.populator;

import java.util.Collections;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import com.fasterxml.jackson.databind.JsonNode;

import prompto.code.Module;
import prompto.code.WebLibrary;

@SuppressWarnings("deprecation") 
class WebLibraryPopulator extends LibraryPopulator {
	
	@Override
	public void populate(Module module, JsonNode descriptor) {
		super.populate(module, descriptor);
		WebLibrary library = (WebLibrary)module;
		library.setWidgetLibrary(readText(descriptor, "widgetLibrary"));
		library.setHtmlEngine(readText(descriptor, "htmlEngine"));
		library.setUiFramework(readText(descriptor, "uiFramework"));
		populateStubResource(descriptor, library);
		populateJavaScripts(descriptor, library);
		populateStyleSheets(descriptor, library);
		populateResources(descriptor, library);
	}
	
	void populateStubResource(JsonNode descriptor, WebLibrary library) {
		String resourceName = readText(descriptor, "stubResource");
		if(resourceName!=null)
			library.setStubResource(makeResourceURL(library, resourceName));
	}
	
	void populateJavaScripts(JsonNode descriptor, WebLibrary library) {
		List<String> values = readTextArray(descriptor, "javaScripts");
		if(values!=null && !values.isEmpty()) {
			values = values.stream().map(url -> makeResourceURL(library, url)).collect(Collectors.toList());
			library.setJavaScripts(values);
		} else {
			String nativeResource = readText(descriptor, "nativeResource");
			if(nativeResource instanceof String)
				library.setJavaScripts(Collections.singletonList(makeResourceURL(library, nativeResource)));
		}
	}
	
	void populateStyleSheets(JsonNode descriptor, WebLibrary library) {
		List<String> values = readTextArray(descriptor, "styleSheets");
		if(values!=null && !values.isEmpty()) {
			values = values.stream().map(url -> makeResourceURL(library, url)).collect(Collectors.toList());
			library.setStyleSheets(values);
		}
	}
	
	void populateResources(JsonNode descriptor, WebLibrary library) {
		JsonNode node = descriptor.get("resources");
		if(node!=null && node.isArray() && node.size()>0) {
			List<String> values = StreamSupport.stream(node.spliterator(), false)
					.map(child -> child.get("url"))
					.filter(Objects::nonNull)
					.filter(JsonNode::isTextual)
					.map(JsonNode::asText)
					.map(url -> makeResourceURL(library, url))
					.collect(Collectors.toList());
			library.setResources(values);
		}
	}

	private String makeResourceURL(WebLibrary library, String localUrl) {
		if(localUrl.startsWith("http"))
			return localUrl;
		else
			return library.getResourcePrefix() + "/" + localUrl;
	}


}