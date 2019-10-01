package prompto.config;

import static org.junit.Assert.*;

import java.io.InputStream;
import java.util.Collections;

import org.junit.Test;

import prompto.codefactory.Application;
import prompto.store.IStore;

public class TestConfig {

	@Test
	public void targetIsRead() {
		InputStream input = Thread.currentThread().getContextClassLoader().getResourceAsStream("home-prompto-apps.yml");
		IConfigurationReader reader = new YamlConfigurationReader(input);
		ICodeFactoryConfiguration config = new CodeFactoryConfiguration(reader, Collections.emptyMap());
		ITargetConfiguration target = config.getTargetConfiguration();
		assertEquals("PROMPTO-DATA", target.getDataStoreConfiguration().getDbName());
		assertEquals(8080, target.getPortRangeConfiguration().getMinPort());
		assertEquals(9090, target.getPortRangeConfiguration().getMaxPort());
	}
	
	@Test
	public void fetchesLoginStore() throws Throwable {
		InputStream input = Thread.currentThread().getContextClassLoader().getResourceAsStream("test-login-store.yml");
		IConfigurationReader reader = new YamlConfigurationReader(input);
		ICodeFactoryConfiguration config = new CodeFactoryConfiguration(reader, Collections.emptyMap());
		IStore store = Application.fetchLoginStore(config);
		assertNotNull(store);
	}
}
