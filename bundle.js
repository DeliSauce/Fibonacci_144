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
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const Game = __webpack_require__(1);
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


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const Block = __webpack_require__(2);
	
	class Game {
	  constructor(size, startSequence, ctx, boardWidth) {
	    this.size = parseInt(size);
	    this.startSequence = startSequence;
	    // this.startValue = startValue;
	    this.over = false;
	    this.ctx = ctx;
	    this.boardWidth = boardWidth;
	    this.borderWidth = 5;
	    this.blockWidth = (boardWidth - (this.size + 1) * this.borderWidth)/size;
	    this.board = this.setupBoard();
	    this.sequence = [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144];
	  }
	
	  reset(size, sequence) {
	    // window.removeEventListener('keydown', (e)=>{});
	    this.size = parseInt(size);
	    this.over = false;
	    // this.sequence = sequence;
	    // this.startValue = startValue;
	    // this.ctx = ctx;
	    this.borderWidth = 5;
	    this.blockWidth = (this.boardWidth - (this.size + 1) * this.borderWidth)/size;
	    this.board = this.setupBoard();
	    // this.sequence = [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144];
	    this.ctx.clearRect(0, 0, this.boardWidth, this.boardWidth);
	    this.run();
	  }
	
	
	  run(){
	    this.populateSidebar();
	    this.renderBoard();
	    this.addRandomBlock();
	    this.addRandomBlock();
	    this.renderBlocks();
	  }
	
	  populateSidebar() {
	    let sidebarValues = this.sequence;
	    if (this.startSequence === 1) {
	      sidebarValues = sidebarValues.slice(1);
	    }
	
	    const $sidebar = $('.sequence-tracker');
	    sidebarValues.forEach((num) => {
	      let $fibNum = $("<div></div>");
	      $fibNum.text(num);
	      $fibNum.addClass("fibNum");
	      $fibNum.addClass(num.toString());
	      $sidebar.append($fibNum);
	    });
	  }
	
	  updateSidebar() {
	    
	  }
	
	  maxBoxValue() {
	    let max = 1;
	    this.board.forEach((block) => {
	      if (block.value > 1) max = block.value;
	    });
	    return max;
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
	    console.log(this.boardWidth);
	    this.ctx.clearRect(0, 0, this.boardWidth, this.boardWidth);
	    this.ctx.rect(0, 0, this.boardWidth, this.boardWidth);
	    this.ctx.fillStyle = 'grey';
	    this.ctx.fill();
	    this.ctx.closePath();
	  }
	
	  renderBlocks(){
	    // this.ctx.clearRect(0, 0, this.boardWidth, this.boardWidth);
	    for (let i = 0; i < this.size; i++) {
	      for (let j = 0; j < this.size; j++) {
	        this.ctx.beginPath();
	        let block = this.board[i][j];
	        let xOffset = this.borderWidth * (j + 1);
	        let yOffset = this.borderWidth * (i + 1);
	        let x = j * this.blockWidth + xOffset;
	        let y = i * this.blockWidth + yOffset;
	
	        this.ctx.rect(x, y, this.blockWidth, this.blockWidth);
	        this.ctx.fillStyle = block.getColor();
	
	        this.ctx.fill();
	        if (block.value > -1) {
	          this.ctx.font = "20px Arial";
	          this.ctx.fillStyle = 'white';
	          this.ctx.fillText(block.value, x + (this.blockWidth/2), y + (this.blockWidth/2));
	        }
	        this.ctx.closePath();
	
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
	          // let nextBlock = this.board[i][j-1];
	          // let nextValue = (nextBlock ? nextBlock.value : -1);
	          let nextFib = this.nextFib(this.board[i][j].value, this.board[i][j-1].value);
	          // console.log("next fib", nextFib);
	          if (nextFib !== -1) {
	            this.board[i][j].value = nextFib;
	            this.board[i][j-1].value = -1;
	            skipConsolidated  = false;
	            consolidated = true;
	          }
	        }
	      }
	    }
	    this.renderBlocks();
	    if(consolidated) {
	      this.slideBlocksRight();
	    } else {
	      this.renderBlocks();
	      setTimeout(() => {
	        this.addRandomBlock();
	        console.log("right slide random");
	        this.renderBlocks();
	      }, 200);
	    }
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
	          // let nextBlock = this.board[i][j+1];
	          // let nextValue = (nextBlock ? nextBlock.value : -1);
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
	    this.renderBlocks();
	    if(consolidated) {
	      this.slideBlocksLeft();
	    } else {
	      this.renderBlocks();
	      setTimeout(() => {
	        this.addRandomBlock();
	        console.log("left slide random");
	
	        this.renderBlocks();
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
	          console.log("next fib", nextFib);
	          if (nextFib !== -1) {
	            this.board[row][col].value = nextFib;
	            this.board[row - 1][col].value = -1;
	            skipConsolidated  = false;
	            consolidated = true;
	          }
	        }
	      }
	    }
	    this.renderBlocks();
	    if(consolidated) {
	      this.slideBlocksDown();
	    } else {
	      this.renderBlocks();
	      setTimeout(() => {
	        this.addRandomBlock();
	        console.log("down slide random");
	
	        this.renderBlocks();
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
	          // let nextBlock = ;
	          // let nextValue = (nextBlock ? nextBlock.value : -1);
	          let nextFib = this.nextFib(this.board[row][col].value, this.board[row + 1][col].value);
	          // console.log("next fib", nextFib);
	          if (nextFib !== -1) {
	            this.board[row][col].value = nextFib;
	            this.board[row + 1][col].value = -1;
	            skipConsolidated  = false;
	            consolidated = true;
	          }
	        }
	      }
	    }
	    this.renderBlocks();
	    if(consolidated) {
	      this.slideBlocksUp();
	    } else {
	      this.renderBlocks();
	      setTimeout(() => {
	        this.addRandomBlock();
	        console.log("up slide random");
	
	        this.renderBlocks();
	      }, 200);
	    }
	  }
	}
	
	module.exports = Game;


/***/ },
/* 2 */
/***/ function(module, exports) {

	class Block {
	  constructor(value, row, col) {
	    this.value = value;
	    this.row = row;
	    this.col = col;
	  }
	
	
	
	  getColor() {
	    switch (this.value) {
	      case -1:
	        return "pink";
	      case 0:
	        return "teal";
	      case 1:
	        return "lightblue";
	      case 2:
	        return "green";
	      case 3:
	        return "red";
	      case 5:
	        return "blue";
	      case 8:
	        return "brown";
	      case 13:
	        return "purple";
	      case 21:
	        return "yellow";
	      case 34:
	        return "purple";
	      case 55:
	        return "purple";
	      case 89:
	        return "purple";
	      case 144:
	        return "purple";
	    }
	  }
	}
	
	module.exports = Block;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map