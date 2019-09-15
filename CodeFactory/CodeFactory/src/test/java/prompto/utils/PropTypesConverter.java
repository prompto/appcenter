package prompto.utils;

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
		CodeWriter writer = new CodeWriter(Dialect.O, Context.newGlobalContext());
		decls.toDialect(writer);
		try(OutputStream output = new FileOutputStream(file)) {
			output.write(writer.toString().getBytes());
		}
		// check
		DeclarationList read = readWidgetDeclarations(file);
		if(read.size()!=decls.size())
			throw new Exception("Bouh!");
	}

	private static DeclarationList readWidgetDeclarations(File file) throws Exception {
		try(InputStream input = new FileInputStream(file)) {
			return new OCleverParser(input).parse_declaration_list();
		}
	}
	



}
