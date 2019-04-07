package prompto.codefactory;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.lang.ProcessBuilder.Redirect;
import java.net.URISyntaxException;
import java.net.URL;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.function.BiFunction;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import com.esotericsoftware.yamlbeans.document.YamlMapping;

import prompto.config.IPortRangeConfiguration;
import prompto.config.StoredRecordConfigurationReader;
import prompto.config.auth.CodeStoreAuthenticationConfiguration;
import prompto.runtime.Mode;
import prompto.server.AppServer;
import prompto.server.PromptoServlet;
import prompto.store.DataStore;
import prompto.store.IStored;
import prompto.utils.Logger;
import prompto.utils.SocketUtils;
import prompto.value.IValue;

/* represents the process used to run a Module on the dev server */
public class ModuleProcess {
	
	static Logger logger = new Logger();
	static Map<Object, ModuleProcess> modules = new HashMap<>();
	static IPortRangeConfiguration portRangeConfiguration = IPortRangeConfiguration.ANY_PORT;
	
	static {
		Runtime.getRuntime().addShutdownHook(new Thread(ModuleProcess::shutDownAll));
	}
	
	static void shutDownAll() {
		logger.info(()->"Shutting down module servers...");
		synchronized(modules) {
			List<ModuleProcess> values = new ArrayList<>(modules.values());
			modules.clear();
			values.forEach(m->m.shutDown());
		}
	}
	
	public static void shutDown(Object dbId) {
		synchronized(modules) {
			try {
				if(dbId instanceof IValue)
					dbId = ((IValue)dbId).getStorableData();
				ModuleProcess module = modules.remove(dbId);
				if(module!=null)
					module.shutDown();
			} catch(Throwable t) {
				t.printStackTrace();
				// TODO send error to client
			}
		}
	}
	
	public static Long launchIfNeeded(Object dbId, String action) {
		synchronized(modules) {
			try {
				if(dbId instanceof IValue)
					dbId = ((IValue)dbId).getStorableData();
				// already launched ?
				ModuleProcess module = modules.get(dbId);
				// if no longer alive recreate 
				if(module!=null && !module.process.isAlive())
					module = null;
				if("READ".equals(action)) {
					return module==null ? new Long(0) : new Long(module.port);
				}
				// kill if debug flag differs
				boolean debug = "DEBUG".equals(action);
				if(module!=null && debug!=module.isDebug()) {
					shutDown(dbId);
					module = null;
				}
				// if no longer alive recreate 
				if(module!=null && !module.process.isAlive())
					module = null;
				// create if needed
				if(module==null) {
					module = createModuleProcess(dbId, debug);
					if(module!=null)
						modules.put(dbId, module);
					else {
						logger.warn(()->"Remote server failed to start!");
						return -1L; // TODO send error to client
					}
				}
				return new Long(module.port);
			} catch(Throwable t) {
				t.printStackTrace();
				return -1L; // TODO send error to client
			}
		}
	}

	private static ModuleProcess createModuleProcess(Object dbId, boolean debug) throws Throwable {
		IStored stored = DataStore.getInstance().fetchUnique(dbId);
		if(stored==null)
			return null;
		ModuleProcess module = new ModuleProcess(stored, debug);
		module.start();
		return module.process.isAlive() ? module : null;
	}
	
	static class OutStream {
		
		static Process waitForServerReadiness(ProcessBuilder builder) throws IOException, InterruptedException {
			OutStream out = new OutStream(builder);
			out.waitForServerReadiness();
			out.startForwarding();
			return out.process;
		}
		
		ProcessBuilder builder;
		Process process;
		
		OutStream(ProcessBuilder builder) {
			this.builder = builder;
		}
		
		Process waitForServerReadiness() throws InterruptedException, IOException {
			logger.info(()->"Starting: " + builder.command().toString());
			Object ready = new Object();
			this.process = builder.start();
			Thread reader = new Thread(()->{
				try { 
					readLoop((data, size)->{
						System.out.write(data, 0 , size);
						return new String(data, 0, size).contains(AppServer.WEB_SERVER_SUCCESSFULLY_STARTED);
					});
				} catch(Throwable t) {
					t.printStackTrace(System.err);
				} finally {
					synchronized (ready) {
						ready.notify();
					}
				}
			});
			reader.start();
			synchronized(ready) {
				ready.wait();
			}
			return process;
		}
		
