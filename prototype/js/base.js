$(function() {
  'use strict';

  $.ajaxSetup({cache: false});

  var App = {
    base_url: 'https://api.github.com/users/',

    init: function() {
      this.cacheElements();

      $.ajax({
        type: 'GET',
        url: this.base_url + 'bolobob',
        dataType: 'json',
        success: function(data, textStatus, jqXHR) {
          App.renderUser(data);
        }
      });
    },

    cacheElements: function() {
      this.canvas = SVG('canvas').size('100%', '100%');
    },

    renderUser: function(data) {
      this.canvas.image(data.avatar_url).move(100, 100);
      this.canvas.text(data.login).move(120, 200);
    }
  };

  App.init();
});