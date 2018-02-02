/**
 * WEBPACK DLL GENERATOR
 *
 * This profile is used to cache webpack's module
 * contexts for external library and framework type
 * dependencies which will usually not change often enough
 * to warrant building them from scratch every time we use
 * the webpack process.
 */
/* eslint prefer-destructuring: 0 */

const { join } = require('path');
const merge = require('ramda/src/merge');
const webpack = require('webpack');
const pkg = require(join(process.cwd(), 'package.json'));
const dllPlugin = require('../config').dllPlugin;

if (!pkg.dllPlugin) {
  process.exit(0);
}

const dllConfig = merge(dllPlugin.defaults, pkg.dllPlugin);
const outputPath = join(process.cwd(), dllConfig.path);

module.exports = require('./webpack.base.babel')({
  context: process.cwd(),
  entry: dllConfig.dlls ? dllConfig.dlls : dllPlugin.entry(pkg),
  devtool: 'eval',
  output: {
    filename: '[name].dll.js',
    path: outputPath,
    library: '[name]'
  },
  plugins: [
    new webpack.DllPlugin({
      name: '[name]',
      path: join(outputPath, '[name].json')
    })
  ],
  performance: {
    hints: false
  }
});
