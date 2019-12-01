package prompto.codefactory;

import java.util.ArrayList;
import java.util.List;
import java.util.function.Consumer;

import com.fasterxml.jackson.databind.JsonNode;

import prompto.code.Batch;
import prompto.code.Dependency;
import prompto.code.Module;
import prompto.code.Service;
import prompto.code.WebLibrary;
import prompto.intrinsic.PromptoVersion;

public class ModulePopulator {
	
	/* would fit better with ModuleType, but let's avoid uncontrolled growth of Core, which knows nothing about descriptors */
	public static ModulePopulator forType(Module module) throws Exception {
		String className = ModulePopulator.class.getName() + "$" + module.getType().getModuleClass().getSimpleName() + "Populator";
		Class<?> klass = Class.forName(className);
		return (ModulePopulator)klass.newInstance();
	}

	public void populate(Module module, JsonNode descriptor) {
		module.setName(readText(descriptor, "name"));
		module.setVersion(PromptoVersion.parse(readText(descriptor, "version")));
		module.setDescription(readText(descriptor, "description"));
		JsonNode dependencies = descriptor.get("dependencies");
		if(dependencies!=null)
			module.setDependencies(populateDependencies(dependencies));
	}

	protected String readText(JsonNode descriptor, String fieldName) {
		JsonNode child = descriptor.get(fieldName);
		if(child==null)
			return null;
		else
			return child.asText();
	}

	protected List<Dependency> populateDependencies(JsonNode descriptor) {
		List<Dependency> items = new ArrayList<>();
		for(JsonNode node : descriptor) {
			Dependency item = new Dependency();
			item.setName(readText(node, "name"));
			item.setVersion(PromptoVersion.parse(readText(node, "version")));
			items.add(item);
		}
		return items;
	}

	static class LibraryPopulator extends ModulePopulator {
		
	}
	
	static class ThesaurusPopulator extends LibraryPopulator {
		
	}
	
	static class WebLibraryPopulator extends LibraryPopulator {
		
		@Override
		public void populate(Module module, JsonNode descriptor) {
			super.populate(module, descriptor);
			WebLibrary library = (WebLibrary)module;
			library.setWidgetLibrary(readText(descriptor, "widgetLibrary"));
			library.setHtmlEngine(readText(descriptor, "htmlEngine"));
			library.setUIFramework(readText(descriptor, "uiFramework"));
			setResource(descriptor, "nativeResource", library.getName(), library::setNativeResource);
			setResource(descriptor, "stubResource", library.getName(), library::setStubResource);
		}
		
		void setResource(JsonNode descriptor, String fieldName, String moduleName, Consumer<String> setter) {
			String resourceName = readText(descriptor, fieldName);
			if(resourceName!=null) {
				String fullName = moduleName.toLowerCase().replaceAll(" ", "-") + "/" + resourceName;
				setter.accept(fullName);
			}
		}
	}
	
	static abstract class ApplicationPopulator extends ModulePopulator {
		
	}
	
	static class BatchPopulator extends ApplicationPopulator {

		@Override
		public void populate(Module module, JsonNode descriptor) {
			super.populate(module, descriptor);
			((Batch)module).setStartMethod(readText(descriptor, "startMethod"));
		}
	}

	static class ServicePopulator extends ModulePopulator {
		@Override
		public void populate(Module module, JsonNode descriptor) {
			super.populate(module, descriptor);
			((Service)module).setServerAboutToStartMethod(readText(descriptor, "serverAboutToStartMethod"));
		}
	}
	
	static class WebSitePopulator extends ServicePopulator {
		
	}
	
	
}
