package prompto.utils;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.StringWriter;
import java.io.Writer;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import org.antlr.v4.runtime.BufferedTokenStream;
import org.antlr.v4.runtime.CharStreams;
import org.antlr.v4.runtime.CodePointCharStream;
import org.antlr.v4.runtime.tree.ParseTree;
import org.antlr.v4.runtime.tree.ParseTreeProperty;
import org.antlr.v4.runtime.tree.ParseTreeWalker;

import prompto.declaration.DeclarationList;
import prompto.declaration.IDeclaration;
import prompto.grammar.Annotation;
import prompto.grammar.Identifier;
import prompto.literal.DictEntry;
import prompto.literal.DictEntryList;
import prompto.literal.DocumentLiteral;
import prompto.parser.Dialect;
import prompto.parser.OCleverParser;
import prompto.property.AlwaysValidator;
import prompto.property.IPropertyValidator;
import prompto.property.Property;
import prompto.property.ValueSetValidator;
import prompto.property.TypeSetValidator;
import prompto.property.TypeValidator;
import prompto.runtime.Context;
import prompto.type.AnyType;
import prompto.type.BooleanType;
import prompto.type.CategoryType;
import prompto.type.HtmlType;
import prompto.type.IType;
import prompto.type.IntegerType;
import prompto.type.TextType;
import static prompto.utils.PropTypesExtractorParser.*;

@SuppressWarnings("serial")
public class PropTypesExtractor {

	public static void main(String[] args) throws Exception {
		File node_modules = new File("../EditorApp/src/web/node_modules/");
		File out_dir = new File("target/");
		// react-bootstrap-3
		File widget_dir = new File("src/main/resources/react-bootstrap-3/");
		DeclarationList decls = readWidgetDeclarations(new File(widget_dir, "React-Bootstrap-3.poc"));
		extractPropTypes(node_modules, out_dir, "react-bootstrap", "es", decls);
		writeWidgetDeclarations(new File(widget_dir, "React-Bootstrap-3.poc"), decls);
	}

	private static void writeWidgetDeclarations(File file, DeclarationList decls) throws IOException {
		CodeWriter writer = new CodeWriter(Dialect.O, Context.newGlobalContext());
		decls.toDialect(writer);
		try(OutputStream output = new FileOutputStream(file)) {
			output.write(writer.toString().getBytes());
		}
	}

	private static DeclarationList readWidgetDeclarations(File file) throws Exception {
		try(InputStream input = new FileInputStream(file)) {
			return new OCleverParser(input).parse_declaration_list();
		}
	}
	static final IPropertyValidator CALLBACK_VALIDATOR = new TypeValidator(new CategoryType(new Identifier("Callback")));
	static final IPropertyValidator WIDGET_REF_VALIDATOR = new TypeValidator(new CategoryType(new Identifier("WidgetCallback")));
	static final IPropertyValidator ITEM_SELECTED_VALIDATOR = new TypeValidator(new CategoryType(new Identifier("ItemSelectedCallback")));
	static final IPropertyValidator PAGE_SELECTED_VALIDATOR = new TypeValidator(new CategoryType(new Identifier("PageSelectedCallback")));
	static final IPropertyValidator TOGGLE_CHANGED_VALIDATOR = new TypeValidator(new CategoryType(new Identifier("ToggleChangedCallback")));
	static final IPropertyValidator MOUSE_CHANGED_VALIDATOR = new TypeValidator(new CategoryType(new Identifier("MouseEventCallback")));
	static final IPropertyValidator KEYBOARD_CHANGED_VALIDATOR = new TypeValidator(new CategoryType(new Identifier("KeyboardEventCallback")));
	static final IPropertyValidator ANY_TYPE_VALIDATOR = new TypeValidator(AnyType.instance());
	static final IPropertyValidator HTML_TYPE_VALIDATOR = new TypeValidator(HtmlType.instance());
	
	public static final Map<String, Map<String, Map<String, IPropertyValidator>>> SPECIFIC_VALIDATORS = populateSpecificValidators();

