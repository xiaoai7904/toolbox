const path = require('path');
const babel = require('rollup-plugin-babel');
import nodeResolve from 'rollup-plugin-node-resolve';
// const pkg = require('./package.json');

const extensions = ['.js', '.ts'];

const resolve = function(...args) {
  return path.resolve(__dirname, ...args);
};

module.exports = {
  input: resolve('./package/index.ts'),
  output: {
    file: resolve('./', './dist/index.js'),
    format: 'cjs',
  },
  plugins: [
    nodeResolve({
      extensions,
      modulesOnly: true,
    }),
    babel({
      exclude: 'node_modules/**',
      extensions,
    }),
  ],
};