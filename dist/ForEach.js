"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**/

/**
 * Component ForEach
 * @description text
 * @author Sillas S. Leal<sillas.santos.leal@accenture.com>
 */
var _default = function _default(_ref) {
  var list = _ref.list,
      children = _ref.children,
      _ref$each = _ref.each,
      each = _ref$each === void 0 ? "children" : _ref$each;

  if (_typeof(list) === 'object') {
    if (Array.isArray(list)) {
      if (typeof children === 'function') {
        return list.map(children);
      } else {
        var Cpm = children.type;
        var props = children.props;

        if (each === 'children') {
          return list.map(function (item, key) {
            return _react["default"].createElement(Cpm, _extends({}, props, {
              key: key
            }), item);
          });
        } else {
          return list.map(function (item, key) {
            return _react["default"].createElement(Cpm, _extends({}, props, {
              key: key
            }, _defineProperty({}, each, item)));
          });
        }
      }
    } else if (list) {
      var keys = Object.keys(list);

      if (typeof children === 'function') {
        return keys.map(function (index, key) {
          return children(list[index], key);
        });
      } else {
        var _Cpm = children.type;
        var _props = children.props;

        if (each === 'children') {
          return keys.map(function (item, key) {
            return _react["default"].createElement(_Cpm, _extends({}, _props, {
              key: key
            }), list[item]);
          });
        } else {
          return keys.map(function (item, key) {
            return _react["default"].createElement(_Cpm, _extends({}, _props, {
              key: key
            }, _defineProperty({}, each, list[item])));
          });
        }
      }
    } else {
      return null;
    }
  } else {
    return null;
  }
};

exports["default"] = _default;