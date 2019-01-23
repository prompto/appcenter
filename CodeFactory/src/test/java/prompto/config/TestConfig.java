package prompto.config;

import static org.junit.Assert.assertEquals;

import java.io.InputStream;
import java.util.Collections;

import org.junit.Test;

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
}
