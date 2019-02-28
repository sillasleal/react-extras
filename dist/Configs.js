"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConfigsSet = exports.Configs = void 0;

require("@ssl-lib/js-extras");

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _FetchContext = require("./Fetch/FetchContext");

var _Context = require("./Firebase/Context");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

/**/
var _React$createContext = _react.default.createContext({}),
    Consumer = _React$createContext.Consumer,
    Provider = _React$createContext.Provider;
/**
 * Description of Configs
 * @author Sillas S. Leal<sillas.s.leal@gmail.com>
 */


var Configs =
/*#__PURE__*/
function (_Component) {
  _inherits(Configs, _Component);

  function Configs() {
    _classCallCheck(this, Configs);

    return _possibleConstructorReturn(this, _getPrototypeOf(Configs).apply(this, arguments));
  }

  _createClass(Configs, [{
    key: "render",
    value: function render() {
      return _react.default.createElement(Consumer, null, this.props.children);
    }
  }]);

  return Configs;
}(_react.Component);

exports.Configs = Configs;
;

var ConfigsSet =
/*#__PURE__*/
function (_Component2) {
  _inherits(ConfigsSet, _Component2);

  function ConfigsSet(props) {
    var _this;

    _classCallCheck(this, ConfigsSet);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ConfigsSet).call(this, props));
    _this.state = {};
    _this.set = _this.set.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(ConfigsSet, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      this.setState(this.props.configs);
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var configs = this.props.configs;
      /**/

      this.setState(configs);
    }
  }, {
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState) {
      return JSON.stringify(this.state) !== JSON.stringify(nextState);
    }
    /**
     * Method that set a value of especific config
     * @param {type} name
     * @param {type} value
     * @returns {undefined}
     */

  }, {
    key: "set",
    value: function set(name, value) {
      this.setState(function (state) {
        return _objectSpread({}, state, _defineProperty({}, name, value));
      });
    }
  }, {
    key: "setConsumerConfigs",
    value: function setConsumerConfigs(configName, Consumer) {
      var _this2 = this;

      if (Object.isObject(this.state[configName])) {
        return _react.default.createElement(Consumer, null, function (_ref) {
          var setConfigs = _ref.setConfigs;
          return setConfigs(_this2.state[configName]);
        });
      } else {
        return null;
      }
    }
  }, {
    key: "render",
    value: function render() {
      var canEdit = this.props.canEdit;
      var value = {
        configs: this.state
      };

      if (canEdit) {
        value.set = this.set;
      }
      /**/


      return _react.default.createElement(Provider, {
        value: value
      }, this.setConsumerConfigs('fetchConfig', _FetchContext.FetchConsumer), this.setConsumerConfigs('firebaseConfig', _Context.FirebaseConsumer), this.props.children);
    }
  }]);

  return ConfigsSet;
}(_react.Component);

exports.ConfigsSet = ConfigsSet;

_defineProperty(ConfigsSet, "propTypes", {
  configs: _propTypes.default.object.isRequired //        configs: PropTypes.object

});

_defineProperty(ConfigsSet, "defaultProps", {
  canEdit: true
});