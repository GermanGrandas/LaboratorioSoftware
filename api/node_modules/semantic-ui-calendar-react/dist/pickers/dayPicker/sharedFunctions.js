"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
/** Build days to fill page. */
function buildDays(date, daysOnPage) {
    var start = date.clone().startOf('month').startOf('week');
    return getDaysArray(start.date(), getBrakepoints(date), daysOnPage).map(function (d) { return d.toString(); });
}
exports.buildDays = buildDays;
/** Return dates from ends of months.
 *
 * On one datepicker's page not only days from current month are displayed
 * but also some days from adjacent months. This function returns days
 * that separate one month from other (last day in month).
 * Return array of one or two numbers.
 */
function getBrakepoints(referenceDate) {
    var dateInCurrentMonth = referenceDate.clone();
    var currentMonth = dateInCurrentMonth.month();
    var brakepoints = [];
    var firstDateOnPage = dateInCurrentMonth.clone().startOf('month').startOf('week');
    if (firstDateOnPage.month() !== currentMonth) {
        brakepoints.push(firstDateOnPage.clone().endOf('month').date());
    }
    brakepoints.push(dateInCurrentMonth.clone().endOf('month').date());
    return brakepoints;
}
/* Return array of day positions that are not disabled by default. */
function getDefaultEnabledDayPositions(allDays, date) {
    var dateClone = date.clone();
    var brakepoints = getBrakepoints(dateClone);
    if (brakepoints.length === 1) {
        return _.range(0, _.indexOf(allDays, brakepoints[0].toString()) + 1);
    }
    else {
        return _.range(_.indexOf(allDays, brakepoints[0].toString()) + 1, _.lastIndexOf(allDays, brakepoints[1].toString()) + 1);
    }
}
exports.getDefaultEnabledDayPositions = getDefaultEnabledDayPositions;
/** Return day positions that shoud be displayed as disabled. */
function getDisabledDays(disable, maxDate, minDate, currentDate, daysOnPage, enable) {
    var dayPositions = _.range(daysOnPage);
    var daysInCurrentMonthPositions = getDefaultEnabledDayPositions(buildDays(currentDate, daysOnPage), currentDate);
    var disabledDays = dayPositions.filter(function (dayPosition) { return !_.includes(daysInCurrentMonthPositions, dayPosition); });
    if (_.isArray(enable)) {
        var enabledDaysPositions_1 = enable
            .filter(function (date) { return date.isSame(currentDate, 'month'); })
            .map(function (date) { return date.date(); })
            .map(function (date) { return daysInCurrentMonthPositions[date - 1]; });
        disabledDays = _.concat(disabledDays, dayPositions.filter(function (position) {
            return !_.includes(enabledDaysPositions_1, position);
        }));
    }
    if (_.isArray(disable)) {
        disabledDays = _.concat(disabledDays, disable
            .filter(function (date) { return date.isSame(currentDate, 'month'); })
            .map(function (date) { return date.date(); })
            .map(function (date) { return daysInCurrentMonthPositions[date - 1]; }));
    }
    if (!_.isNil(maxDate)) {
        if (maxDate.isBefore(currentDate, 'month')) {
            disabledDays = dayPositions;
        }
        if (maxDate.isSame(currentDate, 'month')) {
            disabledDays = _.concat(disabledDays, _.range(1, daysInCurrentMonthPositions.length + 1)
                .filter(function (date) { return date > maxDate.date(); })
                .map(function (date) { return daysInCurrentMonthPositions[date - 1]; }));
        }
    }
    if (!_.isNil(minDate)) {
        if (minDate.isAfter(currentDate, 'month')) {
            disabledDays = dayPositions;
        }
        if (minDate.isSame(currentDate, 'month')) {
            disabledDays = _.concat(disabledDays, _.range(1, daysInCurrentMonthPositions.length + 1)
                .filter(function (date) { return date < minDate.date(); })
                .map(function (date) { return daysInCurrentMonthPositions[date - 1]; }));
        }
    }
    return _.sortBy(_.uniq(disabledDays).filter(function (day) { return !_.isNil(day); }));
}
exports.getDisabledDays = getDisabledDays;
function isNextPageAvailable(date, maxDate) {
    if (_.isNil(maxDate)) {
        return true;
    }
    if (date.isSameOrAfter(maxDate, 'month')) {
        return false;
    }
    return true;
}
exports.isNextPageAvailable = isNextPageAvailable;
function isPrevPageAvailable(date, minDate) {
    if (_.isNil(minDate)) {
        return true;
    }
    if (date.isSameOrBefore(minDate, 'month')) {
        return false;
    }
    return true;
}
exports.isPrevPageAvailable = isPrevPageAvailable;
// helper
function getDaysArray(start, brakepoints, length) {
    var currentDay = start;
    var days = [];
    var brakepointsLeft = brakepoints.slice();
    while (!(days.length === length)) {
        days.push(currentDay);
        var bp = _.first(brakepointsLeft);
        if (currentDay === bp) {
            currentDay = 1;
            brakepointsLeft = _.slice(brakepointsLeft, 1);
        }
        else {
            currentDay = currentDay + 1;
        }
    }
    return days;
}
exports.testExport = {
    buildDays: buildDays,
    getBrakepoints: getBrakepoints,
    getDisabledDays: getDisabledDays,
    isNextPageAvailable: isNextPageAvailable,
    isPrevPageAvailable: isPrevPageAvailable,
    getDaysArray: getDaysArray,
    getDefaultEnabledDayPositions: getDefaultEnabledDayPositions,
};
function getInitialDatePosition(initDate, values, selectablePositions) {
    var selectable = selectablePositions.reduce(function (acc, pos) {
        acc.push({ value: values[pos], position: pos });
        return acc;
    }, []);
    var res = _.find(selectable, function (item) { return item.value === initDate; });
    if (res) {
        return res.position;
    }
    return selectable[0].position;
}
exports.getInitialDatePosition = getInitialDatePosition;
