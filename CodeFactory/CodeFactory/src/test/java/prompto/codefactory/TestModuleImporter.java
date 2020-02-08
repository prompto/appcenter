package prompto.codefactory;

import static org.junit.Assert.*;

import java.io.IOException;
import java.util.Collections;

import org.junit.Before;
import org.junit.Test;

import prompto.code.BaseCodeStore;
import prompto.config.IRuntimeConfiguration;
import prompto.config.TempDirectories;
import prompto.expression.InstanceExpression;
import prompto.expression.MethodSelector;
import prompto.grammar.Argument;
import prompto.grammar.ArgumentList;
import prompto.grammar.Identifier;
import prompto.intrinsic.PromptoBinary;
import prompto.intrinsic.PromptoVersion;
import prompto.libraries.Libraries;
import prompto.param.CategoryParameter;
import prompto.runtime.ApplicationContext;
import prompto.runtime.Context;
import prompto.runtime.Mode;
import prompto.runtime.Standalone;
import prompto.runtime.Variable;
import prompto.statement.MethodCall;
import prompto.store.memory.MemStore;
import prompto.type.BlobType;
import prompto.utils.ResourceUtils;
import prompto.value.BlobValue;

public class TestModuleImporter {

	@Before
	public void before() throws Exception {
		TempDirectories.create();
		Mode.set(Mode.UNITTEST);
		Standalone.bootstrapCodeStore(new MemStore(), newRuntimeConfig());

	}
	
	private IRuntimeConfiguration newRuntimeConfig() {
		return new IRuntimeConfiguration.Inline()
			.withApplicationName("test")
			.withApplicationVersion(PromptoVersion.parse("1.0.0"))
			.withRuntimeLibs(()->Libraries.getPromptoLibraries(Libraries.class, BaseCodeStore.class, TestModuleImporter.class))
			.withRuntimeMode(Mode.UNITTEST);
	}
	
	@Test
	public void tripGuruModulIsImported() throws Exception {
		BlobValue blob = getResourceAsBlob("modules/TripGuru.zip");
		assertNotNull(blob);
		Identifier blobId = new Identifier("blob");
		Context context = ApplicationContext.get().newLocalContext();
		context.registerValue(new Variable(blobId, BlobType.instance()));
		context.setValue(blobId, blob);
		Argument argument = new Argument(new CategoryParameter(BlobType.instance(), blobId), new InstanceExpression(blobId));
		ArgumentList arguments = new ArgumentList(Collections.singletonList(argument));
		MethodSelector selector = new MethodSelector(new Identifier("importModule"));
		MethodCall call = new MethodCall(selector, arguments);
		call.interpret(context);	
	}

	private BlobValue getResourceAsBlob(String path) throws IOException {
		byte[] bytes = ResourceUtils.getResourceAsBytes(path);
		PromptoBinary binary = new PromptoBinary("application/zip", bytes);
		return new BlobValue(binary);
	}

}
