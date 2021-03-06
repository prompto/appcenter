/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./react-bootstrap-3-widgets.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../../../react-bootstrap-typeahead/es/components/AsyncTypeahead.react.js":
/*!*******************************************************************************************************!*\
  !*** /Users/ericvergnaud/Development/react-bootstrap-typeahead/es/components/AsyncTypeahead.react.js ***!
  \*******************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _containers_asyncContainer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../containers/asyncContainer */ "../../../react-bootstrap-typeahead/es/containers/asyncContainer.js");
/* harmony import */ var _Typeahead_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Typeahead.react */ "../../../react-bootstrap-typeahead/es/components/Typeahead.react.js");


/* harmony default export */ __webpack_exports__["default"] = (Object(_containers_asyncContainer__WEBPACK_IMPORTED_MODULE_0__["default"])(_Typeahead_react__WEBPACK_IMPORTED_MODULE_1__["default"]));

/***/ }),

/***/ "../../../react-bootstrap-typeahead/es/components/ClearButton.react.js":
/*!****************************************************************************************************!*\
  !*** /Users/ericvergnaud/Development/react-bootstrap-typeahead/es/components/ClearButton.react.js ***!
  \****************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "../../../react-bootstrap-typeahead/node_modules/@babel/runtime/helpers/extends.js");
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/objectWithoutPropertiesLoose */ "../../../react-bootstrap-typeahead/node_modules/@babel/runtime/helpers/objectWithoutPropertiesLoose.js");
/* harmony import */ var _babel_runtime_helpers_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ "../../../react-bootstrap-typeahead/node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! prop-types */ "prop-types");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils */ "../../../react-bootstrap-typeahead/es/utils/index.js");
/* harmony import */ var _propTypes__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../propTypes */ "../../../react-bootstrap-typeahead/es/propTypes.js");







var propTypes = {
  label: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.string,
  onClick: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.func,
  size: _propTypes__WEBPACK_IMPORTED_MODULE_6__["sizeType"]
};
var defaultProps = {
  label: 'Clear',
  onClick: _utils__WEBPACK_IMPORTED_MODULE_5__["noop"]
};
/**
 * ClearButton
 *
 * http://getbootstrap.com/css/#helper-classes-close
 */

var ClearButton = function ClearButton(_ref) {
  var className = _ref.className,
      label = _ref.label,
      _onClick = _ref.onClick,
      size = _ref.size,
      props = _babel_runtime_helpers_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1___default()(_ref, ["className", "label", "onClick", "size"]);

  return (
    /*#__PURE__*/
    react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("button", _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, props, {
      "aria-label": label,
      className: classnames__WEBPACK_IMPORTED_MODULE_2___default()('close', 'rbt-close', {
        'rbt-close-lg': Object(_utils__WEBPACK_IMPORTED_MODULE_5__["isSizeLarge"])(size)
      }, className),
      onClick: function onClick(e) {
        e.stopPropagation();

        _onClick(e);
      },
      type: "button"
    }),
    /*#__PURE__*/
    react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("span", {
      "aria-hidden": "true"
    }, "\xD7"),
    /*#__PURE__*/
    react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("span", {
      className: "sr-only"
    }, label))
  );
};

ClearButton.propTypes = propTypes;
ClearButton.defaultProps = defaultProps;
/* harmony default export */ __webpack_exports__["default"] = (ClearButton);

/***/ }),

/***/ "../../../react-bootstrap-typeahead/es/components/Highlighter.react.js":
/*!****************************************************************************************************!*\
  !*** /Users/ericvergnaud/Development/react-bootstrap-typeahead/es/components/Highlighter.react.js ***!
  \****************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/inheritsLoose */ "../../../react-bootstrap-typeahead/node_modules/@babel/runtime/helpers/inheritsLoose.js");
/* harmony import */ var _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../../../react-bootstrap-typeahead/node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ "prop-types");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils */ "../../../react-bootstrap-typeahead/es/utils/index.js");





var propTypes = {
  children: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string.isRequired,
  highlightClassName: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string,
  search: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string.isRequired
};
var defaultProps = {
  highlightClassName: 'rbt-highlight-text'
};
/**
 * Stripped-down version of https://github.com/helior/react-highlighter
 *
 * Results are already filtered by the time the component is used internally so
 * we can safely ignore case and diacritical marks for the purposes of matching.
 */

var Highlighter =
/*#__PURE__*/
function (_React$PureComponent) {
  _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_0___default()(Highlighter, _React$PureComponent);

  function Highlighter() {
    return _React$PureComponent.apply(this, arguments) || this;
  }

  var _proto = Highlighter.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        children = _this$props.children,
        highlightClassName = _this$props.highlightClassName,
        search = _this$props.search;

    if (!search || !children) {
      return children;
    }

    var matchCount = 0;
    var remaining = children;
    var highlighterChildren = [];

    while (remaining) {
      var bounds = Object(_utils__WEBPACK_IMPORTED_MODULE_4__["getMatchBounds"])(remaining, search); // No match anywhere in the remaining string, stop.

      if (!bounds) {
        highlighterChildren.push(remaining);
        break;
      } // Capture the string that leads up to a match.


      var nonMatch = remaining.slice(0, bounds.start);

      if (nonMatch) {
        highlighterChildren.push(nonMatch);
      } // Capture the matching string.


      var match = remaining.slice(bounds.start, bounds.end);
      highlighterChildren.push(
      /*#__PURE__*/
      react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("mark", {
        className: highlightClassName,
        key: matchCount
      }, match));
      matchCount += 1; // And if there's anything left over, continue the loop.

      remaining = remaining.slice(bounds.end);
    }

    return highlighterChildren;
  };

  return Highlighter;
}(react__WEBPACK_IMPORTED_MODULE_3___default.a.PureComponent);

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(Highlighter, "propTypes", propTypes);

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(Highlighter, "defaultProps", defaultProps);

/* harmony default export */ __webpack_exports__["default"] = (Highlighter);

/***/ }),

/***/ "../../../react-bootstrap-typeahead/es/components/Input.react.js":
/*!**********************************************************************************************!*\
  !*** /Users/ericvergnaud/Development/react-bootstrap-typeahead/es/components/Input.react.js ***!
  \**********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "../../../react-bootstrap-typeahead/node_modules/@babel/runtime/helpers/extends.js");
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "../../../react-bootstrap-typeahead/node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);



var Input = react__WEBPACK_IMPORTED_MODULE_2___default.a.forwardRef(function (props, ref) {
  return (
    /*#__PURE__*/
    react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("input", _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, props, {
      className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('rbt-input-main', props.className),
      ref: ref
    }))
  );
});
/* harmony default export */ __webpack_exports__["default"] = (Input);

/***/ }),

/***/ "../../../react-bootstrap-typeahead/es/components/Loader.react.js":
/*!***********************************************************************************************!*\
  !*** /Users/ericvergnaud/Development/react-bootstrap-typeahead/es/components/Loader.react.js ***!
  \***********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! classnames */ "../../../react-bootstrap-typeahead/node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils */ "../../../react-bootstrap-typeahead/es/utils/index.js");
/* harmony import */ var _propTypes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../propTypes */ "../../../react-bootstrap-typeahead/es/propTypes.js");





var Loader = function Loader(_ref) {
  var size = _ref.size;
  return (
    /*#__PURE__*/
    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      className: classnames__WEBPACK_IMPORTED_MODULE_0___default()('rbt-loader', {
        'rbt-loader-lg': Object(_utils__WEBPACK_IMPORTED_MODULE_2__["isSizeLarge"])(size),
        'rbt-loader-sm': Object(_utils__WEBPACK_IMPORTED_MODULE_2__["isSizeSmall"])(size)
      })
    })
  );
};

Loader.propTypes = {
  size: _propTypes__WEBPACK_IMPORTED_MODULE_3__["sizeType"]
};
/* harmony default export */ __webpack_exports__["default"] = (Loader);

/***/ }),

/***/ "../../../react-bootstrap-typeahead/es/components/Menu.react.js":
/*!*********************************************************************************************!*\
  !*** /Users/ericvergnaud/Development/react-bootstrap-typeahead/es/components/Menu.react.js ***!
  \*********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/inheritsLoose */ "../../../react-bootstrap-typeahead/node_modules/@babel/runtime/helpers/inheritsLoose.js");
/* harmony import */ var _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../../../react-bootstrap-typeahead/node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "../../../react-bootstrap-typeahead/node_modules/@babel/runtime/helpers/extends.js");
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! classnames */ "../../../react-bootstrap-typeahead/node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! prop-types */ "prop-types");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _MenuItem_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./MenuItem.react */ "../../../react-bootstrap-typeahead/es/components/MenuItem.react.js");
/* harmony import */ var _propTypes__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../propTypes */ "../../../react-bootstrap-typeahead/es/propTypes.js");









var MenuDivider = function MenuDivider(props) {
  return (
    /*#__PURE__*/
    react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("li", {
      className: "divider dropdown-divider",
      role: "separator"
    })
  );
};

var MenuHeader = function MenuHeader(props) {
  return (
    /*#__PURE__*/
    react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("li", _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_2___default()({}, props, {
      className: "dropdown-header"
    }))
  );
};

var propTypes = {
  'aria-label': prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.string,

  /**
   * Message to display in the menu if there are no valid results.
   */
  emptyLabel: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.node,

  /**
   * Needed for accessibility.
   */
  id: Object(_propTypes__WEBPACK_IMPORTED_MODULE_7__["checkPropType"])(prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.number, prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.string]), _propTypes__WEBPACK_IMPORTED_MODULE_7__["isRequiredForA11y"]),

  /**
   * Maximum height of the dropdown menu.
   */
  maxHeight: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.string
};
var defaultProps = {
  'aria-label': 'menu-options',
  emptyLabel: 'No matches found.',
  maxHeight: '300px'
};
/**
 * Menu component that handles empty state when passed a set of results.
 */

var Menu =
/*#__PURE__*/
function (_React$Component) {
  _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_0___default()(Menu, _React$Component);

  function Menu() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = Menu.prototype;

  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    var _this$props = this.props,
        inputHeight = _this$props.inputHeight,
        scheduleUpdate = _this$props.scheduleUpdate; // Update the menu position if the height of the input changes.

    if (inputHeight !== prevProps.inputHeight) {
      scheduleUpdate();
    }
  };

  _proto.render = function render() {
    var _this$props2 = this.props,
        children = _this$props2.children,
        className = _this$props2.className,
        emptyLabel = _this$props2.emptyLabel,
        id = _this$props2.id,
        innerRef = _this$props2.innerRef,
        maxHeight = _this$props2.maxHeight,
        style = _this$props2.style,
        text = _this$props2.text;
    var contents = react__WEBPACK_IMPORTED_MODULE_5__["Children"].count(children) === 0 ?
    /*#__PURE__*/
    react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(_MenuItem_react__WEBPACK_IMPORTED_MODULE_6__["BaseMenuItem"], {
      disabled: true,
      role: "option"
    }, emptyLabel) : children;
    return (
      /*#__PURE__*/
      react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("ul", {
        "aria-label": this.props['aria-label'],
        className: classnames__WEBPACK_IMPORTED_MODULE_3___default()('rbt-menu', 'dropdown-menu', 'show', className),
        id: id,
        key: // Force a re-render if the text changes to ensure that menu
        // positioning updates correctly.
        text,
        ref: innerRef,
        role: "listbox",
        style: _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_2___default()({}, style, {
          display: 'block',
          maxHeight: maxHeight,
          overflow: 'auto'
        })
      }, contents)
    );
  };

  return Menu;
}(react__WEBPACK_IMPORTED_MODULE_5___default.a.Component);

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(Menu, "propTypes", propTypes);

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(Menu, "defaultProps", defaultProps);

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(Menu, "Divider", MenuDivider);

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(Menu, "Header", MenuHeader);

/* harmony default export */ __webpack_exports__["default"] = (Menu);

/***/ }),

/***/ "../../../react-bootstrap-typeahead/es/components/MenuItem.react.js":
/*!*************************************************************************************************!*\
  !*** /Users/ericvergnaud/Development/react-bootstrap-typeahead/es/components/MenuItem.react.js ***!
  \*************************************************************************************************/
/*! exports provided: BaseMenuItem, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BaseMenuItem", function() { return BaseMenuItem; });
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "../../../react-bootstrap-typeahead/node_modules/@babel/runtime/helpers/extends.js");
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/objectWithoutPropertiesLoose */ "../../../react-bootstrap-typeahead/node_modules/@babel/runtime/helpers/objectWithoutPropertiesLoose.js");
/* harmony import */ var _babel_runtime_helpers_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ "../../../react-bootstrap-typeahead/node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _containers_menuItemContainer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../containers/menuItemContainer */ "../../../react-bootstrap-typeahead/es/containers/menuItemContainer.js");





var BaseMenuItem = react__WEBPACK_IMPORTED_MODULE_3___default.a.forwardRef(function (_ref, ref) {
  var active = _ref.active,
      children = _ref.children,
      className = _ref.className,
      disabled = _ref.disabled,
      _onClick = _ref.onClick,
      onMouseDown = _ref.onMouseDown,
      props = _babel_runtime_helpers_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1___default()(_ref, ["active", "children", "className", "disabled", "onClick", "onMouseDown"]);

  var conditionalClassNames = {
    active: active,
    disabled: disabled
  };
  return (
    /*#__PURE__*/

    /* eslint-disable jsx-a11y/anchor-is-valid */
    react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("li", _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, props, {
      className: classnames__WEBPACK_IMPORTED_MODULE_2___default()(conditionalClassNames, className),
      ref: ref
    }),
    /*#__PURE__*/
    react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("a", {
      className: classnames__WEBPACK_IMPORTED_MODULE_2___default()('dropdown-item', conditionalClassNames),
      href: "#",
      onClick: function onClick(e) {
        e.preventDefault();
        !disabled && _onClick && _onClick(e);
      },
      onMouseDown: onMouseDown
    }, children))
    /* eslint-enable jsx-a11y/anchor-is-valid */

  );
});

/* harmony default export */ __webpack_exports__["default"] = (Object(_containers_menuItemContainer__WEBPACK_IMPORTED_MODULE_4__["default"])(BaseMenuItem));

/***/ }),

/***/ "../../../react-bootstrap-typeahead/es/components/Token.react.js":
/*!**********************************************************************************************!*\
  !*** /Users/ericvergnaud/Development/react-bootstrap-typeahead/es/components/Token.react.js ***!
  \**********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "../../../react-bootstrap-typeahead/node_modules/@babel/runtime/helpers/extends.js");
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/objectWithoutPropertiesLoose */ "../../../react-bootstrap-typeahead/node_modules/@babel/runtime/helpers/objectWithoutPropertiesLoose.js");
/* harmony import */ var _babel_runtime_helpers_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "../../../react-bootstrap-typeahead/node_modules/@babel/runtime/helpers/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/inheritsLoose */ "../../../react-bootstrap-typeahead/node_modules/@babel/runtime/helpers/inheritsLoose.js");
/* harmony import */ var _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../../../react-bootstrap-typeahead/node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! classnames */ "../../../react-bootstrap-typeahead/node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! prop-types */ "prop-types");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _ClearButton_react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./ClearButton.react */ "../../../react-bootstrap-typeahead/es/components/ClearButton.react.js");
/* harmony import */ var _containers_tokenContainer__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../containers/tokenContainer */ "../../../react-bootstrap-typeahead/es/containers/tokenContainer.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../utils */ "../../../react-bootstrap-typeahead/es/utils/index.js");











var propTypes = {
  active: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.bool,
  disabled: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.bool,

  /**
   * Handler for removing/deleting the token. If not defined, the token will
   * be rendered in a read-only state.
   */
  onRemove: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.func,

  /**
   * Explicitly force a read-only state on the token.
   */
  readOnly: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.bool,
  tabIndex: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.number
};
var defaultProps = {
  active: false,
  disabled: false,
  tabIndex: 0
};
/**
 * Token
 *
 * Individual token component, generally displayed within the TokenizerInput
 * component, but can also be rendered on its own.
 */

var Token =
/*#__PURE__*/
function (_React$Component) {
  _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_3___default()(Token, _React$Component);

  function Token() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default()(_this), "_renderRemoveableToken", function () {
      var _this$props = _this.props,
          active = _this$props.active,
          children = _this$props.children,
          className = _this$props.className,
          onRemove = _this$props.onRemove,
          props = _babel_runtime_helpers_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1___default()(_this$props, ["active", "children", "className", "onRemove"]);

      return (
        /*#__PURE__*/
        react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("div", _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, props, {
          className: classnames__WEBPACK_IMPORTED_MODULE_5___default()('rbt-token', 'rbt-token-removeable', {
            'rbt-token-active': active
          }, className)
        }), children,
        /*#__PURE__*/
        react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_ClearButton_react__WEBPACK_IMPORTED_MODULE_8__["default"], {
          className: "rbt-token-remove-button",
          label: "Remove",
          onClick: onRemove,
          tabIndex: -1
        }))
      );
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default()(_this), "_renderToken", function () {
      var _this$props2 = _this.props,
          children = _this$props2.children,
          className = _this$props2.className,
          disabled = _this$props2.disabled,
          href = _this$props2.href;
      var classnames = classnames__WEBPACK_IMPORTED_MODULE_5___default()('rbt-token', {
        'rbt-token-disabled': disabled
      }, className);

      if (href && !disabled) {
        return (
          /*#__PURE__*/
          react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("a", {
            className: classnames,
            href: href
          }, children)
        );
      }

      return (
        /*#__PURE__*/
        react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("div", {
          className: classnames
        }, children)
      );
    });

    return _this;
  }

  var _proto = Token.prototype;

  _proto.render = function render() {
    var _this$props3 = this.props,
        disabled = _this$props3.disabled,
        onRemove = _this$props3.onRemove,
        readOnly = _this$props3.readOnly;
    return !disabled && !readOnly && Object(_utils__WEBPACK_IMPORTED_MODULE_10__["isFunction"])(onRemove) ? this._renderRemoveableToken() : this._renderToken();
  };

  return Token;
}(react__WEBPACK_IMPORTED_MODULE_6___default.a.Component);

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(Token, "propTypes", propTypes);

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(Token, "defaultProps", defaultProps);

/* harmony default export */ __webpack_exports__["default"] = (Object(_containers_tokenContainer__WEBPACK_IMPORTED_MODULE_9__["default"])(Token));

/***/ }),

/***/ "../../../react-bootstrap-typeahead/es/components/Typeahead.react.js":
/*!**************************************************************************************************!*\
  !*** /Users/ericvergnaud/Development/react-bootstrap-typeahead/es/components/Typeahead.react.js ***!
  \**************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/objectWithoutPropertiesLoose */ "../../../react-bootstrap-typeahead/node_modules/@babel/runtime/helpers/objectWithoutPropertiesLoose.js");
/* harmony import */ var _babel_runtime_helpers_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "../../../react-bootstrap-typeahead/node_modules/@babel/runtime/helpers/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/inheritsLoose */ "../../../react-bootstrap-typeahead/node_modules/@babel/runtime/helpers/inheritsLoose.js");
/* harmony import */ var _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../../../react-bootstrap-typeahead/node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "../../../react-bootstrap-typeahead/node_modules/@babel/runtime/helpers/extends.js");
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! classnames */ "../../../react-bootstrap-typeahead/node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! prop-types */ "prop-types");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-dom */ "react-dom");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var react_overlays_RootCloseWrapper__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react-overlays/RootCloseWrapper */ "../../../react-bootstrap-typeahead/node_modules/react-overlays/RootCloseWrapper.js");
/* harmony import */ var react_overlays_RootCloseWrapper__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(react_overlays_RootCloseWrapper__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _core_Overlay__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../core/Overlay */ "../../../react-bootstrap-typeahead/es/core/Overlay.js");
/* harmony import */ var _core_Typeahead__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../core/Typeahead */ "../../../react-bootstrap-typeahead/es/core/Typeahead.js");
/* harmony import */ var _ClearButton_react__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./ClearButton.react */ "../../../react-bootstrap-typeahead/es/components/ClearButton.react.js");
/* harmony import */ var _Loader_react__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./Loader.react */ "../../../react-bootstrap-typeahead/es/components/Loader.react.js");
/* harmony import */ var _Token_react__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./Token.react */ "../../../react-bootstrap-typeahead/es/components/Token.react.js");
/* harmony import */ var _TypeaheadInputMulti_react__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./TypeaheadInputMulti.react */ "../../../react-bootstrap-typeahead/es/components/TypeaheadInputMulti.react.js");
/* harmony import */ var _TypeaheadInputSingle_react__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./TypeaheadInputSingle.react */ "../../../react-bootstrap-typeahead/es/components/TypeaheadInputSingle.react.js");
/* harmony import */ var _TypeaheadMenu_react__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./TypeaheadMenu.react */ "../../../react-bootstrap-typeahead/es/components/TypeaheadMenu.react.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../utils */ "../../../react-bootstrap-typeahead/es/utils/index.js");
/* harmony import */ var _propTypes__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../propTypes */ "../../../react-bootstrap-typeahead/es/propTypes.js");




















var propTypes = {
  /**
   * Specifies the size of the input.
   */
  bsSize: Object(_propTypes__WEBPACK_IMPORTED_MODULE_19__["deprecated"])(_propTypes__WEBPACK_IMPORTED_MODULE_19__["sizeType"], 'Use the `size` prop instead.'),

  /**
   * Displays a button to clear the input when there are selections.
   */
  clearButton: prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.bool,

  /**
   * Props to be applied directly to the input. `onBlur`, `onChange`,
   * `onFocus`, and `onKeyDown` are ignored.
   */
  inputProps: Object(_propTypes__WEBPACK_IMPORTED_MODULE_19__["checkPropType"])(prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.object, _propTypes__WEBPACK_IMPORTED_MODULE_19__["inputPropsType"]),

  /**
   * Bootstrap 4 only. Adds the `is-invalid` classname to the `form-control`.
   */
  isInvalid: prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.bool,

  /**
   * Indicate whether an asynchronous data fetch is happening.
   */
  isLoading: prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.bool,

  /**
   * Bootstrap 4 only. Adds the `is-valid` classname to the `form-control`.
   */
  isValid: prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.bool,

  /**
   * Callback for custom input rendering.
   */
  renderInput: prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.func,

  /**
   * Callback for custom menu rendering.
   */
  renderMenu: prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.func,

  /**
   * Callback for custom menu rendering.
   */
  renderToken: prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.func,

  /**
   * Specifies the size of the input.
   */
  size: _propTypes__WEBPACK_IMPORTED_MODULE_19__["sizeType"]
};
var defaultProps = {
  clearButton: false,
  inputProps: {},
  isInvalid: false,
  isLoading: false,
  isValid: false,
  renderMenu: function renderMenu(results, menuProps, props) {
    return (
      /*#__PURE__*/
      react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_TypeaheadMenu_react__WEBPACK_IMPORTED_MODULE_17__["default"], _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_4___default()({}, menuProps, {
        labelKey: props.labelKey,
        options: results,
        text: props.text
      }))
    );
  },
  renderToken: function renderToken(option, props, idx) {
    return (
      /*#__PURE__*/
      react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_Token_react__WEBPACK_IMPORTED_MODULE_14__["default"], {
        disabled: props.disabled,
        key: idx,
        onRemove: props.onRemove,
        option: option,
        tabIndex: props.tabIndex
      }, Object(_utils__WEBPACK_IMPORTED_MODULE_18__["getOptionLabel"])(option, props.labelKey))
    );
  }
};

function getOverlayProps(props) {
  return Object(_utils__WEBPACK_IMPORTED_MODULE_18__["pick"])(props, ['align', 'dropup', 'flip', 'positionFixed']);
}

var TypeaheadComponent =
/*#__PURE__*/
function (_React$Component) {
  _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_2___default()(TypeaheadComponent, _React$Component);

  function TypeaheadComponent() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "_referenceElement", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "referenceElementRef", function (element) {
      // Use `findDOMNode` here because it's easier and less fragile than
      // forwarding refs to the input's container.

      /* eslint-disable react/no-find-dom-node */
      // $FlowFixMe: `findDOMNode` could return Text or an Element.
      _this._referenceElement = Object(react_dom__WEBPACK_IMPORTED_MODULE_8__["findDOMNode"])(element);
      /* eslint-enable react/no-find-dom-node */
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "_renderInput", function (inputProps, props) {
      var _this$props = _this.props,
          bsSize = _this$props.bsSize,
          isInvalid = _this$props.isInvalid,
          isValid = _this$props.isValid,
          multiple = _this$props.multiple,
          renderInput = _this$props.renderInput,
          renderToken = _this$props.renderToken,
          size = _this$props.size;

      if (Object(_utils__WEBPACK_IMPORTED_MODULE_18__["isFunction"])(renderInput)) {
        return renderInput(inputProps, props);
      }

      var commonProps = _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_4___default()({}, inputProps, {
        isInvalid: isInvalid,
        isValid: isValid,
        size: bsSize || size
      });

      if (!multiple) {
        return (
          /*#__PURE__*/
          react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_TypeaheadInputSingle_react__WEBPACK_IMPORTED_MODULE_16__["default"], commonProps)
        );
      }

      var labelKey = props.labelKey,
          onRemove = props.onRemove,
          selected = props.selected;
      return (
        /*#__PURE__*/
        react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_TypeaheadInputMulti_react__WEBPACK_IMPORTED_MODULE_15__["default"], _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_4___default()({}, commonProps, {
          selected: selected
        }), selected.map(function (option, idx) {
          return renderToken(option, _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_4___default()({}, commonProps, {
            labelKey: labelKey,
            onRemove: onRemove
          }), idx);
        }))
      );
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "_renderMenu", function (results, menuProps, props) {
      var _this$props2 = _this.props,
          emptyLabel = _this$props2.emptyLabel,
          id = _this$props2.id,
          maxHeight = _this$props2.maxHeight,
          newSelectionPrefix = _this$props2.newSelectionPrefix,
          paginationText = _this$props2.paginationText,
          renderMenu = _this$props2.renderMenu,
          renderMenuItemChildren = _this$props2.renderMenuItemChildren;
      return renderMenu(results, _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_4___default()({}, menuProps, {
        emptyLabel: emptyLabel,
        id: id,
        maxHeight: maxHeight,
        newSelectionPrefix: newSelectionPrefix,
        paginationText: paginationText,
        renderMenuItemChildren: renderMenuItemChildren
      }), props);
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "_renderAux", function (_ref) {
      var onClear = _ref.onClear,
          selected = _ref.selected;
      var _this$props3 = _this.props,
          bsSize = _this$props3.bsSize,
          clearButton = _this$props3.clearButton,
          disabled = _this$props3.disabled,
          isLoading = _this$props3.isLoading,
          size = _this$props3.size;
      var content;

      if (isLoading) {
        content =
        /*#__PURE__*/
        react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_Loader_react__WEBPACK_IMPORTED_MODULE_13__["default"], {
          size: bsSize || size
        });
      } else if (clearButton && !disabled && selected.length) {
        content =
        /*#__PURE__*/
        react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_ClearButton_react__WEBPACK_IMPORTED_MODULE_12__["default"], {
          size: bsSize || size,
          onClick: onClear,
          onFocus: function onFocus(e) {
            // Prevent the main input from auto-focusing again.
            e.stopPropagation();
          },
          onMouseDown: _utils__WEBPACK_IMPORTED_MODULE_18__["preventInputBlur"]
        });
      }

      return content ?
      /*#__PURE__*/
      react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("div", {
        className: classnames__WEBPACK_IMPORTED_MODULE_5___default()('rbt-aux', {
          'rbt-aux-lg': Object(_utils__WEBPACK_IMPORTED_MODULE_18__["isSizeLarge"])(bsSize)
        })
      }, content) : null;
    });

    return _this;
  }

  var _proto = TypeaheadComponent.prototype;

  _proto.render = function render() {
    var _this2 = this;

    var _this$props4 = this.props,
        children = _this$props4.children,
        className = _this$props4.className,
        instanceRef = _this$props4.instanceRef,
        open = _this$props4.open,
        options = _this$props4.options,
        style = _this$props4.style;
    return (
      /*#__PURE__*/
      react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_core_Typeahead__WEBPACK_IMPORTED_MODULE_11__["default"], _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_4___default()({}, this.props, {
        options: options,
        ref: instanceRef
      }), function (_ref2) {
        var getInputProps = _ref2.getInputProps,
            props = _babel_runtime_helpers_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_0___default()(_ref2, ["getInputProps"]);

        var hideMenu = props.hideMenu,
            isMenuShown = props.isMenuShown,
            results = props.results;

        var auxContent = _this2._renderAux(props);

        return (
          /*#__PURE__*/
          react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(react_overlays_RootCloseWrapper__WEBPACK_IMPORTED_MODULE_9___default.a, {
            disabled: open || !isMenuShown,
            onRootClose: hideMenu
          },
          /*#__PURE__*/
          react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("div", {
            className: classnames__WEBPACK_IMPORTED_MODULE_5___default()('rbt', {
              'has-aux': !!auxContent
            }, className),
            style: _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_4___default()({}, style, {
              outline: 'none',
              position: 'relative'
            }),
            tabIndex: -1
          }, _this2._renderInput(_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_4___default()({}, getInputProps(_this2.props.inputProps), {
            ref: _this2.referenceElementRef
          }), props),
          /*#__PURE__*/
          react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_core_Overlay__WEBPACK_IMPORTED_MODULE_10__["default"], _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_4___default()({}, getOverlayProps(_this2.props), {
            isMenuShown: isMenuShown,
            referenceElement: _this2._referenceElement
          }), function (menuProps) {
            return _this2._renderMenu(results, menuProps, props);
          }), auxContent, Object(_utils__WEBPACK_IMPORTED_MODULE_18__["isFunction"])(children) ? children(props) : children))
        );
      })
    );
  };

  return TypeaheadComponent;
}(react__WEBPACK_IMPORTED_MODULE_7___default.a.Component);

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()(TypeaheadComponent, "propTypes", propTypes);

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()(TypeaheadComponent, "defaultProps", defaultProps);

/* harmony default export */ __webpack_exports__["default"] = (Object(react__WEBPACK_IMPORTED_MODULE_7__["forwardRef"])(function (props, ref) {
  return (
    /*#__PURE__*/
    react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(TypeaheadComponent, _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_4___default()({}, props, {
      instanceRef: ref
    }))
  );
}));

/***/ }),

/***/ "../../../react-bootstrap-typeahead/es/components/TypeaheadInputMulti.react.js":
/*!************************************************************************************************************!*\
  !*** /Users/ericvergnaud/Development/react-bootstrap-typeahead/es/components/TypeaheadInputMulti.react.js ***!
  \************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "../../../react-bootstrap-typeahead/node_modules/@babel/runtime/helpers/extends.js");
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/objectWithoutPropertiesLoose */ "../../../react-bootstrap-typeahead/node_modules/@babel/runtime/helpers/objectWithoutPropertiesLoose.js");
/* harmony import */ var _babel_runtime_helpers_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "../../../react-bootstrap-typeahead/node_modules/@babel/runtime/helpers/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/inheritsLoose */ "../../../react-bootstrap-typeahead/node_modules/@babel/runtime/helpers/inheritsLoose.js");
/* harmony import */ var _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../../../react-bootstrap-typeahead/node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! classnames */ "../../../react-bootstrap-typeahead/node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _Input_react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Input.react */ "../../../react-bootstrap-typeahead/es/components/Input.react.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../utils */ "../../../react-bootstrap-typeahead/es/utils/index.js");
/* harmony import */ var _containers_hintContainer__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../containers/hintContainer */ "../../../react-bootstrap-typeahead/es/containers/hintContainer.js");
/* harmony import */ var _containers_withClassNames__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../containers/withClassNames */ "../../../react-bootstrap-typeahead/es/containers/withClassNames.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../constants */ "../../../react-bootstrap-typeahead/es/constants.js");





/* eslint-disable jsx-a11y/no-static-element-interactions */

/* eslint-disable jsx-a11y/click-events-have-key-events */








var HintedInput = Object(_containers_hintContainer__WEBPACK_IMPORTED_MODULE_9__["default"])(_Input_react__WEBPACK_IMPORTED_MODULE_7__["default"]);

var TypeaheadInputMulti =
/*#__PURE__*/
function (_React$Component) {
  _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_3___default()(TypeaheadInputMulti, _React$Component);

  function TypeaheadInputMulti() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default()(_this), "wrapperRef", react__WEBPACK_IMPORTED_MODULE_6___default.a.createRef());

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default()(_this), "_input", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default()(_this), "getInputRef", function (input) {
      _this._input = input;

      _this.props.inputRef(input);
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default()(_this), "_handleContainerClickOrFocus", function (e) {
      // Don't focus the input if it's disabled.
      if (_this.props.disabled) {
        e.currentTarget.blur();
        return;
      } // Move cursor to the end if the user clicks outside the actual input.


      var inputNode = _this._input;

      if (!inputNode) {
        return;
      }

      if (e.currentTarget !== inputNode && Object(_utils__WEBPACK_IMPORTED_MODULE_8__["isSelectable"])(inputNode)) {
        inputNode.selectionStart = inputNode.value.length;
      }

      inputNode.focus();
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default()(_this), "_handleKeyDown", function (e) {
      var _this$props = _this.props,
          onKeyDown = _this$props.onKeyDown,
          selected = _this$props.selected,
          value = _this$props.value;

      switch (e.keyCode) {
        case _constants__WEBPACK_IMPORTED_MODULE_11__["BACKSPACE"]:
          if (e.currentTarget === _this._input && selected.length && !value) {
            // Prevent browser from going back.
            e.preventDefault(); // If the input is selected and there is no text, focus the last
            // token when the user hits backspace.

            if (_this.wrapperRef.current) {
              var children = _this.wrapperRef.current.children;
              var lastToken = children[children.length - 2];
              lastToken && lastToken.focus();
            }
          }

          break;

        default:
          break;
      }

      onKeyDown(e);
    });

    return _this;
  }

  var _proto = TypeaheadInputMulti.prototype;

  _proto.render = function render() {
    var _this$props2 = this.props,
        children = _this$props2.children,
        className = _this$props2.className,
        inputClassName = _this$props2.inputClassName,
        inputRef = _this$props2.inputRef,
        placeholder = _this$props2.placeholder,
        selected = _this$props2.selected,
        props = _babel_runtime_helpers_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1___default()(_this$props2, ["children", "className", "inputClassName", "inputRef", "placeholder", "selected"]);

    return (
      /*#__PURE__*/
      react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("div", {
        className: classnames__WEBPACK_IMPORTED_MODULE_5___default()('rbt-input-multi', className),
        disabled: props.disabled,
        onClick: this._handleContainerClickOrFocus,
        onFocus: this._handleContainerClickOrFocus,
        tabIndex: -1
      },
      /*#__PURE__*/
      react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("div", {
        className: "rbt-input-wrapper",
        ref: this.wrapperRef
      }, children,
      /*#__PURE__*/
      react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(HintedInput, _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, props, {
        className: inputClassName,
        onKeyDown: this._handleKeyDown,
        placeholder: selected.length ? '' : placeholder,
        ref: this.getInputRef,
        style: {
          backgroundColor: 'transparent',
          border: 0,
          boxShadow: 'none',
          cursor: 'inherit',
          outline: 'none',
          padding: 0,
          width: '100%',
          zIndex: 1
        }
      }))))
    );
  };

  return TypeaheadInputMulti;
}(react__WEBPACK_IMPORTED_MODULE_6___default.a.Component);

/* harmony default export */ __webpack_exports__["default"] = (Object(_containers_withClassNames__WEBPACK_IMPORTED_MODULE_10__["default"])(TypeaheadInputMulti));

/***/ }),

/***/ "../../../react-bootstrap-typeahead/es/components/TypeaheadInputSingle.react.js":
/*!*************************************************************************************************************!*\
  !*** /Users/ericvergnaud/Development/react-bootstrap-typeahead/es/components/TypeaheadInputSingle.react.js ***!
  \*************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "../../../react-bootstrap-typeahead/node_modules/@babel/runtime/helpers/extends.js");
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/objectWithoutPropertiesLoose */ "../../../react-bootstrap-typeahead/node_modules/@babel/runtime/helpers/objectWithoutPropertiesLoose.js");
/* harmony import */ var _babel_runtime_helpers_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _Input_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Input.react */ "../../../react-bootstrap-typeahead/es/components/Input.react.js");
/* harmony import */ var _containers_hintContainer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../containers/hintContainer */ "../../../react-bootstrap-typeahead/es/containers/hintContainer.js");
/* harmony import */ var _containers_withClassNames__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../containers/withClassNames */ "../../../react-bootstrap-typeahead/es/containers/withClassNames.js");






var HintedInput = Object(_containers_hintContainer__WEBPACK_IMPORTED_MODULE_4__["default"])(_Input_react__WEBPACK_IMPORTED_MODULE_3__["default"]);
/* harmony default export */ __webpack_exports__["default"] = (Object(_containers_withClassNames__WEBPACK_IMPORTED_MODULE_5__["default"])(function (_ref) {
  var inputRef = _ref.inputRef,
      props = _babel_runtime_helpers_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1___default()(_ref, ["inputRef"]);

  return (
    /*#__PURE__*/
    react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(HintedInput, _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, props, {
      ref: inputRef
    }))
  );
}));

/***/ }),

/***/ "../../../react-bootstrap-typeahead/es/components/TypeaheadMenu.react.js":
/*!******************************************************************************************************!*\
  !*** /Users/ericvergnaud/Development/react-bootstrap-typeahead/es/components/TypeaheadMenu.react.js ***!
  \******************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/objectWithoutPropertiesLoose */ "../../../react-bootstrap-typeahead/node_modules/@babel/runtime/helpers/objectWithoutPropertiesLoose.js");
/* harmony import */ var _babel_runtime_helpers_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "../../../react-bootstrap-typeahead/node_modules/@babel/runtime/helpers/extends.js");
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "../../../react-bootstrap-typeahead/node_modules/@babel/runtime/helpers/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/inheritsLoose */ "../../../react-bootstrap-typeahead/node_modules/@babel/runtime/helpers/inheritsLoose.js");
/* harmony import */ var _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../../../react-bootstrap-typeahead/node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! prop-types */ "prop-types");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _Highlighter_react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Highlighter.react */ "../../../react-bootstrap-typeahead/es/components/Highlighter.react.js");
/* harmony import */ var _Menu_react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Menu.react */ "../../../react-bootstrap-typeahead/es/components/Menu.react.js");
/* harmony import */ var _MenuItem_react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./MenuItem.react */ "../../../react-bootstrap-typeahead/es/components/MenuItem.react.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../utils */ "../../../react-bootstrap-typeahead/es/utils/index.js");











var propTypes = {
  /**
   * Provides the ability to specify a prefix before the user-entered text to
   * indicate that the selection will be new. No-op unless `allowNew={true}`.
   */
  newSelectionPrefix: prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.node,

  /**
   * Prompt displayed when large data sets are paginated.
   */
  paginationText: prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.node,

  /**
   * Provides a hook for customized rendering of menu item contents.
   */
  renderMenuItemChildren: prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.func
};
var defaultProps = {
  newSelectionPrefix: 'New selection: ',
  paginationText: 'Display additional results...',
  renderMenuItemChildren: function renderMenuItemChildren(option, props, idx) {
    return (
      /*#__PURE__*/
      react__WEBPACK_IMPORTED_MODULE_5__["createElement"](_Highlighter_react__WEBPACK_IMPORTED_MODULE_7__["default"], {
        search: props.text
      }, Object(_utils__WEBPACK_IMPORTED_MODULE_10__["getOptionLabel"])(option, props.labelKey))
    );
  }
};

var TypeaheadMenu =
/*#__PURE__*/
function (_React$Component) {
  _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_3___default()(TypeaheadMenu, _React$Component);

  function TypeaheadMenu() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default()(_this), "_renderMenuItem", function (option, position) {
      var _this$props = _this.props,
          labelKey = _this$props.labelKey,
          newSelectionPrefix = _this$props.newSelectionPrefix,
          paginationText = _this$props.paginationText,
          renderMenuItemChildren = _this$props.renderMenuItemChildren,
          text = _this$props.text;
      var label = Object(_utils__WEBPACK_IMPORTED_MODULE_10__["getOptionLabel"])(option, labelKey);
      var menuItemProps = {
        disabled: Object(_utils__WEBPACK_IMPORTED_MODULE_10__["getOptionProperty"])(option, 'disabled'),
        label: label,
        option: option,
        position: position
      };

      if (option.customOption) {
        return (
          /*#__PURE__*/
          react__WEBPACK_IMPORTED_MODULE_5__["createElement"](_MenuItem_react__WEBPACK_IMPORTED_MODULE_9__["default"], _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1___default()({}, menuItemProps, {
            className: "rbt-menu-custom-option",
            key: position,
            label: newSelectionPrefix + label
          }), newSelectionPrefix,
          /*#__PURE__*/
          react__WEBPACK_IMPORTED_MODULE_5__["createElement"](_Highlighter_react__WEBPACK_IMPORTED_MODULE_7__["default"], {
            search: text
          }, label))
        );
      }

      if (option.paginationOption) {
        return (
          /*#__PURE__*/
          react__WEBPACK_IMPORTED_MODULE_5__["createElement"](react__WEBPACK_IMPORTED_MODULE_5__["Fragment"], {
            key: "pagination-item"
          },
          /*#__PURE__*/
          react__WEBPACK_IMPORTED_MODULE_5__["createElement"](_Menu_react__WEBPACK_IMPORTED_MODULE_8__["default"].Divider, null),
          /*#__PURE__*/
          react__WEBPACK_IMPORTED_MODULE_5__["createElement"](_MenuItem_react__WEBPACK_IMPORTED_MODULE_9__["default"], _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1___default()({}, menuItemProps, {
            className: "rbt-menu-pagination-option",
            label: paginationText
          }), paginationText))
        );
      }

      return (
        /*#__PURE__*/
        react__WEBPACK_IMPORTED_MODULE_5__["createElement"](_MenuItem_react__WEBPACK_IMPORTED_MODULE_9__["default"], _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1___default()({}, menuItemProps, {
          key: position
        }), renderMenuItemChildren(option, _this.props, position))
      );
    });

    return _this;
  }

  var _proto = TypeaheadMenu.prototype;

  _proto.render = function render() {
    var _this$props2 = this.props,
        id = _this$props2.id,
        labelKey = _this$props2.labelKey,
        newSelectionPrefix = _this$props2.newSelectionPrefix,
        options = _this$props2.options,
        renderMenuItemChildren = _this$props2.renderMenuItemChildren,
        text = _this$props2.text,
        menuProps = _babel_runtime_helpers_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_0___default()(_this$props2, ["id", "labelKey", "newSelectionPrefix", "options", "renderMenuItemChildren", "text"]);

    return (
      /*#__PURE__*/
      // Explictly pass some props so Flow doesn't complain...
      react__WEBPACK_IMPORTED_MODULE_5__["createElement"](_Menu_react__WEBPACK_IMPORTED_MODULE_8__["default"], _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1___default()({}, menuProps, {
        id: id,
        text: text
      }), options.map(this._renderMenuItem))
    );
  };

  return TypeaheadMenu;
}(react__WEBPACK_IMPORTED_MODULE_5__["Component"]);

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(TypeaheadMenu, "propTypes", propTypes);

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(TypeaheadMenu, "defaultProps", defaultProps);

/* harmony default export */ __webpack_exports__["default"] = (TypeaheadMenu);

/***/ }),

/***/ "../../../react-bootstrap-typeahead/es/constants.js":
/*!*********************************************************************************!*\
  !*** /Users/ericvergnaud/Development/react-bootstrap-typeahead/es/constants.js ***!
  \*********************************************************************************/
/*! exports provided: BACKSPACE, TAB, RETURN, ESC, SPACE, LEFT, UP, RIGHT, DOWN, DEFAULT_LABELKEY, ALIGN, SIZE */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BACKSPACE", function() { return BACKSPACE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TAB", function() { return TAB; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RETURN", function() { return RETURN; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ESC", function() { return ESC; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SPACE", function() { return SPACE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LEFT", function() { return LEFT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UP", function() { return UP; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RIGHT", function() { return RIGHT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DOWN", function() { return DOWN; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_LABELKEY", function() { return DEFAULT_LABELKEY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ALIGN", function() { return ALIGN; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SIZE", function() { return SIZE; });
/**
 * Common (non-printable) keycodes for `keydown` and `keyup` events. Note that
 * `keypress` handles things differently and may not return the same values.
 */
var BACKSPACE = 8;
var TAB = 9;
var RETURN = 13;
var ESC = 27;
var SPACE = 32;
var LEFT = 37;
var UP = 38;
var RIGHT = 39;
var DOWN = 40;
var DEFAULT_LABELKEY = 'label';
var ALIGN = {
  JUSTIFY: 'justify',
  LEFT: 'left',
  RIGHT: 'right'
};
var SIZE = {
  LARGE: 'large',
  LG: 'lg',
  SM: 'sm',
  SMALL: 'small'
};

/***/ }),

/***/ "../../../react-bootstrap-typeahead/es/containers/asyncContainer.js":
/*!*************************************************************************************************!*\
  !*** /Users/ericvergnaud/Development/react-bootstrap-typeahead/es/containers/asyncContainer.js ***!
  \*************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "../../../react-bootstrap-typeahead/node_modules/@babel/runtime/helpers/extends.js");
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/objectWithoutPropertiesLoose */ "../../../react-bootstrap-typeahead/node_modules/@babel/runtime/helpers/objectWithoutPropertiesLoose.js");
/* harmony import */ var _babel_runtime_helpers_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "../../../react-bootstrap-typeahead/node_modules/@babel/runtime/helpers/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/inheritsLoose */ "../../../react-bootstrap-typeahead/node_modules/@babel/runtime/helpers/inheritsLoose.js");
/* harmony import */ var _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../../../react-bootstrap-typeahead/node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var lodash_debounce__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! lodash.debounce */ "../../../react-bootstrap-typeahead/node_modules/lodash.debounce/index.js");
/* harmony import */ var lodash_debounce__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(lodash_debounce__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! prop-types */ "prop-types");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _core_Typeahead__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../core/Typeahead */ "../../../react-bootstrap-typeahead/es/core/Typeahead.js");
/* harmony import */ var _propTypes__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../propTypes */ "../../../react-bootstrap-typeahead/es/propTypes.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../utils */ "../../../react-bootstrap-typeahead/es/utils/index.js");











var propTypes = {
  /**
   * Delay, in milliseconds, before performing search.
   */
  delay: prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.number,

  /**
   * Whether or not a request is currently pending. Necessary for the
   * container to know when new results are available.
   */
  isLoading: prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.bool.isRequired,

  /**
   * Number of input characters that must be entered before showing results.
   */
  minLength: prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.number,

  /**
   * Callback to perform when the search is executed.
   */
  onSearch: prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.func.isRequired,

  /**
   * Options to be passed to the typeahead. Will typically be the query
   * results, but can also be initial default options.
   */
  options: prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.arrayOf(_propTypes__WEBPACK_IMPORTED_MODULE_9__["optionType"]),

  /**
   * Message displayed in the menu when there is no user input.
   */
  promptText: prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.node,

  /**
   * Message displayed in the menu while the request is pending.
   */
  searchText: prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.node,

  /**
   * Whether or not the component should cache query results.
   */
  useCache: prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.bool
};
var defaultProps = {
  delay: 200,
  minLength: 2,
  options: [],
  promptText: 'Type to search...',
  searchText: 'Searching...',
  useCache: true
};
/**
 * HoC that encapsulates common behavior and functionality for doing
 * asynchronous searches, including:
 *
 *  - Debouncing user input
 *  - Optional query caching
 *  - Search prompt and empty results behaviors
 */

var asyncContainer = function asyncContainer(TypeaheadComponent) {
  var AsyncTypeahead =
  /*#__PURE__*/
  function (_React$Component) {
    _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_3___default()(AsyncTypeahead, _React$Component);

    function AsyncTypeahead() {
      var _this;

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

      _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default()(_this), "_cache", {});

      _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default()(_this), "_handleSearchDebounced", void 0);

      _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default()(_this), "_query", _this.props.defaultInputValue || '');

      _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default()(_this), "_getEmptyLabel", function () {
        var _this$props = _this.props,
            emptyLabel = _this$props.emptyLabel,
            isLoading = _this$props.isLoading,
            promptText = _this$props.promptText,
            searchText = _this$props.searchText;

        if (!_this._query.length) {
          return promptText;
        }

        if (isLoading) {
          return searchText;
        }

        return emptyLabel;
      });

      _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default()(_this), "_handleInputChange", function (query, e) {
        _this.props.onInputChange && _this.props.onInputChange(query, e);

        _this._handleSearchDebounced(query);
      });

      _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default()(_this), "_handleSearch", function (query) {
        _this._query = query;
        var _this$props2 = _this.props,
            minLength = _this$props2.minLength,
            onSearch = _this$props2.onSearch,
            useCache = _this$props2.useCache;

        if (!query || minLength && query.length < minLength) {
          return;
        } // Use cached results, if applicable.


        if (useCache && _this._cache[query]) {
          // Re-render the component with the cached results.
          _this.forceUpdate();

          return;
        } // Perform the search.


        onSearch(query);
      });

      return _this;
    }

    var _proto = AsyncTypeahead.prototype;

    _proto.componentDidMount = function componentDidMount() {
      this._handleSearchDebounced = lodash_debounce__WEBPACK_IMPORTED_MODULE_5___default()(this._handleSearch, this.props.delay);
    };

    _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
      var _this$props3 = this.props,
          isLoading = _this$props3.isLoading,
          options = _this$props3.options,
          useCache = _this$props3.useCache; // Ensure that we've gone from a loading to a completed state. Otherwise
      // an empty response could get cached if the component updates during the
      // request (eg: if the parent re-renders for some reason).

      if (!isLoading && prevProps.isLoading && useCache) {
        this._cache[this._query] = options;
      }
    };

    _proto.componentWillUnmount = function componentWillUnmount() {
      this._cache = {};
      this._query = '';
      this._handleSearchDebounced && this._handleSearchDebounced.cancel();
    };

    _proto.render = function render() {
      var _this$props4 = this.props,
          allowNew = _this$props4.allowNew,
          instanceRef = _this$props4.instanceRef,
          isLoading = _this$props4.isLoading,
          options = _this$props4.options,
          useCache = _this$props4.useCache,
          props = _babel_runtime_helpers_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1___default()(_this$props4, ["allowNew", "instanceRef", "isLoading", "options", "useCache"]);

      var cachedQuery = this._cache[this._query];
      return (
        /*#__PURE__*/
        react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(TypeaheadComponent, _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, props, {
          allowNew: // Disable custom selections during a search unless
          // `allowNew` is a function.
          Object(_utils__WEBPACK_IMPORTED_MODULE_10__["isFunction"])(allowNew) ? allowNew : allowNew && !isLoading,
          emptyLabel: this._getEmptyLabel(),
          isLoading: isLoading,
          onInputChange: this._handleInputChange,
          options: useCache && cachedQuery ? cachedQuery : options,
          ref: instanceRef
        }))
      );
    };

    return AsyncTypeahead;
  }(react__WEBPACK_IMPORTED_MODULE_7___default.a.Component);

  _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(AsyncTypeahead, "displayName", "asyncContainer(" + Object(_utils__WEBPACK_IMPORTED_MODULE_10__["getDisplayName"])(_core_Typeahead__WEBPACK_IMPORTED_MODULE_8__["default"]) + ")");

  _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(AsyncTypeahead, "propTypes", propTypes);

  _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(AsyncTypeahead, "defaultProps", defaultProps);

  return Object(react__WEBPACK_IMPORTED_MODULE_7__["forwardRef"])(function (props, ref) {
    return (
      /*#__PURE__*/
      react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(AsyncTypeahead, _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, props, {
        instanceRef: ref
      }))
    );
  });
};

/* harmony default export */ __webpack_exports__["default"] = (asyncContainer);

/***/ }),

/***/ "../../../react-bootstrap-typeahead/es/containers/hintContainer.js":
/*!************************************************************************************************!*\
  !*** /Users/ericvergnaud/Development/react-bootstrap-typeahead/es/containers/hintContainer.js ***!
  \************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "../../../react-bootstrap-typeahead/node_modules/@babel/runtime/helpers/extends.js");
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/objectWithoutPropertiesLoose */ "../../../react-bootstrap-typeahead/node_modules/@babel/runtime/helpers/objectWithoutPropertiesLoose.js");
/* harmony import */ var _babel_runtime_helpers_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "../../../react-bootstrap-typeahead/node_modules/@babel/runtime/helpers/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/inheritsLoose */ "../../../react-bootstrap-typeahead/node_modules/@babel/runtime/helpers/inheritsLoose.js");
/* harmony import */ var _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../../../react-bootstrap-typeahead/node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _core_Context__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../core/Context */ "../../../react-bootstrap-typeahead/es/core/Context.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../utils */ "../../../react-bootstrap-typeahead/es/utils/index.js");







 // IE doesn't seem to get the composite computed value (eg: 'padding',
// 'borderStyle', etc.), so generate these from the individual values.

function interpolateStyle(styles, attr, subattr) {
  if (subattr === void 0) {
    subattr = '';
  } // Title-case the sub-attribute.


  if (subattr) {
    /* eslint-disable-next-line no-param-reassign */
    subattr = subattr.replace(subattr[0], subattr[0].toUpperCase());
  }

  return ['Top', 'Right', 'Bottom', 'Left'].map(function (dir) {
    return styles[attr + dir + subattr];
  }).join(' ');
}

function copyStyles(inputNode, hintNode) {
  if (!inputNode || !hintNode) {
    return;
  }

  var inputStyle = window.getComputedStyle(inputNode);
  /* eslint-disable no-param-reassign */

  hintNode.style.borderStyle = interpolateStyle(inputStyle, 'border', 'style');
  hintNode.style.borderWidth = interpolateStyle(inputStyle, 'border', 'width');
  hintNode.style.fontSize = inputStyle.fontSize;
  hintNode.style.height = inputStyle.height;
  hintNode.style.lineHeight = inputStyle.lineHeight;
  hintNode.style.margin = interpolateStyle(inputStyle, 'margin');
  hintNode.style.padding = interpolateStyle(inputStyle, 'padding');
  /* eslint-enable no-param-reassign */
}

function hintContainer(Input) {
  var HintedInput =
  /*#__PURE__*/
  function (_React$Component) {
    _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_3___default()(HintedInput, _React$Component);

    function HintedInput() {
      var _this;

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

      _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default()(_this), "hintRef", react__WEBPACK_IMPORTED_MODULE_5___default.a.createRef());

      _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default()(_this), "_handleKeyDown", function (e) {
        var _this$props = _this.props,
            initialItem = _this$props.initialItem,
            onAdd = _this$props.onAdd,
            onKeyDown = _this$props.onKeyDown;

        if (Object(_utils__WEBPACK_IMPORTED_MODULE_7__["shouldSelectHint"])(e, _this.props)) {
          e.preventDefault(); // Prevent input from blurring on TAB.

          onAdd(initialItem);
        }

        onKeyDown(e);
      });

      return _this;
    }

    var _proto = HintedInput.prototype;

    _proto.componentDidMount = function componentDidMount() {
      copyStyles(this.props.inputNode, this.hintRef.current);
    };

    _proto.componentDidUpdate = function componentDidUpdate() {
      copyStyles(this.props.inputNode, this.hintRef.current);
    };

    _proto.render = function render() {
      var _this$props2 = this.props,
          forwardedRef = _this$props2.forwardedRef,
          hintText = _this$props2.hintText,
          initialItem = _this$props2.initialItem,
          inputNode = _this$props2.inputNode,
          onAdd = _this$props2.onAdd,
          selectHintOnEnter = _this$props2.selectHintOnEnter,
          props = _babel_runtime_helpers_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1___default()(_this$props2, ["forwardedRef", "hintText", "initialItem", "inputNode", "onAdd", "selectHintOnEnter"]);

      return (
        /*#__PURE__*/
        react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
          style: {
            display: 'flex',
            flex: 1,
            height: '100%',
            position: 'relative'
          }
        },
        /*#__PURE__*/
        react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(Input, _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, props, {
          onKeyDown: this._handleKeyDown,
          ref: forwardedRef
        })),
        /*#__PURE__*/
        react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("input", {
          "aria-hidden": true,
          className: "rbt-input-hint",
          ref: this.hintRef,
          readOnly: true,
          style: {
            backgroundColor: 'transparent',
            borderColor: 'transparent',
            boxShadow: 'none',
            color: 'rgba(0, 0, 0, 0.35)',
            left: 0,
            pointerEvents: 'none',
            position: 'absolute',
            top: 0,
            width: '100%'
          },
          tabIndex: -1,
          value: hintText
        }))
      );
    };

    return HintedInput;
  }(react__WEBPACK_IMPORTED_MODULE_5___default.a.Component);

  _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(HintedInput, "displayName", "hintContainer(" + Object(_utils__WEBPACK_IMPORTED_MODULE_7__["getDisplayName"])(Input) + ")");

  var HintedInputWithContext = Object(_core_Context__WEBPACK_IMPORTED_MODULE_6__["withContext"])(HintedInput, ['hintText', 'initialItem', 'inputNode', 'onAdd', 'selectHintOnEnter']);
  return react__WEBPACK_IMPORTED_MODULE_5___default.a.forwardRef(function (props, ref) {
    return (
      /*#__PURE__*/
      react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(HintedInputWithContext, _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, props, {
        forwardedRef: ref
      }))
    );
  });
}

/* harmony default export */ __webpack_exports__["default"] = (hintContainer);

/***/ }),

/***/ "../../../react-bootstrap-typeahead/es/containers/menuItemContainer.js":
/*!****************************************************************************************************!*\
  !*** /Users/ericvergnaud/Development/react-bootstrap-typeahead/es/containers/menuItemContainer.js ***!
  \****************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "../../../react-bootstrap-typeahead/node_modules/@babel/runtime/helpers/extends.js");
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/objectWithoutPropertiesLoose */ "../../../react-bootstrap-typeahead/node_modules/@babel/runtime/helpers/objectWithoutPropertiesLoose.js");
/* harmony import */ var _babel_runtime_helpers_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "../../../react-bootstrap-typeahead/node_modules/@babel/runtime/helpers/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/inheritsLoose */ "../../../react-bootstrap-typeahead/node_modules/@babel/runtime/helpers/inheritsLoose.js");
/* harmony import */ var _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../../../react-bootstrap-typeahead/node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var scroll_into_view_if_needed__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! scroll-into-view-if-needed */ "../../../react-bootstrap-typeahead/node_modules/scroll-into-view-if-needed/es/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! prop-types */ "prop-types");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _core_Context__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../core/Context */ "../../../react-bootstrap-typeahead/es/core/Context.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../utils */ "../../../react-bootstrap-typeahead/es/utils/index.js");










var propTypes = {
  option: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.object, prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.string]).isRequired,
  position: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.number
};

var menuItemContainer = function menuItemContainer(Component) {
  var WrappedMenuItem =
  /*#__PURE__*/
  function (_React$Component) {
    _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_3___default()(WrappedMenuItem, _React$Component);

    function WrappedMenuItem() {
      var _this;

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

      _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default()(_this), "itemRef", react__WEBPACK_IMPORTED_MODULE_6___default.a.createRef());

      _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default()(_this), "_handleClick", function (e) {
        var _this$props = _this.props,
            onMenuItemClick = _this$props.onMenuItemClick,
            option = _this$props.option,
            onClick = _this$props.onClick;
        onMenuItemClick(option, e);
        onClick && onClick(e);
      });

      _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default()(_this), "_maybeUpdateItem", function () {
        var _this$props2 = _this.props,
            activeIndex = _this$props2.activeIndex,
            onActiveItemChange = _this$props2.onActiveItemChange,
            onInitialItemChange = _this$props2.onInitialItemChange,
            option = _this$props2.option,
            position = _this$props2.position;

        if (position === 0) {
          onInitialItemChange(option);
        }

        if (position === activeIndex) {
          onActiveItemChange(option); // Automatically scroll the menu as the user keys through it.

          var node = _this.itemRef.current;
          node && Object(scroll_into_view_if_needed__WEBPACK_IMPORTED_MODULE_5__["default"])(node, {
            block: 'nearest',
            boundary: node.parentNode,
            inline: 'nearest',
            scrollMode: 'if-needed'
          });
        }
      });

      return _this;
    }

    var _proto = WrappedMenuItem.prototype;

    _proto.componentDidMount = function componentDidMount() {
      this._maybeUpdateItem();
    };

    _proto.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {
      this._maybeUpdateItem();
    };

    _proto.render = function render() {
      var _this$props3 = this.props,
          activeIndex = _this$props3.activeIndex,
          id = _this$props3.id,
          isOnlyResult = _this$props3.isOnlyResult,
          label = _this$props3.label,
          onActiveItemChange = _this$props3.onActiveItemChange,
          onInitialItemChange = _this$props3.onInitialItemChange,
          onMenuItemClick = _this$props3.onMenuItemClick,
          option = _this$props3.option,
          position = _this$props3.position,
          setItem = _this$props3.setItem,
          props = _babel_runtime_helpers_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1___default()(_this$props3, ["activeIndex", "id", "isOnlyResult", "label", "onActiveItemChange", "onInitialItemChange", "onMenuItemClick", "option", "position", "setItem"]);

      var active = isOnlyResult || activeIndex === position; // Update the item's position in the item stack.

      setItem(option, position);
      return (
        /*#__PURE__*/
        react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(Component, _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, props, {
          active: active,
          "aria-label": label,
          "aria-selected": active,
          id: Object(_utils__WEBPACK_IMPORTED_MODULE_9__["getMenuItemId"])(id, position),
          onClick: this._handleClick,
          onMouseDown: _utils__WEBPACK_IMPORTED_MODULE_9__["preventInputBlur"],
          ref: this.itemRef,
          role: "option"
        }))
      );
    };

    return WrappedMenuItem;
  }(react__WEBPACK_IMPORTED_MODULE_6___default.a.Component);

  _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(WrappedMenuItem, "displayName", "menuItemContainer(" + Object(_utils__WEBPACK_IMPORTED_MODULE_9__["getDisplayName"])(Component) + ")");

  _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(WrappedMenuItem, "propTypes", propTypes);

  return Object(_core_Context__WEBPACK_IMPORTED_MODULE_8__["withContext"])(WrappedMenuItem, ['activeIndex', 'id', 'isOnlyResult', 'items', 'onActiveItemChange', 'onInitialItemChange', 'onMenuItemClick', 'setItem']);
};

/* harmony default export */ __webpack_exports__["default"] = (menuItemContainer);

/***/ }),

/***/ "../../../react-bootstrap-typeahead/es/containers/tokenContainer.js":
/*!*************************************************************************************************!*\
  !*** /Users/ericvergnaud/Development/react-bootstrap-typeahead/es/containers/tokenContainer.js ***!
  \*************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "../../../react-bootstrap-typeahead/node_modules/@babel/runtime/helpers/extends.js");
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "../../../react-bootstrap-typeahead/node_modules/@babel/runtime/helpers/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/inheritsLoose */ "../../../react-bootstrap-typeahead/node_modules/@babel/runtime/helpers/inheritsLoose.js");
/* harmony import */ var _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../../../react-bootstrap-typeahead/node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! prop-types */ "prop-types");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react_overlays_RootCloseWrapper__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-overlays/RootCloseWrapper */ "../../../react-bootstrap-typeahead/node_modules/react-overlays/RootCloseWrapper.js");
/* harmony import */ var react_overlays_RootCloseWrapper__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_overlays_RootCloseWrapper__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../utils */ "../../../react-bootstrap-typeahead/es/utils/index.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../constants */ "../../../react-bootstrap-typeahead/es/constants.js");
/* harmony import */ var _propTypes__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../propTypes */ "../../../react-bootstrap-typeahead/es/propTypes.js");










var propTypes = {
  onBlur: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.func,
  onClick: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.func,
  onFocus: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.func,
  onRemove: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.func,
  option: _propTypes__WEBPACK_IMPORTED_MODULE_9__["optionType"].isRequired
};
var defaultProps = {
  onBlur: _utils__WEBPACK_IMPORTED_MODULE_7__["noop"],
  onClick: _utils__WEBPACK_IMPORTED_MODULE_7__["noop"],
  onFocus: _utils__WEBPACK_IMPORTED_MODULE_7__["noop"]
};
/**
 * Higher-order component to encapsulate Token behaviors.
 */

var tokenContainer = function tokenContainer(Component) {
  var WrappedComponent =
  /*#__PURE__*/
  function (_React$Component) {
    _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_2___default()(WrappedComponent, _React$Component);

    function WrappedComponent() {
      var _this;

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

      _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "state", {
        active: false
      });

      _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "_handleActiveChange", function (e, active, callback) {
        // e.persist() isn't always present.
        e.persist && e.persist();
        e.stopPropagation();

        _this.setState({
          active: active
        }, function () {
          return callback(e);
        });
      });

      _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "_handleBlur", function (e) {
        _this._handleActiveChange(e, false, _this.props.onBlur);
      });

      _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "_handleClick", function (e) {
        _this._handleActiveChange(e, true, _this.props.onClick);
      });

      _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "_handleFocus", function (e) {
        _this._handleActiveChange(e, true, _this.props.onFocus);
      });

      _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "_handleKeyDown", function (e) {
        switch (e.keyCode) {
          case _constants__WEBPACK_IMPORTED_MODULE_8__["BACKSPACE"]:
            if (_this.state.active) {
              // Prevent backspace keypress from triggering the browser "back"
              // action.
              e.preventDefault();

              _this._handleRemove();
            }

            break;

          default:
            break;
        }
      });

      _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "_handleRemove", function () {
        var _this$props = _this.props,
            onRemove = _this$props.onRemove,
            option = _this$props.option; // Flow having trouble with `isFunction` here for some reason...

        if (typeof onRemove === 'function') {
          onRemove(option);
        }
      });

      return _this;
    }

    var _proto = WrappedComponent.prototype;

    _proto.render = function render() {
      var onRemove = this.props.onRemove;
      var active = this.state.active;
      return (
        /*#__PURE__*/
        react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(react_overlays_RootCloseWrapper__WEBPACK_IMPORTED_MODULE_6___default.a, {
          disabled: !active,
          onRootClose: this._handleBlur
        },
        /*#__PURE__*/
        react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(Component, _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, this.props, {
          active: active,
          onBlur: this._handleBlur,
          onClick: this._handleClick,
          onFocus: this._handleFocus,
          onKeyDown: this._handleKeyDown,
          onRemove: Object(_utils__WEBPACK_IMPORTED_MODULE_7__["isFunction"])(onRemove) ? this._handleRemove : undefined
        })))
      );
    };

    return WrappedComponent;
  }(react__WEBPACK_IMPORTED_MODULE_5___default.a.Component);

  _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()(WrappedComponent, "displayName", "tokenContainer(" + Object(_utils__WEBPACK_IMPORTED_MODULE_7__["getDisplayName"])(Component) + ")");

  _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()(WrappedComponent, "propTypes", propTypes);

  _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()(WrappedComponent, "defaultProps", defaultProps);

  return WrappedComponent;
};

/* harmony default export */ __webpack_exports__["default"] = (tokenContainer);

/***/ }),

/***/ "../../../react-bootstrap-typeahead/es/containers/withClassNames.js":
/*!*************************************************************************************************!*\
  !*** /Users/ericvergnaud/Development/react-bootstrap-typeahead/es/containers/withClassNames.js ***!
  \*************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "../../../react-bootstrap-typeahead/node_modules/@babel/runtime/helpers/extends.js");
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/objectWithoutPropertiesLoose */ "../../../react-bootstrap-typeahead/node_modules/@babel/runtime/helpers/objectWithoutPropertiesLoose.js");
/* harmony import */ var _babel_runtime_helpers_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/inheritsLoose */ "../../../react-bootstrap-typeahead/node_modules/@babel/runtime/helpers/inheritsLoose.js");
/* harmony import */ var _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../../../react-bootstrap-typeahead/node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! classnames */ "../../../react-bootstrap-typeahead/node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils */ "../../../react-bootstrap-typeahead/es/utils/index.js");








function withClassNames(Component) {
  // Use a class instead of function component to support refs.

  /* eslint-disable-next-line react/prefer-stateless-function */
  var WrappedComponent =
  /*#__PURE__*/
  function (_React$Component) {
    _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_2___default()(WrappedComponent, _React$Component);

    function WrappedComponent() {
      return _React$Component.apply(this, arguments) || this;
    }

    var _proto = WrappedComponent.prototype;

    _proto.render = function render() {
      var _this$props = this.props,
          className = _this$props.className,
          isInvalid = _this$props.isInvalid,
          isValid = _this$props.isValid,
          size = _this$props.size,
          props = _babel_runtime_helpers_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1___default()(_this$props, ["className", "isInvalid", "isValid", "size"]);

      return (
        /*#__PURE__*/
        react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(Component, _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, props, {
          className: classnames__WEBPACK_IMPORTED_MODULE_4___default()('form-control', 'rbt-input', {
            'input-lg form-control-lg': Object(_utils__WEBPACK_IMPORTED_MODULE_6__["isSizeLarge"])(size),
            'input-sm form-control-sm': Object(_utils__WEBPACK_IMPORTED_MODULE_6__["isSizeSmall"])(size),
            'is-invalid': isInvalid,
            'is-valid': isValid
          }, className)
        }))
      );
    };

    return WrappedComponent;
  }(react__WEBPACK_IMPORTED_MODULE_5___default.a.Component);

  _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()(WrappedComponent, "displayName", "withClassNames(" + Object(_utils__WEBPACK_IMPORTED_MODULE_6__["getDisplayName"])(Component) + ")");

  return WrappedComponent;
}

/* harmony default export */ __webpack_exports__["default"] = (withClassNames);

/***/ }),

/***/ "../../../react-bootstrap-typeahead/es/core/Context.js":
/*!************************************************************************************!*\
  !*** /Users/ericvergnaud/Development/react-bootstrap-typeahead/es/core/Context.js ***!
  \************************************************************************************/
/*! exports provided: TypeaheadContext, withContext */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TypeaheadContext", function() { return TypeaheadContext; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "withContext", function() { return withContext; });
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "../../../react-bootstrap-typeahead/node_modules/@babel/runtime/helpers/extends.js");
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/inheritsLoose */ "../../../react-bootstrap-typeahead/node_modules/@babel/runtime/helpers/inheritsLoose.js");
/* harmony import */ var _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils */ "../../../react-bootstrap-typeahead/es/utils/index.js");




var TypeaheadContext = Object(react__WEBPACK_IMPORTED_MODULE_2__["createContext"])({});
var withContext = function withContext(Component, values) {
  // Note: Use a class instead of function component to support refs.

  /* eslint-disable-next-line react/prefer-stateless-function */
  return (
    /*#__PURE__*/
    function (_React$Component) {
      _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_1___default()(_class, _React$Component);

      function _class() {
        return _React$Component.apply(this, arguments) || this;
      }

      var _proto = _class.prototype;

      _proto.render = function render() {
        var _this = this;

        return (
          /*#__PURE__*/
          react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(TypeaheadContext.Consumer, null, function (context) {
            return (
              /*#__PURE__*/
              react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(Component, _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, _this.props, Object(_utils__WEBPACK_IMPORTED_MODULE_3__["pick"])(context, values)))
            );
          })
        );
      };

      return _class;
    }(react__WEBPACK_IMPORTED_MODULE_2___default.a.Component)
  );
};

/***/ }),

/***/ "../../../react-bootstrap-typeahead/es/core/Overlay.js":
/*!************************************************************************************!*\
  !*** /Users/ericvergnaud/Development/react-bootstrap-typeahead/es/core/Overlay.js ***!
  \************************************************************************************/
/*! exports provided: getPlacement, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getPlacement", function() { return getPlacement; });
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "../../../react-bootstrap-typeahead/node_modules/@babel/runtime/helpers/extends.js");
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/objectWithoutPropertiesLoose */ "../../../react-bootstrap-typeahead/node_modules/@babel/runtime/helpers/objectWithoutPropertiesLoose.js");
/* harmony import */ var _babel_runtime_helpers_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! prop-types */ "prop-types");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_popper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-popper */ "../../../react-bootstrap-typeahead/node_modules/react-popper/lib/esm/index.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils */ "../../../react-bootstrap-typeahead/es/utils/index.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../constants */ "../../../react-bootstrap-typeahead/es/constants.js");


/* eslint-disable react/no-unused-prop-types */





 // `Element` is not defined during server-side rendering, so shim it here.

/* istanbul ignore next */

var SafeElement = typeof Element === 'undefined' ? function () {} : Element;
var propTypes = {
  /**
   * Specify menu alignment. The default value is `justify`, which makes the
   * menu as wide as the input and truncates long values. Specifying `left`
   * or `right` will align the menu to that side and the width will be
   * determined by the length of menu item values.
   */
  align: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.oneOf(Object(_utils__WEBPACK_IMPORTED_MODULE_5__["values"])(_constants__WEBPACK_IMPORTED_MODULE_6__["ALIGN"])),
  children: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.func.isRequired,

  /**
   * Specify whether the menu should appear above the input.
   */
  dropup: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.bool,

  /**
   * Whether or not to automatically adjust the position of the menu when it
   * reaches the viewport boundaries.
   */
  flip: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.bool,
  isMenuShown: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.bool,
  positionFixed: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.bool,
  referenceElement: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.instanceOf(SafeElement)
};
var defaultProps = {
  align: _constants__WEBPACK_IMPORTED_MODULE_6__["ALIGN"].JUSTIFY,
  dropup: false,
  flip: false,
  isMenuShown: false,
  positionFixed: false
};

function getModifiers(_ref) {
  var align = _ref.align,
      flip = _ref.flip;
  return {
    computeStyles: {
      enabled: true,
      fn: function fn(_ref2) {
        var styles = _ref2.styles,
            data = _babel_runtime_helpers_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1___default()(_ref2, ["styles"]);

        return _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, data, {
          styles: _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, styles, {
            // Use the following condition instead of `align === 'justify'`
            // since it allows the component to fall back to justifying the
            // menu width if `align` is undefined.
            width: align !== _constants__WEBPACK_IMPORTED_MODULE_6__["ALIGN"].RIGHT && align !== _constants__WEBPACK_IMPORTED_MODULE_6__["ALIGN"].LEFT ? // Set the popper width to match the target width.
            data.offsets.reference.width : styles.width
          })
        });
      }
    },
    flip: {
      enabled: flip
    },
    preventOverflow: {
      escapeWithReference: true
    }
  };
} // Flow expects a string literal value for `placement`.


var PLACEMENT = {
  bottom: {
    end: 'bottom-end',
    start: 'bottom-start'
  },
  top: {
    end: 'top-end',
    start: 'top-start'
  }
};
function getPlacement(_ref3) {
  var align = _ref3.align,
      dropup = _ref3.dropup;
  var x = align === _constants__WEBPACK_IMPORTED_MODULE_6__["ALIGN"].RIGHT ? 'end' : 'start';
  var y = dropup ? 'top' : 'bottom';
  return PLACEMENT[y][x];
}

var Overlay = function Overlay(props) {
  var children = props.children,
      isMenuShown = props.isMenuShown,
      positionFixed = props.positionFixed,
      referenceElement = props.referenceElement;

  if (!isMenuShown) {
    return null;
  }

  return (
    /*#__PURE__*/
    react__WEBPACK_IMPORTED_MODULE_2__["createElement"](react_popper__WEBPACK_IMPORTED_MODULE_4__["Popper"], {
      modifiers: getModifiers(props),
      placement: getPlacement(props),
      positionFixed: positionFixed,
      referenceElement: referenceElement
    }, function (_ref4) {
      var ref = _ref4.ref,
          popperProps = _babel_runtime_helpers_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1___default()(_ref4, ["ref"]);

      return children(_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, popperProps, {
        innerRef: ref,
        inputHeight: referenceElement ? referenceElement.offsetHeight : 0
      }));
    })
  );
};

Overlay.propTypes = propTypes;
Overlay.defaultProps = defaultProps;
/* harmony default export */ __webpack_exports__["default"] = (Overlay);

/***/ }),

/***/ "../../../react-bootstrap-typeahead/es/core/Typeahead.js":
/*!**************************************************************************************!*\
  !*** /Users/ericvergnaud/Development/react-bootstrap-typeahead/es/core/Typeahead.js ***!
  \**************************************************************************************/
/*! exports provided: getInitialState, clearTypeahead, hideMenu, toggleMenu, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getInitialState", function() { return getInitialState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clearTypeahead", function() { return clearTypeahead; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hideMenu", function() { return hideMenu; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toggleMenu", function() { return toggleMenu; });
/* harmony import */ var _babel_runtime_helpers_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/objectWithoutPropertiesLoose */ "../../../react-bootstrap-typeahead/node_modules/@babel/runtime/helpers/objectWithoutPropertiesLoose.js");
/* harmony import */ var _babel_runtime_helpers_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "../../../react-bootstrap-typeahead/node_modules/@babel/runtime/helpers/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/inheritsLoose */ "../../../react-bootstrap-typeahead/node_modules/@babel/runtime/helpers/inheritsLoose.js");
/* harmony import */ var _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../../../react-bootstrap-typeahead/node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "../../../react-bootstrap-typeahead/node_modules/@babel/runtime/helpers/extends.js");
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var fast_deep_equal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! fast-deep-equal */ "../../../react-bootstrap-typeahead/node_modules/fast-deep-equal/index.js");
/* harmony import */ var fast_deep_equal__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(fast_deep_equal__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! prop-types */ "prop-types");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _TypeaheadManager__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./TypeaheadManager */ "../../../react-bootstrap-typeahead/es/core/TypeaheadManager.js");
/* harmony import */ var _propTypes__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../propTypes */ "../../../react-bootstrap-typeahead/es/propTypes.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../utils */ "../../../react-bootstrap-typeahead/es/utils/index.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../constants */ "../../../react-bootstrap-typeahead/es/constants.js");












var propTypes = {
  /**
   * Allows the creation of new selections on the fly. Note that any new items
   * will be added to the list of selections, but not the list of original
   * options unless handled as such by `Typeahead`'s parent.
   *
   * If a function is specified, it will be used to determine whether a custom
   * option should be included. The return value should be true or false.
   */
  allowNew: prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.bool, prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.func]),

  /**
   * Autofocus the input when the component initially mounts.
   */
  autoFocus: prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.bool,

  /**
   * Whether or not filtering should be case-sensitive.
   */
  caseSensitive: Object(_propTypes__WEBPACK_IMPORTED_MODULE_9__["checkPropType"])(prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.bool, _propTypes__WEBPACK_IMPORTED_MODULE_9__["caseSensitiveType"]),

  /**
   * The initial value displayed in the text input.
   */
  defaultInputValue: Object(_propTypes__WEBPACK_IMPORTED_MODULE_9__["checkPropType"])(prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.string, _propTypes__WEBPACK_IMPORTED_MODULE_9__["defaultInputValueType"]),

  /**
   * Whether or not the menu is displayed upon initial render.
   */
  defaultOpen: prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.bool,

  /**
   * Specify any pre-selected options. Use only if you want the component to
   * be uncontrolled.
   */
  defaultSelected: prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.arrayOf(_propTypes__WEBPACK_IMPORTED_MODULE_9__["optionType"]),

  /**
   * Either an array of fields in `option` to search, or a custom filtering
   * callback.
   */
  filterBy: prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.string.isRequired), prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.func]),

  /**
   * Highlights the menu item if there is only one result and allows selecting
   * that item by hitting enter. Does not work with `allowNew`.
   */
  highlightOnlyResult: Object(_propTypes__WEBPACK_IMPORTED_MODULE_9__["checkPropType"])(prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.bool, _propTypes__WEBPACK_IMPORTED_MODULE_9__["highlightOnlyResultType"]),

  /**
   * An html id attribute, required for assistive technologies such as screen
   * readers.
   */
  id: Object(_propTypes__WEBPACK_IMPORTED_MODULE_9__["checkPropType"])(prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.number, prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.string]), _propTypes__WEBPACK_IMPORTED_MODULE_9__["isRequiredForA11y"]),

  /**
   * Whether the filter should ignore accents and other diacritical marks.
   */
  ignoreDiacritics: Object(_propTypes__WEBPACK_IMPORTED_MODULE_9__["checkPropType"])(prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.bool, _propTypes__WEBPACK_IMPORTED_MODULE_9__["ignoreDiacriticsType"]),

  /**
   * Specify the option key to use for display or a function returning the
   * display string. By default, the selector will use the `label` key.
   */
  labelKey: Object(_propTypes__WEBPACK_IMPORTED_MODULE_9__["checkPropType"])(prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.string, prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.func]), _propTypes__WEBPACK_IMPORTED_MODULE_9__["labelKeyType"]),

  /**
   * Maximum number of results to display by default. Mostly done for
   * performance reasons so as not to render too many DOM nodes in the case of
   * large data sets.
   */
  maxResults: prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.number,

  /**
   * Number of input characters that must be entered before showing results.
   */
  minLength: prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.number,

  /**
   * Whether or not multiple selections are allowed.
   */
  multiple: prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.bool,

  /**
   * Invoked when the input is blurred. Receives an event.
   */
  onBlur: prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.func,

  /**
   * Invoked whenever items are added or removed. Receives an array of the
   * selected options.
   */
  onChange: prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.func,

  /**
   * Invoked when the input is focused. Receives an event.
   */
  onFocus: prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.func,

  /**
   * Invoked when the input value changes. Receives the string value of the
   * input.
   */
  onInputChange: prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.func,

  /**
   * Invoked when a key is pressed. Receives an event.
   */
  onKeyDown: prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.func,

  /**
   * Invoked when menu visibility changes.
   */
  onMenuToggle: prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.func,

  /**
   * Invoked when the pagination menu item is clicked. Receives an event.
   */
  onPaginate: prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.func,

  /**
   * Whether or not the menu should be displayed. `undefined` allows the
   * component to control visibility, while `true` and `false` show and hide
   * the menu, respectively.
   */
  open: prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.bool,

  /**
   * Full set of options, including pre-selected options. Must either be an
   * array of objects (recommended) or strings.
   */
  options: prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.arrayOf(_propTypes__WEBPACK_IMPORTED_MODULE_9__["optionType"]).isRequired,

  /**
   * Give user the ability to display additional results if the number of
   * results exceeds `maxResults`.
   */
  paginate: prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.bool,

  /**
   * The selected option(s) displayed in the input. Use this prop if you want
   * to control the component via its parent.
   */
  selected: Object(_propTypes__WEBPACK_IMPORTED_MODULE_9__["checkPropType"])(prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.arrayOf(_propTypes__WEBPACK_IMPORTED_MODULE_9__["optionType"]), _propTypes__WEBPACK_IMPORTED_MODULE_9__["selectedType"]),

  /**
   * Allows selecting the hinted result by pressing enter.
   */
  selectHintOnEnter: prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.bool
};
var defaultProps = {
  allowNew: false,
  autoFocus: false,
  caseSensitive: false,
  defaultInputValue: '',
  defaultOpen: false,
  defaultSelected: [],
  filterBy: [],
  highlightOnlyResult: false,
  ignoreDiacritics: true,
  labelKey: _constants__WEBPACK_IMPORTED_MODULE_11__["DEFAULT_LABELKEY"],
  maxResults: 100,
  minLength: 0,
  multiple: false,
  onBlur: _utils__WEBPACK_IMPORTED_MODULE_10__["noop"],
  onFocus: _utils__WEBPACK_IMPORTED_MODULE_10__["noop"],
  onInputChange: _utils__WEBPACK_IMPORTED_MODULE_10__["noop"],
  onKeyDown: _utils__WEBPACK_IMPORTED_MODULE_10__["noop"],
  onMenuToggle: _utils__WEBPACK_IMPORTED_MODULE_10__["noop"],
  onPaginate: _utils__WEBPACK_IMPORTED_MODULE_10__["noop"],
  paginate: true,
  selectHintOnEnter: false
};
function getInitialState(props) {
  var defaultInputValue = props.defaultInputValue,
      defaultOpen = props.defaultOpen,
      defaultSelected = props.defaultSelected,
      maxResults = props.maxResults,
      multiple = props.multiple;
  var selected = props.selected ? props.selected.slice() : defaultSelected.slice();
  var text = defaultInputValue;

  if (!multiple && selected.length) {
    // Set the text if an initial selection is passed in.
    text = Object(_utils__WEBPACK_IMPORTED_MODULE_10__["getOptionLabel"])(Object(_utils__WEBPACK_IMPORTED_MODULE_10__["head"])(selected), props.labelKey);

    if (selected.length > 1) {
      // Limit to 1 selection in single-select mode.
      selected = selected.slice(0, 1);
    }
  }

  return {
    activeIndex: -1,
    activeItem: null,
    initialItem: null,
    isFocused: false,
    selected: selected,
    showMenu: defaultOpen,
    shownResults: maxResults,
    text: text
  };
}
function clearTypeahead(state, props) {
  return _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_4___default()({}, getInitialState(props), {
    isFocused: state.isFocused,
    selected: [],
    text: ''
  });
}
function hideMenu(state, props) {
  var _getInitialState = getInitialState(props),
      activeIndex = _getInitialState.activeIndex,
      activeItem = _getInitialState.activeItem,
      initialItem = _getInitialState.initialItem,
      shownResults = _getInitialState.shownResults;

  return {
    activeIndex: activeIndex,
    activeItem: activeItem,
    initialItem: initialItem,
    showMenu: false,
    shownResults: shownResults
  };
}
function toggleMenu(state, props) {
  return state.showMenu ? hideMenu(state, props) : {
    showMenu: true
  };
}

var Typeahead =
/*#__PURE__*/
function (_React$Component) {
  _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_2___default()(Typeahead, _React$Component);

  function Typeahead() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "state", getInitialState(_this.props));

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "inputNode", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "isMenuShown", false);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "items", []);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "blur", function () {
      _this.inputNode && _this.inputNode.blur();

      _this.hideMenu();
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "clear", function () {
      _this.setState(clearTypeahead);
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "focus", function () {
      _this.inputNode && _this.inputNode.focus();
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "getInput", function () {
      return _this.inputNode;
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "getInstance", function () {
      Object(_utils__WEBPACK_IMPORTED_MODULE_10__["warn"])(false, 'The `getInstance` method is deprecated. You can now access instance ' + 'methods directly on the ref.');
      return _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this);
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "inputRef", function (inputNode) {
      _this.inputNode = inputNode;
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "setItem", function (item, position) {
      _this.items[position] = item;
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "hideMenu", function () {
      _this.setState(hideMenu);
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "toggleMenu", function () {
      _this.setState(toggleMenu);
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "_handleActiveIndexChange", function (activeIndex) {
      _this.setState(function (state) {
        return {
          activeIndex: activeIndex,
          activeItem: activeIndex === -1 ? null : state.activeItem
        };
      });
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "_handleActiveItemChange", function (activeItem) {
      // Don't update the active item if it hasn't changed.
      if (!fast_deep_equal__WEBPACK_IMPORTED_MODULE_5___default()(activeItem, _this.state.activeItem)) {
        _this.setState({
          activeItem: activeItem
        });
      }
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "_handleBlur", function (e) {
      e.persist();

      _this.setState({
        isFocused: false
      }, function () {
        return _this.props.onBlur(e);
      });
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "_handleChange", function (selected) {
      _this.props.onChange && _this.props.onChange(selected);
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "_handleClear", function () {
      _this.setState(clearTypeahead, function () {
        return _this._handleChange([]);
      });
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "_handleFocus", function (e) {
      e.persist();

      _this.setState({
        isFocused: true,
        showMenu: true
      }, function () {
        return _this.props.onFocus(e);
      });
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "_handleInitialItemChange", function (initialItem) {
      // Don't update the initial item if it hasn't changed.
      if (!fast_deep_equal__WEBPACK_IMPORTED_MODULE_5___default()(initialItem, _this.state.initialItem)) {
        _this.setState({
          initialItem: initialItem
        });
      }
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "_handleInputChange", function (e) {
      e.persist();
      var text = e.currentTarget.value;
      var _this$props = _this.props,
          multiple = _this$props.multiple,
          onInputChange = _this$props.onInputChange; // Clear selections when the input value changes in single-select mode.

      var shouldClearSelections = _this.state.selected.length && !multiple;

      _this.setState(function (state, props) {
        var _getInitialState2 = getInitialState(props),
            activeIndex = _getInitialState2.activeIndex,
            activeItem = _getInitialState2.activeItem,
            shownResults = _getInitialState2.shownResults;

        return {
          activeIndex: activeIndex,
          activeItem: activeItem,
          selected: shouldClearSelections ? [] : state.selected,
          showMenu: true,
          shownResults: shownResults,
          text: text
        };
      }, function () {
        onInputChange(text, e);
        shouldClearSelections && _this._handleChange([]);
      });
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "_handleKeyDown", function (e) {
      var activeItem = _this.state.activeItem; // Skip most actions when the menu is hidden.

      if (!_this.isMenuShown) {
        if (e.keyCode === _constants__WEBPACK_IMPORTED_MODULE_11__["UP"] || e.keyCode === _constants__WEBPACK_IMPORTED_MODULE_11__["DOWN"]) {
          _this.setState({
            showMenu: true
          });
        }

        _this.props.onKeyDown(e);

        return;
      }

      switch (e.keyCode) {
        case _constants__WEBPACK_IMPORTED_MODULE_11__["UP"]:
        case _constants__WEBPACK_IMPORTED_MODULE_11__["DOWN"]:
          // Prevent input cursor from going to the beginning when pressing up.
          e.preventDefault();

          _this._handleActiveIndexChange(Object(_utils__WEBPACK_IMPORTED_MODULE_10__["getUpdatedActiveIndex"])(_this.state.activeIndex, e.keyCode, _this.items));

          break;

        case _constants__WEBPACK_IMPORTED_MODULE_11__["RETURN"]:
          // Prevent form submission while menu is open.
          e.preventDefault();
          activeItem && _this._handleMenuItemSelect(activeItem, e);
          break;

        case _constants__WEBPACK_IMPORTED_MODULE_11__["ESC"]:
        case _constants__WEBPACK_IMPORTED_MODULE_11__["TAB"]:
          // ESC simply hides the menu. TAB will blur the input and move focus to
          // the next item; hide the menu so it doesn't gain focus.
          _this.hideMenu();

          break;

        default:
          break;
      }

      _this.props.onKeyDown(e);
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "_handleMenuItemSelect", function (option, e) {
      if (option.paginationOption) {
        _this._handlePaginate(e);
      } else {
        _this._handleSelectionAdd(option);
      }
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "_handlePaginate", function (e) {
      e.persist();

      _this.setState(function (state, props) {
        return {
          shownResults: state.shownResults + props.maxResults
        };
      }, function () {
        return _this.props.onPaginate(e, _this.state.shownResults);
      });
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "_handleSelectionAdd", function (option) {
      var _this$props2 = _this.props,
          multiple = _this$props2.multiple,
          labelKey = _this$props2.labelKey;
      var selected;
      var selection = option;
      var text; // Add a unique id to the custom selection. Avoid doing this in `render` so
      // the id doesn't increment every time.

      if (!Object(_utils__WEBPACK_IMPORTED_MODULE_10__["isString"])(selection) && selection.customOption) {
        selection = _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_4___default()({}, selection, {
          id: Object(_utils__WEBPACK_IMPORTED_MODULE_10__["uniqueId"])('new-id-')
        });
      }

      if (multiple) {
        // If multiple selections are allowed, add the new selection to the
        // existing selections.
        selected = _this.state.selected.concat(selection);
        text = '';
      } else {
        // If only a single selection is allowed, replace the existing selection
        // with the new one.
        selected = [selection];
        text = Object(_utils__WEBPACK_IMPORTED_MODULE_10__["getOptionLabel"])(selection, labelKey);
      }

      _this.setState(function (state, props) {
        return _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_4___default()({}, hideMenu(state, props), {
          initialItem: selection,
          selected: selected,
          text: text
        });
      }, function () {
        return _this._handleChange(selected);
      });
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "_handleSelectionRemove", function (selection) {
      var selected = _this.state.selected.filter(function (option) {
        return !fast_deep_equal__WEBPACK_IMPORTED_MODULE_5___default()(option, selection);
      }); // Make sure the input stays focused after the item is removed.


      _this.focus();

      _this.setState(function (state, props) {
        return _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_4___default()({}, hideMenu(state, props), {
          selected: selected
        });
      }, function () {
        return _this._handleChange(selected);
      });
    });

    return _this;
  }

  var _proto = Typeahead.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this.props.autoFocus && this.focus();
  }
  /* eslint-disable-next-line camelcase */
  ;

  _proto.UNSAFE_componentWillReceiveProps = function UNSAFE_componentWillReceiveProps(nextProps) {
    var labelKey = nextProps.labelKey,
        multiple = nextProps.multiple,
        selected = nextProps.selected;
    Object(_utils__WEBPACK_IMPORTED_MODULE_10__["validateSelectedPropChange"])(selected, this.props.selected);

    if (multiple !== this.props.multiple) {
      this.setState({
        text: ''
      });
    } // If new selections are passed via props, treat as a controlled input.


    if (selected && !fast_deep_equal__WEBPACK_IMPORTED_MODULE_5___default()(selected, this.state.selected)) {
      this.setState({
        selected: selected
      });

      if (multiple) {
        return;
      }

      this.setState({
        text: selected.length ? Object(_utils__WEBPACK_IMPORTED_MODULE_10__["getOptionLabel"])(Object(_utils__WEBPACK_IMPORTED_MODULE_10__["head"])(selected), labelKey) : ''
      });
    } // Truncate selections when in single-select mode.


    var newSelected = selected || this.state.selected;

    if (!multiple && newSelected.length > 1) {
      newSelected = newSelected.slice(0, 1);
      this.setState({
        selected: newSelected,
        text: Object(_utils__WEBPACK_IMPORTED_MODULE_10__["getOptionLabel"])(Object(_utils__WEBPACK_IMPORTED_MODULE_10__["head"])(newSelected), labelKey)
      });
    }
  };

  _proto.render = function render() {
    // Omit `onChange` so Flow doesn't complain.
    var _this$props3 = this.props,
        onChange = _this$props3.onChange,
        otherProps = _babel_runtime_helpers_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_0___default()(_this$props3, ["onChange"]);

    var mergedPropsAndState = _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_4___default()({}, otherProps, {}, this.state);

    var filterBy = mergedPropsAndState.filterBy,
        labelKey = mergedPropsAndState.labelKey,
        options = mergedPropsAndState.options,
        paginate = mergedPropsAndState.paginate,
        shownResults = mergedPropsAndState.shownResults,
        text = mergedPropsAndState.text;
    this.isMenuShown = Object(_utils__WEBPACK_IMPORTED_MODULE_10__["isShown"])(mergedPropsAndState);
    this.items = []; // Reset items on re-render.

    var results = [];

    if (this.isMenuShown) {
      var cb = typeof filterBy === 'function' ? filterBy : _utils__WEBPACK_IMPORTED_MODULE_10__["defaultFilterBy"];
      results = options.filter(function (option) {
        return cb(option, mergedPropsAndState);
      }); // This must come before results are truncated.

      var shouldPaginate = paginate && results.length > shownResults; // Truncate results if necessary.

      results = Object(_utils__WEBPACK_IMPORTED_MODULE_10__["getTruncatedOptions"])(results, shownResults); // Add the custom option if necessary.

      if (Object(_utils__WEBPACK_IMPORTED_MODULE_10__["addCustomOption"])(results, mergedPropsAndState)) {
        var _results$push;

        results.push((_results$push = {
          customOption: true
        }, _results$push[Object(_utils__WEBPACK_IMPORTED_MODULE_10__["getStringLabelKey"])(labelKey)] = text, _results$push));
      } // Add the pagination item if necessary.


      if (shouldPaginate) {
        var _results$push2;

        results.push((_results$push2 = {}, _results$push2[Object(_utils__WEBPACK_IMPORTED_MODULE_10__["getStringLabelKey"])(labelKey)] = '', _results$push2.paginationOption = true, _results$push2));
      }
    }

    return (
      /*#__PURE__*/
      react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_TypeaheadManager__WEBPACK_IMPORTED_MODULE_8__["default"], _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_4___default()({}, mergedPropsAndState, {
        hideMenu: this.hideMenu,
        inputNode: this.inputNode,
        inputRef: this.inputRef,
        isMenuShown: this.isMenuShown,
        onActiveItemChange: this._handleActiveItemChange,
        onAdd: this._handleSelectionAdd,
        onBlur: this._handleBlur,
        onChange: this._handleInputChange,
        onClear: this._handleClear,
        onFocus: this._handleFocus,
        onHide: this.hideMenu,
        onInitialItemChange: this._handleInitialItemChange,
        onKeyDown: this._handleKeyDown,
        onMenuItemClick: this._handleMenuItemSelect,
        onRemove: this._handleSelectionRemove,
        results: results,
        setItem: this.setItem,
        toggleMenu: this.toggleMenu
      }))
    );
  };

  return Typeahead;
}(react__WEBPACK_IMPORTED_MODULE_7___default.a.Component);

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()(Typeahead, "propTypes", propTypes);

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()(Typeahead, "defaultProps", defaultProps);

/* harmony default export */ __webpack_exports__["default"] = (Typeahead);

/***/ }),

/***/ "../../../react-bootstrap-typeahead/es/core/TypeaheadManager.js":
/*!*********************************************************************************************!*\
  !*** /Users/ericvergnaud/Development/react-bootstrap-typeahead/es/core/TypeaheadManager.js ***!
  \*********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "../../../react-bootstrap-typeahead/node_modules/@babel/runtime/helpers/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/inheritsLoose */ "../../../react-bootstrap-typeahead/node_modules/@babel/runtime/helpers/inheritsLoose.js");
/* harmony import */ var _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../../../react-bootstrap-typeahead/node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "../../../react-bootstrap-typeahead/node_modules/@babel/runtime/helpers/extends.js");
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _Context__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Context */ "../../../react-bootstrap-typeahead/es/core/Context.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils */ "../../../react-bootstrap-typeahead/es/utils/index.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../constants */ "../../../react-bootstrap-typeahead/es/constants.js");








var inputPropKeys = ['activeIndex', 'disabled', 'id', 'inputRef', 'isFocused', 'isMenuShown', 'multiple', 'onBlur', 'onChange', 'onFocus', 'onKeyDown', 'placeholder'];
var propKeys = ['activeIndex', 'hideMenu', 'isMenuShown', 'labelKey', 'onClear', 'onHide', 'onRemove', 'results', 'selected', 'text', 'toggleMenu'];
var typeaheadContextKeys = ['activeIndex', 'id', 'initialItem', 'inputNode', 'onActiveItemChange', 'onAdd', 'onInitialItemChange', 'onMenuItemClick', 'selectHintOnEnter', 'setItem'];

function getTypeaheadContextValue(props) {
  return _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_3___default()({}, Object(_utils__WEBPACK_IMPORTED_MODULE_6__["pick"])(props, typeaheadContextKeys), {
    hintText: Object(_utils__WEBPACK_IMPORTED_MODULE_6__["getHintText"])(props),
    isOnlyResult: Object(_utils__WEBPACK_IMPORTED_MODULE_6__["getIsOnlyResult"])(props)
  });
}

var TypeaheadManager =
/*#__PURE__*/
function (_React$Component) {
  _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_1___default()(TypeaheadManager, _React$Component);

  function TypeaheadManager() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_0___default()(_this), "_handleKeyDown", function (e) {
      var _this$props = _this.props,
          initialItem = _this$props.initialItem,
          onKeyDown = _this$props.onKeyDown,
          onAdd = _this$props.onAdd;

      switch (e.keyCode) {
        case _constants__WEBPACK_IMPORTED_MODULE_7__["RETURN"]:
          if (initialItem && Object(_utils__WEBPACK_IMPORTED_MODULE_6__["getIsOnlyResult"])(_this.props)) {
            onAdd(initialItem);
          }

          break;

        default:
          break;
      }

      onKeyDown(e);
    });

    return _this;
  }

  var _proto = TypeaheadManager.prototype;

  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    var _this$props2 = this.props,
        allowNew = _this$props2.allowNew,
        isMenuShown = _this$props2.isMenuShown,
        onInitialItemChange = _this$props2.onInitialItemChange,
        onMenuToggle = _this$props2.onMenuToggle,
        results = _this$props2.results; // Clear the initial item when there are no results.

    if (!(allowNew || results.length)) {
      onInitialItemChange(null);
    }

    if (isMenuShown !== prevProps.isMenuShown) {
      onMenuToggle(isMenuShown);
    }
  };

  _proto.render = function render() {
    var childProps = _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_3___default()({}, Object(_utils__WEBPACK_IMPORTED_MODULE_6__["pick"])(this.props, propKeys), {
      getInputProps: Object(_utils__WEBPACK_IMPORTED_MODULE_6__["getInputProps"])(_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_3___default()({}, Object(_utils__WEBPACK_IMPORTED_MODULE_6__["pick"])(this.props, inputPropKeys), {
        onKeyDown: this._handleKeyDown,
        value: Object(_utils__WEBPACK_IMPORTED_MODULE_6__["getInputText"])(this.props)
      }))
    });

    return (
      /*#__PURE__*/
      react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_Context__WEBPACK_IMPORTED_MODULE_5__["TypeaheadContext"].Provider, {
        value: getTypeaheadContextValue(this.props)
      }, this.props.children(childProps))
    );
  };

  return TypeaheadManager;
}(react__WEBPACK_IMPORTED_MODULE_4___default.a.Component);

/* harmony default export */ __webpack_exports__["default"] = (TypeaheadManager);

/***/ }),

/***/ "../../../react-bootstrap-typeahead/es/index.js":
/*!*****************************************************************************!*\
  !*** /Users/ericvergnaud/Development/react-bootstrap-typeahead/es/index.js ***!
  \*****************************************************************************/
/*! exports provided: AsyncTypeahead, ClearButton, Highlighter, Input, Loader, Menu, MenuItem, Token, Typeahead, TypeaheadInputMulti, TypeaheadInputSingle, TypeaheadMenu, asyncContainer, hintContainer, menuItemContainer, tokenContainer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_AsyncTypeahead_react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/AsyncTypeahead.react */ "../../../react-bootstrap-typeahead/es/components/AsyncTypeahead.react.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AsyncTypeahead", function() { return _components_AsyncTypeahead_react__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _components_ClearButton_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/ClearButton.react */ "../../../react-bootstrap-typeahead/es/components/ClearButton.react.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ClearButton", function() { return _components_ClearButton_react__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _components_Highlighter_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/Highlighter.react */ "../../../react-bootstrap-typeahead/es/components/Highlighter.react.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Highlighter", function() { return _components_Highlighter_react__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _components_Input_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/Input.react */ "../../../react-bootstrap-typeahead/es/components/Input.react.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Input", function() { return _components_Input_react__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/* harmony import */ var _components_Loader_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/Loader.react */ "../../../react-bootstrap-typeahead/es/components/Loader.react.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Loader", function() { return _components_Loader_react__WEBPACK_IMPORTED_MODULE_4__["default"]; });

/* harmony import */ var _components_Menu_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/Menu.react */ "../../../react-bootstrap-typeahead/es/components/Menu.react.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Menu", function() { return _components_Menu_react__WEBPACK_IMPORTED_MODULE_5__["default"]; });

/* harmony import */ var _components_MenuItem_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/MenuItem.react */ "../../../react-bootstrap-typeahead/es/components/MenuItem.react.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MenuItem", function() { return _components_MenuItem_react__WEBPACK_IMPORTED_MODULE_6__["default"]; });

/* harmony import */ var _components_Token_react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/Token.react */ "../../../react-bootstrap-typeahead/es/components/Token.react.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Token", function() { return _components_Token_react__WEBPACK_IMPORTED_MODULE_7__["default"]; });

/* harmony import */ var _components_Typeahead_react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./components/Typeahead.react */ "../../../react-bootstrap-typeahead/es/components/Typeahead.react.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Typeahead", function() { return _components_Typeahead_react__WEBPACK_IMPORTED_MODULE_8__["default"]; });

/* harmony import */ var _components_TypeaheadInputMulti_react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./components/TypeaheadInputMulti.react */ "../../../react-bootstrap-typeahead/es/components/TypeaheadInputMulti.react.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TypeaheadInputMulti", function() { return _components_TypeaheadInputMulti_react__WEBPACK_IMPORTED_MODULE_9__["default"]; });

/* harmony import */ var _components_TypeaheadInputSingle_react__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./components/TypeaheadInputSingle.react */ "../../../react-bootstrap-typeahead/es/components/TypeaheadInputSingle.react.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TypeaheadInputSingle", function() { return _components_TypeaheadInputSingle_react__WEBPACK_IMPORTED_MODULE_10__["default"]; });

/* harmony import */ var _components_TypeaheadMenu_react__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./components/TypeaheadMenu.react */ "../../../react-bootstrap-typeahead/es/components/TypeaheadMenu.react.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TypeaheadMenu", function() { return _components_TypeaheadMenu_react__WEBPACK_IMPORTED_MODULE_11__["default"]; });

/* harmony import */ var _containers_asyncContainer__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./containers/asyncContainer */ "../../../react-bootstrap-typeahead/es/containers/asyncContainer.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "asyncContainer", function() { return _containers_asyncContainer__WEBPACK_IMPORTED_MODULE_12__["default"]; });

/* harmony import */ var _containers_hintContainer__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./containers/hintContainer */ "../../../react-bootstrap-typeahead/es/containers/hintContainer.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "hintContainer", function() { return _containers_hintContainer__WEBPACK_IMPORTED_MODULE_13__["default"]; });

/* harmony import */ var _containers_menuItemContainer__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./containers/menuItemContainer */ "../../../react-bootstrap-typeahead/es/containers/menuItemContainer.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "menuItemContainer", function() { return _containers_menuItemContainer__WEBPACK_IMPORTED_MODULE_14__["default"]; });

/* harmony import */ var _containers_tokenContainer__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./containers/tokenContainer */ "../../../react-bootstrap-typeahead/es/containers/tokenContainer.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "tokenContainer", function() { return _containers_tokenContainer__WEBPACK_IMPORTED_MODULE_15__["default"]; });

// Components























 // HOCs










/***/ }),

/***/ "../../../react-bootstrap-typeahead/es/propTypes.js":
/*!*********************************************************************************!*\
  !*** /Users/ericvergnaud/Development/react-bootstrap-typeahead/es/propTypes.js ***!
  \*********************************************************************************/
/*! exports provided: sizeType, checkPropType, caseSensitiveType, deprecated, defaultInputValueType, highlightOnlyResultType, ignoreDiacriticsType, inputPropsType, isRequiredForA11y, labelKeyType, optionType, selectedType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sizeType", function() { return sizeType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "checkPropType", function() { return checkPropType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "caseSensitiveType", function() { return caseSensitiveType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deprecated", function() { return deprecated; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultInputValueType", function() { return defaultInputValueType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "highlightOnlyResultType", function() { return highlightOnlyResultType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ignoreDiacriticsType", function() { return ignoreDiacriticsType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "inputPropsType", function() { return inputPropsType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isRequiredForA11y", function() { return isRequiredForA11y; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "labelKeyType", function() { return labelKeyType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "optionType", function() { return optionType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectedType", function() { return selectedType; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "prop-types");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ "../../../react-bootstrap-typeahead/es/utils/index.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./constants */ "../../../react-bootstrap-typeahead/es/constants.js");



var INPUT_PROPS_BLACKLIST = [{
  alt: 'onBlur',
  prop: 'onBlur'
}, {
  alt: 'onInputChange',
  prop: 'onChange'
}, {
  alt: 'onFocus',
  prop: 'onFocus'
}, {
  alt: 'onKeyDown',
  prop: 'onKeyDown'
}];
var sizeType = prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.oneOf(Object(_utils__WEBPACK_IMPORTED_MODULE_1__["values"])(_constants__WEBPACK_IMPORTED_MODULE_2__["SIZE"]));
/**
 * Allows additional warnings or messaging related to prop validation.
 */

function checkPropType(validator, callback) {
  return function (props, propName, componentName) {
    var _PropTypes$checkPropT;

    prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.checkPropTypes((_PropTypes$checkPropT = {}, _PropTypes$checkPropT[propName] = validator, _PropTypes$checkPropT), props, 'prop', componentName);
    Object(_utils__WEBPACK_IMPORTED_MODULE_1__["isFunction"])(callback) && callback(props, propName, componentName);
  };
}
function caseSensitiveType(props, propName, componentName) {
  var caseSensitive = props.caseSensitive,
      filterBy = props.filterBy;
  Object(_utils__WEBPACK_IMPORTED_MODULE_1__["warn"])(!caseSensitive || typeof filterBy !== 'function', 'Your `filterBy` function will override the `caseSensitive` prop.');
}
function deprecated(validator, reason) {
  return function validate(props, propName, componentName) {
    var _PropTypes$checkPropT2;

    if (props[propName] != null) {
      Object(_utils__WEBPACK_IMPORTED_MODULE_1__["warn"])(false, "The prop `" + propName + "` is deprecated. " + reason);
    }

    return prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.checkPropTypes((_PropTypes$checkPropT2 = {}, _PropTypes$checkPropT2[propName] = validator, _PropTypes$checkPropT2), props, 'prop', componentName);
  };
}
function defaultInputValueType(props, propName, componentName) {
  var defaultInputValue = props.defaultInputValue,
      defaultSelected = props.defaultSelected,
      multiple = props.multiple,
      selected = props.selected;
  var name = defaultSelected.length ? 'defaultSelected' : 'selected';
  Object(_utils__WEBPACK_IMPORTED_MODULE_1__["warn"])(!(!multiple && defaultInputValue && (defaultSelected.length || selected && selected.length)), "`defaultInputValue` will be overridden by the value from `" + name + "`.");
}
function highlightOnlyResultType(props, propName, componentName) {
  var allowNew = props.allowNew,
      highlightOnlyResult = props.highlightOnlyResult;
  Object(_utils__WEBPACK_IMPORTED_MODULE_1__["warn"])(!(highlightOnlyResult && allowNew), '`highlightOnlyResult` will not work with `allowNew`.');
}
function ignoreDiacriticsType(props, propName, componentName) {
  var filterBy = props.filterBy,
      ignoreDiacritics = props.ignoreDiacritics;
  Object(_utils__WEBPACK_IMPORTED_MODULE_1__["warn"])(ignoreDiacritics || typeof filterBy !== 'function', 'Your `filterBy` function will override the `ignoreDiacritics` prop.');
}
function inputPropsType(props, propName, componentName) {
  var inputProps = props.inputProps;

  if (!(inputProps && Object.prototype.toString.call(inputProps) === '[object Object]')) {
    return;
  } // Blacklisted properties.


  INPUT_PROPS_BLACKLIST.forEach(function (_ref) {
    var alt = _ref.alt,
        prop = _ref.prop;
    var msg = alt ? " Use the top-level `" + alt + "` prop instead." : null;
    Object(_utils__WEBPACK_IMPORTED_MODULE_1__["warn"])(!inputProps[prop], "The `" + prop + "` property of `inputProps` will be ignored." + msg);
  });
}
function isRequiredForA11y(props, propName, componentName) {
  Object(_utils__WEBPACK_IMPORTED_MODULE_1__["warn"])(props[propName] != null, "The prop `" + propName + "` is required to make `" + componentName + "` " + 'accessible for users of assistive technologies such as screen readers.');
}
function labelKeyType(props, propName, componentName) {
  var allowNew = props.allowNew,
      labelKey = props.labelKey;
  Object(_utils__WEBPACK_IMPORTED_MODULE_1__["warn"])(!(Object(_utils__WEBPACK_IMPORTED_MODULE_1__["isFunction"])(labelKey) && allowNew), '`labelKey` must be a string when `allowNew={true}`.');
}
var optionType = prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.object, prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string]);
function selectedType(props, propName, componentName) {
  var onChange = props.onChange,
      selected = props.selected;
  Object(_utils__WEBPACK_IMPORTED_MODULE_1__["warn"])(!selected || selected && Object(_utils__WEBPACK_IMPORTED_MODULE_1__["isFunction"])(onChange), 'You provided a `selected` prop without an `onChange` handler. If you ' + 'want the typeahead to be uncontrolled, use `defaultSelected`. ' + 'Otherwise, set `onChange`.');
}

/***/ }),

/***/ "../../../react-bootstrap-typeahead/es/utils/addCustomOption.js":
/*!*********************************************************************************************!*\
  !*** /Users/ericvergnaud/Development/react-bootstrap-typeahead/es/utils/addCustomOption.js ***!
  \*********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _getOptionLabel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getOptionLabel */ "../../../react-bootstrap-typeahead/es/utils/getOptionLabel.js");


function addCustomOption(results, props) {
  var allowNew = props.allowNew,
      labelKey = props.labelKey,
      text = props.text;

  if (!allowNew || !text.trim()) {
    return false;
  } // If the consumer has provided a callback, use that to determine whether or
  // not to add the custom option.


  if (typeof allowNew === 'function') {
    return allowNew(results, props);
  } // By default, don't add the custom option if there is an exact text match
  // with an existing option.


  return !results.some(function (o) {
    return Object(_getOptionLabel__WEBPACK_IMPORTED_MODULE_0__["default"])(o, labelKey) === text;
  });
}

/* harmony default export */ __webpack_exports__["default"] = (addCustomOption);

/***/ }),

/***/ "../../../react-bootstrap-typeahead/es/utils/defaultFilterBy.js":
/*!*********************************************************************************************!*\
  !*** /Users/ericvergnaud/Development/react-bootstrap-typeahead/es/utils/defaultFilterBy.js ***!
  \*********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return defaultFilterBy; });
/* harmony import */ var fast_deep_equal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fast-deep-equal */ "../../../react-bootstrap-typeahead/node_modules/fast-deep-equal/index.js");
/* harmony import */ var fast_deep_equal__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fast_deep_equal__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _getOptionProperty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getOptionProperty */ "../../../react-bootstrap-typeahead/es/utils/getOptionProperty.js");
/* harmony import */ var _nodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./nodash */ "../../../react-bootstrap-typeahead/es/utils/nodash.js");
/* harmony import */ var _stripDiacritics__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./stripDiacritics */ "../../../react-bootstrap-typeahead/es/utils/stripDiacritics.js");
/* harmony import */ var _warn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./warn */ "../../../react-bootstrap-typeahead/es/utils/warn.js");






function isMatch(input, string, props) {
  var searchStr = input;
  var str = string;

  if (!props.caseSensitive) {
    searchStr = searchStr.toLowerCase();
    str = str.toLowerCase();
  }

  if (props.ignoreDiacritics) {
    searchStr = Object(_stripDiacritics__WEBPACK_IMPORTED_MODULE_3__["default"])(searchStr);
    str = Object(_stripDiacritics__WEBPACK_IMPORTED_MODULE_3__["default"])(str);
  }

  return str.indexOf(searchStr) !== -1;
}
/**
 * Default algorithm for filtering results.
 */


function defaultFilterBy(option, props) {
  var filterBy = props.filterBy,
      labelKey = props.labelKey,
      multiple = props.multiple,
      selected = props.selected,
      text = props.text; // Don't show selected options in the menu for the multi-select case.

  if (multiple && selected.some(function (o) {
    return fast_deep_equal__WEBPACK_IMPORTED_MODULE_0___default()(o, option);
  })) {
    return false;
  }

  if (Object(_nodash__WEBPACK_IMPORTED_MODULE_2__["isFunction"])(labelKey) && isMatch(text, labelKey(option), props)) {
    return true;
  }

  var fields = filterBy.slice();

  if (Object(_nodash__WEBPACK_IMPORTED_MODULE_2__["isString"])(labelKey)) {
    // Add the `labelKey` field to the list of fields if it isn't already there.
    if (fields.indexOf(labelKey) === -1) {
      fields.unshift(labelKey);
    }
  }

  if (Object(_nodash__WEBPACK_IMPORTED_MODULE_2__["isString"])(option)) {
    Object(_warn__WEBPACK_IMPORTED_MODULE_4__["default"])(fields.length <= 1, 'You cannot filter by properties when `option` is a string.');
    return isMatch(text, option, props);
  }

  return fields.some(function (field) {
    var value = Object(_getOptionProperty__WEBPACK_IMPORTED_MODULE_1__["default"])(option, field);

    if (!Object(_nodash__WEBPACK_IMPORTED_MODULE_2__["isString"])(value)) {
      Object(_warn__WEBPACK_IMPORTED_MODULE_4__["default"])(false, 'Fields passed to `filterBy` should have string values. Value will ' + 'be converted to a string; results may be unexpected.');
      value = String(value);
    }

    return isMatch(text, value, props);
  });
}

/***/ }),

/***/ "../../../react-bootstrap-typeahead/es/utils/getDisplayName.js":
/*!********************************************************************************************!*\
  !*** /Users/ericvergnaud/Development/react-bootstrap-typeahead/es/utils/getDisplayName.js ***!
  \********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return getDisplayName; });
function getDisplayName(Component) {
  return Component.displayName || Component.name || 'Component';
}

/***/ }),

/***/ "../../../react-bootstrap-typeahead/es/utils/getHintText.js":
/*!*****************************************************************************************!*\
  !*** /Users/ericvergnaud/Development/react-bootstrap-typeahead/es/utils/getHintText.js ***!
  \*****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _getMatchBounds__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getMatchBounds */ "../../../react-bootstrap-typeahead/es/utils/getMatchBounds.js");
/* harmony import */ var _getOptionLabel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getOptionLabel */ "../../../react-bootstrap-typeahead/es/utils/getOptionLabel.js");



function getHintText(props) {
  var activeIndex = props.activeIndex,
      initialItem = props.initialItem,
      isFocused = props.isFocused,
      isMenuShown = props.isMenuShown,
      labelKey = props.labelKey,
      multiple = props.multiple,
      selected = props.selected,
      text = props.text; // Don't display a hint under the following conditions:

  if ( // No text entered.
  !text || // The input is not focused.
  !isFocused || // The menu is hidden.
  !isMenuShown || // No item in the menu.
  !initialItem || // The initial item is a custom option.
  initialItem.customOption || // One of the menu items is active.
  activeIndex > -1 || // There's already a selection in single-select mode.
  !!selected.length && !multiple) {
    return '';
  }

  var initialItemStr = Object(_getOptionLabel__WEBPACK_IMPORTED_MODULE_1__["default"])(initialItem, labelKey);
  var bounds = Object(_getMatchBounds__WEBPACK_IMPORTED_MODULE_0__["default"])(initialItemStr.toLowerCase(), text.toLowerCase());

  if (!(bounds && bounds.start === 0)) {
    return '';
  } // Text matching is case- and accent-insensitive, so to display the hint
  // correctly, splice the input string with the hint string.


  return text + initialItemStr.slice(bounds.end, initialItemStr.length);
}

/* harmony default export */ __webpack_exports__["default"] = (getHintText);

/***/ }),

/***/ "../../../react-bootstrap-typeahead/es/utils/getInputProps.js":
/*!*******************************************************************************************!*\
  !*** /Users/ericvergnaud/Development/react-bootstrap-typeahead/es/utils/getInputProps.js ***!
  \*******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "../../../react-bootstrap-typeahead/node_modules/@babel/runtime/helpers/extends.js");
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/objectWithoutPropertiesLoose */ "../../../react-bootstrap-typeahead/node_modules/@babel/runtime/helpers/objectWithoutPropertiesLoose.js");
/* harmony import */ var _babel_runtime_helpers_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ "../../../react-bootstrap-typeahead/node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _getMenuItemId__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getMenuItemId */ "../../../react-bootstrap-typeahead/es/utils/getMenuItemId.js");





var getInputProps = function getInputProps(_ref) {
  var activeIndex = _ref.activeIndex,
      id = _ref.id,
      isFocused = _ref.isFocused,
      isMenuShown = _ref.isMenuShown,
      multiple = _ref.multiple,
      onFocus = _ref.onFocus,
      placeholder = _ref.placeholder,
      rest = _babel_runtime_helpers_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1___default()(_ref, ["activeIndex", "id", "isFocused", "isMenuShown", "multiple", "onFocus", "placeholder"]);

  return function (_temp) {
    var _cx;

    var _ref2 = _temp === void 0 ? {} : _temp,
        className = _ref2.className,
        inputProps = _babel_runtime_helpers_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1___default()(_ref2, ["className"]);

    var props = _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({
      /* eslint-disable sort-keys */
      // These props can be overridden by values in `inputProps`.
      autoComplete: 'off',
      placeholder: placeholder,
      type: 'text'
    }, inputProps, {}, rest, {
      'aria-activedescendant': activeIndex >= 0 ? Object(_getMenuItemId__WEBPACK_IMPORTED_MODULE_3__["default"])(id, activeIndex) : undefined,
      'aria-autocomplete': 'both',
      'aria-expanded': isMenuShown,
      'aria-haspopup': 'listbox',
      'aria-owns': isMenuShown ? id : undefined,
      className: classnames__WEBPACK_IMPORTED_MODULE_2___default()((_cx = {}, _cx[className || ''] = !multiple, _cx.focus = isFocused, _cx)),
      // Re-open the menu, eg: if it's closed via ESC.
      onClick: onFocus,
      onFocus: onFocus,
      // Comboboxes are single-select by definition:
      // https://www.w3.org/TR/wai-aria-practices-1.1/#combobox
      role: 'combobox'
      /* eslint-enable sort-keys */

    });

    if (!multiple) {
      return props;
    }

    return _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, props, {
      'aria-autocomplete': 'list',
      'aria-expanded': undefined,
      inputClassName: className,
      role: undefined
    });
  };
};

/* harmony default export */ __webpack_exports__["default"] = (getInputProps);

/***/ }),

/***/ "../../../react-bootstrap-typeahead/es/utils/getInputText.js":
/*!******************************************************************************************!*\
  !*** /Users/ericvergnaud/Development/react-bootstrap-typeahead/es/utils/getInputText.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _getOptionLabel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getOptionLabel */ "../../../react-bootstrap-typeahead/es/utils/getOptionLabel.js");
/* harmony import */ var _nodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./nodash */ "../../../react-bootstrap-typeahead/es/utils/nodash.js");



function getInputText(props) {
  var activeItem = props.activeItem,
      labelKey = props.labelKey,
      multiple = props.multiple,
      selected = props.selected,
      text = props.text;

  if (activeItem) {
    // Display the input value if the pagination item is active.
    return Object(_getOptionLabel__WEBPACK_IMPORTED_MODULE_0__["default"])(activeItem, labelKey);
  }

  var selectedItem = !multiple && !!selected.length && Object(_nodash__WEBPACK_IMPORTED_MODULE_1__["head"])(selected);

  if (selectedItem) {
    return Object(_getOptionLabel__WEBPACK_IMPORTED_MODULE_0__["default"])(selectedItem, labelKey);
  }

  return text;
}

/* harmony default export */ __webpack_exports__["default"] = (getInputText);

/***/ }),

/***/ "../../../react-bootstrap-typeahead/es/utils/getIsOnlyResult.js":
/*!*********************************************************************************************!*\
  !*** /Users/ericvergnaud/Development/react-bootstrap-typeahead/es/utils/getIsOnlyResult.js ***!
  \*********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _getOptionProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getOptionProperty */ "../../../react-bootstrap-typeahead/es/utils/getOptionProperty.js");
/* harmony import */ var _nodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./nodash */ "../../../react-bootstrap-typeahead/es/utils/nodash.js");



function getIsOnlyResult(props) {
  var allowNew = props.allowNew,
      highlightOnlyResult = props.highlightOnlyResult,
      results = props.results;

  if (!highlightOnlyResult || allowNew) {
    return false;
  }

  return results.length === 1 && !Object(_getOptionProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(Object(_nodash__WEBPACK_IMPORTED_MODULE_1__["head"])(results), 'disabled');
}

/* harmony default export */ __webpack_exports__["default"] = (getIsOnlyResult);

/***/ }),

/***/ "../../../react-bootstrap-typeahead/es/utils/getMatchBounds.js":
/*!********************************************************************************************!*\
  !*** /Users/ericvergnaud/Development/react-bootstrap-typeahead/es/utils/getMatchBounds.js ***!
  \********************************************************************************************/
/*! exports provided: escapeStringRegexp, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "escapeStringRegexp", function() { return escapeStringRegexp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return getMatchBounds; });
/* harmony import */ var invariant__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! invariant */ "../../../react-bootstrap-typeahead/node_modules/invariant/browser.js");
/* harmony import */ var invariant__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(invariant__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _stripDiacritics__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./stripDiacritics */ "../../../react-bootstrap-typeahead/es/utils/stripDiacritics.js");


var CASE_INSENSITIVE = 'i';
var COMBINING_MARKS = /[\u0300-\u036F]/; // Export for testing.

function escapeStringRegexp(str) {
  !(typeof str === 'string') ?  true ? invariant__WEBPACK_IMPORTED_MODULE_0___default()(false, '`escapeStringRegexp` expected a string.') : undefined : void 0; // Escape characters with special meaning either inside or outside character
  // sets. Use a simple backslash escape when it’s always valid, and a \unnnn
  // escape when the simpler form would be disallowed by Unicode patterns’
  // stricter grammar.

  return str.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&').replace(/-/g, '\\x2d');
}
function getMatchBounds(subject, str) {
  var search = new RegExp(escapeStringRegexp(Object(_stripDiacritics__WEBPACK_IMPORTED_MODULE_1__["default"])(str)), CASE_INSENSITIVE);
  var matches = search.exec(Object(_stripDiacritics__WEBPACK_IMPORTED_MODULE_1__["default"])(subject));

  if (!matches) {
    return null;
  }

  var start = matches.index;
  var matchLength = matches[0].length; // Account for combining marks, which changes the indices.

  if (COMBINING_MARKS.test(subject)) {
    // Starting at the beginning of the subject string, check for the number of
    // combining marks and increment the start index whenever one is found.
    for (var ii = 0; ii <= start; ii++) {
      if (COMBINING_MARKS.test(subject[ii])) {
        start += 1;
      }
    } // Similarly, increment the length of the match string if it contains a
    // combining mark.


    for (var _ii = start; _ii <= start + matchLength; _ii++) {
      if (COMBINING_MARKS.test(subject[_ii])) {
        matchLength += 1;
      }
    }
  }

  return {
    end: start + matchLength,
    start: start
  };
}

/***/ }),

/***/ "../../../react-bootstrap-typeahead/es/utils/getMenuItemId.js":
/*!*******************************************************************************************!*\
  !*** /Users/ericvergnaud/Development/react-bootstrap-typeahead/es/utils/getMenuItemId.js ***!
  \*******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return getMenuItemId; });
function getMenuItemId(id, position) {
  return (id || '') + "-item-" + position;
}

/***/ }),

/***/ "../../../react-bootstrap-typeahead/es/utils/getOptionLabel.js":
/*!********************************************************************************************!*\
  !*** /Users/ericvergnaud/Development/react-bootstrap-typeahead/es/utils/getOptionLabel.js ***!
  \********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var invariant__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! invariant */ "../../../react-bootstrap-typeahead/node_modules/invariant/browser.js");
/* harmony import */ var invariant__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(invariant__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _getStringLabelKey__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getStringLabelKey */ "../../../react-bootstrap-typeahead/es/utils/getStringLabelKey.js");
/* harmony import */ var _nodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./nodash */ "../../../react-bootstrap-typeahead/es/utils/nodash.js");



/**
 * Retrieves the display string from an option. Options can be the string
 * themselves, or an object with a defined display string. Anything else throws
 * an error.
 */

function getOptionLabel(option, labelKey) {
  // Handle internally created options first.
  if (!Object(_nodash__WEBPACK_IMPORTED_MODULE_2__["isString"])(option) && (option.paginationOption || option.customOption)) {
    return option[Object(_getStringLabelKey__WEBPACK_IMPORTED_MODULE_1__["default"])(labelKey)];
  }

  var optionLabel;

  if (Object(_nodash__WEBPACK_IMPORTED_MODULE_2__["isFunction"])(labelKey)) {
    optionLabel = labelKey(option);
  } else if (Object(_nodash__WEBPACK_IMPORTED_MODULE_2__["isString"])(option)) {
    optionLabel = option;
  } else {
    // `option` is an object and `labelKey` is a string.
    optionLabel = option[labelKey];
  }

  !Object(_nodash__WEBPACK_IMPORTED_MODULE_2__["isString"])(optionLabel) ?  true ? invariant__WEBPACK_IMPORTED_MODULE_0___default()(false, 'One or more options does not have a valid label string. Check the ' + '`labelKey` prop to ensure that it matches the correct option key and ' + 'provides a string for filtering and display.') : undefined : void 0;
  return optionLabel;
}

/* harmony default export */ __webpack_exports__["default"] = (getOptionLabel);

/***/ }),

/***/ "../../../react-bootstrap-typeahead/es/utils/getOptionProperty.js":
/*!***********************************************************************************************!*\
  !*** /Users/ericvergnaud/Development/react-bootstrap-typeahead/es/utils/getOptionProperty.js ***!
  \***********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return getOptionProperty; });
/* harmony import */ var _nodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./nodash */ "../../../react-bootstrap-typeahead/es/utils/nodash.js");

function getOptionProperty(option, key) {
  if (Object(_nodash__WEBPACK_IMPORTED_MODULE_0__["isString"])(option)) {
    return undefined;
  }

  return option[key];
}

/***/ }),

/***/ "../../../react-bootstrap-typeahead/es/utils/getStringLabelKey.js":
/*!***********************************************************************************************!*\
  !*** /Users/ericvergnaud/Development/react-bootstrap-typeahead/es/utils/getStringLabelKey.js ***!
  \***********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return getStringLabelKey; });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants */ "../../../react-bootstrap-typeahead/es/constants.js");

function getStringLabelKey(labelKey) {
  return typeof labelKey === 'string' ? labelKey : _constants__WEBPACK_IMPORTED_MODULE_0__["DEFAULT_LABELKEY"];
}

/***/ }),

/***/ "../../../react-bootstrap-typeahead/es/utils/getTruncatedOptions.js":
/*!*************************************************************************************************!*\
  !*** /Users/ericvergnaud/Development/react-bootstrap-typeahead/es/utils/getTruncatedOptions.js ***!
  \*************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * Truncates the result set based on `maxResults` and returns the new set.
 */
function getTruncatedOptions(options, maxResults) {
  if (!maxResults || maxResults >= options.length) {
    return options;
  }

  return options.slice(0, maxResults);
}

/* harmony default export */ __webpack_exports__["default"] = (getTruncatedOptions);

/***/ }),

/***/ "../../../react-bootstrap-typeahead/es/utils/getUpdatedActiveIndex.js":
/*!***************************************************************************************************!*\
  !*** /Users/ericvergnaud/Development/react-bootstrap-typeahead/es/utils/getUpdatedActiveIndex.js ***!
  \***************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return getUpdatedActiveIndex; });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants */ "../../../react-bootstrap-typeahead/es/constants.js");


function skipDisabledOptions(currentIndex, keyCode, items) {
  var newIndex = currentIndex;

  while (items[newIndex] && items[newIndex].disabled) {
    newIndex += keyCode === _constants__WEBPACK_IMPORTED_MODULE_0__["UP"] ? -1 : 1;
  }

  return newIndex;
}

function getUpdatedActiveIndex(currentIndex, keyCode, items) {
  var newIndex = currentIndex; // Increment or decrement index based on user keystroke.

  newIndex += keyCode === _constants__WEBPACK_IMPORTED_MODULE_0__["UP"] ? -1 : 1; // Skip over any disabled options.

  newIndex = skipDisabledOptions(newIndex, keyCode, items); // If we've reached the end, go back to the beginning or vice-versa.

  if (newIndex === items.length) {
    newIndex = -1;
  } else if (newIndex === -2) {
    newIndex = items.length - 1; // Skip over any disabled options.

    newIndex = skipDisabledOptions(newIndex, keyCode, items);
  }

  return newIndex;
}

/***/ }),

/***/ "../../../react-bootstrap-typeahead/es/utils/index.js":
/*!***********************************************************************************!*\
  !*** /Users/ericvergnaud/Development/react-bootstrap-typeahead/es/utils/index.js ***!
  \***********************************************************************************/
/*! exports provided: addCustomOption, defaultFilterBy, getDisplayName, getHintText, getInputProps, getInputText, getIsOnlyResult, getMatchBounds, escapeStringRegexp, getMenuItemId, getOptionLabel, getOptionProperty, getStringLabelKey, getTruncatedOptions, getUpdatedActiveIndex, isSelectable, isShown, preventInputBlur, shouldSelectHint, stripDiacritics, validateSelectedPropChange, warn, head, isFunction, isString, noop, pick, uniqueId, valuesPolyfill, values, isSizeLarge, isSizeSmall */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _addCustomOption__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./addCustomOption */ "../../../react-bootstrap-typeahead/es/utils/addCustomOption.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "addCustomOption", function() { return _addCustomOption__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _defaultFilterBy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./defaultFilterBy */ "../../../react-bootstrap-typeahead/es/utils/defaultFilterBy.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "defaultFilterBy", function() { return _defaultFilterBy__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _getDisplayName__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getDisplayName */ "../../../react-bootstrap-typeahead/es/utils/getDisplayName.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getDisplayName", function() { return _getDisplayName__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _getHintText__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getHintText */ "../../../react-bootstrap-typeahead/es/utils/getHintText.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getHintText", function() { return _getHintText__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/* harmony import */ var _getInputProps__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./getInputProps */ "../../../react-bootstrap-typeahead/es/utils/getInputProps.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getInputProps", function() { return _getInputProps__WEBPACK_IMPORTED_MODULE_4__["default"]; });

/* harmony import */ var _getInputText__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./getInputText */ "../../../react-bootstrap-typeahead/es/utils/getInputText.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getInputText", function() { return _getInputText__WEBPACK_IMPORTED_MODULE_5__["default"]; });

/* harmony import */ var _getIsOnlyResult__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./getIsOnlyResult */ "../../../react-bootstrap-typeahead/es/utils/getIsOnlyResult.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getIsOnlyResult", function() { return _getIsOnlyResult__WEBPACK_IMPORTED_MODULE_6__["default"]; });

/* harmony import */ var _getMatchBounds__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./getMatchBounds */ "../../../react-bootstrap-typeahead/es/utils/getMatchBounds.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getMatchBounds", function() { return _getMatchBounds__WEBPACK_IMPORTED_MODULE_7__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "escapeStringRegexp", function() { return _getMatchBounds__WEBPACK_IMPORTED_MODULE_7__["escapeStringRegexp"]; });

/* harmony import */ var _getMenuItemId__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./getMenuItemId */ "../../../react-bootstrap-typeahead/es/utils/getMenuItemId.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getMenuItemId", function() { return _getMenuItemId__WEBPACK_IMPORTED_MODULE_8__["default"]; });

/* harmony import */ var _getOptionLabel__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./getOptionLabel */ "../../../react-bootstrap-typeahead/es/utils/getOptionLabel.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getOptionLabel", function() { return _getOptionLabel__WEBPACK_IMPORTED_MODULE_9__["default"]; });

/* harmony import */ var _getOptionProperty__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./getOptionProperty */ "../../../react-bootstrap-typeahead/es/utils/getOptionProperty.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getOptionProperty", function() { return _getOptionProperty__WEBPACK_IMPORTED_MODULE_10__["default"]; });

/* harmony import */ var _getStringLabelKey__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./getStringLabelKey */ "../../../react-bootstrap-typeahead/es/utils/getStringLabelKey.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getStringLabelKey", function() { return _getStringLabelKey__WEBPACK_IMPORTED_MODULE_11__["default"]; });

/* harmony import */ var _getTruncatedOptions__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./getTruncatedOptions */ "../../../react-bootstrap-typeahead/es/utils/getTruncatedOptions.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getTruncatedOptions", function() { return _getTruncatedOptions__WEBPACK_IMPORTED_MODULE_12__["default"]; });

/* harmony import */ var _getUpdatedActiveIndex__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./getUpdatedActiveIndex */ "../../../react-bootstrap-typeahead/es/utils/getUpdatedActiveIndex.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getUpdatedActiveIndex", function() { return _getUpdatedActiveIndex__WEBPACK_IMPORTED_MODULE_13__["default"]; });

/* harmony import */ var _isSelectable__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./isSelectable */ "../../../react-bootstrap-typeahead/es/utils/isSelectable.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isSelectable", function() { return _isSelectable__WEBPACK_IMPORTED_MODULE_14__["default"]; });

/* harmony import */ var _isShown__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./isShown */ "../../../react-bootstrap-typeahead/es/utils/isShown.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isShown", function() { return _isShown__WEBPACK_IMPORTED_MODULE_15__["default"]; });

/* harmony import */ var _nodash__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./nodash */ "../../../react-bootstrap-typeahead/es/utils/nodash.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "head", function() { return _nodash__WEBPACK_IMPORTED_MODULE_16__["head"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isFunction", function() { return _nodash__WEBPACK_IMPORTED_MODULE_16__["isFunction"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isString", function() { return _nodash__WEBPACK_IMPORTED_MODULE_16__["isString"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "noop", function() { return _nodash__WEBPACK_IMPORTED_MODULE_16__["noop"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "pick", function() { return _nodash__WEBPACK_IMPORTED_MODULE_16__["pick"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "uniqueId", function() { return _nodash__WEBPACK_IMPORTED_MODULE_16__["uniqueId"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "valuesPolyfill", function() { return _nodash__WEBPACK_IMPORTED_MODULE_16__["valuesPolyfill"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "values", function() { return _nodash__WEBPACK_IMPORTED_MODULE_16__["values"]; });

/* harmony import */ var _preventInputBlur__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./preventInputBlur */ "../../../react-bootstrap-typeahead/es/utils/preventInputBlur.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "preventInputBlur", function() { return _preventInputBlur__WEBPACK_IMPORTED_MODULE_17__["default"]; });

/* harmony import */ var _shouldSelectHint__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./shouldSelectHint */ "../../../react-bootstrap-typeahead/es/utils/shouldSelectHint.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "shouldSelectHint", function() { return _shouldSelectHint__WEBPACK_IMPORTED_MODULE_18__["default"]; });

/* harmony import */ var _size__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./size */ "../../../react-bootstrap-typeahead/es/utils/size.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isSizeLarge", function() { return _size__WEBPACK_IMPORTED_MODULE_19__["isSizeLarge"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isSizeSmall", function() { return _size__WEBPACK_IMPORTED_MODULE_19__["isSizeSmall"]; });

/* harmony import */ var _stripDiacritics__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./stripDiacritics */ "../../../react-bootstrap-typeahead/es/utils/stripDiacritics.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "stripDiacritics", function() { return _stripDiacritics__WEBPACK_IMPORTED_MODULE_20__["default"]; });

/* harmony import */ var _validateSelectedPropChange__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./validateSelectedPropChange */ "../../../react-bootstrap-typeahead/es/utils/validateSelectedPropChange.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "validateSelectedPropChange", function() { return _validateSelectedPropChange__WEBPACK_IMPORTED_MODULE_21__["default"]; });

/* harmony import */ var _warn__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./warn */ "../../../react-bootstrap-typeahead/es/utils/warn.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "warn", function() { return _warn__WEBPACK_IMPORTED_MODULE_22__["default"]; });















































/***/ }),

/***/ "../../../react-bootstrap-typeahead/es/utils/isSelectable.js":
/*!******************************************************************************************!*\
  !*** /Users/ericvergnaud/Development/react-bootstrap-typeahead/es/utils/isSelectable.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return isSelectable; });
/**
 * Check if an input type is selectable, based on WHATWG spec.
 *
 * See:
 *  - https://stackoverflow.com/questions/21177489/selectionstart-selectionend-on-input-type-number-no-longer-allowed-in-chrome/24175357
 *  - https://html.spec.whatwg.org/multipage/input.html#do-not-apply
 */
function isSelectable(inputNode) {
  return inputNode.selectionStart != null;
}

/***/ }),

/***/ "../../../react-bootstrap-typeahead/es/utils/isShown.js":
/*!*************************************************************************************!*\
  !*** /Users/ericvergnaud/Development/react-bootstrap-typeahead/es/utils/isShown.js ***!
  \*************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return isShown; });
function isShown(props) {
  var open = props.open,
      minLength = props.minLength,
      showMenu = props.showMenu,
      text = props.text; // If menu visibility is controlled via props, that value takes precedence.

  if (open || open === false) {
    return open;
  }

  if (text.length < minLength) {
    return false;
  }

  return showMenu;
}

/***/ }),

/***/ "../../../react-bootstrap-typeahead/es/utils/nodash.js":
/*!************************************************************************************!*\
  !*** /Users/ericvergnaud/Development/react-bootstrap-typeahead/es/utils/nodash.js ***!
  \************************************************************************************/
/*! exports provided: head, isFunction, isString, noop, pick, uniqueId, valuesPolyfill, values */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "head", function() { return head; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isFunction", function() { return isFunction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isString", function() { return isString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "noop", function() { return noop; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pick", function() { return pick; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "uniqueId", function() { return uniqueId; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "valuesPolyfill", function() { return valuesPolyfill; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "values", function() { return values; });
var idCounter = 0;
function head(arr) {
  return Array.isArray(arr) && arr.length ? arr[0] : undefined;
}
function isFunction(value) {
  return typeof value === 'function';
}
function isString(value) {
  return typeof value === 'string';
}
function noop() {}
function pick(obj, keys) {
  var result = {};
  keys.forEach(function (k) {
    if (Object.prototype.hasOwnProperty.call(obj, k)) {
      result[k] = obj[k];
    }
  });
  return result;
}
function uniqueId(prefix) {
  idCounter += 1;
  return (prefix == null ? '' : String(prefix)) + idCounter;
} // Export for testing purposes.

function valuesPolyfill(obj) {
  return Object.keys(obj).reduce(function (accum, key) {
    if (Object.prototype.propertyIsEnumerable.call(obj, key)) {
      accum.push(obj[key]);
    }

    return accum;
  }, []);
}
function values(obj) {
  return isFunction(Object.values) ? Object.values(obj) : valuesPolyfill(obj);
}

/***/ }),

/***/ "../../../react-bootstrap-typeahead/es/utils/preventInputBlur.js":
/*!**********************************************************************************************!*\
  !*** /Users/ericvergnaud/Development/react-bootstrap-typeahead/es/utils/preventInputBlur.js ***!
  \**********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return preventInputBlur; });
/**
 * Prevent the main input from blurring when a menu item or the clear button is
 * clicked. (#226 & #310)
 */
function preventInputBlur(e) {
  e.preventDefault();
}

/***/ }),

/***/ "../../../react-bootstrap-typeahead/es/utils/shouldSelectHint.js":
/*!**********************************************************************************************!*\
  !*** /Users/ericvergnaud/Development/react-bootstrap-typeahead/es/utils/shouldSelectHint.js ***!
  \**********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return shouldSelectHint; });
/* harmony import */ var _isSelectable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./isSelectable */ "../../../react-bootstrap-typeahead/es/utils/isSelectable.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../constants */ "../../../react-bootstrap-typeahead/es/constants.js");


function shouldSelectHint(_ref, _ref2) {
  var currentTarget = _ref.currentTarget,
      keyCode = _ref.keyCode;
  var hintText = _ref2.hintText,
      selectHintOnEnter = _ref2.selectHintOnEnter,
      value = _ref2.value;

  if (!hintText) {
    return false;
  }

  if (keyCode === _constants__WEBPACK_IMPORTED_MODULE_1__["RIGHT"]) {
    // For selectable input types ("text", "search"), only select the hint if
    // it's at the end of the input value. For non-selectable types ("email",
    // "number"), always select the hint.
    return Object(_isSelectable__WEBPACK_IMPORTED_MODULE_0__["default"])(currentTarget) ? currentTarget.selectionStart === value.length : true;
  }

  if (keyCode === _constants__WEBPACK_IMPORTED_MODULE_1__["TAB"]) {
    return true;
  }

  if (keyCode === _constants__WEBPACK_IMPORTED_MODULE_1__["RETURN"] && selectHintOnEnter) {
    return true;
  }

  return false;
}

/***/ }),

/***/ "../../../react-bootstrap-typeahead/es/utils/size.js":
/*!**********************************************************************************!*\
  !*** /Users/ericvergnaud/Development/react-bootstrap-typeahead/es/utils/size.js ***!
  \**********************************************************************************/
/*! exports provided: isSizeLarge, isSizeSmall */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isSizeLarge", function() { return isSizeLarge; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isSizeSmall", function() { return isSizeSmall; });
function isSizeLarge(size) {
  return size === 'large' || size === 'lg';
}
function isSizeSmall(size) {
  return size === 'small' || size === 'sm';
}

/***/ }),

/***/ "../../../react-bootstrap-typeahead/es/utils/stripDiacritics.js":
/*!*********************************************************************************************!*\
  !*** /Users/ericvergnaud/Development/react-bootstrap-typeahead/es/utils/stripDiacritics.js ***!
  \*********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return stripDiacritics; });
/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Taken from: http://stackoverflow.com/questions/990904/remove-accents-diacritics-in-a-string-in-javascript/18391901#18391901
 */

/* eslint-disable max-len */
var map = [{
  base: 'A',
  letters: "A\u24B6\uFF21\xC0\xC1\xC2\u1EA6\u1EA4\u1EAA\u1EA8\xC3\u0100\u0102\u1EB0\u1EAE\u1EB4\u1EB2\u0226\u01E0\xC4\u01DE\u1EA2\xC5\u01FA\u01CD\u0200\u0202\u1EA0\u1EAC\u1EB6\u1E00\u0104\u023A\u2C6F"
}, {
  base: 'AA',
  letters: "\uA732"
}, {
  base: 'AE',
  letters: "\xC6\u01FC\u01E2"
}, {
  base: 'AO',
  letters: "\uA734"
}, {
  base: 'AU',
  letters: "\uA736"
}, {
  base: 'AV',
  letters: "\uA738\uA73A"
}, {
  base: 'AY',
  letters: "\uA73C"
}, {
  base: 'B',
  letters: "B\u24B7\uFF22\u1E02\u1E04\u1E06\u0243\u0182\u0181"
}, {
  base: 'C',
  letters: "C\u24B8\uFF23\u0106\u0108\u010A\u010C\xC7\u1E08\u0187\u023B\uA73E"
}, {
  base: 'D',
  letters: "D\u24B9\uFF24\u1E0A\u010E\u1E0C\u1E10\u1E12\u1E0E\u0110\u018B\u018A\u0189\uA779\xD0"
}, {
  base: 'DZ',
  letters: "\u01F1\u01C4"
}, {
  base: 'Dz',
  letters: "\u01F2\u01C5"
}, {
  base: 'E',
  letters: "E\u24BA\uFF25\xC8\xC9\xCA\u1EC0\u1EBE\u1EC4\u1EC2\u1EBC\u0112\u1E14\u1E16\u0114\u0116\xCB\u1EBA\u011A\u0204\u0206\u1EB8\u1EC6\u0228\u1E1C\u0118\u1E18\u1E1A\u0190\u018E"
}, {
  base: 'F',
  letters: "F\u24BB\uFF26\u1E1E\u0191\uA77B"
}, {
  base: 'G',
  letters: "G\u24BC\uFF27\u01F4\u011C\u1E20\u011E\u0120\u01E6\u0122\u01E4\u0193\uA7A0\uA77D\uA77E"
}, {
  base: 'H',
  letters: "H\u24BD\uFF28\u0124\u1E22\u1E26\u021E\u1E24\u1E28\u1E2A\u0126\u2C67\u2C75\uA78D"
}, {
  base: 'I',
  letters: "I\u24BE\uFF29\xCC\xCD\xCE\u0128\u012A\u012C\u0130\xCF\u1E2E\u1EC8\u01CF\u0208\u020A\u1ECA\u012E\u1E2C\u0197"
}, {
  base: 'J',
  letters: "J\u24BF\uFF2A\u0134\u0248"
}, {
  base: 'K',
  letters: "K\u24C0\uFF2B\u1E30\u01E8\u1E32\u0136\u1E34\u0198\u2C69\uA740\uA742\uA744\uA7A2"
}, {
  base: 'L',
  letters: "L\u24C1\uFF2C\u013F\u0139\u013D\u1E36\u1E38\u013B\u1E3C\u1E3A\u0141\u023D\u2C62\u2C60\uA748\uA746\uA780"
}, {
  base: 'LJ',
  letters: "\u01C7"
}, {
  base: 'Lj',
  letters: "\u01C8"
}, {
  base: 'M',
  letters: "M\u24C2\uFF2D\u1E3E\u1E40\u1E42\u2C6E\u019C"
}, {
  base: 'N',
  letters: "N\u24C3\uFF2E\u01F8\u0143\xD1\u1E44\u0147\u1E46\u0145\u1E4A\u1E48\u0220\u019D\uA790\uA7A4"
}, {
  base: 'NJ',
  letters: "\u01CA"
}, {
  base: 'Nj',
  letters: "\u01CB"
}, {
  base: 'O',
  letters: "O\u24C4\uFF2F\xD2\xD3\xD4\u1ED2\u1ED0\u1ED6\u1ED4\xD5\u1E4C\u022C\u1E4E\u014C\u1E50\u1E52\u014E\u022E\u0230\xD6\u022A\u1ECE\u0150\u01D1\u020C\u020E\u01A0\u1EDC\u1EDA\u1EE0\u1EDE\u1EE2\u1ECC\u1ED8\u01EA\u01EC\xD8\u01FE\u0186\u019F\uA74A\uA74C"
}, {
  base: 'OI',
  letters: "\u01A2"
}, {
  base: 'OO',
  letters: "\uA74E"
}, {
  base: 'OU',
  letters: "\u0222"
}, {
  base: 'OE',
  letters: "\x8C\u0152"
}, {
  base: 'oe',
  letters: "\x9C\u0153"
}, {
  base: 'P',
  letters: "P\u24C5\uFF30\u1E54\u1E56\u01A4\u2C63\uA750\uA752\uA754"
}, {
  base: 'Q',
  letters: "Q\u24C6\uFF31\uA756\uA758\u024A"
}, {
  base: 'R',
  letters: "R\u24C7\uFF32\u0154\u1E58\u0158\u0210\u0212\u1E5A\u1E5C\u0156\u1E5E\u024C\u2C64\uA75A\uA7A6\uA782"
}, {
  base: 'S',
  letters: "S\u24C8\uFF33\u1E9E\u015A\u1E64\u015C\u1E60\u0160\u1E66\u1E62\u1E68\u0218\u015E\u2C7E\uA7A8\uA784"
}, {
  base: 'T',
  letters: "T\u24C9\uFF34\u1E6A\u0164\u1E6C\u021A\u0162\u1E70\u1E6E\u0166\u01AC\u01AE\u023E\uA786"
}, {
  base: 'TZ',
  letters: "\uA728"
}, {
  base: 'U',
  letters: "U\u24CA\uFF35\xD9\xDA\xDB\u0168\u1E78\u016A\u1E7A\u016C\xDC\u01DB\u01D7\u01D5\u01D9\u1EE6\u016E\u0170\u01D3\u0214\u0216\u01AF\u1EEA\u1EE8\u1EEE\u1EEC\u1EF0\u1EE4\u1E72\u0172\u1E76\u1E74\u0244"
}, {
  base: 'V',
  letters: "V\u24CB\uFF36\u1E7C\u1E7E\u01B2\uA75E\u0245"
}, {
  base: 'VY',
  letters: "\uA760"
}, {
  base: 'W',
  letters: "W\u24CC\uFF37\u1E80\u1E82\u0174\u1E86\u1E84\u1E88\u2C72"
}, {
  base: 'X',
  letters: "X\u24CD\uFF38\u1E8A\u1E8C"
}, {
  base: 'Y',
  letters: "Y\u24CE\uFF39\u1EF2\xDD\u0176\u1EF8\u0232\u1E8E\u0178\u1EF6\u1EF4\u01B3\u024E\u1EFE"
}, {
  base: 'Z',
  letters: "Z\u24CF\uFF3A\u0179\u1E90\u017B\u017D\u1E92\u1E94\u01B5\u0224\u2C7F\u2C6B\uA762"
}, {
  base: 'a',
  letters: "a\u24D0\uFF41\u1E9A\xE0\xE1\xE2\u1EA7\u1EA5\u1EAB\u1EA9\xE3\u0101\u0103\u1EB1\u1EAF\u1EB5\u1EB3\u0227\u01E1\xE4\u01DF\u1EA3\xE5\u01FB\u01CE\u0201\u0203\u1EA1\u1EAD\u1EB7\u1E01\u0105\u2C65\u0250"
}, {
  base: 'aa',
  letters: "\uA733"
}, {
  base: 'ae',
  letters: "\xE6\u01FD\u01E3"
}, {
  base: 'ao',
  letters: "\uA735"
}, {
  base: 'au',
  letters: "\uA737"
}, {
  base: 'av',
  letters: "\uA739\uA73B"
}, {
  base: 'ay',
  letters: "\uA73D"
}, {
  base: 'b',
  letters: "b\u24D1\uFF42\u1E03\u1E05\u1E07\u0180\u0183\u0253"
}, {
  base: 'c',
  letters: "c\u24D2\uFF43\u0107\u0109\u010B\u010D\xE7\u1E09\u0188\u023C\uA73F\u2184"
}, {
  base: 'd',
  letters: "d\u24D3\uFF44\u1E0B\u010F\u1E0D\u1E11\u1E13\u1E0F\u0111\u018C\u0256\u0257\uA77A"
}, {
  base: 'dz',
  letters: "\u01F3\u01C6"
}, {
  base: 'e',
  letters: "e\u24D4\uFF45\xE8\xE9\xEA\u1EC1\u1EBF\u1EC5\u1EC3\u1EBD\u0113\u1E15\u1E17\u0115\u0117\xEB\u1EBB\u011B\u0205\u0207\u1EB9\u1EC7\u0229\u1E1D\u0119\u1E19\u1E1B\u0247\u025B\u01DD"
}, {
  base: 'f',
  letters: "f\u24D5\uFF46\u1E1F\u0192\uA77C"
}, {
  base: 'g',
  letters: "g\u24D6\uFF47\u01F5\u011D\u1E21\u011F\u0121\u01E7\u0123\u01E5\u0260\uA7A1\u1D79\uA77F"
}, {
  base: 'h',
  letters: "h\u24D7\uFF48\u0125\u1E23\u1E27\u021F\u1E25\u1E29\u1E2B\u1E96\u0127\u2C68\u2C76\u0265"
}, {
  base: 'hv',
  letters: "\u0195"
}, {
  base: 'i',
  letters: "i\u24D8\uFF49\xEC\xED\xEE\u0129\u012B\u012D\xEF\u1E2F\u1EC9\u01D0\u0209\u020B\u1ECB\u012F\u1E2D\u0268\u0131"
}, {
  base: 'j',
  letters: "j\u24D9\uFF4A\u0135\u01F0\u0249"
}, {
  base: 'k',
  letters: "k\u24DA\uFF4B\u1E31\u01E9\u1E33\u0137\u1E35\u0199\u2C6A\uA741\uA743\uA745\uA7A3"
}, {
  base: 'l',
  letters: "l\u24DB\uFF4C\u0140\u013A\u013E\u1E37\u1E39\u013C\u1E3D\u1E3B\u017F\u0142\u019A\u026B\u2C61\uA749\uA781\uA747"
}, {
  base: 'lj',
  letters: "\u01C9"
}, {
  base: 'm',
  letters: "m\u24DC\uFF4D\u1E3F\u1E41\u1E43\u0271\u026F"
}, {
  base: 'n',
  letters: "n\u24DD\uFF4E\u01F9\u0144\xF1\u1E45\u0148\u1E47\u0146\u1E4B\u1E49\u019E\u0272\u0149\uA791\uA7A5"
}, {
  base: 'nj',
  letters: "\u01CC"
}, {
  base: 'o',
  letters: "o\u24DE\uFF4F\xF2\xF3\xF4\u1ED3\u1ED1\u1ED7\u1ED5\xF5\u1E4D\u022D\u1E4F\u014D\u1E51\u1E53\u014F\u022F\u0231\xF6\u022B\u1ECF\u0151\u01D2\u020D\u020F\u01A1\u1EDD\u1EDB\u1EE1\u1EDF\u1EE3\u1ECD\u1ED9\u01EB\u01ED\xF8\u01FF\u0254\uA74B\uA74D\u0275"
}, {
  base: 'oi',
  letters: "\u01A3"
}, {
  base: 'ou',
  letters: "\u0223"
}, {
  base: 'oo',
  letters: "\uA74F"
}, {
  base: 'p',
  letters: "p\u24DF\uFF50\u1E55\u1E57\u01A5\u1D7D\uA751\uA753\uA755"
}, {
  base: 'q',
  letters: "q\u24E0\uFF51\u024B\uA757\uA759"
}, {
  base: 'r',
  letters: "r\u24E1\uFF52\u0155\u1E59\u0159\u0211\u0213\u1E5B\u1E5D\u0157\u1E5F\u024D\u027D\uA75B\uA7A7\uA783"
}, {
  base: 's',
  letters: "s\u24E2\uFF53\xDF\u015B\u1E65\u015D\u1E61\u0161\u1E67\u1E63\u1E69\u0219\u015F\u023F\uA7A9\uA785\u1E9B"
}, {
  base: 't',
  letters: "t\u24E3\uFF54\u1E6B\u1E97\u0165\u1E6D\u021B\u0163\u1E71\u1E6F\u0167\u01AD\u0288\u2C66\uA787"
}, {
  base: 'tz',
  letters: "\uA729"
}, {
  base: 'u',
  letters: "u\u24E4\uFF55\xF9\xFA\xFB\u0169\u1E79\u016B\u1E7B\u016D\xFC\u01DC\u01D8\u01D6\u01DA\u1EE7\u016F\u0171\u01D4\u0215\u0217\u01B0\u1EEB\u1EE9\u1EEF\u1EED\u1EF1\u1EE5\u1E73\u0173\u1E77\u1E75\u0289"
}, {
  base: 'v',
  letters: "v\u24E5\uFF56\u1E7D\u1E7F\u028B\uA75F\u028C"
}, {
  base: 'vy',
  letters: "\uA761"
}, {
  base: 'w',
  letters: "w\u24E6\uFF57\u1E81\u1E83\u0175\u1E87\u1E85\u1E98\u1E89\u2C73"
}, {
  base: 'x',
  letters: "x\u24E7\uFF58\u1E8B\u1E8D"
}, {
  base: 'y',
  letters: "y\u24E8\uFF59\u1EF3\xFD\u0177\u1EF9\u0233\u1E8F\xFF\u1EF7\u1E99\u1EF5\u01B4\u024F\u1EFF"
}, {
  base: 'z',
  letters: "z\u24E9\uFF5A\u017A\u1E91\u017C\u017E\u1E93\u1E95\u01B6\u0225\u0240\u2C6C\uA763"
}];
/* eslint-enable max-len */

var diacriticsMap = {};

for (var ii = 0; ii < map.length; ii++) {
  var letters = map[ii].letters;

  for (var jj = 0; jj < letters.length; jj++) {
    diacriticsMap[letters[jj]] = map[ii].base;
  }
} // "what?" version ... http://jsperf.com/diacritics/12


function stripDiacritics(str) {
  return str.replace(/[\u0300-\u036F]/g, '') // Remove combining diacritics

  /* eslint-disable-next-line no-control-regex */
  .replace(/[^\u0000-\u007E]/g, function (a) {
    return diacriticsMap[a] || a;
  });
}

/***/ }),

/***/ "../../../react-bootstrap-typeahead/es/utils/validateSelectedPropChange.js":
/*!********************************************************************************************************!*\
  !*** /Users/ericvergnaud/Development/react-bootstrap-typeahead/es/utils/validateSelectedPropChange.js ***!
  \********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return validateSelectedPropChange; });
/* harmony import */ var _warn__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./warn */ "../../../react-bootstrap-typeahead/es/utils/warn.js");

function validateSelectedPropChange(prevSelected, selected) {
  var uncontrolledToControlled = !prevSelected && selected;
  var controlledToUncontrolled = prevSelected && !selected;
  var from, to, precedent;

  if (uncontrolledToControlled) {
    from = 'uncontrolled';
    to = 'controlled';
    precedent = 'an';
  } else {
    from = 'controlled';
    to = 'uncontrolled';
    precedent = 'a';
  }

  var message = "You are changing " + precedent + " " + from + " typeahead to be " + to + ". " + ("Input elements should not switch from " + from + " to " + to + " (or vice versa). ") + 'Decide between using a controlled or uncontrolled element for the ' + 'lifetime of the component.';
  Object(_warn__WEBPACK_IMPORTED_MODULE_0__["default"])(!(uncontrolledToControlled || controlledToUncontrolled), message);
}

/***/ }),

/***/ "../../../react-bootstrap-typeahead/es/utils/warn.js":
/*!**********************************************************************************!*\
  !*** /Users/ericvergnaud/Development/react-bootstrap-typeahead/es/utils/warn.js ***!
  \**********************************************************************************/
/*! exports provided: default, resetWarned */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return warn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "resetWarned", function() { return resetWarned; });
/* harmony import */ var warning__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! warning */ "../../../react-bootstrap-typeahead/node_modules/warning/warning.js");
/* harmony import */ var warning__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(warning__WEBPACK_IMPORTED_MODULE_0__);

var warned = {};
/**
 * Copied from: https://github.com/ReactTraining/react-router/blob/master/modules/routerWarning.js
 */

function warn(falseToWarn, message) {
  // Only issue deprecation warnings once.
  if (!falseToWarn && message.indexOf('deprecated') !== -1) {
    if (warned[message]) {
      return;
    }

    warned[message] = true;
  }

  for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }

  warning__WEBPACK_IMPORTED_MODULE_0___default.a.apply(void 0, [falseToWarn, "[react-bootstrap-typeahead] " + message].concat(args));
}
function resetWarned() {
  warned = {};
}

/***/ }),

/***/ "../../../react-bootstrap-typeahead/node_modules/@babel/runtime/helpers/assertThisInitialized.js":
/*!******************************************************************************************************************************!*\
  !*** /Users/ericvergnaud/Development/react-bootstrap-typeahead/node_modules/@babel/runtime/helpers/assertThisInitialized.js ***!
  \******************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

module.exports = _assertThisInitialized;

/***/ }),

/***/ "../../../react-bootstrap-typeahead/node_modules/@babel/runtime/helpers/defineProperty.js":
/*!***********************************************************************************************************************!*\
  !*** /Users/ericvergnaud/Development/react-bootstrap-typeahead/node_modules/@babel/runtime/helpers/defineProperty.js ***!
  \***********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

module.exports = _defineProperty;

/***/ }),

/***/ "../../../react-bootstrap-typeahead/node_modules/@babel/runtime/helpers/extends.js":
/*!****************************************************************************************************************!*\
  !*** /Users/ericvergnaud/Development/react-bootstrap-typeahead/node_modules/@babel/runtime/helpers/extends.js ***!
  \****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _extends() {
  module.exports = _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

module.exports = _extends;

/***/ }),

/***/ "../../../react-bootstrap-typeahead/node_modules/@babel/runtime/helpers/inheritsLoose.js":
/*!**********************************************************************************************************************!*\
  !*** /Users/ericvergnaud/Development/react-bootstrap-typeahead/node_modules/@babel/runtime/helpers/inheritsLoose.js ***!
  \**********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}

module.exports = _inheritsLoose;

/***/ }),

/***/ "../../../react-bootstrap-typeahead/node_modules/@babel/runtime/helpers/interopRequireDefault.js":
/*!******************************************************************************************************************************!*\
  !*** /Users/ericvergnaud/Development/react-bootstrap-typeahead/node_modules/@babel/runtime/helpers/interopRequireDefault.js ***!
  \******************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

module.exports = _interopRequireDefault;

/***/ }),

/***/ "../../../react-bootstrap-typeahead/node_modules/@babel/runtime/helpers/objectWithoutPropertiesLoose.js":
/*!*************************************************************************************************************************************!*\
  !*** /Users/ericvergnaud/Development/react-bootstrap-typeahead/node_modules/@babel/runtime/helpers/objectWithoutPropertiesLoose.js ***!
  \*************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

module.exports = _objectWithoutPropertiesLoose;

/***/ }),

/***/ "../../../react-bootstrap-typeahead/node_modules/classnames/index.js":
/*!**************************************************************************************************!*\
  !*** /Users/ericvergnaud/Development/react-bootstrap-typeahead/node_modules/classnames/index.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
  Copyright (c) 2017 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
/* global define */

(function () {
	'use strict';

	var hasOwn = {}.hasOwnProperty;

	function classNames () {
		var classes = [];

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (!arg) continue;

			var argType = typeof arg;

			if (argType === 'string' || argType === 'number') {
				classes.push(arg);
			} else if (Array.isArray(arg) && arg.length) {
				var inner = classNames.apply(null, arg);
				if (inner) {
					classes.push(inner);
				}
			} else if (argType === 'object') {
				for (var key in arg) {
					if (hasOwn.call(arg, key) && arg[key]) {
						classes.push(key);
					}
				}
			}
		}

		return classes.join(' ');
	}

	if ( true && module.exports) {
		classNames.default = classNames;
		module.exports = classNames;
	} else if (true) {
		// register as 'classnames', consistent with npm package name
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
			return classNames;
		}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {}
}());


/***/ }),

/***/ "../../../react-bootstrap-typeahead/node_modules/compute-scroll-into-view/es/index.js":
/*!*******************************************************************************************************************!*\
  !*** /Users/ericvergnaud/Development/react-bootstrap-typeahead/node_modules/compute-scroll-into-view/es/index.js ***!
  \*******************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function isElement(el) {
  return el != null && typeof el === 'object' && el.nodeType === 1;
}

function canOverflow(overflow, skipOverflowHiddenElements) {
  if (skipOverflowHiddenElements && overflow === 'hidden') {
    return false;
  }

  return overflow !== 'visible' && overflow !== 'clip';
}

function getFrameElement(el) {
  if (!el.ownerDocument || !el.ownerDocument.defaultView) {
    return null;
  }

  return el.ownerDocument.defaultView.frameElement;
}

function isHiddenByFrame(el) {
  var frame = getFrameElement(el);

  if (!frame) {
    return false;
  }

  return frame.clientHeight < el.scrollHeight || frame.clientWidth < el.scrollWidth;
}

function isScrollable(el, skipOverflowHiddenElements) {
  if (el.clientHeight < el.scrollHeight || el.clientWidth < el.scrollWidth) {
    var style = getComputedStyle(el, null);
    return canOverflow(style.overflowY, skipOverflowHiddenElements) || canOverflow(style.overflowX, skipOverflowHiddenElements) || isHiddenByFrame(el);
  }

  return false;
}

function alignNearest(scrollingEdgeStart, scrollingEdgeEnd, scrollingSize, scrollingBorderStart, scrollingBorderEnd, elementEdgeStart, elementEdgeEnd, elementSize) {
  if (elementEdgeStart < scrollingEdgeStart && elementEdgeEnd > scrollingEdgeEnd || elementEdgeStart > scrollingEdgeStart && elementEdgeEnd < scrollingEdgeEnd) {
    return 0;
  }

  if (elementEdgeStart <= scrollingEdgeStart && elementSize <= scrollingSize || elementEdgeEnd >= scrollingEdgeEnd && elementSize >= scrollingSize) {
    return elementEdgeStart - scrollingEdgeStart - scrollingBorderStart;
  }

  if (elementEdgeEnd > scrollingEdgeEnd && elementSize < scrollingSize || elementEdgeStart < scrollingEdgeStart && elementSize > scrollingSize) {
    return elementEdgeEnd - scrollingEdgeEnd + scrollingBorderEnd;
  }

  return 0;
}

/* harmony default export */ __webpack_exports__["default"] = (function (target, options) {
  var scrollMode = options.scrollMode,
      block = options.block,
      inline = options.inline,
      boundary = options.boundary,
      skipOverflowHiddenElements = options.skipOverflowHiddenElements;
  var checkBoundary = typeof boundary === 'function' ? boundary : function (node) {
    return node !== boundary;
  };

  if (!isElement(target)) {
    throw new TypeError('Invalid target');
  }

  var scrollingElement = document.scrollingElement || document.documentElement;
  var frames = [];
  var cursor = target;

  while (isElement(cursor) && checkBoundary(cursor)) {
    cursor = cursor.parentNode;

    if (cursor === scrollingElement) {
      frames.push(cursor);
      break;
    }

    if (cursor === document.body && isScrollable(cursor) && !isScrollable(document.documentElement)) {
      continue;
    }

    if (isScrollable(cursor, skipOverflowHiddenElements)) {
      frames.push(cursor);
    }
  }

  var viewportWidth = window.visualViewport ? visualViewport.width : innerWidth;
  var viewportHeight = window.visualViewport ? visualViewport.height : innerHeight;
  var viewportX = window.scrollX || pageXOffset;
  var viewportY = window.scrollY || pageYOffset;

  var _target$getBoundingCl = target.getBoundingClientRect(),
      targetHeight = _target$getBoundingCl.height,
      targetWidth = _target$getBoundingCl.width,
      targetTop = _target$getBoundingCl.top,
      targetRight = _target$getBoundingCl.right,
      targetBottom = _target$getBoundingCl.bottom,
      targetLeft = _target$getBoundingCl.left;

  var targetBlock = block === 'start' || block === 'nearest' ? targetTop : block === 'end' ? targetBottom : targetTop + targetHeight / 2;
  var targetInline = inline === 'center' ? targetLeft + targetWidth / 2 : inline === 'end' ? targetRight : targetLeft;
  var computations = [];

  for (var index = 0; index < frames.length; index++) {
    var frame = frames[index];

    var _frame$getBoundingCli = frame.getBoundingClientRect(),
        height = _frame$getBoundingCli.height,
        width = _frame$getBoundingCli.width,
        top = _frame$getBoundingCli.top,
        right = _frame$getBoundingCli.right,
        bottom = _frame$getBoundingCli.bottom,
        left = _frame$getBoundingCli.left;

    if (scrollMode === 'if-needed' && targetTop >= 0 && targetLeft >= 0 && targetBottom <= viewportHeight && targetRight <= viewportWidth && targetTop >= top && targetBottom <= bottom && targetLeft >= left && targetRight <= right) {
      return computations;
    }

    var frameStyle = getComputedStyle(frame);
    var borderLeft = parseInt(frameStyle.borderLeftWidth, 10);
    var borderTop = parseInt(frameStyle.borderTopWidth, 10);
    var borderRight = parseInt(frameStyle.borderRightWidth, 10);
    var borderBottom = parseInt(frameStyle.borderBottomWidth, 10);
    var blockScroll = 0;
    var inlineScroll = 0;
    var scrollbarWidth = 'offsetWidth' in frame ? frame.offsetWidth - frame.clientWidth - borderLeft - borderRight : 0;
    var scrollbarHeight = 'offsetHeight' in frame ? frame.offsetHeight - frame.clientHeight - borderTop - borderBottom : 0;

    if (scrollingElement === frame) {
      if (block === 'start') {
        blockScroll = targetBlock;
      } else if (block === 'end') {
        blockScroll = targetBlock - viewportHeight;
      } else if (block === 'nearest') {
        blockScroll = alignNearest(viewportY, viewportY + viewportHeight, viewportHeight, borderTop, borderBottom, viewportY + targetBlock, viewportY + targetBlock + targetHeight, targetHeight);
      } else {
        blockScroll = targetBlock - viewportHeight / 2;
      }

      if (inline === 'start') {
        inlineScroll = targetInline;
      } else if (inline === 'center') {
        inlineScroll = targetInline - viewportWidth / 2;
      } else if (inline === 'end') {
        inlineScroll = targetInline - viewportWidth;
      } else {
        inlineScroll = alignNearest(viewportX, viewportX + viewportWidth, viewportWidth, borderLeft, borderRight, viewportX + targetInline, viewportX + targetInline + targetWidth, targetWidth);
      }

      blockScroll = Math.max(0, blockScroll + viewportY);
      inlineScroll = Math.max(0, inlineScroll + viewportX);
    } else {
      if (block === 'start') {
        blockScroll = targetBlock - top - borderTop;
      } else if (block === 'end') {
        blockScroll = targetBlock - bottom + borderBottom + scrollbarHeight;
      } else if (block === 'nearest') {
        blockScroll = alignNearest(top, bottom, height, borderTop, borderBottom + scrollbarHeight, targetBlock, targetBlock + targetHeight, targetHeight);
      } else {
        blockScroll = targetBlock - (top + height / 2) + scrollbarHeight / 2;
      }

      if (inline === 'start') {
        inlineScroll = targetInline - left - borderLeft;
      } else if (inline === 'center') {
        inlineScroll = targetInline - (left + width / 2) + scrollbarWidth / 2;
      } else if (inline === 'end') {
        inlineScroll = targetInline - right + borderRight + scrollbarWidth;
      } else {
        inlineScroll = alignNearest(left, right, width, borderLeft, borderRight + scrollbarWidth, targetInline, targetInline + targetWidth, targetWidth);
      }

      var scrollLeft = frame.scrollLeft,
          scrollTop = frame.scrollTop;
      blockScroll = Math.max(0, Math.min(scrollTop + blockScroll, frame.scrollHeight - height + scrollbarHeight));
      inlineScroll = Math.max(0, Math.min(scrollLeft + inlineScroll, frame.scrollWidth - width + scrollbarWidth));
      targetBlock += scrollTop - blockScroll;
      targetInline += scrollLeft - inlineScroll;
    }

    computations.push({
      el: frame,
      top: blockScroll,
      left: inlineScroll
    });
  }

  return computations;
});

/***/ }),

/***/ "../../../react-bootstrap-typeahead/node_modules/create-react-context/lib/implementation.js":
/*!*************************************************************************************************************************!*\
  !*** /Users/ericvergnaud/Development/react-bootstrap-typeahead/node_modules/create-react-context/lib/implementation.js ***!
  \*************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _react = __webpack_require__(/*! react */ "react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(/*! prop-types */ "prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _gud = __webpack_require__(/*! gud */ "../../../react-bootstrap-typeahead/node_modules/gud/index.js");

var _gud2 = _interopRequireDefault(_gud);

var _warning = __webpack_require__(/*! warning */ "../../../react-bootstrap-typeahead/node_modules/warning/warning.js");

var _warning2 = _interopRequireDefault(_warning);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MAX_SIGNED_31_BIT_INT = 1073741823;

// Inlined Object.is polyfill.
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
function objectIs(x, y) {
  if (x === y) {
    return x !== 0 || 1 / x === 1 / y;
  } else {
    return x !== x && y !== y;
  }
}

function createEventEmitter(value) {
  var handlers = [];
  return {
    on: function on(handler) {
      handlers.push(handler);
    },
    off: function off(handler) {
      handlers = handlers.filter(function (h) {
        return h !== handler;
      });
    },
    get: function get() {
      return value;
    },
    set: function set(newValue, changedBits) {
      value = newValue;
      handlers.forEach(function (handler) {
        return handler(value, changedBits);
      });
    }
  };
}

function onlyChild(children) {
  return Array.isArray(children) ? children[0] : children;
}

function createReactContext(defaultValue, calculateChangedBits) {
  var _Provider$childContex, _Consumer$contextType;

  var contextProp = '__create-react-context-' + (0, _gud2.default)() + '__';

  var Provider = function (_Component) {
    _inherits(Provider, _Component);

    function Provider() {
      var _temp, _this, _ret;

      _classCallCheck(this, Provider);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.emitter = createEventEmitter(_this.props.value), _temp), _possibleConstructorReturn(_this, _ret);
    }

    Provider.prototype.getChildContext = function getChildContext() {
      var _ref;

      return _ref = {}, _ref[contextProp] = this.emitter, _ref;
    };

    Provider.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
      if (this.props.value !== nextProps.value) {
        var oldValue = this.props.value;
        var newValue = nextProps.value;
        var changedBits = void 0;

        if (objectIs(oldValue, newValue)) {
          changedBits = 0; // No change
        } else {
          changedBits = typeof calculateChangedBits === 'function' ? calculateChangedBits(oldValue, newValue) : MAX_SIGNED_31_BIT_INT;
          if (true) {
            (0, _warning2.default)((changedBits & MAX_SIGNED_31_BIT_INT) === changedBits, 'calculateChangedBits: Expected the return value to be a ' + '31-bit integer. Instead received: %s', changedBits);
          }

          changedBits |= 0;

          if (changedBits !== 0) {
            this.emitter.set(nextProps.value, changedBits);
          }
        }
      }
    };

    Provider.prototype.render = function render() {
      return this.props.children;
    };

    return Provider;
  }(_react.Component);

  Provider.childContextTypes = (_Provider$childContex = {}, _Provider$childContex[contextProp] = _propTypes2.default.object.isRequired, _Provider$childContex);

  var Consumer = function (_Component2) {
    _inherits(Consumer, _Component2);

    function Consumer() {
      var _temp2, _this2, _ret2;

      _classCallCheck(this, Consumer);

      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      return _ret2 = (_temp2 = (_this2 = _possibleConstructorReturn(this, _Component2.call.apply(_Component2, [this].concat(args))), _this2), _this2.state = {
        value: _this2.getValue()
      }, _this2.onUpdate = function (newValue, changedBits) {
        var observedBits = _this2.observedBits | 0;
        if ((observedBits & changedBits) !== 0) {
          _this2.setState({ value: _this2.getValue() });
        }
      }, _temp2), _possibleConstructorReturn(_this2, _ret2);
    }

    Consumer.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
      var observedBits = nextProps.observedBits;

      this.observedBits = observedBits === undefined || observedBits === null ? MAX_SIGNED_31_BIT_INT // Subscribe to all changes by default
      : observedBits;
    };

    Consumer.prototype.componentDidMount = function componentDidMount() {
      if (this.context[contextProp]) {
        this.context[contextProp].on(this.onUpdate);
      }
      var observedBits = this.props.observedBits;

      this.observedBits = observedBits === undefined || observedBits === null ? MAX_SIGNED_31_BIT_INT // Subscribe to all changes by default
      : observedBits;
    };

    Consumer.prototype.componentWillUnmount = function componentWillUnmount() {
      if (this.context[contextProp]) {
        this.context[contextProp].off(this.onUpdate);
      }
    };

    Consumer.prototype.getValue = function getValue() {
      if (this.context[contextProp]) {
        return this.context[contextProp].get();
      } else {
        return defaultValue;
      }
    };

    Consumer.prototype.render = function render() {
      return onlyChild(this.props.children)(this.state.value);
    };

    return Consumer;
  }(_react.Component);

  Consumer.contextTypes = (_Consumer$contextType = {}, _Consumer$contextType[contextProp] = _propTypes2.default.object, _Consumer$contextType);


  return {
    Provider: Provider,
    Consumer: Consumer
  };
}

exports.default = createReactContext;
module.exports = exports['default'];

/***/ }),

/***/ "../../../react-bootstrap-typeahead/node_modules/create-react-context/lib/index.js":
/*!****************************************************************************************************************!*\
  !*** /Users/ericvergnaud/Development/react-bootstrap-typeahead/node_modules/create-react-context/lib/index.js ***!
  \****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _react = __webpack_require__(/*! react */ "react");

var _react2 = _interopRequireDefault(_react);

var _implementation = __webpack_require__(/*! ./implementation */ "../../../react-bootstrap-typeahead/node_modules/create-react-context/lib/implementation.js");

var _implementation2 = _interopRequireDefault(_implementation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _react2.default.createContext || _implementation2.default;
module.exports = exports['default'];

/***/ }),

/***/ "../../../react-bootstrap-typeahead/node_modules/deep-equal/index.js":
/*!**************************************************************************************************!*\
  !*** /Users/ericvergnaud/Development/react-bootstrap-typeahead/node_modules/deep-equal/index.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var objectKeys = __webpack_require__(/*! object-keys */ "../../../react-bootstrap-typeahead/node_modules/object-keys/index.js");
var isArguments = __webpack_require__(/*! is-arguments */ "../../../react-bootstrap-typeahead/node_modules/is-arguments/index.js");
var is = __webpack_require__(/*! object-is */ "../../../react-bootstrap-typeahead/node_modules/object-is/index.js");
var isRegex = __webpack_require__(/*! is-regex */ "../../../react-bootstrap-typeahead/node_modules/is-regex/index.js");
var flags = __webpack_require__(/*! regexp.prototype.flags */ "../../../react-bootstrap-typeahead/node_modules/regexp.prototype.flags/index.js");
var isDate = __webpack_require__(/*! is-date-object */ "../../../react-bootstrap-typeahead/node_modules/is-date-object/index.js");

var getTime = Date.prototype.getTime;

function deepEqual(actual, expected, options) {
  var opts = options || {};

  // 7.1. All identical values are equivalent, as determined by ===.
  if (opts.strict ? is(actual, expected) : actual === expected) {
    return true;
  }

  // 7.3. Other pairs that do not both pass typeof value == 'object', equivalence is determined by ==.
  if (!actual || !expected || (typeof actual !== 'object' && typeof expected !== 'object')) {
    return opts.strict ? is(actual, expected) : actual == expected;
  }

  /*
   * 7.4. For all other Object pairs, including Array objects, equivalence is
   * determined by having the same number of owned properties (as verified
   * with Object.prototype.hasOwnProperty.call), the same set of keys
   * (although not necessarily the same order), equivalent values for every
   * corresponding key, and an identical 'prototype' property. Note: this
   * accounts for both named and indexed properties on Arrays.
   */
  // eslint-disable-next-line no-use-before-define
  return objEquiv(actual, expected, opts);
}

function isUndefinedOrNull(value) {
  return value === null || value === undefined;
}

function isBuffer(x) {
  if (!x || typeof x !== 'object' || typeof x.length !== 'number') {
    return false;
  }
  if (typeof x.copy !== 'function' || typeof x.slice !== 'function') {
    return false;
  }
  if (x.length > 0 && typeof x[0] !== 'number') {
    return false;
  }
  return true;
}

function objEquiv(a, b, opts) {
  /* eslint max-statements: [2, 50] */
  var i, key;
  if (typeof a !== typeof b) { return false; }
  if (isUndefinedOrNull(a) || isUndefinedOrNull(b)) { return false; }

  // an identical 'prototype' property.
  if (a.prototype !== b.prototype) { return false; }

  if (isArguments(a) !== isArguments(b)) { return false; }

  var aIsRegex = isRegex(a);
  var bIsRegex = isRegex(b);
  if (aIsRegex !== bIsRegex) { return false; }
  if (aIsRegex || bIsRegex) {
    return a.source === b.source && flags(a) === flags(b);
  }

  if (isDate(a) && isDate(b)) {
    return getTime.call(a) === getTime.call(b);
  }

  var aIsBuffer = isBuffer(a);
  var bIsBuffer = isBuffer(b);
  if (aIsBuffer !== bIsBuffer) { return false; }
  if (aIsBuffer || bIsBuffer) { // && would work too, because both are true or both false here
    if (a.length !== b.length) { return false; }
    for (i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) { return false; }
    }
    return true;
  }

  if (typeof a !== typeof b) { return false; }

  try {
    var ka = objectKeys(a);
    var kb = objectKeys(b);
  } catch (e) { // happens when one is a string literal and the other isn't
    return false;
  }
  // having the same number of owned properties (keys incorporates hasOwnProperty)
  if (ka.length !== kb.length) { return false; }

  // the same set of keys (although not necessarily the same order),
  ka.sort();
  kb.sort();
  // ~~~cheap key test
  for (i = ka.length - 1; i >= 0; i--) {
    if (ka[i] != kb[i]) { return false; }
  }
  // equivalent values for every corresponding key, and ~~~possibly expensive deep test
  for (i = ka.length - 1; i >= 0; i--) {
    key = ka[i];
    if (!deepEqual(a[key], b[key], opts)) { return false; }
  }

  return true;
}

module.exports = deepEqual;


/***/ }),

/***/ "../../../react-bootstrap-typeahead/node_modules/define-properties/index.js":
/*!*********************************************************************************************************!*\
  !*** /Users/ericvergnaud/Development/react-bootstrap-typeahead/node_modules/define-properties/index.js ***!
  \*********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var keys = __webpack_require__(/*! object-keys */ "../../../react-bootstrap-typeahead/node_modules/object-keys/index.js");
var hasSymbols = typeof Symbol === 'function' && typeof Symbol('foo') === 'symbol';

var toStr = Object.prototype.toString;
var concat = Array.prototype.concat;
var origDefineProperty = Object.defineProperty;

var isFunction = function (fn) {
	return typeof fn === 'function' && toStr.call(fn) === '[object Function]';
};

var arePropertyDescriptorsSupported = function () {
	var obj = {};
	try {
		origDefineProperty(obj, 'x', { enumerable: false, value: obj });
		// eslint-disable-next-line no-unused-vars, no-restricted-syntax
		for (var _ in obj) { // jscs:ignore disallowUnusedVariables
			return false;
		}
		return obj.x === obj;
	} catch (e) { /* this is IE 8. */
		return false;
	}
};
var supportsDescriptors = origDefineProperty && arePropertyDescriptorsSupported();

var defineProperty = function (object, name, value, predicate) {
	if (name in object && (!isFunction(predicate) || !predicate())) {
		return;
	}
	if (supportsDescriptors) {
		origDefineProperty(object, name, {
			configurable: true,
			enumerable: false,
			value: value,
			writable: true
		});
	} else {
		object[name] = value;
	}
};

var defineProperties = function (object, map) {
	var predicates = arguments.length > 2 ? arguments[2] : {};
	var props = keys(map);
	if (hasSymbols) {
		props = concat.call(props, Object.getOwnPropertySymbols(map));
	}
	for (var i = 0; i < props.length; i += 1) {
		defineProperty(object, props[i], map[props[i]], predicates[props[i]]);
	}
};

defineProperties.supportsDescriptors = !!supportsDescriptors;

module.exports = defineProperties;


/***/ }),

/***/ "../../../react-bootstrap-typeahead/node_modules/dom-helpers/events/listen.js":
/*!***********************************************************************************************************!*\
  !*** /Users/ericvergnaud/Development/react-bootstrap-typeahead/node_modules/dom-helpers/events/listen.js ***!
  \***********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../../../react-bootstrap-typeahead/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

exports.__esModule = true;
exports.default = void 0;

var _inDOM = _interopRequireDefault(__webpack_require__(/*! ../util/inDOM */ "../../../react-bootstrap-typeahead/node_modules/dom-helpers/util/inDOM.js"));

var _on = _interopRequireDefault(__webpack_require__(/*! ./on */ "../../../react-bootstrap-typeahead/node_modules/dom-helpers/events/on.js"));

var _off = _interopRequireDefault(__webpack_require__(/*! ./off */ "../../../react-bootstrap-typeahead/node_modules/dom-helpers/events/off.js"));

var listen = function listen() {};

if (_inDOM.default) {
  listen = function listen(node, eventName, handler, capture) {
    (0, _on.default)(node, eventName, handler, capture);
    return function () {
      (0, _off.default)(node, eventName, handler, capture);
    };
  };
}

var _default = listen;
exports.default = _default;
module.exports = exports["default"];

/***/ }),

/***/ "../../../react-bootstrap-typeahead/node_modules/dom-helpers/events/off.js":
/*!********************************************************************************************************!*\
  !*** /Users/ericvergnaud/Development/react-bootstrap-typeahead/node_modules/dom-helpers/events/off.js ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../../../react-bootstrap-typeahead/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

exports.__esModule = true;
exports.default = void 0;

var _inDOM = _interopRequireDefault(__webpack_require__(/*! ../util/inDOM */ "../../../react-bootstrap-typeahead/node_modules/dom-helpers/util/inDOM.js"));

var off = function off() {};

if (_inDOM.default) {
  off = function () {
    if (document.addEventListener) return function (node, eventName, handler, capture) {
      return node.removeEventListener(eventName, handler, capture || false);
    };else if (document.attachEvent) return function (node, eventName, handler) {
      return node.detachEvent('on' + eventName, handler);
    };
  }();
}

var _default = off;
exports.default = _default;
module.exports = exports["default"];

/***/ }),

/***/ "../../../react-bootstrap-typeahead/node_modules/dom-helpers/events/on.js":
/*!*******************************************************************************************************!*\
  !*** /Users/ericvergnaud/Development/react-bootstrap-typeahead/node_modules/dom-helpers/events/on.js ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../../../react-bootstrap-typeahead/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

exports.__esModule = true;
exports.default = void 0;

var _inDOM = _interopRequireDefault(__webpack_require__(/*! ../util/inDOM */ "../../../react-bootstrap-typeahead/node_modules/dom-helpers/util/inDOM.js"));

var on = function on() {};

if (_inDOM.default) {
  on = function () {
    if (document.addEventListener) return function (node, eventName, handler, capture) {
      return node.addEventListener(eventName, handler, capture || false);
    };else if (document.attachEvent) return function (node, eventName, handler) {
      return node.attachEvent('on' + eventName, function (e) {
        e = e || window.event;
        e.target = e.target || e.srcElement;
        e.currentTarget = node;
        handler.call(node, e);
      });
    };
  }();
}

var _default = on;
exports.default = _default;
module.exports = exports["default"];

/***/ }),

/***/ "../../../react-bootstrap-typeahead/node_modules/dom-helpers/ownerDocument.js":
/*!***********************************************************************************************************!*\
  !*** /Users/ericvergnaud/Development/react-bootstrap-typeahead/node_modules/dom-helpers/ownerDocument.js ***!
  \***********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = ownerDocument;

function ownerDocument(node) {
  return node && node.ownerDocument || document;
}

module.exports = exports["default"];

/***/ }),

/***/ "../../../react-bootstrap-typeahead/node_modules/dom-helpers/query/contains.js":
/*!************************************************************************************************************!*\
  !*** /Users/ericvergnaud/Development/react-bootstrap-typeahead/node_modules/dom-helpers/query/contains.js ***!
  \************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../../../react-bootstrap-typeahead/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

exports.__esModule = true;
exports.default = void 0;

var _inDOM = _interopRequireDefault(__webpack_require__(/*! ../util/inDOM */ "../../../react-bootstrap-typeahead/node_modules/dom-helpers/util/inDOM.js"));

var _default = function () {
  // HTML DOM and SVG DOM may have different support levels,
  // so we need to check on context instead of a document root element.
  return _inDOM.default ? function (context, node) {
    if (context.contains) {
      return context.contains(node);
    } else if (context.compareDocumentPosition) {
      return context === node || !!(context.compareDocumentPosition(node) & 16);
    } else {
      return fallback(context, node);
    }
  } : fallback;
}();

exports.default = _default;

function fallback(context, node) {
  if (node) do {
    if (node === context) return true;
  } while (node = node.parentNode);
  return false;
}

module.exports = exports["default"];

/***/ }),

/***/ "../../../react-bootstrap-typeahead/node_modules/dom-helpers/util/inDOM.js":
/*!********************************************************************************************************!*\
  !*** /Users/ericvergnaud/Development/react-bootstrap-typeahead/node_modules/dom-helpers/util/inDOM.js ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _default = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

exports.default = _default;
module.exports = exports["default"];

/***/ }),

/***/ "../../../react-bootstrap-typeahead/node_modules/es-abstract/GetIntrinsic.js":
/*!**********************************************************************************************************!*\
  !*** /Users/ericvergnaud/Development/react-bootstrap-typeahead/node_modules/es-abstract/GetIntrinsic.js ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* globals
	Atomics,
	SharedArrayBuffer,
*/

var undefined;

var $TypeError = TypeError;

var $gOPD = Object.getOwnPropertyDescriptor;
if ($gOPD) {
	try {
		$gOPD({}, '');
	} catch (e) {
		$gOPD = null; // this is IE 8, which has a broken gOPD
	}
}

var throwTypeError = function () { throw new $TypeError(); };
var ThrowTypeError = $gOPD
	? (function () {
		try {
			// eslint-disable-next-line no-unused-expressions, no-caller, no-restricted-properties
			arguments.callee; // IE 8 does not throw here
			return throwTypeError;
		} catch (calleeThrows) {
			try {
				// IE 8 throws on Object.getOwnPropertyDescriptor(arguments, '')
				return $gOPD(arguments, 'callee').get;
			} catch (gOPDthrows) {
				return throwTypeError;
			}
		}
	}())
	: throwTypeError;

var hasSymbols = __webpack_require__(/*! has-symbols */ "../../../react-bootstrap-typeahead/node_modules/has-symbols/index.js")();

var getProto = Object.getPrototypeOf || function (x) { return x.__proto__; }; // eslint-disable-line no-proto

var generator; // = function * () {};
var generatorFunction = generator ? getProto(generator) : undefined;
var asyncFn; // async function() {};
var asyncFunction = asyncFn ? asyncFn.constructor : undefined;
var asyncGen; // async function * () {};
var asyncGenFunction = asyncGen ? getProto(asyncGen) : undefined;
var asyncGenIterator = asyncGen ? asyncGen() : undefined;

var TypedArray = typeof Uint8Array === 'undefined' ? undefined : getProto(Uint8Array);

var INTRINSICS = {
	'%Array%': Array,
	'%ArrayBuffer%': typeof ArrayBuffer === 'undefined' ? undefined : ArrayBuffer,
	'%ArrayBufferPrototype%': typeof ArrayBuffer === 'undefined' ? undefined : ArrayBuffer.prototype,
	'%ArrayIteratorPrototype%': hasSymbols ? getProto([][Symbol.iterator]()) : undefined,
	'%ArrayPrototype%': Array.prototype,
	'%ArrayProto_entries%': Array.prototype.entries,
	'%ArrayProto_forEach%': Array.prototype.forEach,
	'%ArrayProto_keys%': Array.prototype.keys,
	'%ArrayProto_values%': Array.prototype.values,
	'%AsyncFromSyncIteratorPrototype%': undefined,
	'%AsyncFunction%': asyncFunction,
	'%AsyncFunctionPrototype%': asyncFunction ? asyncFunction.prototype : undefined,
	'%AsyncGenerator%': asyncGen ? getProto(asyncGenIterator) : undefined,
	'%AsyncGeneratorFunction%': asyncGenFunction,
	'%AsyncGeneratorPrototype%': asyncGenFunction ? asyncGenFunction.prototype : undefined,
	'%AsyncIteratorPrototype%': asyncGenIterator && hasSymbols && Symbol.asyncIterator ? asyncGenIterator[Symbol.asyncIterator]() : undefined,
	'%Atomics%': typeof Atomics === 'undefined' ? undefined : Atomics,
	'%Boolean%': Boolean,
	'%BooleanPrototype%': Boolean.prototype,
	'%DataView%': typeof DataView === 'undefined' ? undefined : DataView,
	'%DataViewPrototype%': typeof DataView === 'undefined' ? undefined : DataView.prototype,
	'%Date%': Date,
	'%DatePrototype%': Date.prototype,
	'%decodeURI%': decodeURI,
	'%decodeURIComponent%': decodeURIComponent,
	'%encodeURI%': encodeURI,
	'%encodeURIComponent%': encodeURIComponent,
	'%Error%': Error,
	'%ErrorPrototype%': Error.prototype,
	'%eval%': eval, // eslint-disable-line no-eval
	'%EvalError%': EvalError,
	'%EvalErrorPrototype%': EvalError.prototype,
	'%Float32Array%': typeof Float32Array === 'undefined' ? undefined : Float32Array,
	'%Float32ArrayPrototype%': typeof Float32Array === 'undefined' ? undefined : Float32Array.prototype,
	'%Float64Array%': typeof Float64Array === 'undefined' ? undefined : Float64Array,
	'%Float64ArrayPrototype%': typeof Float64Array === 'undefined' ? undefined : Float64Array.prototype,
	'%Function%': Function,
	'%FunctionPrototype%': Function.prototype,
	'%Generator%': generator ? getProto(generator()) : undefined,
	'%GeneratorFunction%': generatorFunction,
	'%GeneratorPrototype%': generatorFunction ? generatorFunction.prototype : undefined,
	'%Int8Array%': typeof Int8Array === 'undefined' ? undefined : Int8Array,
	'%Int8ArrayPrototype%': typeof Int8Array === 'undefined' ? undefined : Int8Array.prototype,
	'%Int16Array%': typeof Int16Array === 'undefined' ? undefined : Int16Array,
	'%Int16ArrayPrototype%': typeof Int16Array === 'undefined' ? undefined : Int8Array.prototype,
	'%Int32Array%': typeof Int32Array === 'undefined' ? undefined : Int32Array,
	'%Int32ArrayPrototype%': typeof Int32Array === 'undefined' ? undefined : Int32Array.prototype,
	'%isFinite%': isFinite,
	'%isNaN%': isNaN,
	'%IteratorPrototype%': hasSymbols ? getProto(getProto([][Symbol.iterator]())) : undefined,
	'%JSON%': typeof JSON === 'object' ? JSON : undefined,
	'%JSONParse%': typeof JSON === 'object' ? JSON.parse : undefined,
	'%Map%': typeof Map === 'undefined' ? undefined : Map,
	'%MapIteratorPrototype%': typeof Map === 'undefined' || !hasSymbols ? undefined : getProto(new Map()[Symbol.iterator]()),
	'%MapPrototype%': typeof Map === 'undefined' ? undefined : Map.prototype,
	'%Math%': Math,
	'%Number%': Number,
	'%NumberPrototype%': Number.prototype,
	'%Object%': Object,
	'%ObjectPrototype%': Object.prototype,
	'%ObjProto_toString%': Object.prototype.toString,
	'%ObjProto_valueOf%': Object.prototype.valueOf,
	'%parseFloat%': parseFloat,
	'%parseInt%': parseInt,
	'%Promise%': typeof Promise === 'undefined' ? undefined : Promise,
	'%PromisePrototype%': typeof Promise === 'undefined' ? undefined : Promise.prototype,
	'%PromiseProto_then%': typeof Promise === 'undefined' ? undefined : Promise.prototype.then,
	'%Promise_all%': typeof Promise === 'undefined' ? undefined : Promise.all,
	'%Promise_reject%': typeof Promise === 'undefined' ? undefined : Promise.reject,
	'%Promise_resolve%': typeof Promise === 'undefined' ? undefined : Promise.resolve,
	'%Proxy%': typeof Proxy === 'undefined' ? undefined : Proxy,
	'%RangeError%': RangeError,
	'%RangeErrorPrototype%': RangeError.prototype,
	'%ReferenceError%': ReferenceError,
	'%ReferenceErrorPrototype%': ReferenceError.prototype,
	'%Reflect%': typeof Reflect === 'undefined' ? undefined : Reflect,
	'%RegExp%': RegExp,
	'%RegExpPrototype%': RegExp.prototype,
	'%Set%': typeof Set === 'undefined' ? undefined : Set,
	'%SetIteratorPrototype%': typeof Set === 'undefined' || !hasSymbols ? undefined : getProto(new Set()[Symbol.iterator]()),
	'%SetPrototype%': typeof Set === 'undefined' ? undefined : Set.prototype,
	'%SharedArrayBuffer%': typeof SharedArrayBuffer === 'undefined' ? undefined : SharedArrayBuffer,
	'%SharedArrayBufferPrototype%': typeof SharedArrayBuffer === 'undefined' ? undefined : SharedArrayBuffer.prototype,
	'%String%': String,
	'%StringIteratorPrototype%': hasSymbols ? getProto(''[Symbol.iterator]()) : undefined,
	'%StringPrototype%': String.prototype,
	'%Symbol%': hasSymbols ? Symbol : undefined,
	'%SymbolPrototype%': hasSymbols ? Symbol.prototype : undefined,
	'%SyntaxError%': SyntaxError,
	'%SyntaxErrorPrototype%': SyntaxError.prototype,
	'%ThrowTypeError%': ThrowTypeError,
	'%TypedArray%': TypedArray,
	'%TypedArrayPrototype%': TypedArray ? TypedArray.prototype : undefined,
	'%TypeError%': $TypeError,
	'%TypeErrorPrototype%': $TypeError.prototype,
	'%Uint8Array%': typeof Uint8Array === 'undefined' ? undefined : Uint8Array,
	'%Uint8ArrayPrototype%': typeof Uint8Array === 'undefined' ? undefined : Uint8Array.prototype,
	'%Uint8ClampedArray%': typeof Uint8ClampedArray === 'undefined' ? undefined : Uint8ClampedArray,
	'%Uint8ClampedArrayPrototype%': typeof Uint8ClampedArray === 'undefined' ? undefined : Uint8ClampedArray.prototype,
	'%Uint16Array%': typeof Uint16Array === 'undefined' ? undefined : Uint16Array,
	'%Uint16ArrayPrototype%': typeof Uint16Array === 'undefined' ? undefined : Uint16Array.prototype,
	'%Uint32Array%': typeof Uint32Array === 'undefined' ? undefined : Uint32Array,
	'%Uint32ArrayPrototype%': typeof Uint32Array === 'undefined' ? undefined : Uint32Array.prototype,
	'%URIError%': URIError,
	'%URIErrorPrototype%': URIError.prototype,
	'%WeakMap%': typeof WeakMap === 'undefined' ? undefined : WeakMap,
	'%WeakMapPrototype%': typeof WeakMap === 'undefined' ? undefined : WeakMap.prototype,
	'%WeakSet%': typeof WeakSet === 'undefined' ? undefined : WeakSet,
	'%WeakSetPrototype%': typeof WeakSet === 'undefined' ? undefined : WeakSet.prototype
};

var bind = __webpack_require__(/*! function-bind */ "../../../react-bootstrap-typeahead/node_modules/function-bind/index.js");
var $replace = bind.call(Function.call, String.prototype.replace);

/* adapted from https://github.com/lodash/lodash/blob/4.17.15/dist/lodash.js#L6735-L6744 */
var rePropName = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g;
var reEscapeChar = /\\(\\)?/g; /** Used to match backslashes in property paths. */
var stringToPath = function stringToPath(string) {
	var result = [];
	$replace(string, rePropName, function (match, number, quote, subString) {
		result[result.length] = quote ? $replace(subString, reEscapeChar, '$1') : (number || match);
	});
	return result;
};
/* end adaptation */

var getBaseIntrinsic = function getBaseIntrinsic(name, allowMissing) {
	if (!(name in INTRINSICS)) {
		throw new SyntaxError('intrinsic ' + name + ' does not exist!');
	}

	// istanbul ignore if // hopefully this is impossible to test :-)
	if (typeof INTRINSICS[name] === 'undefined' && !allowMissing) {
		throw new $TypeError('intrinsic ' + name + ' exists, but is not available. Please file an issue!');
	}

	return INTRINSICS[name];
};

module.exports = function GetIntrinsic(name, allowMissing) {
	if (typeof name !== 'string' || name.length === 0) {
		throw new TypeError('intrinsic name must be a non-empty string');
	}
	if (arguments.length > 1 && typeof allowMissing !== 'boolean') {
		throw new TypeError('"allowMissing" argument must be a boolean');
	}

	var parts = stringToPath(name);

	var value = getBaseIntrinsic('%' + (parts.length > 0 ? parts[0] : '') + '%', allowMissing);
	for (var i = 1; i < parts.length; i += 1) {
		if (value != null) {
			if ($gOPD && (i + 1) >= parts.length) {
				var desc = $gOPD(value, parts[i]);
				if (!allowMissing && !(parts[i] in value)) {
					throw new $TypeError('base intrinsic for ' + name + ' exists, but the property is not available.');
				}
				value = desc ? (desc.get || desc.value) : value[parts[i]];
			} else {
				value = value[parts[i]];
			}
		}
	}
	return value;
};


/***/ }),

/***/ "../../../react-bootstrap-typeahead/node_modules/es-abstract/helpers/callBind.js":
/*!**************************************************************************************************************!*\
  !*** /Users/ericvergnaud/Development/react-bootstrap-typeahead/node_modules/es-abstract/helpers/callBind.js ***!
  \**************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bind = __webpack_require__(/*! function-bind */ "../../../react-bootstrap-typeahead/node_modules/function-bind/index.js");

var GetIntrinsic = __webpack_require__(/*! ../GetIntrinsic */ "../../../react-bootstrap-typeahead/node_modules/es-abstract/GetIntrinsic.js");

var $Function = GetIntrinsic('%Function%');
var $apply = $Function.apply;
var $call = $Function.call;

module.exports = function callBind() {
	return bind.apply($call, arguments);
};

module.exports.apply = function applyBind() {
	return bind.apply($apply, arguments);
};


/***/ }),

/***/ "../../../react-bootstrap-typeahead/node_modules/fast-deep-equal/index.js":
/*!*******************************************************************************************************!*\
  !*** /Users/ericvergnaud/Development/react-bootstrap-typeahead/node_modules/fast-deep-equal/index.js ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// do not edit .js files directly - edit src/index.jst



module.exports = function equal(a, b) {
  if (a === b) return true;

  if (a && b && typeof a == 'object' && typeof b == 'object') {
    if (a.constructor !== b.constructor) return false;

    var length, i, keys;
    if (Array.isArray(a)) {
      length = a.length;
      if (length != b.length) return false;
      for (i = length; i-- !== 0;)
        if (!equal(a[i], b[i])) return false;
      return true;
    }



    if (a.constructor === RegExp) return a.source === b.source && a.flags === b.flags;
    if (a.valueOf !== Object.prototype.valueOf) return a.valueOf() === b.valueOf();
    if (a.toString !== Object.prototype.toString) return a.toString() === b.toString();

    keys = Object.keys(a);
    length = keys.length;
    if (length !== Object.keys(b).length) return false;

    for (i = length; i-- !== 0;)
      if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;

    for (i = length; i-- !== 0;) {
      var key = keys[i];

      if (!equal(a[key], b[key])) return false;
    }

    return true;
  }

  // true if both NaN, false otherwise
  return a!==a && b!==b;
};


/***/ }),

/***/ "../../../react-bootstrap-typeahead/node_modules/function-bind/implementation.js":
/*!**************************************************************************************************************!*\
  !*** /Users/ericvergnaud/Development/react-bootstrap-typeahead/node_modules/function-bind/implementation.js ***!
  \**************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* eslint no-invalid-this: 1 */

var ERROR_MESSAGE = 'Function.prototype.bind called on incompatible ';
var slice = Array.prototype.slice;
var toStr = Object.prototype.toString;
var funcType = '[object Function]';

module.exports = function bind(that) {
    var target = this;
    if (typeof target !== 'function' || toStr.call(target) !== funcType) {
        throw new TypeError(ERROR_MESSAGE + target);
    }
    var args = slice.call(arguments, 1);

    var bound;
    var binder = function () {
        if (this instanceof bound) {
            var result = target.apply(
                this,
                args.concat(slice.call(arguments))
            );
            if (Object(result) === result) {
                return result;
            }
            return this;
        } else {
            return target.apply(
                that,
                args.concat(slice.call(arguments))
            );
        }
    };

    var boundLength = Math.max(0, target.length - args.length);
    var boundArgs = [];
    for (var i = 0; i < boundLength; i++) {
        boundArgs.push('$' + i);
    }

    bound = Function('binder', 'return function (' + boundArgs.join(',') + '){ return binder.apply(this,arguments); }')(binder);

    if (target.prototype) {
        var Empty = function Empty() {};
        Empty.prototype = target.prototype;
        bound.prototype = new Empty();
        Empty.prototype = null;
    }

    return bound;
};


/***/ }),

/***/ "../../../react-bootstrap-typeahead/node_modules/function-bind/index.js":
/*!*****************************************************************************************************!*\
  !*** /Users/ericvergnaud/Development/react-bootstrap-typeahead/node_modules/function-bind/index.js ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var implementation = __webpack_require__(/*! ./implementation */ "../../../react-bootstrap-typeahead/node_modules/function-bind/implementation.js");

module.exports = Function.prototype.bind || implementation;


/***/ }),

/***/ "../../../react-bootstrap-typeahead/node_modules/gud/index.js":
/*!*******************************************************************************************!*\
  !*** /Users/ericvergnaud/Development/react-bootstrap-typeahead/node_modules/gud/index.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {// @flow


var key = '__global_unique_id__';

module.exports = function() {
  return global[key] = (global[key] || 0) + 1;
};

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../prompto/prompto-widgets/react-bootstrap-3/node_modules/webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "../../../react-bootstrap-typeahead/node_modules/has-symbols/index.js":
/*!***************************************************************************************************!*\
  !*** /Users/ericvergnaud/Development/react-bootstrap-typeahead/node_modules/has-symbols/index.js ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var origSymbol = global.Symbol;
var hasSymbolSham = __webpack_require__(/*! ./shams */ "../../../react-bootstrap-typeahead/node_modules/has-symbols/shams.js");

module.exports = function hasNativeSymbols() {
	if (typeof origSymbol !== 'function') { return false; }
	if (typeof Symbol !== 'function') { return false; }
	if (typeof origSymbol('foo') !== 'symbol') { return false; }
	if (typeof Symbol('bar') !== 'symbol') { return false; }

	return hasSymbolSham();
};

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../prompto/prompto-widgets/react-bootstrap-3/node_modules/webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "../../../react-bootstrap-typeahead/node_modules/has-symbols/shams.js":
/*!***************************************************************************************************!*\
  !*** /Users/ericvergnaud/Development/react-bootstrap-typeahead/node_modules/has-symbols/shams.js ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* eslint complexity: [2, 18], max-statements: [2, 33] */
module.exports = function hasSymbols() {
	if (typeof Symbol !== 'function' || typeof Object.getOwnPropertySymbols !== 'function') { return false; }
	if (typeof Symbol.iterator === 'symbol') { return true; }

	var obj = {};
	var sym = Symbol('test');
	var symObj = Object(sym);
	if (typeof sym === 'string') { return false; }

	if (Object.prototype.toString.call(sym) !== '[object Symbol]') { return false; }
	if (Object.prototype.toString.call(symObj) !== '[object Symbol]') { return false; }

	// temp disabled per https://github.com/ljharb/object.assign/issues/17
	// if (sym instanceof Symbol) { return false; }
	// temp disabled per https://github.com/WebReflection/get-own-property-symbols/issues/4
	// if (!(symObj instanceof Symbol)) { return false; }

	// if (typeof Symbol.prototype.toString !== 'function') { return false; }
	// if (String(sym) !== Symbol.prototype.toString.call(sym)) { return false; }

	var symVal = 42;
	obj[sym] = symVal;
	for (sym in obj) { return false; } // eslint-disable-line no-restricted-syntax
	if (typeof Object.keys === 'function' && Object.keys(obj).length !== 0) { return false; }

	if (typeof Object.getOwnPropertyNames === 'function' && Object.getOwnPropertyNames(obj).length !== 0) { return false; }

	var syms = Object.getOwnPropertySymbols(obj);
	if (syms.length !== 1 || syms[0] !== sym) { return false; }

	if (!Object.prototype.propertyIsEnumerable.call(obj, sym)) { return false; }

	if (typeof Object.getOwnPropertyDescriptor === 'function') {
		var descriptor = Object.getOwnPropertyDescriptor(obj, sym);
		if (descriptor.value !== symVal || descriptor.enumerable !== true) { return false; }
	}

	return true;
};


/***/ }),

/***/ "../../../react-bootstrap-typeahead/node_modules/has/src/index.js":
/*!***********************************************************************************************!*\
  !*** /Users/ericvergnaud/Development/react-bootstrap-typeahead/node_modules/has/src/index.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bind = __webpack_require__(/*! function-bind */ "../../../react-bootstrap-typeahead/node_modules/function-bind/index.js");

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);


/***/ }),

/***/ "../../../react-bootstrap-typeahead/node_modules/invariant/browser.js":
/*!***************************************************************************************************!*\
  !*** /Users/ericvergnaud/Development/react-bootstrap-typeahead/node_modules/invariant/browser.js ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var invariant = function(condition, format, a, b, c, d, e, f) {
  if (true) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  }

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error(
        'Minified exception occurred; use the non-minified dev environment ' +
        'for the full error message and additional helpful warnings.'
      );
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(
        format.replace(/%s/g, function() { return args[argIndex++]; })
      );
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
};

module.exports = invariant;


/***/ }),

/***/ "../../../react-bootstrap-typeahead/node_modules/is-arguments/index.js":
/*!****************************************************************************************************!*\
  !*** /Users/ericvergnaud/Development/react-bootstrap-typeahead/node_modules/is-arguments/index.js ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var hasToStringTag = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';
var toStr = Object.prototype.toString;

var isStandardArguments = function isArguments(value) {
	if (hasToStringTag && value && typeof value === 'object' && Symbol.toStringTag in value) {
		return false;
	}
	return toStr.call(value) === '[object Arguments]';
};

var isLegacyArguments = function isArguments(value) {
	if (isStandardArguments(value)) {
		return true;
	}
	return value !== null &&
		typeof value === 'object' &&
		typeof value.length === 'number' &&
		value.length >= 0 &&
		toStr.call(value) !== '[object Array]' &&
		toStr.call(value.callee) === '[object Function]';
};

var supportsStandardArguments = (function () {
	return isStandardArguments(arguments);
}());

isStandardArguments.isLegacyArguments = isLegacyArguments; // for tests

module.exports = supportsStandardArguments ? isStandardArguments : isLegacyArguments;


/***/ }),

/***/ "../../../react-bootstrap-typeahead/node_modules/is-date-object/index.js":
/*!******************************************************************************************************!*\
  !*** /Users/ericvergnaud/Development/react-bootstrap-typeahead/node_modules/is-date-object/index.js ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var getDay = Date.prototype.getDay;
var tryDateObject = function tryDateGetDayCall(value) {
	try {
		getDay.call(value);
		return true;
	} catch (e) {
		return false;
	}
};

var toStr = Object.prototype.toString;
var dateClass = '[object Date]';
var hasToStringTag = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';

module.exports = function isDateObject(value) {
	if (typeof value !== 'object' || value === null) {
		return false;
	}
	return hasToStringTag ? tryDateObject(value) : toStr.call(value) === dateClass;
};


/***/ }),

/***/ "../../../react-bootstrap-typeahead/node_modules/is-regex/index.js":
/*!************************************************************************************************!*\
  !*** /Users/ericvergnaud/Development/react-bootstrap-typeahead/node_modules/is-regex/index.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var has = __webpack_require__(/*! has */ "../../../react-bootstrap-typeahead/node_modules/has/src/index.js");
var regexExec = RegExp.prototype.exec;
var gOPD = Object.getOwnPropertyDescriptor;

var tryRegexExecCall = function tryRegexExec(value) {
	try {
		var lastIndex = value.lastIndex;
		value.lastIndex = 0; // eslint-disable-line no-param-reassign

		regexExec.call(value);
		return true;
	} catch (e) {
		return false;
	} finally {
		value.lastIndex = lastIndex; // eslint-disable-line no-param-reassign
	}
};
var toStr = Object.prototype.toString;
var regexClass = '[object RegExp]';
var hasToStringTag = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';

module.exports = function isRegex(value) {
	if (!value || typeof value !== 'object') {
		return false;
	}
	if (!hasToStringTag) {
		return toStr.call(value) === regexClass;
	}

	var descriptor = gOPD(value, 'lastIndex');
	var hasLastIndexDataProperty = descriptor && has(descriptor, 'value');
	if (!hasLastIndexDataProperty) {
		return false;
	}

	return tryRegexExecCall(value);
};


/***/ }),

/***/ "../../../react-bootstrap-typeahead/node_modules/lodash.debounce/index.js":
/*!*******************************************************************************************************!*\
  !*** /Users/ericvergnaud/Development/react-bootstrap-typeahead/node_modules/lodash.debounce/index.js ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/** Used to match leading and trailing whitespace. */
var reTrim = /^\s+|\s+$/g;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max,
    nativeMin = Math.min;

/**
 * Gets the timestamp of the number of milliseconds that have elapsed since
 * the Unix epoch (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Date
 * @returns {number} Returns the timestamp.
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => Logs the number of milliseconds it took for the deferred invocation.
 */
var now = function() {
  return root.Date.now();
};

/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to immediately invoke them.
 * Provide `options` to indicate whether `func` should be invoked on the
 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
 * with the last arguments provided to the debounced function. Subsequent
 * calls to the debounced function return the result of the last `func`
 * invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', debounced);
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel);
 */
function debounce(func, wait, options) {
  var lastArgs,
      lastThis,
      maxWait,
      result,
      timerId,
      lastCallTime,
      lastInvokeTime = 0,
      leading = false,
      maxing = false,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  wait = toNumber(wait) || 0;
  if (isObject(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time) {
    var args = lastArgs,
        thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime,
        result = wait - timeSinceLastCall;

    return maxing ? nativeMin(result, maxWait - timeSinceLastInvoke) : result;
  }

  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
  }

  function timerExpired() {
    var time = now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(now());
  }

  function debounced() {
    var time = now(),
        isInvoking = shouldInvoke(time);

    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && objectToString.call(value) == symbolTag);
}

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

module.exports = debounce;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../prompto/prompto-widgets/react-bootstrap-3/node_modules/webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "../../../react-bootstrap-typeahead/node_modules/object-is/implementation.js":
/*!**********************************************************************************************************!*\
  !*** /Users/ericvergnaud/Development/react-bootstrap-typeahead/node_modules/object-is/implementation.js ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var numberIsNaN = function (value) {
	return value !== value;
};

module.exports = function is(a, b) {
	if (a === 0 && b === 0) {
		return 1 / a === 1 / b;
	}
	if (a === b) {
		return true;
	}
	if (numberIsNaN(a) && numberIsNaN(b)) {
		return true;
	}
	return false;
};



/***/ }),

/***/ "../../../react-bootstrap-typeahead/node_modules/object-is/index.js":
/*!*************************************************************************************************!*\
  !*** /Users/ericvergnaud/Development/react-bootstrap-typeahead/node_modules/object-is/index.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var define = __webpack_require__(/*! define-properties */ "../../../react-bootstrap-typeahead/node_modules/define-properties/index.js");
var callBind = __webpack_require__(/*! es-abstract/helpers/callBind */ "../../../react-bootstrap-typeahead/node_modules/es-abstract/helpers/callBind.js");

var implementation = __webpack_require__(/*! ./implementation */ "../../../react-bootstrap-typeahead/node_modules/object-is/implementation.js");
var getPolyfill = __webpack_require__(/*! ./polyfill */ "../../../react-bootstrap-typeahead/node_modules/object-is/polyfill.js");
var shim = __webpack_require__(/*! ./shim */ "../../../react-bootstrap-typeahead/node_modules/object-is/shim.js");

var polyfill = callBind(getPolyfill(), Object);

define(polyfill, {
	getPolyfill: getPolyfill,
	implementation: implementation,
	shim: shim
});

module.exports = polyfill;


/***/ }),

/***/ "../../../react-bootstrap-typeahead/node_modules/object-is/polyfill.js":
/*!****************************************************************************************************!*\
  !*** /Users/ericvergnaud/Development/react-bootstrap-typeahead/node_modules/object-is/polyfill.js ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var implementation = __webpack_require__(/*! ./implementation */ "../../../react-bootstrap-typeahead/node_modules/object-is/implementation.js");

module.exports = function getPolyfill() {
	return typeof Object.is === 'function' ? Object.is : implementation;
};


/***/ }),

/***/ "../../../react-bootstrap-typeahead/node_modules/object-is/shim.js":
/*!************************************************************************************************!*\
  !*** /Users/ericvergnaud/Development/react-bootstrap-typeahead/node_modules/object-is/shim.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var getPolyfill = __webpack_require__(/*! ./polyfill */ "../../../react-bootstrap-typeahead/node_modules/object-is/polyfill.js");
var define = __webpack_require__(/*! define-properties */ "../../../react-bootstrap-typeahead/node_modules/define-properties/index.js");

module.exports = function shimObjectIs() {
	var polyfill = getPolyfill();
	define(Object, { is: polyfill }, {
		is: function testObjectIs() {
			return Object.is !== polyfill;
		}
	});
	return polyfill;
};


/***/ }),

/***/ "../../../react-bootstrap-typeahead/node_modules/object-keys/implementation.js":
/*!************************************************************************************************************!*\
  !*** /Users/ericvergnaud/Development/react-bootstrap-typeahead/node_modules/object-keys/implementation.js ***!
  \************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var keysShim;
if (!Object.keys) {
	// modified from https://github.com/es-shims/es5-shim
	var has = Object.prototype.hasOwnProperty;
	var toStr = Object.prototype.toString;
	var isArgs = __webpack_require__(/*! ./isArguments */ "../../../react-bootstrap-typeahead/node_modules/object-keys/isArguments.js"); // eslint-disable-line global-require
	var isEnumerable = Object.prototype.propertyIsEnumerable;
	var hasDontEnumBug = !isEnumerable.call({ toString: null }, 'toString');
	var hasProtoEnumBug = isEnumerable.call(function () {}, 'prototype');
	var dontEnums = [
		'toString',
		'toLocaleString',
		'valueOf',
		'hasOwnProperty',
		'isPrototypeOf',
		'propertyIsEnumerable',
		'constructor'
	];
	var equalsConstructorPrototype = function (o) {
		var ctor = o.constructor;
		return ctor && ctor.prototype === o;
	};
	var excludedKeys = {
		$applicationCache: true,
		$console: true,
		$external: true,
		$frame: true,
		$frameElement: true,
		$frames: true,
		$innerHeight: true,
		$innerWidth: true,
		$onmozfullscreenchange: true,
		$onmozfullscreenerror: true,
		$outerHeight: true,
		$outerWidth: true,
		$pageXOffset: true,
		$pageYOffset: true,
		$parent: true,
		$scrollLeft: true,
		$scrollTop: true,
		$scrollX: true,
		$scrollY: true,
		$self: true,
		$webkitIndexedDB: true,
		$webkitStorageInfo: true,
		$window: true
	};
	var hasAutomationEqualityBug = (function () {
		/* global window */
		if (typeof window === 'undefined') { return false; }
		for (var k in window) {
			try {
				if (!excludedKeys['$' + k] && has.call(window, k) && window[k] !== null && typeof window[k] === 'object') {
					try {
						equalsConstructorPrototype(window[k]);
					} catch (e) {
						return true;
					}
				}
			} catch (e) {
				return true;
			}
		}
		return false;
	}());
	var equalsConstructorPrototypeIfNotBuggy = function (o) {
		/* global window */
		if (typeof window === 'undefined' || !hasAutomationEqualityBug) {
			return equalsConstructorPrototype(o);
		}
		try {
			return equalsConstructorPrototype(o);
		} catch (e) {
			return false;
		}
	};

	keysShim = function keys(object) {
		var isObject = object !== null && typeof object === 'object';
		var isFunction = toStr.call(object) === '[object Function]';
		var isArguments = isArgs(object);
		var isString = isObject && toStr.call(object) === '[object String]';
		var theKeys = [];

		if (!isObject && !isFunction && !isArguments) {
			throw new TypeError('Object.keys called on a non-object');
		}

		var skipProto = hasProtoEnumBug && isFunction;
		if (isString && object.length > 0 && !has.call(object, 0)) {
			for (var i = 0; i < object.length; ++i) {
				theKeys.push(String(i));
			}
		}

		if (isArguments && object.length > 0) {
			for (var j = 0; j < object.length; ++j) {
				theKeys.push(String(j));
			}
		} else {
			for (var name in object) {
				if (!(skipProto && name === 'prototype') && has.call(object, name)) {
					theKeys.push(String(name));
				}
			}
		}

		if (hasDontEnumBug) {
			var skipConstructor = equalsConstructorPrototypeIfNotBuggy(object);

			for (var k = 0; k < dontEnums.length; ++k) {
				if (!(skipConstructor && dontEnums[k] === 'constructor') && has.call(object, dontEnums[k])) {
					theKeys.push(dontEnums[k]);
				}
			}
		}
		return theKeys;
	};
}
module.exports = keysShim;


/***/ }),

/***/ "../../../react-bootstrap-typeahead/node_modules/object-keys/index.js":
/*!***************************************************************************************************!*\
  !*** /Users/ericvergnaud/Development/react-bootstrap-typeahead/node_modules/object-keys/index.js ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var slice = Array.prototype.slice;
var isArgs = __webpack_require__(/*! ./isArguments */ "../../../react-bootstrap-typeahead/node_modules/object-keys/isArguments.js");

var origKeys = Object.keys;
var keysShim = origKeys ? function keys(o) { return origKeys(o); } : __webpack_require__(/*! ./implementation */ "../../../react-bootstrap-typeahead/node_modules/object-keys/implementation.js");

var originalKeys = Object.keys;

keysShim.shim = function shimObjectKeys() {
	if (Object.keys) {
		var keysWorksWithArguments = (function () {
			// Safari 5.0 bug
			var args = Object.keys(arguments);
			return args && args.length === arguments.length;
		}(1, 2));
		if (!keysWorksWithArguments) {
			Object.keys = function keys(object) { // eslint-disable-line func-name-matching
				if (isArgs(object)) {
					return originalKeys(slice.call(object));
				}
				return originalKeys(object);
			};
		}
	} else {
		Object.keys = keysShim;
	}
	return Object.keys || keysShim;
};

module.exports = keysShim;


/***/ }),

/***/ "../../../react-bootstrap-typeahead/node_modules/object-keys/isArguments.js":
/*!*********************************************************************************************************!*\
  !*** /Users/ericvergnaud/Development/react-bootstrap-typeahead/node_modules/object-keys/isArguments.js ***!
  \*********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var toStr = Object.prototype.toString;

module.exports = function isArguments(value) {
	var str = toStr.call(value);
	var isArgs = str === '[object Arguments]';
	if (!isArgs) {
		isArgs = str !== '[object Array]' &&
			value !== null &&
			typeof value === 'object' &&
			typeof value.length === 'number' &&
			value.length >= 0 &&
			toStr.call(value.callee) === '[object Function]';
	}
	return isArgs;
};


/***/ }),

/***/ "../../../react-bootstrap-typeahead/node_modules/popper.js/dist/esm/popper.js":
/*!***********************************************************************************************************!*\
  !*** /Users/ericvergnaud/Development/react-bootstrap-typeahead/node_modules/popper.js/dist/esm/popper.js ***!
  \***********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/**!
 * @fileOverview Kickass library to create and place poppers near their reference elements.
 * @version 1.16.1
 * @license
 * Copyright (c) 2016 Federico Zivolo and contributors
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
var isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined' && typeof navigator !== 'undefined';

var timeoutDuration = function () {
  var longerTimeoutBrowsers = ['Edge', 'Trident', 'Firefox'];
  for (var i = 0; i < longerTimeoutBrowsers.length; i += 1) {
    if (isBrowser && navigator.userAgent.indexOf(longerTimeoutBrowsers[i]) >= 0) {
      return 1;
    }
  }
  return 0;
}();

function microtaskDebounce(fn) {
  var called = false;
  return function () {
    if (called) {
      return;
    }
    called = true;
    window.Promise.resolve().then(function () {
      called = false;
      fn();
    });
  };
}

function taskDebounce(fn) {
  var scheduled = false;
  return function () {
    if (!scheduled) {
      scheduled = true;
      setTimeout(function () {
        scheduled = false;
        fn();
      }, timeoutDuration);
    }
  };
}

var supportsMicroTasks = isBrowser && window.Promise;

/**
* Create a debounced version of a method, that's asynchronously deferred
* but called in the minimum time possible.
*
* @method
* @memberof Popper.Utils
* @argument {Function} fn
* @returns {Function}
*/
var debounce = supportsMicroTasks ? microtaskDebounce : taskDebounce;

/**
 * Check if the given variable is a function
 * @method
 * @memberof Popper.Utils
 * @argument {Any} functionToCheck - variable to check
 * @returns {Boolean} answer to: is a function?
 */
function isFunction(functionToCheck) {
  var getType = {};
  return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
}

/**
 * Get CSS computed property of the given element
 * @method
 * @memberof Popper.Utils
 * @argument {Eement} element
 * @argument {String} property
 */
function getStyleComputedProperty(element, property) {
  if (element.nodeType !== 1) {
    return [];
  }
  // NOTE: 1 DOM access here
  var window = element.ownerDocument.defaultView;
  var css = window.getComputedStyle(element, null);
  return property ? css[property] : css;
}

/**
 * Returns the parentNode or the host of the element
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Element} parent
 */
function getParentNode(element) {
  if (element.nodeName === 'HTML') {
    return element;
  }
  return element.parentNode || element.host;
}

/**
 * Returns the scrolling parent of the given element
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Element} scroll parent
 */
function getScrollParent(element) {
  // Return body, `getScroll` will take care to get the correct `scrollTop` from it
  if (!element) {
    return document.body;
  }

  switch (element.nodeName) {
    case 'HTML':
    case 'BODY':
      return element.ownerDocument.body;
    case '#document':
      return element.body;
  }

  // Firefox want us to check `-x` and `-y` variations as well

  var _getStyleComputedProp = getStyleComputedProperty(element),
      overflow = _getStyleComputedProp.overflow,
      overflowX = _getStyleComputedProp.overflowX,
      overflowY = _getStyleComputedProp.overflowY;

  if (/(auto|scroll|overlay)/.test(overflow + overflowY + overflowX)) {
    return element;
  }

  return getScrollParent(getParentNode(element));
}

/**
 * Returns the reference node of the reference object, or the reference object itself.
 * @method
 * @memberof Popper.Utils
 * @param {Element|Object} reference - the reference element (the popper will be relative to this)
 * @returns {Element} parent
 */
function getReferenceNode(reference) {
  return reference && reference.referenceNode ? reference.referenceNode : reference;
}

var isIE11 = isBrowser && !!(window.MSInputMethodContext && document.documentMode);
var isIE10 = isBrowser && /MSIE 10/.test(navigator.userAgent);

/**
 * Determines if the browser is Internet Explorer
 * @method
 * @memberof Popper.Utils
 * @param {Number} version to check
 * @returns {Boolean} isIE
 */
function isIE(version) {
  if (version === 11) {
    return isIE11;
  }
  if (version === 10) {
    return isIE10;
  }
  return isIE11 || isIE10;
}

/**
 * Returns the offset parent of the given element
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Element} offset parent
 */
function getOffsetParent(element) {
  if (!element) {
    return document.documentElement;
  }

  var noOffsetParent = isIE(10) ? document.body : null;

  // NOTE: 1 DOM access here
  var offsetParent = element.offsetParent || null;
  // Skip hidden elements which don't have an offsetParent
  while (offsetParent === noOffsetParent && element.nextElementSibling) {
    offsetParent = (element = element.nextElementSibling).offsetParent;
  }

  var nodeName = offsetParent && offsetParent.nodeName;

  if (!nodeName || nodeName === 'BODY' || nodeName === 'HTML') {
    return element ? element.ownerDocument.documentElement : document.documentElement;
  }

  // .offsetParent will return the closest TH, TD or TABLE in case
  // no offsetParent is present, I hate this job...
  if (['TH', 'TD', 'TABLE'].indexOf(offsetParent.nodeName) !== -1 && getStyleComputedProperty(offsetParent, 'position') === 'static') {
    return getOffsetParent(offsetParent);
  }

  return offsetParent;
}

function isOffsetContainer(element) {
  var nodeName = element.nodeName;

  if (nodeName === 'BODY') {
    return false;
  }
  return nodeName === 'HTML' || getOffsetParent(element.firstElementChild) === element;
}

/**
 * Finds the root node (document, shadowDOM root) of the given element
 * @method
 * @memberof Popper.Utils
 * @argument {Element} node
 * @returns {Element} root node
 */
function getRoot(node) {
  if (node.parentNode !== null) {
    return getRoot(node.parentNode);
  }

  return node;
}

/**
 * Finds the offset parent common to the two provided nodes
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element1
 * @argument {Element} element2
 * @returns {Element} common offset parent
 */
function findCommonOffsetParent(element1, element2) {
  // This check is needed to avoid errors in case one of the elements isn't defined for any reason
  if (!element1 || !element1.nodeType || !element2 || !element2.nodeType) {
    return document.documentElement;
  }

  // Here we make sure to give as "start" the element that comes first in the DOM
  var order = element1.compareDocumentPosition(element2) & Node.DOCUMENT_POSITION_FOLLOWING;
  var start = order ? element1 : element2;
  var end = order ? element2 : element1;

  // Get common ancestor container
  var range = document.createRange();
  range.setStart(start, 0);
  range.setEnd(end, 0);
  var commonAncestorContainer = range.commonAncestorContainer;

  // Both nodes are inside #document

  if (element1 !== commonAncestorContainer && element2 !== commonAncestorContainer || start.contains(end)) {
    if (isOffsetContainer(commonAncestorContainer)) {
      return commonAncestorContainer;
    }

    return getOffsetParent(commonAncestorContainer);
  }

  // one of the nodes is inside shadowDOM, find which one
  var element1root = getRoot(element1);
  if (element1root.host) {
    return findCommonOffsetParent(element1root.host, element2);
  } else {
    return findCommonOffsetParent(element1, getRoot(element2).host);
  }
}

/**
 * Gets the scroll value of the given element in the given side (top and left)
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @argument {String} side `top` or `left`
 * @returns {number} amount of scrolled pixels
 */
function getScroll(element) {
  var side = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'top';

  var upperSide = side === 'top' ? 'scrollTop' : 'scrollLeft';
  var nodeName = element.nodeName;

  if (nodeName === 'BODY' || nodeName === 'HTML') {
    var html = element.ownerDocument.documentElement;
    var scrollingElement = element.ownerDocument.scrollingElement || html;
    return scrollingElement[upperSide];
  }

  return element[upperSide];
}

/*
 * Sum or subtract the element scroll values (left and top) from a given rect object
 * @method
 * @memberof Popper.Utils
 * @param {Object} rect - Rect object you want to change
 * @param {HTMLElement} element - The element from the function reads the scroll values
 * @param {Boolean} subtract - set to true if you want to subtract the scroll values
 * @return {Object} rect - The modifier rect object
 */
function includeScroll(rect, element) {
  var subtract = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  var scrollTop = getScroll(element, 'top');
  var scrollLeft = getScroll(element, 'left');
  var modifier = subtract ? -1 : 1;
  rect.top += scrollTop * modifier;
  rect.bottom += scrollTop * modifier;
  rect.left += scrollLeft * modifier;
  rect.right += scrollLeft * modifier;
  return rect;
}

/*
 * Helper to detect borders of a given element
 * @method
 * @memberof Popper.Utils
 * @param {CSSStyleDeclaration} styles
 * Result of `getStyleComputedProperty` on the given element
 * @param {String} axis - `x` or `y`
 * @return {number} borders - The borders size of the given axis
 */

function getBordersSize(styles, axis) {
  var sideA = axis === 'x' ? 'Left' : 'Top';
  var sideB = sideA === 'Left' ? 'Right' : 'Bottom';

  return parseFloat(styles['border' + sideA + 'Width']) + parseFloat(styles['border' + sideB + 'Width']);
}

function getSize(axis, body, html, computedStyle) {
  return Math.max(body['offset' + axis], body['scroll' + axis], html['client' + axis], html['offset' + axis], html['scroll' + axis], isIE(10) ? parseInt(html['offset' + axis]) + parseInt(computedStyle['margin' + (axis === 'Height' ? 'Top' : 'Left')]) + parseInt(computedStyle['margin' + (axis === 'Height' ? 'Bottom' : 'Right')]) : 0);
}

function getWindowSizes(document) {
  var body = document.body;
  var html = document.documentElement;
  var computedStyle = isIE(10) && getComputedStyle(html);

  return {
    height: getSize('Height', body, html, computedStyle),
    width: getSize('Width', body, html, computedStyle)
  };
}

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();





var defineProperty = function (obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

/**
 * Given element offsets, generate an output similar to getBoundingClientRect
 * @method
 * @memberof Popper.Utils
 * @argument {Object} offsets
 * @returns {Object} ClientRect like output
 */
function getClientRect(offsets) {
  return _extends({}, offsets, {
    right: offsets.left + offsets.width,
    bottom: offsets.top + offsets.height
  });
}

/**
 * Get bounding client rect of given element
 * @method
 * @memberof Popper.Utils
 * @param {HTMLElement} element
 * @return {Object} client rect
 */
function getBoundingClientRect(element) {
  var rect = {};

  // IE10 10 FIX: Please, don't ask, the element isn't
  // considered in DOM in some circumstances...
  // This isn't reproducible in IE10 compatibility mode of IE11
  try {
    if (isIE(10)) {
      rect = element.getBoundingClientRect();
      var scrollTop = getScroll(element, 'top');
      var scrollLeft = getScroll(element, 'left');
      rect.top += scrollTop;
      rect.left += scrollLeft;
      rect.bottom += scrollTop;
      rect.right += scrollLeft;
    } else {
      rect = element.getBoundingClientRect();
    }
  } catch (e) {}

  var result = {
    left: rect.left,
    top: rect.top,
    width: rect.right - rect.left,
    height: rect.bottom - rect.top
  };

  // subtract scrollbar size from sizes
  var sizes = element.nodeName === 'HTML' ? getWindowSizes(element.ownerDocument) : {};
  var width = sizes.width || element.clientWidth || result.width;
  var height = sizes.height || element.clientHeight || result.height;

  var horizScrollbar = element.offsetWidth - width;
  var vertScrollbar = element.offsetHeight - height;

  // if an hypothetical scrollbar is detected, we must be sure it's not a `border`
  // we make this check conditional for performance reasons
  if (horizScrollbar || vertScrollbar) {
    var styles = getStyleComputedProperty(element);
    horizScrollbar -= getBordersSize(styles, 'x');
    vertScrollbar -= getBordersSize(styles, 'y');

    result.width -= horizScrollbar;
    result.height -= vertScrollbar;
  }

  return getClientRect(result);
}

function getOffsetRectRelativeToArbitraryNode(children, parent) {
  var fixedPosition = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  var isIE10 = isIE(10);
  var isHTML = parent.nodeName === 'HTML';
  var childrenRect = getBoundingClientRect(children);
  var parentRect = getBoundingClientRect(parent);
  var scrollParent = getScrollParent(children);

  var styles = getStyleComputedProperty(parent);
  var borderTopWidth = parseFloat(styles.borderTopWidth);
  var borderLeftWidth = parseFloat(styles.borderLeftWidth);

  // In cases where the parent is fixed, we must ignore negative scroll in offset calc
  if (fixedPosition && isHTML) {
    parentRect.top = Math.max(parentRect.top, 0);
    parentRect.left = Math.max(parentRect.left, 0);
  }
  var offsets = getClientRect({
    top: childrenRect.top - parentRect.top - borderTopWidth,
    left: childrenRect.left - parentRect.left - borderLeftWidth,
    width: childrenRect.width,
    height: childrenRect.height
  });
  offsets.marginTop = 0;
  offsets.marginLeft = 0;

  // Subtract margins of documentElement in case it's being used as parent
  // we do this only on HTML because it's the only element that behaves
  // differently when margins are applied to it. The margins are included in
  // the box of the documentElement, in the other cases not.
  if (!isIE10 && isHTML) {
    var marginTop = parseFloat(styles.marginTop);
    var marginLeft = parseFloat(styles.marginLeft);

    offsets.top -= borderTopWidth - marginTop;
    offsets.bottom -= borderTopWidth - marginTop;
    offsets.left -= borderLeftWidth - marginLeft;
    offsets.right -= borderLeftWidth - marginLeft;

    // Attach marginTop and marginLeft because in some circumstances we may need them
    offsets.marginTop = marginTop;
    offsets.marginLeft = marginLeft;
  }

  if (isIE10 && !fixedPosition ? parent.contains(scrollParent) : parent === scrollParent && scrollParent.nodeName !== 'BODY') {
    offsets = includeScroll(offsets, parent);
  }

  return offsets;
}

function getViewportOffsetRectRelativeToArtbitraryNode(element) {
  var excludeScroll = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  var html = element.ownerDocument.documentElement;
  var relativeOffset = getOffsetRectRelativeToArbitraryNode(element, html);
  var width = Math.max(html.clientWidth, window.innerWidth || 0);
  var height = Math.max(html.clientHeight, window.innerHeight || 0);

  var scrollTop = !excludeScroll ? getScroll(html) : 0;
  var scrollLeft = !excludeScroll ? getScroll(html, 'left') : 0;

  var offset = {
    top: scrollTop - relativeOffset.top + relativeOffset.marginTop,
    left: scrollLeft - relativeOffset.left + relativeOffset.marginLeft,
    width: width,
    height: height
  };

  return getClientRect(offset);
}

/**
 * Check if the given element is fixed or is inside a fixed parent
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @argument {Element} customContainer
 * @returns {Boolean} answer to "isFixed?"
 */
function isFixed(element) {
  var nodeName = element.nodeName;
  if (nodeName === 'BODY' || nodeName === 'HTML') {
    return false;
  }
  if (getStyleComputedProperty(element, 'position') === 'fixed') {
    return true;
  }
  var parentNode = getParentNode(element);
  if (!parentNode) {
    return false;
  }
  return isFixed(parentNode);
}

/**
 * Finds the first parent of an element that has a transformed property defined
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Element} first transformed parent or documentElement
 */

function getFixedPositionOffsetParent(element) {
  // This check is needed to avoid errors in case one of the elements isn't defined for any reason
  if (!element || !element.parentElement || isIE()) {
    return document.documentElement;
  }
  var el = element.parentElement;
  while (el && getStyleComputedProperty(el, 'transform') === 'none') {
    el = el.parentElement;
  }
  return el || document.documentElement;
}

/**
 * Computed the boundaries limits and return them
 * @method
 * @memberof Popper.Utils
 * @param {HTMLElement} popper
 * @param {HTMLElement} reference
 * @param {number} padding
 * @param {HTMLElement} boundariesElement - Element used to define the boundaries
 * @param {Boolean} fixedPosition - Is in fixed position mode
 * @returns {Object} Coordinates of the boundaries
 */
function getBoundaries(popper, reference, padding, boundariesElement) {
  var fixedPosition = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

  // NOTE: 1 DOM access here

  var boundaries = { top: 0, left: 0 };
  var offsetParent = fixedPosition ? getFixedPositionOffsetParent(popper) : findCommonOffsetParent(popper, getReferenceNode(reference));

  // Handle viewport case
  if (boundariesElement === 'viewport') {
    boundaries = getViewportOffsetRectRelativeToArtbitraryNode(offsetParent, fixedPosition);
  } else {
    // Handle other cases based on DOM element used as boundaries
    var boundariesNode = void 0;
    if (boundariesElement === 'scrollParent') {
      boundariesNode = getScrollParent(getParentNode(reference));
      if (boundariesNode.nodeName === 'BODY') {
        boundariesNode = popper.ownerDocument.documentElement;
      }
    } else if (boundariesElement === 'window') {
      boundariesNode = popper.ownerDocument.documentElement;
    } else {
      boundariesNode = boundariesElement;
    }

    var offsets = getOffsetRectRelativeToArbitraryNode(boundariesNode, offsetParent, fixedPosition);

    // In case of HTML, we need a different computation
    if (boundariesNode.nodeName === 'HTML' && !isFixed(offsetParent)) {
      var _getWindowSizes = getWindowSizes(popper.ownerDocument),
          height = _getWindowSizes.height,
          width = _getWindowSizes.width;

      boundaries.top += offsets.top - offsets.marginTop;
      boundaries.bottom = height + offsets.top;
      boundaries.left += offsets.left - offsets.marginLeft;
      boundaries.right = width + offsets.left;
    } else {
      // for all the other DOM elements, this one is good
      boundaries = offsets;
    }
  }

  // Add paddings
  padding = padding || 0;
  var isPaddingNumber = typeof padding === 'number';
  boundaries.left += isPaddingNumber ? padding : padding.left || 0;
  boundaries.top += isPaddingNumber ? padding : padding.top || 0;
  boundaries.right -= isPaddingNumber ? padding : padding.right || 0;
  boundaries.bottom -= isPaddingNumber ? padding : padding.bottom || 0;

  return boundaries;
}

function getArea(_ref) {
  var width = _ref.width,
      height = _ref.height;

  return width * height;
}

/**
 * Utility used to transform the `auto` placement to the placement with more
 * available space.
 * @method
 * @memberof Popper.Utils
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function computeAutoPlacement(placement, refRect, popper, reference, boundariesElement) {
  var padding = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;

  if (placement.indexOf('auto') === -1) {
    return placement;
  }

  var boundaries = getBoundaries(popper, reference, padding, boundariesElement);

  var rects = {
    top: {
      width: boundaries.width,
      height: refRect.top - boundaries.top
    },
    right: {
      width: boundaries.right - refRect.right,
      height: boundaries.height
    },
    bottom: {
      width: boundaries.width,
      height: boundaries.bottom - refRect.bottom
    },
    left: {
      width: refRect.left - boundaries.left,
      height: boundaries.height
    }
  };

  var sortedAreas = Object.keys(rects).map(function (key) {
    return _extends({
      key: key
    }, rects[key], {
      area: getArea(rects[key])
    });
  }).sort(function (a, b) {
    return b.area - a.area;
  });

  var filteredAreas = sortedAreas.filter(function (_ref2) {
    var width = _ref2.width,
        height = _ref2.height;
    return width >= popper.clientWidth && height >= popper.clientHeight;
  });

  var computedPlacement = filteredAreas.length > 0 ? filteredAreas[0].key : sortedAreas[0].key;

  var variation = placement.split('-')[1];

  return computedPlacement + (variation ? '-' + variation : '');
}

/**
 * Get offsets to the reference element
 * @method
 * @memberof Popper.Utils
 * @param {Object} state
 * @param {Element} popper - the popper element
 * @param {Element} reference - the reference element (the popper will be relative to this)
 * @param {Element} fixedPosition - is in fixed position mode
 * @returns {Object} An object containing the offsets which will be applied to the popper
 */
function getReferenceOffsets(state, popper, reference) {
  var fixedPosition = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

  var commonOffsetParent = fixedPosition ? getFixedPositionOffsetParent(popper) : findCommonOffsetParent(popper, getReferenceNode(reference));
  return getOffsetRectRelativeToArbitraryNode(reference, commonOffsetParent, fixedPosition);
}

/**
 * Get the outer sizes of the given element (offset size + margins)
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Object} object containing width and height properties
 */
function getOuterSizes(element) {
  var window = element.ownerDocument.defaultView;
  var styles = window.getComputedStyle(element);
  var x = parseFloat(styles.marginTop || 0) + parseFloat(styles.marginBottom || 0);
  var y = parseFloat(styles.marginLeft || 0) + parseFloat(styles.marginRight || 0);
  var result = {
    width: element.offsetWidth + y,
    height: element.offsetHeight + x
  };
  return result;
}

/**
 * Get the opposite placement of the given one
 * @method
 * @memberof Popper.Utils
 * @argument {String} placement
 * @returns {String} flipped placement
 */
function getOppositePlacement(placement) {
  var hash = { left: 'right', right: 'left', bottom: 'top', top: 'bottom' };
  return placement.replace(/left|right|bottom|top/g, function (matched) {
    return hash[matched];
  });
}

/**
 * Get offsets to the popper
 * @method
 * @memberof Popper.Utils
 * @param {Object} position - CSS position the Popper will get applied
 * @param {HTMLElement} popper - the popper element
 * @param {Object} referenceOffsets - the reference offsets (the popper will be relative to this)
 * @param {String} placement - one of the valid placement options
 * @returns {Object} popperOffsets - An object containing the offsets which will be applied to the popper
 */
function getPopperOffsets(popper, referenceOffsets, placement) {
  placement = placement.split('-')[0];

  // Get popper node sizes
  var popperRect = getOuterSizes(popper);

  // Add position, width and height to our offsets object
  var popperOffsets = {
    width: popperRect.width,
    height: popperRect.height
  };

  // depending by the popper placement we have to compute its offsets slightly differently
  var isHoriz = ['right', 'left'].indexOf(placement) !== -1;
  var mainSide = isHoriz ? 'top' : 'left';
  var secondarySide = isHoriz ? 'left' : 'top';
  var measurement = isHoriz ? 'height' : 'width';
  var secondaryMeasurement = !isHoriz ? 'height' : 'width';

  popperOffsets[mainSide] = referenceOffsets[mainSide] + referenceOffsets[measurement] / 2 - popperRect[measurement] / 2;
  if (placement === secondarySide) {
    popperOffsets[secondarySide] = referenceOffsets[secondarySide] - popperRect[secondaryMeasurement];
  } else {
    popperOffsets[secondarySide] = referenceOffsets[getOppositePlacement(secondarySide)];
  }

  return popperOffsets;
}

/**
 * Mimics the `find` method of Array
 * @method
 * @memberof Popper.Utils
 * @argument {Array} arr
 * @argument prop
 * @argument value
 * @returns index or -1
 */
function find(arr, check) {
  // use native find if supported
  if (Array.prototype.find) {
    return arr.find(check);
  }

  // use `filter` to obtain the same behavior of `find`
  return arr.filter(check)[0];
}

/**
 * Return the index of the matching object
 * @method
 * @memberof Popper.Utils
 * @argument {Array} arr
 * @argument prop
 * @argument value
 * @returns index or -1
 */
function findIndex(arr, prop, value) {
  // use native findIndex if supported
  if (Array.prototype.findIndex) {
    return arr.findIndex(function (cur) {
      return cur[prop] === value;
    });
  }

  // use `find` + `indexOf` if `findIndex` isn't supported
  var match = find(arr, function (obj) {
    return obj[prop] === value;
  });
  return arr.indexOf(match);
}

/**
 * Loop trough the list of modifiers and run them in order,
 * each of them will then edit the data object.
 * @method
 * @memberof Popper.Utils
 * @param {dataObject} data
 * @param {Array} modifiers
 * @param {String} ends - Optional modifier name used as stopper
 * @returns {dataObject}
 */
function runModifiers(modifiers, data, ends) {
  var modifiersToRun = ends === undefined ? modifiers : modifiers.slice(0, findIndex(modifiers, 'name', ends));

  modifiersToRun.forEach(function (modifier) {
    if (modifier['function']) {
      // eslint-disable-line dot-notation
      console.warn('`modifier.function` is deprecated, use `modifier.fn`!');
    }
    var fn = modifier['function'] || modifier.fn; // eslint-disable-line dot-notation
    if (modifier.enabled && isFunction(fn)) {
      // Add properties to offsets to make them a complete clientRect object
      // we do this before each modifier to make sure the previous one doesn't
      // mess with these values
      data.offsets.popper = getClientRect(data.offsets.popper);
      data.offsets.reference = getClientRect(data.offsets.reference);

      data = fn(data, modifier);
    }
  });

  return data;
}

/**
 * Updates the position of the popper, computing the new offsets and applying
 * the new style.<br />
 * Prefer `scheduleUpdate` over `update` because of performance reasons.
 * @method
 * @memberof Popper
 */
function update() {
  // if popper is destroyed, don't perform any further update
  if (this.state.isDestroyed) {
    return;
  }

  var data = {
    instance: this,
    styles: {},
    arrowStyles: {},
    attributes: {},
    flipped: false,
    offsets: {}
  };

  // compute reference element offsets
  data.offsets.reference = getReferenceOffsets(this.state, this.popper, this.reference, this.options.positionFixed);

  // compute auto placement, store placement inside the data object,
  // modifiers will be able to edit `placement` if needed
  // and refer to originalPlacement to know the original value
  data.placement = computeAutoPlacement(this.options.placement, data.offsets.reference, this.popper, this.reference, this.options.modifiers.flip.boundariesElement, this.options.modifiers.flip.padding);

  // store the computed placement inside `originalPlacement`
  data.originalPlacement = data.placement;

  data.positionFixed = this.options.positionFixed;

  // compute the popper offsets
  data.offsets.popper = getPopperOffsets(this.popper, data.offsets.reference, data.placement);

  data.offsets.popper.position = this.options.positionFixed ? 'fixed' : 'absolute';

  // run the modifiers
  data = runModifiers(this.modifiers, data);

  // the first `update` will call `onCreate` callback
  // the other ones will call `onUpdate` callback
  if (!this.state.isCreated) {
    this.state.isCreated = true;
    this.options.onCreate(data);
  } else {
    this.options.onUpdate(data);
  }
}

/**
 * Helper used to know if the given modifier is enabled.
 * @method
 * @memberof Popper.Utils
 * @returns {Boolean}
 */
function isModifierEnabled(modifiers, modifierName) {
  return modifiers.some(function (_ref) {
    var name = _ref.name,
        enabled = _ref.enabled;
    return enabled && name === modifierName;
  });
}

/**
 * Get the prefixed supported property name
 * @method
 * @memberof Popper.Utils
 * @argument {String} property (camelCase)
 * @returns {String} prefixed property (camelCase or PascalCase, depending on the vendor prefix)
 */
function getSupportedPropertyName(property) {
  var prefixes = [false, 'ms', 'Webkit', 'Moz', 'O'];
  var upperProp = property.charAt(0).toUpperCase() + property.slice(1);

  for (var i = 0; i < prefixes.length; i++) {
    var prefix = prefixes[i];
    var toCheck = prefix ? '' + prefix + upperProp : property;
    if (typeof document.body.style[toCheck] !== 'undefined') {
      return toCheck;
    }
  }
  return null;
}

/**
 * Destroys the popper.
 * @method
 * @memberof Popper
 */
function destroy() {
  this.state.isDestroyed = true;

  // touch DOM only if `applyStyle` modifier is enabled
  if (isModifierEnabled(this.modifiers, 'applyStyle')) {
    this.popper.removeAttribute('x-placement');
    this.popper.style.position = '';
    this.popper.style.top = '';
    this.popper.style.left = '';
    this.popper.style.right = '';
    this.popper.style.bottom = '';
    this.popper.style.willChange = '';
    this.popper.style[getSupportedPropertyName('transform')] = '';
  }

  this.disableEventListeners();

  // remove the popper if user explicitly asked for the deletion on destroy
  // do not use `remove` because IE11 doesn't support it
  if (this.options.removeOnDestroy) {
    this.popper.parentNode.removeChild(this.popper);
  }
  return this;
}

/**
 * Get the window associated with the element
 * @argument {Element} element
 * @returns {Window}
 */
function getWindow(element) {
  var ownerDocument = element.ownerDocument;
  return ownerDocument ? ownerDocument.defaultView : window;
}

function attachToScrollParents(scrollParent, event, callback, scrollParents) {
  var isBody = scrollParent.nodeName === 'BODY';
  var target = isBody ? scrollParent.ownerDocument.defaultView : scrollParent;
  target.addEventListener(event, callback, { passive: true });

  if (!isBody) {
    attachToScrollParents(getScrollParent(target.parentNode), event, callback, scrollParents);
  }
  scrollParents.push(target);
}

/**
 * Setup needed event listeners used to update the popper position
 * @method
 * @memberof Popper.Utils
 * @private
 */
function setupEventListeners(reference, options, state, updateBound) {
  // Resize event listener on window
  state.updateBound = updateBound;
  getWindow(reference).addEventListener('resize', state.updateBound, { passive: true });

  // Scroll event listener on scroll parents
  var scrollElement = getScrollParent(reference);
  attachToScrollParents(scrollElement, 'scroll', state.updateBound, state.scrollParents);
  state.scrollElement = scrollElement;
  state.eventsEnabled = true;

  return state;
}

/**
 * It will add resize/scroll events and start recalculating
 * position of the popper element when they are triggered.
 * @method
 * @memberof Popper
 */
function enableEventListeners() {
  if (!this.state.eventsEnabled) {
    this.state = setupEventListeners(this.reference, this.options, this.state, this.scheduleUpdate);
  }
}

/**
 * Remove event listeners used to update the popper position
 * @method
 * @memberof Popper.Utils
 * @private
 */
function removeEventListeners(reference, state) {
  // Remove resize event listener on window
  getWindow(reference).removeEventListener('resize', state.updateBound);

  // Remove scroll event listener on scroll parents
  state.scrollParents.forEach(function (target) {
    target.removeEventListener('scroll', state.updateBound);
  });

  // Reset state
  state.updateBound = null;
  state.scrollParents = [];
  state.scrollElement = null;
  state.eventsEnabled = false;
  return state;
}

/**
 * It will remove resize/scroll events and won't recalculate popper position
 * when they are triggered. It also won't trigger `onUpdate` callback anymore,
 * unless you call `update` method manually.
 * @method
 * @memberof Popper
 */
function disableEventListeners() {
  if (this.state.eventsEnabled) {
    cancelAnimationFrame(this.scheduleUpdate);
    this.state = removeEventListeners(this.reference, this.state);
  }
}

/**
 * Tells if a given input is a number
 * @method
 * @memberof Popper.Utils
 * @param {*} input to check
 * @return {Boolean}
 */
function isNumeric(n) {
  return n !== '' && !isNaN(parseFloat(n)) && isFinite(n);
}

/**
 * Set the style to the given popper
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element - Element to apply the style to
 * @argument {Object} styles
 * Object with a list of properties and values which will be applied to the element
 */
function setStyles(element, styles) {
  Object.keys(styles).forEach(function (prop) {
    var unit = '';
    // add unit if the value is numeric and is one of the following
    if (['width', 'height', 'top', 'right', 'bottom', 'left'].indexOf(prop) !== -1 && isNumeric(styles[prop])) {
      unit = 'px';
    }
    element.style[prop] = styles[prop] + unit;
  });
}

/**
 * Set the attributes to the given popper
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element - Element to apply the attributes to
 * @argument {Object} styles
 * Object with a list of properties and values which will be applied to the element
 */
function setAttributes(element, attributes) {
  Object.keys(attributes).forEach(function (prop) {
    var value = attributes[prop];
    if (value !== false) {
      element.setAttribute(prop, attributes[prop]);
    } else {
      element.removeAttribute(prop);
    }
  });
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} data.styles - List of style properties - values to apply to popper element
 * @argument {Object} data.attributes - List of attribute properties - values to apply to popper element
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The same data object
 */
function applyStyle(data) {
  // any property present in `data.styles` will be applied to the popper,
  // in this way we can make the 3rd party modifiers add custom styles to it
  // Be aware, modifiers could override the properties defined in the previous
  // lines of this modifier!
  setStyles(data.instance.popper, data.styles);

  // any property present in `data.attributes` will be applied to the popper,
  // they will be set as HTML attributes of the element
  setAttributes(data.instance.popper, data.attributes);

  // if arrowElement is defined and arrowStyles has some properties
  if (data.arrowElement && Object.keys(data.arrowStyles).length) {
    setStyles(data.arrowElement, data.arrowStyles);
  }

  return data;
}

/**
 * Set the x-placement attribute before everything else because it could be used
 * to add margins to the popper margins needs to be calculated to get the
 * correct popper offsets.
 * @method
 * @memberof Popper.modifiers
 * @param {HTMLElement} reference - The reference element used to position the popper
 * @param {HTMLElement} popper - The HTML element used as popper
 * @param {Object} options - Popper.js options
 */
function applyStyleOnLoad(reference, popper, options, modifierOptions, state) {
  // compute reference element offsets
  var referenceOffsets = getReferenceOffsets(state, popper, reference, options.positionFixed);

  // compute auto placement, store placement inside the data object,
  // modifiers will be able to edit `placement` if needed
  // and refer to originalPlacement to know the original value
  var placement = computeAutoPlacement(options.placement, referenceOffsets, popper, reference, options.modifiers.flip.boundariesElement, options.modifiers.flip.padding);

  popper.setAttribute('x-placement', placement);

  // Apply `position` to popper before anything else because
  // without the position applied we can't guarantee correct computations
  setStyles(popper, { position: options.positionFixed ? 'fixed' : 'absolute' });

  return options;
}

/**
 * @function
 * @memberof Popper.Utils
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Boolean} shouldRound - If the offsets should be rounded at all
 * @returns {Object} The popper's position offsets rounded
 *
 * The tale of pixel-perfect positioning. It's still not 100% perfect, but as
 * good as it can be within reason.
 * Discussion here: https://github.com/FezVrasta/popper.js/pull/715
 *
 * Low DPI screens cause a popper to be blurry if not using full pixels (Safari
 * as well on High DPI screens).
 *
 * Firefox prefers no rounding for positioning and does not have blurriness on
 * high DPI screens.
 *
 * Only horizontal placement and left/right values need to be considered.
 */
function getRoundedOffsets(data, shouldRound) {
  var _data$offsets = data.offsets,
      popper = _data$offsets.popper,
      reference = _data$offsets.reference;
  var round = Math.round,
      floor = Math.floor;

  var noRound = function noRound(v) {
    return v;
  };

  var referenceWidth = round(reference.width);
  var popperWidth = round(popper.width);

  var isVertical = ['left', 'right'].indexOf(data.placement) !== -1;
  var isVariation = data.placement.indexOf('-') !== -1;
  var sameWidthParity = referenceWidth % 2 === popperWidth % 2;
  var bothOddWidth = referenceWidth % 2 === 1 && popperWidth % 2 === 1;

  var horizontalToInteger = !shouldRound ? noRound : isVertical || isVariation || sameWidthParity ? round : floor;
  var verticalToInteger = !shouldRound ? noRound : round;

  return {
    left: horizontalToInteger(bothOddWidth && !isVariation && shouldRound ? popper.left - 1 : popper.left),
    top: verticalToInteger(popper.top),
    bottom: verticalToInteger(popper.bottom),
    right: horizontalToInteger(popper.right)
  };
}

var isFirefox = isBrowser && /Firefox/i.test(navigator.userAgent);

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function computeStyle(data, options) {
  var x = options.x,
      y = options.y;
  var popper = data.offsets.popper;

  // Remove this legacy support in Popper.js v2

  var legacyGpuAccelerationOption = find(data.instance.modifiers, function (modifier) {
    return modifier.name === 'applyStyle';
  }).gpuAcceleration;
  if (legacyGpuAccelerationOption !== undefined) {
    console.warn('WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!');
  }
  var gpuAcceleration = legacyGpuAccelerationOption !== undefined ? legacyGpuAccelerationOption : options.gpuAcceleration;

  var offsetParent = getOffsetParent(data.instance.popper);
  var offsetParentRect = getBoundingClientRect(offsetParent);

  // Styles
  var styles = {
    position: popper.position
  };

  var offsets = getRoundedOffsets(data, window.devicePixelRatio < 2 || !isFirefox);

  var sideA = x === 'bottom' ? 'top' : 'bottom';
  var sideB = y === 'right' ? 'left' : 'right';

  // if gpuAcceleration is set to `true` and transform is supported,
  //  we use `translate3d` to apply the position to the popper we
  // automatically use the supported prefixed version if needed
  var prefixedProperty = getSupportedPropertyName('transform');

  // now, let's make a step back and look at this code closely (wtf?)
  // If the content of the popper grows once it's been positioned, it
  // may happen that the popper gets misplaced because of the new content
  // overflowing its reference element
  // To avoid this problem, we provide two options (x and y), which allow
  // the consumer to define the offset origin.
  // If we position a popper on top of a reference element, we can set
  // `x` to `top` to make the popper grow towards its top instead of
  // its bottom.
  var left = void 0,
      top = void 0;
  if (sideA === 'bottom') {
    // when offsetParent is <html> the positioning is relative to the bottom of the screen (excluding the scrollbar)
    // and not the bottom of the html element
    if (offsetParent.nodeName === 'HTML') {
      top = -offsetParent.clientHeight + offsets.bottom;
    } else {
      top = -offsetParentRect.height + offsets.bottom;
    }
  } else {
    top = offsets.top;
  }
  if (sideB === 'right') {
    if (offsetParent.nodeName === 'HTML') {
      left = -offsetParent.clientWidth + offsets.right;
    } else {
      left = -offsetParentRect.width + offsets.right;
    }
  } else {
    left = offsets.left;
  }
  if (gpuAcceleration && prefixedProperty) {
    styles[prefixedProperty] = 'translate3d(' + left + 'px, ' + top + 'px, 0)';
    styles[sideA] = 0;
    styles[sideB] = 0;
    styles.willChange = 'transform';
  } else {
    // othwerise, we use the standard `top`, `left`, `bottom` and `right` properties
    var invertTop = sideA === 'bottom' ? -1 : 1;
    var invertLeft = sideB === 'right' ? -1 : 1;
    styles[sideA] = top * invertTop;
    styles[sideB] = left * invertLeft;
    styles.willChange = sideA + ', ' + sideB;
  }

  // Attributes
  var attributes = {
    'x-placement': data.placement
  };

  // Update `data` attributes, styles and arrowStyles
  data.attributes = _extends({}, attributes, data.attributes);
  data.styles = _extends({}, styles, data.styles);
  data.arrowStyles = _extends({}, data.offsets.arrow, data.arrowStyles);

  return data;
}

/**
 * Helper used to know if the given modifier depends from another one.<br />
 * It checks if the needed modifier is listed and enabled.
 * @method
 * @memberof Popper.Utils
 * @param {Array} modifiers - list of modifiers
 * @param {String} requestingName - name of requesting modifier
 * @param {String} requestedName - name of requested modifier
 * @returns {Boolean}
 */
function isModifierRequired(modifiers, requestingName, requestedName) {
  var requesting = find(modifiers, function (_ref) {
    var name = _ref.name;
    return name === requestingName;
  });

  var isRequired = !!requesting && modifiers.some(function (modifier) {
    return modifier.name === requestedName && modifier.enabled && modifier.order < requesting.order;
  });

  if (!isRequired) {
    var _requesting = '`' + requestingName + '`';
    var requested = '`' + requestedName + '`';
    console.warn(requested + ' modifier is required by ' + _requesting + ' modifier in order to work, be sure to include it before ' + _requesting + '!');
  }
  return isRequired;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function arrow(data, options) {
  var _data$offsets$arrow;

  // arrow depends on keepTogether in order to work
  if (!isModifierRequired(data.instance.modifiers, 'arrow', 'keepTogether')) {
    return data;
  }

  var arrowElement = options.element;

  // if arrowElement is a string, suppose it's a CSS selector
  if (typeof arrowElement === 'string') {
    arrowElement = data.instance.popper.querySelector(arrowElement);

    // if arrowElement is not found, don't run the modifier
    if (!arrowElement) {
      return data;
    }
  } else {
    // if the arrowElement isn't a query selector we must check that the
    // provided DOM node is child of its popper node
    if (!data.instance.popper.contains(arrowElement)) {
      console.warn('WARNING: `arrow.element` must be child of its popper element!');
      return data;
    }
  }

  var placement = data.placement.split('-')[0];
  var _data$offsets = data.offsets,
      popper = _data$offsets.popper,
      reference = _data$offsets.reference;

  var isVertical = ['left', 'right'].indexOf(placement) !== -1;

  var len = isVertical ? 'height' : 'width';
  var sideCapitalized = isVertical ? 'Top' : 'Left';
  var side = sideCapitalized.toLowerCase();
  var altSide = isVertical ? 'left' : 'top';
  var opSide = isVertical ? 'bottom' : 'right';
  var arrowElementSize = getOuterSizes(arrowElement)[len];

  //
  // extends keepTogether behavior making sure the popper and its
  // reference have enough pixels in conjunction
  //

  // top/left side
  if (reference[opSide] - arrowElementSize < popper[side]) {
    data.offsets.popper[side] -= popper[side] - (reference[opSide] - arrowElementSize);
  }
  // bottom/right side
  if (reference[side] + arrowElementSize > popper[opSide]) {
    data.offsets.popper[side] += reference[side] + arrowElementSize - popper[opSide];
  }
  data.offsets.popper = getClientRect(data.offsets.popper);

  // compute center of the popper
  var center = reference[side] + reference[len] / 2 - arrowElementSize / 2;

  // Compute the sideValue using the updated popper offsets
  // take popper margin in account because we don't have this info available
  var css = getStyleComputedProperty(data.instance.popper);
  var popperMarginSide = parseFloat(css['margin' + sideCapitalized]);
  var popperBorderSide = parseFloat(css['border' + sideCapitalized + 'Width']);
  var sideValue = center - data.offsets.popper[side] - popperMarginSide - popperBorderSide;

  // prevent arrowElement from being placed not contiguously to its popper
  sideValue = Math.max(Math.min(popper[len] - arrowElementSize, sideValue), 0);

  data.arrowElement = arrowElement;
  data.offsets.arrow = (_data$offsets$arrow = {}, defineProperty(_data$offsets$arrow, side, Math.round(sideValue)), defineProperty(_data$offsets$arrow, altSide, ''), _data$offsets$arrow);

  return data;
}

/**
 * Get the opposite placement variation of the given one
 * @method
 * @memberof Popper.Utils
 * @argument {String} placement variation
 * @returns {String} flipped placement variation
 */
function getOppositeVariation(variation) {
  if (variation === 'end') {
    return 'start';
  } else if (variation === 'start') {
    return 'end';
  }
  return variation;
}

/**
 * List of accepted placements to use as values of the `placement` option.<br />
 * Valid placements are:
 * - `auto`
 * - `top`
 * - `right`
 * - `bottom`
 * - `left`
 *
 * Each placement can have a variation from this list:
 * - `-start`
 * - `-end`
 *
 * Variations are interpreted easily if you think of them as the left to right
 * written languages. Horizontally (`top` and `bottom`), `start` is left and `end`
 * is right.<br />
 * Vertically (`left` and `right`), `start` is top and `end` is bottom.
 *
 * Some valid examples are:
 * - `top-end` (on top of reference, right aligned)
 * - `right-start` (on right of reference, top aligned)
 * - `bottom` (on bottom, centered)
 * - `auto-end` (on the side with more space available, alignment depends by placement)
 *
 * @static
 * @type {Array}
 * @enum {String}
 * @readonly
 * @method placements
 * @memberof Popper
 */
var placements = ['auto-start', 'auto', 'auto-end', 'top-start', 'top', 'top-end', 'right-start', 'right', 'right-end', 'bottom-end', 'bottom', 'bottom-start', 'left-end', 'left', 'left-start'];

// Get rid of `auto` `auto-start` and `auto-end`
var validPlacements = placements.slice(3);

/**
 * Given an initial placement, returns all the subsequent placements
 * clockwise (or counter-clockwise).
 *
 * @method
 * @memberof Popper.Utils
 * @argument {String} placement - A valid placement (it accepts variations)
 * @argument {Boolean} counter - Set to true to walk the placements counterclockwise
 * @returns {Array} placements including their variations
 */
function clockwise(placement) {
  var counter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  var index = validPlacements.indexOf(placement);
  var arr = validPlacements.slice(index + 1).concat(validPlacements.slice(0, index));
  return counter ? arr.reverse() : arr;
}

var BEHAVIORS = {
  FLIP: 'flip',
  CLOCKWISE: 'clockwise',
  COUNTERCLOCKWISE: 'counterclockwise'
};

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function flip(data, options) {
  // if `inner` modifier is enabled, we can't use the `flip` modifier
  if (isModifierEnabled(data.instance.modifiers, 'inner')) {
    return data;
  }

  if (data.flipped && data.placement === data.originalPlacement) {
    // seems like flip is trying to loop, probably there's not enough space on any of the flippable sides
    return data;
  }

  var boundaries = getBoundaries(data.instance.popper, data.instance.reference, options.padding, options.boundariesElement, data.positionFixed);

  var placement = data.placement.split('-')[0];
  var placementOpposite = getOppositePlacement(placement);
  var variation = data.placement.split('-')[1] || '';

  var flipOrder = [];

  switch (options.behavior) {
    case BEHAVIORS.FLIP:
      flipOrder = [placement, placementOpposite];
      break;
    case BEHAVIORS.CLOCKWISE:
      flipOrder = clockwise(placement);
      break;
    case BEHAVIORS.COUNTERCLOCKWISE:
      flipOrder = clockwise(placement, true);
      break;
    default:
      flipOrder = options.behavior;
  }

  flipOrder.forEach(function (step, index) {
    if (placement !== step || flipOrder.length === index + 1) {
      return data;
    }

    placement = data.placement.split('-')[0];
    placementOpposite = getOppositePlacement(placement);

    var popperOffsets = data.offsets.popper;
    var refOffsets = data.offsets.reference;

    // using floor because the reference offsets may contain decimals we are not going to consider here
    var floor = Math.floor;
    var overlapsRef = placement === 'left' && floor(popperOffsets.right) > floor(refOffsets.left) || placement === 'right' && floor(popperOffsets.left) < floor(refOffsets.right) || placement === 'top' && floor(popperOffsets.bottom) > floor(refOffsets.top) || placement === 'bottom' && floor(popperOffsets.top) < floor(refOffsets.bottom);

    var overflowsLeft = floor(popperOffsets.left) < floor(boundaries.left);
    var overflowsRight = floor(popperOffsets.right) > floor(boundaries.right);
    var overflowsTop = floor(popperOffsets.top) < floor(boundaries.top);
    var overflowsBottom = floor(popperOffsets.bottom) > floor(boundaries.bottom);

    var overflowsBoundaries = placement === 'left' && overflowsLeft || placement === 'right' && overflowsRight || placement === 'top' && overflowsTop || placement === 'bottom' && overflowsBottom;

    // flip the variation if required
    var isVertical = ['top', 'bottom'].indexOf(placement) !== -1;

    // flips variation if reference element overflows boundaries
    var flippedVariationByRef = !!options.flipVariations && (isVertical && variation === 'start' && overflowsLeft || isVertical && variation === 'end' && overflowsRight || !isVertical && variation === 'start' && overflowsTop || !isVertical && variation === 'end' && overflowsBottom);

    // flips variation if popper content overflows boundaries
    var flippedVariationByContent = !!options.flipVariationsByContent && (isVertical && variation === 'start' && overflowsRight || isVertical && variation === 'end' && overflowsLeft || !isVertical && variation === 'start' && overflowsBottom || !isVertical && variation === 'end' && overflowsTop);

    var flippedVariation = flippedVariationByRef || flippedVariationByContent;

    if (overlapsRef || overflowsBoundaries || flippedVariation) {
      // this boolean to detect any flip loop
      data.flipped = true;

      if (overlapsRef || overflowsBoundaries) {
        placement = flipOrder[index + 1];
      }

      if (flippedVariation) {
        variation = getOppositeVariation(variation);
      }

      data.placement = placement + (variation ? '-' + variation : '');

      // this object contains `position`, we want to preserve it along with
      // any additional property we may add in the future
      data.offsets.popper = _extends({}, data.offsets.popper, getPopperOffsets(data.instance.popper, data.offsets.reference, data.placement));

      data = runModifiers(data.instance.modifiers, data, 'flip');
    }
  });
  return data;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function keepTogether(data) {
  var _data$offsets = data.offsets,
      popper = _data$offsets.popper,
      reference = _data$offsets.reference;

  var placement = data.placement.split('-')[0];
  var floor = Math.floor;
  var isVertical = ['top', 'bottom'].indexOf(placement) !== -1;
  var side = isVertical ? 'right' : 'bottom';
  var opSide = isVertical ? 'left' : 'top';
  var measurement = isVertical ? 'width' : 'height';

  if (popper[side] < floor(reference[opSide])) {
    data.offsets.popper[opSide] = floor(reference[opSide]) - popper[measurement];
  }
  if (popper[opSide] > floor(reference[side])) {
    data.offsets.popper[opSide] = floor(reference[side]);
  }

  return data;
}

/**
 * Converts a string containing value + unit into a px value number
 * @function
 * @memberof {modifiers~offset}
 * @private
 * @argument {String} str - Value + unit string
 * @argument {String} measurement - `height` or `width`
 * @argument {Object} popperOffsets
 * @argument {Object} referenceOffsets
 * @returns {Number|String}
 * Value in pixels, or original string if no values were extracted
 */
function toValue(str, measurement, popperOffsets, referenceOffsets) {
  // separate value from unit
  var split = str.match(/((?:\-|\+)?\d*\.?\d*)(.*)/);
  var value = +split[1];
  var unit = split[2];

  // If it's not a number it's an operator, I guess
  if (!value) {
    return str;
  }

  if (unit.indexOf('%') === 0) {
    var element = void 0;
    switch (unit) {
      case '%p':
        element = popperOffsets;
        break;
      case '%':
      case '%r':
      default:
        element = referenceOffsets;
    }

    var rect = getClientRect(element);
    return rect[measurement] / 100 * value;
  } else if (unit === 'vh' || unit === 'vw') {
    // if is a vh or vw, we calculate the size based on the viewport
    var size = void 0;
    if (unit === 'vh') {
      size = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    } else {
      size = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    }
    return size / 100 * value;
  } else {
    // if is an explicit pixel unit, we get rid of the unit and keep the value
    // if is an implicit unit, it's px, and we return just the value
    return value;
  }
}

/**
 * Parse an `offset` string to extrapolate `x` and `y` numeric offsets.
 * @function
 * @memberof {modifiers~offset}
 * @private
 * @argument {String} offset
 * @argument {Object} popperOffsets
 * @argument {Object} referenceOffsets
 * @argument {String} basePlacement
 * @returns {Array} a two cells array with x and y offsets in numbers
 */
function parseOffset(offset, popperOffsets, referenceOffsets, basePlacement) {
  var offsets = [0, 0];

  // Use height if placement is left or right and index is 0 otherwise use width
  // in this way the first offset will use an axis and the second one
  // will use the other one
  var useHeight = ['right', 'left'].indexOf(basePlacement) !== -1;

  // Split the offset string to obtain a list of values and operands
  // The regex addresses values with the plus or minus sign in front (+10, -20, etc)
  var fragments = offset.split(/(\+|\-)/).map(function (frag) {
    return frag.trim();
  });

  // Detect if the offset string contains a pair of values or a single one
  // they could be separated by comma or space
  var divider = fragments.indexOf(find(fragments, function (frag) {
    return frag.search(/,|\s/) !== -1;
  }));

  if (fragments[divider] && fragments[divider].indexOf(',') === -1) {
    console.warn('Offsets separated by white space(s) are deprecated, use a comma (,) instead.');
  }

  // If divider is found, we divide the list of values and operands to divide
  // them by ofset X and Y.
  var splitRegex = /\s*,\s*|\s+/;
  var ops = divider !== -1 ? [fragments.slice(0, divider).concat([fragments[divider].split(splitRegex)[0]]), [fragments[divider].split(splitRegex)[1]].concat(fragments.slice(divider + 1))] : [fragments];

  // Convert the values with units to absolute pixels to allow our computations
  ops = ops.map(function (op, index) {
    // Most of the units rely on the orientation of the popper
    var measurement = (index === 1 ? !useHeight : useHeight) ? 'height' : 'width';
    var mergeWithPrevious = false;
    return op
    // This aggregates any `+` or `-` sign that aren't considered operators
    // e.g.: 10 + +5 => [10, +, +5]
    .reduce(function (a, b) {
      if (a[a.length - 1] === '' && ['+', '-'].indexOf(b) !== -1) {
        a[a.length - 1] = b;
        mergeWithPrevious = true;
        return a;
      } else if (mergeWithPrevious) {
        a[a.length - 1] += b;
        mergeWithPrevious = false;
        return a;
      } else {
        return a.concat(b);
      }
    }, [])
    // Here we convert the string values into number values (in px)
    .map(function (str) {
      return toValue(str, measurement, popperOffsets, referenceOffsets);
    });
  });

  // Loop trough the offsets arrays and execute the operations
  ops.forEach(function (op, index) {
    op.forEach(function (frag, index2) {
      if (isNumeric(frag)) {
        offsets[index] += frag * (op[index2 - 1] === '-' ? -1 : 1);
      }
    });
  });
  return offsets;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @argument {Number|String} options.offset=0
 * The offset value as described in the modifier description
 * @returns {Object} The data object, properly modified
 */
function offset(data, _ref) {
  var offset = _ref.offset;
  var placement = data.placement,
      _data$offsets = data.offsets,
      popper = _data$offsets.popper,
      reference = _data$offsets.reference;

  var basePlacement = placement.split('-')[0];

  var offsets = void 0;
  if (isNumeric(+offset)) {
    offsets = [+offset, 0];
  } else {
    offsets = parseOffset(offset, popper, reference, basePlacement);
  }

  if (basePlacement === 'left') {
    popper.top += offsets[0];
    popper.left -= offsets[1];
  } else if (basePlacement === 'right') {
    popper.top += offsets[0];
    popper.left += offsets[1];
  } else if (basePlacement === 'top') {
    popper.left += offsets[0];
    popper.top -= offsets[1];
  } else if (basePlacement === 'bottom') {
    popper.left += offsets[0];
    popper.top += offsets[1];
  }

  data.popper = popper;
  return data;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function preventOverflow(data, options) {
  var boundariesElement = options.boundariesElement || getOffsetParent(data.instance.popper);

  // If offsetParent is the reference element, we really want to
  // go one step up and use the next offsetParent as reference to
  // avoid to make this modifier completely useless and look like broken
  if (data.instance.reference === boundariesElement) {
    boundariesElement = getOffsetParent(boundariesElement);
  }

  // NOTE: DOM access here
  // resets the popper's position so that the document size can be calculated excluding
  // the size of the popper element itself
  var transformProp = getSupportedPropertyName('transform');
  var popperStyles = data.instance.popper.style; // assignment to help minification
  var top = popperStyles.top,
      left = popperStyles.left,
      transform = popperStyles[transformProp];

  popperStyles.top = '';
  popperStyles.left = '';
  popperStyles[transformProp] = '';

  var boundaries = getBoundaries(data.instance.popper, data.instance.reference, options.padding, boundariesElement, data.positionFixed);

  // NOTE: DOM access here
  // restores the original style properties after the offsets have been computed
  popperStyles.top = top;
  popperStyles.left = left;
  popperStyles[transformProp] = transform;

  options.boundaries = boundaries;

  var order = options.priority;
  var popper = data.offsets.popper;

  var check = {
    primary: function primary(placement) {
      var value = popper[placement];
      if (popper[placement] < boundaries[placement] && !options.escapeWithReference) {
        value = Math.max(popper[placement], boundaries[placement]);
      }
      return defineProperty({}, placement, value);
    },
    secondary: function secondary(placement) {
      var mainSide = placement === 'right' ? 'left' : 'top';
      var value = popper[mainSide];
      if (popper[placement] > boundaries[placement] && !options.escapeWithReference) {
        value = Math.min(popper[mainSide], boundaries[placement] - (placement === 'right' ? popper.width : popper.height));
      }
      return defineProperty({}, mainSide, value);
    }
  };

  order.forEach(function (placement) {
    var side = ['left', 'top'].indexOf(placement) !== -1 ? 'primary' : 'secondary';
    popper = _extends({}, popper, check[side](placement));
  });

  data.offsets.popper = popper;

  return data;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function shift(data) {
  var placement = data.placement;
  var basePlacement = placement.split('-')[0];
  var shiftvariation = placement.split('-')[1];

  // if shift shiftvariation is specified, run the modifier
  if (shiftvariation) {
    var _data$offsets = data.offsets,
        reference = _data$offsets.reference,
        popper = _data$offsets.popper;

    var isVertical = ['bottom', 'top'].indexOf(basePlacement) !== -1;
    var side = isVertical ? 'left' : 'top';
    var measurement = isVertical ? 'width' : 'height';

    var shiftOffsets = {
      start: defineProperty({}, side, reference[side]),
      end: defineProperty({}, side, reference[side] + reference[measurement] - popper[measurement])
    };

    data.offsets.popper = _extends({}, popper, shiftOffsets[shiftvariation]);
  }

  return data;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function hide(data) {
  if (!isModifierRequired(data.instance.modifiers, 'hide', 'preventOverflow')) {
    return data;
  }

  var refRect = data.offsets.reference;
  var bound = find(data.instance.modifiers, function (modifier) {
    return modifier.name === 'preventOverflow';
  }).boundaries;

  if (refRect.bottom < bound.top || refRect.left > bound.right || refRect.top > bound.bottom || refRect.right < bound.left) {
    // Avoid unnecessary DOM access if visibility hasn't changed
    if (data.hide === true) {
      return data;
    }

    data.hide = true;
    data.attributes['x-out-of-boundaries'] = '';
  } else {
    // Avoid unnecessary DOM access if visibility hasn't changed
    if (data.hide === false) {
      return data;
    }

    data.hide = false;
    data.attributes['x-out-of-boundaries'] = false;
  }

  return data;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function inner(data) {
  var placement = data.placement;
  var basePlacement = placement.split('-')[0];
  var _data$offsets = data.offsets,
      popper = _data$offsets.popper,
      reference = _data$offsets.reference;

  var isHoriz = ['left', 'right'].indexOf(basePlacement) !== -1;

  var subtractLength = ['top', 'left'].indexOf(basePlacement) === -1;

  popper[isHoriz ? 'left' : 'top'] = reference[basePlacement] - (subtractLength ? popper[isHoriz ? 'width' : 'height'] : 0);

  data.placement = getOppositePlacement(placement);
  data.offsets.popper = getClientRect(popper);

  return data;
}

/**
 * Modifier function, each modifier can have a function of this type assigned
 * to its `fn` property.<br />
 * These functions will be called on each update, this means that you must
 * make sure they are performant enough to avoid performance bottlenecks.
 *
 * @function ModifierFn
 * @argument {dataObject} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {dataObject} The data object, properly modified
 */

/**
 * Modifiers are plugins used to alter the behavior of your poppers.<br />
 * Popper.js uses a set of 9 modifiers to provide all the basic functionalities
 * needed by the library.
 *
 * Usually you don't want to override the `order`, `fn` and `onLoad` props.
 * All the other properties are configurations that could be tweaked.
 * @namespace modifiers
 */
var modifiers = {
  /**
   * Modifier used to shift the popper on the start or end of its reference
   * element.<br />
   * It will read the variation of the `placement` property.<br />
   * It can be one either `-end` or `-start`.
   * @memberof modifiers
   * @inner
   */
  shift: {
    /** @prop {number} order=100 - Index used to define the order of execution */
    order: 100,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: shift
  },

  /**
   * The `offset` modifier can shift your popper on both its axis.
   *
   * It accepts the following units:
   * - `px` or unit-less, interpreted as pixels
   * - `%` or `%r`, percentage relative to the length of the reference element
   * - `%p`, percentage relative to the length of the popper element
   * - `vw`, CSS viewport width unit
   * - `vh`, CSS viewport height unit
   *
   * For length is intended the main axis relative to the placement of the popper.<br />
   * This means that if the placement is `top` or `bottom`, the length will be the
   * `width`. In case of `left` or `right`, it will be the `height`.
   *
   * You can provide a single value (as `Number` or `String`), or a pair of values
   * as `String` divided by a comma or one (or more) white spaces.<br />
   * The latter is a deprecated method because it leads to confusion and will be
   * removed in v2.<br />
   * Additionally, it accepts additions and subtractions between different units.
   * Note that multiplications and divisions aren't supported.
   *
   * Valid examples are:
   * ```
   * 10
   * '10%'
   * '10, 10'
   * '10%, 10'
   * '10 + 10%'
   * '10 - 5vh + 3%'
   * '-10px + 5vh, 5px - 6%'
   * ```
   * > **NB**: If you desire to apply offsets to your poppers in a way that may make them overlap
   * > with their reference element, unfortunately, you will have to disable the `flip` modifier.
   * > You can read more on this at this [issue](https://github.com/FezVrasta/popper.js/issues/373).
   *
   * @memberof modifiers
   * @inner
   */
  offset: {
    /** @prop {number} order=200 - Index used to define the order of execution */
    order: 200,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: offset,
    /** @prop {Number|String} offset=0
     * The offset value as described in the modifier description
     */
    offset: 0
  },

  /**
   * Modifier used to prevent the popper from being positioned outside the boundary.
   *
   * A scenario exists where the reference itself is not within the boundaries.<br />
   * We can say it has "escaped the boundaries" — or just "escaped".<br />
   * In this case we need to decide whether the popper should either:
   *
   * - detach from the reference and remain "trapped" in the boundaries, or
   * - if it should ignore the boundary and "escape with its reference"
   *
   * When `escapeWithReference` is set to`true` and reference is completely
   * outside its boundaries, the popper will overflow (or completely leave)
   * the boundaries in order to remain attached to the edge of the reference.
   *
   * @memberof modifiers
   * @inner
   */
  preventOverflow: {
    /** @prop {number} order=300 - Index used to define the order of execution */
    order: 300,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: preventOverflow,
    /**
     * @prop {Array} [priority=['left','right','top','bottom']]
     * Popper will try to prevent overflow following these priorities by default,
     * then, it could overflow on the left and on top of the `boundariesElement`
     */
    priority: ['left', 'right', 'top', 'bottom'],
    /**
     * @prop {number} padding=5
     * Amount of pixel used to define a minimum distance between the boundaries
     * and the popper. This makes sure the popper always has a little padding
     * between the edges of its container
     */
    padding: 5,
    /**
     * @prop {String|HTMLElement} boundariesElement='scrollParent'
     * Boundaries used by the modifier. Can be `scrollParent`, `window`,
     * `viewport` or any DOM element.
     */
    boundariesElement: 'scrollParent'
  },

  /**
   * Modifier used to make sure the reference and its popper stay near each other
   * without leaving any gap between the two. Especially useful when the arrow is
   * enabled and you want to ensure that it points to its reference element.
   * It cares only about the first axis. You can still have poppers with margin
   * between the popper and its reference element.
   * @memberof modifiers
   * @inner
   */
  keepTogether: {
    /** @prop {number} order=400 - Index used to define the order of execution */
    order: 400,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: keepTogether
  },

  /**
   * This modifier is used to move the `arrowElement` of the popper to make
   * sure it is positioned between the reference element and its popper element.
   * It will read the outer size of the `arrowElement` node to detect how many
   * pixels of conjunction are needed.
   *
   * It has no effect if no `arrowElement` is provided.
   * @memberof modifiers
   * @inner
   */
  arrow: {
    /** @prop {number} order=500 - Index used to define the order of execution */
    order: 500,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: arrow,
    /** @prop {String|HTMLElement} element='[x-arrow]' - Selector or node used as arrow */
    element: '[x-arrow]'
  },

  /**
   * Modifier used to flip the popper's placement when it starts to overlap its
   * reference element.
   *
   * Requires the `preventOverflow` modifier before it in order to work.
   *
   * **NOTE:** this modifier will interrupt the current update cycle and will
   * restart it if it detects the need to flip the placement.
   * @memberof modifiers
   * @inner
   */
  flip: {
    /** @prop {number} order=600 - Index used to define the order of execution */
    order: 600,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: flip,
    /**
     * @prop {String|Array} behavior='flip'
     * The behavior used to change the popper's placement. It can be one of
     * `flip`, `clockwise`, `counterclockwise` or an array with a list of valid
     * placements (with optional variations)
     */
    behavior: 'flip',
    /**
     * @prop {number} padding=5
     * The popper will flip if it hits the edges of the `boundariesElement`
     */
    padding: 5,
    /**
     * @prop {String|HTMLElement} boundariesElement='viewport'
     * The element which will define the boundaries of the popper position.
     * The popper will never be placed outside of the defined boundaries
     * (except if `keepTogether` is enabled)
     */
    boundariesElement: 'viewport',
    /**
     * @prop {Boolean} flipVariations=false
     * The popper will switch placement variation between `-start` and `-end` when
     * the reference element overlaps its boundaries.
     *
     * The original placement should have a set variation.
     */
    flipVariations: false,
    /**
     * @prop {Boolean} flipVariationsByContent=false
     * The popper will switch placement variation between `-start` and `-end` when
     * the popper element overlaps its reference boundaries.
     *
     * The original placement should have a set variation.
     */
    flipVariationsByContent: false
  },

  /**
   * Modifier used to make the popper flow toward the inner of the reference element.
   * By default, when this modifier is disabled, the popper will be placed outside
   * the reference element.
   * @memberof modifiers
   * @inner
   */
  inner: {
    /** @prop {number} order=700 - Index used to define the order of execution */
    order: 700,
    /** @prop {Boolean} enabled=false - Whether the modifier is enabled or not */
    enabled: false,
    /** @prop {ModifierFn} */
    fn: inner
  },

  /**
   * Modifier used to hide the popper when its reference element is outside of the
   * popper boundaries. It will set a `x-out-of-boundaries` attribute which can
   * be used to hide with a CSS selector the popper when its reference is
   * out of boundaries.
   *
   * Requires the `preventOverflow` modifier before it in order to work.
   * @memberof modifiers
   * @inner
   */
  hide: {
    /** @prop {number} order=800 - Index used to define the order of execution */
    order: 800,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: hide
  },

  /**
   * Computes the style that will be applied to the popper element to gets
   * properly positioned.
   *
   * Note that this modifier will not touch the DOM, it just prepares the styles
   * so that `applyStyle` modifier can apply it. This separation is useful
   * in case you need to replace `applyStyle` with a custom implementation.
   *
   * This modifier has `850` as `order` value to maintain backward compatibility
   * with previous versions of Popper.js. Expect the modifiers ordering method
   * to change in future major versions of the library.
   *
   * @memberof modifiers
   * @inner
   */
  computeStyle: {
    /** @prop {number} order=850 - Index used to define the order of execution */
    order: 850,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: computeStyle,
    /**
     * @prop {Boolean} gpuAcceleration=true
     * If true, it uses the CSS 3D transformation to position the popper.
     * Otherwise, it will use the `top` and `left` properties
     */
    gpuAcceleration: true,
    /**
     * @prop {string} [x='bottom']
     * Where to anchor the X axis (`bottom` or `top`). AKA X offset origin.
     * Change this if your popper should grow in a direction different from `bottom`
     */
    x: 'bottom',
    /**
     * @prop {string} [x='left']
     * Where to anchor the Y axis (`left` or `right`). AKA Y offset origin.
     * Change this if your popper should grow in a direction different from `right`
     */
    y: 'right'
  },

  /**
   * Applies the computed styles to the popper element.
   *
   * All the DOM manipulations are limited to this modifier. This is useful in case
   * you want to integrate Popper.js inside a framework or view library and you
   * want to delegate all the DOM manipulations to it.
   *
   * Note that if you disable this modifier, you must make sure the popper element
   * has its position set to `absolute` before Popper.js can do its work!
   *
   * Just disable this modifier and define your own to achieve the desired effect.
   *
   * @memberof modifiers
   * @inner
   */
  applyStyle: {
    /** @prop {number} order=900 - Index used to define the order of execution */
    order: 900,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: applyStyle,
    /** @prop {Function} */
    onLoad: applyStyleOnLoad,
    /**
     * @deprecated since version 1.10.0, the property moved to `computeStyle` modifier
     * @prop {Boolean} gpuAcceleration=true
     * If true, it uses the CSS 3D transformation to position the popper.
     * Otherwise, it will use the `top` and `left` properties
     */
    gpuAcceleration: undefined
  }
};

/**
 * The `dataObject` is an object containing all the information used by Popper.js.
 * This object is passed to modifiers and to the `onCreate` and `onUpdate` callbacks.
 * @name dataObject
 * @property {Object} data.instance The Popper.js instance
 * @property {String} data.placement Placement applied to popper
 * @property {String} data.originalPlacement Placement originally defined on init
 * @property {Boolean} data.flipped True if popper has been flipped by flip modifier
 * @property {Boolean} data.hide True if the reference element is out of boundaries, useful to know when to hide the popper
 * @property {HTMLElement} data.arrowElement Node used as arrow by arrow modifier
 * @property {Object} data.styles Any CSS property defined here will be applied to the popper. It expects the JavaScript nomenclature (eg. `marginBottom`)
 * @property {Object} data.arrowStyles Any CSS property defined here will be applied to the popper arrow. It expects the JavaScript nomenclature (eg. `marginBottom`)
 * @property {Object} data.boundaries Offsets of the popper boundaries
 * @property {Object} data.offsets The measurements of popper, reference and arrow elements
 * @property {Object} data.offsets.popper `top`, `left`, `width`, `height` values
 * @property {Object} data.offsets.reference `top`, `left`, `width`, `height` values
 * @property {Object} data.offsets.arrow] `top` and `left` offsets, only one of them will be different from 0
 */

/**
 * Default options provided to Popper.js constructor.<br />
 * These can be overridden using the `options` argument of Popper.js.<br />
 * To override an option, simply pass an object with the same
 * structure of the `options` object, as the 3rd argument. For example:
 * ```
 * new Popper(ref, pop, {
 *   modifiers: {
 *     preventOverflow: { enabled: false }
 *   }
 * })
 * ```
 * @type {Object}
 * @static
 * @memberof Popper
 */
var Defaults = {
  /**
   * Popper's placement.
   * @prop {Popper.placements} placement='bottom'
   */
  placement: 'bottom',

  /**
   * Set this to true if you want popper to position it self in 'fixed' mode
   * @prop {Boolean} positionFixed=false
   */
  positionFixed: false,

  /**
   * Whether events (resize, scroll) are initially enabled.
   * @prop {Boolean} eventsEnabled=true
   */
  eventsEnabled: true,

  /**
   * Set to true if you want to automatically remove the popper when
   * you call the `destroy` method.
   * @prop {Boolean} removeOnDestroy=false
   */
  removeOnDestroy: false,

  /**
   * Callback called when the popper is created.<br />
   * By default, it is set to no-op.<br />
   * Access Popper.js instance with `data.instance`.
   * @prop {onCreate}
   */
  onCreate: function onCreate() {},

  /**
   * Callback called when the popper is updated. This callback is not called
   * on the initialization/creation of the popper, but only on subsequent
   * updates.<br />
   * By default, it is set to no-op.<br />
   * Access Popper.js instance with `data.instance`.
   * @prop {onUpdate}
   */
  onUpdate: function onUpdate() {},

  /**
   * List of modifiers used to modify the offsets before they are applied to the popper.
   * They provide most of the functionalities of Popper.js.
   * @prop {modifiers}
   */
  modifiers: modifiers
};

/**
 * @callback onCreate
 * @param {dataObject} data
 */

/**
 * @callback onUpdate
 * @param {dataObject} data
 */

// Utils
// Methods
var Popper = function () {
  /**
   * Creates a new Popper.js instance.
   * @class Popper
   * @param {Element|referenceObject} reference - The reference element used to position the popper
   * @param {Element} popper - The HTML / XML element used as the popper
   * @param {Object} options - Your custom options to override the ones defined in [Defaults](#defaults)
   * @return {Object} instance - The generated Popper.js instance
   */
  function Popper(reference, popper) {
    var _this = this;

    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    classCallCheck(this, Popper);

    this.scheduleUpdate = function () {
      return requestAnimationFrame(_this.update);
    };

    // make update() debounced, so that it only runs at most once-per-tick
    this.update = debounce(this.update.bind(this));

    // with {} we create a new object with the options inside it
    this.options = _extends({}, Popper.Defaults, options);

    // init state
    this.state = {
      isDestroyed: false,
      isCreated: false,
      scrollParents: []
    };

    // get reference and popper elements (allow jQuery wrappers)
    this.reference = reference && reference.jquery ? reference[0] : reference;
    this.popper = popper && popper.jquery ? popper[0] : popper;

    // Deep merge modifiers options
    this.options.modifiers = {};
    Object.keys(_extends({}, Popper.Defaults.modifiers, options.modifiers)).forEach(function (name) {
      _this.options.modifiers[name] = _extends({}, Popper.Defaults.modifiers[name] || {}, options.modifiers ? options.modifiers[name] : {});
    });

    // Refactoring modifiers' list (Object => Array)
    this.modifiers = Object.keys(this.options.modifiers).map(function (name) {
      return _extends({
        name: name
      }, _this.options.modifiers[name]);
    })
    // sort the modifiers by order
    .sort(function (a, b) {
      return a.order - b.order;
    });

    // modifiers have the ability to execute arbitrary code when Popper.js get inited
    // such code is executed in the same order of its modifier
    // they could add new properties to their options configuration
    // BE AWARE: don't add options to `options.modifiers.name` but to `modifierOptions`!
    this.modifiers.forEach(function (modifierOptions) {
      if (modifierOptions.enabled && isFunction(modifierOptions.onLoad)) {
        modifierOptions.onLoad(_this.reference, _this.popper, _this.options, modifierOptions, _this.state);
      }
    });

    // fire the first update to position the popper in the right place
    this.update();

    var eventsEnabled = this.options.eventsEnabled;
    if (eventsEnabled) {
      // setup event listeners, they will take care of update the position in specific situations
      this.enableEventListeners();
    }

    this.state.eventsEnabled = eventsEnabled;
  }

  // We can't use class properties because they don't get listed in the
  // class prototype and break stuff like Sinon stubs


  createClass(Popper, [{
    key: 'update',
    value: function update$$1() {
      return update.call(this);
    }
  }, {
    key: 'destroy',
    value: function destroy$$1() {
      return destroy.call(this);
    }
  }, {
    key: 'enableEventListeners',
    value: function enableEventListeners$$1() {
      return enableEventListeners.call(this);
    }
  }, {
    key: 'disableEventListeners',
    value: function disableEventListeners$$1() {
      return disableEventListeners.call(this);
    }

    /**
     * Schedules an update. It will run on the next UI update available.
     * @method scheduleUpdate
     * @memberof Popper
     */


    /**
     * Collection of utilities useful when writing custom modifiers.
     * Starting from version 1.7, this method is available only if you
     * include `popper-utils.js` before `popper.js`.
     *
     * **DEPRECATION**: This way to access PopperUtils is deprecated
     * and will be removed in v2! Use the PopperUtils module directly instead.
     * Due to the high instability of the methods contained in Utils, we can't
     * guarantee them to follow semver. Use them at your own risk!
     * @static
     * @private
     * @type {Object}
     * @deprecated since version 1.8
     * @member Utils
     * @memberof Popper
     */

  }]);
  return Popper;
}();

/**
 * The `referenceObject` is an object that provides an interface compatible with Popper.js
 * and lets you use it as replacement of a real DOM node.<br />
 * You can use this method to position a popper relatively to a set of coordinates
 * in case you don't have a DOM node to use as reference.
 *
 * ```
 * new Popper(referenceObject, popperNode);
 * ```
 *
 * NB: This feature isn't supported in Internet Explorer 10.
 * @name referenceObject
 * @property {Function} data.getBoundingClientRect
 * A function that returns a set of coordinates compatible with the native `getBoundingClientRect` method.
 * @property {number} data.clientWidth
 * An ES6 getter that will return the width of the virtual reference element.
 * @property {number} data.clientHeight
 * An ES6 getter that will return the height of the virtual reference element.
 */


Popper.Utils = (typeof window !== 'undefined' ? window : global).PopperUtils;
Popper.placements = placements;
Popper.Defaults = Defaults;

/* harmony default export */ __webpack_exports__["default"] = (Popper);
//# sourceMappingURL=popper.js.map

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../prompto/prompto-widgets/react-bootstrap-3/node_modules/webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "../../../react-bootstrap-typeahead/node_modules/react-overlays/RootCloseWrapper.js":
/*!*****************************************************************************************************************!*\
  !*** /Users/ericvergnaud/Development/react-bootstrap-typeahead/node_modules/react-overlays/RootCloseWrapper.js ***!
  \*****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _contains = _interopRequireDefault(__webpack_require__(/*! dom-helpers/query/contains */ "../../../react-bootstrap-typeahead/node_modules/dom-helpers/query/contains.js"));

var _listen = _interopRequireDefault(__webpack_require__(/*! dom-helpers/events/listen */ "../../../react-bootstrap-typeahead/node_modules/dom-helpers/events/listen.js"));

var _propTypes = _interopRequireDefault(__webpack_require__(/*! prop-types */ "prop-types"));

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "react"));

var _reactDom = _interopRequireDefault(__webpack_require__(/*! react-dom */ "react-dom"));

var _ownerDocument = _interopRequireDefault(__webpack_require__(/*! ./utils/ownerDocument */ "../../../react-bootstrap-typeahead/node_modules/react-overlays/utils/ownerDocument.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

var escapeKeyCode = 27;

var noop = function noop() {};

function isLeftClickEvent(event) {
  return event.button === 0;
}

function isModifiedEvent(event) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}
/**
 * The `<RootCloseWrapper/>` component registers your callback on the document
 * when rendered. Powers the `<Overlay/>` component. This is used achieve modal
 * style behavior where your callback is triggered when the user tries to
 * interact with the rest of the document or hits the `esc` key.
 */


var RootCloseWrapper =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(RootCloseWrapper, _React$Component);

  function RootCloseWrapper(props, context) {
    var _this;

    _this = _React$Component.call(this, props, context) || this;

    _this.addEventListeners = function () {
      var event = _this.props.event;
      var doc = (0, _ownerDocument.default)(_assertThisInitialized(_assertThisInitialized(_this))); // Use capture for this listener so it fires before React's listener, to
      // avoid false positives in the contains() check below if the target DOM
      // element is removed in the React mouse callback.

      _this.removeMouseCaptureListener = (0, _listen.default)(doc, event, _this.handleMouseCapture, true);
      _this.removeMouseListener = (0, _listen.default)(doc, event, _this.handleMouse);
      _this.removeKeyupListener = (0, _listen.default)(doc, 'keyup', _this.handleKeyUp);

      if ('ontouchstart' in doc.documentElement) {
        _this.mobileSafariHackListeners = [].slice.call(document.body.children).map(function (el) {
          return (0, _listen.default)(el, 'mousemove', noop);
        });
      }
    };

    _this.removeEventListeners = function () {
      if (_this.removeMouseCaptureListener) _this.removeMouseCaptureListener();
      if (_this.removeMouseListener) _this.removeMouseListener();
      if (_this.removeKeyupListener) _this.removeKeyupListener();
      if (_this.mobileSafariHackListeners) _this.mobileSafariHackListeners.forEach(function (remove) {
        return remove();
      });
    };

    _this.handleMouseCapture = function (e) {
      _this.preventMouseRootClose = isModifiedEvent(e) || !isLeftClickEvent(e) || (0, _contains.default)(_reactDom.default.findDOMNode(_assertThisInitialized(_assertThisInitialized(_this))), e.target);
    };

    _this.handleMouse = function (e) {
      if (!_this.preventMouseRootClose && _this.props.onRootClose) {
        _this.props.onRootClose(e);
      }
    };

    _this.handleKeyUp = function (e) {
      if (e.keyCode === escapeKeyCode && _this.props.onRootClose) {
        _this.props.onRootClose(e);
      }
    };

    _this.preventMouseRootClose = false;
    return _this;
  }

  var _proto = RootCloseWrapper.prototype;

  _proto.componentDidMount = function componentDidMount() {
    if (!this.props.disabled) {
      this.addEventListeners();
    }
  };

  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    if (!this.props.disabled && prevProps.disabled) {
      this.addEventListeners();
    } else if (this.props.disabled && !prevProps.disabled) {
      this.removeEventListeners();
    }
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    if (!this.props.disabled) {
      this.removeEventListeners();
    }
  };

  _proto.render = function render() {
    return this.props.children;
  };

  return RootCloseWrapper;
}(_react.default.Component);

RootCloseWrapper.displayName = 'RootCloseWrapper';
RootCloseWrapper.propTypes = {
  /**
   * Callback fired after click or mousedown. Also triggers when user hits `esc`.
   */
  onRootClose: _propTypes.default.func,

  /**
   * Children to render.
   */
  children: _propTypes.default.element,

  /**
   * Disable the the RootCloseWrapper, preventing it from triggering `onRootClose`.
   */
  disabled: _propTypes.default.bool,

  /**
   * Choose which document mouse event to bind to.
   */
  event: _propTypes.default.oneOf(['click', 'mousedown'])
};
RootCloseWrapper.defaultProps = {
  event: 'click'
};
var _default = RootCloseWrapper;
exports.default = _default;
module.exports = exports.default;

/***/ }),

/***/ "../../../react-bootstrap-typeahead/node_modules/react-overlays/utils/ownerDocument.js":
/*!********************************************************************************************************************!*\
  !*** /Users/ericvergnaud/Development/react-bootstrap-typeahead/node_modules/react-overlays/utils/ownerDocument.js ***!
  \********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = _default;

var _reactDom = _interopRequireDefault(__webpack_require__(/*! react-dom */ "react-dom"));

var _ownerDocument = _interopRequireDefault(__webpack_require__(/*! dom-helpers/ownerDocument */ "../../../react-bootstrap-typeahead/node_modules/dom-helpers/ownerDocument.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default(componentOrElement) {
  return (0, _ownerDocument.default)(_reactDom.default.findDOMNode(componentOrElement));
}

module.exports = exports.default;

/***/ }),

/***/ "../../../react-bootstrap-typeahead/node_modules/react-popper/lib/esm/Manager.js":
/*!**************************************************************************************************************!*\
  !*** /Users/ericvergnaud/Development/react-bootstrap-typeahead/node_modules/react-popper/lib/esm/Manager.js ***!
  \**************************************************************************************************************/
/*! exports provided: ManagerReferenceNodeContext, ManagerReferenceNodeSetterContext, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ManagerReferenceNodeContext", function() { return ManagerReferenceNodeContext; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ManagerReferenceNodeSetterContext", function() { return ManagerReferenceNodeSetterContext; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Manager; });
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "../../../react-bootstrap-typeahead/node_modules/@babel/runtime/helpers/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/inheritsLoose */ "../../../react-bootstrap-typeahead/node_modules/@babel/runtime/helpers/inheritsLoose.js");
/* harmony import */ var _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../../../react-bootstrap-typeahead/node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var create_react_context__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! create-react-context */ "../../../react-bootstrap-typeahead/node_modules/create-react-context/lib/index.js");
/* harmony import */ var create_react_context__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(create_react_context__WEBPACK_IMPORTED_MODULE_4__);





var ManagerReferenceNodeContext = create_react_context__WEBPACK_IMPORTED_MODULE_4___default()();
var ManagerReferenceNodeSetterContext = create_react_context__WEBPACK_IMPORTED_MODULE_4___default()();

var Manager =
/*#__PURE__*/
function (_React$Component) {
  _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_1___default()(Manager, _React$Component);

  function Manager() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_0___default()(_this), "referenceNode", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_0___default()(_this), "setReferenceNode", function (newReferenceNode) {
      if (newReferenceNode && _this.referenceNode !== newReferenceNode) {
        _this.referenceNode = newReferenceNode;

        _this.forceUpdate();
      }
    });

    return _this;
  }

  var _proto = Manager.prototype;

  _proto.componentWillUnmount = function componentWillUnmount() {
    this.referenceNode = null;
  };

  _proto.render = function render() {
    return react__WEBPACK_IMPORTED_MODULE_3__["createElement"](ManagerReferenceNodeContext.Provider, {
      value: this.referenceNode
    }, react__WEBPACK_IMPORTED_MODULE_3__["createElement"](ManagerReferenceNodeSetterContext.Provider, {
      value: this.setReferenceNode
    }, this.props.children));
  };

  return Manager;
}(react__WEBPACK_IMPORTED_MODULE_3__["Component"]);



/***/ }),

/***/ "../../../react-bootstrap-typeahead/node_modules/react-popper/lib/esm/Popper.js":
/*!*************************************************************************************************************!*\
  !*** /Users/ericvergnaud/Development/react-bootstrap-typeahead/node_modules/react-popper/lib/esm/Popper.js ***!
  \*************************************************************************************************************/
/*! exports provided: InnerPopper, placements, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InnerPopper", function() { return InnerPopper; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "placements", function() { return placements; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Popper; });
/* harmony import */ var _babel_runtime_helpers_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/objectWithoutPropertiesLoose */ "../../../react-bootstrap-typeahead/node_modules/@babel/runtime/helpers/objectWithoutPropertiesLoose.js");
/* harmony import */ var _babel_runtime_helpers_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "../../../react-bootstrap-typeahead/node_modules/@babel/runtime/helpers/extends.js");
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "../../../react-bootstrap-typeahead/node_modules/@babel/runtime/helpers/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/inheritsLoose */ "../../../react-bootstrap-typeahead/node_modules/@babel/runtime/helpers/inheritsLoose.js");
/* harmony import */ var _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../../../react-bootstrap-typeahead/node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var deep_equal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! deep-equal */ "../../../react-bootstrap-typeahead/node_modules/deep-equal/index.js");
/* harmony import */ var deep_equal__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(deep_equal__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var popper_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! popper.js */ "../../../react-bootstrap-typeahead/node_modules/popper.js/dist/esm/popper.js");
/* harmony import */ var _Manager__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Manager */ "../../../react-bootstrap-typeahead/node_modules/react-popper/lib/esm/Manager.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./utils */ "../../../react-bootstrap-typeahead/node_modules/react-popper/lib/esm/utils.js");










var initialStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  opacity: 0,
  pointerEvents: 'none'
};
var initialArrowStyle = {};
var InnerPopper =
/*#__PURE__*/
function (_React$Component) {
  _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_3___default()(InnerPopper, _React$Component);

  function InnerPopper() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default()(_this), "state", {
      data: undefined,
      placement: undefined
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default()(_this), "popperInstance", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default()(_this), "popperNode", null);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default()(_this), "arrowNode", null);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default()(_this), "setPopperNode", function (popperNode) {
      if (!popperNode || _this.popperNode === popperNode) return;
      Object(_utils__WEBPACK_IMPORTED_MODULE_9__["setRef"])(_this.props.innerRef, popperNode);
      _this.popperNode = popperNode;

      _this.updatePopperInstance();
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default()(_this), "setArrowNode", function (arrowNode) {
      _this.arrowNode = arrowNode;
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default()(_this), "updateStateModifier", {
      enabled: true,
      order: 900,
      fn: function fn(data) {
        var placement = data.placement;

        _this.setState({
          data: data,
          placement: placement
        });

        return data;
      }
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default()(_this), "getOptions", function () {
      return {
        placement: _this.props.placement,
        eventsEnabled: _this.props.eventsEnabled,
        positionFixed: _this.props.positionFixed,
        modifiers: _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1___default()({}, _this.props.modifiers, {
          arrow: _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1___default()({}, _this.props.modifiers && _this.props.modifiers.arrow, {
            enabled: !!_this.arrowNode,
            element: _this.arrowNode
          }),
          applyStyle: {
            enabled: false
          },
          updateStateModifier: _this.updateStateModifier
        })
      };
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default()(_this), "getPopperStyle", function () {
      return !_this.popperNode || !_this.state.data ? initialStyle : _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1___default()({
        position: _this.state.data.offsets.popper.position
      }, _this.state.data.styles);
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default()(_this), "getPopperPlacement", function () {
      return !_this.state.data ? undefined : _this.state.placement;
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default()(_this), "getArrowStyle", function () {
      return !_this.arrowNode || !_this.state.data ? initialArrowStyle : _this.state.data.arrowStyles;
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default()(_this), "getOutOfBoundariesState", function () {
      return _this.state.data ? _this.state.data.hide : undefined;
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default()(_this), "destroyPopperInstance", function () {
      if (!_this.popperInstance) return;

      _this.popperInstance.destroy();

      _this.popperInstance = null;
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default()(_this), "updatePopperInstance", function () {
      _this.destroyPopperInstance();

      var _assertThisInitialize = _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default()(_this),
          popperNode = _assertThisInitialize.popperNode;

      var referenceElement = _this.props.referenceElement;
      if (!referenceElement || !popperNode) return;
      _this.popperInstance = new popper_js__WEBPACK_IMPORTED_MODULE_7__["default"](referenceElement, popperNode, _this.getOptions());
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default()(_this), "scheduleUpdate", function () {
      if (_this.popperInstance) {
        _this.popperInstance.scheduleUpdate();
      }
    });

    return _this;
  }

  var _proto = InnerPopper.prototype;

  _proto.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {
    // If the Popper.js options have changed, update the instance (destroy + create)
    if (this.props.placement !== prevProps.placement || this.props.referenceElement !== prevProps.referenceElement || this.props.positionFixed !== prevProps.positionFixed || !deep_equal__WEBPACK_IMPORTED_MODULE_5___default()(this.props.modifiers, prevProps.modifiers, {
      strict: true
    })) {
      // develop only check that modifiers isn't being updated needlessly
      if (true) {
        if (this.props.modifiers !== prevProps.modifiers && this.props.modifiers != null && prevProps.modifiers != null && Object(_utils__WEBPACK_IMPORTED_MODULE_9__["shallowEqual"])(this.props.modifiers, prevProps.modifiers)) {
          console.warn("'modifiers' prop reference updated even though all values appear the same.\nConsider memoizing the 'modifiers' object to avoid needless rendering.");
        }
      }

      this.updatePopperInstance();
    } else if (this.props.eventsEnabled !== prevProps.eventsEnabled && this.popperInstance) {
      this.props.eventsEnabled ? this.popperInstance.enableEventListeners() : this.popperInstance.disableEventListeners();
    } // A placement difference in state means popper determined a new placement
    // apart from the props value. By the time the popper element is rendered with
    // the new position Popper has already measured it, if the place change triggers
    // a size change it will result in a misaligned popper. So we schedule an update to be sure.


    if (prevState.placement !== this.state.placement) {
      this.scheduleUpdate();
    }
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    Object(_utils__WEBPACK_IMPORTED_MODULE_9__["setRef"])(this.props.innerRef, null);
    this.destroyPopperInstance();
  };

  _proto.render = function render() {
    return Object(_utils__WEBPACK_IMPORTED_MODULE_9__["unwrapArray"])(this.props.children)({
      ref: this.setPopperNode,
      style: this.getPopperStyle(),
      placement: this.getPopperPlacement(),
      outOfBoundaries: this.getOutOfBoundariesState(),
      scheduleUpdate: this.scheduleUpdate,
      arrowProps: {
        ref: this.setArrowNode,
        style: this.getArrowStyle()
      }
    });
  };

  return InnerPopper;
}(react__WEBPACK_IMPORTED_MODULE_6__["Component"]);

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(InnerPopper, "defaultProps", {
  placement: 'bottom',
  eventsEnabled: true,
  referenceElement: undefined,
  positionFixed: false
});

var placements = popper_js__WEBPACK_IMPORTED_MODULE_7__["default"].placements;

function Popper(_ref) {
  var referenceElement = _ref.referenceElement,
      props = _babel_runtime_helpers_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_0___default()(_ref, ["referenceElement"]);

  return react__WEBPACK_IMPORTED_MODULE_6__["createElement"](_Manager__WEBPACK_IMPORTED_MODULE_8__["ManagerReferenceNodeContext"].Consumer, null, function (referenceNode) {
    return react__WEBPACK_IMPORTED_MODULE_6__["createElement"](InnerPopper, _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1___default()({
      referenceElement: referenceElement !== undefined ? referenceElement : referenceNode
    }, props));
  });
}

/***/ }),

/***/ "../../../react-bootstrap-typeahead/node_modules/react-popper/lib/esm/Reference.js":
/*!****************************************************************************************************************!*\
  !*** /Users/ericvergnaud/Development/react-bootstrap-typeahead/node_modules/react-popper/lib/esm/Reference.js ***!
  \****************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Reference; });
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "../../../react-bootstrap-typeahead/node_modules/@babel/runtime/helpers/extends.js");
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "../../../react-bootstrap-typeahead/node_modules/@babel/runtime/helpers/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/inheritsLoose */ "../../../react-bootstrap-typeahead/node_modules/@babel/runtime/helpers/inheritsLoose.js");
/* harmony import */ var _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../../../react-bootstrap-typeahead/node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var warning__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! warning */ "../../../react-bootstrap-typeahead/node_modules/warning/warning.js");
/* harmony import */ var warning__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(warning__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _Manager__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Manager */ "../../../react-bootstrap-typeahead/node_modules/react-popper/lib/esm/Manager.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./utils */ "../../../react-bootstrap-typeahead/node_modules/react-popper/lib/esm/utils.js");









var InnerReference =
/*#__PURE__*/
function (_React$Component) {
  _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_2___default()(InnerReference, _React$Component);

  function InnerReference() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "refHandler", function (node) {
      Object(_utils__WEBPACK_IMPORTED_MODULE_7__["setRef"])(_this.props.innerRef, node);
      Object(_utils__WEBPACK_IMPORTED_MODULE_7__["safeInvoke"])(_this.props.setReferenceNode, node);
    });

    return _this;
  }

  var _proto = InnerReference.prototype;

  _proto.componentWillUnmount = function componentWillUnmount() {
    Object(_utils__WEBPACK_IMPORTED_MODULE_7__["setRef"])(this.props.innerRef, null);
  };

  _proto.render = function render() {
    warning__WEBPACK_IMPORTED_MODULE_5___default()(Boolean(this.props.setReferenceNode), '`Reference` should not be used outside of a `Manager` component.');
    return Object(_utils__WEBPACK_IMPORTED_MODULE_7__["unwrapArray"])(this.props.children)({
      ref: this.refHandler
    });
  };

  return InnerReference;
}(react__WEBPACK_IMPORTED_MODULE_4__["Component"]);

function Reference(props) {
  return react__WEBPACK_IMPORTED_MODULE_4__["createElement"](_Manager__WEBPACK_IMPORTED_MODULE_6__["ManagerReferenceNodeSetterContext"].Consumer, null, function (setReferenceNode) {
    return react__WEBPACK_IMPORTED_MODULE_4__["createElement"](InnerReference, _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({
      setReferenceNode: setReferenceNode
    }, props));
  });
}

/***/ }),

/***/ "../../../react-bootstrap-typeahead/node_modules/react-popper/lib/esm/index.js":
/*!************************************************************************************************************!*\
  !*** /Users/ericvergnaud/Development/react-bootstrap-typeahead/node_modules/react-popper/lib/esm/index.js ***!
  \************************************************************************************************************/
/*! exports provided: Popper, placements, Manager, Reference */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Popper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Popper */ "../../../react-bootstrap-typeahead/node_modules/react-popper/lib/esm/Popper.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Popper", function() { return _Popper__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "placements", function() { return _Popper__WEBPACK_IMPORTED_MODULE_0__["placements"]; });

/* harmony import */ var _Manager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Manager */ "../../../react-bootstrap-typeahead/node_modules/react-popper/lib/esm/Manager.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Manager", function() { return _Manager__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _Reference__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Reference */ "../../../react-bootstrap-typeahead/node_modules/react-popper/lib/esm/Reference.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Reference", function() { return _Reference__WEBPACK_IMPORTED_MODULE_2__["default"]; });

// Public components



 // Public types

/***/ }),

/***/ "../../../react-bootstrap-typeahead/node_modules/react-popper/lib/esm/utils.js":
/*!************************************************************************************************************!*\
  !*** /Users/ericvergnaud/Development/react-bootstrap-typeahead/node_modules/react-popper/lib/esm/utils.js ***!
  \************************************************************************************************************/
/*! exports provided: unwrapArray, safeInvoke, shallowEqual, setRef */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "unwrapArray", function() { return unwrapArray; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "safeInvoke", function() { return safeInvoke; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "shallowEqual", function() { return shallowEqual; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setRef", function() { return setRef; });
/**
 * Takes an argument and if it's an array, returns the first item in the array,
 * otherwise returns the argument. Used for Preact compatibility.
 */
var unwrapArray = function unwrapArray(arg) {
  return Array.isArray(arg) ? arg[0] : arg;
};
/**
 * Takes a maybe-undefined function and arbitrary args and invokes the function
 * only if it is defined.
 */

var safeInvoke = function safeInvoke(fn) {
  if (typeof fn === "function") {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    return fn.apply(void 0, args);
  }
};
/**
 * Does a shallow equality check of two objects by comparing the reference
 * equality of each value.
 */

var shallowEqual = function shallowEqual(objA, objB) {
  var aKeys = Object.keys(objA);
  var bKeys = Object.keys(objB);

  if (bKeys.length !== aKeys.length) {
    return false;
  }

  for (var i = 0; i < bKeys.length; i++) {
    var key = aKeys[i];

    if (objA[key] !== objB[key]) {
      return false;
    }
  }

  return true;
};
/**
 * Sets a ref using either a ref callback or a ref object
 */

var setRef = function setRef(ref, node) {
  // if its a function call it
  if (typeof ref === "function") {
    return safeInvoke(ref, node);
  } // otherwise we should treat it as a ref object
  else if (ref != null) {
      ref.current = node;
    }
};

/***/ }),

/***/ "../../../react-bootstrap-typeahead/node_modules/regexp.prototype.flags/implementation.js":
/*!***********************************************************************************************************************!*\
  !*** /Users/ericvergnaud/Development/react-bootstrap-typeahead/node_modules/regexp.prototype.flags/implementation.js ***!
  \***********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $Object = Object;
var $TypeError = TypeError;

module.exports = function flags() {
	if (this != null && this !== $Object(this)) {
		throw new $TypeError('RegExp.prototype.flags getter called on non-object');
	}
	var result = '';
	if (this.global) {
		result += 'g';
	}
	if (this.ignoreCase) {
		result += 'i';
	}
	if (this.multiline) {
		result += 'm';
	}
	if (this.dotAll) {
		result += 's';
	}
	if (this.unicode) {
		result += 'u';
	}
	if (this.sticky) {
		result += 'y';
	}
	return result;
};


/***/ }),

/***/ "../../../react-bootstrap-typeahead/node_modules/regexp.prototype.flags/index.js":
/*!**************************************************************************************************************!*\
  !*** /Users/ericvergnaud/Development/react-bootstrap-typeahead/node_modules/regexp.prototype.flags/index.js ***!
  \**************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var define = __webpack_require__(/*! define-properties */ "../../../react-bootstrap-typeahead/node_modules/define-properties/index.js");
var callBind = __webpack_require__(/*! es-abstract/helpers/callBind */ "../../../react-bootstrap-typeahead/node_modules/es-abstract/helpers/callBind.js");

var implementation = __webpack_require__(/*! ./implementation */ "../../../react-bootstrap-typeahead/node_modules/regexp.prototype.flags/implementation.js");
var getPolyfill = __webpack_require__(/*! ./polyfill */ "../../../react-bootstrap-typeahead/node_modules/regexp.prototype.flags/polyfill.js");
var shim = __webpack_require__(/*! ./shim */ "../../../react-bootstrap-typeahead/node_modules/regexp.prototype.flags/shim.js");

var flagsBound = callBind(implementation);

define(flagsBound, {
	getPolyfill: getPolyfill,
	implementation: implementation,
	shim: shim
});

module.exports = flagsBound;


/***/ }),

/***/ "../../../react-bootstrap-typeahead/node_modules/regexp.prototype.flags/polyfill.js":
/*!*****************************************************************************************************************!*\
  !*** /Users/ericvergnaud/Development/react-bootstrap-typeahead/node_modules/regexp.prototype.flags/polyfill.js ***!
  \*****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var implementation = __webpack_require__(/*! ./implementation */ "../../../react-bootstrap-typeahead/node_modules/regexp.prototype.flags/implementation.js");

var supportsDescriptors = __webpack_require__(/*! define-properties */ "../../../react-bootstrap-typeahead/node_modules/define-properties/index.js").supportsDescriptors;
var $gOPD = Object.getOwnPropertyDescriptor;
var $TypeError = TypeError;

module.exports = function getPolyfill() {
	if (!supportsDescriptors) {
		throw new $TypeError('RegExp.prototype.flags requires a true ES5 environment that supports property descriptors');
	}
	if ((/a/mig).flags === 'gim') {
		var descriptor = $gOPD(RegExp.prototype, 'flags');
		if (descriptor && typeof descriptor.get === 'function' && typeof (/a/).dotAll === 'boolean') {
			return descriptor.get;
		}
	}
	return implementation;
};


/***/ }),

/***/ "../../../react-bootstrap-typeahead/node_modules/regexp.prototype.flags/shim.js":
/*!*************************************************************************************************************!*\
  !*** /Users/ericvergnaud/Development/react-bootstrap-typeahead/node_modules/regexp.prototype.flags/shim.js ***!
  \*************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var supportsDescriptors = __webpack_require__(/*! define-properties */ "../../../react-bootstrap-typeahead/node_modules/define-properties/index.js").supportsDescriptors;
var getPolyfill = __webpack_require__(/*! ./polyfill */ "../../../react-bootstrap-typeahead/node_modules/regexp.prototype.flags/polyfill.js");
var gOPD = Object.getOwnPropertyDescriptor;
var defineProperty = Object.defineProperty;
var TypeErr = TypeError;
var getProto = Object.getPrototypeOf;
var regex = /a/;

module.exports = function shimFlags() {
	if (!supportsDescriptors || !getProto) {
		throw new TypeErr('RegExp.prototype.flags requires a true ES5 environment that supports property descriptors');
	}
	var polyfill = getPolyfill();
	var proto = getProto(regex);
	var descriptor = gOPD(proto, 'flags');
	if (!descriptor || descriptor.get !== polyfill) {
		defineProperty(proto, 'flags', {
			configurable: true,
			enumerable: false,
			get: polyfill
		});
	}
	return polyfill;
};


/***/ }),

/***/ "../../../react-bootstrap-typeahead/node_modules/scroll-into-view-if-needed/es/index.js":
/*!*********************************************************************************************************************!*\
  !*** /Users/ericvergnaud/Development/react-bootstrap-typeahead/node_modules/scroll-into-view-if-needed/es/index.js ***!
  \*********************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var compute_scroll_into_view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! compute-scroll-into-view */ "../../../react-bootstrap-typeahead/node_modules/compute-scroll-into-view/es/index.js");


function isOptionsObject(options) {
  return options === Object(options) && Object.keys(options).length !== 0;
}

function defaultBehavior(actions, behavior) {
  if (behavior === void 0) {
    behavior = 'auto';
  }

  var canSmoothScroll = 'scrollBehavior' in document.body.style;
  actions.forEach(function (_ref) {
    var el = _ref.el,
        top = _ref.top,
        left = _ref.left;

    if (el.scroll && canSmoothScroll) {
      el.scroll({
        top: top,
        left: left,
        behavior: behavior
      });
    } else {
      el.scrollTop = top;
      el.scrollLeft = left;
    }
  });
}

function getOptions(options) {
  if (options === false) {
    return {
      block: 'end',
      inline: 'nearest'
    };
  }

  if (isOptionsObject(options)) {
    return options;
  }

  return {
    block: 'start',
    inline: 'nearest'
  };
}

function scrollIntoView(target, options) {
  var targetIsDetached = !target.ownerDocument.documentElement.contains(target);

  if (isOptionsObject(options) && typeof options.behavior === 'function') {
    return options.behavior(targetIsDetached ? [] : Object(compute_scroll_into_view__WEBPACK_IMPORTED_MODULE_0__["default"])(target, options));
  }

  if (targetIsDetached) {
    return;
  }

  var computeOptions = getOptions(options);
  return defaultBehavior(Object(compute_scroll_into_view__WEBPACK_IMPORTED_MODULE_0__["default"])(target, computeOptions), computeOptions.behavior);
}

/* harmony default export */ __webpack_exports__["default"] = (scrollIntoView);

/***/ }),

/***/ "../../../react-bootstrap-typeahead/node_modules/warning/warning.js":
/*!*************************************************************************************************!*\
  !*** /Users/ericvergnaud/Development/react-bootstrap-typeahead/node_modules/warning/warning.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var __DEV__ = "development" !== 'production';

var warning = function() {};

if (__DEV__) {
  var printWarning = function printWarning(format, args) {
    var len = arguments.length;
    args = new Array(len > 1 ? len - 1 : 0);
    for (var key = 1; key < len; key++) {
      args[key - 1] = arguments[key];
    }
    var argIndex = 0;
    var message = 'Warning: ' +
      format.replace(/%s/g, function() {
        return args[argIndex++];
      });
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  }

  warning = function(condition, format, args) {
    var len = arguments.length;
    args = new Array(len > 2 ? len - 2 : 0);
    for (var key = 2; key < len; key++) {
      args[key - 2] = arguments[key];
    }
    if (format === undefined) {
      throw new Error(
          '`warning(condition, format, ...args)` requires a warning ' +
          'message argument'
      );
    }
    if (!condition) {
      printWarning.apply(null, [format].concat(args));
    }
  };
}

module.exports = warning;


/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./react-bootstrap-3-widgets.js":
/*!**************************************!*\
  !*** ./react-bootstrap-3-widgets.js ***!
  \**************************************/
/*! exports provided: ReactBootstrapExtras */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReactBootstrapExtras", function() { return ReactBootstrapExtras; });
/* harmony import */ var _src_datepicker_DatePicker__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/datepicker/DatePicker */ "./src/datepicker/DatePicker.js");
/* harmony import */ var _src_typeahead_PromptoTypeahead__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./src/typeahead/PromptoTypeahead */ "./src/typeahead/PromptoTypeahead.js");
/* harmony import */ var _src_contextmenu_ContextMenu__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./src/contextmenu/ContextMenu */ "./src/contextmenu/ContextMenu.js");



var ReactBootstrapExtras = {
  ContextMenu: _src_contextmenu_ContextMenu__WEBPACK_IMPORTED_MODULE_2__["default"],
  DatePicker: _src_datepicker_DatePicker__WEBPACK_IMPORTED_MODULE_0__["default"],
  Typeahead: _src_typeahead_PromptoTypeahead__WEBPACK_IMPORTED_MODULE_1__["default"] // noinspection JSUnresolvedVariable

};
ReactBootstrap = Object.assign(ReactBootstrap, ReactBootstrapExtras);

/***/ }),

/***/ "./src/contextmenu/ContextMenu.js":
/*!****************************************!*\
  !*** ./src/contextmenu/ContextMenu.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ContextMenu; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-bootstrap */ "react-bootstrap");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }




var ContextMenu =
/*#__PURE__*/
function (_React$Component) {
  _inherits(ContextMenu, _React$Component);

  function ContextMenu() {
    _classCallCheck(this, ContextMenu);

    return _possibleConstructorReturn(this, _getPrototypeOf(ContextMenu).apply(this, arguments));
  }

  _createClass(ContextMenu, [{
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Clearfix"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
        className: "dropdown-menu",
        style: {
          display: "block"
        }
      }, this.props.children));
    }
  }]);

  return ContextMenu;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);



/***/ }),

/***/ "./src/datepicker/DatePicker.js":
/*!**************************************!*\
  !*** ./src/datepicker/DatePicker.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return DatePicker; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "prop-types");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-dom */ "react-dom");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-bootstrap */ "react-bootstrap");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

// See http://jszen.blogspot.com/2007/03/how-to-build-simple-calendar-with.html for calendar logic.




var instanceCount = 0;

var DatePickerHeader =
/*#__PURE__*/
function (_React$Component) {
  _inherits(DatePickerHeader, _React$Component);

  function DatePickerHeader() {
    _classCallCheck(this, DatePickerHeader);

    return _possibleConstructorReturn(this, _getPrototypeOf(DatePickerHeader).apply(this, arguments));
  }

  _createClass(DatePickerHeader, [{
    key: "displayingMinMonth",
    value: function displayingMinMonth() {
      if (!this.props.minDate) return false;
      var displayDate = new Date(this.props.displayDate);
      var minDate = new Date(this.props.minDate);
      return minDate.getFullYear() === displayDate.getFullYear() && minDate.getMonth() === displayDate.getMonth();
    }
  }, {
    key: "displayingMaxMonth",
    value: function displayingMaxMonth() {
      if (!this.props.maxDate) return false;
      var displayDate = new Date(this.props.displayDate);
      var maxDate = new Date(this.props.maxDate);
      return maxDate.getFullYear() === displayDate.getFullYear() && maxDate.getMonth() === displayDate.getMonth();
    }
  }, {
    key: "handleClickPrevious",
    value: function handleClickPrevious() {
      var newDisplayDate = new Date(this.props.displayDate);
      newDisplayDate.setDate(1);
      newDisplayDate.setMonth(newDisplayDate.getMonth() - 1);
      this.props.onChange(newDisplayDate);
    }
  }, {
    key: "handleClickNext",
    value: function handleClickNext() {
      var newDisplayDate = new Date(this.props.displayDate);
      newDisplayDate.setDate(1);
      newDisplayDate.setMonth(newDisplayDate.getMonth() + 1);
      this.props.onChange(newDisplayDate);
    }
  }, {
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "text-center"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "text-muted pull-left datepicker-previous-wrapper",
        onClick: this.handleClickPrevious.bind(this),
        style: {
          cursor: 'pointer'
        }
      }, this.displayingMinMonth() ? null : this.props.previousButtonElement), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, this.props.monthLabels[this.props.displayDate.getMonth()], " ", this.props.displayDate.getFullYear()), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "text-muted pull-right datepicker-next-wrapper",
        onClick: this.handleClickNext.bind(this),
        style: {
          cursor: 'pointer'
        }
      }, this.displayingMaxMonth() ? null : this.props.nextButtonElement));
    }
  }]);

  return DatePickerHeader;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

DatePickerHeader.propTypes = {
  displayDate: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object.isRequired,
  minDate: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
  maxDate: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
  onChange: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired,
  monthLabels: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.array.isRequired,
  previousButtonElement: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string, prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object]).isRequired,
  nextButtonElement: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string, prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object]).isRequired
};
var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

var DatePickerCalendar =
/*#__PURE__*/
function (_React$Component2) {
  _inherits(DatePickerCalendar, _React$Component2);

  function DatePickerCalendar() {
    _classCallCheck(this, DatePickerCalendar);

    return _possibleConstructorReturn(this, _getPrototypeOf(DatePickerCalendar).apply(this, arguments));
  }

  _createClass(DatePickerCalendar, [{
    key: "handleClick",
    value: function handleClick(e) {
      var day = e.currentTarget.getAttribute('data-day');
      var newSelectedDate = this.setTimeToNoon(new Date(this.props.displayDate));
      newSelectedDate.setDate(day);
      this.props.onChange(newSelectedDate);
    }
  }, {
    key: "handleClickToday",
    value: function handleClickToday() {
      var newSelectedDate = this.setTimeToNoon(new Date());
      this.props.onChange(newSelectedDate);
    }
  }, {
    key: "setTimeToNoon",
    value: function setTimeToNoon(date) {
      date.setHours(12);
      date.setMinutes(0);
      date.setSeconds(0);
      date.setMilliseconds(0);
      return date;
    }
  }, {
    key: "getWeekNumber",
    value: function getWeekNumber(date) {
      var target = new Date(date.valueOf());
      var dayNr = (date.getDay() + 6) % 7;
      target.setDate(target.getDate() - dayNr + 3);
      var firstThursday = target.valueOf();
      target.setMonth(0, 1);

      if (target.getDay() !== 4) {
        target.setMonth(0, 1 + (4 - target.getDay() + 7) % 7);
      }

      return 1 + Math.ceil((firstThursday - target) / 604800000);
    }
  }, {
    key: "render",
    value: function render() {
      var _this = this;

      var currentDate = this.setTimeToNoon(new Date());
      var selectedDate = this.props.selectedDate ? this.setTimeToNoon(new Date(this.props.selectedDate)) : null;
      var minDate = this.props.minDate ? this.setTimeToNoon(new Date(this.props.minDate)) : null;
      var maxDate = this.props.maxDate ? this.setTimeToNoon(new Date(this.props.maxDate)) : null;
      var year = this.props.displayDate.getFullYear();
      var month = this.props.displayDate.getMonth();
      var firstDay = new Date(year, month, 1);
      var startingDay = this.props.weekStartsOn > 1 ? firstDay.getDay() - this.props.weekStartsOn + 7 : this.props.weekStartsOn === 1 ? firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1 : firstDay.getDay();
      var showWeeks = this.props.showWeeks;
      var monthLength = daysInMonth[month];

      if (month === 1) {
        if (year % 4 === 0 && year % 100 !== 0 || year % 400 === 0) {
          monthLength = 29;
        }
      }

      var weeks = [];
      var day = 1;

      for (var i = 0; i < 9; i++) {
        var week = [];

        for (var j = 0; j <= 6; j++) {
          if (day <= monthLength && (i > 0 || j >= startingDay)) {
            var className = null;
            var date = new Date(year, month, day, 12, 0, 0, 0).toISOString();
            var beforeMinDate = minDate && Date.parse(date) < Date.parse(minDate);
            var afterMinDate = maxDate && Date.parse(date) > Date.parse(maxDate);
            var clickHandler = this.handleClick.bind(this);
            var style = {
              cursor: 'pointer',
              padding: this.props.cellPadding,
              borderRadius: this.props.roundedCorners ? 5 : 0
            };

            if (beforeMinDate || afterMinDate) {
              className = 'text-muted';
              clickHandler = null;
              style.cursor = 'default';
            } else if (Date.parse(date) === Date.parse(selectedDate)) {
              className = 'bg-primary';
            } else if (Date.parse(date) === Date.parse(currentDate)) {
              className = 'text-primary';
            }

            week.push(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
              key: j,
              "data-day": day,
              onClick: clickHandler,
              style: style,
              className: className
            }, day));
            day++;
          } else {
            week.push(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
              key: j
            }));
          }
        }

        if (showWeeks) {
          var weekNum = this.getWeekNumber(new Date(year, month, day - 1, 12, 0, 0, 0));
          week.unshift(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
            key: 7,
            style: {
              padding: this.props.cellPadding,
              fontSize: '0.8em',
              color: 'darkgrey'
            },
            className: "text-muted"
          }, weekNum));
        }

        weeks.push(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", {
          key: i
        }, week));

        if (day > monthLength) {
          break;
        }
      }

      var weekColumn = showWeeks ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
        className: "text-muted current-week",
        style: {
          padding: this.props.cellPadding
        }
      }) : null;
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("table", {
        className: "text-center"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("thead", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", null, weekColumn, this.props.dayLabels.map(function (label, index) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
          key: index,
          className: "text-muted",
          style: {
            padding: _this.props.cellPadding
          }
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("small", null, label));
      }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tbody", null, weeks), this.props.showTodayButton && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tfoot", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
        colSpan: this.props.dayLabels.length,
        style: {
          paddingTop: '9px'
        }
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Button"], {
        block: true,
        bsSize: "xsmall",
        className: "u-today-button",
        onClick: this.handleClickToday
      }, this.props.todayButtonLabel)))));
    }
  }]);

  return DatePickerCalendar;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

DatePickerCalendar.propTypes = {
  selectedDate: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object,
  displayDate: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object.isRequired,
  minDate: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
  maxDate: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
  onChange: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired,
  dayLabels: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.array.isRequired,
  cellPadding: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string.isRequired,
  weekStartsOn: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.number,
  showTodayButton: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,
  todayButtonLabel: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
  roundedCorners: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,
  showWeeks: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool
};
var language = typeof window !== 'undefined' && window.navigator ? (window.navigator.userLanguage || window.navigator.language || '').toLowerCase() : '';
var dateFormat = !language || language === 'en-us' ? 'MM/DD/YYYY' : 'DD/MM/YYYY';

var DatePicker =
/*#__PURE__*/
function (_React$Component3) {
  _inherits(DatePicker, _React$Component3);

  function DatePicker(props) {
    var _this2;

    _classCallCheck(this, DatePicker);

    _this2 = _possibleConstructorReturn(this, _getPrototypeOf(DatePicker).call(this, props));

    if (_this2.props.value && _this2.props.defaultValue) {
      throw new Error('Conflicting DatePicker properties \'value\' and \'defaultValue\'');
    }

    var state = _this2.makeDateValues(_this2.props.value || _this2.props.defaultValue);

    if (_this2.props.weekStartsOn > 1) {
      state.dayLabels = _this2.props.dayLabels.slice(_this2.props.weekStartsOn).concat(_this2.props.dayLabels.slice(0, _this2.props.weekStartsOn));
    } else if (_this2.props.weekStartsOn === 1) {
      state.dayLabels = _this2.props.dayLabels.slice(1).concat(_this2.props.dayLabels.slice(0, 1));
    } else {
      state.dayLabels = _this2.props.dayLabels;
    }

    state.focused = false;
    state.inputFocused = false;
    state.placeholder = _this2.props.placeholder || _this2.props.dateFormat;
    state.separator = _this2.props.dateFormat.match(/[^A-Z]/)[0];
    _this2.state = state;
    return _this2;
  }

  _createClass(DatePicker, [{
    key: "makeDateValues",
    value: function makeDateValues(localDate) {
      var isoString = localDate ? localDate.toString() : null;
      var displayDate;
      var selectedDate = isoString ? new Date("".concat(isoString.slice(0, 10), "T12:00:00.000Z")) : null;
      var minDate = this.props.minDate ? new Date("".concat(this.props.minDate.slice(0, 10), "T12:00:00.000Z")) : null;
      var maxDate = this.props.maxDate ? new Date("".concat(this.props.maxDate.slice(0, 10), "T12:00:00.000Z")) : null;
      var inputValue = isoString ? this.makeInputValueString(selectedDate) : null;

      if (selectedDate) {
        displayDate = new Date(selectedDate);
      } else {
        var today = new Date("".concat(new Date().toISOString().slice(0, 10), "T12:00:00.000Z"));

        if (minDate && Date.parse(minDate) >= Date.parse(today)) {
          displayDate = minDate;
        } else if (maxDate && Date.parse(maxDate) <= Date.parse(today)) {
          displayDate = maxDate;
        } else {
          displayDate = today;
        }
      }

      return {
        value: selectedDate ? selectedDate.toISOString() : null,
        displayDate: displayDate,
        selectedDate: selectedDate,
        inputValue: inputValue
      };
    }
  }, {
    key: "clear",
    value: function clear() {
      if (this.props.onClear) {
        this.props.onClear();
      } else {
        this.setState(this.makeDateValues(null));
      }

      if (this.props.onChange) {
        this.props.onChange(null, null);
      }
    }
  }, {
    key: "handleHide",
    value: function handleHide() {
      if (this.state.inputFocused) {
        return;
      }

      this.setState({
        focused: false
      });

      if (this.props.onBlur) {
        var event = document.createEvent('CustomEvent');
        event.initEvent('Change Date', true, false);
        react_dom__WEBPACK_IMPORTED_MODULE_2___default.a.findDOMNode(this.refs.hiddenInput).dispatchEvent(event);
        this.props.onBlur(event);
      }
    }
  }, {
    key: "handleKeyDown",
    value: function handleKeyDown(e) {
      if (e.which === 9 && this.state.inputFocused) {
        this.setState({
          focused: false
        });

        if (this.props.onBlur) {
          var event = document.createEvent('CustomEvent');
          event.initEvent('Change Date', true, false);
          react_dom__WEBPACK_IMPORTED_MODULE_2___default.a.findDOMNode(this.refs.hiddenInput).dispatchEvent(event);
          this.props.onBlur(event);
        }
      }
    }
  }, {
    key: "handleFocus",
    value: function handleFocus() {
      if (this.state.focused === true) {
        return;
      }

      var placement = this.getCalendarPlacement();
      this.setState({
        inputFocused: true,
        focused: true,
        calendarPlacement: placement
      });

      if (this.props.onFocus) {
        var event = document.createEvent('CustomEvent');
        event.initEvent('Change Date', true, false);
        react_dom__WEBPACK_IMPORTED_MODULE_2___default.a.findDOMNode(this.refs.hiddenInput).dispatchEvent(event);
        this.props.onFocus(event);
      }
    }
  }, {
    key: "handleBlur",
    value: function handleBlur() {
      this.setState({
        inputFocused: false
      });
    }
  }, {
    key: "getValue",
    value: function getValue() {
      return this.state.selectedDate ? new window.LocalDate(this.state.selectedDate) : null;
    }
  }, {
    key: "getFormattedValue",
    value: function getFormattedValue() {
      return this.state.displayDate ? this.state.inputValue : null;
    }
  }, {
    key: "getCalendarPlacement",
    value: function getCalendarPlacement() {
      var tag = Object.prototype.toString.call(this.props.calendarPlacement);
      var isFunction = tag === '[object AsyncFunction]' || tag === '[object Function]' || tag === '[object GeneratorFunction]' || tag === '[object Proxy]';

      if (isFunction) {
        return this.props.calendarPlacement();
      } else {
        return this.props.calendarPlacement;
      }
    }
  }, {
    key: "makeInputValueString",
    value: function makeInputValueString(date) {
      var month = date.getMonth() + 1;
      var day = date.getDate(); //this method is executed during intialState setup... handle a missing state properly

      var separator = this.state ? this.state.separator : this.props.dateFormat.match(/[^A-Z]/)[0];

      if (this.props.dateFormat.match(/MM.DD.YYYY/)) {
        return (month > 9 ? month : "0".concat(month)) + separator + (day > 9 ? day : "0".concat(day)) + separator + date.getFullYear();
      } else if (this.props.dateFormat.match(/DD.MM.YYYY/)) {
        return (day > 9 ? day : "0".concat(day)) + separator + (month > 9 ? month : "0".concat(month)) + separator + date.getFullYear();
      } else {
        return date.getFullYear() + separator + (month > 9 ? month : "0".concat(month)) + separator + (day > 9 ? day : "0".concat(day));
      }
    }
  }, {
    key: "handleBadInput",
    value: function handleBadInput(originalValue) {
      var parts = originalValue.replace(new RegExp("[^0-9".concat(this.state.separator, "]")), '').split(this.state.separator);

      if (this.props.dateFormat.match(/MM.DD.YYYY/) || this.props.dateFormat.match(/DD.MM.YYYY/)) {
        if (parts[0] && parts[0].length > 2) {
          parts[1] = parts[0].slice(2) + (parts[1] || '');
          parts[0] = parts[0].slice(0, 2);
        }

        if (parts[1] && parts[1].length > 2) {
          parts[2] = parts[1].slice(2) + (parts[2] || '');
          parts[1] = parts[1].slice(0, 2);
        }

        if (parts[2]) {
          parts[2] = parts[2].slice(0, 4);
        }
      } else {
        if (parts[0] && parts[0].length > 4) {
          parts[1] = parts[0].slice(4) + (parts[1] || '');
          parts[0] = parts[0].slice(0, 4);
        }

        if (parts[1] && parts[1].length > 2) {
          parts[2] = parts[1].slice(2) + (parts[2] || '');
          parts[1] = parts[1].slice(0, 2);
        }

        if (parts[2]) {
          parts[2] = parts[2].slice(0, 2);
        }
      }

      this.setState({
        inputValue: parts.join(this.state.separator)
      });
    }
  }, {
    key: "handleInputChange",
    value: function handleInputChange() {
      var originalValue = react_dom__WEBPACK_IMPORTED_MODULE_2___default.a.findDOMNode(this.refs.input).value;
      var inputValue = originalValue.replace(/(-|\/\/)/g, this.state.separator).slice(0, 10);

      if (!inputValue) {
        this.clear();
        return;
      }

      var month, day, year;

      if (this.props.dateFormat.match(/MM.DD.YYYY/)) {
        if (!inputValue.match(/[0-1][0-9].[0-3][0-9].[1-2][0-9][0-9][0-9]/)) {
          return this.handleBadInput(originalValue);
        }

        month = inputValue.slice(0, 2).replace(/[^0-9]/g, '');
        day = inputValue.slice(3, 5).replace(/[^0-9]/g, '');
        year = inputValue.slice(6, 10).replace(/[^0-9]/g, '');
      } else if (this.props.dateFormat.match(/DD.MM.YYYY/)) {
        if (!inputValue.match(/[0-3][0-9].[0-1][0-9].[1-2][0-9][0-9][0-9]/)) {
          return this.handleBadInput(originalValue);
        }

        day = inputValue.slice(0, 2).replace(/[^0-9]/g, '');
        month = inputValue.slice(3, 5).replace(/[^0-9]/g, '');
        year = inputValue.slice(6, 10).replace(/[^0-9]/g, '');
      } else {
        if (!inputValue.match(/[1-2][0-9][0-9][0-9].[0-1][0-9].[0-3][0-9]/)) {
          return this.handleBadInput(originalValue);
        }

        year = inputValue.slice(0, 4).replace(/[^0-9]/g, '');
        month = inputValue.slice(5, 7).replace(/[^0-9]/g, '');
        day = inputValue.slice(8, 10).replace(/[^0-9]/g, '');
      }

      var monthInteger = parseInt(month, 10);
      var dayInteger = parseInt(day, 10);
      var yearInteger = parseInt(year, 10);

      if (monthInteger > 12 || dayInteger > 31) {
        return this.handleBadInput(originalValue);
      }

      if (!isNaN(monthInteger) && !isNaN(dayInteger) && !isNaN(yearInteger) && monthInteger <= 12 && dayInteger <= 31 && yearInteger > 999) {
        var selectedDate = new Date(yearInteger, monthInteger - 1, dayInteger, 12, 0, 0, 0);
        this.setState({
          selectedDate: selectedDate,
          displayDate: selectedDate,
          value: selectedDate.toISOString()
        });

        if (this.props.onChange) {
          this.props.onChange(new window.LocalDate(selectedDate), inputValue);
        }
      }

      this.setState({
        inputValue: inputValue
      });
    }
  }, {
    key: "onChangeMonth",
    value: function onChangeMonth(newDisplayDate) {
      this.setState({
        displayDate: newDisplayDate
      });
    }
  }, {
    key: "onChangeDate",
    value: function onChangeDate(newSelectedDate) {
      var inputValue = this.makeInputValueString(newSelectedDate);
      this.setState({
        inputValue: inputValue,
        selectedDate: newSelectedDate,
        displayDate: newSelectedDate,
        value: newSelectedDate.toISOString(),
        focused: false
      });

      if (this.props.onBlur) {
        var event = document.createEvent('CustomEvent');
        event.initEvent('Change Date', true, false);
        react_dom__WEBPACK_IMPORTED_MODULE_2___default.a.findDOMNode(this.refs.hiddenInput).dispatchEvent(event);
        this.props.onBlur(event);
      }

      if (this.props.onChange) {
        this.props.onChange(new window.LocalDate(newSelectedDate), inputValue);
      }
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(newProps) {
      var value = newProps.value;

      if (this.getValue() !== value) {
        this.setState(this.makeDateValues(value));
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var calendarHeader = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(DatePickerHeader, {
        previousButtonElement: this.props.previousButtonElement,
        nextButtonElement: this.props.nextButtonElement,
        displayDate: this.state.displayDate,
        minDate: this.props.minDate,
        maxDate: this.props.maxDate,
        onChange: this.onChangeMonth.bind(this),
        monthLabels: this.props.monthLabels,
        dateFormat: this.props.dateFormat
      });
      var control = this.props.customControl ? react__WEBPACK_IMPORTED_MODULE_0___default.a.cloneElement(this.props.customControl, {
        onKeyDown: this.handleKeyDown,
        value: this.state.inputValue || '',
        required: this.props.required,
        placeholder: this.state.focused ? this.props.dateFormat : this.state.placeholder,
        ref: 'input',
        disabled: this.props.disabled,
        onFocus: this.handleFocus.bind(this),
        onBlur: this.handleBlur.bind(this),
        onChange: this.handleInputChange.bind(this),
        className: this.props.className,
        style: this.props.style,
        autoComplete: this.props.autoComplete,
        onInvalid: this.props.onInvalid,
        noValidate: this.props.noValidate
      }) : react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["FormControl"], {
        onKeyDown: this.handleKeyDown,
        value: this.state.inputValue || '',
        required: this.props.required,
        ref: "input",
        type: "text",
        className: this.props.className,
        style: this.props.style,
        autoFocus: this.props.autoFocus,
        disabled: this.props.disabled,
        placeholder: this.state.focused ? this.props.dateFormat : this.state.placeholder,
        onFocus: this.handleFocus.bind(this),
        onBlur: this.handleBlur.bind(this),
        onChange: this.handleInputChange.bind(this),
        autoComplete: this.props.autoComplete,
        onInvalid: this.props.onInvalid,
        noValidate: this.props.noValidate
      });
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["InputGroup"], {
        ref: "inputGroup",
        bsClass: this.props.showClearButton ? this.props.bsClass : '',
        bsSize: this.props.bsSize,
        id: this.props.id ? "".concat(this.props.id, "_group") : null
      }, control, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Overlay"], {
        rootClose: true,
        onHide: this.handleHide.bind(this),
        show: this.state.focused,
        container: function container() {
          return _this3.props.calendarContainer || react_dom__WEBPACK_IMPORTED_MODULE_2___default.a.findDOMNode(_this3.refs.overlayContainer);
        },
        target: function target() {
          return react_dom__WEBPACK_IMPORTED_MODULE_2___default.a.findDOMNode(_this3.refs.input);
        },
        placement: this.state.calendarPlacement,
        delayHide: 200
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Popover"], {
        id: "date-picker-popover-".concat(this.props.instanceCount),
        className: "date-picker-popover",
        title: calendarHeader
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(DatePickerCalendar, {
        cellPadding: this.props.cellPadding,
        selectedDate: this.state.selectedDate,
        displayDate: this.state.displayDate,
        onChange: this.onChangeDate.bind(this),
        dayLabels: this.state.dayLabels,
        weekStartsOn: this.props.weekStartsOn,
        showTodayButton: this.props.showTodayButton,
        todayButtonLabel: this.props.todayButtonLabel,
        minDate: this.props.minDate,
        maxDate: this.props.maxDate,
        roundedCorners: this.props.roundedCorners,
        showWeeks: this.props.showWeeks
      }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        ref: "overlayContainer",
        style: {
          position: 'relative'
        }
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        ref: "hiddenInput",
        type: "hidden",
        id: this.props.id,
        name: this.props.name,
        value: this.state.value || '',
        "data-formattedvalue": this.state.value ? this.state.inputValue : ''
      }), this.props.showClearButton && !this.props.customControl && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["InputGroup"].Addon, {
        onClick: this.props.disabled ? null : this.clear.bind(this),
        style: {
          cursor: this.state.inputValue && !this.props.disabled ? 'pointer' : 'not-allowed'
        }
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        style: {
          opacity: this.state.inputValue && !this.props.disabled ? 1 : 0.5
        }
      }, this.props.clearButtonElement)), this.props.children);
    }
  }], [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState) {
      return !(this.state.inputFocused === true && nextState.inputFocused === false);
    }
  }]);

  return DatePicker;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);


var propTypes = {
  defaultValue: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object,
  value: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object,
  required: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,
  className: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
  style: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object,
  minDate: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
  maxDate: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
  cellPadding: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
  autoComplete: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
  placeholder: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
  dayLabels: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.array,
  monthLabels: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.array,
  onChange: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func,
  onClear: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func,
  onBlur: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func,
  onFocus: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func,
  autoFocus: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,
  disabled: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,
  weekStartsOn: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.number,
  clearButtonElement: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string, prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object]),
  showClearButton: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,
  previousButtonElement: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string, prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object]),
  nextButtonElement: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string, prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object]),
  calendarPlacement: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string, prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func]),
  dateFormat: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
  // 'MM/DD/YYYY', 'DD/MM/YYYY', 'YYYY/MM/DD', 'DD-MM-YYYY'
  bsClass: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
  bsSize: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
  calendarContainer: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object,
  id: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
  name: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
  showTodayButton: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,
  todayButtonLabel: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
  instanceCount: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.number,
  customControl: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object,
  roundedCorners: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,
  showWeeks: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,
  children: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.node), prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.node]),
  onInvalid: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func,
  noValidate: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool
};
DatePicker.propTypes = propTypes;
DatePicker.defaultProps = {
  cellPadding: '5px',
  dayLabels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  monthLabels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  clearButtonElement: '×',
  previousButtonElement: '<',
  nextButtonElement: '>',
  calendarPlacement: 'bottom',
  dateFormat: dateFormat,
  showClearButton: true,
  autoFocus: false,
  disabled: false,
  showTodayButton: false,
  todayButtonLabel: 'Today',
  autoComplete: 'on',
  showWeeks: false,
  instanceCount: instanceCount++,
  style: {
    width: '100%'
  },
  roundedCorners: false,
  noValidate: false
};

/***/ }),

/***/ "./src/typeahead/PromptoTypeahead.js":
/*!*******************************************!*\
  !*** ./src/typeahead/PromptoTypeahead.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_bootstrap_typeahead__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-bootstrap-typeahead */ "../../../react-bootstrap-typeahead/es/index.js");
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var forwardRef = react__WEBPACK_IMPORTED_MODULE_0___default.a.forwardRef(function (props, ref) {
  var adjustedProps = _objectSpread({}, props);

  if (typeof props.labelKey === "string") {
    adjustedProps.labelKey = function (o) {
      return o[props.labelKey];
    };
  }

  if (!props.options) {
    adjustedProps.options = [];
  } else if (!Array.isArray(props.options) && props.options.toList) {
    adjustedProps.options = props.options.toList();
  }

  if (props.onChange) {
    adjustedProps.onChange = function (items) {
      return props.onChange(new window.List(false, items));
    };
  }

  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap_typeahead__WEBPACK_IMPORTED_MODULE_1__["Typeahead"], _extends({
    ref: ref
  }, adjustedProps));
});
forwardRef.displayName = react_bootstrap_typeahead__WEBPACK_IMPORTED_MODULE_1__["Typeahead"].displayName;
forwardRef.propTypes = react_bootstrap_typeahead__WEBPACK_IMPORTED_MODULE_1__["Typeahead"].propTypes;
forwardRef.defaultProps = react_bootstrap_typeahead__WEBPACK_IMPORTED_MODULE_1__["Typeahead"].defaultProps;
/* harmony default export */ __webpack_exports__["default"] = (forwardRef);

/***/ }),

/***/ "prop-types":
/*!****************************!*\
  !*** external "PropTypes" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = PropTypes;

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = React;

/***/ }),

/***/ "react-bootstrap":
/*!*********************************!*\
  !*** external "ReactBootstrap" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ReactBootstrap;

/***/ }),

/***/ "react-dom":
/*!***************************!*\
  !*** external "ReactDOM" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ReactDOM;

/***/ })

/******/ });
//# sourceMappingURL=main.js.map