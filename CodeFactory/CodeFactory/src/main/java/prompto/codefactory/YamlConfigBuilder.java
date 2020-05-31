package prompto.codefactory;

import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.Reader;
import java.io.Writer;

import com.esotericsoftware.yamlbeans.YamlConfig;
import com.esotericsoftware.yamlbeans.YamlConfig.WriteClassName;
import com.esotericsoftware.yamlbeans.YamlException;
import com.esotericsoftware.yamlbeans.YamlWriter;
import com.esotericsoftware.yamlbeans.document.YamlDocument;
import com.esotericsoftware.yamlbeans.document.YamlDocumentReader;
import com.esotericsoftware.yamlbeans.document.YamlElement;
import com.esotericsoftware.yamlbeans.document.YamlEntry;
import com.esotericsoftware.yamlbeans.document.YamlMapping;
import com.esotericsoftware.yamlbeans.document.YamlScalar;

import prompto.debug.HttpServletDebugRequestListenerFactory;
import prompto.debug.WebSocketDebugEventAdapterFactory;
import prompto.runtime.Mode;
import prompto.server.PromptoServlet;
import prompto.utils.Logger;

public class YamlConfigBuilder {

	static Logger logger = new Logger();

	ModuleProcess process;
	File source;
	File target;
	
	public YamlConfigBuilder(ModuleProcess process, File source, File target) {
		this.process = process;
		this.source = source;
		this.target = target;
	}

	public void build() throws Throwable {
		try(Reader reader = new FileReader(source)) {
			YamlDocument currentYaml = new YamlDocumentReader(reader).read();
			writeSpecificYamlEntries(currentYaml);
			logger.info(()->"Writing yaml config to " + target.getAbsolutePath());
			try(Writer writer = new FileWriter(target)) {
				YamlConfig config = new YamlConfig();
				config.writeConfig.setWriteClassname(WriteClassName.NEVER);
				config.writeConfig.setAutoAnchor(false);
				YamlWriter targetYaml = new YamlWriter(writer, config);
				targetYaml.write(currentYaml);
			}
		}
	}
	
	private void writeSpecificYamlEntries(YamlDocument document) throws Throwable {
		document.setEntry("applicationName", process.getModuleName());
		document.setEntry("applicationVersion", process.getModuleVersion());
		document.setEntry("runtimeMode", Mode.DEVELOPMENT.name());
		document.deleteEntry("webSiteRoot");
		document.deleteEntry("startMethod");
		String method = process.getStartMethod();
		if(method!=null)
			document.setEntry("startMethod", method);
		document.deleteEntry("serverAboutToStart");
		method = process.getServerAboutToStartMethod();
		if(method!=null)
			document.setEntry("serverAboutToStart", method);
		writeCodeStoreYamlEntries(document);
		writeDataStoreYamlEntries(document);
		writeHttpYamlEntries(document);
		writeDebugYamlEntries(document);
		document.deleteEntry("target");
	}
	
	private void writeCodeStoreYamlEntries(YamlDocument document) throws YamlException {
		YamlEntry entry = document.getEntry("dataStore");
		document.setEntry("codeStore", entry.getValue());
		document.deleteEntry("dataStore");
	}

	
	private void writeDataStoreYamlEntries(YamlDocument document) throws YamlException {
		YamlEntry entry = document.getEntry("target");
		YamlMapping target = (YamlMapping)entry.getValue();
		entry = target.getEntry("dataStore");
		document.setEntry("dataStore", entry.getValue());
	}

	private void writeHttpYamlEntries(YamlDocument document) throws Throwable {
		YamlEntry entry = document.getEntry("http");
		YamlMapping http = (YamlMapping)entry.getValue();
		http.setEntry("port", process.getPort());
		entry = http.getEntry("protocol");
		if(entry!=null) {
			YamlElement value = entry.getValue();
			if(value instanceof YamlScalar)
				process.setProtocol(((YamlScalar)value).getValue());
		}
		if(process.getWelcomePage()!=null)
			http.setEntry("welcomePage", process.getWelcomePage());
		http.deleteEntry("redirectFrom");
		http.deleteEntry("sendsXAuthorization");
		http.deleteEntry("authentication");
		String origin = PromptoServlet.REGISTERED_ORIGIN.get();
		if(origin!=null) {
			http.setEntry("allowedOrigins", origin);
			http.setEntry("allowsXAuthorization", true);
		}
		YamlMapping auth = process.authenticationSettingsToYaml();
		if(auth!=null)
			http.setEntry("authentication", auth);
	}

	private void writeDebugYamlEntries(YamlDocument document) throws YamlException {
		if(process.isDebug()) {
			YamlMapping eventAdapter = new YamlMapping();
			eventAdapter.setEntry("factory", WebSocketDebugEventAdapterFactory.class.getName());
			YamlMapping requestListener = new YamlMapping();
			requestListener.setEntry("factory", HttpServletDebugRequestListenerFactory.class.getName());
			YamlMapping debugger = new YamlMapping();
			debugger.setEntry("eventAdapter", eventAdapter);
			debugger.setEntry("requestListener", requestListener);
			document.setEntry("debugger", debugger);
		}
	}


}
