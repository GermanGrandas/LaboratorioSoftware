"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var moment = require("moment");
var React = require("react");
var semantic_ui_react_1 = require("semantic-ui-react");
/** Return array of week day names.
 *
 * getWeekDays() --> ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Su']
 */
var getWeekDays = function (m) {
    var weekDays = [];
    var day = m().startOf('week');
    for (var i = 0; i < 7; i++) {
        weekDays[i] = day.format('dd');
        day.add(1, 'd');
    }
    return weekDays;
};
var cellStyle = {
    border: 'none',
    borderBottom: '1px solid rgba(34,36,38,.1)',
};
var getWeekDayCells = function (m) { return getWeekDays(m).map(function (weekDay) { return (React.createElement(semantic_ui_react_1.Table.HeaderCell, { key: weekDay, style: cellStyle, colSpan: '1' }, weekDay)); }); };
function HeaderWeeks() {
    return (React.createElement(semantic_ui_react_1.Table.Row, null, getWeekDayCells(moment)));
}
exports.default = HeaderWeeks;