		void startForwarding() {
			Thread reader = new Thread(()->{
				try { 
					readLoop((data, size)->{
						System.out.write(data, 0 , size);
						return false;
					});
				} catch(Throwable t) {
					t.printStackTrace(System.err);
				} 
			});
			reader.start();
		}
		
		private void readLoop(BiFunction<byte[], Integer, Boolean> hook) throws IOException {
			InputStream input = this.process.getInputStream();
			byte[] data = new byte[0x10000];
			while(process.isAlive()) {
				int read = input.read(data);
				if(read<0)
					break;
				if(read>0) {
					if(hook.apply(data, read))
						break;
				}
			}
		}

	}

	
	IStored stored;
	boolean debug;
	int port;
	Process process;

	public ModuleProcess(IStored stored, boolean debug) {
		this.stored = stored;
		this.debug = debug;
	}
	
	public int getPort() {
		return port;
	}
	
	public boolean isDebug() {
		return debug;
	}

	public void start() throws Throwable {
		this.port = SocketUtils.findAvailablePortInRange(portRangeConfiguration.getMinPort(), portRangeConfiguration.getMaxPort()); 
		String[] args = buildCommandLineArgs();
		ProcessBuilder builder = new ProcessBuilder(args)
			.redirectError(Redirect.INHERIT)
			.directory(Files.createTempDirectory("prompto-" + getModuleName() + "-").toFile());
		this.process = OutStream.waitForServerReadiness(builder);
	}

	String getModuleName() {
		return stored.getData("name").toString();
	}


	String getModuleVersion() {
		return stored.getData("version").toString();
	}

	String getStartMethod() {
		Object value = stored.getData("startMethod");
		return value==null ? null : value.toString();
	}

	String getServerAboutToStartMethod() {
		Object value = stored.getData("serverAboutToStartMethod");
		return value==null ? null : value.toString();
	}

	public void shutDown() {
		try {
			process.destroyForcibly();
			process.waitFor();
		} catch(InterruptedException e) {
			// OK
		}
	}
	

	private String[] buildCommandLineArgs() throws Throwable {
		List<String> cmds = new ArrayList<String>();
		cmds.add("java");
		String debugPort = System.getenv("PROMPTO_DEBUG_TARGET_PORT");
		if(debugPort!=null && !debugPort.isEmpty()) {
			cmds.add("-Xdebug");
			cmds.add("-agentlib:jdwp=transport=dt_socket,server=y,suspend=y,address=" + debugPort);
		}
		addClassPathArgs(cmds);
		cmds.add(AppServer.class.getName());
		addPromptoArgs(cmds);
		return cmds.toArray(new String[cmds.size()]);
	}

	private void addPromptoArgs(List<String> args) throws Throwable {
		if(isYamlConfig())
			addPromptoYamlConfigArgs(args);
		else
			addPromptoCommandLineArgs(args);
	}
	
	
	private void addPromptoCommandLineArgs(List<String> cmds) {
		addRelevantCmdLineArgs(cmds);
		addSpecificCmdLineArgs(cmds);
	}

	private void addSpecificCmdLineArgs(List<String> cmds) {
		cmds.add("-http-port");
		cmds.add(String.valueOf(port));
		cmds.add("-applicationName");
		cmds.add(getModuleName());
		cmds.add("-applicationVersion");
		cmds.add(getModuleVersion());
		String origin = PromptoServlet.REGISTERED_ORIGIN.get();
		if(origin!=null) {
			cmds.add("-http-allowedOrigins");
			cmds.add(origin);
			cmds.add("-http-allowsXAuthorization");
			cmds.add("true");
		}
	}

	private boolean isYamlConfig() {
		String cmdLine = System.getProperty("sun.java.command").toString();
		return cmdLine.contains("-yamlConfigFile");
	}