	private static Map<String, Map<String, Map<String, IPropertyValidator>>> populateSpecificValidators() {
		return new HashMap<String, Map<String, Map<String, IPropertyValidator>>>() {
			{
				put("react-bootstrap", populateReactBootstrap3SpecificValidators());
			}
		};	
	}

	private static Map<String, Map<String, IPropertyValidator>> populateReactBootstrap3SpecificValidators() {
		
		return new HashMap<String, Map<String, IPropertyValidator>>() {
			{
				put("CarouselItem", Collections.singletonMap("onAnimateOutEnd", CALLBACK_VALIDATOR));
				put("Panel", Collections.singletonMap("onSelect", CALLBACK_VALIDATOR));
				put("PanelGroup", Collections.singletonMap("onSelect", ITEM_SELECTED_VALIDATOR));
				put("PaginationButton", Collections.singletonMap("onSelect", CALLBACK_VALIDATOR));
				put("Navbar", new HashMap<String, IPropertyValidator>() {
					{
						put("onToggle", TOGGLE_CHANGED_VALIDATOR);
						put("onSelect", ITEM_SELECTED_VALIDATOR);
					}
				});
				put("NavItem", Collections.singletonMap("onSelect", CALLBACK_VALIDATOR)); 
				put("Collapse", Collections.singletonMap("getDimensionValue", ANY_TYPE_VALIDATOR)); // TBD: proto is m(dimension, element)
				put("Tabs", Collections.singletonMap("onSelect", ITEM_SELECTED_VALIDATOR)); 
				put("TabContainer", new HashMap<String, IPropertyValidator>() {
					{
						put("generateChildId", ANY_TYPE_VALIDATOR); // TBD: no proto
						put("onSelect", ITEM_SELECTED_VALIDATOR);
					}
				}); 
				put("DropdownMenu", Collections.singletonMap("onSelect", ITEM_SELECTED_VALIDATOR)); 
				put("Pagination", Collections.singletonMap("onSelect", ITEM_SELECTED_VALIDATOR)); 
				put("Pager", Collections.singletonMap("onSelect", CALLBACK_VALIDATOR)); 
				put("PagerItem", Collections.singletonMap("onSelect", CALLBACK_VALIDATOR)); 
				put("Nav", Collections.singletonMap("onSelect", ITEM_SELECTED_VALIDATOR)); 
				put("MenuItem", Collections.singletonMap("onSelect", ITEM_SELECTED_VALIDATOR)); 
				put("Dropdown", new HashMap<String, IPropertyValidator>() {
					{
						put("onToggle", ANY_TYPE_VALIDATOR); // TBD: no proto
						put("onSelect", ITEM_SELECTED_VALIDATOR);
					}
				}); 
				put("FormControl", Collections.singletonMap("inputRef", WIDGET_REF_VALIDATOR)); 
				put("Checkbox", Collections.singletonMap("inputRef", WIDGET_REF_VALIDATOR)); 
				put("Radio", Collections.singletonMap("inputRef", WIDGET_REF_VALIDATOR)); 
				put("ProgressBar", Collections.singletonMap("children", HTML_TYPE_VALIDATOR)); 
				put("ToggleButtonGroup", Collections.singletonMap("onChange", ANY_TYPE_VALIDATOR)); // can be atomic or list values depending on type 'checkbox' or 'radio'
				put("ToggleButton", Collections.singletonMap("onChange", ANY_TYPE_VALIDATOR)); // can be atomic or list values depending on type 'checkbox' or 'radio'
				put("Carousel", new HashMap<String, IPropertyValidator>() {
					{
						put("onSelect", ITEM_SELECTED_VALIDATOR); 
						put("onSlideEnd", CALLBACK_VALIDATOR); 
					}
				});
				put("Modal", Collections.singletonMap("container", ANY_TYPE_VALIDATOR)); // private
			}
		};
		
	}
	
