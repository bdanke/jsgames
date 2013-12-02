(function(root) {
  var Game = new TicTacToe.Game();
  var mark = "x"
  var switchMark = function(){
    mark = (mark == "x") ? "o" : "x";
    return mark
  }

  $(document).ready(function() {
    $(".col").children().click(function() {
      var sqr = $(this);
      var row = sqr.attr("row");
      var col = sqr.attr("col");
      if (Game.board.placeMark(row, col, mark)) {
        sqr.html(mark);
        switchMark();
      } else {
        alert("Invalid move!")
      }
      if (Game.board.won()) {
        alert(switchMark() + " wins!");
      } else if(Game.board.draw()) {
        alert("No one wins!");
      }
    });
  })
})(this);