package prompto.utils.prop_types_extractor;

import static prompto.utils.prop_types_extractor.PropTypesConstants.*;

import java.util.Arrays;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import prompto.property.AlwaysValidator;
import prompto.property.Property;
import prompto.property.TypeSetValidator;
import prompto.property.TypeValidator;
import prompto.property.ValueSetValidator;
import prompto.type.AnyType;
import prompto.type.BooleanType;
import prompto.type.IType;
import prompto.type.IntegerType;
import prompto.type.TextType;

public abstract class PropTypeConverter {

	public static Property convert(String name, Object propType, List<String> helps) {
		Property prop = new Property();
		prop.setName(name);
		propTypeToProperty(propType, prop);
		if(prop.getValidator()==AlwaysValidator.INSTANCE) {
			System.err.println(name + ": " + String.valueOf(propType));
		}
		prop.setHelp(extractHelp(helps));
		return prop;
	}

	static String extractHelp(List<String> helps) {
		if(helps==null || helps.isEmpty())
			return null;
		boolean isSentence = false;
		StringBuilder sb = new StringBuilder();
		for(String help : helps) {
			help = help.trim();
			if(help.startsWith("//"))
				help = help.substring("//".length()).trim();
			else if(help.startsWith("/*"))
				help = extractMultiHelp(help);
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
	
	private static String extractMultiHelp(String help) {
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
	
	static void propTypeToProperty(Object propType, Property prop) {
		if(propType==null) {
			System.err.println(prop.getName() + " is null!");
			prop.setValidator(ANY_TYPE_VALIDATOR); 
		} else if(propType instanceof String)
			propTypeToProperty((String)propType, prop);
		else if(propType instanceof JSMethod)
			propTypeToProperty((JSMethod)propType, prop);
		else if(propType instanceof JSFunction)
			prop.setValidator(ANY_TYPE_VALIDATOR);
	}
	
	private static void propTypeToProperty(JSMethod method, Property prop) {
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
					.map(PropTypeConverter::propTypeToIType)
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
			if(PropTypesExtractor.WIDGET.containsKey(prop.getName()))
				prop.setValidator(PropTypesExtractor.WIDGET.get(prop.getName()));
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
			return TextType.instance();
		case "PropTypes.any":
			return AnyType.instance();
		default:
			return null;
		}
	}
	


}
