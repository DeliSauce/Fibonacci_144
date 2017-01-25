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
    this.addRandomBlock();
    this.addRandomBlock();
    this.addRandomBlock();
    this.addRandomBlock();
    this.addRandomBlock();
    this.renderBoard();

    // console.log(!this.gameover());
    // while (true) {
      window.addEventListener('keydown', (e) => {
        if(e.key === 'ArrowLeft') {
          this.slideBlocksLeft();
          // this.addRandomBlock();
          // this.renderBoard();

        } else if(e.key === 'ArrowUp') {
          this.slideBlocksUp();
          // this.addRandomBlock();
          // this.renderBoard();

        } else if(e.key === 'ArrowRight') {
          this.slideBlocksRight();
          // setTimeout(() => {
            // this.addRandomBlock();
          // }, 500);
          // this.renderBoard();

        } else if(e.key === 'ArrowDown') {
          this.slideBlocksDown();
          // this.addRandomBlock();
          // this.renderBoard();

        }
        // window.closeEventListener();
      });
    //   window.setT
    // }

    // while (!this.gameover()) {
    //
    //   // console.log('game over');
    // }
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
        row.push(block);
      }
      matrix.push(row);
      row = [];
    }
    return matrix;
  }

  renderBoard(){
    this.ctx.clearRect(0, 0, this.boardWidth, this.boardWidth);
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        this.ctx.beginPath();
        let block = this.board[i][j];
        let x = j * this.blockWidth;
        let y = i * this.blockWidth;

        this.ctx.rect(x, y, this.blockWidth, this.blockWidth);
        this.ctx.fillStyle = block.getColor();

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
      if (this.positionEmpty(x,y)) {
        this.board[x][y].value = 1;
        positionFull = false;
      }
      console.log('added random', x, y);
    }
  }

  randomInt(a,b) {
    return Math.floor(Math.random() * (b - a + 1)) + a;
  }

  positionEmpty(x,y) {
    return (this.board[x][y].value === -1 ? true: false);
  }

  slideBlocksRight(){
    let emptyCount = 0;
    for (let i = 0; i < this.size; i++) {
      for (let j = this.size - 1; j >= 0; j--) {
        if(this.positionEmpty(i,j)) {
          emptyCount++;
        } else if (emptyCount !== 0) {
          this.board[i][j + emptyCount] = this.board[i][j];
          this.board[i][j] = new Block(-1, i, j);
        }
      }
      emptyCount = 0;
    }
    this.addRandomBlock();
    this.renderBoard();
  }

  slideBlocksLeft(){
    console.log("begin left slide");
    let emptyCount = 0;
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        if(this.positionEmpty(i,j)) {
          emptyCount++;
        } else if (emptyCount !== 0) {
          this.board[i][j - emptyCount] = this.board[i][j];
          this.board[i][j] = new Block(-1, i, j);
        }
      }
      emptyCount = 0;
    }

    let consolidated = false;
    let skipConsolidated = true;

    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size - 1; j++) {
        if ( this.positionEmpty(i,j) && skipConsolidated ) {
          break; //breaks out of inner for loop when nothing to consolidate
        } else if (!skipConsolidated) {
          skipConsolidated  = true;
        } else {
          let nextFib = this.nextFib(this.board[i][j].value, this.board[i][j+1].value);
          // console.log("next fib", nextFib);
          if (nextFib !== -1) {
            this.board[i][j].value = nextFib;
            this.board[i][j+1].value = -1;
            skipConsolidated  = false;
            consolidated = true;
          }
        }
      }
    }
    this.renderBoard();
    if(consolidated) {
      this.slideBlocksLeft();
    } else {
      this.renderBoard();
      setTimeout(() => {
        this.addRandomBlock();
        this.renderBoard();
      }, 200);
    }




  }

  nextFib(min,max) {
    if (min > max) {
      let temp = min;
      min = max;
      max = temp;
    }
    let returnValue = -1;
    this.sequence.forEach((num, idx) => {
      if(num === min && this.sequence[idx + 1] === max) {
        returnValue = min + max;
      }
    });
    return returnValue;
  }




  slideBlocksDown(){
    let emptyCount = 0;
    for (let col = 0; col < this.size; col++) {
      for (let row = this.size - 1; row >= 0; row--) {
        if(this.positionEmpty(row,col)) {
          emptyCount++;
        } else if (emptyCount !== 0) {
          this.board[row + emptyCount][col] = this.board[row][col];
          this.board[row][col] = new Block(-1, row, col);
        }
      }
      emptyCount = 0;
    }
    this.addRandomBlock();
    this.renderBoard();
  }

  slideBlocksUp(){
    let emptyCount = 0;
    for (let col = 0; col < this.size; col++) {
      for (let row = 0; row < this.size; row++) {
        if(this.positionEmpty(row,col)) {
          emptyCount++;
        } else if (emptyCount !== 0) {
          this.board[row - emptyCount][col] = this.board[row][col];
          this.board[row][col] = new Block(-1, row, col);
        }
      }
      emptyCount = 0;
    }
    this.addRandomBlock();
    this.renderBoard();
  }




}


module.exports = Game;
