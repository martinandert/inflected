'use strict';

var toString = Object.prototype.toString;

function isFunc(obj) {
  return toString.call(obj) === '[object Function]';
}

module.exports = isFunc;
