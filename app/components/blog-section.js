import Ember from 'ember';

export default Ember.Component.extend({

  tagName: 'section',

  classNames: ['blog'],

  sortedBlogs: Ember.computed('blogService.filteredBlogList', function() {
    return this.get('blogService.filteredBlogList').sortBy('sortDate').reverse();
  }),

  actions: {

    setFilter: function(filter) {
      this.set('blogService.blogFilter', filter.toLowerCase());
    }

  }

});
