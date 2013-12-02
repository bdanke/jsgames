(function(root) {
  var Game = root.Game = (root.Game || {});


  var View = Game.View = function View(div) {
    this.$el = $(div);
  };

  View.prototype.start = function(width, height) {
    this.board = new Game.Board(width, height);
    this.render();
    var self = this;
    $(document).on("keydown", self.handleKeyEvent.bind(self));
    var snake = this.board.snake
    var timer = setInterval(function() {
      self.$el.html("");
      self.board.move();
      self.board.offBoard();
      self.render();
      if (self.board.over) {
        alert("Game over!")
        clearInterval(timer);

      }
    }, 500);
  };


  View.prototype.render = function() {
    var brd = this.board
    this.$el.append("<p>Score: " + brd.score + "</p>");
    for (var r = 0; r < brd.grid.length; r++){
      var row = $('<div></div>', {"id": "r"+r, "class": "row clearfix"});
      $(this.$el).append(row);
      for (var c = 0; c < brd.grid[r].length; c++){
        var cellClass = "cell";

        brd.apples.forEach(function(apple) {
          if (brd.compareLocation(apple, [r,c])) {
            cellClass = "apple";
          }
        });

        brd.snake.segments.forEach(function(seg) {
          if (brd.compareLocation(seg, [r,c])) {
            cellClass = "snake";
          }
        });

        var cell = $('<div></div>', {"class": cellClass, "id": ""+r+c })
        $('#r'+r).append(cell);
      }
    }
  };

  View.prototype.handleKeyEvent = function() {
    var dir = this.board.snake.dir;

    if (event.keyCode == 38) {
      if (dir != "S") {
        this.board.snake.nextDir = "N";
      }
    } else if (event.keyCode == 40) {
      if (dir != "N") {
        this.board.snake.nextDir = "S";
      }
    } else if (event.keyCode == 39) {
      if (dir != "W") {
        this.board.snake.nextDir = "E";
      }
    } else if (event.keyCode == 37) {
      if (dir != "E"){
        this.board.snake.nextDir = "W";
      }
    }
  };

  $(document).ready(function() {
    var v = new Game.View("div");
    v.start(50,50);
  });
})(this);