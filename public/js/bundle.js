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

    player: false,

    map: __WEBPACK_IMPORTED_MODULE_0__Map__["a" /* default */],

    cells: [],

    init: function (map) {
        for (let i in this.map.cells) {
            let cell = new __WEBPACK_IMPORTED_MODULE_1__Cell__["a" /* default */](this.map.cells[i]);
            cell.id = i;
            this.cells.push(cell);
        }
        console.log(this.cells);
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
    cells: [{
        x: 25,
        y: 50,
        r: 100,
        capacity: 100,
        speed: 1,
        population: 0,
        flag: false
    }, {
        x: 75,
        y: 50,
        r: 100,
        capacity: 100,
        speed: 1,
        population: 0,
        flag: false
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
        this.speed = opts.speed;
        this.population = opts.population;
        this.flag = opts.flag;

        this.interval = false;
    }

    send(id) {
        this.population /= 2;
        Game.cells[id].recieve(this.population, thi);
    }

    recieve(amount, flag) {
        if (flag == this.flag) this.population += amount;else this.population -= amount;
        if (this.population < 0) {
            // lost the cell
            this.population = -this.population;
            this.flag = flag;
        }
    }

    timer(secs) {
        window.clearInterval(this.timer);
    }

}

/* harmony default export */ __webpack_exports__["a"] = (Cell);

/***/ }),
/* 4 */
/***/ (function(module, exports) {



/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgODMxZTI1ZGI1MjFiZTJlZDVkYmIiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2pzL2VudHJ5LmpzIiwid2VicGFjazovLy8uL3B1YmxpYy9qcy9HYW1lLmpzIiwid2VicGFjazovLy8uL3B1YmxpYy9qcy9NYXAuanMiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2pzL0NlbGwuanMiXSwibmFtZXMiOlsid2luZG93Iiwib25sb2FkIiwiR2FtZSIsImluaXQiLCJwbGF5ZXIiLCJtYXAiLCJjZWxscyIsImkiLCJjZWxsIiwiaWQiLCJwdXNoIiwiY29uc29sZSIsImxvZyIsIk1hcCIsIngiLCJ5IiwiciIsImNhcGFjaXR5Iiwic3BlZWQiLCJwb3B1bGF0aW9uIiwiZmxhZyIsIkNlbGwiLCJjb25zdHJ1Y3RvciIsIm9wdHMiLCJpbnRlcnZhbCIsInNlbmQiLCJyZWNpZXZlIiwidGhpIiwiYW1vdW50IiwidGltZXIiLCJzZWNzIiwiY2xlYXJJbnRlcnZhbCJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7O0FDN0RBOztBQUVBQSxPQUFPQyxNQUFQLEdBQWdCLFlBQVc7QUFDdkJDLElBQUEsc0RBQUFBLENBQUtDLElBQUw7QUFDSCxDQUZELEM7Ozs7Ozs7Ozs7O0FDRkE7QUFDQTtBQUNBOztBQUVBSCxPQUFPRSxJQUFQLEdBQWM7O0FBRVZFLFlBQVEsS0FGRTs7QUFJVkMsU0FBSyxxREFKSzs7QUFNVkMsV0FBTyxFQU5HOztBQVFWSCxVQUFNLFVBQVVFLEdBQVYsRUFBZTtBQUNqQixhQUFLLElBQUlFLENBQVQsSUFBYyxLQUFLRixHQUFMLENBQVNDLEtBQXZCLEVBQThCO0FBQzFCLGdCQUFJRSxPQUFPLElBQUksc0RBQUosQ0FBUyxLQUFLSCxHQUFMLENBQVNDLEtBQVQsQ0FBZUMsQ0FBZixDQUFULENBQVg7QUFDQUMsaUJBQUtDLEVBQUwsR0FBVUYsQ0FBVjtBQUNBLGlCQUFLRCxLQUFMLENBQVdJLElBQVgsQ0FBZ0JGLElBQWhCO0FBQ0g7QUFDREcsZ0JBQVFDLEdBQVIsQ0FBWSxLQUFLTixLQUFqQjtBQUNIOztBQWZTLENBQWQ7O0FBbUJBLHlEQUFlSixJQUFmLEU7Ozs7Ozs7QUN2QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsTUFBTVcsTUFBTTtBQUNSUCxXQUFPLENBQUM7QUFDQVEsV0FBRyxFQURIO0FBRUFDLFdBQUcsRUFGSDtBQUdBQyxXQUFHLEdBSEg7QUFJQUMsa0JBQVUsR0FKVjtBQUtBQyxlQUFPLENBTFA7QUFNQUMsb0JBQVksQ0FOWjtBQU9BQyxjQUFPO0FBUFAsS0FBRCxFQVNIO0FBQ0lOLFdBQUcsRUFEUDtBQUVJQyxXQUFHLEVBRlA7QUFHSUMsV0FBRyxHQUhQO0FBSUlDLGtCQUFVLEdBSmQ7QUFLSUMsZUFBTyxDQUxYO0FBTUlDLG9CQUFZLENBTmhCO0FBT0lDLGNBQU87QUFQWCxLQVRHO0FBREMsQ0FBWjs7QUF1QkEseURBQWVQLEdBQWYsRTs7Ozs7OztBQy9CQSxNQUFNUSxJQUFOLENBQVc7O0FBR1BDLGdCQUFZYixFQUFaLEVBQWdCYyxJQUFoQixFQUFzQjtBQUNsQixhQUFLZCxFQUFMLEdBQVVBLEVBQVY7QUFDQSxhQUFLSyxDQUFMLEdBQVNTLEtBQUtULENBQWQ7QUFDQSxhQUFLQyxDQUFMLEdBQVNRLEtBQUtSLENBQWQ7QUFDQSxhQUFLQyxDQUFMLEdBQVNPLEtBQUtQLENBQWQ7QUFDQSxhQUFLQyxRQUFMLEdBQWdCTSxLQUFLTixRQUFyQjtBQUNBLGFBQUtDLEtBQUwsR0FBYUssS0FBS0wsS0FBbEI7QUFDQSxhQUFLQyxVQUFMLEdBQWtCSSxLQUFLSixVQUF2QjtBQUNBLGFBQUtDLElBQUwsR0FBWUcsS0FBS0gsSUFBakI7O0FBRUEsYUFBS0ksUUFBTCxHQUFpQixLQUFqQjtBQUVIOztBQUVEQyxTQUFLaEIsRUFBTCxFQUFTO0FBQ0wsYUFBS1UsVUFBTCxJQUFtQixDQUFuQjtBQUNBakIsYUFBS0ksS0FBTCxDQUFXRyxFQUFYLEVBQWVpQixPQUFmLENBQXVCLEtBQUtQLFVBQTVCLEVBQXdDUSxHQUF4QztBQUNIOztBQUVERCxZQUFRRSxNQUFSLEVBQWdCUixJQUFoQixFQUFzQjtBQUNsQixZQUFJQSxRQUFRLEtBQUtBLElBQWpCLEVBQXVCLEtBQUtELFVBQUwsSUFBbUJTLE1BQW5CLENBQXZCLEtBQ0ssS0FBS1QsVUFBTCxJQUFtQlMsTUFBbkI7QUFDTCxZQUFJLEtBQUtULFVBQUwsR0FBa0IsQ0FBdEIsRUFBeUI7QUFBRTtBQUN2QixpQkFBS0EsVUFBTCxHQUFrQixDQUFDLEtBQUtBLFVBQXhCO0FBQ0EsaUJBQUtDLElBQUwsR0FBWUEsSUFBWjtBQUNIO0FBQ0o7O0FBRURTLFVBQU1DLElBQU4sRUFBWTtBQUNSOUIsZUFBTytCLGFBQVAsQ0FBcUIsS0FBS0YsS0FBMUI7QUFDSDs7QUFqQ007O0FBcUNYLHlEQUFlUixJQUFmLEUiLCJmaWxlIjoiLi9wdWJsaWMvanMvYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgODMxZTI1ZGI1MjFiZTJlZDVkYmIiLCJpbXBvcnQgR2FtZSBmcm9tICcuL0dhbWUnXHJcblxyXG53aW5kb3cub25sb2FkID0gZnVuY3Rpb24gKCl7XHJcbiAgICBHYW1lLmluaXQoKSAgICBcclxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3B1YmxpYy9qcy9lbnRyeS5qcyIsImltcG9ydCBNYXAgZnJvbSAnLi9NYXAnXHJcbmltcG9ydCBDZWxsIGZyb20gJy4vQ2VsbCdcclxuaW1wb3J0IFBsYXllciBmcm9tICcuL1BsYXllcidcclxuXHJcbndpbmRvdy5HYW1lID0ge1xyXG5cclxuICAgIHBsYXllcjogZmFsc2UsXHJcblxyXG4gICAgbWFwOiBNYXAsXHJcblxyXG4gICAgY2VsbHM6IFtdLFxyXG5cclxuICAgIGluaXQ6IGZ1bmN0aW9uIChtYXApIHtcclxuICAgICAgICBmb3IgKGxldCBpIGluIHRoaXMubWFwLmNlbGxzKSB7XHJcbiAgICAgICAgICAgIGxldCBjZWxsID0gbmV3IENlbGwodGhpcy5tYXAuY2VsbHNbaV0pXHJcbiAgICAgICAgICAgIGNlbGwuaWQgPSBpXHJcbiAgICAgICAgICAgIHRoaXMuY2VsbHMucHVzaChjZWxsKVxyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmNlbGxzKSAgICAgICAgXHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBHYW1lXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcHVibGljL2pzL0dhbWUuanMiLCIvLyB4IDogaG9yaXpvbnRhbCBwb3NpdGlvbiAoJSlcclxuLy8geSA6IHZlcnRpY2FsIHBvc2l0aW9uICglKVxyXG4vLyByIDogcmFkaXVzIChweClcclxuLy8gY2FwYWNpdHkgOiBob3cgbWFueSBwaGFnZXMgbWF4aW11bVxyXG4vLyBzcGVlZCA6IHRpbWUgcGVyIHNlY29uZHMgdG8gY3JlYXRlIGEgbmV3IHBoYWdlXHJcbi8vIHBvcHVsYXRpb24gOiAhISFcclxuLy8gZmxhZyA6IGNvbnF1ZXJlcidzIGNvbG9yIChmYWxzZSBpZiB1bmNvbnF1ZXJkKVxyXG5cclxuY29uc3QgTWFwID0ge1xyXG4gICAgY2VsbHM6IFt7XHJcbiAgICAgICAgICAgIHg6IDI1LFxyXG4gICAgICAgICAgICB5OiA1MCxcclxuICAgICAgICAgICAgcjogMTAwLFxyXG4gICAgICAgICAgICBjYXBhY2l0eTogMTAwLFxyXG4gICAgICAgICAgICBzcGVlZDogMSxcclxuICAgICAgICAgICAgcG9wdWxhdGlvbjogMCxcclxuICAgICAgICAgICAgZmxhZyA6IGZhbHNlXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHg6IDc1LFxyXG4gICAgICAgICAgICB5OiA1MCxcclxuICAgICAgICAgICAgcjogMTAwLFxyXG4gICAgICAgICAgICBjYXBhY2l0eTogMTAwLFxyXG4gICAgICAgICAgICBzcGVlZDogMSxcclxuICAgICAgICAgICAgcG9wdWxhdGlvbjogMCxcclxuICAgICAgICAgICAgZmxhZyA6IGZhbHNlXHJcbiAgICAgICAgfVxyXG4gICAgXVxyXG59XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgTWFwXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcHVibGljL2pzL01hcC5qcyIsImNsYXNzIENlbGwge1xyXG5cclxuXHJcbiAgICBjb25zdHJ1Y3RvcihpZCwgb3B0cykge1xyXG4gICAgICAgIHRoaXMuaWQgPSBpZFxyXG4gICAgICAgIHRoaXMueCA9IG9wdHMueFxyXG4gICAgICAgIHRoaXMueSA9IG9wdHMueVxyXG4gICAgICAgIHRoaXMuciA9IG9wdHMuclxyXG4gICAgICAgIHRoaXMuY2FwYWNpdHkgPSBvcHRzLmNhcGFjaXR5XHJcbiAgICAgICAgdGhpcy5zcGVlZCA9IG9wdHMuc3BlZWRcclxuICAgICAgICB0aGlzLnBvcHVsYXRpb24gPSBvcHRzLnBvcHVsYXRpb25cclxuICAgICAgICB0aGlzLmZsYWcgPSBvcHRzLmZsYWdcclxuXHJcbiAgICAgICAgdGhpcy5pbnRlcnZhbCA9ICBmYWxzZVxyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIHNlbmQoaWQpIHtcclxuICAgICAgICB0aGlzLnBvcHVsYXRpb24gLz0gMlxyXG4gICAgICAgIEdhbWUuY2VsbHNbaWRdLnJlY2lldmUodGhpcy5wb3B1bGF0aW9uLCB0aGkpXHJcbiAgICB9XHJcblxyXG4gICAgcmVjaWV2ZShhbW91bnQsIGZsYWcpIHtcclxuICAgICAgICBpZiAoZmxhZyA9PSB0aGlzLmZsYWcpIHRoaXMucG9wdWxhdGlvbiArPSBhbW91bnRcclxuICAgICAgICBlbHNlIHRoaXMucG9wdWxhdGlvbiAtPSBhbW91bnRcclxuICAgICAgICBpZiAodGhpcy5wb3B1bGF0aW9uIDwgMCkgeyAvLyBsb3N0IHRoZSBjZWxsXHJcbiAgICAgICAgICAgIHRoaXMucG9wdWxhdGlvbiA9IC10aGlzLnBvcHVsYXRpb25cclxuICAgICAgICAgICAgdGhpcy5mbGFnID0gZmxhZ1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB0aW1lcihzZWNzKSB7XHJcbiAgICAgICAgd2luZG93LmNsZWFySW50ZXJ2YWwodGhpcy50aW1lcilcclxuICAgIH1cclxuXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IENlbGxcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9wdWJsaWMvanMvQ2VsbC5qcyJdLCJzb3VyY2VSb290IjoiIn0=