package prompto.imports.populator;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ArrayNode;

import prompto.code.Dependency;
import prompto.code.Module;
import prompto.code.ModuleStatus;
import prompto.intrinsic.PromptoVersion;

public class ModulePopulator {
	
	/* would fit better with ModuleType, but let's avoid uncontrolled growth of Core, which knows nothing about descriptors */
	public static ModulePopulator forType(Module module) throws Exception {
		String packageName = ModulePopulator.class.getPackage().getName();
		String className = module.getType().getModuleClass().getSimpleName() + "Populator";
		Class<?> klass = Class.forName(packageName + "." + className);
		return (ModulePopulator)klass.getDeclaredConstructor().newInstance();
	}

	public void populate(Module module, JsonNode descriptor) {
		module.setName(readText(descriptor, "name"));
		module.setVersion(PromptoVersion.parse(readText(descriptor, "version")));
		module.setDescription(readText(descriptor, "description"));
		String value = readText(descriptor, "moduleStatus");
		ModuleStatus moduleStatus = value==null ? ModuleStatus.PROVIDED : ModuleStatus.valueOf(value);
		module.setModuleStatus(moduleStatus);
		JsonNode dependencies = descriptor.get("dependencies");
		if(dependencies!=null)
			module.setDependencies(populateDependencies(dependencies));
	}

	protected String readText(JsonNode descriptor, String fieldName) {
		JsonNode child = descriptor.get(fieldName);
		if(child==null || !child.isTextual())
			return null;
		else
			return child.asText();
	}

	protected List<String> readTextArray(JsonNode descriptor, String fieldName) {
		JsonNode child = descriptor.get(fieldName);
		if(child==null || !child.isArray())
			return null;
		else
			return StreamSupport.stream(((ArrayNode)child).spliterator(), false)
				.filter(node -> node.isTextual())
				.map(node -> node.asText())
				.collect(Collectors.toList());
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
	
	
}
