"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

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
 * Description of ComponentDefault
 * @description text
 * @author Sillas S. Leal<sillas.santos.leal@accenture.com>
 */
var ComponentDefault =
/*#__PURE__*/
function (_Component) {
  _inherits(ComponentDefault, _Component);

  function ComponentDefault() {
    _classCallCheck(this, ComponentDefault);

    return _possibleConstructorReturn(this, _getPrototypeOf(ComponentDefault).apply(this, arguments));
  }

  _createClass(ComponentDefault, [{
    key: "createCpm",

    /**
     * Método que cria um novo component baseado nos dados passados
     * @param {object} component
     * @param {object|function} componentProps 
     * @param {mixed} componentPropsParams 
     * @param {number} key 
     * @returns {Component} Retorna um novo componente React
     */
    value: function createCpm(component, componentProps, componentPropsParams, key) {
      if (typeof component !== 'function') {
        throw new TypeError("Invalid component");
      }
      /**/


      var Cpm = component,
          newProps;
      /**/

      if (componentProps && _typeof(componentProps) === 'object' && !Array.isArray(componentProps)) {
        newProps = componentProps;
      } else if (typeof componentProps === 'function') {
        newProps = componentProps(componentPropsParams);
      } else {
        newProps = {};
      }
      /**/


      if (typeof key === 'number') {
        return _react.default.createElement(Cpm, _extends({
          key: key
        }, newProps));
      } else {
        return _react.default.createElement(Cpm, newProps);
      }
    }
    /**
     * Método que testa e retorna um novo componente de acordo com as props do item informado
     * @param {Component} item O elemento a ter seus filhos testados
     * @param {object} parameters Os parametros para o novo elemento
     * @returns {Component}
     */

  }, {
    key: "returnComponent",
    value: function returnComponent(item, parameters) {
      var children = null;
      /**/

      if (item.props.component) {
        children = this.createCpm(item.props.component, item.props.componentProps);
      } else {
        if (typeof item.props.children === 'function') {
          children = item.props.children(parameters || item.props.componentProps);
        } else {
          children = item.props.children;
        }
      }
      /**/


      return children;
    }
  }]);

  return ComponentDefault;
}(_react.Component);

var _default = ComponentDefault;
exports.default = _default;