	static Map<String, Map<String, IPropertyValidator>> MODULE;
	static Map<String, IPropertyValidator> WIDGET;

	
	private static void extractPropTypes(File node_modules, File out_dir, String module, String path, List<IDeclaration> decls) throws IOException {
		MODULE = SPECIFIC_VALIDATORS.getOrDefault(module, Collections.emptyMap());
		File widgets_dir = new File(new File(node_modules, module), path);
		File out_file = new File(out_dir, module + ".txt");
		try(Writer writer = new FileWriter(out_file)) {
			for(File widget_file : widgets_dir.listFiles()) {
				if(!widget_file.getName().endsWith(".js"))
					continue;
				extractPropTypes(widget_file, path, writer, decls);
			}
		}
	}

	private static void extractPropTypes(File widget_file, String path, Writer writer, List<IDeclaration> decls) throws IOException {
		try(InputStream input = new FileInputStream(widget_file)) {
			String content = StringUtils.stringFromStream(input);
			List<String> lines = Arrays.asList(content.split("\n"));
			String widgetName = extractWidgetName(lines);
			String propTypesName = widgetName==null ? null : extractPropTypesName(lines, widgetName);
			List<String> propTypes = propTypesName==null ? null: extractDeclaration(lines, propTypesName);
			if(widgetName!=null && propTypes!=null) {
				IDeclaration decl = decls.stream().filter(d->widgetName.equals(d.getName())).findFirst().orElse(null);
				extractPropTypes(writer, widgetName, propTypes, decl);
			}
		}
	}
	
	private static void extractPropTypes(Writer writer, String widgetName, List<String> propTypes, IDeclaration decl) throws IOException {
		System.out.println(widgetName);
		WIDGET = MODULE.getOrDefault(widgetName, Collections.emptyMap());
		List<Property> props = parsePropTypes(propTypes);
		writer.append("// ")
			.append(widgetName)
			.append("\n@WidgetProperties(");
		StringWriter entriesWriter = new StringWriter();
		entriesWriter.append("{\n\t");
		boolean first = true;
		for(Property prop : props) {
			if(first)
				first = false;
			else
				entriesWriter.append(",\n\t");
			prop.toLiteral(entriesWriter);
		}
		entriesWriter.append("\n}");
		writer.append(entriesWriter.toString()).append(")\n\n");
		if(decl!=null) {
			OCleverParser parser = new OCleverParser(entriesWriter.toString());
			DocumentLiteral value = parser.doParse(parser::document_literal);
			DictEntryList entries = new DictEntryList(new DictEntry(null, value));
			decl.removeAnnotation("@WidgetProperties");
			decl.addAnnotation(new Annotation(new Identifier("@WidgetProperties"), entries));
		}
	}
	
	private static List<Property> parsePropTypes(List<String> lines) {
		String value = lines.stream().collect(Collectors.joining("\n"));
		CodePointCharStream input = CharStreams.fromString(value);
		PropTypesExtractorLexer lexer = new PropTypesExtractorLexer(input);
		BufferedTokenStream tokens = new BufferedTokenStream(lexer);
		PropTypesExtractorParser parser = new PropTypesExtractorParser(tokens);
		ParseTree tree = parser.propTypes();
		PropertyListBuilder builder = new PropertyListBuilder();
		ParseTreeWalker walker = new ParseTreeWalker();
		walker.walk(builder, tree);
		return builder.<List<Property>>getNodeValue(tree);
	}
	
	static class PropertyListBuilder extends PropTypesExtractorBaseListener {

		ParseTreeProperty<Object> nodeValues = new ParseTreeProperty<Object>();
		Map<String, List<String>> helpStrings = new HashMap<>();

		@SuppressWarnings("unchecked")
		public <T extends Object> T getNodeValue(ParseTree node) {
			return (T)nodeValues.get(node);
		};
		
		public void setNodeValue(ParseTree node, Object value) {
			nodeValues.put(node, value);
		}	
		
		@Override
		public void exitPropTypes(PropTypesContext ctx) {
			Object obj = getNodeValue(ctx.value());
			if(obj instanceof Method) {
				Method method = (Method)obj;
				switch(method.name) {
				case "_extends":
					obj = method.params.get(method.params.size() - 1);
					break;
				}		
			}
			@SuppressWarnings("unchecked")
			Map<String, Object> value = (Map<String, Object>)obj;
			List<Property> props = value.entrySet().stream()
					.map(this::entryToProperty)
					.collect(Collectors.toList());
			setNodeValue(ctx, props);
		}
		
