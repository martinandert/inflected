'use strict';

function icPart(str) {
  return str.split('').map(function(char) { return '(?:' + [char.toUpperCase(), char.toLowerCase()].join('|') + ')'; }).join('')
}

module.exports = icPart;
