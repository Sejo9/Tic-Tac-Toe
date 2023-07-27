import ScoreBoard from "./ScoreBoard.js";

$(document).ready(() => {
  const players = {
    p1: "O",
    p2: "X",
    p2IsCPU: false,
  };

  const scoreBoard = new ScoreBoard();

  const $menu = $("#menu");
  const $game = $("#game");
  const $gameBlock = $("#block");

  //MENU VARIABLES
  const $choiceX = $("#choice-x");
  const $choiceXImage = $("#choice-x img");
  const $choiceO = $("#choice-o");
  const $choiceOImage = $("#choice-o img");
  const $newGameCPU = $("#new-game-cpu");
  const $newGamePlayer = $("#new-game-player");
  let difficulty = "";

  //GAMEBOARD VARIABLES
  let turn = "X";
  let turnsPlayed = 0;
  let roundOver = false;
  let board = [[], [], []];
  const $gameBoard = $("#board");
  const $turnIndicator = $("#turn-indicator");
  const $restartBtn = $("#restart-btn");

  //SCORE VARIABLES
  const $xHeader = $("#x-score-header");
  const $oHeader = $("#o-score-header");
  const $xScore = $("#x-score");
  const $tiesScore = $("#ties-score");
  const $oScore = $("#o-score");

  //MODAL VARIABLES
  const $modal = $("#modal");
  const $nextContent = $("#next-content");
  const $message = $("#message");
  const $declaration = $("#declaration");
  const $nextBtn = $("#next-btn");
  const $quitBtn = $("#quit-btn");
  const $restartContent = $("#restart-content");
  const $cancelBtn = $("#cancel-btn");
  const $yesBtn = $("#yes-btn");

  //CPU VARIABLES
  let isCPUActive = false;

  /* MENU START */

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

  $newGameCPU.on("click", () => {
    players.p2IsCPU = true;
    $menu.hide();
    setupScoreHeaders(players);
    $game.show();
    startCPU(players);
  });

  $newGamePlayer.on("click", () => {
    $menu.hide();
    setupScoreHeaders(players);
    $game.show();
  });

  /* MENU END */

  /* SCORES START */

  const setupScoreHeaders = () => {
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
    if (isTie) {
      scoreBoard.increaseTiesScore();
      $tiesScore.html(scoreBoard._ties);
    } else {
      if (turn === "X") {
        scoreBoard.increaseXScore();
        $xScore.html(scoreBoard._X);
      } else {
        scoreBoard.increaseOScore();
        $oScore.html(scoreBoard._O);
      }
    }
  };

  const resetScores = () => {
    scoreBoard.resetBoard();
    $xScore.html(0);
    $tiesScore.html(0);
    $oScore.html(0);
  };

  /* SCORES END */

  /* CPU START */

  const startCPU = () => {
    isCPUActive = true;
    cpuPlay();
  };

  const stopCPU = () => {
    isCPUActive = false;
  };

  /* CPU END */

  /* MODAL START */

  const showRestartModal = () => {
    $modal.css("display", "flex");
    $restartContent.css("display", "flex");
  };

  const hideRestartModal = () => {
    $modal.hide();
    $restartContent.hide();
  };

  const determineWinner = (turn) => {
    if (players.p2IsCPU) {
      if (players.p1 === turn) {
        $message.html("YOU WON!");
      } else {
        $message.html("OH NO, YOU LOST...");
      }
    } else {
      if (players.p1 === turn) {
        $message.html("PLAYER 1 WINS!");
      } else {
        $message.html("PLAYER 2 WINS!");
      }
    }
  };

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

        determineWinner(turn);
      } else {
        $declaration.html(
          '<img height="32px" src="./assets/icon-o.svg" alt="O" /> TAKES THE ROUND'
        );

        determineWinner(turn);
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
    players.p2IsCPU = false;
    $game.hide();
    $menu.show();
  });

  $cancelBtn.on("click", hideRestartModal);

  $yesBtn.on("click", () => {
    stopCPU();
    resetGameBoard();
    resetScores();
    hideRestartModal();
    players.p2IsCPU = false;
    $game.hide();
    $menu.show();
  });

  /* MODAL END */

  /* GAMEBOARD START */

  //Creates a cell for the game board
  const createCell = (index) => {
    let $cell = $(`<div id="cell-${index}" class="navy-btn board-cell"></div>`);

    $cell.on("mouseover", () => {
      if (!$cell.html()) {
        if (turn === "X") {
          $cell.html(
            `<img height="32px" src="./assets/icon-x-outline.svg" alt="X" />`
          );
        } else {
          $cell.html(
            `<img height="32px" src="./assets/icon-o-outline.svg" alt="O" />`
          );
        }
      }
    });

    $cell.on("mouseleave", () => {
      if (
        $cell.html() ===
          '<img height="32px" src="./assets/icon-x-outline.svg" alt="X">' ||
        $cell.html() ===
          '<img height="32px" src="./assets/icon-o-outline.svg" alt="O">'
      ) {
        $cell.empty();
      }
    });

    return $cell;
  };

  //Creates and inserts 9 cells for the game board
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

    if (isCPUActive) {
      cpuPlay();
    }
  };

  //Change the turn and its indicator
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
    if (!value) {
      let $cpuCell = $(`#cell-${choice}`);
      setTimeout(() => {
        fillCell($cpuCell);
        checkForWinner();
        changeTurnIndicator();
        $gameBlock.hide();
      }, 800);

      return false;
    } else {
      return true;
    }
  };

  const playPredict = () => {
    const convertMarkToPoint = (mark) => {
      if (mark === "X") {
        return 1;
      } else if (mark === "O") {
        return 5;
      } else {
        return 0;
      }
    };

    const findEmptyBoardValueAndPlay = (scenario) => {
      switch (scenario) {
        case 1:
          if (!board[0][0]) checkCPUChoice(board[0][0], 0);
          if (!board[0][1]) checkCPUChoice(board[0][1], 1);
          if (!board[0][2]) checkCPUChoice(board[0][2], 2);
          break;
        case 2:
          if (!board[1][0]) checkCPUChoice(board[1][0], 3);
          if (!board[1][1]) checkCPUChoice(board[1][1], 4);
          if (!board[1][2]) checkCPUChoice(board[1][2], 5);
          break;
        case 3:
          if (!board[2][0]) checkCPUChoice(board[2][0], 6);
          if (!board[2][1]) checkCPUChoice(board[2][1], 7);
          if (!board[2][2]) checkCPUChoice(board[2][2], 8);
          break;
        case 4:
          if (!board[0][0]) checkCPUChoice(board[0][0], 0);
          if (!board[1][0]) checkCPUChoice(board[1][0], 3);
          if (!board[2][0]) checkCPUChoice(board[2][0], 6);
          break;
        case 5:
          if (!board[0][1]) checkCPUChoice(board[0][1], 1);
          if (!board[1][1]) checkCPUChoice(board[1][1], 4);
          if (!board[2][1]) checkCPUChoice(board[2][1], 7);
          break;
        case 6:
          if (!board[0][2]) checkCPUChoice(board[0][2], 2);
          if (!board[1][2]) checkCPUChoice(board[1][2], 5);
          if (!board[2][2]) checkCPUChoice(board[2][2], 8);
          break;
        case 7:
          if (!board[0][0]) checkCPUChoice(board[0][0], 0);
          if (!board[1][1]) checkCPUChoice(board[1][1], 4);
          if (!board[2][2]) checkCPUChoice(board[2][2], 8);
          break;
        case 8:
          if (!board[0][2]) checkCPUChoice(board[0][2], 2);
          if (!board[1][1]) checkCPUChoice(board[1][1], 4);
          if (!board[2][0]) checkCPUChoice(board[2][0], 6);
          break;
      }
    };

    //Board values as cells
    const c1 = convertMarkToPoint(board[0][0]);
    const c2 = convertMarkToPoint(board[0][1]);
    const c3 = convertMarkToPoint(board[0][2]);
    const c4 = convertMarkToPoint(board[1][0]);
    const c5 = convertMarkToPoint(board[1][1]);
    const c6 = convertMarkToPoint(board[1][2]);
    const c7 = convertMarkToPoint(board[2][0]);
    const c8 = convertMarkToPoint(board[2][1]);
    const c9 = convertMarkToPoint(board[2][2]);

    //Horizontal Lines
    const scenario1 = c1 + c2 + c3;
    const scenario2 = c4 + c5 + c6;
    const scenario3 = c7 + c8 + c9;
    //Vertical Lines
    const scenario4 = c1 + c4 + c7;
    const scenario5 = c2 + c5 + c8;
    const scenario6 = c3 + c6 + c9;
    //Diagonal Lines
    const scenario7 = c1 + c5 + c9;
    const scenario8 = c3 + c5 + c7;

    const scenarios = [
      scenario1,
      scenario2,
      scenario3,
      scenario4,
      scenario5,
      scenario6,
      scenario7,
      scenario8,
    ];

    const checkIfCPUCanWin = () => {
      let winningScenarioIndex;

      if (players.p2 === "X") {
        for (let i = 0; i < scenarios.length; i++) {
          if (scenarios[i] + 1 === 3) {
            winningScenarioIndex = i + 1;
            break;
          }
        }
      } else {
        for (let i = 0; i < scenarios.length; i++) {
          if (scenarios[i] + 5 === 15) {
            winningScenarioIndex = i + 1;
            break;
          }
        }
      }

      if (winningScenarioIndex) {
        findEmptyBoardValueAndPlay(winningScenarioIndex);
        return true;
      } else {
        console.log("Can't win! Check block!");
        return false;
      }
    };

    const checkIfPlayerCanWin = () => {
      let winningScenarioIndex;

      if (players.p1 === "X") {
        for (let i = 0; i < scenarios.length; i++) {
          if (scenarios[i] + 1 === 3) {
            winningScenarioIndex = i + 1;
            break;
          }
        }
      } else {
        for (let i = 0; i < scenarios.length; i++) {
          if (scenarios[i] + 5 === 15) {
            winningScenarioIndex = i + 1;
            break;
          }
        }
      }

      if (winningScenarioIndex) {
        findEmptyBoardValueAndPlay(winningScenarioIndex);
        return true;
      } else {
        console.log("Can't block! Play random!");
        return false;
      }
    };

    if (!checkIfCPUCanWin()) {
      return checkIfPlayerCanWin();
    } else {
      return true;
    }

    
  };

  const playRandom = () => {
    let control = true;

    while (control) {
      let choice = Math.floor(Math.random() * 9);

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
  };

  const cpuPlay = () => {
    if (players.p2IsCPU && players.p2 === turn && roundOver === false) {
      $gameBlock.show();

      if (!playPredict()) {
        //loop through cpu plays until it corresponds to an empty cell and then fill cell
        playRandom();
      }
    }
  };

  const setCellsOnClickEvents = () => {
    const $boardCell = $(".board-cell");

    for (const cell of $boardCell) {
      $(cell).on("click", () => {
        if (
          $(cell).html() ==
            '<img height="32px" src="./assets/icon-x-outline.svg" alt="X">' ||
          $(cell).html() ==
            '<img height="32px" src="./assets/icon-o-outline.svg" alt="O">'
        ) {
          fillCell($(cell));
          checkForWinner();
          changeTurnIndicator();
          if (isCPUActive) {
            cpuPlay();
          }
        } else {
          alert("Cell already occupied");
        }
      });
    }
  };

  $restartBtn.on("click", showRestartModal);

  /* GAMEBOARD END */

  //Initialize Board
  createBoard();
  setCellsOnClickEvents();
});
