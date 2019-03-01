"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SetLang = exports.Translate = exports.TranslateProvider = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**/
var defaultLang = 'pt-BR';

var _createContext = (0, _react.createContext)({
  language: defaultLang
}),
    Consumer = _createContext.Consumer,
    Provider = _createContext.Provider;

var TranslateProvider =
/*#__PURE__*/
function (_Component) {
  _inherits(TranslateProvider, _Component);

  function TranslateProvider(props) {
    var _this;

    _classCallCheck(this, TranslateProvider);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(TranslateProvider).call(this, props));
    _this.state = {
      dictionary: {},
      language: defaultLang
    };
    return _this;
  }

  _createClass(TranslateProvider, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      this.setLang(this.props.language, function () {
        return _this2.forceUpdate();
      });
      this.setDictionary(this.props.dictionary);
    }
  }, {
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState) {
      return this.state.language !== nextState.language;
    }
  }, {
    key: "setLang",
    value: function setLang(language) {
      if (String.isValid(language)) {
        this.setState({
          language: language
        });
      } else if (typeof language === 'undefined') {
        //Detect the browser language
        this.setLang(Object.readProp(window, 'navigator.language', 'pt-BR'));
      } else {
        console.error('Invalid language, language need to be a String or undefined:', language);
      }
      /**/


      return null;
    }
  }, {
    key: "setDictionary",
    value: function setDictionary(dictionary, language) {
      if (!Object.isObject(dictionary)) {
        return console.error("Dictionary need to be a object: ", dictionary);
      }
      /**/


      if (String.isValid(language)) {
        this.setState(function (state) {
          return {
            dictionary: _objectSpread({}, state.dictionary, _defineProperty({}, language, _objectSpread({}, dictionary)))
          };
        });
      } else {
        this.setState({
          dictionary: _objectSpread({}, dictionary)
        });
      }
    }
  }, {
    key: "translate",
    value: function translate(key) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var personalDict = arguments.length > 2 ? arguments[2] : undefined;
      var personalLang = arguments.length > 3 ? arguments[3] : undefined;

      if (String.isValid(key)) {
        //String
        var newWord;
        var language = String.isValid(personalLang) ? personalLang : this.state.language;
        var dictionaries = Object.isObject(personalDict) ? Object.assignDeep(this.state.dictionary, personalDict) : _objectSpread({}, this.state.dictionary);
        var dictionary = Object.isObject(dictionaries[language]) ? dictionaries[language] : Object.isObject(dictionaries[this.props.errorLanguage]) ? dictionaries[this.props.errorLanguage] : {};
        var word = dictionary[key];

        if (typeof word === 'function') {
          newWord = word(language, dictionaries);
        } else {
          newWord = "".concat(word);
        }
        /**/


        if (Object.isObject(params)) {
          for (var prop in params) {
            newWord = newWord.replaceAll("{".concat(prop, "}"), params[prop]);
          }
        }

        if (newWord.indexOf("{") > -1) {
          var wordSplit = newWord.split("{");

          for (var item in wordSplit) {
            var dictKey = wordSplit[item].substr(0, wordSplit[item].indexOf("}"));

            if (String.isValid(dictKey) && String.isValid(dictionary[dictKey])) {
              newWord = newWord.replaceAll(dictKey, dictionary[dictKey]);
            }
          }
        }
        /**/


        return newWord;
      } else if (Array.isArray(key)) {
        //Array
        if (key.length < 1) {
          console.error("INVALID_KEY_ARRAY_ON_TRANALSTAE", key);
          console.error("The parameter array 'key' have need to have 3 elements: 0 => 'plural key', '1' => 'singular key', 2 => 'parameter of count'");
          return '';
        }

        if (key.length < 3 || !Object.isObject(params)) {
          return key[0];
        }

        var keyWord = params[key[2]] === 1 ? key[0] : key[1];
        /**/

        return this.translate(keyWord, params, personalDict, personalLang);
      } else {
        //Error
        console.error("INVALID_KEY_ON_TRANALSTAE", key);
        console.error("The parameter 'key' have to be a String or a Array");
      }
      /**/


      return '';
    }
  }, {
    key: "render",
    value: function render() {
      var value = {
        language: this.state.language,
        dictionary: this.state.dictionary,
        translate: this.translate.bind(this),
        setLang: this.setLang.bind(this)
      };
      /**/

      return _react.default.createElement(Provider, {
        value: value
      }, this.props.children);
    }
  }]);

  return TranslateProvider;
}(_react.Component);

exports.TranslateProvider = TranslateProvider;

_defineProperty(TranslateProvider, "propTypes", {
  dictionary: _propTypes.default.object,
  language: _propTypes.default.string,
  errorLanguage: _propTypes.default.string.isRequired
});

var Translate = function Translate(_ref) {
  var children = _ref.children,
      params = _ref.params,
      dictionary = _ref.dictionary,
      lang = _ref.lang;
  return typeof children === 'function' ? _react.default.createElement(Consumer, null, function (_ref2) {
    var translate = _ref2.translate;
    return children(function (k, o) {
      return translate(k, o, dictionary, lang);
    });
  }) : _react.default.createElement(Consumer, null, function (_ref3) {
    var translate = _ref3.translate;
    return translate(children, params);
  });
};

exports.Translate = Translate;

var SetLang = function SetLang(_ref4) {
  var children = _ref4.children;
  return typeof children === 'function' ? _react.default.createElement(Consumer, null, function (_ref5) {
    var setLang = _ref5.setLang;
    return children(setLang);
  }) : _react.default.createElement(Consumer, null, function (_ref6) {
    var setLang = _ref6.setLang;
    return setLang(children);
  });
};

exports.SetLang = SetLang;