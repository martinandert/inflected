module.exports = {
  SingularToPlural: {
    'search'      : 'searches',
    'switch'      : 'switches',
    'fix'         : 'fixes',
    'box'         : 'boxes',
    'process'     : 'processes',
    'address'     : 'addresses',
    'case'        : 'cases',
    'stack'       : 'stacks',
    'wish'        : 'wishes',
    'fish'        : 'fish',
    'jeans'       : 'jeans',
    'funky jeans' : 'funky jeans',
    'my money'    : 'my money',

    'category'    : 'categories',
    'query'       : 'queries',
    'ability'     : 'abilities',
    'agency'      : 'agencies',
    'movie'       : 'movies',

    'archive'     : 'archives',

    'index'       : 'indices',

    'wife'        : 'wives',
    'safe'        : 'saves',
    'half'        : 'halves',

    'move'        : 'moves',

    'salesperson' : 'salespeople',
    'person'      : 'people',

    'spokesman'   : 'spokesmen',
    'man'         : 'men',
    'woman'       : 'women',

    'basis'       : 'bases',
    'diagnosis'   : 'diagnoses',
    'diagnosis_a' : 'diagnosis_as',

    'datum'       : 'data',
    'medium'      : 'media',
    'stadium'     : 'stadia',
    'analysis'    : 'analyses',
    'my_analysis' : 'my_analyses',

    'node_child'  : 'node_children',
    'child'       : 'children',

    'experience'  : 'experiences',
    'day'         : 'days',

    'comment'     : 'comments',
    'foobar'      : 'foobars',
    'newsletter'  : 'newsletters',

    'old_news'    : 'old_news',
    'news'        : 'news',

    'series'      : 'series',
    'miniseries'  : 'miniseries',
    'species'     : 'species',

    'quiz'        : 'quizzes',

    'perspective' : 'perspectives',

    'ox'          : 'oxen',
    'photo'       : 'photos',
    'buffalo'     : 'buffaloes',
    'tomato'      : 'tomatoes',
    'dwarf'       : 'dwarves',
    'elf'         : 'elves',
    'information' : 'information',
    'equipment'   : 'equipment',
    'bus'         : 'buses',
    'status'      : 'statuses',
    'status_code' : 'status_codes',
    'mouse'       : 'mice',

    'louse'       : 'lice',
    'house'       : 'houses',
    'octopus'     : 'octopi',
    'virus'       : 'viri',
    'alias'       : 'aliases',
    'portfolio'   : 'portfolios',

    'vertex'      : 'vertices',
    'matrix'      : 'matrices',
    'matrix_fu'   : 'matrix_fus',

    'axis'        : 'axes',
    'taxi'        : 'taxis', // prevents regression
    'testis'      : 'testes',
    'crisis'      : 'crises',

    'rice'        : 'rice',
    'shoe'        : 'shoes',

    'horse'       : 'horses',
    'prize'       : 'prizes',
    'edge'        : 'edges',

    'database'    : 'databases',

    // regression tests against improper inflection regexes
    '|ice'        : '|ices',
    '|ouse'       : '|ouses',
    'slice'       : 'slices',
    'police'      : 'police'
  },

  CamelToUnderscore: {
    'Product'               : 'product',
    'SpecialGuest'          : 'special_guest',
    'ApplicationController' : 'application_controller',
    'Area51Controller'      : 'area51_controller'
  },

  UnderscoreToLowerCamel: {
    'product'                : 'product',
    'special_guest'          : 'specialGuest',
    'application_controller' : 'applicationController',
    'area51_controller'      : 'area51Controller'
  },

  CamelToUnderscoreWithoutReverse: {
    'HTMLTidy'              : 'html_tidy',
    'HTMLTidyGenerator'     : 'html_tidy_generator',
    'FreeBSD'               : 'free_bsd',
    'HTML'                  : 'html',
  },

  ClassNameToForeignKeyWithUnderscore: {
    'Person' : 'person_id',
    'BillingAccount' : 'billing_account_id'
  },

  ClassNameToForeignKeyWithoutUnderscore: {
    'Person' : 'personid',
    'BillingAccount' : 'billing_accountid'
  },

  ClassNameToTableName: {
    'PrimarySpokesman' : 'primary_spokesmen',
    'NodeChild'        : 'node_children'
  },

  StringToParameterized: {
    'Donald E. Knuth'                     : 'donald-e-knuth',
    'Random text with *(bad)* characters' : 'random-text-with-bad-characters',
    'Allow_Under_Scores'                  : 'allow_under_scores',
    'Trailing bad characters!@#'          : 'trailing-bad-characters',
    '!@#Leading bad characters'           : 'leading-bad-characters',
    'Squeeze   separators'                : 'squeeze-separators',
    'Test with + sign'                    : 'test-with-sign',
    'Test with malformed utf8 \251'       : 'test-with-malformed-utf8'
  },

  StringToParameterizeWithNoSeparator: {
    'Donald E. Knuth'                     : 'donaldeknuth',
    'With-some-dashes'                    : 'with-some-dashes',
    'Random text with *(bad)* characters' : 'randomtextwithbadcharacters',
    'Trailing bad characters!@#'          : 'trailingbadcharacters',
    '!@#Leading bad characters'           : 'leadingbadcharacters',
    'Squeeze   separators'                : 'squeezeseparators',
    'Test with + sign'                    : 'testwithsign',
    'Test with malformed utf8 \251'       : 'testwithmalformedutf8'
  },

  StringToParameterizeWithPreserveCase: {
    'Donald E. Knuth': 'Donald-E-Knuth',
    'Random text with *(bad)* Characters': 'Random-text-with-bad-Characters',
    'Allow_Under_Scores': 'Allow_Under_Scores',
    'Trailing BAD characters!@#': 'Trailing-BAD-characters',
    '!@#leading bad Characters': 'leading-bad-Characters',
    'squeeze   Separators': 'squeeze-Separators',
    'Test with + Sign': 'Test-with-Sign',
    'Test with malformed UTF8 \251': 'Test-with-malformed-UTF8'
  },

  StringToParameterizeWithUnderscore: {
    'Donald E. Knuth'                     : 'donald_e_knuth',
    'Random text with *(bad)* characters' : 'random_text_with_bad_characters',
    'With-some-dashes'                    : 'with-some-dashes',
    'Retain_underscore'                   : 'retain_underscore',
    'Trailing bad characters!@#'          : 'trailing_bad_characters',
    '!@#Leading bad characters'           : 'leading_bad_characters',
    'Squeeze   separators'                : 'squeeze_separators',
    'Test with + sign'                    : 'test_with_sign',
    'Test with malformed utf8 \251'       : 'test_with_malformed_utf8'
  },

  StringToParameterizedAndNormalized: {
    'Malmö'                               : 'malmo',
    'Garçons'                             : 'garcons',
    'Ops\331'                             : 'opsu',
    'Ærøskøbing'                          : 'aeroskobing',
    'Aßlar'                               : 'asslar',
    'Japanese: 日本語'                    : 'japanese'
  },

  UnderscoreToHuman: {
    'employee_salary' : 'Employee salary',
    'employee_id'     : 'Employee',
    'underground'     : 'Underground'
  },

  UnderscoreToHumanWithoutCapitalize: {
    'employee_salary' : 'employee salary',
    'employee_id'     : 'employee',
    'underground'     : 'underground'
  },

  MixtureToTitleCase: {
    'active_record'         : 'Active Record',
    'ActiveRecord'          : 'Active Record',
    'action web service'    : 'Action Web Service',
    'Action Web Service'    : 'Action Web Service',
    'Action web service'    : 'Action Web Service',
    'actionwebservice'      : 'Actionwebservice',
    'Actionwebservice'      : 'Actionwebservice',
    'david\'s code'         : 'David\'s Code',
    'David\'s code'         : 'David\'s Code',
    'david\'s Code'         : 'David\'s Code',
    'sgt. pepper\'s'        : 'Sgt. Pepper\'s',
    'i\'ve just seen a face': 'I\'ve Just Seen A Face',
    'maybe you\'ll be there': 'Maybe You\'ll Be There',
    '¿por qué?'             : '¿Por Qué?',
    'Fred’s'                : 'Fred’s',
    'Fred`s'                : 'Fred`s'
  },

  OrdinalNumbers: {
    '-1' : '-1st',
    '-2' : '-2nd',
    '-3' : '-3rd',
    '-4' : '-4th',
    '-5' : '-5th',
    '-6' : '-6th',
    '-7' : '-7th',
    '-8' : '-8th',
    '-9' : '-9th',
    '-10' : '-10th',
    '-11' : '-11th',
    '-12' : '-12th',
    '-13' : '-13th',
    '-14' : '-14th',
    '-20' : '-20th',
    '-21' : '-21st',
    '-22' : '-22nd',
    '-23' : '-23rd',
    '-24' : '-24th',
    '-100' : '-100th',
    '-101' : '-101st',
    '-102' : '-102nd',
    '-103' : '-103rd',
    '-104' : '-104th',
    '-110' : '-110th',
    '-111' : '-111th',
    '-112' : '-112th',
    '-113' : '-113th',
    '-1000' : '-1000th',
    '-1001' : '-1001st',
    '0' : '0th',
    '1' : '1st',
    '2' : '2nd',
    '3' : '3rd',
    '4' : '4th',
    '5' : '5th',
    '6' : '6th',
    '7' : '7th',
    '8' : '8th',
    '9' : '9th',
    '10' : '10th',
    '11' : '11th',
    '12' : '12th',
    '13' : '13th',
    '14' : '14th',
    '20' : '20th',
    '21' : '21st',
    '22' : '22nd',
    '23' : '23rd',
    '24' : '24th',
    '100' : '100th',
    '101' : '101st',
    '102' : '102nd',
    '103' : '103rd',
    '104' : '104th',
    '110' : '110th',
    '111' : '111th',
    '112' : '112th',
    '113' : '113th',
    '1000' : '1000th',
    '1001' : '1001st'
  },

  UnderscoresToDashes: {
    'street'                : 'street',
    'street_address'        : 'street-address',
    'person_street_address' : 'person-street-address'
  },

  Irregularities: {
    'person' : 'people',
    'man'    : 'men',
    'child'  : 'children',
    'sex'    : 'sexes',
    'move'   : 'moves',
    'cow'    : 'kine',
    'zombie' : 'zombies',
    'genus'  : 'genera'
  },

  WordsToConstantCase: {
    'Conciliation'  : 'CONCILIATION',
    'conciliation'  : 'CONCILIATION',
    'bankAccount'   : 'BANK_ACCOUNT',
    'BankAccount'   : 'BANK_ACCOUNT',
    'bank-account'  : 'BANK_ACCOUNT',
    'bank_account'  : 'BANK_ACCOUNT',
    'Bank Account'  : 'BANK_ACCOUNT',
    'Multiple   Bank Account'  : 'MULTIPLE_BANK_ACCOUNT'
  },
};
