import Ember from 'ember';

export default Ember.Route.extend({

  afterModel() {

    if(window.location.pathname.indexOf('index.html') >= 0) {
      this.transitionTo('index');
    }

  }

});
