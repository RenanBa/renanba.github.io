$(document).ready(function(){
  console.log('Ready!');
  NewGame.start();

  $(".tabuleiro").on("click", "a", function(e){
    e.preventDefault();

    if($(this).attr('id') == "p1" || $(this).attr('id') == "p2" || $(this).attr('id') == "p3" || $(this).attr('id') == "p4"){
      console.log($(this));
    }

    if(Turn.playingNow == "blue" && $(this).attr('class') != "green" && $(this).attr('class') != "empty"){
      // Turn.removeBorder();
      if(Turn.pieceSelected.length == 1 && $(this).attr('class') == Turn.playingNow){
        Turn.removeOptions();
        Turn.pieceSelected.push({tagElement: $(this), href: $(this).attr('href'), className: $(this).attr('class'), idName: $(this).attr('id')});
        ShowMoves.show($(this).attr('href'), $(this).attr('id'));
      }else if('spin' != $(this).attr('class').split(' ')[1]){
        Turn.pieceSelected.push({tagElement: $(this), href: $(this).attr('href'), className: $(this).attr('class'), idName: $(this).attr('id')});
        ShowMoves.show($(this).attr('href'), $(this).attr('id'));
      }
    }else if(Turn.playingNow == "green" && $(this).attr('class') != "blue" && $(this).attr('class') != "empty"){
      // Turn.removeBorder();
      if(Turn.pieceSelected.length == 1 && $(this).attr('class') == Turn.playingNow){
        Turn.removeOptions();
        Turn.pieceSelected.push({tagElement: $(this), href: $(this).attr('href'), className: $(this).attr('class'), idName: $(this).attr('id')});
        ShowMoves.show($(this).attr('href'), $(this).attr('id'));
      }else if('spin' != $(this).attr('class').split(' ')[1]){
        Turn.pieceSelected.push({tagElement: $(this), href: $(this).attr('href'), className: $(this).attr('class'), idName: $(this).attr('id')});
        ShowMoves.show($(this).attr('href'), $(this).attr('id'));
      }
    }
  })
});

var ShowMoves = {
  show: function show(href, id){

    $("#"+id).addClass("spin");

    if(Turn.pieceSelected.length == 1){
      Turn.options(href, id);
    }else if(Turn.pieceSelected.length == 2){
      var placeId = Turn.pieceSelected[1].idName;
      var placeClass = Turn.pieceSelected[1].className;
      $("#"+placeId).removeClass(placeClass).addClass(Turn.pieceSelected[0].className);
      $("#"+Turn.pieceSelected[0].idName).removeClass(Turn.pieceSelected[0].className).addClass(placeClass);
      $("#"+Turn.pieceSelected[0].idName).removeClass("possibleMoves").addClass("empty");
      Target.capture(id);
      Turn.whoseTurn(Turn.pieceSelected[0].className);
      Turn.removeOptions();
    }
  }
}

