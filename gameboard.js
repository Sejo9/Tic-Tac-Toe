import { scoreBoard, updateScoreBoard } from "./scores.js";
import { showNextModal, showRestartModal } from "./resultmodal.js";
import { cpuPlay, cpuState } from "./cpu.js";

let turn = "X";
let turnsPlayed = 0;
let roundOver = false;

let board = [[], [], []];

let playerDetails;

const $gameBoard = $("#board");
const $turnIndicator = $("#turn-indicator");
const $restartBtn = $("#restart-btn");

const createCell = (index) => {
  return `<div id="cell-${index}" class="navy-btn board-cell"></div>`;
};

//Create Board Function
const createBoard = () => {
  for (let i = 0; i < 9; i++) {
    $gameBoard.append(createCell(i));
  }
};

const resetGameBoard = () => {
  roundOver = false;
  turnsPlayed = 0;
  $gameBoard.empty();
  board = [[], [], []];
  if (turn !== "X") {
    changeTurnIndicator();
  }
  createBoard();
  setCellsOnClickEvents();
  if(cpuState.isCPUActive){
    checkCPUPlay();
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
      updateScoreBoard(turn);
      showNextModal(turn);
      break;
    case scenario2 === "XXX" || scenario2 === "OOO":
      roundOver = true;
      updateScoreBoard(turn);
      showNextModal(turn);
      break;
    case scenario3 === "XXX" || scenario3 === "OOO":
      roundOver = true;
      updateScoreBoard(turn);
      showNextModal(turn);
      break;
    case scenario4 === "XXX" || scenario4 === "OOO":
      roundOver = true;
      updateScoreBoard(turn);
      showNextModal(turn);
      break;
    case scenario5 === "XXX" || scenario5 === "OOO":
      roundOver = true;
      updateScoreBoard(turn);
      showNextModal(turn);
      break;
    case scenario6 === "XXX" || scenario6 === "OOO":
      roundOver = true;
      updateScoreBoard(turn);
      showNextModal(turn);
      break;
    case scenario7 === "XXX" || scenario7 === "OOO":
      roundOver = true;
      updateScoreBoard(turn);
      showNextModal(turn);
      break;
    case scenario8 === "XXX" || scenario8 === "OOO":
      roundOver = true;
      updateScoreBoard(turn);
      showNextModal(turn);
      break;
  }

  if (turnsPlayed === 9 && roundOver === false) {
    updateScoreBoard(turn, true);
    showNextModal(turn, true);
    roundOver = true;
  }
};

const checkCPUChoice = (value, choice) => {
  if(!value){
    let $cpuCell = $(`#cell-${choice}`);
    fillCell($cpuCell);
    checkForWinner();
  }else{
    console.log(`Cell Already Taken: ${choice}!`);
    return true;
  }
}

const checkCPUPlay = () => {
  if (playerDetails.p2IsCPU && playerDetails.p2 === turn && roundOver === false) {
    console.log("CPU PLAYS HERE!");
    let control = true;
    
    //loop through cpu plays until it corresponse to an empty cell and then fill cell
    while(control){
      let choice = cpuPlay();

      switch (choice) {
        case 0:
          control = checkCPUChoice(board[0][0], choice);
          break;
        case 1:
          control = checkCPUChoice(board[0][1], choice);
          break;
        case 2:
          control = checkCPUChoice(board[0][2], choice);
          break;
        case 3:
          control = checkCPUChoice(board[1][0], choice);
          break;
        case 4:
          control = checkCPUChoice(board[1][1], choice);
          break;
        case 5:
          control = checkCPUChoice(board[1][2], choice);
          break;
        case 6:
          control = checkCPUChoice(board[2][0], choice);
          break;
        case 7:
          control = checkCPUChoice(board[2][1], choice);
          break;
        case 8:
          control = checkCPUChoice(board[2][2], choice);
          break;
      }

    }

    changeTurnIndicator();
  }
};

const setCellsOnClickEvents = () => {
  const $boardCell = $(".board-cell");
  for (const cell of $boardCell) {
    $(cell).on("click", () => {
      if ($(cell)[0].childElementCount == 0) {
        fillCell($(cell));
        checkForWinner();
        changeTurnIndicator();
        if(cpuState.isCPUActive){
          checkCPUPlay();
        }
      } else {
        alert("Cell already occupied");
      }
    });
  }

};

const setBoardPlayersReference = (players) => {
  playerDetails = players;
};

$restartBtn.on("click", showRestartModal);

export {
  createBoard,
  setCellsOnClickEvents,
  resetGameBoard,
  setBoardPlayersReference,
  checkCPUPlay
};
