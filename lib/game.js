const Block = require("./block");

const FIBONACCI = [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144];

class Game {
  constructor(size, startSequence, ctx, boardWidth) {
    this.size = parseInt(size);
    this.startSequence = parseInt(startSequence);
    this.over = false;
    this.ctx = ctx;
    this.boardWidth = boardWidth;
    this.borderWidth = 5;
    this.blockWidth = (boardWidth - (this.size + 1) * this.borderWidth)/size;
    this.board = this.setupBoard();
    this.sequence = FIBONACCI.slice(this.startSequence);
    this.allowUserInput = true;
    window.game = this;
  }

  reset(size, startSequence) {
    this.size = parseInt(size);
    this.over = false;
    this.startSequence = parseInt(startSequence);
    this.sequence = FIBONACCI.slice(this.startSequence);
    this.blockWidth = (this.boardWidth - (this.size + 1) * this.borderWidth)/size;
    this.board = this.setupBoard();
    this.ctx.clearRect(0, 0, this.boardWidth, this.boardWidth);
    this.run();
  }


  run(){
    this.populateSidebar();
    this.addRandomBlock();
    this.addRandomBlock();
    this.render();
    this.printBoardToConsole();
  }

  render() {
    this.ctx.clearRect(0, 0, this.boardWidth, this.boardWidth);
    this.renderBoard();
    this.renderBlocks();
  }

  populateSidebar() {
    const $sidebar = $('.sequence-tracker');
    $sidebar.empty();
    let sidebarValues = this.sequence;

    sidebarValues.forEach((num) => {
      let $fibNum = $("<div></div>");
      $fibNum.text(num);
      $fibNum.addClass("fibNum_" + num.toString());
      if (num <= 1) $fibNum.addClass("highlighted");
      $sidebar.append($fibNum);
    });
  }

  updateSidebar() {
    let max = this.maxBoxValue();
    this.sequence.forEach((num) => {
      let $num = $('.fibNum_' + num.toString());
      if (num <= max) {
        $num.addClass("highlighted");
      }
    });

  }

  maxBoxValue() {
    let max = 1;
    this.board.forEach((row) => {
      row.forEach((block) => {
        if (block.value > max) max = block.value;
      });
    });
    return max;
  }

  won() {
    if (this.maxBoxValue() === 144) {
      this.renderWon();
      return true;
    } else {
      return false;
    }
  }

  gameover() {
    if (this.won()) return true;
    for(let i = 0; i < this.size; i++) {
      for(let j = 0; j < this.size; j++) {
        if(this.positionEmpty(i,j)) {
          return false;
        }
      }
    }
    this.renderLost();
    return true;
  }

  renderLost() {
    this.ctx.clearRect(0, 0, this.boardWidth, this.boardWidth);
    this.ctx.rect(0, 0, this.boardWidth, this.boardWidth);
    this.ctx.fillStyle = 'red';
    this.ctx.fill();
    this.ctx.font = "50px Arial";
    this.ctx.fillStyle = 'white';
    this.ctx.fillText("YOU LOSE!!", (this.boardWidth/2) - (140), (this.boardWidth/2) + (0));
    this.ctx.closePath();
  }

  renderWon() {
    this.ctx.clearRect(0, 0, this.boardWidth, this.boardWidth);
    this.ctx.rect(0, 0, this.boardWidth, this.boardWidth);
    this.ctx.fillStyle = 'blue';
    this.ctx.fill();
    this.ctx.font = "50px Arial";
    this.ctx.fillStyle = 'white';
    this.ctx.fillText("YOU WIN!!", (this.boardWidth/2) - (140), (this.boardWidth/2) + (0));
    this.ctx.closePath();
  }

  setupBoard() {
    let matrix = [];
    let row = [];
    for(let i = 0; i < this.size; i++) {
      for(let j = 0; j < this.size; j++) {
        const block = new Block(-1);
        row.push(block);
      }
      matrix.push(row);
      row = [];
    }
    return matrix;
  }

  renderBoard(){
    this.ctx.rect(0, 0, this.boardWidth, this.boardWidth);
    this.ctx.fillStyle = '#b7b8b6';
    this.ctx.fill();
    this.ctx.closePath();
  }

