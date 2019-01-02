"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
var React = require("react");
var semantic_ui_react_1 = require("semantic-ui-react");
var Cell_1 = require("./Cell");
var Cell_2 = require("./Cell");
function Body(props) {
    var data = props.data, width = props.width, onCellClick = props.onCellClick, active = props.active, disabled = props.disabled, hovered = props.hovered, onCellHover = props.onCellHover;
    var content = buildRows(data, width).map(function (row, rowIndex) { return (React.createElement(semantic_ui_react_1.Table.Row, { key: "" + rowIndex + row[0] }, row.map(function (item, itemIndex) { return (React.createElement(Cell_1.default, { style: getCellStyle(width), active: isActive(rowIndex, width, itemIndex, active), hovered: isHovered(rowIndex, width, itemIndex, hovered), disabled: isDisabled(rowIndex, width, itemIndex, disabled), key: "" + (rowIndex * width + itemIndex), itemPosition: rowIndex * width + itemIndex, content: item, onHover: onCellHover, onClick: onCellClick })); }))); });
    return (React.createElement(semantic_ui_react_1.Table.Body, null, content));
}
function buildRows(data, width) {
    var height = data.length / width;
    var rows = [];
    for (var i = 0; i < height; i++) {
        rows.push(data.slice((i * width), (i * width) + width));
    }
    return rows;
}
function isActive(rowIndex, rowWidth, colIndex, active) {
    if (_.isNil(active)) {
        return false;
    }
    if (_.isArray(active)) {
        for (var _i = 0, _a = active; _i < _a.length; _i++) {
            var activeIndex = _a[_i];
            if (rowIndex * rowWidth + colIndex === activeIndex) {
                return true;
            }
        }
    }
    return rowIndex * rowWidth + colIndex === active;
}
function isHovered(rowIndex, rowWidth, colIndex, hovered) {
    if (_.isNil(hovered)) {
        return false;
    }
    return rowIndex * rowWidth + colIndex === hovered;
}
function isDisabled(rowIndex, rowWidth, colIndex, disabledIndexes) {
    if (_.isNil(disabledIndexes) || disabledIndexes.length === 0) {
        return false;
    }
    for (var _i = 0, disabledIndexes_1 = disabledIndexes; _i < disabledIndexes_1.length; _i++) {
        var disabledIndex = disabledIndexes_1[_i];
        if (rowIndex * rowWidth + colIndex === disabledIndex) {
            return true;
        }
    }
    return false;
}
function getCellStyle(width) {
    switch (width) {
        case 3:
            return Cell_2.cellStyleWidth3;
        case 4:
            return Cell_2.cellStyleWidth4;
        case 7:
            return Cell_2.cellStyleWidth7;
        default:
            break;
    }
}
exports.default = Body;
