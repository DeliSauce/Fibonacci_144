const Game = require("./game");
// const View = require("./view");


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
    if(!game.over) {
      if(e.key === 'ArrowLeft') {
        game.moveBlocks('left');
      } else if(e.key === 'ArrowUp') {
        game.moveBlocks('up');
      } else if(e.key === 'ArrowRight') {
        game.moveBlocks('right');
      } else if(e.key === 'ArrowDown') {
        game.moveBlocks('down');
      }
    }
  });

});
