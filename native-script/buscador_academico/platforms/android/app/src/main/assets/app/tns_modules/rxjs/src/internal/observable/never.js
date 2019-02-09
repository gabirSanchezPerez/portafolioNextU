"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Observable_1 = require("../Observable");
var noop_1 = require("../util/noop");
/**
 * An Observable that emits no items to the Observer and never completes.
 *
 * ![](never.png)
 *
 * A simple Observable that emits neither values nor errors nor the completion
 * notification. It can be used for testing purposes or for composing with other
 * Observables. Please note that by never emitting a complete notification, this
 * Observable keeps the subscription from being disposed automatically.
 * Subscriptions need to be manually disposed.
 *
 * ##  Example
 * ### Emit the number 7, then never emit anything else (not even complete)
 * ```javascript
 * function info() {
 *   console.log('Will not be called');
 * }
 * const result = NEVER.pipe(startWith(7));
 * result.subscribe(x => console.log(x), info, info);
 *
 * ```
 *
 * @see {@link Observable}
 * @see {@link index/EMPTY}
 * @see {@link of}
 * @see {@link throwError}
 */
exports.NEVER = new Observable_1.Observable(noop_1.noop);
/**
 * @deprecated Deprecated in favor of using {@link NEVER} constant.
 */
function never() {
    return exports.NEVER;
}
exports.never = never;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmV2ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJuZXZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDRDQUEyQztBQUMzQyxxQ0FBb0M7QUFFcEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBMEJHO0FBQ1UsUUFBQSxLQUFLLEdBQUcsSUFBSSx1QkFBVSxDQUFRLFdBQUksQ0FBQyxDQUFDO0FBRWpEOztHQUVHO0FBQ0gsU0FBZ0IsS0FBSztJQUNuQixPQUFPLGFBQUssQ0FBQztBQUNmLENBQUM7QUFGRCxzQkFFQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICcuLi9PYnNlcnZhYmxlJztcbmltcG9ydCB7IG5vb3AgfSBmcm9tICcuLi91dGlsL25vb3AnO1xuXG4vKipcbiAqIEFuIE9ic2VydmFibGUgdGhhdCBlbWl0cyBubyBpdGVtcyB0byB0aGUgT2JzZXJ2ZXIgYW5kIG5ldmVyIGNvbXBsZXRlcy5cbiAqXG4gKiAhW10obmV2ZXIucG5nKVxuICpcbiAqIEEgc2ltcGxlIE9ic2VydmFibGUgdGhhdCBlbWl0cyBuZWl0aGVyIHZhbHVlcyBub3IgZXJyb3JzIG5vciB0aGUgY29tcGxldGlvblxuICogbm90aWZpY2F0aW9uLiBJdCBjYW4gYmUgdXNlZCBmb3IgdGVzdGluZyBwdXJwb3NlcyBvciBmb3IgY29tcG9zaW5nIHdpdGggb3RoZXJcbiAqIE9ic2VydmFibGVzLiBQbGVhc2Ugbm90ZSB0aGF0IGJ5IG5ldmVyIGVtaXR0aW5nIGEgY29tcGxldGUgbm90aWZpY2F0aW9uLCB0aGlzXG4gKiBPYnNlcnZhYmxlIGtlZXBzIHRoZSBzdWJzY3JpcHRpb24gZnJvbSBiZWluZyBkaXNwb3NlZCBhdXRvbWF0aWNhbGx5LlxuICogU3Vic2NyaXB0aW9ucyBuZWVkIHRvIGJlIG1hbnVhbGx5IGRpc3Bvc2VkLlxuICpcbiAqICMjICBFeGFtcGxlXG4gKiAjIyMgRW1pdCB0aGUgbnVtYmVyIDcsIHRoZW4gbmV2ZXIgZW1pdCBhbnl0aGluZyBlbHNlIChub3QgZXZlbiBjb21wbGV0ZSlcbiAqIGBgYGphdmFzY3JpcHRcbiAqIGZ1bmN0aW9uIGluZm8oKSB7XG4gKiAgIGNvbnNvbGUubG9nKCdXaWxsIG5vdCBiZSBjYWxsZWQnKTtcbiAqIH1cbiAqIGNvbnN0IHJlc3VsdCA9IE5FVkVSLnBpcGUoc3RhcnRXaXRoKDcpKTtcbiAqIHJlc3VsdC5zdWJzY3JpYmUoeCA9PiBjb25zb2xlLmxvZyh4KSwgaW5mbywgaW5mbyk7XG4gKlxuICogYGBgXG4gKlxuICogQHNlZSB7QGxpbmsgT2JzZXJ2YWJsZX1cbiAqIEBzZWUge0BsaW5rIGluZGV4L0VNUFRZfVxuICogQHNlZSB7QGxpbmsgb2Z9XG4gKiBAc2VlIHtAbGluayB0aHJvd0Vycm9yfVxuICovXG5leHBvcnQgY29uc3QgTkVWRVIgPSBuZXcgT2JzZXJ2YWJsZTxuZXZlcj4obm9vcCk7XG5cbi8qKlxuICogQGRlcHJlY2F0ZWQgRGVwcmVjYXRlZCBpbiBmYXZvciBvZiB1c2luZyB7QGxpbmsgTkVWRVJ9IGNvbnN0YW50LlxuICovXG5leHBvcnQgZnVuY3Rpb24gbmV2ZXIgKCkge1xuICByZXR1cm4gTkVWRVI7XG59XG4iXX0=