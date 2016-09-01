import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('index', { path: "/" });
  this.route('experience');
  this.route('thoughts');

  //404
  this.route('four-oh-four', { path: "/*wildcard" });

  //blogs
  this.route('mine-sweeper');
  this.route('how-to-match-the-height-of-sibling-elements');
  this.route('apple-campus-2-construction');
  this.route('last-fm');
  this.route('best-albums-of-2016');
  this.route('best-albums-of-2015');
  this.route('best-albums-of-2014');
  this.route('best-albums-of-2013');
  this.route('best-albums-of-2012');
  this.route('best-albums-of-2011');
  this.route('best-albums-of-2010');
  this.route('best-albums-of-2009');
  this.route('best-albums-of-2008');
  this.route('best-albums-of-2007');
  this.route('best-albums-of-2006');
  this.route('best-albums-of-2005');
  this.route('best-albums-of-the-1960s');
  this.route('best-albums-of-the-1970s');
  this.route('best-albums-of-the-1980s');
  this.route('best-albums-of-the-1990s');
});

Ember.Route.reopen({

  activate() {

    this.set('blogService.currentRoute', this.routeName);
    window.scrollTo(0, 0);

  }

});

export default Router;
