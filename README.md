# Mojular core

This module is at heart of other Mojular JS packages.

It includes a number of dependencies which are used in a typical project and exposes Mojular global namespace. This core module also includes [JSON2](https://www.npmjs.com/package/JSON2) and [html5shiv](https://www.npmjs.com/package/html5shiv) which should be included as polyfills for older IE browsers. jQuery library and lodash utility are also included and can be used in other modules using [Webpack module builder](https://webpack.github.io/).

## Installation

Install into your project via NPM:

```
npm install https://github.com/mojular/mojular/tarball/master --save
```

This has only been tested with Webpack so far, you can install it globally:

```
npm install webpack -g
```

## Usage

To use in your project create a simple `webpack.config.js` in your project root:

```js
var webpack = require("webpack");

module.exports = {
  entry: {
    app: 'assets-src/scripts/main.js',
    polyfills: ['JSON2', 'html5shiv']
  },
  output: {
    path: 'assets/scripts',
    filename: '[name].bundle.js'
  },
  module: {
    loaders: [
      { include: /\.json$/, loaders: ['json-loader'] }
    ]
  },
  resolve: {
    modulesDirectories: [
      'node_modules',
      'node_modules/mojular/node_modules'
    ],
    extensions: ['', '.json', '.js']
  },
  plugins: [
    new webpack.optimize.DedupePlugin()
  ]
};

```

First we create [entry points](https://webpack.github.io/docs/multiple-entry-points.html) for Webpack. These are our main project’s JS file, all other JS files should be imported via CommmonJS or RequireJS via Webpack’s built-in loaders. JSON2 and html5shiv are a separate entry point as need to be built as separate file.

The output is where Webpack builds bundles. `path` is the build directory and `filename` is the name of the file(s). `[name]` takes the key of each entry property when multiple are specified. The end result is `app.bundle.js` and `polyfills.bundle.js`.

Loaders module contains [json-loader](https://github.com/webpack/json-loader) which allows us to process other packages internal `package.json` files. This can be used to extract certain [meta data](https://github.com/mojular/govuk-elements/blob/master/package.json) about module, such as Sass load paths.

`moduleDirectories` is extended to look inside Mojular’s dependencies which will give direct access to those mojules from anywhere within project’s source (jQuery, lodash etc). `json` is also added to `extensions` so `packages.json` can be loaded without specifying the extension.

A useful Dedupe Plugin is also loaded to ensure there is no duplicated imports in built outputs, making the resulting output as lean as possible.

To compile the bundles run `webpack` in the same directory as your Webpack config.

It can also be integrated into your project task runner, such as Gulp:

```js
var webpack = require('webpack');
var gutil = require("gulp-util");

gulp.task('scripts', function(callback) {
  webpack(require('./webpack.config.js')).run(function(err, stats) {
    if(err) throw new gutil.PluginError("webpack", err);
    gutil.log("[webpack]", stats.toString({
      colors: true,
      modules: false,
      chunkModules: false
    }));
    callback();
  });
});
```

## External modules

A [number of external modules](https://github.com/mojular/moj-elements/tree/master/assets/scripts/modules) exist and expanding. A module would start its life in your project sourceand when it becomes generic enough and useful in other use cases it can be extracted added into one of existing [Mojular repos](https://github.com/mojular) or a new repo can be created.

[govuk-elements](https://github.com/mojular/govuk-elements) being the most generic and meant for uses across government sites. [moj-elements](https://github.com/mojular/moj-elements/tree/dev/assets/scripts/modules) are modules that currently are used within [MoJ organisation](https://github.com/ministryofjustice). But due to their compatibility (built on top of [Heisenberg base](https://github.com/heisenbergjs)) they are interchangeable and can be plugged in to most projects which use Mojular.

Mojular repos may contain supporting styles, images or even templates.
