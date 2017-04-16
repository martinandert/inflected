import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';

const pkg = require('./package.json');

export default {
  entry: 'src/index.js',
  plugins: [
    resolve(),
    babel({
      exclude: 'node_modules/**',
    }),
  ],
  targets: [
    { dest: pkg.main, format: 'umd', moduleName: 'Inflector' },
    { dest: pkg.module, format: 'es' },
  ],
};
