"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TranslateContext = exports.AppendDicionary = exports.InjectTranslate = exports.SetLang = exports.Translate = exports.TranslateProvider = void 0;

require("@ssl-lib/js-extras");

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { if (i % 2) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } else { Object.defineProperties(target, Object.getOwnPropertyDescriptors(arguments[i])); } } return target; }

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
var TranslateContext = (0, _react.createContext)({
  language: defaultLang
});
exports.TranslateContext = TranslateContext;
var Consumer = TranslateContext.Consumer,
    Provider = TranslateContext.Provider;

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
      language: defaultLang,
      languages: []
    };
    return _this;
  }

  _createClass(TranslateProvider, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.setLang(this.props.language);
      this.setDictionary(this.props.dictionary);
    }
    /**
     * Método que define o idioma
     * @param {String} language O idioma a ser definido
     * @param {Array} languages Lista de idiomas padrão
     * @returns {null}
     */

  }, {
    key: "setLang",
    value: function setLang(language) {
      var languages = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

      if (String.isValid(language)) {
        this.setState({
          language: language,
          languages: Array.isArray(languages) ? languages.filter(function (i) {
            return String.isValid(i);
          }) : []
        });
      } else if (typeof language === 'undefined') {
        //Detect the browser language
        this.setLang(Object.readProp(window, 'navigator.language', this.props.errorLanguage), Object.readProp(window, 'navigator.languages', []));
      } else {
        console.error('Invalid language, language need to be a String or undefined:', language);
      }
      /**/


      return null;
    }
    /**
     * Método que define o dicionário
     * @param {object|Promise} dictionary O dicionário ou Promise que entregará o dicionário
     * @param {String} language (Opcional)O idioma do dicionário
     * @returns {undefined}
     */

  }, {
    key: "setDictionary",
    value: function setDictionary(dictionary, language) {
      var _this2 = this;

      if (!Object.isObject(dictionary)) {
        return console.error("Dictionary need to be a object: ", dictionary);
      }
      /**/


      if (dictionary instanceof Promise) {
        dictionary.then(function (s) {
          return _this2.setDictionary(s);
        });
      } else {
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
    }
    /**
     * Método que concatena um novo dicionário ao dicionary existente
     * @param {object} newDictionary O novo dicionário
     * @return {undefined}
     */

  }, {
    key: "appendDictionary",
    value: function appendDictionary(newDictionary) {
      if (Object.isObject(newDictionary)) {
        this.setState(function (state) {
          return {
            dictionary: Object.assignDeep(state.dictionary, newDictionary)
          };
        });
      } else {
        console.error('dictionary need to be a object');
      }

      return null;
    }
    /**
     * Método que realiza a tradução da palavra para o idioma selecionado
     * @param {String} key A chave referente a palavra
     * @param {object} params Os parametros a serem inseridos na string ou usados para o plural
     * @param {object} personalDict Um dicionário exclusivo da execução
     * @param {String} personalLang O idioma especifico da execução
     * @returns {newWord|TranslateProvider@call;translate|TranslateProvider.translate.key|String}
     */

  }, {
    key: "translate",
    value: function translate(key) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var personalDict = arguments.length > 2 ? arguments[2] : undefined;
      var personalLang = arguments.length > 3 ? arguments[3] : undefined;

      /*
       *  LÓGICA
       *  SE key é String:
       *      #Verifica se personalLang é válida e usa esse idioma no método
       *      #Verifica se existe um dicionário * e cria um dicionario local ao método
       *      #Verifica se existe um dicionário * para o idioma usado, algo como pt-*, o que englobaria 'pt, pt-BR, pt-AN e etc' e o mescla ao resultado anterior para uso no método
       *      #Verifica se o personalDict é valido, se for, o mescla com o dicionário global e o local criado anteriormente e o usa o resultado no método
       *      #Verifica se as prorpiedades de params existem no valor associado a key e substitue na string final
       *  CASE SE key é Array:
       *      #Trata o caso 'plural'
       *      #Verifica se o array possui três elementos
       *      #Verifica se o ultimo elemento é uma propriedade de params
       *      #Verifica se essa propriedade é 1
       *      #Caso seja 1, chama o método novamente passando o primeiro elemento do array
       *      #Caso contrário, chama o método novamente passando o segundo elemento do array
       *  CASE CONTRÁRIO:
       *      Exibe um erro
       *      Retorna ''
       */
      if (typeof key === 'string') {
        if (!String.isValid(key)) {
          console.error('key need to be a string!');
          return '';
        } //String


        var errorLanguage = this.props.errorLanguage,
            _this$state = this.state,
            language = _this$state.language,
            languages = _this$state.languages,
            dictionary = _this$state.dictionary;
        var newWord,
            languagesArray = [].concat(_toConsumableArray(languages), [errorLanguage]);
        var dictionaries = Object.isObject(personalDict) ? Object.assignDeep(dictionary, personalDict) : _objectSpread({}, dictionary);
        var dictCoringa = Object.readProp(dictionaries, '*', {});
        /* Buscando a palavra nos diversos dicionários */

        if (String.isValid(language)) {
          languagesArray = [language].concat(_toConsumableArray(languagesArray));
        }

        if (String.isValid(personalLang)) {
          languagesArray = [personalLang].concat(_toConsumableArray(languagesArray));
        }

        languagesArray = _toConsumableArray(new Set(languagesArray));
        var langOfCoringa, dictOfCoringaLang, dictionaryOfLang, word;

        for (var i = 0; i < languagesArray.length; i++) {
          if (String.isValid(languagesArray[i])) {
            langOfCoringa = languagesArray[i].indexOf('-') > -1 ? languagesArray[i].split('-')[0] : languagesArray[i];
            dictOfCoringaLang = Object.readProp(dictionaries, "".concat(langOfCoringa, "-*"), {});
            dictionaryOfLang = Object.readProp(dictionaries, languagesArray[i], {});
            word = dictionaryOfLang[key] || dictOfCoringaLang[key] || dictCoringa[key];

            if (word) {
              break;
            }
          }
        }

        if (!word) {
          word = "".concat(key);
        }
        /**/


        if (typeof word === 'function') {
          newWord = word(params, dictionaries, localLang) || '';
        } else if (typeof word === 'undefined') {
          newWord = key;
        } else {
          newWord = "".concat(word);
        }
        /**/


        if (Object.isObject(params) && String.isValid(newWord)) {
          for (var prop in params) {
            newWord = newWord.replaceAll("{".concat(prop, "}"), params[prop]);
          }
        } //ESTE TRECHO ESTA COM PROBLEMAS, DEVE SER IMPLEMENTADA UMA CHAMADA RECURSIVA QUE TROQUE TODAS AS CHAVES
        //            if (newWord.indexOf("{") > -1) {
        //                const wordSplit = newWord.split("{");
        //                for (var item in wordSplit) {
        //                    const dictKey = wordSplit[item].substr(0, wordSplit[item].indexOf("}"));
        //                    if (String.isValid(dictKey) && String.isValid(dictionary[dictKey])) {
        //                        newWord = newWord.replaceAll(dictKey, dictionary[dictKey]);
        //                    }
        //                }
        //            }

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
        setLang: this.setLang.bind(this),
        appendDictionary: this.appendDictionary.bind(this)
      };
      /**/

      return _react["default"].createElement(Provider, {
        value: value
      }, this.props.children);
    }
  }]);

  return TranslateProvider;
}(_react.Component);

