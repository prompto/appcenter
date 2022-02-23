package prompto.config;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

import java.util.Collections;

import org.junit.Test;

import prompto.codefactory.Application;
import prompto.store.IStore;

public class TestConfig {

	@Test
	public void targetIsRead() throws Throwable {
		try(var input = Thread.currentThread().getContextClassLoader().getResourceAsStream("configs-saved/home-factory-dev-factory-apps-apps.yml")) {
			IConfigurationReader reader = new YamlConfigurationReader(input);
			ICodeFactoryConfiguration config = new CodeFactoryConfiguration(reader, Collections.emptyMap());
			ITargetConfiguration target = config.getTargetConfiguration();
			assertEquals("APPS", target.getDataStoreConfiguration().getDbName());
			assertEquals(8080, target.getPortRangeConfiguration().getMinPort());
			assertEquals(9090, target.getPortRangeConfiguration().getMaxPort());
		}
	}
	
	@Test
	public void fetchesLoginStore() throws Throwable {
		try(var input = Thread.currentThread().getContextClassLoader().getResourceAsStream("configs/test-login-store.yml")) {
			IConfigurationReader reader = new YamlConfigurationReader(input);
			ICodeFactoryConfiguration config = new CodeFactoryConfiguration(reader, Collections.emptyMap());
			IStore store = Application.fetchLoginStore(config);
			assertNotNull(store);
		}
	}
}