var Turn = {
  // when greenMoveEdge is true it means that the selected piece is on the far right or left of the board
  greenMoveEdge: false,

  greenEdge: function greenEdge(id){
    ["p5","p13","p21","p29","p4","p12","p20","p28"].forEach(function(index){
      if(index == id){
        Turn.greenMoveEdge = true;
      }
    })
  },
  // when blueMoveEdge is true it means that the selected piece is on the far right or left of the board
  blueMoveEdge: false,

  blueEdge: function blueEdge(id){
    ["p28","p20","p12","p29","p21","p13","p5"].forEach(function(index){
      if(index == id){
        Turn.blueMoveEdge = true;
      }
    })
  },
  //GREEN and BLUE are the row of positions that takes has more spot to show possible moves
  GREEN: ["p1","p2","p3","p4","p9","p10","p11","p12","p17","p18","p19","p20","p25","p26","p27","p28"],
  BLUE: ["p5","p6","p7","p8","p13","p14","p15","p16","p21","p22","p23","p24","p29","p30","p31","p32"],
  // When baseRow is true it means that the row is one place farther to project the possible move
  baseRow: false,
  // greenBaseRow is to check if the selected piece is include on the GREEN array of row
  greenBaseRow: function include(id){
    var longRow = Turn.GREEN;
    longRow.forEach(function(index){
      if(index == id){
        Turn.baseRow = true;
      }
    })
  },
  // blueBaseRow is to check if the selected piece is include on the BLUE array of row
  blueBaseRow: function include(id){
    var longRow = Turn.BLUE;
    longRow.forEach(function(index){
      if(index == id){
        Turn.baseRow = true;
      }
    })
  },
// option calculate the option for moves base on who is playing
  options: function options(href, id){
    // Here check who is the current player and also call the methods to check on which case the selected piece belongs to
    if(Turn.player == 1){
      Turn.greenBaseRow(id);
      Turn.greenEdge(id);
      console.log("Green");
      //After call the functions above. Those IF choose the way to go
     if(Turn.greenMoveEdge == false){
        if(Turn.baseRow){
          //logic to capture
          console.log("In the base row long");
          //Here is checking if the possible moves are not empty and store the enemy piece id and call the function to put the enemy on target and show the new possible move
          if($("#p"+(parseInt(href)+4)).attr('class') == "blue" && $("#p"+(parseInt(href)+5)).attr('class') == "blue"){
            Target.onTarget.push({left: "#p"+(parseInt(href)+5), right: "#p"+(parseInt(href)+4)});
            Target.green((parseInt(href)+5), (parseInt(href)+4));
            Turn.baseRow = false;
            console.log("If left and right is on target");
            console.log(Target.onTarget);
          }else if($("#p"+(parseInt(href)+4)).attr('class') == "blue"){
            Target.onTarget.push({right: "#p"+(parseInt(href)+4)});
            Target.green(99, (parseInt(href)+4));
            Turn.baseRow = false;
            console.log("If only right is on target");
            console.log(Target.onTarget);
          }else if($("#p"+(parseInt(href)+5)).attr('class') == "blue"){
            Target.onTarget.push({left: "#p"+(parseInt(href)+5)});
            Target.green((parseInt(href)+5), 99);
            Turn.baseRow = false;
            console.log("If only left is on target");
            console.log(Target.onTarget);
          }
          // If there no enemy on the possible move, just show the possible moves
          if($("#p"+(parseInt(href)+4)).attr('class') == "empty" && $("#p"+(parseInt(href)+5)).attr('class') == "empty"){
            $("#p"+(parseInt(href)+4)).removeClass("empty").addClass("possibleMoves");
            $("#p"+(parseInt(href)+5)).removeClass("empty").addClass("possibleMoves");
            Turn.baseRow = false;
            console.log("If left and right is empty");
          }else if($("#p"+(parseInt(href)+4)).attr('class') == "empty"){
            $("#p"+(parseInt(href)+4)).removeClass("empty").addClass("possibleMoves");
            Turn.baseRow = false;
            console.log("If only right is empty");
          }else if($("#p"+(parseInt(href)+5)).attr('class') == "empty"){
            $("#p"+(parseInt(href)+5)).removeClass("empty").addClass("possibleMoves");
            Turn.baseRow = false;
            console.log("If only left is empty");
          }
          //This else is used when the selected piece is on the short row and repeats the same code above with the new calculation number
        }else{
          //logic to capture
          console.log("Out of the baseRow ");
           if($("#p"+(parseInt(href)+3)).attr('class') == "blue" && $("#p"+(parseInt(href)+4)).attr('class') == "blue"){
            Target.onTarget.push({left: "#p"+(parseInt(href)+4), right: "#p"+(parseInt(href)+3)});
            Target.green((parseInt(href)+4), (parseInt(href)+3));
            console.log(Target.onTarget);
          }else if($("#p"+(parseInt(href)+3)).attr('class') == "blue"){
            Target.onTarget.push({right: "#p"+(parseInt(href)+3)});
            Target.green(99, (parseInt(href)+3));
            console.log(Target.onTarget);
          }else if($("#p"+(parseInt(href)+4)).attr('class') == "blue"){
            Target.onTarget.push({left: "#p"+(parseInt(href)+4)});
            Target.green((parseInt(href)+4), 99);
            console.log(Target.onTarget);
          }

          if($("#p"+(parseInt(href)+3)).attr('class') == "empty" && $("#p"+(parseInt(href)+4)).attr('class') == "empty"){
              $("#p"+(parseInt(href)+3)).removeClass("empty").addClass("possibleMoves");
              $("#p"+(parseInt(href)+4)).removeClass("empty").addClass("possibleMoves");
              Turn.baseRow = false;
          }else if($("#p"+(parseInt(href)+3)).attr('class') == "empty"){
              $("#p"+(parseInt(href)+3)).removeClass("empty").addClass("possibleMoves");
              Turn.baseRow = false;
          }else if($("#p"+(parseInt(href)+4)).attr('class') == "empty"){
              $("#p"+(parseInt(href)+4)).removeClass("empty").addClass("possibleMoves");
              Turn.baseRow = false;
          }
        }
      }else{
        //Here is for when the selected piece is on the edge of the board
        console.log("green EDGECASE");
        // Like the code above, it check where the piece is and apply a case for that
        if($("#p"+(parseInt(href)+4)).attr('class') == "blue"){
          console.log("If there is blue piece in the way");
            if(id == "p5" || id == "p13" || id == "p21"){
              Target.onTarget.push({left: "#p"+(parseInt(href)+4)});
              Target.toCapture.push({left: "#p"+(parseInt(href)+9)});
              $("#p"+(parseInt(href)+9)).removeClass("empty").addClass("possibleMoves");
            }else{
              Target.onTarget.push({right: "#p"+(parseInt(href)+4)});
              Target.toCapture.push({right: "#p"+(parseInt(href)+7)});
              $("#p"+(parseInt(href)+7)).removeClass("empty").addClass("possibleMoves");
            }
          }
        if($("#p"+(parseInt(href)+4)).attr('class') == "empty"){
          console.log("Free way");
          $("#p"+(parseInt(href)+4)).removeClass("empty").addClass("possibleMoves");
          Turn.greenMoveEdge = false;
        }
      }
    }

    if(Turn.player == 0){
      Turn.blueBaseRow(id);
      Turn.blueEdge(id);

      if(Turn.blueMoveEdge == false){
        if(Turn.baseRow){
          // check for enemy on both front place and back on the left side
          if($("#p"+(parseInt(href)-4)).attr('class') == "green" && $("#p"+(parseInt(href)-5)).attr('class') == "green" && $("#p"+(parseInt(href)+3)).attr('class') == "green"){
            Target.onTarget.push({left: "#p"+(parseInt(href)-5), right: "#p"+(parseInt(href)-4), backLeft: "#p"+(parseInt(href)+3)});
            Target.blue((parseInt(href)-5), (parseInt(href)-4), 99, (parseInt(href)+3));
            Turn.baseRow = false;
            // check for enemy on both front place and back on the right side
          }else if($("#p"+(parseInt(href)-4)).attr('class') == "green" && $("#p"+(parseInt(href)-5)).attr('class') == "green" && $("#p"+(parseInt(href)+4)).attr('class') == "green"){
            Target.onTarget.push({left: "#p"+(parseInt(href)-5), right: "#p"+(parseInt(href)-4), backRight: "#p"+(parseInt(href)+4)});
            Target.blue((parseInt(href)-5), (parseInt(href)-4), (parseInt(href)+4), 99);
            Turn.baseRow = false;
          // check for enemy on both back
          }else if($("#p"+(parseInt(href)+3)).attr('class') == "green" && $("#p"+(parseInt(href)+4)).attr('class') == "green"){
            Target.onTarget.push({backLeft: "#p"+(parseInt(href)+3), backRight: "#p"+(parseInt(href)+4)});
            Target.blue((parseInt(href)+3), (parseInt(href)+4), 99, 99);
            Turn.baseRow = false;

          // check for enemy only right back
          }else if($("#p"+(parseInt(href)+4)).attr('class') == "green"){
            Target.onTarget.push({backRight: "#p"+(parseInt(href)+4)});
            Target.blue(99, 99, 99, (parseInt(href)+4));
            Turn.baseRow = false;
          // check for enemy only left back
          }else if($("#p"+(parseInt(href)+3)).attr('class') == "green"){
            Target.onTarget.push({backLeft: "#p"+(parseInt(href)+3)});
            Target.blue((99, 99, "#p"+(parseInt(href)+3), 99));
            Turn.baseRow = false;

          // check for enemy on both front place
          }else if($("#p"+(parseInt(href)-4)).attr('class') == "green" && $("#p"+(parseInt(href)-5)).attr('class') == "green"){
            Target.onTarget.push({left: "#p"+(parseInt(href)-5), right: "#p"+(parseInt(href)-4)});
            Target.blue((parseInt(href)-5), (parseInt(href)-4));
            Turn.baseRow = false;
            // check for enemy only right front
          }else if($("#p"+(parseInt(href)-4)).attr('class') == "green"){
            Target.onTarget.push({right: "#p"+(parseInt(href)-4)});
            Target.blue(99, (parseInt(href)-4));
            Turn.baseRow = false;
            // check for enemy only left front
          }else if($("#p"+(parseInt(href)-5)).attr('class') == "green"){
            Target.onTarget.push({left: "#p"+(parseInt(href)-5)});
            Target.blue((parseInt(href)-5), 99);
            Turn.baseRow = false;
          }

          //logic to capture
          // if($("#p"+(parseInt(href)-4)).attr('class') == "green" && $("#p"+(parseInt(href)-5)).attr('class') == "green" ){
          //   Target.onTarget.push({left: "#p"+(parseInt(href)-5), right: "#p"+(parseInt(href)-4)});
          //   Target.blue((parseInt(href)-5), (parseInt(href)-4));
          //   Turn.baseRow = false;
          // }else if($("#p"+(parseInt(href)-4)).attr('class') == "green"){
          //   Target.onTarget.push({right: "#p"+(parseInt(href)-4)});
          //   Target.blue(99, (parseInt(href)-4));
          //   Turn.baseRow = false;
          // }else if($("#p"+(parseInt(href)-5)).attr('class') == "green"){
          //   Target.onTarget.push({left: "#p"+(parseInt(href)-5)});
          //   Target.blue((parseInt(href)-5), 99);
          //   Turn.baseRow = false;
          // }

          if($("#p"+(parseInt(href)-4)).attr('class') == "empty" && $("#p"+(parseInt(href)-5)).attr('class') == "empty"){
            $("#p"+(parseInt(href)-4)).removeClass("empty").addClass("possibleMoves");
            $("#p"+(parseInt(href)-5)).removeClass("empty").addClass("possibleMoves");
            Turn.baseRow = false;
          }else if($("#p"+(parseInt(href)-4)).attr('class') == "empty"){
            $("#p"+(parseInt(href)-4)).removeClass("empty").addClass("possibleMoves");
            Turn.baseRow = false;
          }else if($("#p"+(parseInt(href)-5)).attr('class') == "empty"){
            $("#p"+(parseInt(href)-5)).removeClass("empty").addClass("possibleMoves");
            Turn.baseRow = false;
          }

        }else{
          //logic to capture
           if($("#p"+(parseInt(href)-3)).attr('class') == "green" && $("#p"+(parseInt(href)-4)).attr('class') == "green"){
            Target.blue((parseInt(href)-4), (parseInt(href)-3));
            Target.onTarget.push({left: "#p"+(parseInt(href)-4), right: "#p"+(parseInt(href)-3)});
          }else if($("#p"+(parseInt(href)-3)).attr('class') == "green"){
            Target.blue(99, (parseInt(href)-3));
            Target.onTarget.push({right: "#p"+(parseInt(href)-3)});
          }else if($("#p"+(parseInt(href)-4)).attr('class') == "green"){
            Target.blue((parseInt(href)-4), 99);
            Target.onTarget.push({left: "#p"+(parseInt(href)-4)});
          }

          if($("#p"+(parseInt(href)-3)).attr('class') == "empty" && $("#p"+(parseInt(href)-4)).attr('class') == "empty"){
              $("#p"+(parseInt(href)-3)).removeClass("empty").addClass("possibleMoves");
              $("#p"+(parseInt(href)-4)).removeClass("empty").addClass("possibleMoves");
          }else if($("#p"+(parseInt(href)-3)).attr('class') == "empty"){
              $("#p"+(parseInt(href)-3)).removeClass("empty").addClass("possibleMoves");
          }else if($("#p"+(parseInt(href)-4)).attr('class') == "empty"){
              $("#p"+(parseInt(href)-4)).removeClass("empty").addClass("possibleMoves");
          }
        }
      }else{
        //logic to capture
        if($("#p"+(parseInt(href)-4)).attr('class') == "green"){
          if(id == "p28" || id == "p20" || id == "p12"){
            Target.onTarget.push({left: "#p"+(parseInt(href)-4)});
            Target.toCapture.push({left: "#p"+(parseInt(href)-9)});
            $("#p"+(parseInt(href)-9)).removeClass("empty").addClass("possibleMoves");
            Turn.blueMoveEdge = false;
          }else{
            Target.onTarget.push({right: "#p"+(parseInt(href)-4)});
            Target.toCapture.push({right: "#p"+(parseInt(href)-7)});
            $("#p"+(parseInt(href)-7)).removeClass("empty").addClass("possibleMoves");
            Turn.blueMoveEdge = false;
          }
        }
        if($("#p"+(parseInt(href)-4)).attr('class') == "empty"){
          $("#p"+(href-4)).removeClass("empty").addClass("possibleMoves");
          Turn.blueMoveEdge = false;
        }
      }
    }
  },

  removeOptions: function removeOptions(){
    Turn.pieceSelected = [];
    Turn.greenMoveEdge = false;
    Turn.blueMoveEdge = false;
    Turn.baseRow = false;
    $(".possibleMoves").removeClass("possibleMoves").addClass("empty");
    $(".blue").removeClass("possibleMoves");
    $(".blue").removeClass("empty");
    $(".green").removeClass("possibleMoves");
    $(".green").removeClass("empty");
    $(".spin").removeClass("spin");
    if(Target.onTarget.length > 0){
      Target.onTarget = [];
      Target.toCapture = [];
    }
  },
  //   This two commented function are to tell the player whose id turn by changing the color of the border of the board
  // addBorder: function addBorder(turn){
  //   $("#turno").children().remove();
  //   $("#turno").append($.parseHTML("<h3>Turn: "+ turn.charAt(0).toUpperCase() + turn.slice(1) +"</h3>"));

  //   if(turn == "green"){
  //     $( "#green-border-top" ).fadeIn( "slow");
  //     $( "#green-border-right" ).fadeIn( "slow");
  //     $( "#green-border-bottom" ).fadeIn( "slow");
  //     $( "#green-border-left" ).fadeIn( "slow");
  //   }else if(turn == "blue"){
  //     $( "#blue-border-top" ).fadeIn( "slow");
  //     $( "#blue-border-right" ).fadeIn( "slow");
  //     $( "#blue-border-bottom" ).fadeIn( "slow");
  //     $( "#blue-border-left" ).fadeIn( "slow");
  //   }
  // },

  // removeBorder: function removeBorder(){
  //   $( "#green-border-top" ).fadeOut( "slow");
  //   $( "#green-border-right" ).fadeOut( "slow");
  //   $( "#green-border-bottom" ).fadeOut( "slow");
  //   $( "#green-border-left" ).fadeOut( "slow");
  //   $( "#blue-border-top" ).fadeOut( "slow");
  //   $( "#blue-border-right" ).fadeOut( "slow");
  //   $( "#blue-border-bottom" ).fadeOut( "slow");
  //   $( "#blue-border-left" ).fadeOut( "slow");
  // },

  whoseTurn: function whoseTurn(turn){
    // console.log("SELECTING WHOSE TURN");
    var turn = turn;
    if(turn == "blue"){
      // Turn.addBorder("green");
      Turn.playingNow = "green";
      Turn.player = 1;
    };
     if(turn == "green"){
      // Turn.addBorder("blue");
      Turn.playingNow = "blue";
      Turn.player = 0;
    };
  },

  pieceSelected: []

}

