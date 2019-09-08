var WheelRandom =
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.tsx");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/color.tsx":
/*!***********************!*\
  !*** ./src/color.tsx ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class Color {
    constructor(r, g, b, a) {
        this.r_ = r;
        this.g_ = g;
        this.b_ = b;
        this.a_ = a;
    }
    get r() {
        return this.r_;
    }
    get g() {
        return this.g_;
    }
    get b() {
        return this.b_;
    }
    get a() {
        return this.a_;
    }
    get luminance() {
        return 0.2126 * this.r_ + 0.7152 * this.g_ + 0.0722 * this.b_;
    }
    toRGBA() {
        return `rgba(${this.r_ * 255}, ${this.g_ * 255}, ${this.b_ * 255}, ${this.a_})`;
    }
    static fromRGB(rgbOrR, gOrNull = null, bOrNull = null) {
        if (typeof rgbOrR === 'number' &&
            typeof gOrNull === 'number' &&
            typeof bOrNull === 'number') {
            const r = rgbOrR;
            const g = gOrNull;
            const b = bOrNull;
            return new Color(r, g, b, 1);
        }
        if (typeof rgbOrR === 'object') {
            const { r, g, b } = rgbOrR;
            return new Color(r, g, b, 1);
        }
        throw 'Invalid arguments';
    }
    static HSLtoRGB(h, s, l) {
        let r, g, b;
        if (s == 0) {
            r = g = b = l; // achromatic
        }
        else {
            const hue2rgb = function hue2rgb(p, q, t) {
                if (t < 0)
                    t += 1;
                if (t > 1)
                    t -= 1;
                if (t < 1 / 6)
                    return p + (q - p) * 6 * t;
                if (t < 1 / 2)
                    return q;
                if (t < 2 / 3)
                    return p + (q - p) * (2 / 3 - t) * 6;
                return p;
            };
            const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            const p = 2 * l - q;
            r = hue2rgb(p, q, h + 1 / 3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1 / 3);
        }
        return { r, g, b };
    }
    static fromHSL(h, s, l) {
        return Color.fromRGB(this.HSLtoRGB(h, s, l));
    }
}
exports.Color = Color;
Color.WHITE = new Color(1, 1, 1, 1);
Color.BLACK = new Color(0, 0, 0, 1);


/***/ }),

/***/ "./src/index.tsx":
/*!***********************!*\
  !*** ./src/index.tsx ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(/*! react */ "react");
const ReactDOM = __webpack_require__(/*! react-dom */ "react-dom");
const spinner_1 = __webpack_require__(/*! ./spinner */ "./src/spinner.tsx");
const entries = [
    { label: '1', weight: 2 },
    { label: '2', weight: 1 },
    { label: '3', weight: 1 }
];
ReactDOM.render(
//   <Spinner
//     entries={entries}
//     duration={5}
//     target={2 * Math.PI * (3 * Math.random() + 7)}
//   />,
React.createElement(spinner_1.SpinnerWithButton, { entries: entries, duration: 5 }), document.getElementById('root'));


/***/ }),

/***/ "./src/spinner.tsx":
/*!*************************!*\
  !*** ./src/spinner.tsx ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(/*! react */ "react");
const wheel_1 = __webpack_require__(/*! ./wheel */ "./src/wheel.tsx");
const utils_1 = __webpack_require__(/*! ./utils */ "./src/utils.tsx");
const FOCUS_DURATION = 1;
class Spinner extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            t: 0
        };
        this.tick = () => {
            this.setState(prevState => {
                if (prevState.t + 1.0 / 60 < this.props.duration + FOCUS_DURATION) {
                    requestAnimationFrame(this.tick);
                }
                return {
                    t: prevState.t + 1.0 / 60
                };
            });
        };
    }
    componentDidMount() {
        requestAnimationFrame(this.tick);
    }
    render() {
        const { entries, duration, target } = this.props;
        const { t } = this.state;
        const angularOffset = utils_1.easeIn({ duration, end: target }, t);
        const tFocus = utils_1.clamp((t - duration) / FOCUS_DURATION, 0, 1);
        return (React.createElement(React.Fragment, null,
            React.createElement("div", { style: {
                    position: 'absolute',
                    left: 80,
                    top: 285,
                    fontSize: 20,
                    opacity: 1 - tFocus
                } }, "\u2014"),
            React.createElement(wheel_1.Wheel, { entries: entries, angularOffset: angularOffset, tFocus: tFocus })));
    }
}
exports.Spinner = Spinner;
Spinner.defaultProps = {
    onFinish() { }
};
class SpinnerWithButton extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            spinning: false,
            target: 0
        };
        this.spin = () => {
            this.setState({
                spinning: true,
                target: 2 * Math.PI * (3 * Math.random() + 7)
            });
        };
    }
    render() {
        return (React.createElement(React.Fragment, null,
            this.state.spinning && (React.createElement(Spinner, { entries: this.props.entries, duration: this.props.duration, target: this.state.target })),
            !this.state.spinning && React.createElement(wheel_1.Wheel, { entries: this.props.entries }),
            React.createElement("input", { type: "button", onClick: this.spin, disabled: this.state.spinning, value: "SPIN", style: { width: 100, position: 'absolute', left: 250, top: 550 } })));
    }
}
exports.SpinnerWithButton = SpinnerWithButton;


/***/ }),

