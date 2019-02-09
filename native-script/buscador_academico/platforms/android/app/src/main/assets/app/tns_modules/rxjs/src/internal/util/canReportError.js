"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Subscriber_1 = require("../Subscriber");
/**
 * Determines whether the ErrorObserver is closed or stopped or has a
 * destination that is closed or stopped - in which case errors will
 * need to be reported via a different mechanism.
 * @param observer the observer
 */
function canReportError(observer) {
    while (observer) {
        var _a = observer, closed_1 = _a.closed, destination = _a.destination, isStopped = _a.isStopped;
        if (closed_1 || isStopped) {
            return false;
        }
        else if (destination && destination instanceof Subscriber_1.Subscriber) {
            observer = destination;
        }
        else {
            observer = null;
        }
    }
    return true;
}
exports.canReportError = canReportError;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FuUmVwb3J0RXJyb3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjYW5SZXBvcnRFcnJvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDRDQUEyQztBQUczQzs7Ozs7R0FLRztBQUNILFNBQWdCLGNBQWMsQ0FBQyxRQUF3QztJQUNyRSxPQUFPLFFBQVEsRUFBRTtRQUNULElBQUEsYUFBb0QsRUFBbEQsb0JBQU0sRUFBRSw0QkFBVyxFQUFFLHdCQUE2QixDQUFDO1FBQzNELElBQUksUUFBTSxJQUFJLFNBQVMsRUFBRTtZQUN2QixPQUFPLEtBQUssQ0FBQztTQUNkO2FBQU0sSUFBSSxXQUFXLElBQUksV0FBVyxZQUFZLHVCQUFVLEVBQUU7WUFDM0QsUUFBUSxHQUFHLFdBQVcsQ0FBQztTQUN4QjthQUFNO1lBQ0wsUUFBUSxHQUFHLElBQUksQ0FBQztTQUNqQjtLQUNGO0lBQ0QsT0FBTyxJQUFJLENBQUM7QUFDZCxDQUFDO0FBWkQsd0NBWUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTdWJzY3JpYmVyIH0gZnJvbSAnLi4vU3Vic2NyaWJlcic7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAnLi4vU3ViamVjdCc7XG5cbi8qKlxuICogRGV0ZXJtaW5lcyB3aGV0aGVyIHRoZSBFcnJvck9ic2VydmVyIGlzIGNsb3NlZCBvciBzdG9wcGVkIG9yIGhhcyBhXG4gKiBkZXN0aW5hdGlvbiB0aGF0IGlzIGNsb3NlZCBvciBzdG9wcGVkIC0gaW4gd2hpY2ggY2FzZSBlcnJvcnMgd2lsbFxuICogbmVlZCB0byBiZSByZXBvcnRlZCB2aWEgYSBkaWZmZXJlbnQgbWVjaGFuaXNtLlxuICogQHBhcmFtIG9ic2VydmVyIHRoZSBvYnNlcnZlclxuICovXG5leHBvcnQgZnVuY3Rpb24gY2FuUmVwb3J0RXJyb3Iob2JzZXJ2ZXI6IFN1YnNjcmliZXI8YW55PiB8IFN1YmplY3Q8YW55Pik6IGJvb2xlYW4ge1xuICB3aGlsZSAob2JzZXJ2ZXIpIHtcbiAgICBjb25zdCB7IGNsb3NlZCwgZGVzdGluYXRpb24sIGlzU3RvcHBlZCB9ID0gb2JzZXJ2ZXIgYXMgYW55O1xuICAgIGlmIChjbG9zZWQgfHwgaXNTdG9wcGVkKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSBlbHNlIGlmIChkZXN0aW5hdGlvbiAmJiBkZXN0aW5hdGlvbiBpbnN0YW5jZW9mIFN1YnNjcmliZXIpIHtcbiAgICAgIG9ic2VydmVyID0gZGVzdGluYXRpb247XG4gICAgfSBlbHNlIHtcbiAgICAgIG9ic2VydmVyID0gbnVsbDtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRydWU7XG59XG4iXX0=