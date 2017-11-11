/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Game__ = __webpack_require__(1);


window.onload = function () {
    __WEBPACK_IMPORTED_MODULE_0__Game__["a" /* default */].init();
};

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Map__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Cell__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Player__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Player___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__Player__);




window.Game = {

    players: {},

    cells: [],

    init: function (map) {
        for (let player of __WEBPACK_IMPORTED_MODULE_0__Map__["a" /* default */].players) {
            this.players[player.id] = {
                id: player.id,
                name: player.name
            };
        }
        for (let i in __WEBPACK_IMPORTED_MODULE_0__Map__["a" /* default */].cells) {
            let cell = new __WEBPACK_IMPORTED_MODULE_1__Cell__["a" /* default */](i, __WEBPACK_IMPORTED_MODULE_0__Map__["a" /* default */].cells[i]);
            cell.id = i;
            this.cells.push(cell);
        }
        console.log(this.players);
        console.log(this.cells);
    },
    // temporary ;)
    updateBoard: function () {
        for (let cell of this.cells) {
            console.log('the cell' + cell.id + ' has ' + cell.population + ' phages');
        }
    }
};

/* harmony default export */ __webpack_exports__["a"] = (Game);

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// x : horizontal position (%)
// y : vertical position (%)
// r : radius (px)
// capacity : how many phages maximum
// speed : time per seconds to create a new phage
// population : !!!
// flag : conquerer's color (false if unconquerd)
const Map = {
    players: [{
        id: 'u11111',
        name: 'mehdi'
    }, {
        id: 'u22222',
        name: 'akbar'
    }],
    cells: [{
        x: 25,
        y: 50,
        r: 100,
        capacity: 100,
        population: 0,
        flag: 'u11111'
    }, {
        x: 75,
        y: 50,
        r: 100,
        capacity: 100,
        population: 0,
        flag: 'u22222'
    }]
};
/* harmony default export */ __webpack_exports__["a"] = (Map);

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Cell {

    constructor(id, opts) {
        this.id = id;
        this.x = opts.x;
        this.y = opts.y;
        this.r = opts.r;
        this.capacity = opts.capacity;
        this.population = opts.population;
        this.flag = opts.flag;

        this.interval = false;
        this.timer();
    }

    send(id) {
        let tosend = Math.floor(this.population / 2);
        this.population -= tosend;
        Game.cells[id].recieve(tosend, this.flag);
    }

    recieve(amount, flag) {
        if (flag == this.flag) this.population += amount;else this.population -= amount;
        if (this.population < 0) {
            // lost the cell
            this.population = -this.population;
            this.flag = flag;
        }
    }

    timer() {
        window.clearInterval(this.interval);
        this.interval = false;
        this.interval = window.setInterval(() => {
            if (!!this.flag) {
                this.population++;
                Game.updateBoard();
            }
        }, 1000);
    }

}

/* harmony default export */ __webpack_exports__["a"] = (Cell);

