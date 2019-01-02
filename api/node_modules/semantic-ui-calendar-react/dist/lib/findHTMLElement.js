"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ReactDOM = require("react-dom");
function findHTMLElement(e) {
    var el = ReactDOM.findDOMNode(e);
    if (el && el.focus) {
        return el;
    }
    return undefined;
}
exports.default = findHTMLElement;
