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


  filterOptions: Ember.computed(function() {
    var filters = this.get('dataArray').map(function(item, index, array) {
      return item.get('tags').join();
    });
    filters = filters.join().toLowerCase().split(',').sort().filter(function(item, pos, self) {
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
    }),



    // BlogInfo.create({
    //   route: "best-albums-of-2016",
    //   title: "The Best Albums of 2016",
    //   description: "These are, in my opinion, the best albums of 2016, in no particular order.",
    //   image: "",
    //   date: "07/22/2016",
    //   tags: ["Music"]
    // }),
    // BlogInfo.create({
    //   route: "best-albums-of-2015",
    //   title: "The Best Albums of 2015",
    //   description: "These are, in my opinion, the best albums of 2015, in no particular order.",
    //   image: "",
    //   date: "01/01/2016",
    //   tags: ["Music"]
    // }),
    // BlogInfo.create({
    //   route: "best-albums-of-2014",
    //   title: "The Best Albums of 2014",
    //   description: "These are, in my opinion, the best albums of 2014, in no particular order.",
    //   image: "",
    //   date: "01/01/2015",
    //   tags: ["Music"]
    // }),
    // BlogInfo.create({
    //   route: "best-albums-of-2013",
    //   title: "The Best Albums of 2013",
    //   description: "These are, in my opinion, the best albums of 2013, in no particular order.",
    //   image: "",
    //   date: "01/01/2014",
    //   tags: ["Music"]
    // }),
    // BlogInfo.create({
    //   route: "best-albums-of-2012",
    //   title: "The Best Albums of 2012",
    //   description: "These are, in my opinion, the best albums of 2012, in no particular order.",
    //   image: "",
    //   date: "01/01/2013",
    //   tags: ["Music"]
    // }),
    // BlogInfo.create({
    //   route: "best-albums-of-2011",
    //   title: "The Best Albums of 2011",
    //   description: "These are, in my opinion, the best albums of 2011, in no particular order.",
    //   image: "",
    //   date: "01/01/2012",
    //   tags: ["Music"]
    // }),
    // BlogInfo.create({
    //   route: "best-albums-of-2010",
    //   title: "The Best Albums of 2010",
    //   description: "These are, in my opinion, the best albums of 2010, in no particular order.",
    //   image: "",
    //   date: "01/01/2011",
    //   tags: ["Music"]
    // }),
    // BlogInfo.create({
    //   route: "best-albums-of-2009",
    //   title: "The Best Albums of 2009",
    //   description: "These are, in my opinion, the best albums of 2009, in no particular order.",
    //   image: "",
    //   date: "01/01/2010",
    //   tags: ["Music"]
    // }),
    // BlogInfo.create({
    //   route: "best-albums-of-2008",
    //   title: "The Best Albums of 2008",
    //   description: "These are, in my opinion, the best albums of 2008, in no particular order.",
    //   image: "",
    //   date: "01/01/2009",
    //   tags: ["Music"]
    // }),
    // BlogInfo.create({
    //   route: "best-albums-of-2007",
    //   title: "The Best Albums of 2007",
    //   description: "These are, in my opinion, the best albums of 2007, in no particular order.",
    //   image: "",
    //   date: "01/01/2008",
    //   tags: ["Music"]
    // }),
    // BlogInfo.create({
    //   route: "best-albums-of-2006",
    //   title: "The Best Albums of 2006",
    //   description: "These are, in my opinion, the best albums of 2006, in no particular order.",
    //   image: "",
    //   date: "01/01/2007",
    //   tags: ["Music"]
    // }),
    // BlogInfo.create({
    //   route: "best-albums-of-2005",
    //   title: "The Best Albums of 2005",
    //   description: "These are, in my opinion, the best albums of 2005, in no particular order.",
    //   image: "",
    //   date: "01/01/2006",
    //   tags: ["Music"]
    // }),



    // BlogInfo.create({
    //   route: "best-albums-of-the-1960s",
    //   title: "The Best Albums of the 1960s",
    //   description: "These are, in my opinion, the best albums of the 1960s, in no particular order.",
    //   image: "",
    //   date: "01/01/1970",
    //   tags: ["Music"]
    // }),
    // BlogInfo.create({
    //   route: "best-albums-of-the-1970s",
    //   title: "The Best Albums of the 1970s",
    //   description: "These are, in my opinion, the best albums of the 1970s, in no particular order.",
    //   image: "",
    //   date: "01/01/1980",
    //   tags: ["Music"]
    // }),
    // BlogInfo.create({
    //   route: "best-albums-of-the-1980s",
    //   title: "The Best Albums of the 1980s",
    //   description: "These are, in my opinion, the best albums of the 1980s, in no particular order.",
    //   image: "",
    //   date: "01/01/1990",
    //   tags: ["Music"]
    // }),
    // BlogInfo.create({
    //   route: "best-albums-of-the-1990s",
    //   title: "The Best Albums of the 1990s",
    //   description: "These are, in my opinion, the best albums of the 1990s, in no particular order.",
    //   image: "",
    //   date: "01/01/2000",
    //   tags: ["Music"]
    // })
  ]


});
