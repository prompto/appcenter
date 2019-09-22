package prompto.utils.prop_types_extractor;

import java.util.List;
import java.util.stream.Collectors;

class JSMethod {
	String name;
	List<Object> params;
	
	@Override
	public String toString() {
		return name + "(" + params.stream().map(String::valueOf).collect(Collectors.joining(", ")) + ")"; 
	}
}