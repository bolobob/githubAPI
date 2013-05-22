$(function() {
  'use strict';

  $.ajaxSetup({cache: false});

  var App = {
      base_url: 'https://api.github.com/users/',

      init: function() {
        $.ajax({
          type: 'GET',
          url: this.base_url + 'bolobob',
          dataType: 'json',
          success: function(data, textStatus, jqXHR) {
            App.addAvatar(data.avatar_url);
          }
        });
      },

      addAvatar: function(url) {
        $('#content').append($('<img>').attr('src', url));
      }
  };

  App.init();
});