var webpack = require('webpack');

module.exports = {
  context: __dirname + "/node_modules",
  entry: {
    polyfills: ['json2', 'html5shiv'],
    vendor: ['jquery', 'lodash']
  },
  resolve: {
    alias: {
      'jquery': 'jquery/dist/jquery.js',
      'lodash': 'lodash/index.js',
      'json2': 'JSON2/json2.js',
      'html5shiv': 'html5shiv/dist/html5shiv.js'
    }
  },
  output: {
    filename: 'assets/scripts/[name].bundle.js'
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    })
  ]
}
