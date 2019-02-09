"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Observable_1 = require("../Observable");
var async_1 = require("../scheduler/async");
var isNumeric_1 = require("../util/isNumeric");
var isScheduler_1 = require("../util/isScheduler");
/**
 * Creates an Observable that starts emitting after an `dueTime` and
 * emits ever increasing numbers after each `period` of time thereafter.
 *
 * <span class="informal">Its like {@link index/interval}, but you can specify when
 * should the emissions start.</span>
 *
 * ![](timer.png)
 *
 * `timer` returns an Observable that emits an infinite sequence of ascending
 * integers, with a constant interval of time, `period` of your choosing
 * between those emissions. The first emission happens after the specified
 * `dueTime`. The initial delay may be a `Date`. By default, this
 * operator uses the {@link asyncScheduler} {@link SchedulerLike} to provide a notion of time, but you
 * may pass any {@link SchedulerLike} to it. If `period` is not specified, the output
 * Observable emits only one value, `0`. Otherwise, it emits an infinite
 * sequence.
 *
 * ## Examples
 * ### Emits ascending numbers, one every second (1000ms), starting after 3 seconds
 * ```javascript
 * const numbers = timer(3000, 1000);
 * numbers.subscribe(x => console.log(x));
 * ```
 *
 * ### Emits one number after five seconds
 * ```javascript
 * const numbers = timer(5000);
 * numbers.subscribe(x => console.log(x));
 * ```
 * @see {@link index/interval}
 * @see {@link delay}
 *
 * @param {number|Date} [dueTime] The initial delay time specified as a Date object or as an integer denoting
 * milliseconds to wait before emitting the first value of 0`.
 * @param {number|SchedulerLike} [periodOrScheduler] The period of time between emissions of the
 * subsequent numbers.
 * @param {SchedulerLike} [scheduler=async] The {@link SchedulerLike} to use for scheduling
 * the emission of values, and providing a notion of "time".
 * @return {Observable} An Observable that emits a `0` after the
 * `dueTime` and ever increasing numbers after each `period` of time
 * thereafter.
 * @static true
 * @name timer
 * @owner Observable
 */