exports.TranslateProvider = TranslateProvider;

_defineProperty(TranslateProvider, "propTypes", {
  dictionary: _propTypes["default"].object,
  language: _propTypes["default"].string,
  errorLanguage: _propTypes["default"].string.isRequired
});

var Translate = function Translate(_ref) {
  var children = _ref.children,
      params = _ref.params,
      dictionary = _ref.dictionary,
      lang = _ref.lang;
  return typeof children === 'function' ? _react["default"].createElement(Consumer, null, function (_ref2) {
    var translate = _ref2.translate;
    return children(function (k, o) {
      return translate(k, o, dictionary, lang);
    });
  }) : _react["default"].createElement(Consumer, null, function (_ref3) {
    var translate = _ref3.translate;
    return translate(children, params);
  });
};

exports.Translate = Translate;

var SetLang = function SetLang(_ref4) {
  var children = _ref4.children;
  return typeof children === 'function' ? _react["default"].createElement(Consumer, null, function (_ref5) {
    var setLang = _ref5.setLang;
    return children(setLang);
  }) : _react["default"].createElement(Consumer, null, function (_ref6) {
    var setLang = _ref6.setLang;
    return setLang(children);
  });
};

exports.SetLang = SetLang;

var InjectTranslate = function InjectTranslate(Cpm, dictionary) {
  return function (props) {
    return _react["default"].createElement(Consumer, null, function (_ref7) {
      var _translate = _ref7.translate;
      return _react["default"].createElement(Cpm, _extends({}, props, {
        translate: function translate(a, b) {
          return _translate(a, b, dictionary);
        }
      }));
    });
  };
};

exports.InjectTranslate = InjectTranslate;

var AppendDicionary = function AppendDicionary(_ref8) {
  var dictionary = _ref8.dictionary,
      children = _ref8.children;
  return _react["default"].createElement(Consumer, null, function (_ref9) {
    var appendDictionary = _ref9.appendDictionary;
    appendDictionary(dictionary);
    /**/

    return children ? children : null;
  });
};

exports.AppendDicionary = AppendDicionary;