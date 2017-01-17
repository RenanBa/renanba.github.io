var Board = {

  default: function(){
    var beginningBoard = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
    var startBoard = ["2", Board.randomValue()];
    var randomSpot1 = beginningBoard.indexOf(Random(beginningBoard));
    var randomSpot2 = beginningBoard.indexOf(Random(beginningBoard));
    if (randomSpot1 == randomSpot2){
      if (randomSpot1 == 15){
        randomSpot2--;
        console.log("Same spot was selected and a new spot add --.");
      } else {
        randomSpot2++;
        console.log("Same spot was selected and a new spot add ++.");
      }
    }
    beginningBoard[randomSpot1] = startBoard[0]
    beginningBoard[randomSpot2] = startBoard[1]

    for (var i = 0; i < beginningBoard.length; i++) {
      if (typeof(beginningBoard[i]) === "number") { beginningBoard[i] = "0" }
    }
    return beginningBoard;
  },

  calculation: function(boardRows){
    var rowsCalculated = [];

    for ( var index = 0; index < boardRows.length; index++ ){
      var resultRow = [];
      var valuesSpot = [];
      var zeroSpots = [];
      var sumRows = [];
      for ( var i = 0; i < boardRows[index].length; i++ ){
        var lengthRow = boardRows[index].length-1;
        if (i == lengthRow){
          if (boardRows[index][i] == "0"){
            zeroSpots.push("0");
          } else {
            valuesSpot.push(boardRows[index][i]);
          }
          break;
        }

        if (boardRows[index][i] == "0"){
          zeroSpots.push("0");
        }else if (boardRows[index][i] != "0"){
          valuesSpot.push(boardRows[index][i]);
        }
      }

      // Sum equal values that are side by side
      for (var i = 0; i < valuesSpot.length; i++ ){
        if (i == valuesSpot.length-1){
          sumRows.push(valuesSpot[i]);
          break;
        }

        if (parseInt(valuesSpot[i]) == parseInt(valuesSpot[1+i])){
          var result = parseInt(valuesSpot[i]) + parseInt(valuesSpot[1+i]);
          Score.newValue += result;
          // console.log(Score.final);
          sumRows.push(String(result));
          zeroSpots.push("0");
          i ++;
        } else if (parseInt(valuesSpot[i]) != parseInt(valuesSpot[1+i])) {
          sumRows.push(valuesSpot[i]);
        }
      } //end of the loop the sum valuesSpots

      // reorganize zeros and values into the new board
      for (var i = 0; i < zeroSpots.length; i++) { resultRow.push(zeroSpots[i]); }
      for (var i = 0; i < sumRows.length; i++){ resultRow.push(sumRows[i]); }

      rowsCalculated.push(resultRow);
    }
    return Board.flat(rowsCalculated);
  },

  split: function(board){
    // split array into 4 sub arrays to generate a dimensional board
    var splitedBoard = []
    var temparray,chunk = 4;
    for (var i=0; i<board.length; i+=chunk) {
        temparray = board.slice(i,i+chunk);
        splitedBoard.push(temparray);
    }
    return splitedBoard;
  },

  randomValue: function(){
    return Random(["2","2","2","2","4"]);
  },

  availableIndex: function(board){
    availableIndex = [];
    board.forEach(function(element, index) {
      if(element == "0"){ availableIndex.push(index)}
    });
    return availableIndex;
  },

  flat: function(nestedBoard){
    // remove the sub arrays to be one single array
    var flatBoard = [].concat.apply([], nestedBoard);
    return flatBoard;
  },

  matrix: function(board){
    return Object.keys(board[0]).map(
      function (count) { return board.map(function (row) { return row[count]; }); }
    );
  },

  reverse: function(board){
    var reversedBoard = [];
    var boardRows = Board.flat(board);
    boardRows = Board.split(board);
    boardRows.forEach(function(element){
      for (var i = element.length;  i != 0; i--) {
        reversedBoard.push(element.pop());
      }
    });
    return reversedBoard;
  },
}

var Random = function(array){
  return array[Math.floor(Math.random() * array.length)];
}

var ValidMove = function(currentBoard, lastBoard){
  if (currentBoard.toString() != lastBoard.toString()){
    return true;
  } else {
    return false;
  }
}

// var ToString = function(array){
//   // var array = Board.flat(array);
//   var string = "";
//   for(var i=0; i<array.length; i++){ return string += i;}
// }

var Score = {
  newValue: 0,

  final: function(){
    // console.log(Score.newValue);
    return Score.newValue;
  },

  reset: function(){
    Score.newValue = 0;
  },
}





