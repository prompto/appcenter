package prompto.imports.populator;

import com.fasterxml.jackson.databind.JsonNode;

import prompto.code.Batch;
import prompto.code.Module;

class BatchPopulator extends ApplicationPopulator {

	@Override
	public void populate(Module module, JsonNode descriptor) {
		super.populate(module, descriptor);
		((Batch)module).setStartMethod(readText(descriptor, "startMethod"));
	}
}