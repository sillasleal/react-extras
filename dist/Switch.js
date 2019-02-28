"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

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
 * Description of Switch
 * @author Sillas S. Leal<sillas.s.leal@gmail.com>
 */
var Switch =
/*#__PURE__*/
function (_ComponentDefault) {
  _inherits(Switch, _ComponentDefault);

  function Switch() {
    _classCallCheck(this, Switch);

    return _possibleConstructorReturn(this, _getPrototypeOf(Switch).apply(this, arguments));
  }

  _createClass(Switch, [{
    key: "getChildrens",
    value: function getChildrens() {
      var _this = this;

      var children = [];
      var findedDefault = false;
      /**/

      _react.Children.forEach(this.props.children, function (item) {
        if (!findedDefault && item.type.componentName === 'default') {
          //Encontrou um default
          findedDefault = true;
          children.push(_this.returnComponent(item));
        }

        if (!findedDefault) {
          //Executa até encontrar um default ou um case break
          if (item.type.componentName === 'case') {
            if (item.props.value === _this.props.value) {
              children.push(_this.returnComponent(item, _this.props.value));

              if (item.props.break) {
                findedDefault = true;
              }
            }
          }
        }
      });
      /**/


      return children.length ? children : null;
    }
  }, {
    key: "render",
    value: function render() {
      return this.getChildrens();
    }
  }]);

  return Switch;
}(_ComponentDefault2.default);

var Case =
/*#__PURE__*/
function (_Component) {
  _inherits(Case, _Component);

  function Case() {
    _classCallCheck(this, Case);

    return _possibleConstructorReturn(this, _getPrototypeOf(Case).apply(this, arguments));
  }

  _createClass(Case, [{
    key: "render",
    value: function render() {
      return null;
    }
  }]);

  return Case;
}(_react.Component);

_defineProperty(Case, "componentName", 'case');

var Default =
/*#__PURE__*/
function (_Component2) {
  _inherits(Default, _Component2);

  function Default() {
    _classCallCheck(this, Default);

    return _possibleConstructorReturn(this, _getPrototypeOf(Default).apply(this, arguments));
  }

  _createClass(Default, [{
    key: "render",
    value: function render() {
      return null;
    }
  }]);

  return Default;
}(_react.Component);

_defineProperty(Default, "componentName", 'default');

var _default = Switch;
exports.default = _default;