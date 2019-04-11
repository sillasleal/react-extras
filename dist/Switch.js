"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Default = exports.Case = exports.Switch = void 0;

var _react = require("react");

var _ComponentBase3 = _interopRequireDefault(require("./ComponentBase"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

/**
 * Description of Switch
 * @author Sillas S. Leal<sillas.s.leal@gmail.com>
 */
var Switch =
/*#__PURE__*/
function (_Component) {
  _inherits(Switch, _Component);

  function Switch() {
    _classCallCheck(this, Switch);

    return _possibleConstructorReturn(this, _getPrototypeOf(Switch).apply(this, arguments));
  }

  _createClass(Switch, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          children = _this$props.children,
          value = _this$props.value;
      /**/

      if ((0, _react.isValidElement)(children)) {
        if (children.props.value === value || children.props.name === 'default') {
          return children;
        }
      } else if (Array.isArray(children)) {
        var multReturn = [];

        for (var item in children) {
          if (Number(item) !== 0 && children[item].props.name === 'if') {
            throw new Error("If have to be the first children in IfComponent");
          }

          if (Number(item) === 0 && children[item].props.name === 'default') {
            throw new Error("The first children of IfComponent have to be a Case");
          }

          if (children[item].props.value === value) {
            multReturn.push(children[item]);

            if (children[item].props["break"]) {
              break;
            }
          }
        }
        /**/


        if (!multReturn.length) {
          var lastChild = children[children.length - 1];

          if (lastChild && lastChild.props.name === 'default') {
            return lastChild;
          } else {
            return null;
          }
        } else {
          return multReturn;
        }
      } else {
        return null;
      }

      return null;
    }
  }]);

  return Switch;
}(_react.Component);

exports.Switch = Switch;

var Case =
/*#__PURE__*/
function (_ComponentBase) {
  _inherits(Case, _ComponentBase);

  function Case() {
    _classCallCheck(this, Case);

    return _possibleConstructorReturn(this, _getPrototypeOf(Case).apply(this, arguments));
  }

  return Case;
}(_ComponentBase3["default"]);

exports.Case = Case;

_defineProperty(Case, "defaultProps", {
  name: 'case'
});

var Default =
/*#__PURE__*/
function (_ComponentBase2) {
  _inherits(Default, _ComponentBase2);

  function Default() {
    _classCallCheck(this, Default);

    return _possibleConstructorReturn(this, _getPrototypeOf(Default).apply(this, arguments));
  }

  return Default;
}(_ComponentBase3["default"]);

exports.Default = Default;

_defineProperty(Default, "defaultProps", {
  name: 'default'
});