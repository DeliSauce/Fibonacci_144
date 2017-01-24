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

	const Game = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./game\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
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
	    ctx.clearRect(0, 0, boardWidth, boardWidth);
	
	    game = new Game(size, startValue, ctx, boardWidth);
	    game.run();
	    window.size = size;
	  };
	
	});


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map