		@Override
		public void exitObject(ObjectContext ctx) {
			Map<String, Object> entries = new HashMap<>();
			ctx.entry().forEach(entry->{
				String name = nameFromEntry(entry); 
				Object value = getNodeValue(entry.value());
				entries.put(name, value);
				List<String> help = helpFromEntry(entry);
				if(help!=null)
					helpStrings.put(name,  help);
				
			});
			setNodeValue(ctx, entries);
		}
		
		private static String nameFromEntry(EntryContext entry) {
			if(entry.ID()!=null)
				return entry.ID().getText();
			String value = entry.STRING().getText();	
			return "\"" + value.substring(1, value.length() - 1) + "\""; // use double quotes
		}

		private static List<String> helpFromEntry(EntryContext entry) {
			if(entry.comment()==null)
				return null;
			else
				return entry.comment().stream()
						.map(CommentContext::getText)
						.collect(Collectors.toList());
		}
		
		@Override
		public void exitIdentifier(IdentifierContext ctx) {
			setNodeValue(ctx, ctx.getText());
		}
		
		@Override
		public void exitArray(ArrayContext ctx) {
			List<Object> values = ctx.value().stream()
					.map(this::getNodeValue)
					.collect(Collectors.toList());
			setNodeValue(ctx, values);
		}
		
		
		@Override
		public void exitValue(ValueContext ctx) {
			setNodeValue(ctx, getNodeValue(ctx.getChild(0)));
		}
		
		
		@Override
		public void exitLiteral(LiteralContext ctx) {
			setNodeValue(ctx, ctx.getText().replaceAll("'", "\""));
		}

		
		@Override
		public void exitMethod(MethodContext ctx) {
			Method method = new Method();
			method.name = ctx.identifier().getText();
			method.params = ctx.value().stream()
					.map(this::getNodeValue)
					.collect(Collectors.toList());
			setNodeValue(ctx, method);
		}
		
		@Override
		public void exitFunction(FunctionContext ctx) {
			setNodeValue(ctx, new Function());
		}
		
		
		private Property entryToProperty(Map.Entry<String, Object> entry) {
			Property prop = new Property();
			prop.setName(entry.getKey());
			Object propType = entry.getValue();
			propTypeToProperty(propType, prop);
			if(prop.getValidator()==AlwaysValidator.INSTANCE) {
				System.err.println(entry.getKey() + ": " + String.valueOf(propType));
			}
			extractHelp(prop);
			return prop;
		}

		private void extractHelp(Property prop) {
			List<String> helps = helpStrings.get(prop.getName());
			if(helps!=null) {
				String help = helpStringsToHelp(helps);
				if(help!=null && !help.isEmpty())
					prop.setHelp(help);
			}
		}
	}
	
	private static String helpStringsToHelp(List<String> helps) {
		boolean isSentence = false;
		StringBuilder sb = new StringBuilder();
		for(String help : helps) {
			help = help.trim();
			if(help.startsWith("//"))
				help = help.substring("//".length()).trim();
			else if(help.startsWith("/*"))
				help = multiHelpStringToHelp(help);
			if(help.isEmpty())
				continue;
			if(sb.length() > 0 && !isSentence)
				sb.append(" ");
			sb.append(help);
			isSentence = help.endsWith(".");
		}
		return sb.toString();
	}
	
	private static List<String> MULTI_HELP_STARTS = Arrays.asList("/**", "/*", "*/", "*");
	
	private static String multiHelpStringToHelp(String help) {
		boolean isSentence = false;
		StringBuilder sb = new StringBuilder();
		String[] lines = help.split("\n");
		for(String line : lines) {
			line = line.trim();
			for(String start : MULTI_HELP_STARTS) {
				if(line.startsWith(start))
					line = line.substring(start.length()).trim();
			}
			if(line.isEmpty())
				continue;
			if(sb.length() > 0 && !isSentence)
				sb.append(" ");
			sb.append(line);
			isSentence = line.endsWith(".");
		}
		return sb.toString();
	}

