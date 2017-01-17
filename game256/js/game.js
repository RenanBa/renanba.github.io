function Game(board) {
  this.board = board;
  this.lastRound = [];
  this.score = Board.score
  this.Win = false;
  if (typeof this.board === 'undefined') { this.board = Board.default(); }
}

Game.prototype.right = function(simulation) {
  var boardRows = Board.split(this.board); //split board into [4X4] array
  var finalBoard = Board.calculation(boardRows); // calculate each row and return one array

  if(simulation){
    return finalBoard
  } else if (ValidMove(finalBoard, this.lastRound)){
    this.board = finalBoard;
    this.lastRound = finalBoard;
    return true;
  }
  return false;

}

Game.prototype.down = function(simulation) {
  var boardRows = Board.split(this.board);
  var matrix = Board.matrix(boardRows);
  var finalBoard = Board.calculation(matrix);

  finalBoard = Board.split(finalBoard);
  finalBoard = Board.matrix(finalBoard);
  finalBoard = Board.flat(finalBoard);

  if(simulation){
    return finalBoard
  } else if (ValidMove(finalBoard, this.lastRound)){
    this.board = finalBoard;
    this.lastRound = finalBoard;
    return true;
  }
  return false;
}

Game.prototype.left = function(simulation) {
  var reversedBoard = Board.reverse(this.board);
  var boardRows = Board.split(reversedBoard);
  var finalBoard = Board.calculation(boardRows);
  finalBoard = Board.reverse(finalBoard);

  if(simulation){
    return finalBoard
  } else if (ValidMove(finalBoard, this.lastRound)){
    this.board = finalBoard;
    this.lastRound = finalBoard;
    return true;
  }
  return false;
}

Game.prototype.up = function(simulation){
  var boardRows = Board.split(this.board);
  var matrix = Board.matrix(boardRows);
  var flatBoard = Board.flat(matrix);
  var reversedBoard = Board.reverse(flatBoard);
  var splitReversedBoard = Board.split(reversedBoard);
  var finalBoard = Board.calculation(splitReversedBoard)

  finalBoard = Board.reverse(finalBoard);
  finalBoard = Board.split(finalBoard);
  finalBoard = Board.matrix(finalBoard);
  finalBoard = Board.flat(finalBoard);

  if(simulation){
    return finalBoard
  } else if (ValidMove(finalBoard, this.lastRound)){
    this.board = finalBoard;
    this.lastRound = finalBoard;
    return true;
  }
  return false;
}

Game.prototype.addNewValue = function(){
  var availableIndex = Board.availableIndex(this.board);
  this.board[Random(availableIndex)] = String(Board.randomValue());
  this.score = Score.final();
}

Game.prototype.didWin = function(){
  var win = false;
  this.board.forEach(function(element, index) {
      if(parseInt(element) >= 256 ){
        win = true;
      }
  });
  return win;
}

Game.prototype.didLose = function(){
  var lost = true;
  var boardCheck = [ValidMove(game.up(true), this.lastRound),
                    ValidMove(game.right(true), this.lastRound),
                    ValidMove(game.down(true), this.lastRound),
                    ValidMove(game.left(true), this.lastRound)];
  boardCheck.forEach(function(element){
    if (element) {
      lost = false;
    }
  });
  return lost;
}





