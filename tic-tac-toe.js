function TicTacToe() {
  //cheap trick to grab an instance ref of TicTacToe
  var instance = this;

  this.initialize = function() {
    this._setupButtons();
  };

  this._setupButtons = function() {
    $('button.space').click(function() {
      var position = $(this).attr('class').split(' ')[1];
      // check to see if that position is taken or not (check move method)
        // if taken, alert user they can't make that move
      // else
      // pass which team is making the move
      instance._playMove(position);
      //check for win/lose/draw

    });
  };

  this._playMove = function(position) {
    var position = $('button.space.'+ position)
    $(position).text('🌮');
    // maybe remove that space from possible plays?
  };
}

$(document).ready( function() {
  var tictactoe = new TicTacToe();
  tictactoe.initialize();
});


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