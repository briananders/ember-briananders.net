import Ember from 'ember';
import MineSweeperTileModel from '../models/mine-sweeper-tile';

export default Ember.Controller.extend({



////////////////////////////////////////////// properties



  minesSet: false,

  rowsAndColumns: [],

  gameOver: false,

  lastSquare: null,

  numberOfRows: 10,

  numberOfColumns: 10,

  difficulty: 0.15,

  difficultyOptions: [
    { text: "Easy",    value: 0.15 },
    { text: "Medium",  value: 0.2 },
    { text: "Hard",    value: 0.3333 }
  ],


  rowOptions: [
    { text: "5",    value: 5  },
    { text: "6",    value: 6  },
    { text: "7",    value: 7  },
    { text: "8",    value: 8  },
    { text: "9",    value: 9  },
    { text: "10",    value: 10  },
    { text: "11",    value: 11  },
    { text: "12",    value: 12  },
    { text: "13",    value: 13  },
    { text: "14",    value: 14  },
    { text: "15",    value: 15  }
  ],

  columnOptions: [
    { text: "5",    value: 5 },
    { text: "6",    value: 6 },
    { text: "7",    value: 7 },
    { text: "8",    value: 8 },
    { text: "9",    value: 9 },
    { text: "10",    value: 10 },
    { text: "11",    value: 11 },
    { text: "12",    value: 12 },
    { text: "13",    value: 13 },
    { text: "14",    value: 14 },
    { text: "15",    value: 15 }
  ],



////////////////////////////////////////////// computed properties



  columnWidthClass: Ember.computed('numberOfColumns', function() {

    switch(this.get('numberOfColumns')) {
      case 5:
        return "five";
      case 6:
        return "six";
      case 7:
        return "seven";
      case 8:
        return "eight";
      case 9:
        return "nine";
      case 10:
        return "ten";
      case 11:
        return "eleven";
      case 12:
        return "twelve";
      case 13:
        return "thirteen";
      case 14:
        return "fourteen";
      case 15:
        return "fifteen";
    }

  }),



  observesRowsAndColumns: Ember.observer('numberOfRows', 'numberOfColumns', 'difficulty', function() {

    this.send('reset');

  }),



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
    var mineCount = Math.round((numberOfRows * numberOfColumns) * this.get('difficulty'));

    var randomRow;
    var randomColumn;

    console.log('mineCount %@'.fmt(mineCount));

    while(mineCount > 0) {

      randomRow = Math.floor(Math.random() * numberOfRows);
      randomColumn = Math.floor(Math.random() * numberOfColumns);

      if(!(randomRow === location[0] && randomColumn === location[1]) &&
                rowsAndColumns[randomRow][randomColumn].get('mine') === false) {
        rowsAndColumns[randomRow][randomColumn].set('mine', true);
        mineCount--;
      }

    }

    console.log('mineCount %@'.fmt(mineCount));

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


    reset() {

      this.set('minesSet', false);
      this.set('rowsAndColumns', []);
      this.set('gameOver', false);
      this.set('lastSquare', null);
      this.setupTable();

    }

  },


});
