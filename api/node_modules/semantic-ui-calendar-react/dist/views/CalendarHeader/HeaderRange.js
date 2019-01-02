"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var semantic_ui_react_1 = require("semantic-ui-react");
var cellStyle = {
    border: 'none',
};
function HeaderRange(props) {
    var content = props.content;
    return (React.createElement(semantic_ui_react_1.Table.Row, null,
        React.createElement(semantic_ui_react_1.Table.HeaderCell, { style: cellStyle, colSpan: '7' }, content)));
}
exports.default = HeaderRange;
