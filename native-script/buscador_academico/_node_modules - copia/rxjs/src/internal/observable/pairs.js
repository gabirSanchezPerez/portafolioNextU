"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Observable_1 = require("../Observable");
var Subscription_1 = require("../Subscription");
/**
 * Convert an object into an Observable of `[key, value]` pairs.
 *
 * <span class="informal">Turn entries of an object into a stream.</span>
 *
 * <img src="./img/pairs.png" width="100%">
 *
 * `pairs` takes an arbitrary object and returns an Observable that emits arrays. Each
 * emitted array has exactly two elements - the first is a key from the object
 * and the second is a value corresponding to that key. Keys are extracted from
 * an object via `Object.keys` function, which means that they will be only
 * enumerable keys that are present on an object directly - not ones inherited
 * via prototype chain.
 *
 * By default these arrays are emitted synchronously. To change that you can
 * pass a {@link SchedulerLike} as a second argument to `pairs`.
 *
 * @example <caption>Converts a javascript object to an Observable</caption>
 * ```javascript
 * const obj = {
 *   foo: 42,
 *   bar: 56,
 *   baz: 78
 * };
 *
 * pairs(obj)
 * .subscribe(
 *   value => console.log(value),
 *   err => {},
 *   () => console.log('the end!')
 * );
 *
 * // Logs:
 * // ["foo": 42],
 * // ["bar": 56],
 * // ["baz": 78],
 * // "the end!"
 * ```
 *
 * @param {Object} obj The object to inspect and turn into an
 * Observable sequence.
 * @param {Scheduler} [scheduler] An optional IScheduler to schedule
 * when resulting Observable will emit values.
 * @returns {(Observable<Array<string|T>>)} An observable sequence of
 * [key, value] pairs from the object.
 */
