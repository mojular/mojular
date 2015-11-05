var $ = require('jquery');
var forOwn = require('lodash/object/forOwn');
var isArray = require('lodash/lang/isArray');
var each = require('lodash/collection/each');
var merge = require('lodash/object/merge');

module.exports = {
  Modules: {},
  Helpers: {},
  Events: $({}),

  init: function () {
    forOwn(this.Modules, function(module) {
      if(typeof module.init === 'function') {
        module.init();
      }
    });

    // trigger initial render event
    this.Events.trigger('render');
  },

  // safe logging
  log: function (msg) {
    if (window && window.console) {
      window.console.log(msg);
    }
  },

  dir: function (obj) {
    if (window && window.console) {
      window.console.dir(obj);
    }
  },

  install: function(modules) {
    var self = this;

    if(isArray(modules)) {
      each(modules, function(module) {
        merge(self.Modules, module);
      });
    } else {
      console.error('Invalid syntax. Should be an array of modules to install.')
    }
  }
};
