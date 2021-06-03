package prompto.codefactory;

import static org.junit.Assert.*;

import java.io.IOException;
import java.net.URL;
import java.util.Collection;
import java.util.Map;
import java.util.function.Supplier;

import org.junit.Test;

import com.esotericsoftware.yamlbeans.YamlException;
import com.esotericsoftware.yamlbeans.document.YamlMapping;
import com.fasterxml.jackson.databind.JsonNode;

import prompto.code.BaseCodeStore;
import prompto.config.ICodeFactoryConfiguration;
import prompto.config.IDebugConfiguration;
import prompto.config.IHttpConfiguration;
import prompto.config.IRuntimeConfiguration;
import prompto.config.ISecretKeyConfiguration;
import prompto.config.IServerConfiguration;
import prompto.config.IStoreConfiguration;
import prompto.config.ITargetConfiguration;
import prompto.config.mongo.IMongoReplicaSetConfiguration;
import prompto.config.mongo.IMongoStoreConfiguration;
import prompto.intrinsic.PromptoVersion;
import prompto.libraries.Libraries;
import prompto.runtime.Mode;
import prompto.runtime.Standalone;
import prompto.server.AppServer;
import prompto.store.mongo.BaseMongoTest;
import prompto.store.mongo.MongoStoreFactory;

public class TestFactoryUpgrader extends BaseMongoTest {

	@Test
	public void fetchesReleaseData() throws IOException {
		JsonNode node = FactoryUpgrader.fetchFactoryRelease(PromptoVersion.parse("v0.0.250"));
		assertEquals("https://api.github.com/repos/prompto/prompto-factory/releases/40635522", node.get("url").asText());
	}
	
	@Test
	public void fetchesPromptoDownloadCodeUrl() throws IOException {
		String url = FactoryUpgrader.fetchPromptoCodeDownloadUrl(PromptoVersion.parse("v0.0.250"));
		assertEquals("https://github.com/prompto/prompto-factory/releases/download/v0.0.250/factory.tar.gz", url);
	}
	
	@Test
	public void upgradesFactory() throws Throwable {
		ICodeFactoryConfiguration config = newMinimalCodeStoreConfig();
		Standalone.initialize(config);
		Application.config = config;
		PromptoVersion version = PromptoVersion.parse("v0.0.250");
		FactoryUpgrader.upgradeTo(version);
		assertEquals(version, FactoryUpgrader.getStoredFactoryVersion());
	}

