import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('index', { path: "/" });

  this.route('four-oh-four', { path: "/*wildcard" });

  this.route('mine-sweeper');
  this.route('how-to-match-the-height-of-sibling-elements');
  this.route('apple-campus-2-construction');
});

Ember.Route.reopen({

  activate() {

    this.set('blogService.currentRoute', this.routeName);

  }

});

export default Router;
