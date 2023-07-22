import { setChoiceOnClickEvents, setNewGameClickEvents } from "./menu.js";
import { createBoard, setCellsOnClickEvents, setBoardPlayersReference } from "./gameboard.js";
import { setModalPlayersReference } from "./resultmodal.js";

$(document).ready(() => {
  /* General Interactions */

  const players = {
    p1 : "O",  
    p2 : "X",
    p2IsCPU : false
  }

  const $menu = $("#menu");
  const $game = $("#game");

  /* Menu Interactions */

  setChoiceOnClickEvents(players);
  setNewGameClickEvents(players, $menu, $game);

  /* Game Interactions */

  //Initialize Board
  createBoard();
  setCellsOnClickEvents();
  setBoardPlayersReference(players);

  setModalPlayersReference(players);
});
