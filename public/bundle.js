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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Progress__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__stylesheets_style_scss__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__stylesheets_style_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__stylesheets_style_scss__);



/**
 * Create handlers for all used elements
 */
const animate = document.getElementById('animate');
const hidden = document.getElementById('hide');
const value = document.getElementById('value');
const anchor = document.getElementById('progress');

/**
 * Create progress bar once content of the page is loaded
 * and styles are applied.
 */
window.addEventListener('load', function() {
  const progress = new __WEBPACK_IMPORTED_MODULE_0__Progress__["a" /* default */](anchor, 10, 'normal', 10, 20, 5);
  animate.addEventListener('change', function() {
    console.dir(this);
    console.log('> animation toggled');
    progress.setMod('animated', this.checked ? 'yes' : 'no');
  });
  hidden.addEventListener('change', function() {
    console.log('> hidden toggled');
    progress.setMod('hidden', this.checked ? 'yes' : 'no');
  });
  value.addEventListener('keypress', function(event) {
    // update progress value on Enter
    if (event.keyCode === 13) {
      event.preventDefault(); // prevent form submission
      let value = Number(this.value);
      console.log(`> progress set to ${value}`);
      progress.setValue(value);
    }
  });
});


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Progress class
 */

/**
 * Progress constructor
 * @param anchor : HTMLElement | String - anchor element on which the progress bar will be attached. Can be passed as an element or its ID.
 * @param progress : Number - starting progress value
 * @param mode : 'animated' | 'normal' | 'hidden' - starting progress bar state
 * @param thickness : Number - stroke width. Default is 2.
 * @param expandSpeed : Number - progress bar expansion animation speed. Default is 20.
 * @param rotateSpeed : Number - rotation animation angle speed. Default is 5.
 * @param bgColor : String - color of empty space in progress bar. Default is '#E0E0E0'.
 * @param fgColor : String - color of progress bar. Default is '#FDD835'.
 */
function Progress(
  anchor,
  progress,
  mode,
  thickness = 2,
  expandSpeed = 20,
  rotateSpeed = 5,
  bgColor = '#E0E0E0',
  fgColor = '#FDD835'
) {
  // resolve anchor property
  if (typeof anchor === 'string') {
    this._anchor = document.getElementById(anchor);
  } else {
    this._anchor = anchor;
  }

  // set parameters
  this._animationID = 0; // animation frame request ID (used to cancel animations)
  this._updateID = 0; // update animation frame request ID (used to cancel animations)
  this._thickness = thickness; // line thickness
  this._speed = {
    rotate: rotateSpeed,
    expand: expandSpeed
  }; // animations speed
  this._value = progress; // progress value
  this._current = 0; // current position of the progress (used for animation)
  this._state = {
    hidden: mode === 'hidden',
    animated: mode === 'animated'
  }; // state property
  this._fgColor = fgColor; // progress color
  this._bgColor = bgColor; // bar color
  // render the progress bar
  this.render();
}

/**
 * Method updates progress value
 * @param progress : Number - progress value
 */
Progress.prototype.setValue = function(progress) {
  console.log('> value updated');
  this._value = progress;
  this.render();
};

/**
 * Method sets progress bar mode.
 * Value of 'yes' sets mode, value of 'no' or '' unsets it.
 * Progress bar is re-rendered automatically.
 * @param mode : 'animated' | 'hidden'
 * @param value : 'yes' | 'no' | ''
 */
Progress.prototype.setMod = function(mode, value) {
  console.log('> mode updated');
  // update state
  this._state[mode] = value === 'yes';
  // re-render the view
  this.render();
};

/**
 * Method renders the progress bar depending on its state.
 */
Progress.prototype.render = function() {
  if (this._state.hidden) {
    // Hidden progress bar
    this._anchor.innerHTML = '';
    // cancel any animations
    if (this._animationID !== 0) {
      window.cancelAnimationFrame(this._animationID);
      this._animationID = 0;
      console.log('> animation cancelled');
    }
    if (this._updateID !== 0) {
      window.cancelAnimationFrame(this._updateID);
      this._updateID = 0;
      console.log('> animation cancelled');
    }
  } else {
    // Show progress bar
    this._display(); // show element in case element was hidden
    this._updateAnimation();
    if (this._state.animated) {
      // Animate progress bar if necessary
      if (this._animationID === 0) {
        this._rotateAnimation();
      }
    } else {
      // Cancel animation if there is one planned and reset anchor rotation
      if (this._animationID !== 0) {
        window.cancelAnimationFrame(this._animationID);
        this._animationID = 0;
        this._anchor.style.transform = '';
        console.log('> animation cancelled');
      }
    }
  }
  console.log('> component rendered');
};

