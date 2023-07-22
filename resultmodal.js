import { resetGameBoard } from "./gameboard.js";
import { resetScores } from "./scores.js";
import { stopCPU } from "./cpu.js";

const $menu = $("#menu");
const $game = $("#game");

const $modal = $("#modal");

const $nextContent = $("#next-content");
const $message = $("#message");
const $declaration = $("#declaration");
const $nextBtn = $("#next-btn");
const $quitBtn = $("#quit-btn");

const $restartContent = $("#restart-content");
const $cancelBtn = $("#cancel-btn");
const $yesBtn = $("#yes-btn");

let playerDetails;

const setModalPlayersReference = (players) => {
  playerDetails = players;
};

const showRestartModal = () => {
  $modal.css("display", "flex");
  $restartContent.css("display", "flex");
};

const hideRestartModal = () => {
  $modal.hide();
  $restartContent.hide();
};

const determinWinner = (turn) => {
    if(playerDetails.p2IsCPU){
        if(playerDetails.p1 === turn){
            $message.html('YOU WON!');
        }else{
            $message.html('OH NO, YOU LOST...');
        }
      }else{
        if(playerDetails.p1 === turn){
            $message.html('PLAYER 1 WINS!');
        }else{
            $message.html('PLAYER 2 WINS!');
        }
      }
}

const showNextModal = (turn, isTie = false) => {
  if (isTie) {
    $message.hide();
    $declaration.html("ROUND TIED");
  } else {
    $message.show();

    if (turn === "X") {
      $declaration.html(
        '<img height="32px" src="./assets/icon-x.svg" alt="X" /> TAKES THE ROUND'
      );

      determinWinner(turn);
      
    } else {
      $declaration.html(
        '<img height="32px" src="./assets/icon-o.svg" alt="O" /> TAKES THE ROUND'
      );

      determinWinner(turn);
    }
  }

  $modal.css("display", "flex");
  $nextContent.css("display", "flex");
};

const hideNextModal = () => {
  $modal.hide();
  $nextContent.hide();
};

$nextBtn.on("click", () => {
  resetGameBoard();
  hideNextModal();
});

$quitBtn.on("click", () => {
  stopCPU();
  resetGameBoard();
  resetScores();
  hideNextModal();
  playerDetails.p2IsCPU = false;
  $game.hide();
  $menu.show();
});

$cancelBtn.on("click", hideRestartModal);
$yesBtn.on("click", () => {
  resetGameBoard();
  resetScores();
  hideRestartModal();
});

export {
  showNextModal,
  showRestartModal,
  hideRestartModal,
  hideNextModal,
  setModalPlayersReference,
};
