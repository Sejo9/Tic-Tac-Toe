import ScoreBoard from "./ScoreBoard.js";


const $xHeader = $("#x-score-header");
const $oHeader = $("#o-score-header");
const $xScore = $("#x-score");
const $tiesScore = $("#ties-score");
const $oScore = $("#o-score");

const scoreBoard = new ScoreBoard();





const setupScoreHeaders = (p1, p2IsCPU) => {
  
  if (p2IsCPU) {
    if (p1 === "X") {
      $xHeader.html("X (YOU)");
      $oHeader.html("O (CPU)");
    } else {
      $xHeader.html("X (CPU)");
      $oHeader.html("O (YOU)");
    }
  } else {
    if (p1 === "X") {
      $xHeader.html("X (P1)");
      $oHeader.html("O (P2)");
    } else {
      $xHeader.html("X (P2)");
      $oHeader.html("O (P1)");
    }
  }

  
};

export { setupScoreHeaders };