  renderBlocks(){
    this.updateSidebar();
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        let block = this.board[i][j];
        // let x = (i + block.positionShift[0]) * this.blockWidth + this.borderWidth * (i + 1);
        // let y = (j + block.positionShift[1]) * this.blockWidth + this.borderWidth * (j + 1);
        this.renderBlock(block, i, j);
      }
    }
  }

  renderBlankBoard(){
    this.renderBoard();
    let block = new Block(-1);
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        // let x = (i + block.positionShift[0]) * this.blockWidth + this.borderWidth * (i + 1);
        // let y = (j + block.positionShift[1]) * this.blockWidth + this.borderWidth * (j + 1);
        this.renderBlock(block, i, j);
      }
    }
  }

  printBoardToConsole() {
    // let arr = [];
    let str = "";
    for (let i = 0; i < this.size; i++) {
      str = i + " ";
      for (let j = 0; j < this.size; j++) {
        if (this.board[i][j].value === -1) {
          str += "O ";
        } else {
          str += "X ";
        }
      }
      console.log(str);
    }
  }

  renderBlock(block, row, col) {
    let x = col * this.blockWidth + this.borderWidth * (col + 1);
    let y = row * this.blockWidth + this.borderWidth * (row + 1);
    this.ctx.beginPath();

    this.ctx.rect(x, y, this.blockWidth, this.blockWidth);
    this.ctx.fillStyle = block.getColor();

    this.ctx.fill();
    if (block.value > -1) {
      let fontSize = this.blockWidth/2;
      this.ctx.font = (fontSize).toString() + "px Arial";
      this.ctx.fillStyle = 'white';
      if(block.value >= 100) {
        this.ctx.fillText(block.value, x + (this.blockWidth/2) - (this.blockWidth/2.5), y + (this.blockWidth/2) + (this.blockWidth/7));
      } else if (block.value >= 10) {
        this.ctx.fillText(block.value, x + (this.blockWidth/2) - (this.blockWidth/4), y + (this.blockWidth/2) + (this.blockWidth/7));
      } else {
        this.ctx.fillText(block.value, x + (this.blockWidth/2) - (this.blockWidth/7), y + (this.blockWidth/2) + (this.blockWidth/7));
      }
    }
    this.ctx.closePath();
  }

  addRandomBlock(){
    // let addRandom = setInterval(() => {
    //   if (numBlocks == 0) {
    //     this.allowUserInput = true;
    //     clearInterval(addRandom);
    //   }
    //
    //
    //
    // }, 30);

    if (this.gameover()) return;
    let positionFull = true;
    while(positionFull) {
      let x = this.randomInt(0, this.size - 1);
      let y = this.randomInt(0, this.size - 1);
      let value = 1;
      if (this.startSequence === 0) {
        value = (Math.random() < .25 ? 0 : 1);
      }
      if (this.positionEmpty(x,y)) {
        this.board[x][y].value = value;
        positionFull = false;
        console.log(x,y);
      }
    }
  }

  randomInt(a,b) {
    return Math.floor(Math.random() * (b - a + 1)) + a;
  }

  positionEmpty(x,y) {
    return (this.board[x][y].value === -1 ? true: false);
  }


  moveBlocks(direction) {
    this.allowUserInput = false;
    switch(direction) {
      case 'left':
        // this.slideBlocksLeft();
        this.slideBlocks([0, -1]);
        return;
      case 'right':
        // return this.slideBlocksRight();
        this.slideBlocks([0, 1]);
        return;
      case 'up':
        // return this.slideBlocksUp();
        this.slideBlocks([-1, 0]);
        return;
      case 'down':
        // return this.slideBlocksDown();
        this.slideBlocks([1, 0]);
        return;
    }
  }

  slideBlocks(shift) {
    let emptyCount = 0;
    let row, col;
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        if(shift[0] === 0){
          row = i;
          col = (shift[1] === 1 ? this.size - j - 1 : j);
        } else {
          col = i;
          row = (shift[0] === 1 ? this.size - j - 1 : j);
        }

        if(this.positionEmpty(row,col)) {
          emptyCount++;
        } else if (emptyCount !== 0) {

          this.board[row][col].positionShift = [shift[1] * emptyCount , shift[0] * emptyCount];

          // console.log(this.board[row][col].positionShift);

          this.board[row + shift[0] * emptyCount][col + shift[1] * emptyCount] = this.board[row][col];

          this.board[row][col] = new Block(-1);
          console.log(row, shift[0] * emptyCount, col, shift[1] * emptyCount);
        }

      }
      emptyCount = 0;
    }
    this.printBoardToConsole();
    // this.render();
    let finishedSliding = false;
    let countdown = 1.0;

    let slide = setInterval(() => {
      if (countdown <= 0) {
        this.consolidateBlocks(shift);
        clearInterval(slide);
      }
      // finishedSliding = true;
      this.renderBlankBoard();
      // console.log('yers');
      for (let i = 0; i < this.size; i++) {
        for (let j = 0; j < this.size; j++) {
          let block = this.board[i][j];
          if (block.value > -1) {
            console.log("render block");
            // let x = (i + block.positionShift[0] * countdown) * this.blockWidth + this.borderWidth * (i + 1);
            // let y = (j + block.positionShift[1] * countdown) * this.blockWidth + this.borderWidth * (j + 1);

            row = i - (block.positionShift[1] * countdown);
            col = j - (block.positionShift[0] * countdown);

            if (countdown <= 0) {
              block.positionShift = [0,0];
              row = i;
              col = j;
            }
            // console.log(x,y, countdown, block.positionShift);
            this.renderBlock(block, row, col);
          }
        }
      }
      countdown -= .30;
      // debugger;
    }, 30);

  }

  consolidateBlocks(shift) {
    let consolidated = false;
    let skipConsolidated = true;

    let row, col;
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size - 1; j++) {
        if(shift[0] === 0){
          row = i;
          col = (shift[1] === 1 ? this.size - j - 1 : j);
        } else {
          col = i;
          row = (shift[0] === 1 ? this.size - j - 1 : j);
        }

        if ( this.positionEmpty(row,col) && skipConsolidated ) {
          break; //breaks out of inner for loop when nothing to consolidate
        } else if (!skipConsolidated) {
          skipConsolidated  = true;
        } else {
          let nextFib = this.nextFib(this.board[row][col].value, this.board[row - shift[0]][col - shift[1]].value);
          if (nextFib !== -1) {
            this.board[row][col].value = nextFib;
            this.board[row - shift[0]][col - shift[1]].value = -1;
            skipConsolidated  = false;
            consolidated = true;
          }
        }

      }
    }
    this.render();
    if(consolidated) {
      this.slideBlocks(shift);
    } else {
      this.render();
      setTimeout(() => {
        this.addRandomBlock();
        this.render();
        this.allowUserInput = true;
      }, 200);
    }
  }

  nextFib(max,min) {
    // if (min > max) {
    //   let temp = min;
    //   min = max;
    //   max = temp;
    // }
    let returnValue = -1;
    this.sequence.forEach((num, idx) => {
      if(num === min && this.sequence[idx + 1] === max) {
        returnValue = min + max;
      }
    });
    return returnValue;
  }

  // slideBlocksRight(){
  //   let emptyCount = 0;
  //   for (let i = 0; i < this.size; i++) {
  //     for (let j = this.size - 1; j >= 0; j--) {
  //       if(this.positionEmpty(i,j)) {
  //         emptyCount++;
  //       } else if (emptyCount !== 0) {
  //         this.board[i][j + emptyCount] = this.board[i][j];
  //         this.board[i][j] = new Block(-1, i, j);
  //       }
  //     }
  //     emptyCount = 0;
  //   }
  //
  //   let consolidated = false;
  //   let skipConsolidated = true;
  //
  //   for (let i = 0; i < this.size; i++) {
  //     for (let j = this.size - 1; j > 0; j--) {
  //       if ( this.positionEmpty(i,j) && skipConsolidated ) {
  //         break; //breaks out of inner for loop when nothing to consolidate
  //       } else if (!skipConsolidated) {
  //         skipConsolidated  = true;
  //       } else {
  //         let nextFib = this.nextFib(this.board[i][j].value, this.board[i][j-1].value);
  //         if (nextFib !== -1) {
  //           this.board[i][j].value = nextFib;
  //           this.board[i][j-1].value = -1;
  //           skipConsolidated  = false;
  //           consolidated = true;
  //         }
  //       }
  //     }
  //   }
  //   this.render();
  //   if(consolidated) {
  //     this.slideBlocksRight();
  //   } else {
  //     this.render();
  //     setTimeout(() => {
  //       this.addRandomBlock();
  //       this.render();
  //     }, 200);
  //   }
  // }

  // slideBlocksLeft(){
  //   let emptyCount = 0;
  //   for (let i = 0; i < this.size; i++) {
  //     for (let j = 0; j < this.size; j++) {
  //       if(this.positionEmpty(i,j)) {
  //         emptyCount++;
  //       } else if (emptyCount !== 0) {
  //         this.board[i][j - emptyCount] = this.board[i][j];
  //         this.board[i][j] = new Block(-1, i, j);
  //       }
  //     }
  //     emptyCount = 0;
  //   }
  //
  //   let consolidated = false;
  //   let skipConsolidated = true;
  //
  //   for (let i = 0; i < this.size; i++) {
  //     for (let j = 0; j < this.size - 1; j++) {
  //       if ( this.positionEmpty(i,j) && skipConsolidated ) {
  //         break; //breaks out of inner for loop when nothing to consolidate
  //       } else if (!skipConsolidated) {
  //         skipConsolidated  = true;
  //       } else {
  //         let nextFib = this.nextFib(this.board[i][j].value, this.board[i][j+1].value);
  //         if (nextFib !== -1) {
  //           this.board[i][j].value = nextFib;
  //           this.board[i][j+1].value = -1;
  //           skipConsolidated  = false;
  //           consolidated = true;
  //         }
  //       }
  //     }
  //   }
  //   this.render();
  //   if(consolidated) {
  //     this.slideBlocksLeft();
  //   } else {
  //     this.render();
  //     setTimeout(() => {
  //       this.addRandomBlock();
  //       this.render();
  //     }, 200);
  //   }
  // }

