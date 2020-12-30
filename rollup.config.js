import nodeResolve from '@rollup/plugin-node-resolve';
import babel from 'rollup-plugin-babel';

const pkg = require('./package.json');

export default {
  input: 'src/index.js',
  plugins: [
    nodeResolve(),
    babel({
      exclude: 'node_modules/**',
    }),
  ],
  output: [
    { file: pkg.main, format: 'umd', name: 'Inflector' },
    { file: pkg.module, format: 'es' },
  ],
};
