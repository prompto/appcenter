package prompto.utils.prop_types_extractor;

import static prompto.utils.prop_types_extractor.PropTypesConstants.SPECIFIC_VALIDATORS;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.antlr.v4.runtime.BufferedTokenStream;
import org.antlr.v4.runtime.CharStreams;
import org.antlr.v4.runtime.CodePointCharStream;
import org.antlr.v4.runtime.tree.ParseTree;
import org.antlr.v4.runtime.tree.ParseTreeWalker;

import prompto.grammar.Annotation;
import prompto.grammar.Identifier;
import prompto.literal.DictEntryList;
import prompto.property.IPropertyValidator;
import prompto.utils.StreamUtils;
import prompto.utils.prop_types_extractor.PropTypesConverter.PropTypesMap;

public abstract class PropTypesExtractor {

	// not thread safe!
	public static Map<String, Map<String, IPropertyValidator>> MODULE;
	public static Map<String, IPropertyValidator> WIDGET;

	
	public static void extractPropTypes(File node_modules, String module, String path, PropTypesMap propertyMap) throws IOException {
		MODULE = SPECIFIC_VALIDATORS.getOrDefault(module, Collections.emptyMap());
		File widgets_dir = new File(new File(node_modules, module), path);
		for(File widget_file : widgets_dir.listFiles()) {
			if(!widget_file.getName().endsWith(".js"))
				continue;
			extractPropTypes(widget_file, path, propertyMap);
		}
	}

	private static void extractPropTypes(File widget_file, String path, PropTypesMap propertyMap) throws IOException {
		try(InputStream input = new FileInputStream(widget_file)) {
			String content = StreamUtils.readString(input);
			List<String> lines = Arrays.asList(content.split("\n"));
			String widgetName = extractWidgetName(lines);
			String propTypesName = widgetName==null ? null : extractPropTypesName(lines, widgetName);
			List<String> propTypes = propTypesName==null ? null: extractDeclaration(lines, propTypesName);
			if(widgetName!=null && propTypes!=null) {
				extractPropTypes(widgetName, propTypes, propertyMap);
			}
		}
	}
	
	private static void extractPropTypes(String widgetName, List<String> propTypesCode, PropTypesMap propertyMap) throws IOException {
		System.out.println(widgetName);
		WIDGET = MODULE.getOrDefault(widgetName, Collections.emptyMap());
		PropTypes propTypes = parsePropTypes(propTypesCode);
		propertyMap.put(widgetName, map->{
			DictEntryList entries = propTypes.toDictEntries(propertyMap);
			return new Annotation(new Identifier("@WidgetProperties"), entries);
		});
	}
	
	private static PropTypes parsePropTypes(List<String> lines) {
		String value = lines.stream().collect(Collectors.joining("\n"));
		CodePointCharStream input = CharStreams.fromString(value);
		PropTypesExtractorLexer lexer = new PropTypesExtractorLexer(input);
		BufferedTokenStream tokens = new BufferedTokenStream(lexer);
		PropTypesExtractorParser parser = new PropTypesExtractorParser(tokens);
		ParseTree tree = parser.propTypes();
		PropertyListBuilder builder = new PropertyListBuilder();
		ParseTreeWalker walker = new ParseTreeWalker();
		walker.walk(builder, tree);
		return builder.<PropTypes>getNodeValue(tree);
	}
	
	private static String extractWidgetName(List<String> lines) {
		return lines.stream()
				.filter(line->line.startsWith("export default "))
				.map(PropTypesExtractor::extractWidgetName)
				.findFirst()
				.orElse(null);
	}
	
	private static String extractWidgetName(String line) {
		line = line.substring("export default ".length());
		if(line.endsWith(";"))
			line = line.substring(0, line.length() - 1);
		line = line.trim();
		if(line.startsWith("bsClass") || line.startsWith("setBsClass") || line.startsWith("bsStyles")) {
			line = line.substring(line.lastIndexOf(",") + 1);
			while(line.endsWith(")"))
				line = line.substring(0, line.length() - 1);
		}
		if(line.startsWith("uncontrollable")) {
			line = line.substring(line.indexOf("(")  + 1, line.indexOf(","));
		}
		line = line.trim();
		if(line.startsWith("Uncontrolled"))
			line = line.substring("Uncontrolled".length());	
		if(line.startsWith("Uncontrollable"))
			line = line.substring("Uncontrollable".length());	
		return line.trim();
	}

	private static String extractPropTypesName(List<String> lines, String widgetName) {
		return lines.stream()
				.filter(line->line.startsWith(widgetName + ".propTypes = "))
				.map(line->{
					line = line.substring((widgetName + ".propTypes = ").length());
					if(line.endsWith(";"))
						line = line.substring(0, line.length() - 1);
					return line.trim();
				}).findFirst()
				.orElse(null);
	}

	private static List<String> extractDeclaration(List<String> lines, String varName) {
		String startDecl = "var " + varName;
		int startLine = - 1;
		// run to start of declaration
		for(int i=0; i < lines.size() && startLine == -1; i++) {
			if(lines.get(i).startsWith(startDecl))
					startLine = i;
		}
		if(startLine==-1)
			return null;
		// find first '{'
		int curlCount = 0;
		int currentLine = startLine;
		while(curlCount==0) {
			String line = lines.get(currentLine);
			int idx = line.indexOf('{');
			if(idx<0) {
				if(currentLine >= lines.size())
					return null;
				line = lines.get(++currentLine);
			} else {
				curlCount = 1;
				while(++idx < line.length()) {
					if(line.charAt(idx)=='{') 
						curlCount++;
					else if(line.charAt(idx)=='}') {
						curlCount--;
						// not bullet proof (could create infinite loop) but we just need this to work once
					}
				}
			}
		}
		while(curlCount > 0) {
			String line = lines.get(++currentLine);
			for(int idx = 0; idx < line.length(); idx++) {
				if(line.charAt(idx)=='{') 
					curlCount++;
				else if(line.charAt(idx)=='}')
					curlCount--;
			}
		}
		return lines.subList(startLine, currentLine + 1);
	}
	
}
