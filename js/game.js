const Block = require("./block");

class Game {
  constructor(size, startValue, ctx, boardWidth) {
    this.size = size;
    this.startValue = startValue;
    this.ctx = ctx;
    this.blockWidth = boardWidth / size;
    this.board = this.setupBoard();
    this.sequence = [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144];
  }

  run(){
    this.renderBoard();
    this.addRandomBlock();
    this.addRandomBlock();
    this.renderBoard();

    // while (!gameover()) {
    //
    // }
  }

  setupBoard() {
    let matrix = [];
    let row = [];
    for(let i = 0; i < this.size; i++) {
      for(let j = 0; j < this.size; j++) {
        const block = new Block(-1, i, j);
        console.log(block);
        row.push(block);
      }
      matrix.push(row);
      row = [];
    }
    console.log(matrix);
    return matrix;
  }

  renderBoard(){
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        this.ctx.beginPath();
        let block = this.board[i][j];
        let x = block.x + i * this.blockWidth;
        let y = block.y + j * this.blockWidth;

        this.ctx.rect(x, y, this.blockWidth, this.blockWidth);
        this.ctx.fillStyle = block.color;
        this.ctx.fill();

        this.ctx.font = "20px Arial";
        this.ctx.fillStyle = 'white';
        // this.ctx.textAlign = "center";
        console.log(block.value);
        this.ctx.fillText(block.value, x + (this.blockWidth/2), y + (this.blockWidth/2));
      }
    }
  }

  addRandomBlock(){

  }

  slideBlocksRight(){

  }
  slideBlocksLeft(){

  }
  slideBlocksDown(){

  }
  slideBlocksUp(){

  }




}


module.exports = Game;
