"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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

/**
 * Description of LifeCircleForPure
 * @author Sillas S. Leal<sillas.santos.leal@accenture.com>
 */
var LifeCircleForPure =
/*#__PURE__*/
function (_Component) {
  _inherits(LifeCircleForPure, _Component);

  function LifeCircleForPure(props) {
    var _this;

    _classCallCheck(this, LifeCircleForPure);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(LifeCircleForPure).call(this, props));

    if (typeof props.constructor === 'function') {
      props.constructor(props);
    }

    return _this;
  }

  _createClass(LifeCircleForPure, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.props.componentDidMount();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState, snapshot) {
      this.props.componentDidUpdate(prevProps, prevState, snapshot);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.props.componentWillUnmount();
    }
  }, {
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState) {
      return this.props.shouldComponentUpdate(nextProps, nextState);
    } //    
    //    getSnapshotBeforeUpdate(prevProps, prevState) {
    //        this.props.getSnapshotBeforeUpdate(prevProps, prevState);
    //    }

  }, {
    key: "componentDidCatch",
    value: function componentDidCatch(error, info) {
      this.props.componentDidCatch(error, info);
    } //    UNSAFE_componentWillMount(){
    //        this.props.componentWillMount();
    //    }
    //    
    //    UNSAFE_componentWillReceiveProps(nextProps){
    //        this.props.componentWillReceiveProps(nextProps);
    //    }
    //    
    //    UNSAFE_componentWillUpdate(nextProps, nextState) {
    //        this.props.componentWillUpdate(nextProps, nextState);
    //    }

  }, {
    key: "render",
    value: function render() {
      if (typeof this.props.children === 'function') {
        return this.props.children({
          setState: this.setState.bind(this)
        });
      } else {
        return this.props.children;
      }
    }
  }]);

  return LifeCircleForPure;
}(_react.Component);

exports["default"] = LifeCircleForPure;

_defineProperty(LifeCircleForPure, "propTypes", {
  componentDidMount: _propTypes["default"].func,
  componentDidUpdate: _propTypes["default"].func,
  componentWillUnmount: _propTypes["default"].func,
  shouldComponentUpdate: _propTypes["default"].func,
  getSnapshotBeforeUpdate: _propTypes["default"].func,
  componentDidCatch: _propTypes["default"].func,
  componentWillMount: _propTypes["default"].func,
  componentWillReceiveProps: _propTypes["default"].func,
  componentWillUpdate: _propTypes["default"].func,
  constructor: _propTypes["default"].func
});

_defineProperty(LifeCircleForPure, "defaultProps", {
  componentDidMount: function componentDidMount() {
    return {};
  },
  componentDidUpdate: function componentDidUpdate() {
    return {};
  },
  componentWillUnmount: function componentWillUnmount() {
    return {};
  },
  shouldComponentUpdate: function shouldComponentUpdate() {
    return true;
  },
  getSnapshotBeforeUpdate: function getSnapshotBeforeUpdate() {
    return {};
  },
  componentDidCatch: function componentDidCatch() {
    return {};
  },
  componentWillMount: function componentWillMount() {
    return {};
  },
  componentWillReceiveProps: function componentWillReceiveProps() {
    return {};
  },
  componentWillUpdate: function componentWillUpdate() {
    return {};
  },
  constructor: function constructor() {
    return {};
  }
});

;