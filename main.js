import ScoreBoard from "./ScoreBoard.js";

$(document).ready(() => {
  /* General Interactions */
  let p1 = "O";

  let p2 = "X";

  let turn = "X";

  const SCOREBOARD = new ScoreBoard();

  let p2IsCPU = false;

  const $menu = $("#menu");
  const $game = $("#game");

  /* Menu Interactions */

  //choice x button
  const $choiceX = $("#choice-x");
  const $choiceXImage = $('#choice-x img');
  
  //choice o button
  const $choiceO = $("#choice-o");
  const $choiceOImage = $('#choice-o img');

  //new game vs cpu button
  const $newGameCPU = $("#new-game-cpu");

  //new game vs player button
  const $newGamePlayer = $("#new-game-player");

  //Change to selected choice
  $choiceX.on('click', () => {
    if(p1 !== 'X'){
        p1 = 'X';
        p2 = 'O';

        $choiceXImage.attr('src', './assets/icon-x-navy.svg');
        $choiceX.toggleClass('choice-btn-inactive');
        $choiceX.toggleClass('choice-btn-selected');

        $choiceOImage.attr('src', './assets/icon-o-silver.svg');
        $choiceO.toggleClass('choice-btn-inactive');
        $choiceO.toggleClass('choice-btn-selected');
    }
  })

  $choiceO.on('click', () => {
    if(p1 !== 'O'){
        p1 = 'O';
        p2 = 'X';

        $choiceXImage.attr('src', './assets/icon-x-silver.svg');
        $choiceX.toggleClass('choice-btn-inactive');
        $choiceX.toggleClass('choice-btn-selected');

        $choiceOImage.attr('src', './assets/icon-o-navy.svg');
        $choiceO.toggleClass('choice-btn-inactive');
        $choiceO.toggleClass('choice-btn-selected');
    }
  })

  //Function to start new game with CPU
  $newGameCPU.on('click', () => {
    p2IsCPU = true;
    $menu.hide();
    $game.show();
  })

  //Function to start new game with player
  $newGamePlayer.on('click', () => {
    $menu.hide();
    $game.show();
  })
  
  /* Game Interactions */
});
