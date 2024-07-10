class Board {
  constructor(boardElement, gridSize, head, apple) {
    this.boardElement = boardElement;
    this.gamePieceSize = 50;
    this.gridSize = gridSize;
    this.height = this.getMaxBoardHeightInPixels();
    this.width = this.getMaxBoardWidthInPixels();

    this.head = head;
    this.apple = apple;
    this.bodySegmentsToAdd = 1;

    this.boardElement.style.height = `${this.height}px`;
    this.boardElement.style.width = `${this.width}px`;

    this.resetGame();

    // Refactor the below line to create a bound version of `this.Move`.
    // We must do this in order to retain the context of `this` in an asynchronous setTimeout call
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_objects/Function/bind

    this.boundGameLoop = this.handleGameLoop.bind(this);
    setTimeout(this.boundGameLoop, this.SPEED);
  }

  //GAME LOOP
  //  Calculate new head position
  //  Detect if going out of bounds
  //    if so, end the game
  //  Detect if hitting apple
  //    if so, make new apple appear at new location
  //    if so, grow snake body
  handleGameLoop() {
    let { headLeftPosition, headTopPosition } = this.head.getPosition();
    let { appleLeftPosition, appleTopPosition } = this.apple.getPosition();

    // handle snake hitting the apple
    if (
      appleLeftPosition === headLeftPosition &&
      appleTopPosition === headTopPosition
    ) {
      this.head.addToBody(this.bodySegmentsToAdd);
      let { leftPosition, topPosition } = this.getRandomApplePosition();
      this.apple.setPosition(leftPosition, topPosition);
    }

    let { leftPosition, topPosition } = this.calculateNewHeadPosition();
    // handle snake going out of bounds
    if (
      leftPosition < 0 ||
      leftPosition >= this.getMaxBoardWidthInPixels() ||
      topPosition < 0 ||
      topPosition >= this.getMaxBoardHeightInPixels()
    ) {
      alert('Game over. Play again?');
      this.resetGame();
    } else {
      // handle snake staying in the bounds
      this.head.setPosition(leftPosition, topPosition);
    }

    setTimeout(this.boundGameLoop, this.SPEED);
  }

  // initialize a new game
  resetGame() {
    // get and set the apple initial position on the screen
    let { leftPosition, topPosition } = this.getRandomApplePosition();
    this.apple.setPosition(leftPosition, topPosition);

    // get and set the snake head initial position on the screen
    let { left, top, direction } = this.getHeadInitialPosition();
    this.head.setPosition(left, top);
    this.head.resetBody();

    // important that new and current direction stay in sync
    this.currentDirection = direction;
    this.newDirection = direction;
    this.SPEED = 300;
  }

  getMaxBoardHeightInPixels() {
    return this.gamePieceSize * this.gridSize;
  }

  getMaxBoardWidthInPixels() {
    return this.gamePieceSize * this.gridSize;
  }

  // translatePixelsToBoardGrid(left, top) {
  //   let gridIIndex = 0;
  //   let gridJIndex = 0;

  //   gridJIndex = left === 0 ? 0 : left / this.gamePieceSize;
  //   gridIIndex = top === 0 ? 0 : top / this.gamePieceSize;

  //   return { gridIIndex: gridIIndex, gridJIndex: gridJIndex };
  // }

  translateBoardGridToPixels(i, j) {
    let topPosition = 0;
    let leftPosition = 0;

    topPosition = j * this.gamePieceSize;
    leftPosition = i * this.gamePieceSize;

    return { leftPosition: leftPosition, topPosition: topPosition };
  }

  // calculate new position of the snake head based on new direction
  // received from the user
  calculateNewHeadPosition() {
    const head = this.head.node;

    // handle logic where snake head can't move backwards on itself
    if (this.newDirection === 'left' && this.currentDirection === 'right') {
      this.newDirection = 'right';
    }

    if (this.newDirection === 'right' && this.currentDirection === 'left') {
      this.newDirection = 'left';
    }

    if (this.newDirection === 'up' && this.currentDirection === 'down') {
      this.newDirection = 'down';
    }

    if (this.newDirection === 'down' && this.currentDirection === 'up') {
      this.newDirection = 'up';
    }
    this.currentDirection = this.newDirection;
    const direction = this.newDirection;

    //get current position, then calculate a new position based on direction
    let topPosition = Number(head.style.top.replace('px', ''));
    let leftPosition = Number(head.style.left.replace('px', ''));

    if (direction === 'right') {
      leftPosition += this.gamePieceSize;
    }
    if (direction === 'left') {
      leftPosition -= this.gamePieceSize;
    }
    if (direction === 'up') {
      topPosition -= this.gamePieceSize;
    }
    if (direction === 'down') {
      topPosition += this.gamePieceSize;
    }

    return { leftPosition: leftPosition, topPosition: topPosition };
  }

  // make apple appear at random location on the board
  getRandomApplePosition() {
    const appleTop =
      Math.floor(Math.random() * this.gridSize) * this.gamePieceSize;
    const appleLeft =
      Math.floor(Math.random() * this.gridSize) * this.gamePieceSize;

    return { leftPosition: appleLeft, topPosition: appleTop };
  }

  // make snake head appear in random corner of the board
  getHeadInitialPosition() {
    const corners = [
      { left: 0, top: 0, direction: 'right' },
      {
        left: 0,
        top: (this.gridSize - 1) * this.gamePieceSize,
        direction: 'up',
      },
      {
        left: (this.gridSize - 1) * this.gamePieceSize,
        top: 0,
        direction: 'down',
      },
      {
        left: (this.gridSize - 1) * this.gamePieceSize,
        top: (this.gridSize - 1) * this.gamePieceSize,
        direction: 'left',
      },
    ];

    const randomCorner = Math.round(Math.random() * (corners.length - 1));

    return corners[randomCorner];
  }
}
