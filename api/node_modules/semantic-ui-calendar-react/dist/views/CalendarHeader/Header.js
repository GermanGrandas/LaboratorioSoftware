"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
var React = require("react");
var semantic_ui_react_1 = require("semantic-ui-react");
var HeaderRange_1 = require("./HeaderRange");
var HeaderWeeks_1 = require("./HeaderWeeks");
function Header(props) {
    var rangeRowContent = props.rangeRowContent, displayWeeks = props.displayWeeks, onNextPageBtnClick = props.onNextPageBtnClick, onPrevPageBtnClick = props.onPrevPageBtnClick, hasPrevPage = props.hasPrevPage, hasNextPage = props.hasNextPage, onHeaderClick = props.onHeaderClick, width = props.width, title = props.title;
    var cellStyle = {
        border: 'none',
        borderBottom: displayWeeks ? 'none' : '1px solid rgba(34,36,38,.1)',
    };
    var prevPageBtnStyle = {
        cursor: hasPrevPage ? 'pointer' : 'auto',
    };
    var nextPageBtnStyle = {
        cursor: hasNextPage ? 'pointer' : 'auto',
    };
    var headerTitleStyle = {
        cursor: onHeaderClick ? 'pointer' : 'default',
    };
    return (React.createElement(semantic_ui_react_1.Table.Header, null,
        !_.isNil(rangeRowContent) && React.createElement(HeaderRange_1.default, { content: rangeRowContent }),
        React.createElement(semantic_ui_react_1.Table.Row, null,
            React.createElement(semantic_ui_react_1.Table.HeaderCell, { style: cellStyle, colSpan: '1' },
                React.createElement(semantic_ui_react_1.Icon, { fitted: true, style: prevPageBtnStyle, disabled: !hasPrevPage, onClick: hasPrevPage ? onPrevPageBtnClick : undefined, name: 'chevron left' })),
            React.createElement(semantic_ui_react_1.Table.HeaderCell, { onClick: onHeaderClick ? onHeaderClick : undefined, style: cellStyle, colSpan: (width - 2).toString() },
                React.createElement("span", { style: headerTitleStyle }, title)),
            React.createElement(semantic_ui_react_1.Table.HeaderCell, { style: cellStyle, colSpan: '1' },
                React.createElement(semantic_ui_react_1.Icon, { fitted: true, style: nextPageBtnStyle, disabled: !hasNextPage, onClick: hasNextPage ? onNextPageBtnClick : undefined, name: 'chevron right' }))),
        displayWeeks && React.createElement(HeaderWeeks_1.default, null)));
}
exports.default = Header;
