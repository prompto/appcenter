package prompto.utils;

import java.util.HashMap;
import java.util.Map;

import prompto.grammar.Identifier;
import prompto.property.IPropertyValidator;
import prompto.property.TypeValidator;
import prompto.type.AnyType;
import prompto.type.CategoryType;
import prompto.type.HtmlType;

@SuppressWarnings("serial")
public class PropTypesConstants {

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
				put("react-bootstrap", ReactBootstrap3PropTypes.VALIDATORS);
			}
		};	
	}

}
