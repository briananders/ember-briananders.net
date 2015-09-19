import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('index', { path: "/" });
  this.route('four-oh-four', { path: "/*wildcard" });
  this.route('mine-sweeper');
});

export default Router;
