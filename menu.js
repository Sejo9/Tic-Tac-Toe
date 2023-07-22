import { setupScoreHeaders } from "./scores.js";
import { startCPU } from "./cpu.js";

//choice x button
const $choiceX = $("#choice-x");
const $choiceXImage = $("#choice-x img");

//choice o button
const $choiceO = $("#choice-o");
const $choiceOImage = $("#choice-o img");

//new game vs cpu button
const $newGameCPU = $("#new-game-cpu");

//new game vs player button
const $newGamePlayer = $("#new-game-player");

export const setChoiceOnClickEvents = (players) => {
  $choiceX.on("click", () => {
    if (players.p1 !== "X") {
      players.p1 = "X";
      players.p2 = "O";

      $choiceXImage.attr("src", "./assets/icon-x-navy.svg");
      $choiceX.toggleClass("choice-btn-inactive");
      $choiceX.toggleClass("choice-btn-selected");

      $choiceOImage.attr("src", "./assets/icon-o-silver.svg");
      $choiceO.toggleClass("choice-btn-inactive");
      $choiceO.toggleClass("choice-btn-selected");
    }
  });

  $choiceO.on("click", () => {
    if (players.p1 !== "O") {
      players.p1 = "O";
      players.p2 = "X";

      $choiceXImage.attr("src", "./assets/icon-x-silver.svg");
      $choiceX.toggleClass("choice-btn-inactive");
      $choiceX.toggleClass("choice-btn-selected");

      $choiceOImage.attr("src", "./assets/icon-o-navy.svg");
      $choiceO.toggleClass("choice-btn-inactive");
      $choiceO.toggleClass("choice-btn-selected");
    }
  });
};

export const setNewGameClickEvents = (players, $menu, $game) => {
  //Function to start new game with CPU
  $newGameCPU.on("click", () => {
    players.p2IsCPU = true;
    $menu.hide();
    setupScoreHeaders(players);
    $game.show();
    startCPU(players)
  });

  //Function to start new game with player
  $newGamePlayer.on("click", () => {
    $menu.hide();
    setupScoreHeaders(players);
    $game.show();
  });
};
