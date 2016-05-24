'use strict';

var hasProp = require('./hasProp');
var remove  = require('./remove');
var icPart  = require('./icPart');

function Inflections() {
  this.plurals = [];
  this.singulars = [];
  this.uncountables = [];
  this.humans = [];
  this.acronyms = {};
  this.acronymRegex = /(?=a)b/;
}

Inflections.getInstance = function(locale) {
  var storage = typeof process !== 'undefined' ? process : global;
  storage.__Inflector_Inflections = storage.__Inflector_Inflections || {};
  storage.__Inflector_Inflections[locale] = storage.__Inflector_Inflections[locale] || new Inflections();

  return storage.__Inflector_Inflections[locale];
};

Inflections.prototype.acronym = function(word) {
  this.acronyms[word.toLowerCase()] = word;

  var values = [];

  for (var key in this.acronyms) {
    if (hasProp(this.acronyms, key)) {
      values.push(this.acronyms[key]);
    }
  }

  this.acronymRegex = new RegExp(values.join('|'));
};

Inflections.prototype.plural = function(rule, replacement) {
  if (typeof rule === 'string') {
    remove(this.uncountables, rule);
  }

  remove(this.uncountables, replacement);
  this.plurals.unshift([rule, replacement]);
};

Inflections.prototype.singular = function(rule, replacement) {
  if (typeof rule === 'string') {
    remove(this.uncountables, rule);
  }

  remove(this.uncountables, replacement);
  this.singulars.unshift([rule, replacement]);
};

Inflections.prototype.irregular = function(singular, plural) {
  remove(this.uncountables, singular);
  remove(this.uncountables, plural);

  var s0 = singular[0];
  var sRest = singular.substr(1);

  var p0 = plural[0];
  var pRest = plural.substr(1);

  if (s0.toUpperCase() === p0.toUpperCase()) {
    this.plural(new RegExp('(' + s0 + ')' + sRest + '$', 'i'), '$1' + pRest);
    this.plural(new RegExp('(' + p0 + ')' + pRest + '$', 'i'), '$1' + pRest);

    this.singular(new RegExp('(' + s0 + ')' + sRest + '$', 'i'), '$1' + sRest);
    this.singular(new RegExp('(' + p0 + ')' + pRest + '$', 'i'), '$1' + sRest);
  } else {
    var sRestIC = icPart(sRest);
    var pRestIC = icPart(pRest);

    this.plural(new RegExp(s0.toUpperCase() + sRestIC + '$'), p0.toUpperCase() + pRest);
    this.plural(new RegExp(s0.toLowerCase() + sRestIC + '$'), p0.toLowerCase() + pRest);
    this.plural(new RegExp(p0.toUpperCase() + pRestIC + '$'), p0.toUpperCase() + pRest);
    this.plural(new RegExp(p0.toLowerCase() + pRestIC + '$'), p0.toLowerCase() + pRest);

    this.singular(new RegExp(s0.toUpperCase() + sRestIC + '$'), s0.toUpperCase() + sRest);
    this.singular(new RegExp(s0.toLowerCase() + sRestIC + '$'), s0.toLowerCase() + sRest);
    this.singular(new RegExp(p0.toUpperCase() + pRestIC + '$'), s0.toUpperCase() + sRest);
    this.singular(new RegExp(p0.toLowerCase() + pRestIC + '$'), s0.toLowerCase() + sRest);
  }
};

Inflections.prototype.uncountable = function() {
  var words = Array.prototype.slice.call(arguments, 0);
  this.uncountables = this.uncountables.concat(words);
};

Inflections.prototype.human = function(rule, replacement) {
  this.humans.unshift([rule, replacement]);
};

Inflections.prototype.clear = function(scope) {
  scope = scope || 'all';

  if (scope === 'all') {
    this.plurals = [];
    this.singulars = [];
    this.uncountables = [];
    this.humans = [];
  } else {
    this[scope] = [];
  }
};

module.exports = Inflections;
