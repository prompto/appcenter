package prompto.utils.prop_types_extractor;

import java.util.Arrays;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;

import prompto.grammar.Identifier;
import prompto.property.IPropertyValidator;
import prompto.property.TypeValidator;
import prompto.property.ValueSetValidator;
import prompto.type.AnyType;
import prompto.type.BooleanType;
import prompto.type.CategoryType;
import prompto.type.CssType;
import prompto.type.DecimalType;
import prompto.type.HtmlType;
import prompto.type.IntegerType;
import prompto.type.TextType;

@SuppressWarnings("serial")
public class PropTypesConstants {

	public static final IPropertyValidator CALLBACK_VALIDATOR = new TypeValidator(new CategoryType(new Identifier("Callback")));
	public static final IPropertyValidator WIDGET_REF_VALIDATOR = new TypeValidator(new CategoryType(new Identifier("WidgetCallback")));
	public static final IPropertyValidator ITEM_SELECTED_VALIDATOR = new TypeValidator(new CategoryType(new Identifier("ItemSelectedCallback")));
	public static final IPropertyValidator PAGE_SELECTED_VALIDATOR = new TypeValidator(new CategoryType(new Identifier("PageSelectedCallback")));
	public static final IPropertyValidator TOGGLE_CHANGED_VALIDATOR = new TypeValidator(new CategoryType(new Identifier("ToggleChangedCallback")));
	public static final IPropertyValidator MOUSE_CHANGED_VALIDATOR = new TypeValidator(new CategoryType(new Identifier("MouseEventCallback")));
	public static final IPropertyValidator KEYBOARD_CHANGED_VALIDATOR = new TypeValidator(new CategoryType(new Identifier("KeyboardEventCallback")));
	public static final IPropertyValidator ANY_TYPE_VALIDATOR = new TypeValidator(AnyType.instance());
	public static final IPropertyValidator BOOLEAN_TYPE_VALIDATOR = new TypeValidator(BooleanType.instance());
	public static final IPropertyValidator INTEGER_TYPE_VALIDATOR = new TypeValidator(IntegerType.instance());
	public static final IPropertyValidator DECIMAL_TYPE_VALIDATOR = new TypeValidator(DecimalType.instance());
	public static final IPropertyValidator TEXT_TYPE_VALIDATOR = new TypeValidator(TextType.instance());
	public static final IPropertyValidator CSS_TYPE_VALIDATOR = new TypeValidator(CssType.instance());
	public static final IPropertyValidator HTML_TYPE_VALIDATOR = new TypeValidator(HtmlType.instance());
	public static final IPropertyValidator AUTOFILL_VALIDATOR = new ValueSetValidator(new HashSet<>(Arrays.asList(
			"name", "honorific-prefix", "given-name", "additional-name", "family-name", "honorific-suffix", "nickname", "organization-title", 
			"username", "new-password", "current-password", "one-time-code", 
			"organization", "street-address", "address-line1", "address-line2", "address-line3", "address-level1", "address-level2", "address-level3", "address-level4",
			"country", "country-name", "postal-code", "email", "impp",
			"cc-name", "cc-given-name", "cc-additional-name", "cc-family-name", "cc-number", "cc-exp", "cc-exp-month", "cc-exp-year", "cc-csc", "cc-type",
			"transaction-currency", "transaction-amount", "language", "bday", "bday-day", "bday-month", "bday-year", "sex", "url", "photo",
			"tel", "tel-country-code", "tel-national", 	"tel-area-code", "tel-local", "tel-local-prefix", "tel-local-suffix", "tel-extension", null)));
	public static final IPropertyValidator COLOR_VALIDATOR = TEXT_TYPE_VALIDATOR; // for now, see https://drafts.csswg.org/css-color/#typedef-color

	
	public static final Map<String, Map<String, Map<String, IPropertyValidator>>> SPECIFIC_VALIDATORS = populateSpecificValidators();

	private static Map<String, Map<String, Map<String, IPropertyValidator>>> populateSpecificValidators() {
		return new HashMap<String, Map<String, Map<String, IPropertyValidator>>>() {
			{
				put("react-bootstrap", ReactBootstrap3PropTypes.VALIDATORS);
			}
		};	
	}

}
