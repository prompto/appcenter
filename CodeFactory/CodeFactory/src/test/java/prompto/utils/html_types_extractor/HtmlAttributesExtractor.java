package prompto.utils.html_types_extractor;

import java.io.OutputStreamWriter;
import java.io.Writer;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import prompto.property.AlwaysValidator;
import prompto.property.HtmlProperty;
import prompto.property.IPropertyValidator;
import prompto.property.TypeSetValidator;
import prompto.property.ValueSetValidator;
import prompto.type.DateTimeType;
import prompto.type.DateType;


public class HtmlAttributesExtractor {
	
	static final String SOURCE = "https://html.spec.whatwg.org/dev/indices.html#attributes-3";
		
	public static void main(String[] args) throws Exception {
		Document doc = Jsoup.connect(SOURCE).get();
		Element body = doc.body();
		Element table = body.getElementById("attributes-1");
		List<AttributeDefinition> attributes = readAttributeDefinitions(table);
		List<HtmlProperty> properties = attributes.stream()
				.distinct()
				.map(AttributeDefinition::toProperty)
				.collect(Collectors.toList());
		Writer writer = new OutputStreamWriter(System.out);
		properties.forEach(prop->{
			prop.toLiteral(writer);
			try { writer.append(",\n"); } catch(Exception e) {}
		});
		/*
		table = body.getElementById("ix-event-handlers");
		List<AttributeDefinition> handlers = readAttributeDefinitions(table);
		properties = handlers.stream()
				.map(AttributeDefinition::toProperty)
				.collect(Collectors.toList());
		properties.forEach(prop->{
			prop.toLiteral(writer);
			try { writer.append(",\n"); } catch(Exception e) {}
		});
		*/
		writer.flush();
	}
	
	private static List<AttributeDefinition> readAttributeDefinitions(Element table) {
		Element tbody = table.getElementsByTag("tbody").first();
		Elements rows = tbody.getElementsByTag("tr");
		return rows.stream()
				.map(Element::children)
				.map(Elements::first)
				.map(HtmlAttributesExtractor::readAttibuteDefinition)
				.collect(Collectors.toList());
	}
	
	private static AttributeDefinition readAttibuteDefinition(Element cell) {
		AttributeDefinition def = new AttributeDefinition();
		def.name = cell.text();
		cell = cell.nextElementSibling();
		def.tags = cell.children().stream()
				.map(Element::text)
				.collect(Collectors.toList());
		cell = cell.nextElementSibling();
		def.help = cell.text();
		cell = cell.nextElementSibling();
		def.types = cell.children().stream()
				.map(Element::text)
				.collect(Collectors.toList());
		return def;
	}
	
	
	static class AttributeDefinition {

		public String name;
		public List<String> types;
		public String help;
		public List<String> tags;
		
		
		@Override
		public int hashCode() {
			return name.hashCode();
		}
		
		@Override
		public boolean equals(Object obj) {
			return obj instanceof AttributeDefinition && name.equals(((AttributeDefinition)obj).name);
		}
		
		@Override
		public String toString() {
			return "name: " + name + ", types: " + types + ", tags: " + tags + ", help: " + help;
		}
		
		public HtmlProperty toProperty() {
			HtmlProperty property = new HtmlProperty();
			property.setName(name);
			property.setValidator(convertTypes());
			property.setTags(convertTags());
			property.setHelp(help);
			return property;
		}

