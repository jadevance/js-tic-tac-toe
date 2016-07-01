function TicTacToe() {
  
  //cheap trick to grab an instance ref of TicTacToe
  var self = this;

  this.container = null;
  this.gameOver = null;
  this.turn = null;
  this.board = [['','',''],['','',''],['','','']];

  this.winConditions = [
    [[1,1,1],[0,0,0],[0,0,0]],
    [[0,0,0],[1,1,1],[0,0,0]],
    [[0,0,0],[0,0,0],[1,1,1]],
    [[1,0,0],[1,0,0],[1,0,0]],
    [[0,1,0],[0,1,0],[0,1,0]],
    [[0,0,1],[0,0,1],[0,0,1]],
    [[1,0,0],[0,1,0],[0,0,1]],
    [[0,0,1],[0,1,0],[1,0,0]]
  ];

  this.initialize = function(selector) {
    self.container = $(selector);
    $('div.cell').click(self.onCellClick);
    self.reset();
  };

  this._reset = function() {
    self.gameOver = false;
    self.turn = '🌮';
  };

  this._isWinner = function() {
    for (var i = 0; i < self.winConditions.length; i++) {
      var winCondition = self.winConditions[i];
      if (self.checkWinCondition('🌮', winCondition)) {
        return '🌮';
      }
      if (self.checkWinCondition('🐯', winCondition)) {
        return '🐯';
      }
    }
    return false;
  };

  this._setupTeam = function() {
    $('button.space').click(function() {
    var teamChoice = $(this).attr('class').split(' ')[1];
    console.log(teamChoice);
    });
  };


  this._setupButtons = function() {
    $('button.space').click(function() {
      var position = $(this).attr('class').split(' ')[1];
      self._checkMove(position); 
        // if taken, alert user they can't make that move
      // else
      // pass which team is making the move
      self._playMove(position);
      //check for win/lose/draw
    });
  };

  this._checkMove = function(position) {
    var position = $('button.space.'+ position).text();
    if (position === '🌮' || position === '🐯') {
      console.log("hey that spot is taken")
      console.log(position)
    } else {
      console.log("you can totally move there")
      console.log(position)
    }
  }

  this._playMove = function(position) {
    var position = $('button.space.'+ position).text();
    //whose turn is it?
    //if tiger turn, play tiger:
      $(position).text('🐯'); 
    // else play taco 
      $(position).text('🌮');
  };
}

// what is a turn? 

// determine which player has a turn 
// select a space
  // space available? 
  // space advantage
// claim space using player identifier
// check win/loss state
  // what is a win?
  // what is a draw?
  // what is a loss? 
  // communicate outcome 
  // continue play? 

  // 8 win cases:
  // three horizontal, three vertical, two diagonal