"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var moment = require("moment");
function momentObj(props, propName, componentName) {
    if (props[propName]) {
        var value = props[propName];
        if (moment.isMoment(value)) {
            if (!value.isValid()) {
                return new Error(propName + " in " + componentName + " is invalid 'moment' object");
            }
        }
        else {
            return new Error(propName + " in " + componentName + " is not 'moment' object");
        }
    }
    return null;
}
exports.momentObj = momentObj;
exports.default = {
    momentObj: momentObj,
};