/***/ }),
/* 4 */
/***/ (function(module, exports) {



/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZGU5MjY0ODI3YzhjMjc3MGJkYWYiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2pzL2VudHJ5LmpzIiwid2VicGFjazovLy8uL3B1YmxpYy9qcy9HYW1lLmpzIiwid2VicGFjazovLy8uL3B1YmxpYy9qcy9NYXAuanMiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2pzL0NlbGwuanMiXSwibmFtZXMiOlsid2luZG93Iiwib25sb2FkIiwiR2FtZSIsImluaXQiLCJwbGF5ZXJzIiwiY2VsbHMiLCJtYXAiLCJwbGF5ZXIiLCJNYXAiLCJpZCIsIm5hbWUiLCJpIiwiY2VsbCIsInB1c2giLCJjb25zb2xlIiwibG9nIiwidXBkYXRlQm9hcmQiLCJwb3B1bGF0aW9uIiwieCIsInkiLCJyIiwiY2FwYWNpdHkiLCJmbGFnIiwiQ2VsbCIsImNvbnN0cnVjdG9yIiwib3B0cyIsImludGVydmFsIiwidGltZXIiLCJzZW5kIiwidG9zZW5kIiwiTWF0aCIsImZsb29yIiwicmVjaWV2ZSIsImFtb3VudCIsImNsZWFySW50ZXJ2YWwiLCJzZXRJbnRlcnZhbCJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7O0FDN0RBOztBQUVBQSxPQUFPQyxNQUFQLEdBQWdCLFlBQVc7QUFDdkJDLElBQUEsc0RBQUFBLENBQUtDLElBQUw7QUFDSCxDQUZELEM7Ozs7Ozs7Ozs7O0FDRkE7QUFDQTtBQUNBOztBQUdBSCxPQUFPRSxJQUFQLEdBQWM7O0FBRVZFLGFBQVMsRUFGQzs7QUFJVkMsV0FBTyxFQUpHOztBQU1WRixVQUFNLFVBQVVHLEdBQVYsRUFBZTtBQUNqQixhQUFLLElBQUlDLE1BQVQsSUFBbUIscURBQUFDLENBQUlKLE9BQXZCLEVBQWdDO0FBQzVCLGlCQUFLQSxPQUFMLENBQWFHLE9BQU9FLEVBQXBCLElBQTBCO0FBQ3RCQSxvQkFBSUYsT0FBT0UsRUFEVztBQUV0QkMsc0JBQU1ILE9BQU9HO0FBRlMsYUFBMUI7QUFJSDtBQUNELGFBQUssSUFBSUMsQ0FBVCxJQUFjLHFEQUFBSCxDQUFJSCxLQUFsQixFQUF5QjtBQUNyQixnQkFBSU8sT0FBTyxJQUFJLHNEQUFKLENBQVNELENBQVQsRUFBWSxxREFBQUgsQ0FBSUgsS0FBSixDQUFVTSxDQUFWLENBQVosQ0FBWDtBQUNBQyxpQkFBS0gsRUFBTCxHQUFVRSxDQUFWO0FBQ0EsaUJBQUtOLEtBQUwsQ0FBV1EsSUFBWCxDQUFnQkQsSUFBaEI7QUFDSDtBQUNERSxnQkFBUUMsR0FBUixDQUFZLEtBQUtYLE9BQWpCO0FBQ0FVLGdCQUFRQyxHQUFSLENBQVksS0FBS1YsS0FBakI7QUFDSCxLQXBCUztBQXFCVjtBQUNBVyxpQkFBYSxZQUFZO0FBQ3JCLGFBQUssSUFBSUosSUFBVCxJQUFpQixLQUFLUCxLQUF0QixFQUE2QjtBQUN6QlMsb0JBQVFDLEdBQVIsQ0FBWSxhQUFhSCxLQUFLSCxFQUFsQixHQUF1QixPQUF2QixHQUFpQ0csS0FBS0ssVUFBdEMsR0FBbUQsU0FBL0Q7QUFDSDtBQUNKO0FBMUJTLENBQWQ7O0FBNkJBLHlEQUFlZixJQUFmLEU7Ozs7Ozs7QUNsQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNTSxNQUFNO0FBQ1JKLGFBQVMsQ0FBQztBQUNGSyxZQUFJLFFBREY7QUFFRkMsY0FBTTtBQUZKLEtBQUQsRUFJTDtBQUNJRCxZQUFJLFFBRFI7QUFFSUMsY0FBTTtBQUZWLEtBSkssQ0FERDtBQVVSTCxXQUFPLENBQUM7QUFDQWEsV0FBRyxFQURIO0FBRUFDLFdBQUcsRUFGSDtBQUdBQyxXQUFHLEdBSEg7QUFJQUMsa0JBQVUsR0FKVjtBQUtBSixvQkFBWSxDQUxaO0FBTUFLLGNBQU07QUFOTixLQUFELEVBUUg7QUFDSUosV0FBRyxFQURQO0FBRUlDLFdBQUcsRUFGUDtBQUdJQyxXQUFHLEdBSFA7QUFJSUMsa0JBQVUsR0FKZDtBQUtJSixvQkFBWSxDQUxoQjtBQU1JSyxjQUFNO0FBTlYsS0FSRztBQVZDLENBQVo7QUE0QkEseURBQWVkLEdBQWYsRTs7Ozs7OztBQ25DQSxNQUFNZSxJQUFOLENBQVc7O0FBR1BDLGdCQUFZZixFQUFaLEVBQWdCZ0IsSUFBaEIsRUFBc0I7QUFDbEIsYUFBS2hCLEVBQUwsR0FBVUEsRUFBVjtBQUNBLGFBQUtTLENBQUwsR0FBU08sS0FBS1AsQ0FBZDtBQUNBLGFBQUtDLENBQUwsR0FBU00sS0FBS04sQ0FBZDtBQUNBLGFBQUtDLENBQUwsR0FBU0ssS0FBS0wsQ0FBZDtBQUNBLGFBQUtDLFFBQUwsR0FBZ0JJLEtBQUtKLFFBQXJCO0FBQ0EsYUFBS0osVUFBTCxHQUFrQlEsS0FBS1IsVUFBdkI7QUFDQSxhQUFLSyxJQUFMLEdBQVlHLEtBQUtILElBQWpCOztBQUVBLGFBQUtJLFFBQUwsR0FBZ0IsS0FBaEI7QUFDQSxhQUFLQyxLQUFMO0FBQ0g7O0FBRURDLFNBQUtuQixFQUFMLEVBQVM7QUFDTCxZQUFJb0IsU0FBU0MsS0FBS0MsS0FBTCxDQUFXLEtBQUtkLFVBQUwsR0FBa0IsQ0FBN0IsQ0FBYjtBQUNBLGFBQUtBLFVBQUwsSUFBbUJZLE1BQW5CO0FBQ0EzQixhQUFLRyxLQUFMLENBQVdJLEVBQVgsRUFBZXVCLE9BQWYsQ0FBdUJILE1BQXZCLEVBQStCLEtBQUtQLElBQXBDO0FBQ0g7O0FBRURVLFlBQVFDLE1BQVIsRUFBZ0JYLElBQWhCLEVBQXNCO0FBQ2xCLFlBQUlBLFFBQVEsS0FBS0EsSUFBakIsRUFBdUIsS0FBS0wsVUFBTCxJQUFtQmdCLE1BQW5CLENBQXZCLEtBQ0ssS0FBS2hCLFVBQUwsSUFBbUJnQixNQUFuQjtBQUNMLFlBQUksS0FBS2hCLFVBQUwsR0FBa0IsQ0FBdEIsRUFBeUI7QUFBRTtBQUN2QixpQkFBS0EsVUFBTCxHQUFrQixDQUFDLEtBQUtBLFVBQXhCO0FBQ0EsaUJBQUtLLElBQUwsR0FBWUEsSUFBWjtBQUNIO0FBQ0o7O0FBRURLLFlBQVE7QUFDSjNCLGVBQU9rQyxhQUFQLENBQXFCLEtBQUtSLFFBQTFCO0FBQ0EsYUFBS0EsUUFBTCxHQUFnQixLQUFoQjtBQUNBLGFBQUtBLFFBQUwsR0FBZ0IxQixPQUFPbUMsV0FBUCxDQUFtQixNQUFNO0FBQ3JDLGdCQUFJLENBQUMsQ0FBQyxLQUFLYixJQUFYLEVBQWlCO0FBQ2IscUJBQUtMLFVBQUw7QUFDQWYscUJBQUtjLFdBQUw7QUFDSDtBQUNKLFNBTGUsRUFLYixJQUxhLENBQWhCO0FBTUg7O0FBeENNOztBQTRDWCx5REFBZU8sSUFBZixFIiwiZmlsZSI6Ii4vcHVibGljL2pzL2J1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGRlOTI2NDgyN2M4YzI3NzBiZGFmIiwiaW1wb3J0IEdhbWUgZnJvbSAnLi9HYW1lJ1xyXG5cclxud2luZG93Lm9ubG9hZCA9IGZ1bmN0aW9uICgpe1xyXG4gICAgR2FtZS5pbml0KCkgICAgXHJcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9wdWJsaWMvanMvZW50cnkuanMiLCJpbXBvcnQgTWFwIGZyb20gJy4vTWFwJ1xyXG5pbXBvcnQgQ2VsbCBmcm9tICcuL0NlbGwnXHJcbmltcG9ydCBQbGF5ZXIgZnJvbSAnLi9QbGF5ZXInXHJcblxyXG5cclxud2luZG93LkdhbWUgPSB7XHJcblxyXG4gICAgcGxheWVyczoge30sXHJcblxyXG4gICAgY2VsbHM6IFtdLFxyXG5cclxuICAgIGluaXQ6IGZ1bmN0aW9uIChtYXApIHtcclxuICAgICAgICBmb3IgKGxldCBwbGF5ZXIgb2YgTWFwLnBsYXllcnMpIHtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXJzW3BsYXllci5pZF0gPSB7XHJcbiAgICAgICAgICAgICAgICBpZDogcGxheWVyLmlkLFxyXG4gICAgICAgICAgICAgICAgbmFtZTogcGxheWVyLm5hbWVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKGxldCBpIGluIE1hcC5jZWxscykge1xyXG4gICAgICAgICAgICBsZXQgY2VsbCA9IG5ldyBDZWxsKGksIE1hcC5jZWxsc1tpXSlcclxuICAgICAgICAgICAgY2VsbC5pZCA9IGlcclxuICAgICAgICAgICAgdGhpcy5jZWxscy5wdXNoKGNlbGwpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMucGxheWVycylcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmNlbGxzKVxyXG4gICAgfSxcclxuICAgIC8vIHRlbXBvcmFyeSA7KVxyXG4gICAgdXBkYXRlQm9hcmQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBmb3IgKGxldCBjZWxsIG9mIHRoaXMuY2VsbHMpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ3RoZSBjZWxsJyArIGNlbGwuaWQgKyAnIGhhcyAnICsgY2VsbC5wb3B1bGF0aW9uICsgJyBwaGFnZXMnKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgR2FtZVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3B1YmxpYy9qcy9HYW1lLmpzIiwiLy8geCA6IGhvcml6b250YWwgcG9zaXRpb24gKCUpXHJcbi8vIHkgOiB2ZXJ0aWNhbCBwb3NpdGlvbiAoJSlcclxuLy8gciA6IHJhZGl1cyAocHgpXHJcbi8vIGNhcGFjaXR5IDogaG93IG1hbnkgcGhhZ2VzIG1heGltdW1cclxuLy8gc3BlZWQgOiB0aW1lIHBlciBzZWNvbmRzIHRvIGNyZWF0ZSBhIG5ldyBwaGFnZVxyXG4vLyBwb3B1bGF0aW9uIDogISEhXHJcbi8vIGZsYWcgOiBjb25xdWVyZXIncyBjb2xvciAoZmFsc2UgaWYgdW5jb25xdWVyZClcclxuY29uc3QgTWFwID0ge1xyXG4gICAgcGxheWVyczogW3tcclxuICAgICAgICAgICAgaWQ6ICd1MTExMTEnLFxyXG4gICAgICAgICAgICBuYW1lOiAnbWVoZGknXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlkOiAndTIyMjIyJyxcclxuICAgICAgICAgICAgbmFtZTogJ2FrYmFyJ1xyXG4gICAgICAgIH1cclxuICAgIF0sXHJcbiAgICBjZWxsczogW3tcclxuICAgICAgICAgICAgeDogMjUsXHJcbiAgICAgICAgICAgIHk6IDUwLFxyXG4gICAgICAgICAgICByOiAxMDAsXHJcbiAgICAgICAgICAgIGNhcGFjaXR5OiAxMDAsXHJcbiAgICAgICAgICAgIHBvcHVsYXRpb246IDAsXHJcbiAgICAgICAgICAgIGZsYWc6ICd1MTExMTEnXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHg6IDc1LFxyXG4gICAgICAgICAgICB5OiA1MCxcclxuICAgICAgICAgICAgcjogMTAwLFxyXG4gICAgICAgICAgICBjYXBhY2l0eTogMTAwLFxyXG4gICAgICAgICAgICBwb3B1bGF0aW9uOiAwLFxyXG4gICAgICAgICAgICBmbGFnOiAndTIyMjIyJ1xyXG4gICAgICAgIH1cclxuICAgIF1cclxufVxyXG5leHBvcnQgZGVmYXVsdCBNYXAgXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcHVibGljL2pzL01hcC5qcyIsImNsYXNzIENlbGwge1xyXG5cclxuXHJcbiAgICBjb25zdHJ1Y3RvcihpZCwgb3B0cykge1xyXG4gICAgICAgIHRoaXMuaWQgPSBpZFxyXG4gICAgICAgIHRoaXMueCA9IG9wdHMueFxyXG4gICAgICAgIHRoaXMueSA9IG9wdHMueVxyXG4gICAgICAgIHRoaXMuciA9IG9wdHMuclxyXG4gICAgICAgIHRoaXMuY2FwYWNpdHkgPSBvcHRzLmNhcGFjaXR5XHJcbiAgICAgICAgdGhpcy5wb3B1bGF0aW9uID0gb3B0cy5wb3B1bGF0aW9uXHJcbiAgICAgICAgdGhpcy5mbGFnID0gb3B0cy5mbGFnXHJcblxyXG4gICAgICAgIHRoaXMuaW50ZXJ2YWwgPSBmYWxzZVxyXG4gICAgICAgIHRoaXMudGltZXIoKVxyXG4gICAgfVxyXG5cclxuICAgIHNlbmQoaWQpIHtcclxuICAgICAgICBsZXQgdG9zZW5kID0gTWF0aC5mbG9vcih0aGlzLnBvcHVsYXRpb24gLyAyKVxyXG4gICAgICAgIHRoaXMucG9wdWxhdGlvbiAtPSB0b3NlbmRcclxuICAgICAgICBHYW1lLmNlbGxzW2lkXS5yZWNpZXZlKHRvc2VuZCwgdGhpcy5mbGFnKVxyXG4gICAgfVxyXG5cclxuICAgIHJlY2lldmUoYW1vdW50LCBmbGFnKSB7XHJcbiAgICAgICAgaWYgKGZsYWcgPT0gdGhpcy5mbGFnKSB0aGlzLnBvcHVsYXRpb24gKz0gYW1vdW50XHJcbiAgICAgICAgZWxzZSB0aGlzLnBvcHVsYXRpb24gLT0gYW1vdW50XHJcbiAgICAgICAgaWYgKHRoaXMucG9wdWxhdGlvbiA8IDApIHsgLy8gbG9zdCB0aGUgY2VsbFxyXG4gICAgICAgICAgICB0aGlzLnBvcHVsYXRpb24gPSAtdGhpcy5wb3B1bGF0aW9uXHJcbiAgICAgICAgICAgIHRoaXMuZmxhZyA9IGZsYWdcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdGltZXIoKSB7XHJcbiAgICAgICAgd2luZG93LmNsZWFySW50ZXJ2YWwodGhpcy5pbnRlcnZhbClcclxuICAgICAgICB0aGlzLmludGVydmFsID0gZmFsc2VcclxuICAgICAgICB0aGlzLmludGVydmFsID0gd2luZG93LnNldEludGVydmFsKCgpID0+IHtcclxuICAgICAgICAgICAgaWYgKCEhdGhpcy5mbGFnKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBvcHVsYXRpb24rK1xyXG4gICAgICAgICAgICAgICAgR2FtZS51cGRhdGVCb2FyZCgpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCAxMDAwKVxyXG4gICAgfVxyXG5cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ2VsbFxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3B1YmxpYy9qcy9DZWxsLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==