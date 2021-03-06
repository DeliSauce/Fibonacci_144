const Game = require("./game");

document.addEventListener("DOMContentLoaded", function(){
  const gameboard = document.getElementById("canvas");
  let ctx = gameboard.getContext('2d');
  let boardWidth = gameboard.width;

  let sequencePicker = document.getElementById('sequence');
  let sizePicker = document.getElementById('board-size');
  let restartButton = document.getElementById("restart-button");

  // sequencePicker.onchange = newGame;
  // sizePicker.onchange = newGame;
  restartButton.onclick = newGame;

  let size = sizePicker.value;
  let sequence = sequencePicker.value;

  let game = new Game(size, sequence, ctx, boardWidth);
  game.run();

  function newGame() {
    size = sizePicker.value;
    sequence = sequencePicker.value;
    game.reset(size, sequence);
    window.size = size;
  }

  window.addEventListener('keydown', (e) => {
    console.log("key down");
    if(!game.gameover() && game.allowUserInput) {
      console.log("allowUserInput");
      if(e.key === 'ArrowLeft') {
        game.moveBlocks('left');
        console.log("left arrow");
        // game.updateSidebar();
      } else if(e.key === 'ArrowUp') {
        game.moveBlocks('up');
        // game.updateSidebar();
      } else if(e.key === 'ArrowRight') {
        game.moveBlocks('right');
        // game.updateSidebar();
      } else if(e.key === 'ArrowDown') {
        game.moveBlocks('down');
        // game.updateSidebar();
      }
    }
  });

  const $instructions = $('.instructions-container');


  let instructionsButton = document.getElementById("instructions-button");
  let closeInstructionsButton = document.getElementById("close-button");

  instructionsButton.onclick = showInstructions;
  closeInstructionsButton.onclick = hideInstructions;

  function showInstructions() {
    $instructions.removeClass("hide-instructions");
    $instructions.addClass("show-instructions");
  }

  function hideInstructions() {
    $instructions.removeClass("show-instructions");
    $instructions.addClass("hide-instructions");
  }

});
