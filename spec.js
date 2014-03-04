var assert = require('assert');
var extend = require('extend');

var Inflector = require('./');
var inflect   = Inflector.inflections();

var TestCases = require('./test/cases');

function withDup(fn) {
  var originalInflections = process.__Inflector_Inflections;
  process.__Inflector_Inflections = extend(true, {}, originalInflections);

  var originalTransliterator = process.__Inflector_Transliterator;
  process.__Inflector_Transliterator = null;

  fn();

  process.__Inflector_Transliterator = originalTransliterator;
  process.__Inflector_Inflections = originalInflections;
}

function objEach(obj, fn) {
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      fn(key, obj[key]);
    }
  }
}

describe('Inflector', function() {
  it('properly pluralizes plurals', function() {
    assert.equal(Inflector.pluralize('plurals'), 'plurals');
    assert.equal(Inflector.pluralize('Plurals'), 'Plurals');
  });

  it('properly pluralizes empty string', function() {
    assert.equal(Inflector.pluralize(''), '');
  });

  it('properly capitalizes strings', function() {
    assert.equal(Inflector.capitalize('foo'), 'Foo');
    assert.equal(Inflector.capitalize('FOO'), 'FOO');
    assert.equal(Inflector.capitalize('foo bar'), 'Foo bar');
    assert.equal(Inflector.capitalize(123), '123');
    assert.equal(Inflector.capitalize(''), '');
    assert.equal(Inflector.capitalize(null), '');
    assert.equal(Inflector.capitalize(undefined), '');
  });

  inflect.uncountables.forEach(function(word) {
    it('respects the uncountability of ' + word, function() {
      assert.equal(Inflector.singularize(word), word);
      assert.equal(Inflector.pluralize(word), word);
      assert.equal(Inflector.singularize(word), Inflector.pluralize(word));
    });
  });

  it('checks uncountable word is not greedy', function() {
    withDup(function() {
      var uncountableWord = 'ors';
      var countableWord = 'sponsor';

      inflect.uncountables.push(uncountableWord);

      assert.equal(Inflector.singularize(uncountableWord), uncountableWord);
      assert.equal(Inflector.pluralize(uncountableWord), uncountableWord);
      assert.equal(Inflector.singularize(uncountableWord), Inflector.pluralize(uncountableWord));

      assert.equal(Inflector.singularize(countableWord), 'sponsor');
      assert.equal(Inflector.pluralize(countableWord), 'sponsors');
      assert.equal(Inflector.singularize(Inflector.pluralize(countableWord)), 'sponsor');
    });
  });

  objEach(TestCases.SingularToPlural, function(singular, plural) {
    it('properly pluralizes ' + singular, function() {
      assert.equal(Inflector.pluralize(singular), plural);
      assert.equal(Inflector.pluralize(Inflector.capitalize(singular)), Inflector.capitalize(plural));
    });

    it('properly pluralizes ' + plural, function() {
      assert.equal(Inflector.pluralize(plural), plural);
      assert.equal(Inflector.pluralize(Inflector.capitalize(plural)), Inflector.capitalize(plural));
    });

    it('properly singularizes ' + plural, function() {
      assert.equal(Inflector.singularize(plural), singular);
      assert.equal(Inflector.singularize(Inflector.capitalize(plural)), Inflector.capitalize(singular));
    });

    it('properly singularizes ' + singular, function() {
      assert.equal(Inflector.singularize(singular), singular);
      assert.equal(Inflector.singularize(Inflector.capitalize(singular)), Inflector.capitalize(singular));
    });
  });

  it('allows overwriting defined inflectors', function() {
    withDup(function() {
      assert.equal(Inflector.singularize('series'), 'series');
      inflect.singular('series', 'serie');
      assert.equal(Inflector.singularize('series'), 'serie');
    });
  });

  objEach(TestCases.MixtureToTitleCase, function(mixture, titleized) {
    it('properly titleizes ' + mixture, function() {
      assert.equal(Inflector.titleize(mixture), titleized);
    });
  });

  objEach(TestCases.CamelToUnderscore, function(camel, underscore) {
    it('properly camelizes ' + underscore, function() {
      assert.equal(Inflector.camelize(underscore), camel);
    });
  });

  it('properly camelizes with lower downcases the first letter', function() {
    assert.equal(Inflector.camelize('Capital', false), 'capital');
  });

  it('properly camelizes with underscores', function() {
    assert.equal(Inflector.camelize('Camel_Case'), 'CamelCase');
  });

  it('properly handles acronyms', function() {
    inflect.acronym('API')
    inflect.acronym('HTML')
    inflect.acronym('HTTP')
    inflect.acronym('RESTful')
    inflect.acronym('W3C')
    inflect.acronym('PhD')
    inflect.acronym('RoR')
    inflect.acronym('SSL')

    //  camelize             underscore            humanize              titleize
    var items = [
      ['API',               'api',                'API',                'API'],
      ['APIController',     'api_controller',     'API controller',     'API Controller'],
      ['Nokogiri/HTML',     'nokogiri/html',      'Nokogiri/HTML',      'Nokogiri/HTML'],
      ['HTTPAPI',           'http_api',           'HTTP API',           'HTTP API'],
      ['HTTP/Get',          'http/get',           'HTTP/get',           'HTTP/Get'],
      ['SSLError',          'ssl_error',          'SSL error',          'SSL Error'],
      ['RESTful',           'restful',            'RESTful',            'RESTful'],
      ['RESTfulController', 'restful_controller', 'RESTful controller', 'RESTful Controller'],
      ['IHeartW3C',         'i_heart_w3c',        'I heart W3C',        'I Heart W3C'],
      ['PhDRequired',       'phd_required',       'PhD required',       'PhD Required'],
      ['IRoRU',             'i_ror_u',            'I RoR u',            'I RoR U'],
      ['RESTfulHTTPAPI',    'restful_http_api',   'RESTful HTTP API',   'RESTful HTTP API'],

      // misdirection
      ['Capistrano',        'capistrano',         'Capistrano',       'Capistrano'],
      ['CapiController',    'capi_controller',    'Capi controller',  'Capi Controller'],
      ['HttpsApis',         'https_apis',         'Https apis',       'Https Apis'],
      ['Html5',             'html5',              'Html5',            'Html5'],
      ['Restfully',         'restfully',          'Restfully',        'Restfully'],
      ['RoRails',           'ro_rails',           'Ro rails',         'Ro Rails']
    ];

    var camel, under, human, title;

    for (var i in items) {
      camel = items[i][0];
      under = items[i][1];
      human = items[i][2];
      title = items[i][3];

      assert.equal(Inflector.camelize(under), camel);
      assert.equal(Inflector.camelize(camel), camel);
      assert.equal(Inflector.underscore(under), under);
      assert.equal(Inflector.underscore(camel), under);
      assert.equal(Inflector.titleize(under), title);
      assert.equal(Inflector.titleize(camel), title);
      assert.equal(Inflector.humanize(under), human);
    }
  });

  it('allows overwriting acronyms', function() {
    inflect.acronym('API');
    inflect.acronym('LegacyApi');

    assert.equal(Inflector.camelize('legacyapi'), 'LegacyApi');
    assert.equal(Inflector.camelize('legacy_api'), 'LegacyAPI');
    assert.equal(Inflector.camelize('some_legacyapi'), 'SomeLegacyApi');
    assert.equal(Inflector.camelize('nonlegacyapi'), 'Nonlegacyapi');
  });

  it('properly handles lower camelized acronyms', function() {
    inflect.acronym('API');
    inflect.acronym('HTML');

    assert.equal(Inflector.camelize('html_api', false), 'htmlAPI');
    assert.equal(Inflector.camelize('htmlAPI', false),  'htmlAPI');
    assert.equal(Inflector.camelize('HTMLAPI', false),  'htmlAPI');
  });

  it('properly handles lower camelized acronyms', function() {
    inflect.acronym('API');
    inflect.acronym('JSON');
    inflect.acronym('HTML');

    assert.equal(Inflector.underscore('JSONHTMLAPI'), 'json_html_api');
  });

  it('properly underscores', function() {
    objEach(TestCases.CamelToUnderscore, function(camel, underscore) {
      assert.equal(Inflector.underscore(camel), underscore);
    });

    objEach(TestCases.CamelToUnderscoreWithoutReverse, function(camel, underscore) {
      assert.equal(Inflector.underscore(camel), underscore);
    });
  });

  it('properly adds a foreign key sufix', function() {
    objEach(TestCases.ClassNameToForeignKeyWithUnderscore, function(klass, foreignKey) {
      assert.equal(Inflector.foreignKey(klass), foreignKey);
    });

    objEach(TestCases.ClassNameToForeignKeyWithoutUnderscore, function(klass, foreignKey) {
      assert.equal(Inflector.foreignKey(klass, false), foreignKey);
    });
  });

  it('properly tableizes class names', function() {
    objEach(TestCases.ClassNameToTableName, function(className, tableName) {
      assert.equal(Inflector.tableize(className), tableName);
    });
  });

  it('properly classifies table names', function() {
    objEach(TestCases.ClassNameToTableName, function(className, tableName) {
      assert.equal(Inflector.classify(tableName), className);
      assert.equal(Inflector.classify('table_prefix.' + tableName), className);
    });
  });

  it('properly classifies with leading schema name', function() {
    assert.equal(Inflector.classify('schema.foo_bar'), 'FooBar');
  });

  it('properly humanizes underscored strings', function() {
    objEach(TestCases.UnderscoreToHuman, function(underscore, human) {
      assert.equal(Inflector.humanize(underscore), human);
    });
  });

  it('properly humanizes underscored strings without capitalize', function() {
    objEach(TestCases.UnderscoreToHumanWithoutCapitalize, function(underscore, human) {
      assert.equal(Inflector.humanize(underscore, { capitalize: false }), human);
    });
  });

  it('properly humanizes by rule', function() {
    inflect.human(/_cnt$/i, '_count');
    inflect.human(/^prefx_/i, '');

    assert.equal(Inflector.humanize('jargon_cnt'), 'Jargon count');
    assert.equal(Inflector.humanize('prefx_request'), 'Request');
  });

  it('properly humanizes by string', function() {
    inflect.human('col_rpted_bugs', 'Reported bugs');

    assert.equal(Inflector.humanize('col_rpted_bugs'), 'Reported bugs');
    assert.equal(Inflector.humanize('COL_rpted_bugs'), 'Col rpted bugs');
  });

  it('properly generates ordinal suffixes', function() {
    objEach(TestCases.OrdinalNumbers, function(number, ordinalized) {
      assert.equal(ordinalized, number + Inflector.ordinal(number))
    });
  });

  it('properly ordinalizes numbers', function() {
    objEach(TestCases.OrdinalNumbers, function(number, ordinalized) {
      assert.equal(Inflector.ordinalize(number), ordinalized);
    });
  });

  it('properly dasherizes underscored strings', function() {
    objEach(TestCases.UnderscoresToDashes, function(underscored, dasherized) {
      assert.equal(Inflector.dasherize(underscored), dasherized);
    });
  });

  it('properly underscores as reverse of dasherize', function() {
    objEach(TestCases.UnderscoresToDashes, function(underscored) {
      assert.equal(Inflector.underscore(Inflector.dasherize(underscored)), underscored);
    });
  });

  it('properly underscores to lower camel', function() {
    objEach(TestCases.UnderscoreToLowerCamel, function(underscored, lowerCamel) {
      assert.equal(Inflector.camelize(underscored, false), lowerCamel);
    });
  });

  it('respects the inflector locale', function() {
    Inflector.inflections('es', function(inflect) {
      inflect.plural(/$/, 's');
      inflect.plural(/z$/i, 'ces');

      inflect.singular(/s$/, '');
      inflect.singular(/es$/, '');

      inflect.irregular('el', 'los');
    });

    assert.equal(Inflector.pluralize('hijo', 'es'), 'hijos');
    assert.equal(Inflector.pluralize('luz', 'es'),  'luces');
    assert.equal(Inflector.pluralize('luz'),        'luzs');

    assert.equal(Inflector.singularize('sociedades', 'es'), 'sociedad');
    assert.equal(Inflector.singularize('sociedades'),       'sociedade');

    assert.equal(Inflector.pluralize('el', 'es'), 'los');
    assert.equal(Inflector.pluralize('el'),       'els');

    Inflector.inflections('es', function(inflect) {
      inflect.clear();
    });

    assert(Inflector.inflections('es').plurals.length === 0);
    assert(Inflector.inflections('es').singulars.length === 0);
    assert(Inflector.inflections().plurals.length !== 0);
    assert(Inflector.inflections().singulars.length !== 0);
  });

  objEach(TestCases.Irregularities, function(singular, plural) {
    it('respects the irregularity between ' + singular + ' and ' + plural, function() {
      withDup(function() {
        Inflector.inflections(function(inflect) {
          inflect.irregular(singular, plural)
          assert.equal(Inflector.singularize(plural), singular);
          assert.equal(Inflector.pluralize(singular), plural);
        });
      });
    });
  });

  objEach(TestCases.Irregularities, function(singular, plural) {
    it('makes sure that pluralize of irregularity ' + plural + ' is the same', function() {
      withDup(function() {
        Inflector.inflections(function(inflect) {
          inflect.irregular(singular, plural)
          assert.equal(Inflector.pluralize(plural), plural);
        });
      });
    });
  });

  objEach(TestCases.Irregularities, function(singular, plural) {
    it('makes sure that singularize of irregularity ' + singular + ' is the same', function() {
      withDup(function() {
        Inflector.inflections(function(inflect) {
          inflect.irregular(singular, plural)
          assert.equal(Inflector.singularize(singular), singular);
        });
      });
    });
  });

  ['plurals', 'singulars', 'uncountables', 'humans', 'acronyms'].forEach(function(scope) {
    it('properly clears ' + scope + ' inflection scope', function() {
      withDup(function() {
        inflect.clear(scope);
        assert(inflect[scope].length === 0);
      });
    });
  });

  it('properly clears all reflection scopes', function() {
    withDup(function() {
      Inflector.inflections(function(inflect) {
        // ensure any data is present
        inflect.plural(/(quiz)$/i, '$1zes');
        inflect.singular(/(database)s$/i, '$1');
        inflect.uncountable('series');
        inflect.human('col_rpted_bugs', 'Reported bugs');

        inflect.clear('all');

        assert(inflect.plurals.length === 0);
        assert(inflect.singulars.length === 0);
        assert(inflect.uncountables.length === 0);
        assert(inflect.humans.length === 0);
      });
    });
  });

  it('properly clears with default', function() {
    withDup(function() {
      Inflector.inflections(function(inflect) {
        // ensure any data is present
        inflect.plural(/(quiz)$/i, '$1zes');
        inflect.singular(/(database)s$/i, '$1');
        inflect.uncountable('series');
        inflect.human('col_rpted_bugs', 'Reported bugs');

        inflect.clear();

        assert(inflect.plurals.length === 0);
        assert(inflect.singulars.length === 0);
        assert(inflect.uncountables.length === 0);
        assert(inflect.humans.length === 0);
      });
    });
  });

  it('properly parameterizes', function() {
    objEach(TestCases.StringToParameterized, function(someString, parameterizedString) {
      assert.equal(Inflector.parameterize(someString), parameterizedString);
    });
  });

  it('properly parameterizes and normalizes', function() {
    objEach(TestCases.StringToParameterizedAndNormalized, function(someString, parameterizedString) {
      assert.equal(Inflector.parameterize(someString), parameterizedString);
    });
  });

  it('properly parameterizes with custom separator', function() {
    objEach(TestCases.StringToParameterizeWithUnderscore, function(someString, parameterizedString) {
      assert.equal(Inflector.parameterize(someString, { separator: '_' }), parameterizedString);
    });
  });

  it('properly parameterizes with no separator', function() {
    objEach(TestCases.StringToParameterizeWithNoSeparator, function(someString, parameterizedString) {
      assert.equal(Inflector.parameterize(someString, { separator: null }), parameterizedString);
      assert.equal(Inflector.parameterize(someString, { separator: '' }), parameterizedString);
    });
  });

  it('properly parameterizes with multi character separator', function() {
    objEach(TestCases.StringToParameterized, function(someString, parameterizedString) {
      assert.equal(Inflector.parameterize(someString, { separator: '__sep__' }), parameterizedString.replace(/-/g, '__sep__'));
    });
  });

  it('allows overwriting transliterate approximations', function() {
    withDup(function() {
      assert.equal(Inflector.parameterize('Jürgen'), 'jurgen');

      Inflector.transliterations(function(transliterate) {
        transliterate.approximate('ü', 'ue');
      });

      assert.equal(Inflector.parameterize('Jürgen'), 'juergen');
    });
  });

  it('allows overwriting transliterate approximations for a specific locale', function() {
    withDup(function() {
      assert.equal(Inflector.parameterize('Jürgen'), 'jurgen');
      assert.equal(Inflector.parameterize('Jürgen', { locale: 'de' }), 'jurgen');

      Inflector.transliterations('de', function(transliterate) {
        transliterate.approximate('ü', 'ue');
      });

      assert.equal(Inflector.parameterize('Jürgen'), 'jurgen');
      assert.equal(Inflector.parameterize('Jürgen', { locale: 'de' }), 'juergen');
    });
  });
});
