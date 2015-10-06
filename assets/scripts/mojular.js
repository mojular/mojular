var $ = require('jquery');
var forOwn = require('lodash/object/forOwn');

(function(){
  'use strict';

  window.Mojular = {
    Modules: {},
    Helpers: {},
    Events: $({}),

    init: function () {
      forOwn(this.Modules, function(module) {
        typeof module.init === 'function' && module.init()
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
    }
  };

  $(function() {
    window.Mojular.init();
  })
}());
