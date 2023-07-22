import { setChoiceOnClickEvents, setNewGameClickEvents } from "./menu.js";
import { createBoard, setCellsOnClickEvents } from "./gameboard.js";

$(document).ready(() => {
  /* General Interactions */
  let p1 = "O";

  let p2 = "X";

  let p2IsCPU = false;

  let gameStarted = false;

  const $menu = $("#menu");
  const $game = $("#game");

  /* Menu Interactions */

  setChoiceOnClickEvents(p1, p2);
  setNewGameClickEvents(p1, p2IsCPU, $menu, $game);

  /* Game Interactions */

  //Initialize Board
  createBoard();
  setCellsOnClickEvents();

  
});
