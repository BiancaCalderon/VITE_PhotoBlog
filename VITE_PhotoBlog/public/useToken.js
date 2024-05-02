"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.TokenProvider = exports.TokenContext = void 0;
var _react = require("react");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function parseJwt(token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
  return JSON.parse(jsonPayload);
}
var TokenContext = exports.TokenContext = (0, _react.createContext)({
  token: '',
  useToken: function useToken() {}
});
var TokenProvider = exports.TokenProvider = function TokenProvider(_ref) {
  var children = _ref.children;
  var _useState = (0, _react.useState)(localStorage.getItem('access_token') || null),
    _useState2 = _slicedToArray(_useState, 2),
    token = _useState2[0],
    setToken = _useState2[1];
  (0, _react.useEffect)(function () {
    if (token) {
      localStorage.setItem('access_token', token);
    }
  }, [token]);
  var isLoggedIn = !!token;
  var getRawToken = function getRawToken() {
    return parseJwt(token);
  };
  return createElement(TokenContext.Provider, {
    value: {
      token: token,
      setToken: setToken,
      isLoggedIn: isLoggedIn,
      getRawToken: getRawToken
    }
  }, children);
};
var useToken = function useToken() {
  return (0, _react.useContext)(TokenContext);
};
var _default = exports["default"] = useToken;
