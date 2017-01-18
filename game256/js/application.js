$(document).ready(function() {
  console.log("Pronto!");

  $("#arrowUp").on("click", function(){
    Up();
  });
  $("#arrowLeft").on("click", function(){
    Left();
  });
  $("#arrowRight").on("click", function(){
    Right();
  });
  $("#arrowDown").on("click", function(){
    Down();
  });

  $(".idiom").on("click", function(){
    Swich.languages();
  });


  $("#newGame").on("click", function(){
    game = new Game();
    ResetScore();
    Display(game.board);
  });
});


// Detect the direction when mouse is dragged
// document.onmousedown = function(mousedown) {
//   mousedown = mousedown || window.event
//   console.log(mousedown.screenX);
//   this.onmouseup = function(mouseup) {
//     mouseup = mouseup || window.event
//     console.log(mouseup.screenX);
//     if(mousedown.screenX < mouseup.screenX){
//       Right();
//     }
//     document.onmousemove = null
//   }
// }



var Display = function(board){
  $.each(board, function(index, value){
      $("#s"+(1+index)).empty();
      if(value != "0"){
        $("#s"+(1+index)).append("<h1 class='numbers"+value+" boxSize'>"+value+"</h1>");
      }
    })
}

var ShowScore = function(){
  $("td").empty();
  $("td").append("<h3>"+game.score+"</h3>");
}

var ResetScore = function(){
  Score.reset();
  $("td").empty();
  $("td").append("<h3 class='scoreValue'>0</h3>");
  $("h2").empty();
  $("th").empty();
  if(Swich.english){
    $("h2").append("Welcome to 256!");
    $("th").append("<h3 class='score'>Score:</h3>");
  } else {
    $("h2").append("Bem vindo ao jogo 256!");
    $("th").append("<h3 class='score'>Pontos:</h3>");
  }
}

var GameOver = function(){
  $("h2").empty();
  $("h2").append("GAME OVER :( ");
}

var Winner = function(){
  $("h2").empty();

    if(Swich.english){
   $("h2").append("CONGRATULATIONS YOU WON!!! :)");
  }else {
    $("h2").append("Parabéns você ganhou!!! :)");
  }


}

var Swich = {
  english: true,
  languages: function(){
    if(Swich.english){
      $("h2").empty();
      $("h2").append("Bem vindo ao jogo 256!");
      $("th").empty();
      $("th").append("<h3 class='score'>Pontos:</h3>");
      $(".intro").empty();
      $(".intro").append("Uma pequena versão do <a href='http://2048game.com/'>2048</a>");
      $(".directions").empty();
      $(".directions").append("Use W, D, S e S ou use as setas para cima, para direita, para baixo e para esquerda");
      $("#newGame").empty();
      $("#newGame").append("Novo Jogo");
      $(".idiom").empty();
      $(".idiom").append("Switch to English Version");
      $(".comoJogarNone").removeClass("comoJogarNone").addClass("comoJogarDisplayed");
      Swich.english = false;
    } else {
      $("h2").empty();
      $("h2").append("Welcome to 256!");
      $("th").empty();
      $("th").append("<h3 class='score'>Score:</h3>");
      $(".intro").empty();
      $(".intro").append("A small clone of <a href='http://2048game.com/'>2048</a>");
      $(".directions").empty();
      $(".directions").append("Use W, D, S and S or the arrows Up, Right, Down and Left");
      $("#newGame").empty();
      $("#newGame").append("New Game");
      $(".idiom").empty();
      $(".idiom").append("Trocar Versão para Português");
      $(".comoJogarDisplayed").removeClass("comoJogarDisplayed").addClass("comoJogarNone");
      Swich.english = true;
    }
  },
}






var Up = function(){
  if (game.didWin()){
    Winner();
  } else if (game.up()){
    game.addNewValue();
    Display(game.board);
    ShowScore();
    if (game.didLose()){
      GameOver();
    } else if (game.didWin()){ Winner();}
  }

}

var Right = function(){
  if (game.didWin()){
      Winner();
  } else if (game.right()){
    game.addNewValue();
    Display(game.board)
    ShowScore();
    if (game.didLose()){
      GameOver();
    } else if (game.didWin()){ Winner();}
  }
}

var Down = function(){
  if (game.didWin()){
      Winner();
  } else if(game.down()){
    game.addNewValue();
    Display(game.board)
    ShowScore();
    if (game.didLose()){
      GameOver();
    } else if (game.didWin()){ Winner();}
  }
}

var Left = function(){
  if (game.didWin()){
      Winner();
  } else if (game.left()){
    game.addNewValue();
    Display(game.board);
    ShowScore();
    if (game.didLose()){
      GameOver();
    } else if (game.didWin()){ Winner();}
  }
}


// event listener for letters
function keyDown(e) {
  switch(e.keyCode){
    case 38: // up arrow pressed
    case 119:
      console.log("W pressed")
      Up();
      break;
    case 39: // right arrow pressed
    case 100:
      console.log("D pressed")
      Right();
      break;
    case 40: // down arrow pressed
    case 115:
      console.log("S pressed")
      Down();
      break;
    case 37:// left arrow
    case 97:
      console.log("A pressed")
      Left();
      break;
    default:
      console.log("Please use the 'A', 'W','D' and 'S' or arrow up, right, down ans left on the keyboard")
  }
}

function init(){
  window.addEventListener("keypress", keyDown, false);
}
window.addEventListener('load', init, false); // event listener for letters
window.addEventListener("keydown", keyDown, false); // event listener for arrows

