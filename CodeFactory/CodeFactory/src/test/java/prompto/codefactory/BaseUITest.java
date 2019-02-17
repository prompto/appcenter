package prompto.codefactory;

import org.junit.AfterClass;
import org.junit.BeforeClass;

import prompto.codefactory.Application;
import prompto.runtime.Mode;
import prompto.server.AppServer;
import prompto.server.BaseWebTest;

public abstract class BaseUITest extends BaseWebTest {

	@BeforeClass
	public static void startCodeServer() throws Throwable {
		String[] args = {
				"-yamlConfigFile",
				"test-local.yml"
		};
		Application.main(args, Mode.UNITTEST);
		HTTP_PORT = (int)AppServer.getHttpPort();
	}
	
	@AfterClass
	public static void stopCodeServer() throws Exception {
		AppServer.stop();
	}
	
	
	public static int HTTP_PORT;

}
