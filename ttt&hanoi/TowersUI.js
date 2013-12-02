(function(root) {

  $(document).ready(function() {
    var pileNum = null;
    var Game = new root.Hanoi.Game();

    $("#c0").click(function() {
      if (pileNum !== null) {
        Game.move(pileNum,0);
        pileNum = null;
        render();
        if (Game.gameOver()) {
          alert("You Win!");
        }
      } else {
        pileNum = 0;
        console.log(pileNum);
        render();
      }
    });

    $("#c1").click(function() {
      if (pileNum !== null) {
        Game.move(pileNum,1);
        pileNum = null;
        render();
        if (Game.gameOver()) {
          alert("You Win!");
        }
      } else {
        pileNum = 1;
        render();
      }
    });

    $("#c2").click(function() {
      if (pileNum !== null) {
        Game.move(pileNum,2);
        pileNum = null;
        render();
        if (Game.gameOver()) {
          alert("You Win!");
        }
      } else {
        pileNum = 2;
        render();
      }
    });

    var render = function() {

      $.each($(".col").children(), function(index, el) {
        $(el).html("_");
      });

      // for( var c = 0; c < 3; c++) {
 //        for( var r = 0; r < 3; r++){
 //          var cell = $("#c" + c + " ." + "r" + (r+1))
 //          cell.html("_");
 //          }
 //        }

      console.log(Game.board);
      Game.board.forEach(function(col, index) {
        col.forEach(function(row, index2) {
          var colId = "c" + index;
          var rowClass = "r" + index2;
          // console.log($("#" + colId + " " + rowClass))
          $("#" + colId + " ." + rowClass).html(row);
        });
      });

      // for( var c = 0; c < 3; c++) {
 //        for( var r = 0; r < 3; r++){
 //          cell = $("#c" + c + " ." + "r" + (r+1))
 //          if (["1","2","3"].indexOf(cell.html()) === -1){
 //            console.log(cell);
 //            cell.html("_");
 //          }
 //        }
 //      }
      //
      $.each($(".col").children(), function(index, el) {
        if (["1","2","3"].indexOf($(el).html()) === -1) {
          $(el).html("_");
        }
      });
    };
    render();
  });
})(this);