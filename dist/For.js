"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = require("react");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**/
var testCache = function testCache(prev, next) {
  return JSON.stringify(prev) !== JSON.stringify(next);
};
/**
 * Component For
 * @description text
 * @author Sillas S. Leal<sillas.santos.leal@accenture.com>
 */


var _default = (0, _react.memo)(function (_ref) {
  var children = _ref.children,
      inArray = _ref.of,
      _ref$to = _ref.to,
      each = _ref$to === void 0 ? "children" : _ref$to;
  return inArray.map(function (item, key) {
    if (typeof children === 'function') {
      return children(item, key);
    } else {
      return (0, _react.createElement)(children.type, _defineProperty({
        key: key
      }, each, item), null, each === 'children' ? item : null);
    }
  });
}, testCache);

exports.default = _default;