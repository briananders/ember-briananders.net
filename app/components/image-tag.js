import Ember from 'ember';

export default Ember.Component.extend({


  tagName: 'img',


  attributeBindings: ['src', 'alt'],


  classNameBindings: ['loaded:loaded'],


  loaded: false,


  didInsertElement() {

    Ember.run(this, function() {

      this.$().on('load', function(){

        Ember.run(this, function(){
          this.set('loaded', true);
        });

      }.bind(this));

    });

  },



});