/**
 * Updates progress on the progress bar.
 */
Progress.prototype._updateAnimation = function() {
  let previous = Date.now();
  function update() {
    // keep updating the progress bar until it reaches desired value
    if (this._current !== this._value) {
      let current = Date.now();
      let delta = this._speed.expand * (current - previous) / 1000;
      if (this._current > this._value) {
        // reduce
        this._current = Math.max(this._current - delta, this._value);
      } else {
        // expand
        this._current = Math.min(this._current + delta, this._value);
      }
      previous = current;
      this._display();
      this._updateID = window.requestAnimationFrame(update.bind(this));
    }
  }
  // cancel previous animations if present
  if (this._updateID !== 0) {
    window.cancelAnimationFrame(this._updateID);
  }
  // create new request
  this._updateID = window.requestAnimationFrame(update.bind(this));
};

/**
 * Rotate progress wheel.
 */
Progress.prototype._rotateAnimation = function() {
  // derive angle from anchor state if it's already rotated
  let angle = 0;
  if (this._anchor.style.transform) {
    let value = this._anchor.style.transform;
    let pattern = /rotate\(([0-9]*.[0-9]*)((deg)|(rad))\)/;
    let matches = pattern.exec(value);
    if (matches && matches.length > 1) {
      angle = Number(matches[1]);
      console.log(`> angle derived: ${angle}`);
    }
  }
  let previous = Date.now();

  function rotate() {
    let current = Date.now();
    angle += (current - previous) * this._speed.rotate / 1000;
    previous = current;
    this._anchor.style.transform = `rotate(${angle}rad)`;
    this._animationID = window.requestAnimationFrame(rotate.bind(this));
  }
  this._animationID = window.requestAnimationFrame(rotate.bind(this));
};

/**
 * Display progress bar depending on the size of anchor element.
 */
Progress.prototype._display = function() {
  // create props object
  const width = this._anchor.clientWidth;
  const height = this._anchor.clientHeight;
  const radius = (Math.min(width, height) - this._thickness) / 2;
  const props = {
    radius,
    width,
    height,
    thickness: this._thickness,
    fgColor: this._fgColor,
    bgColor: this._bgColor,
    centerX: width / 2,
    centerY: height / 2,
    progress: this._current
  };
  // create path
  const path = createPath(props);
  // put path on the anchor element
  this._anchor.innerHTML = path;
};

/**
 * Create path based on properties object
 * @param props : Object - properties object
 */
function createPath(props) {
  // create path for the bar
  let path = `
    <g stroke="${props.bgColor}" stroke-width="${props.thickness}" fill="none">
      <path 
        d="
          M ${props.centerX},${props.centerY - props.radius}
          a ${props.radius},${props.radius} 0 0,1 0,${2 * props.radius}
          a ${props.radius},${props.radius} 0 0,1 0,${-2 * props.radius}
        "
      />
    </g>
  `;
  // calculate end coordinates of the progress
  const angle = props.progress * Math.PI * 2 / 100;
  const x = Math.sin(angle) * props.radius + props.centerX;
  const y = props.centerY - Math.cos(angle) * props.radius;
  // append path for progress
  if (props.progress > 50) {
    // make a progress path out of two arcs
    path += `
      <g stroke="${props.fgColor}" stroke-width="${
      props.thickness
    }" fill="none">
        <path
          d="
            M ${props.centerX},${props.centerY - props.radius}
            a ${props.radius},${props.radius} 0 0,1 0,${2 * props.radius}
            A ${props.radius},${props.radius} 0 0,1 ${x},${y}
          "
        />
      </g>
    `;
  } else {
    // make a progress path with one arc
    path += `
      <g stroke="${props.fgColor}" stroke-width="${
      props.thickness
    }" fill="none">
        <path
          d="
            M ${props.centerX},${props.centerY - props.radius}
            A ${props.radius},${props.radius} 0 0,1 ${x},${y}
          "
        />
      </g>
    `;
  }

  // create svg element for the path
  let rendered = `
    <svg width="${props.width}" height="${props.height}" version="1.1">
      ${path}
    </svg>
  `;
  return rendered;
}