		private IPropertyValidator convertTypes() {
			if(types.size()==1) {
				String type = types.get(0);
				switch(type) {
				case "Boolean attribute":
					return PropTypesConstants.BOOLEAN_TYPE_VALIDATOR;
				case "Valid integer":
				case "Valid non-negative integer":
					return PropTypesConstants.INTEGER_TYPE_VALIDATOR;
				case "Valid floating-point number":
					return PropTypesConstants.DECIMAL_TYPE_VALIDATOR;
				case "Text":
				case "utf-8":
				case "Pattern":
				case "Serialized feature policy":
				case "Valid MIME type string":
				case "Set of space-separated tokens":
				case "Valid list of floating-point numbers":
				case "Unordered set of unique space-separated tokens":
				case "Valid browsing context name or keyword":
				case "Valid source size list":
				case "image candidate strings":
				case "Valid media query list":
				case "Valid hash-name reference":
				case "an iframe srcdoc document":
					return PropTypesConstants.TEXT_TYPE_VALIDATOR;
				case "Valid date string with optional time":
					return new TypeSetValidator(new HashSet<>(Arrays.asList(DateType.instance(), DateTimeType.instance(), null)));
				case "ID":
					return PropTypesConstants.ANY_TYPE_VALIDATOR;
				case "<color>":
					return PropTypesConstants.COLOR_VALIDATOR;
				case "Autofill field":
					return PropTypesConstants.AUTOFILL_VALIDATOR;
				case "input type keyword":
					return new ValueSetValidator(new HashSet<>(Arrays.asList("hidden", "text", "search", "tel", "url", "email", "password", "date", "month", "week", "time", "datetime-local", "number", "range",
							"color", "checkbox", "radio", "file", "submit", "image", "reset", "button", null)));
				case "Referrer policy":	
					return new ValueSetValidator(new HashSet<>(Arrays.asList("no-referrer", "no-referrer-when-downgrade", "same-origin", "origin",
					  "strict-origin", "origin-when-cross-origin", "strict-origin-when-cross-origin", "unsafe-url", null)));
				case "Event handler content attribute":
					return convertEventHandlerType();
				default:
					if(type.endsWith("URL potentially surrounded by spaces"))
						return PropTypesConstants.TEXT_TYPE_VALIDATOR;
					System.err.println("Unknown type: " + type);
					return AlwaysValidator.INSTANCE;
				}
			} else if(types.size() > 0) {
				Set<String> distinct = new HashSet<>(types);
				if(distinct.equals(new HashSet<>(Arrays.asList("true", "false"))))
					return PropTypesConstants.BOOLEAN_TYPE_VALIDATOR;
				else if(KNOWN_VALUE_SETS.contains(distinct)) {
					distinct.add(null);
					return new ValueSetValidator(distinct);
				}
				System.err.println("Unknown type: " + types);
				return AlwaysValidator.INSTANCE; // TODO
			} else {
				return AlwaysValidator.INSTANCE; // TODO
			}
		}
		
		static Set<Set<String>> KNOWN_VALUE_SETS = new HashSet<>(Arrays.asList(
				new HashSet<>(Arrays.asList("yes", "no")),
				new HashSet<>(Arrays.asList("on", "off")),
				new HashSet<>(Arrays.asList("on", "off", "none", "sentences", "words", "characters")),
				new HashSet<>(Arrays.asList("enter", "done", "go", "next", "previous", "search", "send")),
				new HashSet<>(Arrays.asList("anonymous", "use-credentials")),
				new HashSet<>(Arrays.asList("application/x-www-form-urlencoded", "multipart/form-data", "text/plain")),
				new HashSet<>(Arrays.asList("subtitles", "captions", "descriptions", "chapters", "metadata")),
				new HashSet<>(Arrays.asList("none", "text", "tel", "email", "url", "numeric", "decimal", "search")),
				new HashSet<>(Arrays.asList("content-type", "default-style", "refresh", "x-ua-compatible", "content-security-policy")),
				new HashSet<>(Arrays.asList("GET", "POST", "dialog")),
				new HashSet<>(Arrays.asList("none", "metadata", "auto")),
				new HashSet<>(Arrays.asList("submit", "reset", "button")),
				new HashSet<>(Arrays.asList("1", "a", "A", "i", "I")),
				new HashSet<>(Arrays.asList("soft", "hard")),
				new HashSet<>(Arrays.asList("ltr", "rtl")),
				new HashSet<>(Arrays.asList("ltr", "rtl", "auto")),
				new HashSet<>(Arrays.asList("row", "col", "rowgroup", "colgroup")),
				new HashSet<>(Arrays.asList("circle", "rect", "poly", "default")),
				new HashSet<>(Arrays.asList("sync", "async", "auto"))));


		private IPropertyValidator convertEventHandlerType() {
			return AlwaysValidator.INSTANCE; // TODO, but favor react events over raw html ones 
		}

		public Set<String> convertTags() {
			if(tags.size()==1 && tags.get(0).equals("HTML elements"))
				return null;
			else
				return new HashSet<>(tags);
		}
}


	
	
}
