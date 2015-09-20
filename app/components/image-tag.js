import Ember from 'ember';

export default Ember.Component.extend({


  src: null,


  alt: null,


  loaded: false,


  didInsertElement() {

    this.$('img').on('load', function(){

      this.set('loaded', true);

    }.bind(this));

  }


});