function pairs(obj, scheduler) {
    if (!scheduler) {
        return new Observable_1.Observable(function (subscriber) {
            var keys = Object.keys(obj);
            for (var i = 0; i < keys.length && !subscriber.closed; i++) {
                var key = keys[i];
                if (obj.hasOwnProperty(key)) {
                    subscriber.next([key, obj[key]]);
                }
            }
            subscriber.complete();
        });
    }
    else {
        return new Observable_1.Observable(function (subscriber) {
            var keys = Object.keys(obj);
            var subscription = new Subscription_1.Subscription();
            subscription.add(scheduler.schedule(dispatch, 0, { keys: keys, index: 0, subscriber: subscriber, subscription: subscription, obj: obj }));
            return subscription;
        });
    }
}
exports.pairs = pairs;
/** @internal */
function dispatch(state) {
    var keys = state.keys, index = state.index, subscriber = state.subscriber, subscription = state.subscription, obj = state.obj;
    if (!subscriber.closed) {
        if (index < keys.length) {
            var key = keys[index];
            subscriber.next([key, obj[key]]);
            subscription.add(this.schedule({ keys: keys, index: index + 1, subscriber: subscriber, subscription: subscription, obj: obj }));
        }
        else {
            subscriber.complete();
        }
    }
}
exports.dispatch = dispatch;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFpcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwYWlycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDRDQUEyQztBQUczQyxnREFBK0M7QUFFL0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTZDRztBQUNILFNBQWdCLEtBQUssQ0FBSSxHQUFXLEVBQUUsU0FBeUI7SUFDN0QsSUFBSSxDQUFDLFNBQVMsRUFBRTtRQUNkLE9BQU8sSUFBSSx1QkFBVSxDQUFjLFVBQUEsVUFBVTtZQUMzQyxJQUFNLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzlCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDMUQsSUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNwQixJQUFJLEdBQUcsQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLEVBQUU7b0JBQzNCLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDbEM7YUFDRjtZQUNELFVBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUN4QixDQUFDLENBQUMsQ0FBQztLQUNKO1NBQU07UUFDTCxPQUFPLElBQUksdUJBQVUsQ0FBYyxVQUFBLFVBQVU7WUFDM0MsSUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUM5QixJQUFNLFlBQVksR0FBRyxJQUFJLDJCQUFZLEVBQUUsQ0FBQztZQUN4QyxZQUFZLENBQUMsR0FBRyxDQUNkLFNBQVMsQ0FBQyxRQUFRLENBQ2YsUUFBUSxFQUFFLENBQUMsRUFBRSxFQUFFLElBQUksTUFBQSxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsVUFBVSxZQUFBLEVBQUUsWUFBWSxjQUFBLEVBQUUsR0FBRyxLQUFBLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDdEUsT0FBTyxZQUFZLENBQUM7UUFDdEIsQ0FBQyxDQUFDLENBQUM7S0FDSjtBQUNILENBQUM7QUF0QkQsc0JBc0JDO0FBRUQsZ0JBQWdCO0FBQ2hCLFNBQWdCLFFBQVEsQ0FDSSxLQUFzSDtJQUN4SSxJQUFBLGlCQUFJLEVBQUUsbUJBQUssRUFBRSw2QkFBVSxFQUFFLGlDQUFZLEVBQUUsZUFBRyxDQUFXO0lBQzdELElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFO1FBQ3RCLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDdkIsSUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3hCLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNqQyxZQUFZLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxJQUFJLE1BQUEsRUFBRSxLQUFLLEVBQUUsS0FBSyxHQUFHLENBQUMsRUFBRSxVQUFVLFlBQUEsRUFBRSxZQUFZLGNBQUEsRUFBRSxHQUFHLEtBQUEsRUFBRSxDQUFDLENBQUMsQ0FBQztTQUM1RjthQUFNO1lBQ0wsVUFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDO1NBQ3ZCO0tBQ0Y7QUFDSCxDQUFDO0FBWkQsNEJBWUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAnLi4vT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBTY2hlZHVsZXJBY3Rpb24sIFNjaGVkdWxlckxpa2UgfSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQgeyBTdWJzY3JpYmVyIH0gZnJvbSAnLi4vU3Vic2NyaWJlcic7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICcuLi9TdWJzY3JpcHRpb24nO1xuXG4vKipcbiAqIENvbnZlcnQgYW4gb2JqZWN0IGludG8gYW4gT2JzZXJ2YWJsZSBvZiBgW2tleSwgdmFsdWVdYCBwYWlycy5cbiAqXG4gKiA8c3BhbiBjbGFzcz1cImluZm9ybWFsXCI+VHVybiBlbnRyaWVzIG9mIGFuIG9iamVjdCBpbnRvIGEgc3RyZWFtLjwvc3Bhbj5cbiAqXG4gKiA8aW1nIHNyYz1cIi4vaW1nL3BhaXJzLnBuZ1wiIHdpZHRoPVwiMTAwJVwiPlxuICpcbiAqIGBwYWlyc2AgdGFrZXMgYW4gYXJiaXRyYXJ5IG9iamVjdCBhbmQgcmV0dXJucyBhbiBPYnNlcnZhYmxlIHRoYXQgZW1pdHMgYXJyYXlzLiBFYWNoXG4gKiBlbWl0dGVkIGFycmF5IGhhcyBleGFjdGx5IHR3byBlbGVtZW50cyAtIHRoZSBmaXJzdCBpcyBhIGtleSBmcm9tIHRoZSBvYmplY3RcbiAqIGFuZCB0aGUgc2Vjb25kIGlzIGEgdmFsdWUgY29ycmVzcG9uZGluZyB0byB0aGF0IGtleS4gS2V5cyBhcmUgZXh0cmFjdGVkIGZyb21cbiAqIGFuIG9iamVjdCB2aWEgYE9iamVjdC5rZXlzYCBmdW5jdGlvbiwgd2hpY2ggbWVhbnMgdGhhdCB0aGV5IHdpbGwgYmUgb25seVxuICogZW51bWVyYWJsZSBrZXlzIHRoYXQgYXJlIHByZXNlbnQgb24gYW4gb2JqZWN0IGRpcmVjdGx5IC0gbm90IG9uZXMgaW5oZXJpdGVkXG4gKiB2aWEgcHJvdG90eXBlIGNoYWluLlxuICpcbiAqIEJ5IGRlZmF1bHQgdGhlc2UgYXJyYXlzIGFyZSBlbWl0dGVkIHN5bmNocm9ub3VzbHkuIFRvIGNoYW5nZSB0aGF0IHlvdSBjYW5cbiAqIHBhc3MgYSB7QGxpbmsgU2NoZWR1bGVyTGlrZX0gYXMgYSBzZWNvbmQgYXJndW1lbnQgdG8gYHBhaXJzYC5cbiAqXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5Db252ZXJ0cyBhIGphdmFzY3JpcHQgb2JqZWN0IHRvIGFuIE9ic2VydmFibGU8L2NhcHRpb24+XG4gKiBgYGBqYXZhc2NyaXB0XG4gKiBjb25zdCBvYmogPSB7XG4gKiAgIGZvbzogNDIsXG4gKiAgIGJhcjogNTYsXG4gKiAgIGJhejogNzhcbiAqIH07XG4gKlxuICogcGFpcnMob2JqKVxuICogLnN1YnNjcmliZShcbiAqICAgdmFsdWUgPT4gY29uc29sZS5sb2codmFsdWUpLFxuICogICBlcnIgPT4ge30sXG4gKiAgICgpID0+IGNvbnNvbGUubG9nKCd0aGUgZW5kIScpXG4gKiApO1xuICpcbiAqIC8vIExvZ3M6XG4gKiAvLyBbXCJmb29cIjogNDJdLFxuICogLy8gW1wiYmFyXCI6IDU2XSxcbiAqIC8vIFtcImJhelwiOiA3OF0sXG4gKiAvLyBcInRoZSBlbmQhXCJcbiAqIGBgYFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmogVGhlIG9iamVjdCB0byBpbnNwZWN0IGFuZCB0dXJuIGludG8gYW5cbiAqIE9ic2VydmFibGUgc2VxdWVuY2UuXG4gKiBAcGFyYW0ge1NjaGVkdWxlcn0gW3NjaGVkdWxlcl0gQW4gb3B0aW9uYWwgSVNjaGVkdWxlciB0byBzY2hlZHVsZVxuICogd2hlbiByZXN1bHRpbmcgT2JzZXJ2YWJsZSB3aWxsIGVtaXQgdmFsdWVzLlxuICogQHJldHVybnMgeyhPYnNlcnZhYmxlPEFycmF5PHN0cmluZ3xUPj4pfSBBbiBvYnNlcnZhYmxlIHNlcXVlbmNlIG9mXG4gKiBba2V5LCB2YWx1ZV0gcGFpcnMgZnJvbSB0aGUgb2JqZWN0LlxuICovXG5leHBvcnQgZnVuY3Rpb24gcGFpcnM8VD4ob2JqOiBPYmplY3QsIHNjaGVkdWxlcj86IFNjaGVkdWxlckxpa2UpOiBPYnNlcnZhYmxlPFtzdHJpbmcsIFRdPiB7XG4gIGlmICghc2NoZWR1bGVyKSB7XG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlPFtzdHJpbmcsIFRdPihzdWJzY3JpYmVyID0+IHtcbiAgICAgIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhvYmopO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aCAmJiAhc3Vic2NyaWJlci5jbG9zZWQ7IGkrKykge1xuICAgICAgICBjb25zdCBrZXkgPSBrZXlzW2ldO1xuICAgICAgICBpZiAob2JqLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICBzdWJzY3JpYmVyLm5leHQoW2tleSwgb2JqW2tleV1dKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgc3Vic2NyaWJlci5jb21wbGV0ZSgpO1xuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZTxbc3RyaW5nLCBUXT4oc3Vic2NyaWJlciA9PiB7XG4gICAgICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMob2JqKTtcbiAgICAgIGNvbnN0IHN1YnNjcmlwdGlvbiA9IG5ldyBTdWJzY3JpcHRpb24oKTtcbiAgICAgIHN1YnNjcmlwdGlvbi5hZGQoXG4gICAgICAgIHNjaGVkdWxlci5zY2hlZHVsZTx7IGtleXM6IHN0cmluZ1tdLCBpbmRleDogbnVtYmVyLCBzdWJzY3JpYmVyOiBTdWJzY3JpYmVyPFtzdHJpbmcsIFRdPiwgc3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb24sIG9iajogT2JqZWN0IH0+XG4gICAgICAgICAgKGRpc3BhdGNoLCAwLCB7IGtleXMsIGluZGV4OiAwLCBzdWJzY3JpYmVyLCBzdWJzY3JpcHRpb24sIG9iaiB9KSk7XG4gICAgICByZXR1cm4gc3Vic2NyaXB0aW9uO1xuICAgIH0pO1xuICB9XG59XG5cbi8qKiBAaW50ZXJuYWwgKi9cbmV4cG9ydCBmdW5jdGlvbiBkaXNwYXRjaDxUPih0aGlzOiBTY2hlZHVsZXJBY3Rpb248YW55PixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0ZTogeyBrZXlzOiBzdHJpbmdbXSwgaW5kZXg6IG51bWJlciwgc3Vic2NyaWJlcjogU3Vic2NyaWJlcjxbc3RyaW5nLCBUXT4sIHN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uLCBvYmo6IE9iamVjdCB9KSB7XG4gIGNvbnN0IHsga2V5cywgaW5kZXgsIHN1YnNjcmliZXIsIHN1YnNjcmlwdGlvbiwgb2JqIH0gPSBzdGF0ZTtcbiAgaWYgKCFzdWJzY3JpYmVyLmNsb3NlZCkge1xuICAgIGlmIChpbmRleCA8IGtleXMubGVuZ3RoKSB7XG4gICAgICBjb25zdCBrZXkgPSBrZXlzW2luZGV4XTtcbiAgICAgIHN1YnNjcmliZXIubmV4dChba2V5LCBvYmpba2V5XV0pO1xuICAgICAgc3Vic2NyaXB0aW9uLmFkZCh0aGlzLnNjaGVkdWxlKHsga2V5cywgaW5kZXg6IGluZGV4ICsgMSwgc3Vic2NyaWJlciwgc3Vic2NyaXB0aW9uLCBvYmogfSkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdWJzY3JpYmVyLmNvbXBsZXRlKCk7XG4gICAgfVxuICB9XG59XG4iXX0=