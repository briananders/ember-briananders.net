import Ember from 'ember';

export default Ember.Component.extend({


  albums: [],


  noAlbums: Ember.computed.empty('albums'),


  error: false,


  init() {

    /*
      LastFM api call and dom loads
    */
    var lfmOpts = {
      APIkey: '6a77d69fd4f528fe5101f0e2e4912e8c',
      User: 'iBrianAnders',
      limit: 24, // 1 album - 50 albums
      period: '1month' //overall|7day|1month|3month|6month|12month
    };

    Ember.$.ajax({
      type: 'GET',
      url: ('http://ws.audioscrobbler.com/2.0/?method=user.gettopalbums&user=' +
              lfmOpts.User +
              '&period=' +
              lfmOpts.period +
              '&api_key=' +
              lfmOpts.APIkey +
              '&format=json&limit=' +
              lfmOpts.limit  +
              '&callback=?'),
      dataType: 'json',
      success: function(data) {
        if(data.topalbums === undefined) {
          this.set('error', true);
          return;
        }
        var albums = [],
            count = 0,
            max = 12;

        data.topalbums.album.forEach(function(album) {
          if(album.image[album.image.length-1]['#text'].indexOf('default') === -1 && count !== max) {
            album.image = album.image[album.image.length-1]['#text'];
            albums.push(album);
            count++;
          }
        }.bind(this));

        this.set('albums', albums);
      }.bind(this),
      error: function() {
        this.set('error', true);
      }.bind(this)

    });
  }

});
