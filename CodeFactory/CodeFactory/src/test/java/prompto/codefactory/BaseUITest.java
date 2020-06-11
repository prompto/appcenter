package prompto.codefactory;

import org.junit.AfterClass;
import org.junit.BeforeClass;

import prompto.codefactory.Application;
import prompto.config.ICodeFactoryConfiguration;
import prompto.libraries.Libraries;
import prompto.runtime.Mode;
import prompto.server.AppServer;
import prompto.server.BaseWebTest;

public abstract class BaseUITest extends BaseWebTest {

	@BeforeClass
	public static void startCodeServer() throws Throwable {
		String[] args = {
				"-yamlConfigFile",
				"config/test-local.yml"
		};
		ICodeFactoryConfiguration config = Application.loadConfiguration(args);
		config = Application.adjustConfiguration(config, Mode.UNITTEST)
				.withCodeStoreConfiguration(null) // code store is not populated, so override runtime libs
				.withRuntimeLibs(()->Libraries.getPromptoLibraries(Libraries.class, AppServer.class, TestYamlLocal.class));
		Application.main(config);
		HTTP_PORT = (int)AppServer.getHttpPort();
	}
	
	@AfterClass
	public static void stopCodeServer() throws Exception {
		AppServer.stop();
	}
	
	
	public static int HTTP_PORT;

}
