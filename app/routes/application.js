import Ember from 'ember';

export default Ember.Route.extend({


  init() {

    window.isRetina = window.devicePixelRatio >= 1.2;

  },



  actions: {


    goHome() {

      this.transitionTo('index');

    }


  }


});
