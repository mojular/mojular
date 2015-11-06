var isArray = require('lodash/lang/isArray');
var util = require('util');

function prefixPaths(paths, packageName) {
  return paths.map(function(path) {
    return util.format('node_modules/%s/%s', packageName, path);
  });
}

function processPackageMeta(packageMeta) {
  if (!packageMeta) {
    console.log('WARNING:', 'Mojular component is missing package.json reference');
    return;
  }
  var packageName = packageMeta.name;
  try {
    var sassPaths = packageMeta.paths.sass;
    if (!sassPaths) {
      console.log('WARNING:', '`sass` property should exist in `paths` property of', packageName);
      return;
    }
    if (!isArray(sassPaths)) {
      console.log('WARNING:', '`paths` property in ', packageName, 'should be an array of paths');
      return;
    }
    return prefixPaths(sassPaths, packageName);
  } catch (err) {
    console.log('ERROR:', 'Something went wrong.');
  }
}

module.exports = function(packageMeta) {
  var loadPaths = [];
  if(isArray(packageMeta)) {
    packageMeta.forEach(function(p) {
      loadPaths.push(processPackageMeta(p));
    });
  } else {
    loadPaths.push(processPackageMeta(packageMeta));
  }
  return [].concat.apply([], loadPaths);
};
