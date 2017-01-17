describe("Generate new game board", function(){
  beforeEach(function(){
    game = new Game();
    game1 = new Game();
    game2 = new Game(["0","0","0","0","0","0","2","0","2","0","0","0","0","0","0","0"]);
  });

  it ("Board was created", function(){
    expect(game).not.toBeNull();
  });

  it ("Board are generated randomly", function(){
    board = game1.board
    expect(game.board).not.toEqual(board);
  });

  it ("Game can accept preset boards to initialize", function(){
    expect(game2.board).not.toEqual(toString(["0","0","0","0","0","0","2","0","2","0","0","0","0","0","0","0"]));
  });
});

describe("Calculates board when swipe RIGHT", function(){
  beforeEach(function(){
    game = new Game(swipeRigth.initialBoard);
    game.right();
    game1 = new Game(swipeRigth.sumBoard);
    game1.right();
  })
  it ("Swipe right should match result", function(){
    expect(game.board).toEqual(swipeRigth.resultBoard);
  });

  it ("Given a wrong result board, swipe right should not match the result", function(){
    expect(game.board).not.toEqual(swipeRigth.initialBoard);
  });

  it ("Calculates given board and expect to match the result", function(){
    expect(game1.board).toEqual(swipeRigth.resultSumBoard);
  });
});

describe("Calculates board when swipe DOWN", function(){
  beforeEach(function(){
    game = new Game(swipeDown.initialBoard);
    game.down();
    game1 = new Game(swipeDown.sumBoard);
    game1.down();
  })
  it ("Swipe down should match result", function(){
    expect(game.board).toEqual(swipeDown.resultBoard);
  });

  it ("Given a wrong result board, swipe down should not match the result", function(){
    expect(game.board).not.toEqual(swipeDown.initialBoard);
  });

  it ("Calculates given board and expect to match the result", function(){
    expect(game1.board).toEqual(swipeDown.resultSumBoard);
  });

});

describe("Calculates board when swipe LEFT", function(){
  beforeEach(function(){
    game = new Game(swipeLeft.initialBoard);
    game.left();
    game1 = new Game(swipeLeft.sumBoard);
    game1.left();
  })
  it ("Swipe left should match result", function(){
    expect(game.board).toEqual(swipeLeft.resultBoard);
  });

  it ("Given a wrong result board, swipe left should not match the result", function(){
    expect(game.board).not.toEqual(swipeLeft.initialBoard);
  });

  it ("Calculates given board and expect to match the result", function(){
    expect(game1.board).toEqual(swipeLeft.resultSumBoard);
  });
});

describe("Calculates board when swipe UP", function(){
  beforeEach(function(){
    game = new Game(swipeUp.initialBoard);
    game.up();
    game1 = new Game(swipeUp.sumBoard);
    game1.up();
  })
  it ("Swipe up should match result", function(){
    expect(game.board).toEqual(swipeUp.resultBoard);
  });

  it ("Given a wrong result board, swipe up should not match the result", function(){
    expect(game.board).not.toEqual(swipeUp.initialBoard);
  });

  it ("Calculates given board and expect to match the result", function(){
    expect(game1.board).toEqual(swipeUp.resultSumBoard);
  });
});


describe("Given a set of board that each one has no move to one side ", function(){
  beforeEach(function(){
    gameRight = new Game(lock.right);
    gameDown = new Game(lock.down);
    gameLeft = new Game(lock.left);
    gameUp = new Game(lock.up);
  })
  it ("Swipe right should not change board", function(){
    expect(gameRight.right()).toBeTruthy();
  });
  it ("Swipe down should not change board", function(){
    expect(gameDown.down()).toBeTruthy();
  });
  it ("Swipe left should not change board", function(){
    expect(gameLeft.left()).toBeTruthy();
  });
  it ("Swipe up should not change board", function(){
    expect(gameUp.up()).toBeTruthy();
  });
});
