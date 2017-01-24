const Game = require("./game");
// const View = require("./view");


document.addEventListener("DOMContentLoaded", function(){
  const gameboard = document.getElementById("canvas");
  let ctx = gameboard.getContext('2d');
  let boardWidth = gameboard.width;
  let game = new Game(5, 0, ctx, boardWidth);
  game.run();
  window.board = game.board;

  let restart = document.getElementById("restart-button");
  restart.onclick = () => {
    let startValue = document.getElementById('starting-value');
    let size = document.getElementById('board-size').value;
    ctx.clearRect(0, 0, boardWidth, boardWidth);

    game = new Game(size, startValue, ctx, boardWidth);
    game.run();
    window.size = size;
  };

});
