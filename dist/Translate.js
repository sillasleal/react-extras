"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Translate = exports.TranslateDict = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Configs = require("./Configs");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

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

var _React$createContext = _react.default.createContext({}),
    Consumer = _React$createContext.Consumer,
    Provider = _React$createContext.Provider;

var TranslateDict =
/*#__PURE__*/
function (_Component) {
  _inherits(TranslateDict, _Component);

  function TranslateDict() {
    _classCallCheck(this, TranslateDict);

    return _possibleConstructorReturn(this, _getPrototypeOf(TranslateDict).apply(this, arguments));
  }

  _createClass(TranslateDict, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          dict = _this$props.dict,
          children = _this$props.children;
      /**/

      return _react.default.createElement(Provider, {
        value: dict
      }, children);
    }
  }]);

  return TranslateDict;
}(_react.Component);
/**
 * Description of Translate
 * @author Sillas S. Leal<sillas.s.leal@gmail.com>
 */


exports.TranslateDict = TranslateDict;

_defineProperty(TranslateDict, "propTypes", {
  dict: _propTypes.default.object,
  children: _propTypes.default.node.isRequired
});

_defineProperty(TranslateDict, "defaultProps", {
  dict: {}
});

var Translate =
/*#__PURE__*/
function (_Component2) {
  _inherits(Translate, _Component2);

  function Translate(props) {
    var _this;

    _classCallCheck(this, Translate);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Translate).call(this, props));
    _this.translate = _this.translate.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(Translate, [{
    key: "translate",
    value: function translate(lang, dict, key, plural) {
      var dictionary = dict[lang] || {};
      /**/

      return dictionary[key] || key;
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props2 = this.props,
          dictionary = _this$props2.dict,
          children = _this$props2.children,
          plural = _this$props2.plural;
      /**/

      return _react.default.createElement(_Configs.Configs, null, function (_ref) {
        var lang = _ref.lang;
        return _react.default.createElement(Consumer, null, function (dict) {
          if (Object.isObject(dictionary)) {
            return _this2.translate(lang, dictionary, children, plural);
          } else {
            return _this2.translate(lang, dict, children, plural);
          }
        });
      });
    }
  }]);

  return Translate;
}(_react.Component);

exports.Translate = Translate;

_defineProperty(Translate, "propTypes", {
  dict: _propTypes.default.object,
  children: _propTypes.default.string.isRequired,
  plural: _propTypes.default.oneOfType([_propTypes.default.array, _propTypes.default.object]) //    static defaultProps = {
  //        plural: {}
  //    }

});