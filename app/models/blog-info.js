import Ember from 'ember';
import moment from 'npm:moment';

export default Ember.Object.extend({

  route: null,
  title: null,
  description: null,
  image: null,
  date: null,
  tags: null,


  filters: Ember.computed('tags', function(){
    var filters = this.get('tags');
    filters.push('all');
    return filters.join().toLowerCase().split(',');
  }),


  momentDate: Ember.computed('date', function() {
    return moment(this.get('date'));
  }),


  sortDate: Ember.computed('date', function() {
    var momentDate = this.get('momentDate');
    return '' +
           momentDate.year() +
           ("0" + momentDate.month()).slice(-2) +
           ("0" + momentDate.date()).slice(-2);
  })


});
