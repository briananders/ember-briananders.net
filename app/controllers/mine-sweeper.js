import Ember from 'ember';
import MineSweeperTileModel from '../models/mine-sweeper-tile';

export default Ember.Controller.extend({



////////////////////////////////////////////// properties



  minesSet: false,

  numberOfRows: 10,

  numberOfColumns: 10,

  rowsAndColumns: [],

  gameOver: false,

  lastSquare: null,



////////////////////////////////////////////// computed properties



////////////////////////////////////////////// functions



  init() {

    this.setupTable();

  },



  setupTable() {

    var rowsAndColumns = this.get('rowsAndColumns');

    for(var r = 0; r < this.get('numberOfRows'); r++) {
      rowsAndColumns[r] = [];
      for(var c = 0; c < this.get('numberOfColumns'); c++) {
        rowsAndColumns[r][c] = MineSweeperTileModel.create({
          location: [r,c],
          controller: this
        });
      }
    }

  },



  setMines(location) {

    var numberOfRows = this.get('numberOfRows');
    var numberOfColumns = this.get('numberOfColumns');
    var rowsAndColumns = this.get('rowsAndColumns');
    var mineCount = Math.round((numberOfRows * numberOfColumns) * 0.15);

    var randomRow;
    var randomColumn;

    while(mineCount > 0) {

      randomRow = Math.floor(Math.random() * numberOfRows);
      randomColumn = Math.floor(Math.random() * numberOfColumns);

      if(!(randomRow === location[0] && randomColumn === location[1]) &&
                rowsAndColumns[randomRow][randomColumn].get('mine') === false) {
        rowsAndColumns[randomRow][randomColumn].set('mine', true);
        mineCount--;
      }

    }

    this.set('minesSet', true);

  },



  countFlags(location) {

    var flagCount = 0;

    var rowsAndColumns = this.get('rowsAndColumns');

    for(var r = location[0] - 1; r <= location[0] + 1; r++) {
      if(rowsAndColumns[r]) {
        for(var c = location[1] - 1; c <= location[1] + 1; c++) {
          if(rowsAndColumns[r][c] && rowsAndColumns[r][c].get('flag')) {
            flagCount++;
          }
        }
      }
    }

    return flagCount;

  },



  revealSurrounding(location) {

    var rowsAndColumns = this.get('rowsAndColumns');

    for(var r = location[0] - 1; r <= location[0] + 1; r++) {
      if(rowsAndColumns[r]) {
        for(var c = location[1] - 1; c <= location[1] + 1; c++) {
          if(rowsAndColumns[r][c] && !rowsAndColumns[r][c].get('active') && !rowsAndColumns[r][c].get('flag')) {

            rowsAndColumns[r][c].set('active', true);

            if(this.getValue([r,c]) === 0) {
              this.revealSurrounding([r,c]);
            }
          }
        }
      }
    }

  },



  getValue(location) {

    var rowsAndColumns = this.get('rowsAndColumns');
    var mines = 0;

    for(var r = location[0] - 1; r <= location[0] + 1; r++) {
      if(rowsAndColumns[r]) {
        for(var c = location[1] - 1; c <= location[1] + 1; c++) {
          if(rowsAndColumns[r][c] && rowsAndColumns[r][c].get('mine')) {
            mines++;
          }
        }
      }
    }

    return mines;

  },



////////////////////////////////////////////// actions



  actions: {

    tryRevealSurrounding(location, value) {

      Ember.run.next(this, function() {

        if(value === this.countFlags(location)) {

          this.revealSurrounding(location);

        }

      });

    },



    lose(location) {

      this.set('gameOver', true);
      this.set('lastSquare', location);

    },

  },


});
