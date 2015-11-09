var fs = require('fs');
var isArray = require('lodash/lang/isArray');
var uniq = require('lodash/array/uniq');
var flatten = require('lodash/array/flatten');
var util = require('util');

module.exports = function(packageMetas) {
  if (!isArray(packageMetas)) {
    console.log('WARNING:', 'Mojular component is missing package.json references',
      '\ne.g. `require(\'mojular/sass-paths\')([require(\'mojular-govuk-elements/package.json\')');
    return;
  }

  var sassPaths = packageMetas.map(function(meta) {
    return meta.sassPaths.map(function(path) {
      if(fs.existsSync(path)) {
        return path;
      }
      return util.format('node_modules/%s/%s', meta.name, path);
    });
  });

  return uniq(flatten(sassPaths));
};
