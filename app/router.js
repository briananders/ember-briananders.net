import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('index', { path: "/" });
  this.route('experience');
  this.route('knowledge');

  //404
  this.route('four-oh-four', { path: "/*wildcard" });

  //blogs
  this.route('mine-sweeper');
  this.route('how-to-match-the-height-of-sibling-elements');
  this.route('apple-campus-2-construction');
  this.route('instagram');
  this.route('last-fm');
});

Ember.Route.reopen({

  activate() {

    this.set('blogService.currentRoute', this.routeName);
    window.scrollTo(0, 0);

  }

});

export default Router;
