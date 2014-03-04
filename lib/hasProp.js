'use strict';

var hasOwnProp = Object.prototype.hasOwnProperty;

function hasProp(obj, key) {
  return hasOwnProp.call(obj, key);
}

module.exports = hasProp;