function timer(dueTime, periodOrScheduler, scheduler) {
    if (dueTime === void 0) { dueTime = 0; }
    var period = -1;
    if (isNumeric_1.isNumeric(periodOrScheduler)) {
        period = Number(periodOrScheduler) < 1 && 1 || Number(periodOrScheduler);
    }
    else if (isScheduler_1.isScheduler(periodOrScheduler)) {
        scheduler = periodOrScheduler;
    }
    if (!isScheduler_1.isScheduler(scheduler)) {
        scheduler = async_1.async;
    }
    return new Observable_1.Observable(function (subscriber) {
        var due = isNumeric_1.isNumeric(dueTime)
            ? dueTime
            : (+dueTime - scheduler.now());
        return scheduler.schedule(dispatch, due, {
            index: 0, period: period, subscriber: subscriber
        });
    });
}
exports.timer = timer;
function dispatch(state) {
    var index = state.index, period = state.period, subscriber = state.subscriber;
    subscriber.next(index);
    if (subscriber.closed) {
        return;
    }
    else if (period === -1) {
        return subscriber.complete();
    }
    state.index = index + 1;
    this.schedule(state, period);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0aW1lci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDRDQUEyQztBQUUzQyw0Q0FBMkM7QUFDM0MsK0NBQThDO0FBQzlDLG1EQUFrRDtBQUdsRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBNkNHO0FBQ0gsU0FBZ0IsS0FBSyxDQUFDLE9BQTBCLEVBQzFCLGlCQUEwQyxFQUMxQyxTQUF5QjtJQUZ6Qix3QkFBQSxFQUFBLFdBQTBCO0lBRzlDLElBQUksTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ2hCLElBQUkscUJBQVMsQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFO1FBQ2hDLE1BQU0sR0FBRyxNQUFNLENBQUMsaUJBQWlCLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0tBQzFFO1NBQU0sSUFBSSx5QkFBVyxDQUFDLGlCQUFpQixDQUFDLEVBQUU7UUFDekMsU0FBUyxHQUFHLGlCQUF3QixDQUFDO0tBQ3RDO0lBRUQsSUFBSSxDQUFDLHlCQUFXLENBQUMsU0FBUyxDQUFDLEVBQUU7UUFDM0IsU0FBUyxHQUFHLGFBQUssQ0FBQztLQUNuQjtJQUVELE9BQU8sSUFBSSx1QkFBVSxDQUFDLFVBQUEsVUFBVTtRQUM5QixJQUFNLEdBQUcsR0FBRyxxQkFBUyxDQUFDLE9BQU8sQ0FBQztZQUM1QixDQUFDLENBQUUsT0FBa0I7WUFDckIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLEdBQUcsU0FBUyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7UUFFakMsT0FBTyxTQUFTLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUU7WUFDdkMsS0FBSyxFQUFFLENBQUMsRUFBRSxNQUFNLFFBQUEsRUFBRSxVQUFVLFlBQUE7U0FDN0IsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBdkJELHNCQXVCQztBQVFELFNBQVMsUUFBUSxDQUFvQyxLQUFpQjtJQUM1RCxJQUFBLG1CQUFLLEVBQUUscUJBQU0sRUFBRSw2QkFBVSxDQUFXO0lBQzVDLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFFdkIsSUFBSSxVQUFVLENBQUMsTUFBTSxFQUFFO1FBQ3JCLE9BQU87S0FDUjtTQUFNLElBQUksTUFBTSxLQUFLLENBQUMsQ0FBQyxFQUFFO1FBQ3hCLE9BQU8sVUFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDO0tBQzlCO0lBRUQsS0FBSyxDQUFDLEtBQUssR0FBRyxLQUFLLEdBQUcsQ0FBQyxDQUFDO0lBQ3hCLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0FBQy9CLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAnLi4vT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBTY2hlZHVsZXJBY3Rpb24sIFNjaGVkdWxlckxpa2UgfSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQgeyBhc3luYyB9IGZyb20gJy4uL3NjaGVkdWxlci9hc3luYyc7XG5pbXBvcnQgeyBpc051bWVyaWMgfSBmcm9tICcuLi91dGlsL2lzTnVtZXJpYyc7XG5pbXBvcnQgeyBpc1NjaGVkdWxlciB9IGZyb20gJy4uL3V0aWwvaXNTY2hlZHVsZXInO1xuaW1wb3J0IHsgU3Vic2NyaWJlciB9IGZyb20gJy4uL1N1YnNjcmliZXInO1xuXG4vKipcbiAqIENyZWF0ZXMgYW4gT2JzZXJ2YWJsZSB0aGF0IHN0YXJ0cyBlbWl0dGluZyBhZnRlciBhbiBgZHVlVGltZWAgYW5kXG4gKiBlbWl0cyBldmVyIGluY3JlYXNpbmcgbnVtYmVycyBhZnRlciBlYWNoIGBwZXJpb2RgIG9mIHRpbWUgdGhlcmVhZnRlci5cbiAqXG4gKiA8c3BhbiBjbGFzcz1cImluZm9ybWFsXCI+SXRzIGxpa2Uge0BsaW5rIGluZGV4L2ludGVydmFsfSwgYnV0IHlvdSBjYW4gc3BlY2lmeSB3aGVuXG4gKiBzaG91bGQgdGhlIGVtaXNzaW9ucyBzdGFydC48L3NwYW4+XG4gKlxuICogIVtdKHRpbWVyLnBuZylcbiAqXG4gKiBgdGltZXJgIHJldHVybnMgYW4gT2JzZXJ2YWJsZSB0aGF0IGVtaXRzIGFuIGluZmluaXRlIHNlcXVlbmNlIG9mIGFzY2VuZGluZ1xuICogaW50ZWdlcnMsIHdpdGggYSBjb25zdGFudCBpbnRlcnZhbCBvZiB0aW1lLCBgcGVyaW9kYCBvZiB5b3VyIGNob29zaW5nXG4gKiBiZXR3ZWVuIHRob3NlIGVtaXNzaW9ucy4gVGhlIGZpcnN0IGVtaXNzaW9uIGhhcHBlbnMgYWZ0ZXIgdGhlIHNwZWNpZmllZFxuICogYGR1ZVRpbWVgLiBUaGUgaW5pdGlhbCBkZWxheSBtYXkgYmUgYSBgRGF0ZWAuIEJ5IGRlZmF1bHQsIHRoaXNcbiAqIG9wZXJhdG9yIHVzZXMgdGhlIHtAbGluayBhc3luY1NjaGVkdWxlcn0ge0BsaW5rIFNjaGVkdWxlckxpa2V9IHRvIHByb3ZpZGUgYSBub3Rpb24gb2YgdGltZSwgYnV0IHlvdVxuICogbWF5IHBhc3MgYW55IHtAbGluayBTY2hlZHVsZXJMaWtlfSB0byBpdC4gSWYgYHBlcmlvZGAgaXMgbm90IHNwZWNpZmllZCwgdGhlIG91dHB1dFxuICogT2JzZXJ2YWJsZSBlbWl0cyBvbmx5IG9uZSB2YWx1ZSwgYDBgLiBPdGhlcndpc2UsIGl0IGVtaXRzIGFuIGluZmluaXRlXG4gKiBzZXF1ZW5jZS5cbiAqXG4gKiAjIyBFeGFtcGxlc1xuICogIyMjIEVtaXRzIGFzY2VuZGluZyBudW1iZXJzLCBvbmUgZXZlcnkgc2Vjb25kICgxMDAwbXMpLCBzdGFydGluZyBhZnRlciAzIHNlY29uZHNcbiAqIGBgYGphdmFzY3JpcHRcbiAqIGNvbnN0IG51bWJlcnMgPSB0aW1lcigzMDAwLCAxMDAwKTtcbiAqIG51bWJlcnMuc3Vic2NyaWJlKHggPT4gY29uc29sZS5sb2coeCkpO1xuICogYGBgXG4gKlxuICogIyMjIEVtaXRzIG9uZSBudW1iZXIgYWZ0ZXIgZml2ZSBzZWNvbmRzXG4gKiBgYGBqYXZhc2NyaXB0XG4gKiBjb25zdCBudW1iZXJzID0gdGltZXIoNTAwMCk7XG4gKiBudW1iZXJzLnN1YnNjcmliZSh4ID0+IGNvbnNvbGUubG9nKHgpKTtcbiAqIGBgYFxuICogQHNlZSB7QGxpbmsgaW5kZXgvaW50ZXJ2YWx9XG4gKiBAc2VlIHtAbGluayBkZWxheX1cbiAqXG4gKiBAcGFyYW0ge251bWJlcnxEYXRlfSBbZHVlVGltZV0gVGhlIGluaXRpYWwgZGVsYXkgdGltZSBzcGVjaWZpZWQgYXMgYSBEYXRlIG9iamVjdCBvciBhcyBhbiBpbnRlZ2VyIGRlbm90aW5nXG4gKiBtaWxsaXNlY29uZHMgdG8gd2FpdCBiZWZvcmUgZW1pdHRpbmcgdGhlIGZpcnN0IHZhbHVlIG9mIDBgLlxuICogQHBhcmFtIHtudW1iZXJ8U2NoZWR1bGVyTGlrZX0gW3BlcmlvZE9yU2NoZWR1bGVyXSBUaGUgcGVyaW9kIG9mIHRpbWUgYmV0d2VlbiBlbWlzc2lvbnMgb2YgdGhlXG4gKiBzdWJzZXF1ZW50IG51bWJlcnMuXG4gKiBAcGFyYW0ge1NjaGVkdWxlckxpa2V9IFtzY2hlZHVsZXI9YXN5bmNdIFRoZSB7QGxpbmsgU2NoZWR1bGVyTGlrZX0gdG8gdXNlIGZvciBzY2hlZHVsaW5nXG4gKiB0aGUgZW1pc3Npb24gb2YgdmFsdWVzLCBhbmQgcHJvdmlkaW5nIGEgbm90aW9uIG9mIFwidGltZVwiLlxuICogQHJldHVybiB7T2JzZXJ2YWJsZX0gQW4gT2JzZXJ2YWJsZSB0aGF0IGVtaXRzIGEgYDBgIGFmdGVyIHRoZVxuICogYGR1ZVRpbWVgIGFuZCBldmVyIGluY3JlYXNpbmcgbnVtYmVycyBhZnRlciBlYWNoIGBwZXJpb2RgIG9mIHRpbWVcbiAqIHRoZXJlYWZ0ZXIuXG4gKiBAc3RhdGljIHRydWVcbiAqIEBuYW1lIHRpbWVyXG4gKiBAb3duZXIgT2JzZXJ2YWJsZVxuICovXG5leHBvcnQgZnVuY3Rpb24gdGltZXIoZHVlVGltZTogbnVtYmVyIHwgRGF0ZSA9IDAsXG4gICAgICAgICAgICAgICAgICAgICAgcGVyaW9kT3JTY2hlZHVsZXI/OiBudW1iZXIgfCBTY2hlZHVsZXJMaWtlLFxuICAgICAgICAgICAgICAgICAgICAgIHNjaGVkdWxlcj86IFNjaGVkdWxlckxpa2UpOiBPYnNlcnZhYmxlPG51bWJlcj4ge1xuICBsZXQgcGVyaW9kID0gLTE7XG4gIGlmIChpc051bWVyaWMocGVyaW9kT3JTY2hlZHVsZXIpKSB7XG4gICAgcGVyaW9kID0gTnVtYmVyKHBlcmlvZE9yU2NoZWR1bGVyKSA8IDEgJiYgMSB8fCBOdW1iZXIocGVyaW9kT3JTY2hlZHVsZXIpO1xuICB9IGVsc2UgaWYgKGlzU2NoZWR1bGVyKHBlcmlvZE9yU2NoZWR1bGVyKSkge1xuICAgIHNjaGVkdWxlciA9IHBlcmlvZE9yU2NoZWR1bGVyIGFzIGFueTtcbiAgfVxuXG4gIGlmICghaXNTY2hlZHVsZXIoc2NoZWR1bGVyKSkge1xuICAgIHNjaGVkdWxlciA9IGFzeW5jO1xuICB9XG5cbiAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlKHN1YnNjcmliZXIgPT4ge1xuICAgIGNvbnN0IGR1ZSA9IGlzTnVtZXJpYyhkdWVUaW1lKVxuICAgICAgPyAoZHVlVGltZSBhcyBudW1iZXIpXG4gICAgICA6ICgrZHVlVGltZSAtIHNjaGVkdWxlci5ub3coKSk7XG5cbiAgICByZXR1cm4gc2NoZWR1bGVyLnNjaGVkdWxlKGRpc3BhdGNoLCBkdWUsIHtcbiAgICAgIGluZGV4OiAwLCBwZXJpb2QsIHN1YnNjcmliZXJcbiAgICB9KTtcbiAgfSk7XG59XG5cbmludGVyZmFjZSBUaW1lclN0YXRlIHtcbiAgaW5kZXg6IG51bWJlcjtcbiAgcGVyaW9kOiBudW1iZXI7XG4gIHN1YnNjcmliZXI6IFN1YnNjcmliZXI8bnVtYmVyPjtcbn1cblxuZnVuY3Rpb24gZGlzcGF0Y2godGhpczogU2NoZWR1bGVyQWN0aW9uPFRpbWVyU3RhdGU+LCBzdGF0ZTogVGltZXJTdGF0ZSkge1xuICBjb25zdCB7IGluZGV4LCBwZXJpb2QsIHN1YnNjcmliZXIgfSA9IHN0YXRlO1xuICBzdWJzY3JpYmVyLm5leHQoaW5kZXgpO1xuXG4gIGlmIChzdWJzY3JpYmVyLmNsb3NlZCkge1xuICAgIHJldHVybjtcbiAgfSBlbHNlIGlmIChwZXJpb2QgPT09IC0xKSB7XG4gICAgcmV0dXJuIHN1YnNjcmliZXIuY29tcGxldGUoKTtcbiAgfVxuXG4gIHN0YXRlLmluZGV4ID0gaW5kZXggKyAxO1xuICB0aGlzLnNjaGVkdWxlKHN0YXRlLCBwZXJpb2QpO1xufVxuIl19