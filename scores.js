import ScoreBoard from "./ScoreBoard.js";


const $xHeader = $("#x-score-header");
const $oHeader = $("#o-score-header");

const $xScore = $("#x-score");
const $tiesScore = $("#ties-score");
const $oScore = $("#o-score");

const scoreBoard = new ScoreBoard();

let playersDetails;

const setupScoreHeaders = (players) => {
    playersDetails = players;

  if (players.p2IsCPU) {
    if (players.p1 === "X") {
      $xHeader.html("X (YOU)");
      $oHeader.html("O (CPU)");
    } else {
      $xHeader.html("X (CPU)");
      $oHeader.html("O (YOU)");
    }
  } else {
    if (players.p1 === "X") {
      $xHeader.html("X (P1)");
      $oHeader.html("O (P2)");
    } else {
      $xHeader.html("X (P2)");
      $oHeader.html("O (P1)");
    }
  }
};

const updateScoreBoard = (turn, isTie = false) => {
    if(isTie){
        scoreBoard.increaseTiesScore();
        $tiesScore.html(scoreBoard._ties);
    }else{
        if(turn === 'X'){
            scoreBoard.increaseXScore();
            $xScore.html(scoreBoard._X);
        }else{
            scoreBoard.increaseOScore();
            $oScore.html(scoreBoard._O);
        }
    }
}

const resetScores = () => {
  scoreBoard.resetBoard();
  $xScore.html(0);
  $tiesScore.html(0);
  $oScore.html(0);
}

export { 
  setupScoreHeaders, 
  updateScoreBoard, 
  scoreBoard,
  resetScores
 };
