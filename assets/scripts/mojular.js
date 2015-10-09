var $ = require('jquery');
var forOwn = require('lodash/object/forOwn');

window.Mojular = window.Mojular || {
  isInitialised: false,
  Modules: {},
  Helpers: {},
  Events: $({}),

  init: function () {
    forOwn(this.Modules, function(module) {
      typeof module.init === 'function' && module.init()
    });

    // trigger initial render event
    this.Events.trigger('render');

    this.isInitialised = true;
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
  }
};

$(function() {
  !window.Mojular.isInitialised && window.Mojular.init();
})
