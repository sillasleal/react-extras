"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _ComponentDefault2 = _interopRequireDefault(require("./ComponentDefault"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Component For
 * @description text
 * @author Sillas S. Leal<sillas.santos.leal@accenture.com>
 */
var For =
/*#__PURE__*/
function (_ComponentDefault) {
  _inherits(For, _ComponentDefault);

  function For() {
    _classCallCheck(this, For);

    return _possibleConstructorReturn(this, _getPrototypeOf(For).apply(this, arguments));
  }

  _createClass(For, [{
    key: "render",
    value: function render() {
      var _this = this;

      var _this$props = this.props,
          children = _this$props.children,
          inArray = _this$props.in,
          each = _this$props.each,
          component = _this$props.component,
          componentProps = _this$props.componentProps;
      var newExtraProps;
      /**/

      if (componentProps && _typeof(componentProps) === 'object' && !Array.isArray(componentProps)) {
        newExtraProps = function newExtraProps() {
          return componentProps;
        };
      } else if (typeof componentProps !== 'function') {
        newExtraProps = function newExtraProps() {
          return {};
        };
      } else {
        newExtraProps = componentProps;
      }
      /**/


      if (typeof component === 'function') {
        return inArray.map(function (item, key) {
          return _this.createCpm(component, _objectSpread({}, _objectSpread({}, _defineProperty({}, each, item), newExtraProps(item))), item, key);
        });
      } else {
        if (typeof children === 'function') {
          return inArray.map(children);
        } else if (_typeof(children) === 'object' && !Array.isArray(children) && children) {
          var Cpm = children.type;
          /**/

          if (each) {
            return inArray.map(function (item, key) {
              return _react.default.createElement(Cpm, _extends({
                key: key
              }, _objectSpread({}, children.props, _defineProperty({}, each, item), newExtraProps(item))));
            });
          } else {
            return inArray.map(function (item, key) {
              return _react.default.createElement(Cpm, _extends({
                key: key
              }, _objectSpread({}, children.props, newExtraProps(item))), item);
            });
          }
        } else {
          throw new TypeError("Invalid type of children in For component");
        }
      }
    }
  }]);

  return For;
}(_ComponentDefault2.default);

exports.default = For;

_defineProperty(For, "defaultProps", {
  componentProps: function componentProps() {
    return {};
  }
});

;