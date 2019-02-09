"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var isScheduler_1 = require("../util/isScheduler");
var fromArray_1 = require("./fromArray");
var empty_1 = require("./empty");
var scalar_1 = require("./scalar");
/* tslint:enable:max-line-length */
/**
 * Converts the arguments to an observable sequence.
 *
 * <span class="informal">Each argument becomes a `next` notification.</span>
 *
 * ![](of.png)
 *
 * Unlike {@link from}, it does not do any flattening and emits each argument in whole
 * as a separate `next` notification.
 *
 * ## Examples
 *
 * Emit the values `10, 20, 30`
 *
 * ```javascript
 * of(10, 20, 30)
 * .subscribe(
 *   next => console.log('next:', next),
 *   err => console.log('error:', err),
 *   () => console.log('the end'),
 * );
 * // result:
 * // 'next: 10'
 * // 'next: 20'
 * // 'next: 30'
 *
 * ```
 *
 * Emit the array `[1,2,3]`
 *
 * ```javascript
 * of([1,2,3])
 * .subscribe(
 *   next => console.log('next:', next),
 *   err => console.log('error:', err),
 *   () => console.log('the end'),
 * );
 * // result:
 * // 'next: [1,2,3]'
 * ```
 *
 * @see {@link from}
 * @see {@link range}
 *
 * @param {...T} values A comma separated list of arguments you want to be emitted
 * @return {Observable} An Observable that emits the arguments
 * described above and then completes.
 * @method of
 * @owner Observable
 */
