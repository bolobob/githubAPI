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
      // 円の影
      var gradient = this.canvas.gradient('radial', function(stop) {
                       stop.at({offset: 70, color: '#333', opacity: 1});
                       stop.at({offset: 100, color: '#fff', opacity: 0});
                     });
      var circle_shadow = this.canvas.circle(80).attr({fill: gradient.fill()}).move(103, 103);

      // アバター
      var avatar = this.canvas.image(data.avatar_url).size(80, 80).move(100, 100);
      this.canvas.text(data.login).move(120, 200);

      // マスキング
      var ellipse = this.canvas.ellipse(60, 60).move(110, 110).fill({ color: '#fff' });
      avatar.clipWith(ellipse);
    }
  };

  App.init();
});
