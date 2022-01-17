/****************************************************************************
  FileName      [ reveal.js ]
  PackageName   [ src/util ]
  Author        [ Cheng-Hua Lu, Chin-Yi Cheng ]
  Synopsis      [ This file states the reaction when left clicking a cell. ]
  Copyright     [ 2021 10 ]
****************************************************************************/

export const revealed = (board, x, y, newNonMinesCount) => {
  {
    /* -- TODO 4-2 -- */
  }
  {
    /* Useful Hint: If the cell is already revealed, do nothing. */
  }
  {
    /* Useful Hint: If the value of the cell is not 0, only show the cell value. */
  }

  {
    /* -- TODO 4-2 -- */
  }
  {
    /* Useful Hint: If the value of the cell is 0, we should try to find the value of adjacent cells until the value we found is not 0. */
  }
  {
    /* Useful Hint: The input variables 'newNonMinesCount' and 'board' may be changed in this function. */
  }
  let newboard = [];
  for (let i = 0; i < board.length; i++) {
    let subcol = [];
    for (let j = 0; j < board[i].length; j++) {
      if (i === x && j === y) {
        subcol.push({
          value: board[i][j].value, // To store the number of mines around the cell.
          revealed: true, // To store if the cell is revealed.
          x: board[i][j].x, // To store the x coordinate (the column index) of the cell.
          y: board[i][j].y, // To store the y coordinate (the row index) of the cell.
          flagged: board[i][j].flagged, // To store if the cell is flagged.
        });
      } else {
        subcol.push(board[i][j]);
      }
    }
    newboard.push(subcol);
  }
  return { newboard, newNonMinesCount };
};
