package prompto.codefactory;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.net.URLClassLoader;
import java.net.URLConnection;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.StreamSupport;

import com.fasterxml.jackson.databind.JsonNode;

import prompto.config.mongo.IMongoStoreConfiguration;
import prompto.intrinsic.PromptoVersion;
import prompto.store.IStore;
import prompto.store.mongo.MongoStore;
import prompto.utils.JsonUtils;
import prompto.utils.Logger;
import prompto.utils.TarUtils;

public class FactoryUpgrader {

	static Logger logger = new Logger();

	
	public boolean upgradeIfRequired() {
		if(isUpgradeToThisJarVersionRequired()) try {
			upgradeToThisJarVersion();
			return true;
		} catch (Throwable t) {
			logger.error(()->"Failed to upgrade factory", t);
		} else if(isUpgradeToEnvVariableVersionRequired()) try {
			upgradeToEnvVariableVersion();
			return true;
		} catch (Throwable t) {
			logger.error(()->"Failed to upgrade factory", t);
		} 
		return false;
	}

	
	private void upgradeToEnvVariableVersion() throws Exception {
		PromptoVersion version = getEnvVariableFactoryVersion();
		upgradeTo(version);
	}


	private static void upgradeToThisJarVersion() throws Exception {
		PromptoVersion version = getThisJarFactoryVersion();
		upgradeTo(version);
	}
	
	
	static void upgradeTo(PromptoVersion version) throws Exception {
		logger.info(()->"Upgrading factory to " + version.toString());
		Path tarGzPath = downloadPromptoCode(version);
		Path tarPath = TarUtils.ungz(tarGzPath, new File(tarGzPath.getParent().toFile(), "factory.tar").toPath());
		Path dirPath = TarUtils.untar(tarPath, new File(tarGzPath.getParent().toFile(), "factory").toPath());
		importPromptoCode(dirPath);
		storeFactoryVersion(version);
	}


	private static void storeFactoryVersion(PromptoVersion version) {
		try {
			IStore store = Application.storeFromCodeStore();
			Map<String, Object> config = store.fetchConfiguration("FactoryConfiguration");
			if(config==null) 
				config = new HashMap<>();
			config.put("version", version.toString());
			store.storeConfiguration("FactoryConfiguration", config);
		} catch(Throwable t) {
			// 
		} 
	}
	
	
	private static void importPromptoCode(Path dirPath) throws Exception {
		// mongorestore --uri $uri/$dbName --dir $dir --drop
		String uri = getFactoryMongoUri();
		String dbName = getFactoryDbName();
		File dbDir = new File(dirPath.toFile(), dbName);
		if(!dbDir.exists()) {
			File srcDir = new File(dirPath.toFile(), "FACTORY-SEED");
			srcDir.renameTo(dbDir);
		}
		String tool = locateMongoRestoreTool();
		String[] args = { tool, "--uri", uri, "--dir", dbDir.getAbsolutePath(), "--drop" };
		ProcessBuilder builder = new ProcessBuilder(args)
				.inheritIO();
		Process process = builder.start();
		int error = process.waitFor();
		if(error!=0)
			throw new RuntimeException("mongorestore failed with error " + error);
	}

	private static String locateMongoRestoreTool() {
		String[] paths = new String[] { "/usr/local/bin/", "/usr/bin/", "/usr/sbin/"};
		for(String path : paths) {
			if(new File(path + "mongorestore").exists())
				return path + "mongorestore";
		}
		throw new RuntimeException("Could not locate mongorestore");
	}


	private static String getFactoryMongoUri() {
		if(Application.config.getCodeStoreConfiguration() instanceof IMongoStoreConfiguration)
			return MongoStore.uriFromConfig((IMongoStoreConfiguration)Application.config.getCodeStoreConfiguration());
		else
			return null;
	}


	private static String getFactoryDbName() {
		return Application.config.getCodeStoreConfiguration().getDbName();
	}


	private static Path downloadPromptoCode(PromptoVersion version) throws IOException {
		Path dir = Files.createTempDirectory("prompto");
		Path archive = new File(dir.toFile(), "factory.tar.gz").toPath();
		String url = fetchPromptoCodeDownloadUrl(version);
		try(InputStream input = new URL(url).openStream()) {
			Files.copy(input, archive, StandardCopyOption.REPLACE_EXISTING);
			return archive;
		}
		
	}

	static String fetchPromptoCodeDownloadUrl(PromptoVersion version) throws IOException {
		JsonNode release = fetchFactoryRelease(version);
		JsonNode assets = release.get("assets");
		if(assets==null || !assets.isArray()) 
			throw new IOException("Could not parse release data");
		return StreamSupport.stream(assets.spliterator(), false)
				.filter(node -> node.has("name") && "factory.tar.gz".equals(node.get("name").asText()))
				.map(node -> node.get("browser_download_url").asText())
				.findFirst()
				.orElse(null);
	}

	static JsonNode fetchFactoryRelease(PromptoVersion version) throws IOException {
		URL url =  new URL("https://api.github.com/repos/prompto/prompto-factory/releases/tags/v" + version.toString());
		URLConnection connection = url.openConnection();
		try( InputStream input = connection.getInputStream()) {
			return JsonUtils.parseInput(input);
		}
	}
	

	private boolean isUpgradeToEnvVariableVersionRequired() {
		PromptoVersion envVersion = getEnvVariableFactoryVersion();
		if(envVersion!=null) {
			boolean isMongo = Application.config.getCodeStoreConfiguration() instanceof IMongoStoreConfiguration;
			if(isMongo) {
				PromptoVersion storedVersion = getStoredFactoryVersion();
				return storedVersion == null || envVersion.compareTo(storedVersion) > 0;
			}
		}
		return false;
	}


	private PromptoVersion getEnvVariableFactoryVersion() {
		String version = System.getenv("UPGRADE_FACTORY_VERSION");
		if(version == null || version.isEmpty())
			return null;
		else
			return PromptoVersion.parse(version);
	}


	private static boolean isUpgradeToThisJarVersionRequired() {
		PromptoVersion storedVersion = getStoredFactoryVersion();
		PromptoVersion latestVersion = getThisJarFactoryVersion();
		boolean isMongo = Application.config.getCodeStoreConfiguration() instanceof IMongoStoreConfiguration;
		return isMongo && latestVersion!=null && (storedVersion == null || latestVersion.compareTo(storedVersion) > 0);
	}
	
	static PromptoVersion getStoredFactoryVersion() {
		try {
			IStore store = Application.storeFromCodeStore();
			Map<String, Object> config = store.fetchConfiguration("FactoryConfiguration");
			if(config!=null) 
				return PromptoVersion.parse((String)config.get("version"));
		} catch(Throwable t) {
			// 
		} 
		return null;
	}
	
	static final String CODE_FACTORY_PREFIX = "/CodeFactory-";

	private static PromptoVersion getThisJarFactoryVersion() {
		ClassLoader loader = FactoryUpgrader.class.getClassLoader();
		if(loader instanceof URLClassLoader) {
			for(URL url : ((URLClassLoader)loader).getURLs()) {
				String s = url.toString();
				int start = s.indexOf(CODE_FACTORY_PREFIX);
				if(start >= 0) {
					int end = s.indexOf(".jar", start);
					if(end > start) 
						return PromptoVersion.parse(s.substring(start + CODE_FACTORY_PREFIX.length(), end));
				}
			}
		}
		return null;
	}


}
