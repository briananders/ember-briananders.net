import Ember from 'ember';

export default Ember.Service.extend({


  currentRoute: null,


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


  data: Ember.computed('dataArray', function() {

    var dataObject = {};

    this.get('dataArray').forEach(function(object, index, array){
      dataObject[object.route] = object;
    });

    return dataObject;

  }),


  dataArray: [
    {
      route: "how-to-match-the-height-of-sibling-elements",
      title: "How to Match the Height of Sibling Elements",
      description: "This is a very common CSS problem. How do you get an element to match the height of its sibling element?",
      image: "",
      date: "11/18/2014",
      tags: "Code"
    }, {
      route: "apple-campus-2-construction",
      title: "Apple Campus II Construction",
      description: "If you've been in Cupertino lately, you'll know that traffic is nuts, especially on Wolfe and Homestead. Apple is building a new campus.",
      image: "",
      date: "07/06/2014",
      tags: "Pictures"
    }, {
      route: "mine-sweeper",
      title: "Brian Makes Mine-Sweeper",
      description: "Mine-Sweeper is one of the best simple games around. So I made it here.",
      image: "",
      date: "03/014/2016",
      tags: "Games"
    }
  ]


});
