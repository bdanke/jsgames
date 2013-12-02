var Hanoi = (function(root){
  var Hanoi = root.Hanoi = (root.Hanoi || {});

  var Game = Hanoi.Game = function Game(){
    this.board = [[3,2,1],[],[]]
  }

  Game.prototype.run = function(){
    this.displayBoard();
    var self = this;
    if(!this.gameOver()){
      reader.question("Enter from: ",function(from) {
        reader.question("Enter to: ", function(to) {
          self.move(from,to);
          self.run();
        });
      });
    } else {
      console.log("You WON!");
      reader.close();
    }
  };

  Game.prototype.displayBoard = function(){
    console.log(this.board);
  };

  Game.prototype.move = function(from,to){
    if (this.validMove(from, to)){
      var piece = this.board[from].pop();
      this.board[to].push(piece);
      return true;
    } else {
      return false;
    }
  };

  Game.prototype.validMove = function(from,to){
    if (this.board[from].length == 0) {
      return false;
    } else if (this.board[to].length == 0 || _.last(this.board[to]) > _.last(this.board[from])) {
      return true;
    } else {
      return false;
    }
  };

  Game.prototype.gameOver = function(){
    if (this.board[2].length == 3){
      return true;
    } else {
      return false;
    }
  };

  return { Game: Game };
})(this);