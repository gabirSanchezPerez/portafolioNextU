"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var iterator_1 = require("../symbol/iterator");
/** Identifies an input as being an Iterable */
function isIterable(input) {
    return input && typeof input[iterator_1.iterator] === 'function';
}
exports.isIterable = isIterable;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXNJdGVyYWJsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImlzSXRlcmFibGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwrQ0FBaUU7QUFFakUsK0NBQStDO0FBQy9DLFNBQWdCLFVBQVUsQ0FBQyxLQUFVO0lBQ25DLE9BQU8sS0FBSyxJQUFJLE9BQU8sS0FBSyxDQUFDLG1CQUFlLENBQUMsS0FBSyxVQUFVLENBQUM7QUFDL0QsQ0FBQztBQUZELGdDQUVDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaXRlcmF0b3IgYXMgU3ltYm9sX2l0ZXJhdG9yIH0gZnJvbSAnLi4vc3ltYm9sL2l0ZXJhdG9yJztcblxuLyoqIElkZW50aWZpZXMgYW4gaW5wdXQgYXMgYmVpbmcgYW4gSXRlcmFibGUgKi9cbmV4cG9ydCBmdW5jdGlvbiBpc0l0ZXJhYmxlKGlucHV0OiBhbnkpOiBpbnB1dCBpcyBJdGVyYWJsZTxhbnk+IHtcbiAgcmV0dXJuIGlucHV0ICYmIHR5cGVvZiBpbnB1dFtTeW1ib2xfaXRlcmF0b3JdID09PSAnZnVuY3Rpb24nO1xufVxuIl19