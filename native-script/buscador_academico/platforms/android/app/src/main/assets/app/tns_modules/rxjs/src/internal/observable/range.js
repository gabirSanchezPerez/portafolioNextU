"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Observable_1 = require("../Observable");
/**
 * Creates an Observable that emits a sequence of numbers within a specified
 * range.
 *
 * <span class="informal">Emits a sequence of numbers in a range.</span>
 *
 * ![](range.png)
 *
 * `range` operator emits a range of sequential integers, in order, where you
 * select the `start` of the range and its `length`. By default, uses no
 * {@link SchedulerLike} and just delivers the notifications synchronously, but may use
 * an optional {@link SchedulerLike} to regulate those deliveries.
 *
 * ## Example
 * Emits the numbers 1 to 10</caption>
 * ```javascript
 * const numbers = range(1, 10);
 * numbers.subscribe(x => console.log(x));
 * ```
 * @see {@link timer}
 * @see {@link index/interval}
 *
 * @param {number} [start=0] The value of the first integer in the sequence.
 * @param {number} [count=0] The number of sequential integers to generate.
 * @param {SchedulerLike} [scheduler] A {@link SchedulerLike} to use for scheduling
 * the emissions of the notifications.
 * @return {Observable} An Observable of numbers that emits a finite range of
 * sequential integers.
 * @static true
 * @name range
 * @owner Observable
 */
