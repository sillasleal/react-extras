"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Else = exports.ElseIf = exports.If = exports.IfComponent = void 0;

var _react = require("react");

var _ComponentBase4 = _interopRequireDefault(require("./ComponentBase"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
 * Description of IfComponent
 * @description text
 * @author Sillas S. Leal<sillas.santos.leal@accenture.com>
 * @param {Array} args
 */
var IfComponent =
/*#__PURE__*/
function (_Component) {
  _inherits(IfComponent, _Component);

  function IfComponent() {
    _classCallCheck(this, IfComponent);

    return _possibleConstructorReturn(this, _getPrototypeOf(IfComponent).apply(this, arguments));
  }

  _createClass(IfComponent, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          children = _this$props.children,
          test = _this$props.test;
      /**/

      if ((0, _react.isValidElement)(children)) {
        if (children.props.test && children.props.name === 'if') {
          return children;
        }
      } else if (Array.isArray(children)) {
        for (var item in children) {
          if (Number(item) !== 0 && children[item].props.name === 'if') {
            throw new Error("If have to be the first children in IfComponent");
          }

          if (Number(item) === 0 && children[item].props.name === 'elseif' || Number(item) === 0 && children[item].props.name === 'else') {
            throw new Error("The first children of IfComponent have to be a If");
          }

          if (children[item].props.test || children[item].props.name === 'else') {
            return children[item];
          }
        }
      } else {
        return null;
      }

      return null;
    }
  }]);

  return IfComponent;
}(_react.Component);

exports.IfComponent = IfComponent;
;

var If =
/*#__PURE__*/
function (_ComponentBase) {
  _inherits(If, _ComponentBase);

  function If() {
    _classCallCheck(this, If);

    return _possibleConstructorReturn(this, _getPrototypeOf(If).apply(this, arguments));
  }

  return If;
}(_ComponentBase4.default);

exports.If = If;

_defineProperty(If, "defaultProps", {
  name: 'if'
});

;

var ElseIf =
/*#__PURE__*/
function (_ComponentBase2) {
  _inherits(ElseIf, _ComponentBase2);

  function ElseIf() {
    _classCallCheck(this, ElseIf);

    return _possibleConstructorReturn(this, _getPrototypeOf(ElseIf).apply(this, arguments));
  }

  return ElseIf;
}(_ComponentBase4.default);

exports.ElseIf = ElseIf;

_defineProperty(ElseIf, "defaultProps", {
  name: 'elseif'
});

;

var Else =
/*#__PURE__*/
function (_ComponentBase3) {
  _inherits(Else, _ComponentBase3);

  function Else() {
    _classCallCheck(this, Else);

    return _possibleConstructorReturn(this, _getPrototypeOf(Else).apply(this, arguments));
  }

  return Else;
}(_ComponentBase4.default);

exports.Else = Else;

_defineProperty(Else, "defaultProps", {
  name: 'else'
});

;