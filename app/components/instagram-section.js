import Ember from 'ember';

export default Ember.Component.extend({


  stateService: Ember.inject.service('state'),


  showDescription: false,


  classNameBindings: [':images', 'error:hidden', 'noImages:hidden'],


  images: Ember.computed.alias('stateService.instagram'),


  noImages: Ember.computed.empty('images'),


  error: false,


  length: null,


  didInsertElement() {

    Ember.run(this, function() {

      /*
        instagram api call and dom load
      */
      var iOpts = {
        APIkey: 'f42ca37467bc4296b311a70e1258c88e',
        User: '196017474'
      };

      if(Ember.isEmpty(this.get('stateService.instagram'))) {

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
              photo.caption = (photo.caption === null ? 'no caption' : photo.caption.text);
              photo.url = (window.isRetina ? photo.images.standard_resolution.url : photo.images.low_resolution.url);
              photo.data = photo;
              images.push(photo);
            }.bind(this));

            this.set('stateService.instagram', images);

          }.bind(this),
          error: function() {
            this.set('error', true);
          }.bind(this)
        });
      }

    });

  }


});
