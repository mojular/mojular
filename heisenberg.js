'use strict';

var $ = require('jquery');
var forOwn = require('lodash/object/forOwn');
var isArray = require('lodash/lang/isArray');
var extend = require('lodash/object/extend');
var transform = require('lodash/object/transform');


module.exports = {
  Modules: {},
  Helpers: {},
  Events: $({}),

  init: function() {
    forOwn(this.Modules, function(module) {
      if (typeof module.init === 'function') {
        module.init();
      }
    });

    // trigger initial render event
    this.Events.trigger('render');
  },

  // safe logging
  log: function() {
    if (window && window.console) {
      window.console.log.apply(console, arguments);
    }
  },

  dir: function() {
    if (window && window.console) {
      window.console.dir.apply(console, arguments);
    }
  },

  install: function(modules) {
    if (isArray(modules)) {
      transform(modules, extend, this.Modules);
      return this;
    } else {
      console.error('Invalid syntax. Should be an array of modules to install.');
    }
  }
};
