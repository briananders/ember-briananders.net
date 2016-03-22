import Ember from 'ember';
import BlogInfo from '../models/blog-info';

export default Ember.Service.extend({


  currentRoute: null,

  blogFilter: "all",


  route: Ember.computed('currentRoute', function(){
    return this.get('currentData.route') || null;
  }),
  title: Ember.computed('currentRoute', function(){
    return this.get('currentData.title') || null;
  }),
  description: Ember.computed('currentRoute', function(){
    return this.get('currentData.description') || null;
  }),
  date: Ember.computed('currentRoute', function(){
    return this.get('currentData.date') || null;
  }),
  tags: Ember.computed('currentRoute', function(){
    return this.get('currentData.tags') || null;
  }),
  currentData: Ember.computed('currentRoute', function(){
    return this.get('data.%@'.fmt(this.get('currentRoute')));
  }),


  filteredBlogList: Ember.computed('dataArray', 'blogFilter', function() {
    var blogFilter = this.get('blogFilter');
    return this.get('dataArray').filter(function(item, index, array){
      return item.get('filters').contains(blogFilter);
    });
  }),


  filterOptions: Ember.computed(function(){
    var filters = this.get('dataArray').map(function(item, index, array){
      return item.get('tags').join();
    });
    filters = filters.join().split(',').sort().filter(function(item, pos, self) {
      return self.indexOf(item) === pos;
    });
    return filters;
  }),


  data: Ember.computed('dataArray', function() {

    var dataObject = {};

    this.get('dataArray').forEach(function(object, index, array){
      dataObject[object.route] = object;
    });

    return dataObject;

  }),


  dataArray: [
    BlogInfo.create({
      route: "how-to-match-the-height-of-sibling-elements",
      title: "How to Match the Height of Sibling Elements",
      description: "This is a very common CSS problem. How do you get an element to match the height of its sibling element?",
      image: "",
      date: "11/18/2014",
      tags: ["Code"]
    }),
    BlogInfo.create({
      route: "apple-campus-2-construction",
      title: "Apple Campus II Construction",
      description: "If you've been in Cupertino lately, you'll know that traffic is nuts, especially on Wolfe and Homestead. Apple is building a new campus.",
      image: "",
      date: "07/06/2014",
      tags: ["Pictures"]
    }),
    BlogInfo.create({
      route: "mine-sweeper",
      title: "Brian Makes Mine-Sweeper",
      description: "Mine-Sweeper is one of the best simple games around. So I made it here.",
      image: "",
      date: "03/14/2016",
      tags: ["Games"]
    })
  ]


});