	private static void propTypeToProperty(Object propType, Property prop) {
		if(propType==null) {
			System.err.println(prop.getName() + " is null!");
			prop.setValidator(ANY_TYPE_VALIDATOR); 
		} else if(propType instanceof String)
			propTypeToProperty((String)propType, prop);
		else if(propType instanceof Method)
			propTypeToProperty((Method)propType, prop);
		else if(propType instanceof Function)
			prop.setValidator(ANY_TYPE_VALIDATOR);
	}
	
	private static void propTypeToProperty(Method method, Property prop) {
		Object firstParam = method.params.size() > 0 ? method.params.get(0) : null;
		switch(method.name) {
		case "all":
			if("children".equals(prop.getName()))
				prop.setValidator(HTML_TYPE_VALIDATOR);
			else
				propTypeToProperty(firstParam, prop);
			break;
		case "requiredForA11y":
		case "isRequiredForA11y":
			prop.setRequiredForAccessibility(true);
			propTypeToProperty(firstParam, prop);
			break;
		case "PropTypes.oneOf":
			if(firstParam instanceof List) {
				Set<String> values = ((List<?>)firstParam).stream()
						.map(Object::toString)
						.collect(Collectors.toSet());
				if(values.stream().map(String::valueOf).map(s->s.charAt(0)).anyMatch(c->c!='"' && c!='\''))
					prop.setValidator(new ValueSetValidator(values));
				else
					prop.setValidator(new ValueSetValidator(values));
			} else
				System.err.println(method.name);
			break;
		case "PropTypes.oneOfType":
			if(firstParam instanceof List) {
				Set<IType> types = ((List<?>)firstParam).stream()
					.map(param->param.toString())
					.map(PropTypesExtractor::propTypeToIType)
					.collect(Collectors.toSet());
				prop.setValidator(new TypeSetValidator(types));
			} else
				System.err.println(method.name);
			break;
		default:
			System.err.println(method.name);
		}
	}
	
	private static void propTypeToProperty(String type, Property prop) {
		if(type.endsWith(".isRequired")) {
			prop.setRequired(true);
			type = type.substring(0, type.lastIndexOf(".isRequired"));
		}
		IType itype = propTypeToIType(type);
		if(itype!=null)
			prop.setValidator(new TypeValidator(itype));
		else {
			if(WIDGET.containsKey(prop.getName()))
				prop.setValidator(WIDGET.get(prop.getName()));
			else switch(type) {
				case "PropTypes.func":
					switch(prop.getName()) {
					case "onClick":
					case "onMouseEnter":
					case "onMouseOver":
					case "onMouseOut":
					case "onMouseLeave":
						prop.setValidator(MOUSE_CHANGED_VALIDATOR);
						break;
					case "onKeyDown":
						prop.setValidator(KEYBOARD_CHANGED_VALIDATOR);
						break;
					case "onLoad":
					case "onEnter":
					case "onEntering":
					case "onEntered":
					case "onExit":
					case "onExiting":
					case "onExited":
					case "onClose":
					case "onHide":
					case "onDismiss":
					case "onBlur":
					case "onFocus":
					case "onError":
						prop.setValidator(CALLBACK_VALIDATOR);
						break;
				}
			}
			if(prop.getValidator()==AlwaysValidator.INSTANCE)
				System.err.println(type);
		}
	}
	
	private static IType propTypeToIType(String type) {
		switch(type) {
		case "PropTypes.bool":
			return BooleanType.instance();
		case "PropTypes.number":
			return IntegerType.instance();
		case "PropTypes.string":
			return TextType.instance();
		case "PropTypes.node":
		case "elementType":
			return HtmlType.instance();
		case "PropTypes.any":
			return AnyType.instance();
		default:
			return null;
		}
	}
	
	static class Function {
		
	}

	static class Method {
		String name;
		List<Object> params;
		
		@Override
		public String toString() {
			return name + "(" + params.stream().map(String::valueOf).collect(Collectors.joining(", ")) + ")"; 
		}
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

}