	private ICodeFactoryConfiguration newMinimalCodeStoreConfig() {
		return new ICodeFactoryConfiguration() {

			@Override
			public IHttpConfiguration getHttpConfiguration() {
				// TODO Auto-generated method stub
				return null;
			}

			@Override
			public String getServerAboutToStartMethod() {
				// TODO Auto-generated method stub
				return null;
			}

			@Override
			public String getWebSiteRoot() {
				// TODO Auto-generated method stub
				return null;
			}

			@Override
			public boolean useConsole() {
				return true;
			}

			@Override
			public <T extends IServerConfiguration> T withServerAboutToStartMethod(String method) {
				// TODO Auto-generated method stub
				return null;
			}

			@Override
			public <T extends IServerConfiguration> T withHttpConfiguration(IHttpConfiguration config) {
				// TODO Auto-generated method stub
				return null;
			}
			
			@Override
			public <T extends IServerConfiguration> T withUseConsole(boolean set) {
				// TODO Auto-generated method stub
				return null;
			}
			

			@Override
			public Supplier<Collection<URL>> getRuntimeLibs() {
				return () -> Libraries.getPromptoLibraries(Libraries.class, AppServer.class, BaseCodeStore.class);
			}

			@Override
			public IStoreConfiguration getCodeStoreConfiguration() {
				return new IMongoStoreConfiguration() {

					@Override
					public String getFactory() {
						return MongoStoreFactory.class.getName();
					}

					@Override
					public String getHost() {
						return "localhost";
					}

					@Override
					public Integer getPort() {
						return mongoPort;
					}

					@Override
					public String getDbName() {
						return "FACTORY";
					}

					@Override
					public String getUser() {
						return null;
					}

					@Override
					public ISecretKeyConfiguration getSecretKeyConfiguration() {
						return null;
					}

					@Override
					public IStoreConfiguration withDbName(String dbName) {
						return this;
					}

					@Override
					public String getReplicaSetURI() {
						// TODO Auto-generated method stub
						return null;
					}

					@Override
					public IMongoStoreConfiguration withReplicaSetURI(String uri) {
						// TODO Auto-generated method stub
						return null;
					}

					@Override
					public IMongoReplicaSetConfiguration getReplicaSetConfiguration() {
						// TODO Auto-generated method stub
						return null;
					}

					@Override
					public IMongoStoreConfiguration withReplicaSetConfiguration(IMongoReplicaSetConfiguration config) {
						// TODO Auto-generated method stub
						return null;
					}
					
				};
			}

			@Override
			public IStoreConfiguration getDataStoreConfiguration() {
				// TODO Auto-generated method stub
				return null;
			}

			@Override
			public IDebugConfiguration getDebugConfiguration() {
				// TODO Auto-generated method stub
				return null;
			}

			@Override
			public Mode getRuntimeMode() {
				return Mode.UNITTEST;
			}

			@Override
			public Map<String, String> getArguments() {
				// TODO Auto-generated method stub
				return null;
			}

			@Override
			public String getApplicationName() {
				// TODO Auto-generated method stub
				return null;
			}

			@Override
			public PromptoVersion getApplicationVersion() {
				// TODO Auto-generated method stub
				return null;
			}

			@Override
			public URL[] getAddOnURLs() {
				// TODO Auto-generated method stub
				return null;
			}

			@Override
			public URL[] getResourceURLs() {
				// TODO Auto-generated method stub
				return null;
			}

			@Override
			public boolean isLoadRuntime() {
				// TODO Auto-generated method stub
				return false;
			}

			@Override
			public YamlMapping toYaml() throws YamlException {
				// TODO Auto-generated method stub
				return null;
			}

			@Override
			public <T extends IRuntimeConfiguration> T withRuntimeLibs(Supplier<Collection<URL>> supplier) {
				// TODO Auto-generated method stub
				return null;
			}

			@Override
			public <T extends IRuntimeConfiguration> T withCodeStoreConfiguration(IStoreConfiguration supplier) {
				// TODO Auto-generated method stub
				return null;
			}

			@Override
			public <T extends IRuntimeConfiguration> T withDataStoreConfiguration(IStoreConfiguration supplier) {
				// TODO Auto-generated method stub
				return null;
			}

			@Override
			public <T extends IRuntimeConfiguration> T withAddOnURLs(URL[] addOnURLS) {
				// TODO Auto-generated method stub
				return null;
			}

			@Override
			public <T extends IRuntimeConfiguration> T withApplicationName(String name) {
				// TODO Auto-generated method stub
				return null;
			}

			@Override
			public <T extends IRuntimeConfiguration> T withApplicationVersion(PromptoVersion version) {
				// TODO Auto-generated method stub
				return null;
			}

			@Override
			public <T extends IRuntimeConfiguration> T withResourceURLs(URL[] resourceURLs) {
				// TODO Auto-generated method stub
				return null;
			}

			@Override
			public <T extends IRuntimeConfiguration> T withRuntimeMode(Mode mode) {
				// TODO Auto-generated method stub
				return null;
			}

			@Override
			public <T extends IRuntimeConfiguration> T withLoadRuntime(boolean set) {
				// TODO Auto-generated method stub
				return null;
			}

			@Override
			public <T extends IRuntimeConfiguration> T withDebugConfiguration(IDebugConfiguration config) {
				// TODO Auto-generated method stub
				return null;
			}

			@Override
			public ITargetConfiguration getTargetConfiguration() {
				// TODO Auto-generated method stub
				return null;
			}
			
		};
	}
}