//   slideBlocksDown(){
//     let emptyCount = 0;
//     for (let col = 0; col < this.size; col++) {
//       for (let row = this.size - 1; row >= 0; row--) {
//         if(this.positionEmpty(row,col)) {
//           emptyCount++;
//         } else if (emptyCount !== 0) {
//           this.board[row + emptyCount][col] = this.board[row][col];
//           this.board[row][col] = new Block(-1, row, col);
//         }
//       }
//       emptyCount = 0;
//     }
//
//     let consolidated = false;
//     let skipConsolidated = true;
//
//     for (let col = 0; col < this.size; col++) {
//       for (let row = this.size - 1; row > 0; row--) {
//         if ( this.positionEmpty(row,col) && skipConsolidated ) {
//           break; //breaks out of inner for loop when nothing to consolidate
//         } else if (!skipConsolidated) {
//           skipConsolidated  = true;
//         } else {
//           let nextFib = this.nextFib(this.board[row][col].value, this.board[row - 1][col].value);
//           if (nextFib !== -1) {
//             this.board[row][col].value = nextFib;
//             this.board[row - 1][col].value = -1;
//             skipConsolidated  = false;
//             consolidated = true;
//           }
//         }
//       }
//     }
//     this.render();
//     if(consolidated) {
//       this.slideBlocksDown();
//     } else {
//       this.render();
//       setTimeout(() => {
//         this.addRandomBlock();
//         this.render();
//       }, 200);
//     }
//   }