	private void addPromptoYamlConfigArgs(List<String> cmds) throws Throwable {
		File targetFile = createTempYamlFile();
		cmds.add("-yamlConfigFile");
		cmds.add(targetFile.getAbsolutePath());
		YamlConfigBuilder builder = new YamlConfigBuilder(this, locateYamlConfigFile(), targetFile);
		builder.build();
	}
	

	private boolean hasAuthenticationSettings() {
		return stored.hasData("authenticationSettings");
	}

	YamlMapping authenticationSettingsToYaml() throws Throwable {
		if(hasAuthenticationSettings()) {
			StoredRecordConfigurationReader reader = new StoredRecordConfigurationReader(DataStore.getInstance(), stored);
			CodeStoreAuthenticationConfiguration config = new CodeStoreAuthenticationConfiguration(reader);
			return config.toYaml(Mode.DEVELOPMENT);
		} else
			return null;
	}

	private File createTempYamlFile() throws IOException {
		return File.createTempFile("config-", ".yml");
	}

	File locateYamlConfigFile() throws Exception {
		String location = locateYamlConfigFilePath();
		return new File(location);
	}

	private void addClassPathArgs(List<String> cmds) throws URISyntaxException {
		if(isRunningFromJar())
			addServerJarArgs(cmds);
		else
			addImplicitClassPathArgs(cmds);
	}

	private boolean isRunningFromJar() {
		String[] args = System.getProperty("sun.java.command").split(" ");
		return args[0].toLowerCase().endsWith(".jar");
	}

	private void addImplicitClassPathArgs(List<String> cmds) {
		cmds.add("-cp");
		String classPaths = Stream.of(System.getProperty("java.class.path").toString().split(":"))
				.filter((s)->!s.startsWith(this.getClass().getPackage().getName()))
				.collect(Collectors.joining(":"));
		cmds.add(classPaths);
	}

	private void addServerJarArgs(List<String> cmds) throws URISyntaxException {
		URL thisJar = this.getClass().getProtectionDomain().getCodeSource().getLocation();
		File parent = Paths.get(thisJar.toURI()).getParent().toFile();
		for(File file : parent.listFiles()) {
			String name = file.getName();
			if(name.startsWith("Server-") && name.endsWith(".jar") && !name.contains("-tests.")) {
				cmds.add("-jar");
				cmds.add(file.getAbsolutePath());
				return;
			}
		}
		throw new IllegalStateException("Could not locate Server jar in " + System.getProperty("user.dir") + "!");
	}

	// see: https://stackoverflow.com/questions/13495449/how-to-split-a-command-line-like-string
	private static final Pattern splitter = Pattern.compile("[^\\s]*\"(\\\\+\"|[^\"])*?\"|[^\\s]*'(\\\\+'|[^'])*?'|(\\\\\\s|[^\\s])+", Pattern.MULTILINE);
	
	private static String locateYamlConfigFilePath() {
		return extractCmdLineArgument("-yamlConfigFile");
	}

	public static String extractCmdLineArgument(String argument) {
		return extractCmdLineArgument(System.getProperty("sun.java.command"), argument);
	}

	public static String extractCmdLineArgument(String cmdLine, String argument) {
		Matcher matcher = splitter.matcher(cmdLine);
		while(matcher.find()) {
			String key = matcher.group();
			if(argument.equals(key) && matcher.find())
				return matcher.group();
		}
		return null;
	}

	private void addRelevantCmdLineArgs(List<String> cmds) {
		String cmdLine = System.getProperty("sun.java.command").toString();
		Matcher matcher = splitter.matcher(cmdLine);
		while(matcher.find()) {
			String key = matcher.group();
			if(isRelevantCmdLineArg(key)) {
				if(matcher.find()) {
					cmds.add(key);
					cmds.add(matcher.group());
				}
			}
		}
	}

	private static Set<String> relevantArgFullNames = new HashSet<>(Arrays.asList("-addOnURLs"));
	private static List<String> relevantArgStartNames = Arrays.asList("-codeStore-", "-dataStore-");
	
	private boolean isRelevantCmdLineArg(String key) {
		if(relevantArgFullNames.contains(key))
			return true;
		else
			return relevantArgStartNames.stream()
					.anyMatch(key::startsWith);
	}

}
	

