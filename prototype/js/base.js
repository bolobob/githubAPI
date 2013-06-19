$(function() {
  'use strict';

  $.ajaxSetup({cache: false});

  var App = App || {};

  App = {
    base_url: 'https://api.github.com/users/',
    following: [],

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
          App.renderFollowing(data);
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
    },

    renderFollowing: function(data) {
      $.ajax({
        type: 'GET',
        url: data.following_url.split('{', 1)[0],
        dataType: 'json',
        success: function(data, textStatus, jqXHR) {
          $.each(data, function(idx) {
            var y = idx * (App.Following.WIDTH+App.Following.MARGIN_BOTTOM);
            App.following.push(new App.Following(this, 150, y));
          });
        }
      });
    }
  };

  App.Following = function(data, x, y) {
    var data = data;
    var x = x;
    var y = y;

    this.render = function() {
      this.g = App.canvas.group().x(x);

      this.gradient = App.canvas.gradient('radial', function(stop) {
                       stop.at({offset: 70, color: '#333', opacity: 1});
                       stop.at({offset: 100, color: '#fff', opacity: 0});
                     });
      this.circle_shadow = App.canvas.circle(App.Following.WIDTH).attr({fill: this.gradient.fill()}).move(x+3, y+3);

      // アバター
      this.avatar = App.canvas.image(data.avatar_url).size(App.Following.WIDTH, App.Following.HEIGHT).move(x, y);

      // 名前
      this.name = App.canvas.text(data.login).cx(x+(App.Following.WIDTH/2)).y(y+App.Following.HEIGHT);

      // マスキング
      this.ellipse = App.canvas.ellipse(60, 60).move(x+10, y+10).fill({ color: '#fff' });
      this.avatar.clipWith(this.ellipse);

      this.g.add(this.circle_shadow);
      this.g.add(this.avatar);
      this.g.add(this.name);
    };

    this.render();
  };
  App.Following.WIDTH  = 80;
  App.Following.HEIGHT = 80;
  App.Following.MARGIN_BOTTOM = 40;
  App.init();
});