/***/ "./src/utils.tsx":
/*!***********************!*\
  !*** ./src/utils.tsx ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.sum = (arr) => arr.reduce((a, b) => a + b, 0);
exports.cumsum = (arr) => {
    const result = [0];
    for (let i = 0; i < arr.length; i++) {
        result[i + 1] = result[i] + arr[i];
    }
    return result.slice(1);
};
exports.clamp = (x, min, max) => Math.max(min, Math.min(max, x));
exports.easeIn = (params, t) => {
    const { duration = 1, start = 0, end = 1, degree = 5 } = params;
    const t_ = exports.clamp(t, 0, duration);
    return (end - start) * (1 - Math.pow(1 - t_ / duration, degree)) + start;
};
exports.lnnr = (x, m) => (x < 0 ? (x % m) + m : x % m);
exports.lerp = (start, end, t) => {
    const t_ = exports.clamp(t, 0, 1);
    return start * (1 - t_) + end * t_;
};


/***/ }),

/***/ "./src/wheel.tsx":
/*!***********************!*\
  !*** ./src/wheel.tsx ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(/*! react */ "react");
const color_1 = __webpack_require__(/*! ./color */ "./src/color.tsx");
const utils_1 = __webpack_require__(/*! ./utils */ "./src/utils.tsx");
class WheelSlice extends React.Component {
    render() {
        const { label, relativeWeight, backgroundColor, angularOffset, radius, left, top, tFill } = this.props;
        const textColor = backgroundColor.luminance > 0.8 ? color_1.Color.BLACK : color_1.Color.WHITE;
        const angle = utils_1.lerp(2 * Math.PI * relativeWeight, 1.5 * Math.PI, tFill);
        const p = [];
        p[0] = { x: 0.5 + 0.5 * tFill, y: 0.5 };
        p[1] = {
            x: utils_1.clamp(0.5 - 0.5 / Math.tan(angle / 2), 0, 1),
            y: utils_1.clamp(0.5 - 0.5 * Math.abs(Math.tan(angle / 2)), 0, 0.5)
        };
        p[2] = { x: 0, y: 0 };
        p[3] = { x: 0, y: 1 };
        p[4] = {
            x: utils_1.clamp(0.5 - 0.5 / Math.tan(angle / 2), 0, 1),
            y: utils_1.clamp(0.5 + 0.5 * Math.abs(Math.tan(angle / 2)), 0.5, 1)
        };
        return (React.createElement("div", { style: {
                width: 2 * radius + 'px',
                height: 2 * radius + 'px',
                position: 'absolute',
                left,
                top,
                lineHeight: 2 * radius + 'px',
                fontSize: 15 * (1 + tFill),
                color: textColor.toRGBA(),
                backgroundColor: backgroundColor.toRGBA(),
                clipPath: `polygon(${p
                    .map(({ x, y }) => `${100 * x}% ${100 * y}%`)
                    .join(', ')})`,
                transform: `rotate(${angularOffset}rad)`,
                borderRadius: 50 * (1 - tFill) + '%',
                zIndex: tFill > 0 ? 1 : 'auto'
            } },
            React.createElement("span", { style: { paddingLeft: 10 * (1 + tFill) } }, label)));
    }
}
WheelSlice.defaultProps = {
    left: 0,
    top: 0,
    tFill: 0
};
exports.WheelColorSchemes = {
    DEFAULT: (i) => color_1.Color.fromHSL(0.3 + ((1.618034 * i) % 1), 0.8, 0.8)
};
class Wheel extends React.Component {
    constructor() {
        super(...arguments);
        this.colors = [];
    }
    render() {
        const { entries, colorscheme, angularOffset, tFocus } = this.props;
        const weightSum = utils_1.sum(entries.map(entry => entry.weight));
        const relativeWeights = entries.map(entry => entry.weight / weightSum);
        const angularOffsets = [0];
        for (let i = 0; i < entries.length - 1; i++) {
            angularOffsets.push(angularOffsets[i] +
                Math.PI * (relativeWeights[i] + relativeWeights[i + 1]));
        }
        const pointedIndex = utils_1.cumsum(relativeWeights)
            .map(x => x >= utils_1.lnnr(-angularOffset / (2 * Math.PI) + relativeWeights[0] / 2, 1))
            .indexOf(true);
        const animatedAngularOffset = utils_1.easeIn({
            duration: 1,
            start: utils_1.lnnr(angularOffset - Math.PI * relativeWeights[0], 2 * Math.PI) +
                Math.PI * relativeWeights[0],
            end: 2 * Math.PI - angularOffsets[pointedIndex]
        }, tFocus);
        while (this.colors.length < entries.length) {
            const i = this.colors.length;
            this.colors[i] = Array.isArray(colorscheme)
                ? colorscheme[i]
                : colorscheme(i);
        }
        return (React.createElement("div", null, entries.map((entry, i) => (React.createElement(WheelSlice, { label: entry.label, relativeWeight: relativeWeights[i], backgroundColor: this.colors[i], angularOffset: angularOffsets[i] + animatedAngularOffset, radius: 200, key: i, left: 100, top: 100, tFill: i == pointedIndex ? tFocus : 0 })))));
    }
}
exports.Wheel = Wheel;
Wheel.defaultProps = {
    colorscheme: exports.WheelColorSchemes.DEFAULT,
    angularOffset: 0,
    tFocus: 0
};


/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = React;

/***/ }),

/***/ "react-dom":
/*!***************************!*\
  !*** external "ReactDOM" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ReactDOM;

/***/ })

/******/ });
//# sourceMappingURL=script.js.map