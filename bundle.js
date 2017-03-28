/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const Block = __webpack_require__(1);

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
        const block = new Block(-1, i, j);
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
        let xOffset = this.borderWidth * (j + 1);
        let yOffset = this.borderWidth * (i + 1);
        let x = j * this.blockWidth + xOffset;
        let y = i * this.blockWidth + yOffset;
        // if (block.value > -1) {
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
        // }
      }
    }
  }

  addRandomBlock(){
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
    switch(direction) {
      case 'left':
        return this.slideBlocksLeft();
      case 'right':
        return this.slideBlocksRight();
      case 'up':
        return this.slideBlocksUp();
      case 'down':
        return this.slideBlocksDown();
    }
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

    let consolidated = false;
    let skipConsolidated = true;

    for (let i = 0; i < this.size; i++) {
      for (let j = this.size - 1; j > 0; j--) {
        if ( this.positionEmpty(i,j) && skipConsolidated ) {
          break; //breaks out of inner for loop when nothing to consolidate
        } else if (!skipConsolidated) {
          skipConsolidated  = true;
        } else {
          let nextFib = this.nextFib(this.board[i][j].value, this.board[i][j-1].value);
          if (nextFib !== -1) {
            this.board[i][j].value = nextFib;
            this.board[i][j-1].value = -1;
            skipConsolidated  = false;
            consolidated = true;
          }
        }
      }
    }
    this.render();
    if(consolidated) {
      this.slideBlocksRight();
    } else {
      this.render();
      setTimeout(() => {
        this.addRandomBlock();
        this.render();
      }, 200);
    }
  }

  slideBlocksLeft(){
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
          if (nextFib !== -1) {
            this.board[i][j].value = nextFib;
            this.board[i][j+1].value = -1;
            skipConsolidated  = false;
            consolidated = true;
          }
        }
      }
    }
    this.render();
    if(consolidated) {
      this.slideBlocksLeft();
    } else {
      this.render();
      setTimeout(() => {
        this.addRandomBlock();
        this.render();
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

    let consolidated = false;
    let skipConsolidated = true;

    for (let col = 0; col < this.size; col++) {
      for (let row = this.size - 1; row > 0; row--) {
        if ( this.positionEmpty(row,col) && skipConsolidated ) {
          break; //breaks out of inner for loop when nothing to consolidate
        } else if (!skipConsolidated) {
          skipConsolidated  = true;
        } else {
          let nextFib = this.nextFib(this.board[row][col].value, this.board[row - 1][col].value);
          if (nextFib !== -1) {
            this.board[row][col].value = nextFib;
            this.board[row - 1][col].value = -1;
            skipConsolidated  = false;
            consolidated = true;
          }
        }
      }
    }
    this.render();
    if(consolidated) {
      this.slideBlocksDown();
    } else {
      this.render();
      setTimeout(() => {
        this.addRandomBlock();
        this.render();
      }, 200);
    }
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

    let consolidated = false;
    let skipConsolidated = true;

    for (let col = 0; col < this.size; col++) {
      for (let row = 0; row < this.size - 1; row++) {
        if ( this.positionEmpty(row,col) && skipConsolidated ) {
          break; //breaks out of inner for loop when nothing to consolidate
        } else if (!skipConsolidated) {
          skipConsolidated  = true;
        } else  {
          let nextFib = this.nextFib(this.board[row][col].value, this.board[row + 1][col].value);
          if (nextFib !== -1) {
            this.board[row][col].value = nextFib;
            this.board[row + 1][col].value = -1;
            skipConsolidated  = false;
            consolidated = true;
          }
        }
      }
    }
    this.render();
    if(consolidated) {
      this.slideBlocksUp();
    } else {
      this.render();
      setTimeout(() => {
        this.addRandomBlock();
        this.render();
      }, 200);
    }
  }
}

module.exports = Game;


/***/ }),
/* 1 */
/***/ (function(module, exports) {

class Block {
  constructor(value, row, col) {
    this.value = value;
    this.row = row;
    this.col = col;
  }

  getColor() {
    switch (this.value) {
      case -1:
        return "#b2a7a7"; //#f1f1f2
      case 0:
        return "#c4dfe6";
      case 1:
        return "#66a5ad";
      case 2:
        return "#75b1a9";
      case 3:
        return "#2c7873";
      case 5:
        return "#1995ad";
      case 8:
        return "#07575b";
      case 13:
        return "#6e6702";
      case 21:
        return "#86ac41";
      case 34:
        return "#b3c100";
      case 55:
        return "#d9b44a";
      case 89:
        return "#ffd64d";
      case 144:
        return "#cb6318";
    }
  }
}

module.exports = Block;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__(0);

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
    if(!game.gameover()) {
      if(e.key === 'ArrowLeft') {
        game.moveBlocks('left');
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


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map