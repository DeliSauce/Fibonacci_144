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


    while (!this.gameover()) {

    }
  }

  gameover() {
    for(let i = 0; i < this.size; i++) {
      for(let j = 0; j < this.size; j++) {
        if(this.positionEmpty(i,j)) {
          return false;
        }
      }
    }
    return true;
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
    this.ctx.clearRect(0, 0, this.boardWidth, this.boardWidth);
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        this.ctx.beginPath();
        let block = this.board[i][j];
        let x = block.x + i * this.blockWidth;
        let y = block.y + j * this.blockWidth;

        this.ctx.rect(x, y, this.blockWidth, this.blockWidth);
        this.ctx.fillStyle = block.getColor();

        console.log("block color",block.getColor());
        this.ctx.fill();

        this.ctx.font = "20px Arial";
        this.ctx.fillStyle = 'white';
        this.ctx.fillText(block.value, x + (this.blockWidth/2), y + (this.blockWidth/2));
      }
    }
  }

  addRandomBlock(){
    let positionFull = true;
    while(positionFull) {
      let x = this.randomInt(0, this.size - 1);
      let y = this.randomInt(0, this.size - 1);
      console.log(x,y);
      if (this.positionEmpty(x,y)) {
        this.board[x][y].value = 1;
        positionFull = false;
      }
    }
  }

  randomInt(a,b) {
    return Math.floor(Math.random() * (b - a + 1)) + a;
  }

  positionEmpty(x,y) {
    return (this.board[x][y].value === -1 ? true: false);
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
