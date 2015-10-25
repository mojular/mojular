var isArray = require('lodash/lang/isArray');
var util = require('util');

try {
  require('./assets/scripts/mojular');
} catch(e) {}

function prefixPaths(paths, packageName) {
  return paths.map(function(path) {
    return util.format('node_modules/%s/%s', packageName, path);
  });
}

module.exports = {
  getSassPaths: function(packageMeta) {
    if(!packageMeta) {
      console.log('WARNING:', 'Mojular component is missing package.json reference')
      return;
    }
    var packageName = packageMeta.name;
    try {
      var sassPaths = packageMeta.paths.sass;
      if(!sassPaths) {
        console.log('WARNING:', '`sass` property should exist in `paths` property of', packageName);
        return;
      }
      if(!isArray(sassPaths)) {
        console.log('WARNING:', '`paths` property in ', packageName, 'should be an array of paths');
        return;
      }
      return prefixPaths(sassPaths, packageName);
    } catch(e) {
      console.log('WARNING:', '`paths` property is missing in package.json of', packageName);
      return;
    }
  }
};