var Target = {
  blue: function blue(lid, rid){

    if(lid < 40){
      Turn.blueEdge("p"+lid);
      Turn.greenBaseRow("p"+lid);
    }else if(rid < 40){
      Turn.blueEdge("p"+rid);
      Turn.greenBaseRow("p"+rid);
    }
    if(Turn.baseRow){
      if($("#p"+(lid-4)).attr('class') == "empty" && $("#p"+(rid-3)).attr('class') == "empty"){
        $("#p"+(rid-3)).removeClass("empty").addClass("possibleMoves");
        $("#p"+(lid-4)).removeClass("empty").addClass("possibleMoves");
        Target.toCapture.push({left: "#p"+(lid-4), right: "#p"+(rid-3)});
        Turn.greenMoveEdge = false;
      }else if($("#p"+(lid-4)).attr('class') == "empty"){
        Target.toCapture.push({left: "#p"+(lid-4)});
        $("#p"+(lid-4)).removeClass("empty").addClass("possibleMoves");
        Turn.greenMoveEdge = false;
      }else if($("#p"+(rid-3)).attr('class') == "empty"){
        Target.toCapture.push({right: "#p"+(rid-3)});
        $("#p"+(rid-3)).removeClass("empty").addClass("possibleMoves");
        Turn.greenMoveEdge = false;
      }
    }else{
      if($("#p"+(lid-5)).attr('class') == "empty" && $("#p"+(rid-4)).attr('class') == "empty"){
        Target.toCapture.push({left: "#p"+(lid-5), right: "#p"+(rid-4)});
        $("#p"+(rid-4)).removeClass("empty").addClass("possibleMoves");
        $("#p"+(lid-5)).removeClass("empty").addClass("possibleMoves");
        Turn.greenMoveEdge = false;
      }else if($("#p"+(lid-5)).attr('class') == "empty"){
        Target.toCapture.push({left: "#p"+(lid-5)});
        $("#p"+(lid-5)).removeClass("empty").addClass("possibleMoves");
        Turn.greenMoveEdge = false;
      }else if($("#p"+(rid-4)).attr('class') == "empty"){
        Target.toCapture.push({right: "#p"+(rid-4)});
        $("#p"+(rid-4)).removeClass("empty").addClass("possibleMoves");
        Turn.greenMoveEdge = false;
      }
    }

  },

  green: function green(lid, rid){

  if(lid < 40){
      Turn.greenEdge("p"+lid);
      Turn.blueBaseRow("p"+lid);
    }else if(rid < 40){
      Turn.greenEdge("p"+rid);
      Turn.blueBaseRow("p"+rid);
    }
    if(Turn.baseRow){
      if($("#p"+(lid+4)).attr('class') == "empty" && $("#p"+(rid+3)).attr('class') == "empty"){
        $("#p"+(rid+3)).removeClass("empty").addClass("possibleMoves");
        $("#p"+(lid+4)).removeClass("empty").addClass("possibleMoves");
        Target.toCapture.push({left: "#p"+(lid+4), right: "#p"+(rid+3)});
        Turn.blueMoveEdge = false;
      }else if($("#p"+(lid+4)).attr('class') == "empty"){
        $("#p"+(lid+4)).removeClass("empty").addClass("possibleMoves");
        Target.toCapture.push({left: "#p"+(lid+4)});
        Turn.blueMoveEdge = false;
      }else if($("#p"+(rid+3)).attr('class') == "empty"){
        $("#p"+(rid+3)).removeClass("empty").addClass("possibleMoves");
        Target.toCapture.push({right: "#p"+(rid+3)});
        Turn.blueMoveEdge = false;
      }
    }else{
      if($("#p"+(lid+5)).attr('class') == "empty" && $("#p"+(rid+4)).attr('class') == "empty"){
        $("#p"+(rid+4)).removeClass("empty").addClass("possibleMoves");
        $("#p"+(lid+5)).removeClass("empty").addClass("possibleMoves");
        Target.toCapture.push({left: "#p"+(lid+5), right: "#p"+(rid+4)});
        Turn.blueMoveEdge = false;
      }else if($("#p"+(lid+5)).attr('class') == "empty"){
        $("#p"+(lid+5)).removeClass("empty").addClass("possibleMoves");
        Target.toCapture.push({left: "#p"+(lid+5)});
        Turn.blueMoveEdge = false;
      }else if($("#p"+(rid+4)).attr('class') == "empty"){
        Target.toCapture.push({right: "#p"+(rid+4)});
        $("#p"+(rid+4)).removeClass("empty").addClass("possibleMoves");
        Turn.blueMoveEdge = false;
      }
    }
  },

  capture: function capture(move){

    if(Turn.playingNow == "blue"){
      var enemy = "green";
    }else{
      var enemy = "blue";
    }

    if(Target.toCapture.length > 0){
    // console.log("Empty spot selected: "+Turn.pieceSelected[1].idName);
    // console.log("Left spot to trigger capture: "+Target.toCapture[0].left);
    // console.log("Right spot to trigger capture: "+Target.toCapture[0].right);
    // console.log("The object onTarget left: "+ Target.onTarget[0].left);
    // console.log("The object onTarget right: "+ Target.onTarget[0].right);

      if (Target.toCapture[0].left == "#"+Turn.pieceSelected[1].idName){
        console.log("Left side "+Target.toCapture[0].left);
        console.log("Enemy id: "+ Target.onTarget[0].left);
        $(Target.onTarget[0].left).removeClass(enemy).addClass('empty');

      }else if(Target.toCapture[0].right == "#"+Turn.pieceSelected[1].idName){
        console.log("Right side "+Target.toCapture[0].right);
        console.log("Enemy id: "+ Target.onTarget[0].right);
        $(Target.onTarget[0].right).removeClass(enemy).addClass('empty');
      }
    }
  },

  onTarget: [],

  toCapture: []
}

var NewGame = {
  start: function start(){
      Turn.player = 0;
      Turn.playingNow = "blue";
      // Turn.addBorder("blue");
        for (i = 0; i <= 31; i++) {
          if(i <= 11){
            $(".tabuleiro").append($.parseHTML('<a href="'+(i+1)+'" id="p'+(i+1)+'" class="green"></a>'));
          }else if(i >= 12 && i <= 19){
            $(".tabuleiro").append($.parseHTML('<a href="'+(i+1)+'" id="p'+(i+1)+'" class="empty"></a>'));
          }else if(i >= 20){
            $(".tabuleiro").append($.parseHTML('<a href="'+(i+1)+'" id="p'+(i+1)+'" class="blue"></a>'));
          }
        }
      }
}