function of() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var scheduler = args[args.length - 1];
    if (isScheduler_1.isScheduler(scheduler)) {
        args.pop();
    }
    else {
        scheduler = undefined;
    }
    switch (args.length) {
        case 0:
            return empty_1.empty(scheduler);
        case 1:
            return scheduler ? fromArray_1.fromArray(args, scheduler) : scalar_1.scalar(args[0]);
        default:
            return fromArray_1.fromArray(args, scheduler);
    }
}
exports.of = of;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2YuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJvZi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLG1EQUFrRDtBQUNsRCx5Q0FBd0M7QUFDeEMsaUNBQWdDO0FBQ2hDLG1DQUFrQztBQWlCbEMsbUNBQW1DO0FBRW5DOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBaURHO0FBRUgsU0FBZ0IsRUFBRTtJQUFJLGNBQWlDO1NBQWpDLFVBQWlDLEVBQWpDLHFCQUFpQyxFQUFqQyxJQUFpQztRQUFqQyx5QkFBaUM7O0lBQ3JELElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBa0IsQ0FBQztJQUN2RCxJQUFJLHlCQUFXLENBQUMsU0FBUyxDQUFDLEVBQUU7UUFDMUIsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO0tBQ1o7U0FBTTtRQUNMLFNBQVMsR0FBRyxTQUFTLENBQUM7S0FDdkI7SUFDRCxRQUFRLElBQUksQ0FBQyxNQUFNLEVBQUU7UUFDbkIsS0FBSyxDQUFDO1lBQ0osT0FBTyxhQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDMUIsS0FBSyxDQUFDO1lBQ0osT0FBTyxTQUFTLENBQUMsQ0FBQyxDQUFDLHFCQUFTLENBQUMsSUFBVyxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxlQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBTSxDQUFDLENBQUM7UUFDOUU7WUFDRSxPQUFPLHFCQUFTLENBQUMsSUFBVyxFQUFFLFNBQVMsQ0FBQyxDQUFDO0tBQzVDO0FBQ0gsQ0FBQztBQWZELGdCQWVDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU2NoZWR1bGVyTGlrZSB9IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCB7IGlzU2NoZWR1bGVyIH0gZnJvbSAnLi4vdXRpbC9pc1NjaGVkdWxlcic7XG5pbXBvcnQgeyBmcm9tQXJyYXkgfSBmcm9tICcuL2Zyb21BcnJheSc7XG5pbXBvcnQgeyBlbXB0eSB9IGZyb20gJy4vZW1wdHknO1xuaW1wb3J0IHsgc2NhbGFyIH0gZnJvbSAnLi9zY2FsYXInO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJy4uL09ic2VydmFibGUnO1xuXG4vKiB0c2xpbnQ6ZGlzYWJsZTptYXgtbGluZS1sZW5ndGggKi9cbmV4cG9ydCBmdW5jdGlvbiBvZjxUPihhOiBULCBzY2hlZHVsZXI/OiBTY2hlZHVsZXJMaWtlKTogT2JzZXJ2YWJsZTxUPjtcbmV4cG9ydCBmdW5jdGlvbiBvZjxULCBUMj4oYTogVCwgYjogVDIsIHNjaGVkdWxlcj86IFNjaGVkdWxlckxpa2UpOiBPYnNlcnZhYmxlPFQgfCBUMj47XG5leHBvcnQgZnVuY3Rpb24gb2Y8VCwgVDIsIFQzPihhOiBULCBiOiBUMiwgYzogVDMsIHNjaGVkdWxlcj86IFNjaGVkdWxlckxpa2UpOiBPYnNlcnZhYmxlPFQgfCBUMiB8IFQzPjtcbmV4cG9ydCBmdW5jdGlvbiBvZjxULCBUMiwgVDMsIFQ0PihhOiBULCBiOiBUMiwgYzogVDMsIGQ6IFQ0LCBzY2hlZHVsZXI/OiBTY2hlZHVsZXJMaWtlKTogT2JzZXJ2YWJsZTxUIHwgVDIgfCBUMyB8IFQ0PjtcbmV4cG9ydCBmdW5jdGlvbiBvZjxULCBUMiwgVDMsIFQ0LCBUNT4oYTogVCwgYjogVDIsIGM6IFQzLCBkOiBUNCwgZTogVDUsIHNjaGVkdWxlcj86IFNjaGVkdWxlckxpa2UpOiBPYnNlcnZhYmxlPFQgfCBUMiB8IFQzIHwgVDQgfCBUNT47XG5leHBvcnQgZnVuY3Rpb24gb2Y8VCwgVDIsIFQzLCBUNCwgVDUsIFQ2PihhOiBULCBiOiBUMiwgYzogVDMsIGQ6IFQ0LCBlOiBUNSwgZjogVDYsIHNjaGVkdWxlcj86IFNjaGVkdWxlckxpa2UpOiBPYnNlcnZhYmxlPFQgfCBUMiB8IFQzIHwgVDQgfCBUNSB8IFQ2PjtcbmV4cG9ydCBmdW5jdGlvbiBvZjxULCBUMiwgVDMsIFQ0LCBUNSwgVDYsIFQ3PihhOiBULCBiOiBUMiwgYzogVDMsIGQ6IFQ0LCBlOiBUNSwgZjogVDYsIGc6IFQ3LCBzY2hlZHVsZXI/OiBTY2hlZHVsZXJMaWtlKTpcbiAgT2JzZXJ2YWJsZTxUIHwgVDIgfCBUMyB8IFQ0IHwgVDUgfCBUNiB8IFQ3PjtcbmV4cG9ydCBmdW5jdGlvbiBvZjxULCBUMiwgVDMsIFQ0LCBUNSwgVDYsIFQ3LCBUOD4oYTogVCwgYjogVDIsIGM6IFQzLCBkOiBUNCwgZTogVDUsIGY6IFQ2LCBnOiBUNywgaDogVDgsIHNjaGVkdWxlcj86IFNjaGVkdWxlckxpa2UpOlxuICBPYnNlcnZhYmxlPFQgfCBUMiB8IFQzIHwgVDQgfCBUNSB8IFQ2IHwgVDcgfCBUOD47XG5leHBvcnQgZnVuY3Rpb24gb2Y8VCwgVDIsIFQzLCBUNCwgVDUsIFQ2LCBUNywgVDgsIFQ5PihhOiBULCBiOiBUMiwgYzogVDMsIGQ6IFQ0LCBlOiBUNSwgZjogVDYsIGc6IFQ3LCBoOiBUOCwgaTogVDksIHNjaGVkdWxlcj86IFNjaGVkdWxlckxpa2UpOlxuICBPYnNlcnZhYmxlPFQgfCBUMiB8IFQzIHwgVDQgfCBUNSB8IFQ2IHwgVDcgfCBUOCB8IFQ5PjtcbmV4cG9ydCBmdW5jdGlvbiBvZjxUPiguLi5hcmdzOiBBcnJheTxUIHwgU2NoZWR1bGVyTGlrZT4pOiBPYnNlcnZhYmxlPFQ+O1xuLyogdHNsaW50OmVuYWJsZTptYXgtbGluZS1sZW5ndGggKi9cblxuLyoqXG4gKiBDb252ZXJ0cyB0aGUgYXJndW1lbnRzIHRvIGFuIG9ic2VydmFibGUgc2VxdWVuY2UuXG4gKlxuICogPHNwYW4gY2xhc3M9XCJpbmZvcm1hbFwiPkVhY2ggYXJndW1lbnQgYmVjb21lcyBhIGBuZXh0YCBub3RpZmljYXRpb24uPC9zcGFuPlxuICpcbiAqICFbXShvZi5wbmcpXG4gKlxuICogVW5saWtlIHtAbGluayBmcm9tfSwgaXQgZG9lcyBub3QgZG8gYW55IGZsYXR0ZW5pbmcgYW5kIGVtaXRzIGVhY2ggYXJndW1lbnQgaW4gd2hvbGVcbiAqIGFzIGEgc2VwYXJhdGUgYG5leHRgIG5vdGlmaWNhdGlvbi5cbiAqXG4gKiAjIyBFeGFtcGxlc1xuICpcbiAqIEVtaXQgdGhlIHZhbHVlcyBgMTAsIDIwLCAzMGBcbiAqXG4gKiBgYGBqYXZhc2NyaXB0XG4gKiBvZigxMCwgMjAsIDMwKVxuICogLnN1YnNjcmliZShcbiAqICAgbmV4dCA9PiBjb25zb2xlLmxvZygnbmV4dDonLCBuZXh0KSxcbiAqICAgZXJyID0+IGNvbnNvbGUubG9nKCdlcnJvcjonLCBlcnIpLFxuICogICAoKSA9PiBjb25zb2xlLmxvZygndGhlIGVuZCcpLFxuICogKTtcbiAqIC8vIHJlc3VsdDpcbiAqIC8vICduZXh0OiAxMCdcbiAqIC8vICduZXh0OiAyMCdcbiAqIC8vICduZXh0OiAzMCdcbiAqXG4gKiBgYGBcbiAqXG4gKiBFbWl0IHRoZSBhcnJheSBgWzEsMiwzXWBcbiAqXG4gKiBgYGBqYXZhc2NyaXB0XG4gKiBvZihbMSwyLDNdKVxuICogLnN1YnNjcmliZShcbiAqICAgbmV4dCA9PiBjb25zb2xlLmxvZygnbmV4dDonLCBuZXh0KSxcbiAqICAgZXJyID0+IGNvbnNvbGUubG9nKCdlcnJvcjonLCBlcnIpLFxuICogICAoKSA9PiBjb25zb2xlLmxvZygndGhlIGVuZCcpLFxuICogKTtcbiAqIC8vIHJlc3VsdDpcbiAqIC8vICduZXh0OiBbMSwyLDNdJ1xuICogYGBgXG4gKlxuICogQHNlZSB7QGxpbmsgZnJvbX1cbiAqIEBzZWUge0BsaW5rIHJhbmdlfVxuICpcbiAqIEBwYXJhbSB7Li4uVH0gdmFsdWVzIEEgY29tbWEgc2VwYXJhdGVkIGxpc3Qgb2YgYXJndW1lbnRzIHlvdSB3YW50IHRvIGJlIGVtaXR0ZWRcbiAqIEByZXR1cm4ge09ic2VydmFibGV9IEFuIE9ic2VydmFibGUgdGhhdCBlbWl0cyB0aGUgYXJndW1lbnRzXG4gKiBkZXNjcmliZWQgYWJvdmUgYW5kIHRoZW4gY29tcGxldGVzLlxuICogQG1ldGhvZCBvZlxuICogQG93bmVyIE9ic2VydmFibGVcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gb2Y8VD4oLi4uYXJnczogQXJyYXk8VCB8IFNjaGVkdWxlckxpa2U+KTogT2JzZXJ2YWJsZTxUPiB7XG4gIGxldCBzY2hlZHVsZXIgPSBhcmdzW2FyZ3MubGVuZ3RoIC0gMV0gYXMgU2NoZWR1bGVyTGlrZTtcbiAgaWYgKGlzU2NoZWR1bGVyKHNjaGVkdWxlcikpIHtcbiAgICBhcmdzLnBvcCgpO1xuICB9IGVsc2Uge1xuICAgIHNjaGVkdWxlciA9IHVuZGVmaW5lZDtcbiAgfVxuICBzd2l0Y2ggKGFyZ3MubGVuZ3RoKSB7XG4gICAgY2FzZSAwOlxuICAgICAgcmV0dXJuIGVtcHR5KHNjaGVkdWxlcik7XG4gICAgY2FzZSAxOlxuICAgICAgcmV0dXJuIHNjaGVkdWxlciA/IGZyb21BcnJheShhcmdzIGFzIFRbXSwgc2NoZWR1bGVyKSA6IHNjYWxhcihhcmdzWzBdIGFzIFQpO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gZnJvbUFycmF5KGFyZ3MgYXMgVFtdLCBzY2hlZHVsZXIpO1xuICB9XG59XG4iXX0=