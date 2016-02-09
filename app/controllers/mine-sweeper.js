import Ember from 'ember';
import MineSweeperTileModel from '../models/mine-sweeper-tile';

export default Ember.Controller.extend({



////////////////////////////////////////////// properties



  minesSet: false,

  rowsAndColumns: [],

  gameOver: false,

  lastSquare: null,

  numberOfRows: 25,

  numberOfColumns: 25,

  difficulty: 0.15,

  difficultyOptions: [
    { text: "Easy",    value: 0.15 },
    { text: "Medium",  value: 0.2 },
    { text: "Hard",    value: 0.3 }
  ],


  rowOptions: [
    { text: "10",    value: 10  },
    { text: "11",    value: 11  },
    { text: "12",    value: 12  },
    { text: "13",    value: 13  },
    { text: "14",    value: 14  },
    { text: "15",    value: 15  },
    { text: "16",    value: 16  },
    { text: "17",    value: 17  },
    { text: "18",    value: 18  },
    { text: "19",    value: 19  },
    { text: "20",    value: 20  },
    { text: "21",    value: 21  },
    { text: "22",    value: 22  },
    { text: "23",    value: 23  },
    { text: "24",    value: 24  },
    { text: "25",    value: 25  }
  ],

  columnOptions: [
    { text: "10",    value: 10  },
    { text: "11",    value: 11  },
    { text: "12",    value: 12  },
    { text: "13",    value: 13  },
    { text: "14",    value: 14  },
    { text: "15",    value: 15  },
    { text: "16",    value: 16  },
    { text: "17",    value: 17  },
    { text: "18",    value: 18  },
    { text: "19",    value: 19  },
    { text: "20",    value: 20  },
    { text: "21",    value: 21  },
    { text: "22",    value: 22  },
    { text: "23",    value: 23  },
    { text: "24",    value: 24  },
    { text: "25",    value: 25  }
  ],



////////////////////////////////////////////// computed properties



  columnWidthClass: Ember.computed('numberOfColumns', function() {

    switch(this.get('numberOfColumns')) {

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
      case 16:
        return "sixteen";
      case 17:
        return "seventeen";
      case 18:
        return "eighteen";
      case 19:
        return "nineteen";
      case 20:
        return "twenty";
      case 21:
        return "twenty-one";
      case 22:
        return "twenty-two";
      case 23:
        return "twenty-three";
      case 24:
        return "twenty-four";
      case 25:
        return "twenty-five";

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
