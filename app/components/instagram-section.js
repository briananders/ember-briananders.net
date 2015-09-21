import Ember from 'ember';

export default Ember.Component.extend({


  images: [],


  noImages: Ember.computed.empty('images'),


  error: false,


  didInsertElement() {

    Ember.run(this, function() {

      /*
        instagram api call and dom load
      */
      var iOpts = {
        APIkey: 'f42ca37467bc4296b311a70e1258c88e',
        User: '196017474'
      };

      Ember.$.ajax({
        type: 'GET',
        url: 'https://api.instagram.com/v1/users/' +
              iOpts.User +
              '/media/recent/?client_id=' +
              iOpts.APIkey,
        dataType: 'jsonp',
        success: function(response) {

          if(response.data === undefined) {
            this.set('error', true);
            return;
          }

          var images = [];

          response.data.forEach(function(photo, index) {
            if(index >= 12) return;

            photo.caption = (photo.caption === null ? 'no caption' : photo.caption.text);
            photo.url = (window.isRetina ? photo.images.low_resolution.url : photo.images.thumbnail.url);
            images.push(photo);
          });

          this.set('images', images);

        }.bind(this),
        error: function() {
          this.set('error', true);
        }.bind(this)

      });
    });
  }


});
