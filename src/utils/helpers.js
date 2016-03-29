export const checkWin = (board, boardSize) => {
  var count = 0;

  for (var i = 1; i <= boardSize; ++i) {
    let xX = 1;
    let yX = 1;
    let majorDiagonalX = 1;
    let minorDiagonalX = 1;
    let xO = 1;
    let yO = 1;
    let majorDiagonalO = 1;
    let minorDiagonalO = 1;

    for (var j = 1; j <= boardSize; ++j) {
      let rowPosition = (i - 1) * boardSize + j;
      let columnPosition = (j - 1) * boardSize + i;
      let majorDiagonalPosition = (j - 1) * boardSize + j;
      let minorDiagonalPosition = boardSize * j - j + 1;

      xX &= (board[rowPosition - 1] === 'X');
      yX &= (board[columnPosition - 1] === 'X');
      majorDiagonalX &= (board[majorDiagonalPosition - 1] === 'X');
      minorDiagonalX &= (board[minorDiagonalPosition - 1] === 'X');
      xO &= (board[rowPosition - 1] === 'O');
      yO &= (board[columnPosition - 1] === 'O');
      majorDiagonalO &= (board[majorDiagonalPosition - 1] === 'O');
      minorDiagonalO &= (board[minorDiagonalPosition - 1] === 'O');
    }

    if (xX || yX || majorDiagonalX || minorDiagonalX) return 'X';
    if (xO || yO || majorDiagonalO || minorDiagonalO) return 'O';
  }

  for (var k = 0; k < board.length; ++k) {
    if (board[k]) count++;
    if (count === board.length) return 'TIE';
  }
};

export const buildBoard = (boardSize) => {
  const boardObj = {};

  for (let i = 1; i <= boardSize * boardSize; ++i) {
    boardObj[i] = undefined;
  }

  return boardObj;
};
