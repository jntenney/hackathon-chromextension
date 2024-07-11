document.addEventListener('DOMContentLoaded', () => {
  const body = document.querySelector('body');
  const boardElement = document.querySelector('#board');

  const head = new Head(boardElement);
  const apple = new Apple(boardElement);
  const gameBoard = new Board(boardElement, 10, head, apple);

  body.addEventListener('keydown', (e) => {
    if (e.code === 'ArrowLeft') {
      gameBoard.newDirection = 'left';
    }
    if (e.code === 'ArrowRight') {
      gameBoard.newDirection = 'right';
    }
    if (e.code === 'ArrowDown') {
      gameBoard.newDirection = 'down';
    }
    if (e.code === 'ArrowUp') {
      gameBoard.newDirection = 'up';
    }
  });
});
