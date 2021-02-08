package prompto.codefactory;

import static org.junit.Assert.*;

import java.net.URL;

import org.junit.Test;
import org.junit.experimental.categories.Category;

import de.flapdoodle.embed.mongo.MongodExecutable;
import prompto.config.ICodeFactoryConfiguration;
import prompto.libraries.Libraries;
import prompto.runtime.Mode;
import prompto.server.AppServer;
import prompto.store.mongo.BaseMongoTest;
import prompto.utils.ManualTests;

@Category(ManualTests.class)
public class TestYamlLocal {

	@Test
	public void testThatCodeServerRunsWithYamlLocal() throws Throwable {
		MongodExecutable mongo = BaseMongoTest.startMongo(27017);
		try {
			URL url = Thread.currentThread().getContextClassLoader().getResource("configs/local-mongo.yml");
			String[] args = new String[] { "-yamlConfigFile", url.getFile() };
			ICodeFactoryConfiguration config = Application.loadConfiguration(args);
			config = Application.adjustConfiguration(config, Mode.UNITTEST);
			// code store is not populated, so override runtime libs
			config = config.withRuntimeLibs(()->Libraries.getPromptoLibraries(Libraries.class, AppServer.class, TestYamlLocal.class));
			Application.main(config);
			assertTrue(AppServer.isStarted());
			assertEquals(8000, ModuleProcess.portRangeConfiguration.getMinPort());
			assertEquals(9000, ModuleProcess.portRangeConfiguration.getMaxPort());
		} finally {
			BaseMongoTest.stopMongo(mongo);
		}
	}
	
}
