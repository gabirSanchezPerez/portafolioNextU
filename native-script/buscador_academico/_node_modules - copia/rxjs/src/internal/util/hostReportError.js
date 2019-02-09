"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Throws an error on another job so that it's picked up by the runtime's
 * uncaught error handling mechanism.
 * @param err the error to throw
 */
function hostReportError(err) {
    setTimeout(function () { throw err; });
}
exports.hostReportError = hostReportError;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9zdFJlcG9ydEVycm9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaG9zdFJlcG9ydEVycm9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7R0FJRztBQUNILFNBQWdCLGVBQWUsQ0FBQyxHQUFRO0lBQ3RDLFVBQVUsQ0FBQyxjQUFRLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDbkMsQ0FBQztBQUZELDBDQUVDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBUaHJvd3MgYW4gZXJyb3Igb24gYW5vdGhlciBqb2Igc28gdGhhdCBpdCdzIHBpY2tlZCB1cCBieSB0aGUgcnVudGltZSdzXG4gKiB1bmNhdWdodCBlcnJvciBoYW5kbGluZyBtZWNoYW5pc20uXG4gKiBAcGFyYW0gZXJyIHRoZSBlcnJvciB0byB0aHJvd1xuICovXG5leHBvcnQgZnVuY3Rpb24gaG9zdFJlcG9ydEVycm9yKGVycjogYW55KSB7XG4gIHNldFRpbWVvdXQoKCkgPT4geyB0aHJvdyBlcnI7IH0pO1xufSJdfQ==