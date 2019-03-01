"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Translate = exports.TranslateProvider = exports.t = exports.setLang = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

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

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**/

/**
 * Configs of component
 * @type object
 */
var _dictionary = {
  language: 'pt-BR',
  dictionaries: {}
};
/**
 * Method that set the default language
 * @param {String} language The new language. The browser value will be used if the value is undefined
 * @param {function} callback Function that run after change language
 * @returns {undefined}
 */

var setLang = function setLang(language, callback) {
  if (String.isValid(language)) {
    //Set new language
    _dictionary.language = language;
    /**/

    if (typeof callback === 'function') {
      callback(language);
    }
  } else {
    //Detect the browser language
    var newLanguage = Object.readProp(window, 'navigator.language');
    setLang(newLanguage, callback);
  }
};
/**
 * Function that replace a key for a word
 * @param {String|Array} key
 * @param {object} params
 * @param {object} personalDict 
 * @returns {undefined}
 */


exports.setLang = setLang;

var t = function t(key) {
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var personalDict = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var personalLang = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';

  if (String.isValid(key)) {
    //String
    var language = String.isValid(personalLang) ? personalLang : _dictionary.language;
    var dictionaries = Object.isObject(personalDict) ? Object.assignDeep(_dictionary.dictionaries, personalDict) : _objectSpread({}, _dictionary.dictionaries);
    var dictionary = Object.isObject(dictionaries[language]) ? dictionaries[language] : {};
    var word = dictionary[key];
    var newWord = String.isValid(word) ? "".concat(word) : key;
    /**/

    if (Object.isObject(params)) {
      for (var prop in params) {
        newWord.replaceAll("{".concat(prop, "}"), params[prop]);
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

    var keyWord = params[key[2]] === 1 ? key[1] : key[0];
    /**/

    return t(keyWord, params, personalDict, personalLang);
  } else {
    //Error
    console.error("INVALID_KEY_ON_TRANALSTAE", key);
    console.error("The parameter 'key' have to be a String or a Array");
    /**/

    return '';
  }
};

exports.t = t;

var TranslateProvider =
/*#__PURE__*/
function (_Component) {
  _inherits(TranslateProvider, _Component);

  function TranslateProvider() {
    _classCallCheck(this, TranslateProvider);

    return _possibleConstructorReturn(this, _getPrototypeOf(TranslateProvider).apply(this, arguments));
  }

  _createClass(TranslateProvider, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      setLang(this.props.language, this.forceUpdate());
      this.setDictionary(this.dictionary);
    }
  }, {
    key: "setDictionary",
    value: function setDictionary(dictionary) {
      if (Object.isObject(dictionary)) {
        _dictionary.dictionaries = _objectSpread({}, dictionary);
      }
    }
  }, {
    key: "render",
    value: function render() {
      return this.props.children;
    }
  }]);

  return TranslateProvider;
}(_react.Component);

exports.TranslateProvider = TranslateProvider;
;

var Translate =
/*#__PURE__*/
function (_Component2) {
  _inherits(Translate, _Component2);

  function Translate() {
    _classCallCheck(this, Translate);

    return _possibleConstructorReturn(this, _getPrototypeOf(Translate).apply(this, arguments));
  }

  _createClass(Translate, [{
    key: "render",
    value: function render() {
      if (typeof children === 'function') {
        var _this$props = this.props,
            _children = _this$props.children,
            params = _this$props.params,
            dictionary = _this$props.dictionary,
            lang = _this$props.lang;

        var translate = function translate(key, others) {
          return t(key, others, dictionary, lang);
        };
        /**/


        return _children(translate, "".concat(_dictionary.language));
      } else {
        return t(this.props.children, this.prop.params);
      }
    }
  }]);

  return Translate;
}(_react.Component);

exports.Translate = Translate;
;