function range(start, count, scheduler) {
    if (start === void 0) { start = 0; }
    if (count === void 0) { count = 0; }
    return new Observable_1.Observable(function (subscriber) {
        var index = 0;
        var current = start;
        if (scheduler) {
            return scheduler.schedule(dispatch, 0, {
                index: index, count: count, start: start, subscriber: subscriber
            });
        }
        else {
            do {
                if (index++ >= count) {
                    subscriber.complete();
                    break;
                }
                subscriber.next(current++);
                if (subscriber.closed) {
                    break;
                }
            } while (true);
        }
        return undefined;
    });
}
exports.range = range;
/** @internal */
function dispatch(state) {
    var start = state.start, index = state.index, count = state.count, subscriber = state.subscriber;
    if (index >= count) {
        subscriber.complete();
        return;
    }
    subscriber.next(start);
    if (subscriber.closed) {
        return;
    }
    state.index = index + 1;
    state.start = start + 1;
    this.schedule(state);
}
exports.dispatch = dispatch;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFuZ2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJyYW5nZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLDRDQUEyQztBQUUzQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQStCRztBQUNILFNBQWdCLEtBQUssQ0FBQyxLQUFpQixFQUNqQixLQUFpQixFQUNqQixTQUF5QjtJQUZ6QixzQkFBQSxFQUFBLFNBQWlCO0lBQ2pCLHNCQUFBLEVBQUEsU0FBaUI7SUFFckMsT0FBTyxJQUFJLHVCQUFVLENBQVMsVUFBQSxVQUFVO1FBQ3RDLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQztRQUNkLElBQUksT0FBTyxHQUFHLEtBQUssQ0FBQztRQUVwQixJQUFJLFNBQVMsRUFBRTtZQUNiLE9BQU8sU0FBUyxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxFQUFFO2dCQUNyQyxLQUFLLE9BQUEsRUFBRSxLQUFLLE9BQUEsRUFBRSxLQUFLLE9BQUEsRUFBRSxVQUFVLFlBQUE7YUFDaEMsQ0FBQyxDQUFDO1NBQ0o7YUFBTTtZQUNMLEdBQUc7Z0JBQ0QsSUFBSSxLQUFLLEVBQUUsSUFBSSxLQUFLLEVBQUU7b0JBQ3BCLFVBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztvQkFDdEIsTUFBTTtpQkFDUDtnQkFDRCxVQUFVLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7Z0JBQzNCLElBQUksVUFBVSxDQUFDLE1BQU0sRUFBRTtvQkFDckIsTUFBTTtpQkFDUDthQUNGLFFBQVEsSUFBSSxFQUFFO1NBQ2hCO1FBRUQsT0FBTyxTQUFTLENBQUM7SUFDbkIsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBMUJELHNCQTBCQztBQUVELGdCQUFnQjtBQUNoQixTQUFnQixRQUFRLENBQTZCLEtBQVU7SUFDckQsSUFBQSxtQkFBSyxFQUFFLG1CQUFLLEVBQUUsbUJBQUssRUFBRSw2QkFBVSxDQUFXO0lBRWxELElBQUksS0FBSyxJQUFJLEtBQUssRUFBRTtRQUNsQixVQUFVLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDdEIsT0FBTztLQUNSO0lBRUQsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUV2QixJQUFJLFVBQVUsQ0FBQyxNQUFNLEVBQUU7UUFDckIsT0FBTztLQUNSO0lBRUQsS0FBSyxDQUFDLEtBQUssR0FBRyxLQUFLLEdBQUcsQ0FBQyxDQUFDO0lBQ3hCLEtBQUssQ0FBQyxLQUFLLEdBQUcsS0FBSyxHQUFHLENBQUMsQ0FBQztJQUV4QixJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ3ZCLENBQUM7QUFsQkQsNEJBa0JDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU2NoZWR1bGVyQWN0aW9uLCBTY2hlZHVsZXJMaWtlIH0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJy4uL09ic2VydmFibGUnO1xuXG4vKipcbiAqIENyZWF0ZXMgYW4gT2JzZXJ2YWJsZSB0aGF0IGVtaXRzIGEgc2VxdWVuY2Ugb2YgbnVtYmVycyB3aXRoaW4gYSBzcGVjaWZpZWRcbiAqIHJhbmdlLlxuICpcbiAqIDxzcGFuIGNsYXNzPVwiaW5mb3JtYWxcIj5FbWl0cyBhIHNlcXVlbmNlIG9mIG51bWJlcnMgaW4gYSByYW5nZS48L3NwYW4+XG4gKlxuICogIVtdKHJhbmdlLnBuZylcbiAqXG4gKiBgcmFuZ2VgIG9wZXJhdG9yIGVtaXRzIGEgcmFuZ2Ugb2Ygc2VxdWVudGlhbCBpbnRlZ2VycywgaW4gb3JkZXIsIHdoZXJlIHlvdVxuICogc2VsZWN0IHRoZSBgc3RhcnRgIG9mIHRoZSByYW5nZSBhbmQgaXRzIGBsZW5ndGhgLiBCeSBkZWZhdWx0LCB1c2VzIG5vXG4gKiB7QGxpbmsgU2NoZWR1bGVyTGlrZX0gYW5kIGp1c3QgZGVsaXZlcnMgdGhlIG5vdGlmaWNhdGlvbnMgc3luY2hyb25vdXNseSwgYnV0IG1heSB1c2VcbiAqIGFuIG9wdGlvbmFsIHtAbGluayBTY2hlZHVsZXJMaWtlfSB0byByZWd1bGF0ZSB0aG9zZSBkZWxpdmVyaWVzLlxuICpcbiAqICMjIEV4YW1wbGVcbiAqIEVtaXRzIHRoZSBudW1iZXJzIDEgdG8gMTA8L2NhcHRpb24+XG4gKiBgYGBqYXZhc2NyaXB0XG4gKiBjb25zdCBudW1iZXJzID0gcmFuZ2UoMSwgMTApO1xuICogbnVtYmVycy5zdWJzY3JpYmUoeCA9PiBjb25zb2xlLmxvZyh4KSk7XG4gKiBgYGBcbiAqIEBzZWUge0BsaW5rIHRpbWVyfVxuICogQHNlZSB7QGxpbmsgaW5kZXgvaW50ZXJ2YWx9XG4gKlxuICogQHBhcmFtIHtudW1iZXJ9IFtzdGFydD0wXSBUaGUgdmFsdWUgb2YgdGhlIGZpcnN0IGludGVnZXIgaW4gdGhlIHNlcXVlbmNlLlxuICogQHBhcmFtIHtudW1iZXJ9IFtjb3VudD0wXSBUaGUgbnVtYmVyIG9mIHNlcXVlbnRpYWwgaW50ZWdlcnMgdG8gZ2VuZXJhdGUuXG4gKiBAcGFyYW0ge1NjaGVkdWxlckxpa2V9IFtzY2hlZHVsZXJdIEEge0BsaW5rIFNjaGVkdWxlckxpa2V9IHRvIHVzZSBmb3Igc2NoZWR1bGluZ1xuICogdGhlIGVtaXNzaW9ucyBvZiB0aGUgbm90aWZpY2F0aW9ucy5cbiAqIEByZXR1cm4ge09ic2VydmFibGV9IEFuIE9ic2VydmFibGUgb2YgbnVtYmVycyB0aGF0IGVtaXRzIGEgZmluaXRlIHJhbmdlIG9mXG4gKiBzZXF1ZW50aWFsIGludGVnZXJzLlxuICogQHN0YXRpYyB0cnVlXG4gKiBAbmFtZSByYW5nZVxuICogQG93bmVyIE9ic2VydmFibGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJhbmdlKHN0YXJ0OiBudW1iZXIgPSAwLFxuICAgICAgICAgICAgICAgICAgICAgIGNvdW50OiBudW1iZXIgPSAwLFxuICAgICAgICAgICAgICAgICAgICAgIHNjaGVkdWxlcj86IFNjaGVkdWxlckxpa2UpOiBPYnNlcnZhYmxlPG51bWJlcj4ge1xuICByZXR1cm4gbmV3IE9ic2VydmFibGU8bnVtYmVyPihzdWJzY3JpYmVyID0+IHtcbiAgICBsZXQgaW5kZXggPSAwO1xuICAgIGxldCBjdXJyZW50ID0gc3RhcnQ7XG5cbiAgICBpZiAoc2NoZWR1bGVyKSB7XG4gICAgICByZXR1cm4gc2NoZWR1bGVyLnNjaGVkdWxlKGRpc3BhdGNoLCAwLCB7XG4gICAgICAgIGluZGV4LCBjb3VudCwgc3RhcnQsIHN1YnNjcmliZXJcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBkbyB7XG4gICAgICAgIGlmIChpbmRleCsrID49IGNvdW50KSB7XG4gICAgICAgICAgc3Vic2NyaWJlci5jb21wbGV0ZSgpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIHN1YnNjcmliZXIubmV4dChjdXJyZW50KyspO1xuICAgICAgICBpZiAoc3Vic2NyaWJlci5jbG9zZWQpIHtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfSB3aGlsZSAodHJ1ZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfSk7XG59XG5cbi8qKiBAaW50ZXJuYWwgKi9cbmV4cG9ydCBmdW5jdGlvbiBkaXNwYXRjaCh0aGlzOiBTY2hlZHVsZXJBY3Rpb248YW55Piwgc3RhdGU6IGFueSkge1xuICBjb25zdCB7IHN0YXJ0LCBpbmRleCwgY291bnQsIHN1YnNjcmliZXIgfSA9IHN0YXRlO1xuXG4gIGlmIChpbmRleCA+PSBjb3VudCkge1xuICAgIHN1YnNjcmliZXIuY29tcGxldGUoKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBzdWJzY3JpYmVyLm5leHQoc3RhcnQpO1xuXG4gIGlmIChzdWJzY3JpYmVyLmNsb3NlZCkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHN0YXRlLmluZGV4ID0gaW5kZXggKyAxO1xuICBzdGF0ZS5zdGFydCA9IHN0YXJ0ICsgMTtcblxuICB0aGlzLnNjaGVkdWxlKHN0YXRlKTtcbn1cbiJdfQ==