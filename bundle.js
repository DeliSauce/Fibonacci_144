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
	  let game = new Game(5, 0, ctx, boardWidth);
	  game.run();
	
	  let restart = document.getElementById("restart-button");
	  restart.onclick = () => {
	    let startValue = document.getElementById('starting-value');
	    let size = document.getElementById('board-size').value;
	    ctx.clearRect(0, 0, 600, 600);
	
	    game = new Game(size, startValue, ctx, boardWidth);
	    game.run();
	    window.size = size;
	  };
	
	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const Block = __webpack_require__(3);
	
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


/***/ },
/* 2 */,
/* 3 */
/***/ function(module, exports) {

	class Block {
	  constructor(value, x, y) {
	    this.value = value;
	    this.x = x;
	    this.y = y;
	    this.color = this.getColor();
	  }
	
	
	
	  getColor() {
	    switch (this.value) {
	      case -1:
	        return "grey";
	      case 0:
	        return "pink";
	      case 1:
	        return "yellow";
	      case 2:
	        return "green";
	      case 3:
	        return "pink";
	      case 5:
	        return "blue";
	      case 8:
	        return "white";
	      case 13:
	        return "white";
	      case 21:
	        return "white";
	      case 34:
	        return "white";
	      case 55:
	        return "white";
	      case 89:
	        return "white";
	      case 144:
	        return "white";
	    }
	  }
	}
	
	module.exports = Block;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map