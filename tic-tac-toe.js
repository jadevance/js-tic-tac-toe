// To Do:
// - Draw conditions and message 
// - Make it look how you want

// Done:
// - Winner message
// - Team selection
// - New game button (will call reset method)

function TicTacToe() {
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

  this.init = function(selector) {
    self.container = $(selector);
    $('div.team').click(self.onTeamClick);
    $('div.cell').click(self.onCellClick);
    $('button').click(self.onNewGameClick)
  };

  this.reset = function() {
    self.gameOver = false;
    self.board = [['','',''],['','',''],['','','']]; 
    self.container.find('div.cell').text('');
  };

  this.onCellClick = function() {
    var _this = $(this);
    var row = _this.data('row');
    var column = _this.data('column');
    self.makeMove(row, column); 
  };

  this.onTeamClick = function() {
    var _this = $(this);
    if (_this.data('type') === 'taco') { 
      self.turn = '🌮'
    } else {
      self.turn = '🐯'
    }
  }

  this.onNewGameClick = function() {
    self.reset()
  }

  this.makeMove = function(row, column) {
    if (self.board[row][column] != '') {
      return;
    }
    if (self.gameOver) {
      return;
    }
    self.board[row][column] = self.turn;
    self.nextTurn();
  };

  this.nextTurn = function() {
    self.displayBoard();
    self.turn = self.turn === '🌮' ? '🐯' : '🌮';

    var winner = self.isWinner();
    if (winner != false) {
      self.gameOver = true;
      $('div.message').text('Winner: Team ' + winner)
    }
    // var draw = $.contains('#tic-tac-toe.div', '')
    // console.log(draw)
  };

  this.isWinner = function() {
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

  this.checkWinCondition = function(symbol, winCondition) {
    for (var i = 0; i < self.board.length; i++) {
      var row = self.board[i];
      for (var j = 0; j < row.length; j++) {
        var boardCell = row[j];
        var winConditionCell = winCondition[i][j];
        // To be a win all winConditionCells with a 1
        // must contain the symbol.
        // If a winConditionCell with a 1 does not contain
        // the symbol this can't be a winner.
        if (winConditionCell == 1 && boardCell != symbol) {
          return false;
        }
      }
    }
    return true;
  };

  this.displayBoard = function() {
    for (var i = 0; i < self.board.length; i++) {
      var row = self.board[i];
      for (var j = 0; j < row.length; j++) {
        var cell = row[j];
        self.updateCell(i, j, cell);
      }
    }
  };

  this.updateCell = function(row, column, content) {
    var selector = 'div.cell[data-row="%row%"][data-column="%column%"]';
    selector = selector.replace('%row%', row);
    selector = selector.replace('%column%', column);
    self.container.find(selector).text(content);
  };
};
