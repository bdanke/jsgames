(function(root) {
  var Game = root.Game = (root.Game || {});

  function Snake(width, height) {
    this.dir = "N";
    this.nextDir = "N"
    this.segments = [[width/2 - 1, height/2],[width/2,height/2]];
  };

  Snake.prototype.head = function() {
    return this.segments[this.segments.length - 1];
  }

  Snake.prototype.move = function(grow) {
    this.dir = this.nextDir
    var head = this.head();
    var x = head[1];
    var y = head[0];
    if (this.dir == "N") {
      y -= 1;
    } else if (this.dir == "E") {
      x += 1;
    } else if (this.dir == "S") {
      y += 1;
    } else if (this.dir == "W") {
      x -= 1;
    }
    this.segments.push([y,x]);
    if (!grow) {
      this.segments.shift();
    }
  }

  var Board = Game.Board = function Board(width, height) {
    this.width = width;
    this.height = height;
    this.grid = new Array(width);
    for(var i = 0; i < width; i++){
      this.grid[i] = Array.apply(null, new Array(height)).map(String.prototype.valueOf, ".");
    }
    this.snake = new Snake(width, height);
    this.apples = [];
    this.over = false;
    this.placeApple();
    this.score = 0;
  }

  Board.prototype.move = function() {
    var grow = this.collision();
    this.offBoard();
    if (grow) {
      this.score++;
    }
    this.snake.move(grow);
  };

  Board.prototype.compareLocation =  function(a, b){
    return a[0] == b[0] && a[1] == b[1];
  };

  Board.prototype.offBoard = function(){
    var head = this.snake.head();
    if (head[0] < 0 || head[0] > this.height-1 || head[1] < 0 || head[1] > this.width -1){
      this.over = true;
    }
  }

  Board.prototype.collision = function(){
    var head = this.snake.head();
    var brd = this;
    var appleIdx = null;
    this.apples.forEach(function(apple, index, arr){
      // console.log("APPLE! " + apple);
//       console.log("HEAD! " + head)
      if (brd.compareLocation(apple, head)) {
        appleIdx = index;
      }
    });
    //console.log(apple);
    if (appleIdx !== null) {
      brd.apples.splice(appleIdx, 1);
      brd.placeApple();
      return true;
    }
    this.snake.segments.forEach(function(seg, segindex, arr){
      if (segindex !== arr.length - 1 ){
        if (brd.compareLocation(seg, head)){
          brd.over = true;
        }
      }
    });
    return false;
  };


  Board.prototype.placeApple = function(){
    this.apples.push([Math.floor(Math.random()*this.height), Math.floor(Math.random()*this.width)])
  }

})(this);