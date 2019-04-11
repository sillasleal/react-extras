"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**/

/**
 * Component For
 * @description text
 * @author Sillas S. Leal<sillas.santos.leal@accenture.com>
 */
var _default = function _default(_ref) {
  var children = _ref.children,
      inArray = _ref.of,
      _ref$to = _ref.to,
      each = _ref$to === void 0 ? "children" : _ref$to;

  if (typeof children === 'function') {
    return inArray.map(children);
  } else {
    var Cpm = children.type;

    if (each === 'children') {
      return inArray.map(function (item, key) {
        return _react["default"].createElement(Cpm, {
          key: key
        }, item);
      });
    } else {
      return inArray.map(function (item, key) {
        var props = _defineProperty({
          key: key
        }, each, item);
        /**/


        return _react["default"].createElement(Cpm, props);
      });
    }
  }
};

exports["default"] = _default;