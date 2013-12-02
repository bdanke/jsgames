var TicTacToe = (function(root){
  var TicTacToe = root.TicTacToe = (root.TicTacToe || {});

  function Game(){
    this.board = new Board();
    this.players = {x: (new HumanPlayer("x", this)), o: (new ComputerPlayer("o", this))};
    this.play = function(mark) {
      var mark = mark || "x";
      // this.board.displayGrid();
      var self = this;
      console.log(mark + "'s turn.");

      var pos = this.players[mark].makeMove();
      //this.makeMove(pos[0], pos[1], mark);
    };

    // this.boardMove = function(row, col, mark){
      // if (this.board.placeMark(row, col, mark)){
//         if (this.board.won()) {
//           console.log(mark + " WINS!");
//           //this.board.displayGrid();
//          // reader.close();
//         } else if (this.board.draw()) {
//            console.log("Draw!");
//           // this.board.displayGrid();
//            //reader.close();
//         } else {
//           mark = (mark == "x") ? "o" : "x";
//           this.play(mark);
//         }
//       } else {
//         this.play(mark);
//       }
//     }

  };

  function Board(){
    this.grid = [["-","-","-"],["-","-","-"],["-","-","-"]]
  };

  Board.prototype.displayGrid = function() {
    this.grid.forEach(function(row) {
      console.log(row);
    });
  };

  Board.prototype.checkRows = function() {
    for (var i = 0; i < this.grid.length; i++){
      var xCount = 0; var oCount = 0;
      for (var j = 0; j < this.grid.length; j++){
        if (this.grid[i][j] == "x"){
          xCount++;
        } else if (this.grid[i][j] == "o") {
          oCount++;
        }
        if (xCount == 3 || oCount == 3) {
          return true;
        }
      }
    }
    return false;
  };

  Board.prototype.checkCols = function() {
    for (var i = 0; i < this.grid.length; i++){
      var xCount = 0; var oCount = 0;
      for (var j = 0; j < this.grid.length; j++){
        if (this.grid[j][i] == "x"){
          xCount++;
        } else if (this.grid[j][i] == "o") {
          oCount++;
        }
        if (xCount == 3 || oCount == 3) {
          return true;
        }
      }
    }
    return false;
  };

  Board.prototype.checkDiags = function() {
    if (this.grid[0][0] == "x" && this.grid[1][1] == "x" && this.grid[2][2] == "x") {
      return true;
    }
    if (this.grid[0][0] == "o" && this.grid[1][1] == "o" && this.grid[2][2] == "o") {
      return true;
    }
    if (this.grid[0][2] == "x" && this.grid[1][1] == "x" && this.grid[2][0] == "x") {
      return true;
    }
    if (this.grid[0][2] == "o" && this.grid[1][1] == "o" && this.grid[2][0] == "o") {
      return true;
    }
    return false
  };

  Board.prototype.draw = function(){
    for (var i = 0; i < this.grid.length; i++){
      for (var j = 0; j < this.grid.length; j++){
        if (this.empty(i,j)){
          return false;
        }
      }
    }
    return true;
  };

  Board.prototype.won = function(){
    return this.checkRows() || this.checkCols() || this.checkDiags();
  };

  Board.prototype.empty = function(row,col) {
    if (this.grid[row][col] == "-") {
      return true;
    }
    return false;
  };

  Board.prototype.inBounds = function(row, col) {
    return row >= 0 && row <= 2 && col >= 0 && col <= 2;
  };

  Board.prototype.placeMark = function(row, col, mark) {
    if (this.inBounds(row, col) && this.empty(row, col)) {
      this.grid[row][col] = mark;
      return true;
    }
    return false;
  };

  function HumanPlayer(mark, game){
    this.mark = mark;
    this.game = game;
  }

  function ComputerPlayer(mark, game){
    this.mark = mark;
    this.game = game;
  }

  HumanPlayer.prototype.makeMove = function(){
    var self = this;
    reader.question("Row: ", function(row) {
      reader.question("Col: ", function(col) {
        self.game.boardMove(row, col, self.mark);
      });
    });
  };

  ComputerPlayer.prototype.makeMove = function() {
    otherMark = (this.mark == "x") ? "o" : "x";
    othersMove = this.winningMove(otherMark);
    ourMove = this.winningMove(this.mark);
    console.log(othersMove);
    console.log(ourMove);
    if (ourMove) {
      console.log("COMP WINS");
      this.game.boardMove(ourMove[0],ourMove[1],this.mark);
    } else if (othersMove) {
      console.log("COMP SAVES");
      this.game.boardMove(othersMove[0],othersMove[1],this.mark);
    } else {
      console.log("RANDOM");
      row = Math.floor(Math.random() * 3);
      col = Math.floor(Math.random() * 3);
      this.game.boardMove(row,col,this.mark);
    }
  };

  ComputerPlayer.prototype.winningMove = function(mark) {
    var pos = this.checkRows(mark) || this.checkCols(mark) || this.checkDiags(mark);
    return pos;
  };

  ComputerPlayer.prototype.checkRows = function(mark) {
    for (var i = 0; i < this.game.board.grid.length; i++){
      var markCount = 0; var blankCount = 0;
      var blankPos = [];
      for (var j = 0; j < this.game.board.grid.length; j++){
        if (this.game.board.grid[i][j] == mark){
          markCount++;
        } else if (this.game.board.grid[i][j] == "-") {
          blankCount++;
          blankPos.push(i);
          blankPos.push(j);
        }
        if (markCount == 2 && blankCount == 1) {
          return blankPos;
        }
      }
    }
    return false;
  };

  ComputerPlayer.prototype.checkCols = function(mark) {
    for (var i = 0; i < this.game.board.grid.length; i++){
      var markCount = 0; var blankCount = 0;
      var blankPos = [];
      for (var j = 0; j < this.game.board.grid.length; j++){
        if (this.game.board.grid[j][i] == mark){
          markCount++;
        } else if (this.game.board.grid[j][i] == "-") {
          blankCount++;
          blankPos.push(j);
          blankPos.push(i);
        }
        if (markCount == 2 && blankCount == 1) {
          return blankPos;
        }
      }
    }
    return false;
  };

  ComputerPlayer.prototype.checkDiags = function(mark) {
    var diag1 = [[0,0],[1,1],[2,2]]
    var markCount = 0; var blankCount = 0;
    var blankPos = [];
    var self = this;
    console.log(mark);
    diag1.forEach(function(pos) {
      if (self.game.board.grid[pos[0]][pos[1]] == mark) {
        markCount++;
      } else if (self.game.board.grid[pos[0]][pos[1]] == "-") {
        blankCount++;
        blankPos = pos;
      }
    });
    if (markCount == 2 && blankCount == 1) {
      return blankPos;
    }

    var diag1 = [[0,2],[1,1],[2,0]]
    var markCount = 0; var blankCount = 0;
    var blankPos = [];
    diag1.forEach(function(pos) {
      if (self.game.board.grid[pos[0]][pos[1]] == mark) {
        markCount++;
      } else if (self.game.board.grid[pos[0]][pos[1]] == "-") {
        blankCount++;
        blankPos = pos;
      }
    });
    if (markCount == 2 && blankCount == 1) {
      return blankPos;
    }
    return false;
  };

  return { Game: Game }
})(this);