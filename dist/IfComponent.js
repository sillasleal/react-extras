"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Else = exports.ElseIf = exports.If = exports.IfComponent = void 0;

var _react = _interopRequireWildcard(require("react"));

var _ComponentDefault2 = _interopRequireDefault(require("./ComponentDefault"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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
 */
var IfComponent =
/*#__PURE__*/
function (_ComponentDefault) {
  _inherits(IfComponent, _ComponentDefault);

  function IfComponent() {
    _classCallCheck(this, IfComponent);

    return _possibleConstructorReturn(this, _getPrototypeOf(IfComponent).apply(this, arguments));
  }

  _createClass(IfComponent, [{
    key: "getChildrens",
    value: function getChildrens() {
      var _this = this;

      var children = null,
          ifCpm = 0,
          elseCpm;
      /**/

      _react.Children.forEach(this.props.children, function (item) {
        if (elseCpm) {
          //Caso um else tenha sido encontrado, todo o restante é igorado
          return;
        }
        /**/


        if (!ifCpm && item.type.componentName !== 'if') {
          throw new Error("O primeiro teste deve ser obrigatoriamente um IF");
        }

        if (ifCpm > 1 && item.type.componentName === 'if') {
          throw new Error("Defina apenas um IF por IfComponent");
        }

        if (item.type.componentName === 'else') {
          if (elseCpm) {
            throw new Error("Defina apenas um ELSE por IfComponent");
          } else {
            elseCpm = item;
          }
        }

        if (item.props.test && !children) {
          children = _this.returnComponent(item);
        }

        ifCpm++;
      });

      if (!children && elseCpm) {
        children = this.returnComponent(elseCpm);
      }
      /**/


      return children;
    }
  }, {
    key: "render",
    value: function render() {
      var children = this.getChildrens();
      /**/

      return children;
    }
  }]);

  return IfComponent;
}(_ComponentDefault2.default);

exports.IfComponent = IfComponent;

var If =
/*#__PURE__*/
function (_Component) {
  _inherits(If, _Component);

  function If() {
    _classCallCheck(this, If);

    return _possibleConstructorReturn(this, _getPrototypeOf(If).apply(this, arguments));
  }

  _createClass(If, [{
    key: "render",
    value: function render() {
      return null;
    }
  }]);

  return If;
}(_react.Component);

exports.If = If;

_defineProperty(If, "componentName", 'if');

var ElseIf =
/*#__PURE__*/
function (_If) {
  _inherits(ElseIf, _If);

  function ElseIf() {
    _classCallCheck(this, ElseIf);

    return _possibleConstructorReturn(this, _getPrototypeOf(ElseIf).apply(this, arguments));
  }

  return ElseIf;
}(If);

exports.ElseIf = ElseIf;

_defineProperty(ElseIf, "componentName", 'elseif');

var Else =
/*#__PURE__*/
function (_If2) {
  _inherits(Else, _If2);

  function Else() {
    _classCallCheck(this, Else);

    return _possibleConstructorReturn(this, _getPrototypeOf(Else).apply(this, arguments));
  }

  return Else;
}(If);

exports.Else = Else;

_defineProperty(Else, "componentName", 'else');