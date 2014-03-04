# inflected

A port of ActiveSupport's inflector to Node.js.


## Installation

Install via npm:

```bash
% npm install inflected
```


## Usage

The module exports an object with has several utility functions.

```js
var Inflector = require('inflected');
```

Here is the complete API reference:


#### Inflector.pluralize(word, [locale := 'en'])

Returns the plural form of the word in the string.

If passed an optional `locale` parameter, the word will be
pluralized using rules defined for that language. By default,
this parameter is set to "en".

```js
Inflector.pluralize('post')             // => 'posts'
Inflector.pluralize('octopus')          // => 'octopi'
Inflector.pluralize('sheep')            // => 'sheep'
Inflector.pluralize('words')            // => 'words'
Inflector.pluralize('CamelOctopus')     // => 'CamelOctopi'
Inflector.pluralize('ley', 'es')        // => 'leyes'
```

#### Inflector.singularize(word, [locale := 'en'])

The reverse of `pluralize`, returns the singular form of a word in a
string.

If passed an optional `locale` parameter, the word will be
singularized using rules defined for that language. By default,
this parameter is set to "en".

```js
Inflector.singularize('posts')            // => 'post'
Inflector.singularize('octopi')           // => 'octopus'
Inflector.singularize('sheep')            // => 'sheep'
Inflector.singularize('word')             // => 'word'
Inflector.singularize('CamelOctopi')      // => 'CamelOctopus'
Inflector.singularize('leyes', 'es')      // => 'ley'
```


*to be continued...* 


## Contributing

Here's a quick guide:

1. Fork the repo and `make install`.

2. Run the tests. We only take pull requests with passing tests, and it's great to know that you have a clean slate: `make test`.

3. Add a test for your change. Only refactoring and documentation changes require no new tests. If you are adding functionality or are fixing a bug, we need a test!

4. Make the test pass.

5. Push to your fork and submit a pull request.


## Licence

Released under The MIT License.