//   slideBlocksUp(){
//     let emptyCount = 0;
//     for (let col = 0; col < this.size; col++) {
//       for (let row = 0; row < this.size; row++) {
//         if(this.positionEmpty(row,col)) {
//           emptyCount++;
//         } else if (emptyCount !== 0) {
//           this.board[row - emptyCount][col] = this.board[row][col];
//           this.board[row][col] = new Block(-1, row, col);
//         }
//       }
//       emptyCount = 0;
//     }
//
//     let consolidated = false;
//     let skipConsolidated = true;
//
//     for (let col = 0; col < this.size; col++) {
//       for (let row = 0; row < this.size - 1; row++) {
//         if ( this.positionEmpty(row,col) && skipConsolidated ) {
//           break; //breaks out of inner for loop when nothing to consolidate
//         } else if (!skipConsolidated) {
//           skipConsolidated  = true;
//         } else  {
//           let nextFib = this.nextFib(this.board[row][col].value, this.board[row + 1][col].value);
//           if (nextFib !== -1) {
//             this.board[row][col].value = nextFib;
//             this.board[row + 1][col].value = -1;
//             skipConsolidated  = false;
//             consolidated = true;
//           }
//         }
//       }
//     }
//     this.render();
//     if(consolidated) {
//       this.slideBlocksUp();
//     } else {
//       this.render();
//       setTimeout(() => {
//         this.addRandomBlock();
//         this.render();
//       }, 200);
//     }
//   }
// }
}
module.exports = Game;
