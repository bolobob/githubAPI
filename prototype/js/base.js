$(function() {
  'use strict';

  $.ajaxSetup({cache: false});

  var App = {
    base_url: 'https://api.github.com/users/',

    init: function() {
      this.cacheElements();
      this.bindEvents();
    },

    cacheElements: function() {
      this.canvas = SVG('canvas').size('100%', '100%');
      this.search_form = $('#search-form');
      this.search_btn = $('#search-btn');
    },

    bindEvents: function() {
      this.search_btn.on('click', this.fetch);
    },

    fetch: function(event) {
      $.ajax({
        type: 'GET',
        url: App.base_url + App.search_form.val(),
        dataType: 'json',
        success: function(data, textStatus, jqXHR) {
          App.renderUser(data);
        }
      });
    },

    renderUser: function(data) {
      // キャンバスを全てクリア
      this.canvas.clear();

      // 円の影
      this.gradient = this.canvas.gradient('radial', function(stop) {
                       stop.at({offset: 70, color: '#333', opacity: 1});
                       stop.at({offset: 100, color: '#fff', opacity: 0});
                     });
      this.circle_shadow = this.canvas.circle(80).attr({fill: this.gradient.fill()}).move(103, 103);

      // アバター
      this.avatar = this.canvas.image(data.avatar_url).size(80, 80).move(100, 100);
      this.canvas.text(data.login).move(120, 200);

      // マスキング
      var ellipse = this.canvas.ellipse(60, 60).move(110, 110).fill({ color: '#fff' });
      this.avatar.clipWith(ellipse);
    }
  };

  App.init();
});
