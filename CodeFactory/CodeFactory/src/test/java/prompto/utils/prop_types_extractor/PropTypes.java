package prompto.utils.prop_types_extractor;

import java.io.StringWriter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import prompto.grammar.Annotation;
import prompto.literal.DocEntry;
import prompto.literal.DocEntryList;
import prompto.literal.DocumentLiteral;
import prompto.parser.OCleverParser;
import prompto.property.Property;
import prompto.utils.prop_types_extractor.PropTypesConverter.PropTypesMap;

public class PropTypes {
	
	List<String> inherited;
	List<Property> properties;
	DocEntryList entries = null;
	
	private String toDocumentLiteral() {
		StringWriter entriesWriter = new StringWriter();
		entriesWriter.append("{\n\t");
		boolean first = true;
		for(Property prop : properties) {
			if(first)
				first = false;
			else
				entriesWriter.append(",\n\t");
			prop.toLiteral(entriesWriter);
		}
		entriesWriter.append("\n}");
		return entriesWriter.toString();
	}

	public DocEntryList toDocEntries(PropTypesMap propertyMap) {
		if(entries==null) {
			if(inherited==null || inherited.isEmpty()) {
				entries = localPropertiesToDocEntries();
			} else {
				Map<String, DocEntry> mergedMap = new HashMap<>();
				inherited.forEach(name->mergeWidgetEntries(name, propertyMap, mergedMap));
				mergeDocEntries(mergedMap, localPropertiesToDocumentLiteral().getEntries());
				DocEntryList merged = new DocEntryList();
				merged.addAll(mergedMap.values());
				entries = new DocEntryList(new DocEntry(null, new DocumentLiteral(merged)));
			}
		}
		return entries;
	}

	private void mergeWidgetEntries(String name, PropTypesMap propertyMap, Map<String, DocEntry> mergedMap) {
		int idx = name.lastIndexOf('.');
		if(idx>=0)
			name = name.substring(0, idx);
		if(propertyMap.containsKey(name)) {
			Annotation inherited = propertyMap.get(name).apply(propertyMap);
			Object types = inherited.getDefaultArgument();
			if(types instanceof DocumentLiteral)
				mergeDocEntries(mergedMap, ((DocumentLiteral)types).getEntries());
		}
		
	}
	
	private void mergeDocEntries(Map<String, DocEntry> mergedMap, List<DocEntry> toMerge) {
		toMerge.forEach(arg->{
			mergedMap.put(arg.getKey().toString(), arg);
		});
	}
	
	
	private DocEntryList localPropertiesToDocEntries() {
		DocumentLiteral value = localPropertiesToDocumentLiteral();
		return new DocEntryList(new DocEntry(null, value));
	}
	
	private DocumentLiteral localPropertiesToDocumentLiteral() {
		String document_literal = toDocumentLiteral();
		OCleverParser parser = new OCleverParser(document_literal);
		return parser.doParse(parser::document_literal);
	}

	
}
