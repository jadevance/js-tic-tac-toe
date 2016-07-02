function TicTacToe() {
  // cheap trick to grab instance of TicTacToe 
  // and keep it straight when inside functions
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
    $('div.button').click(self.onNewGameClick)
  };

  this.reset = function() {
    self.gameOver = false;
    self.board = [['','',''],['','',''],['','','']]; 
    self.container.find('div.cell').text('');
    self.turn = null; 
    $('div.message').text('')
  };

  this.onNewGameClick = function() {
    self.reset()
  }; 

  this.onTeamClick = function() {
    var _this = $(this);
    if (_this.data('type') === 'taco') { 
      self.turn = '🌮'
      $('div.cell').click(self.onCellClick);
    } else {
      self.turn = '🐯'
      $('div.cell').click(self.onCellClick);
    }
  }; 

  this.onCellClick = function() {
    var _this = $(this);
    var row = _this.data('row');
    var column = _this.data('column');
    self.makeMove(row, column); 
  };

  this.displayBoard = function() {
    for (var i = 0; i < self.board.length; i++) {
      var row = self.board[i];
      for (var j = 0; j < row.length; j++) {
        var cell = row[j];
        self.updateCell(i, j, cell);
      }; 
    }; 
  };

  this.makeMove = function(row, column) {
    if (self.board[row][column] != '') {
      return;
    }; 
    if (self.gameOver) {
      return;
    }; 
    self.board[row][column] = self.turn;
    self.nextTurn();
  };

  this.updateCell = function(row, column, content) {
    var selector = 'div.cell[data-row="%row%"][data-column="%column%"]';
    selector = selector.replace('%row%', row);
    selector = selector.replace('%column%', column);
    self.container.find(selector).text(content);
  };

  this.nextTurn = function() {
    self.displayBoard();
    self.turn = self.turn === '🌮' ? '🐯' : '🌮';

    var winner = self.isWinner();
    var draw = self.isDraw(); 
    if (winner != false) {
      self.gameOver = true;
      $('div.message').text('Winner: Team ' + winner)
    }; 
    if (draw === true && winner != true) {
      $('div.message').text("It's a draw!")
    }; 
  };

  this.isWinner = function() {
    for (var i = 0; i < self.winConditions.length; i++) {
      var winCondition = self.winConditions[i];
      if (self.checkWinCondition('🌮', winCondition)) {
        return '🌮';
      }; 
      if (self.checkWinCondition('🐯', winCondition)) {
        return '🐯';
      }; 
    }; 
    return false;
  };

  this.isDraw = function() {
    for (var i = 0; i < self.board.length; i++) {
      var row = self.board[i];
      for (var j = 0; j < row.length; j++) {
        var boardCell = row[j];
        if (boardCell === '') {
          return false; 
        }; 
      }; 
    }; 
    return true; 
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
        }; 
      }; 
    }; 
    return true;
  };
};