package prompto.utils.prop_types_extractor;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.HashMap;
import java.util.function.Function;

import prompto.declaration.DeclarationList;
import prompto.grammar.Annotation;
import prompto.parser.Dialect;
import prompto.parser.OCleverParser;
import prompto.runtime.Context;
import prompto.utils.CodeWriter;

@SuppressWarnings("serial")
public class PropTypesConverter {

	static class PropTypesMap extends HashMap<String, Function<PropTypesMap, Annotation>> {
	}
	
	
	public static void main(String[] args) throws Exception {
		PropTypesMap propTypesMap = new PropTypesMap();
		File node_modules = new File("../EditorApp/src/web/node_modules/");
		PropTypesExtractor.extractPropTypes(node_modules, "react-overlays", "lib", propTypesMap);
		PropTypesExtractor.extractPropTypes(node_modules, "react-bootstrap", "es", propTypesMap);
		// react-bootstrap-3
		File widget_dir = new File("src/main/resources/react-bootstrap-3/");
		DeclarationList decls = readWidgetDeclarations(new File(widget_dir, "React-Bootstrap-3.poc"));
		attachPropTypes(propTypesMap, decls);
		writeWidgetDeclarations(new File(widget_dir, "React-Bootstrap-3.poc"), decls);
	}

	private static void attachPropTypes(PropTypesMap propTypesMap, DeclarationList decls) {
		decls.forEach(decl->{
			Function<PropTypesMap, Annotation> annotation = propTypesMap.get(decl.getName());
			if(annotation!=null) {
				decl.removeAnnotation("@WidgetProperties");
				decl.addAnnotation(annotation.apply(propTypesMap));
			}
		});
	}

	private static void writeWidgetDeclarations(File file, DeclarationList decls) throws Exception {
		Context context = Context.newGlobalContext();
		registerBuiltins(context);
		CodeWriter writer = new CodeWriter(Dialect.O, context);
		decls.toDialect(writer);
		try(OutputStream output = new FileOutputStream(file)) {
			output.write(writer.toString().getBytes());
		}
		// check
		DeclarationList read = readWidgetDeclarations(file);
		if(read.size()!=decls.size())
			throw new Exception("Bouh!");
	}

	private static void registerBuiltins(Context context) throws Exception {
		// dummy callbacks to allow type resolution
		String code = "abstract method Callback();"
				+ "abstract method ClickEventCallback();"
				+ "abstract method MouseEventCallback();"
				+ "abstract method ItemSelectedCallback();"
				+ "abstract method ToggleChangedCallback();"
				+ "abstract method WidgetCallback();";
		DeclarationList decls = new OCleverParser(code).parse_declaration_list();
		decls.register(context);
	}

	private static DeclarationList readWidgetDeclarations(File file) throws Exception {
		try(InputStream input = new FileInputStream(file)) {
			return new OCleverParser(input).parse_declaration_list();
		}
	}
	



}