/* harmony default export */ __webpack_exports__["a"] = (Progress);


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(3);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(5)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {
	module.hot.accept("!!../node_modules/css-loader/index.js?sourceMap!../node_modules/ruby-sass-loader/index.js?sourceMap!./style.scss", function() {
		var newContent = require("!!../node_modules/css-loader/index.js?sourceMap!../node_modules/ruby-sass-loader/index.js?sourceMap!./style.scss");

		if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)(true);
// imports


// module
exports.push([module.i, ".switch .check {\n  display: none; }\n.switch .label {\n  display: inline-block;\n  position: relative;\n  overflow: hidden;\n  cursor: pointer;\n  height: 1.75rem;\n  width: 3rem;\n  box-sizing: border-box;\n  padding: 0;\n  margin: 0;\n  border: 2px solid #9e9e9e;\n  border-radius: 0.875rem;\n  background: #9e9e9e;\n  transition: background-color 0.3s ease-in-out; }\n.switch .label:before {\n  content: \"\";\n  display: block;\n  background: #ffffff;\n  margin: 0;\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  right: 1.25rem;\n  width: calc(1.75rem - 4px);\n  border-radius: 0.875rem;\n  transition: right 0.3s ease-out 0s; }\n.switch .check:checked + .label {\n  background: #00c853;\n  border-color: #00c853; }\n.switch .check:checked + .label:before {\n  right: 0; }\n\nhtml {\n  padding: 0;\n  margin: 0; }\n\nbody {\n  margin: 0;\n  padding: 1rem;\n  box-sizing: border-box;\n  width: 100vw;\n  height: 100vh;\n  display: flex;\n  justify-content: space-around;\n  align-items: center; }\n  body .progress-container {\n    flex: 1;\n    display: flex;\n    justify-content: center;\n    align-items: center; }\n  body .controls-container {\n    flex: 1;\n    display: flex;\n    justify-content: center;\n    align-items: center; }\n\n.header {\n  top: 1rem;\n  left: 1rem;\n  position: absolute; }\n\n@media screen and (orientation: portrait) {\n  body {\n    flex-direction: column; } }\n@media screen and (orientation: landscape) {\n  body {\n    flex-direction: row; } }\nbody {\n  font: normal 300 1rem Helvetica, Arial, sans-serif; }\n\n.header {\n  margin: 0;\n  padding: 0;\n  font: normal 500 2rem Helvetica, Arial, sans-serif; }\n\n.progress {\n  display: inline-block;\n  width: 12rem;\n  height: 12rem; }\n\nform {\n  padding: 0.5rem; }\n  form > * {\n    padding: 0.125rem; }\n  form :first-child {\n    padding-top: 0; }\n  form :last-child {\n    padding-bottom: 0; }\n\n.form-group {\n  display: flex;\n  flex-direction: row;\n  justify-content: flex-start;\n  align-items: center; }\n  .form-group * {\n    margin: 0;\n    padding: 0; }\n  .form-group :first-child {\n    margin-right: 0.5rem; }\n  .form-group input[type=\"number\"]::-webkit-outer-spin-button,\n  .form-group input[type=\"number\"]::-webkit-inner-spin-button {\n    -webkit-appearance: none;\n    margin: 0; }\n  .form-group input[type=\"number\"] {\n    -moz-appearance: textfield;\n    width: 3rem;\n    height: 1.75rem;\n    border-radius: 0.875rem;\n    border: 1px solid #212121;\n    outline: none;\n    padding: 0 0.4375rem;\n    box-sizing: border-box;\n    font: normal 300 0.9rem Helvetica, Arial, sans-serif; }\n\n\n", "", {"version":3,"sources":["/Users/paper-lark/Documents/Workplace/Javascript/Projects/progress-yandex/stylesheets/partials/_switch.scss","/Users/paper-lark/Documents/Workplace/Javascript/Projects/progress-yandex/stylesheets/partials/_variables.scss","/Users/paper-lark/Documents/Workplace/Javascript/Projects/progress-yandex/stylesheets/partials/_colors.scss","/Users/paper-lark/Documents/Workplace/Javascript/Projects/progress-yandex/stylesheets/partials/_layout.scss","/Users/paper-lark/Documents/Workplace/Javascript/Projects/progress-yandex/stylesheets/partials/_typography.scss","/Users/paper-lark/Documents/Workplace/Javascript/Projects/progress-yandex/stylesheets/partials/_progress.scss","/Users/paper-lark/Documents/Workplace/Javascript/Projects/progress-yandex/stylesheets/partials/_form.scss"],"names":[],"mappings":"AAEE;EACE,cAAa,EAAA;AAIf;EACE,sBAAqB;EACrB,mBAAkB;EAClB,iBAAgB;EAChB,gBAAe;EACf,gBCVmB;EDWnB,YCZe;EDaf,uBAAsB;EACtB,WAAU;EACV,UAAS;EACT,0BAAoD;EACpD,wBAAiC;EACjC,oBEjBuB;EFkBvB,8CAA6C,EAAA;AAI/C;EACE,YAAW;EACX,eAAc;EACd,oBEvByB;EFwBzB,UAAS;EACT,mBAAkB;EAClB,OAAM;EACN,UAAS;EACT,eAAqC;EAErC,2BAA2D;EAC3D,wBAAiC;EACjC,mCAAkC,EAAA;AAIpC;EACE,oBEtC+B;EFuC/B,sBEvC+B,EAAA;AF2CjC;EACE,SAAQ,EAAA;;AG9CZ;EACE,WAAU;EACV,UAAS,EAAA;;AAGX;EACE,UAAS;EACT,cFGiB;EEFjB,uBAAsB;EACtB,aAAY;EACZ,cAAa;EAEb,cAAa;EACb,8BAA6B;EAC7B,oBAAmB,EAAA;EAEnB;IACE,QAAO;IACP,cAAa;IACb,wBAAuB;IACvB,oBAAmB,EAAA;EAErB;IACE,QAAO;IACP,cAAa;IACb,wBAAuB;IACvB,oBAAmB,EAAA;;AAKvB;EACE,UFtBiB;EEuBjB,WFvBiB;EEwBjB,mBAAkB,EAAA;;AAIpB;EACE;IACE,uBAAsB,EAAA,EAAA;AAK1B;EACE;IACE,oBAAmB,EAAA,EAAA;AC/CvB;EACE,mDAAgE,EAAA;;AAIlE;EACE,UAAS;EACT,WAAU;EACV,mDAA2D,EAAA;;ACR7D;EACE,sBAAqB;EACrB,aJoBmB;EInBnB,cJmBmB,EAAA;;AKtBrB;EACE,gBLYmB,EAAA;EKVnB;IACE,kBLUmB,EAAA;EKPrB;IACE,eAAc,EAAA;EAGhB;IACE,kBAAiB,EAAA;;AAKrB;EACE,cAAa;EACb,oBAAmB;EACnB,4BAA2B;EAC3B,oBAAmB,EAAA;EAEnB;IACE,UAAS;IACT,WAAU,EAAA;EAGZ;IACE,qBLduB,EAAA;EKkBzB;;IAEE,yBAAwB;IACxB,UAAS,EAAA;EAGX;IAEE,2BAA0B;IAC1B,YLxBuB;IKyBvB,gBLxByB;IKyBzB,wBAAgC;IAChC,0BAA+B;IAC/B,cAAa;IACb,qBAA4B;IAC5B,uBAAsB;IACtB,qDAA8D,EAAA","file":"style.scss","sourcesContent":[".switch {\n  // Hide the default checkbox.\n  .check {\n    display: none;\n  }\n\n  // Create background element. Should a label tag.\n  .label {\n    display: inline-block;\n    position: relative;\n    overflow: hidden;\n    cursor: pointer;\n    height: $switch-height;\n    width: $switch-width;\n    box-sizing: border-box;\n    padding: 0;\n    margin: 0;\n    border: $switch-border-size solid $switch-background;\n    border-radius: $switch-height / 2;\n    background: $switch-background;\n    transition: background-color 0.3s ease-in-out;\n  }\n\n  // Create state circle\n  .label:before {\n    content: \"\";\n    display: block;\n    background: $switch-toggle-color;\n    margin: 0;\n    position: absolute;\n    top: 0;\n    bottom: 0;\n    right: $switch-width - $switch-height;\n    // border: 1px solid $switch-background;\n    width: calc(#{$switch-height} - #{2 * $switch-border-size});\n    border-radius: $switch-height / 2;\n    transition: right 0.3s ease-out 0s;\n  }\n\n  // Change background color on check\n  .check:checked + .label {\n    background: $switch-background-checked;\n    border-color: $switch-background-checked;\n  }\n\n  // Move the circle on check\n  .check:checked + .label:before {\n    right: 0;\n  }\n}\n","// Switch size\n$switch-width: 3rem;\n$switch-height: 1.75rem;\n$switch-border-size: 2px;\n\n// Font sizing\n$default-font-size: 1rem;\n$h1-font-size: 2rem;\n$input-font-size: 0.9rem;\n\n// Paddings\n$body-padding: 1rem;\n\n// Form\n$form-padding: 0.5rem;\n$form-spacing: 0.125rem;\n$form-group-spacing: 0.5rem;\n\n// Text input\n$input-width: $switch-width;\n$input-height: $switch-height;\n\n// Progress wheel\n$progress-size: 12rem;\n","// Switch colors\n$border-color: #212121;\n$switch-background: #9e9e9e;\n$switch-background-checked: #00c853;\n$switch-toggle-color: #ffffff;\n","// Remove margins on the html element\nhtml {\n  padding: 0;\n  margin: 0;\n}\n// Set up body layout\nbody {\n  margin: 0;\n  padding: $body-padding;\n  box-sizing: border-box;\n  width: 100vw;\n  height: 100vh;\n\n  display: flex;\n  justify-content: space-around;\n  align-items: center;\n\n  .progress-container {\n    flex: 1;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n  }\n  .controls-container {\n    flex: 1;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n  }\n}\n\n// Place header in the top-left corner\n.header {\n  top: $body-padding;\n  left: $body-padding;\n  position: absolute;\n}\n\n// Media query for portrait orientation\n@media screen and (orientation: portrait) {\n  body {\n    flex-direction: column;\n  }\n}\n\n// Media query for landscape orientation\n@media screen and (orientation: landscape) {\n  body {\n    flex-direction: row;\n  }\n}\n","// Set the default font\nbody {\n  font: normal 300 $default-font-size Helvetica, Arial, sans-serif;\n}\n\n// Set text parameters for the header\n.header {\n  margin: 0;\n  padding: 0;\n  font: normal 500 $h1-font-size Helvetica, Arial, sans-serif;\n}\n","// Progress wheel\n.progress {\n  display: inline-block;\n  width: $progress-size;\n  height: $progress-size;\n}\n","// Form\nform {\n  padding: $form-padding;\n\n  > * {\n    padding: $form-spacing;\n  }\n\n  :first-child {\n    padding-top: 0;\n  }\n\n  :last-child {\n    padding-bottom: 0;\n  }\n}\n\n// Form group\n.form-group {\n  display: flex;\n  flex-direction: row;\n  justify-content: flex-start;\n  align-items: center;\n\n  * {\n    margin: 0;\n    padding: 0;\n  }\n\n  :first-child {\n    margin-right: $form-group-spacing;\n  }\n\n  // Hide spin buttons on input field\n  input[type=\"number\"]::-webkit-outer-spin-button,\n  input[type=\"number\"]::-webkit-inner-spin-button {\n    -webkit-appearance: none;\n    margin: 0;\n  }\n\n  input[type=\"number\"] {\n    // Hide spin buttons on input field in Firefox\n    -moz-appearance: textfield;\n    width: $input-width;\n    height: $input-height;\n    border-radius: $input-height / 2;\n    border: 1px solid $border-color;\n    outline: none;\n    padding: 0 $input-height / 4;\n    box-sizing: border-box;\n    font: normal 300 $input-font-size Helvetica, Arial, sans-serif;\n  }\n}\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 4 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getTarget = function (target) {
  return document.querySelector(target);
};

var getElement = (function (fn) {
	var memo = {};

	return function(target) {
                // If passing function in options, then use it for resolve "head" element.
                // Useful for Shadow Root style i.e
                // {
                //   insertInto: function () { return document.querySelector("#foo").shadowRoot }
                // }
                if (typeof target === 'function') {
                        return target();
                }
                if (typeof memo[target] === "undefined") {
			var styleTarget = getTarget.call(this, target);
			// Special case to return head of iframe instead of iframe itself
			if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[target] = styleTarget;
		}
		return memo[target]
	};
})();

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(6);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
        if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertInto + " " + options.insertAt.before);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 6 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ })
/******/ ]);