package prompto.utils;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.antlr.v4.runtime.tree.ParseTree;
import org.antlr.v4.runtime.tree.ParseTreeProperty;

import prompto.property.Property;
import prompto.utils.PropTypesExtractorParser.ArrayContext;
import prompto.utils.PropTypesExtractorParser.CommentContext;
import prompto.utils.PropTypesExtractorParser.EntryContext;
import prompto.utils.PropTypesExtractorParser.FunctionContext;
import prompto.utils.PropTypesExtractorParser.IdentifierContext;
import prompto.utils.PropTypesExtractorParser.LiteralContext;
import prompto.utils.PropTypesExtractorParser.MethodContext;
import prompto.utils.PropTypesExtractorParser.ObjectContext;
import prompto.utils.PropTypesExtractorParser.PropTypesContext;
import prompto.utils.PropTypesExtractorParser.ValueContext;

class PropertyListBuilder extends PropTypesExtractorBaseListener {

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
		PropTypes propTypes = new PropTypes();
		Object obj = getNodeValue(ctx.value());
		if(obj instanceof JSMethod) {
			JSMethod method = (JSMethod)obj;
			switch(method.name) {
			case "_extends":
				propTypes.inherited = method.params.subList(0,  method.params.size() - 1).stream().map(Object::toString).collect(Collectors.toList());
				obj = method.params.get(method.params.size() - 1);
				break;
			}		
		}
		@SuppressWarnings("unchecked")
		Map<String, Object> value = (Map<String, Object>)obj;
		propTypes.properties = value.entrySet().stream()
				.map(this::entryToProperty)
				.collect(Collectors.toList());
		setNodeValue(ctx, propTypes);
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
		JSMethod method = new JSMethod();
		method.name = ctx.identifier().getText();
		method.params = ctx.value().stream()
				.map(this::getNodeValue)
				.collect(Collectors.toList());
		setNodeValue(ctx, method);
	}
	
	@Override
	public void exitFunction(FunctionContext ctx) {
		setNodeValue(ctx, new JSFunction());
	}
	
	
	private Property entryToProperty(Map.Entry<String, Object> entry) {
		return PropTypeConverter.convert(entry.getKey(), entry.getValue(), helpStrings.get(entry.getKey()));
	}

}