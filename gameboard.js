

let turn = "X";
let turnsPlayed = 0;
let roundOver = false;



const board = [[], [], []];

const $gameBoard = $("#board");
const $turnIndicator = $("#turn-indicator");

const createCell = (index) => {
  return `<div id="cell-${index}" class="navy-btn board-cell"></div>`;
};

//Create Board Function
const createBoard = () => {
  for (let i = 0; i < 9; i++) {
    $gameBoard.append(createCell(i));
  }
};

//Change Turn Indicator
const changeTurnIndicator = () => {
  if (turn !== "X") {
    turn = "X";
    $turnIndicator.html(
      '<img height="20px" src="./assets/icon-x-silver.svg" alt="X" />&nbsp;&nbsp;&nbsp;TURN'
    );
  } else {
    turn = "O";
    $turnIndicator.html(
      '<img height="20px" src="./assets/icon-o-silver.svg" alt="O" />&nbsp;&nbsp;&nbsp;TURN'
    );
  }
};

//Fill cell
const fillCell = (cell) => {
  if (turn === "X") {
    cell.html(`<img height="32px" src="./assets/icon-x.svg" alt="X" />`);
  } else {
    cell.html(`<img height="32px" src="./assets/icon-o.svg" alt="O" />`);
  }

  const index = Number(cell.attr("id").substring(5));

  switch (index) {
    case 0:
      board[0][0] = turn;
      break;
    case 1:
      board[0][1] = turn;
      break;
    case 2:
      board[0][2] = turn;
      break;
    case 3:
      board[1][0] = turn;
      break;
    case 4:
      board[1][1] = turn;
      break;
    case 5:
      board[1][2] = turn;
      break;
    case 6:
      board[2][0] = turn;
      break;
    case 7:
      board[2][1] = turn;
      break;
    case 8:
      board[2][2] = turn;
      break;
  }

  turnsPlayed++;
};

const checkForWinner = () => {
  //Horizontal Lines
  const scenario1 = board[0][0] + board[0][1] + board[0][2];
  const scenario2 = board[1][0] + board[1][1] + board[1][2];
  const scenario3 = board[2][0] + board[2][1] + board[2][2];
  //Vertical Lines
  const scenario4 = board[0][0] + board[1][0] + board[2][0];
  const scenario5 = board[0][1] + board[1][1] + board[2][1];
  const scenario6 = board[0][2] + board[1][2] + board[2][2];
  //Diagonal Lines
  const scenario7 = board[0][0] + board[1][1] + board[2][2];
  const scenario8 = board[0][2] + board[1][1] + board[2][0];

  switch (true) {
    case scenario1 === "XXX" || scenario1 === "OOO":
      roundOver = true;
      break;
    case scenario2 === "XXX" || scenario2 === "OOO":
      roundOver = true;
      break;
    case scenario3 === "XXX" || scenario3 === "OOO":
      roundOver = true;
      break;
    case scenario4 === "XXX" || scenario4 === "OOO":
      roundOver = true;
      break;
    case scenario5 === "XXX" || scenario5 === "OOO":
      roundOver = true;
      break;
    case scenario6 === "XXX" || scenario6 === "OOO":
      roundOver = true;
      break;
    case scenario7 === "XXX" || scenario7 === "OOO":
      roundOver = true;
      break;
    case scenario8 === "XXX" || scenario8 === "OOO":
      roundOver = true;
      break;
  }

  if(turnsPlayed === 9 && roundOver === false){
    //Show result modal => $modal.show()
  }
};

const setCellsOnClickEvents = () => {
  const $boardCell = $(".board-cell");
  for (const cell of $boardCell) {
    $(cell).on("click", (event) => {
      if ($(cell)[0].childElementCount == 0) {
        fillCell($(cell));
        checkForWinner();
        changeTurnIndicator();
      } else {
        alert("Cell already occupied");
      }
    });
  }
};

export {
  createBoard,
  setCellsOnClickEvents
}