package prompto.imports.populator;

import com.fasterxml.jackson.databind.JsonNode;

import prompto.code.Module;
import prompto.code.Service;

class ServicePopulator extends ModulePopulator {
	@Override
	public void populate(Module module, JsonNode descriptor) {
		super.populate(module, descriptor);
		((Service)module).setServerAboutToStartMethod(readText(descriptor, "serverAboutToStartMethod"));
	}
}