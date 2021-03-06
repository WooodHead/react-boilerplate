const resolve = require('path').resolve;
const without = require('ramda/src/without');
const uniq = require('ramda/src/uniq');

const ReactBoilerplate = {
  // This refers to the react-boilerplate version this project is based on.
  version: '3.5.0',

  /**
   * The DLL Plugin provides a dramatic speed increase to webpack build and hot module reloading
   * by caching the module metadata for all of our npm dependencies. We enable it by default
   * in development.
   *
   *
   * To disable the DLL Plugin, set this value to false.
   */
  dllPlugin: {
    defaults: {
      /**
       * we need to exclude dependencies which are not intended for the browser
       * by listing them here.
       */
      exclude: [
        'chalk',
        'compression',
        'cross-env',
        'express',
        'ip',
        'minimist',
        'sanitize.css'
      ],

      /**
       * Specify any additional dependencies here. We include core-js and ramda
       * since a lot of our dependencies depend on them and they get picked up by webpack.
       */
      include: ['core-js', 'eventsource-polyfill', 'babel-polyfill', 'ramda'],

      // The path where the DLL manifest and bundle will get built
      path: resolve('../node_modules/react-boilerplate-dlls')
    },

    entry(pkg) {
      const dependencyNames = Object.keys(pkg.dependencies);
      const exclude =
        pkg.dllPlugin.exclude || ReactBoilerplate.dllPlugin.defaults.exclude;
      const include =
        pkg.dllPlugin.include || ReactBoilerplate.dllPlugin.defaults.include;
      const includeDependencies = uniq(dependencyNames.concat(include));

      return {
        reactBoilerplateDeps: without(exclude, includeDependencies)
      };
    }
  }
};

module.exports = ReactBoilerplate;
