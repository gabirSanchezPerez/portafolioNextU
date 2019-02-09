"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Observable_1 = require("../Observable");
var isArray_1 = require("../util/isArray");
var isFunction_1 = require("../util/isFunction");
var map_1 = require("../operators/map");
/* tslint:enable:max-line-length */
/**
 * Creates an Observable from an arbitrary API for registering event handlers.
 *
 * <span class="informal">When that method for adding event handler was something {@link fromEvent}
 * was not prepared for.</span>
 *
 * ![](fromEventPattern.png)
 *
 * `fromEventPattern` allows you to convert into an Observable any API that supports registering handler functions
 * for events. It is similar to {@link fromEvent}, but far
 * more flexible. In fact, all use cases of {@link fromEvent} could be easily handled by
 * `fromEventPattern` (although in slightly more verbose way).
 *
 * This operator accepts as a first argument an `addHandler` function, which will be injected with
 * handler parameter. That handler is actually an event handler function that you now can pass
 * to API expecting it. `addHandler` will be called whenever Observable
 * returned by the operator is subscribed, so registering handler in API will not
 * necessarily happen when `fromEventPattern` is called.
 *
 * After registration, every time an event that we listen to happens,
 * Observable returned by `fromEventPattern` will emit value that event handler
 * function was called with. Note that if event handler was called with more
 * then one argument, second and following arguments will not appear in the Observable.
 *
 * If API you are using allows to unregister event handlers as well, you can pass to `fromEventPattern`
 * another function - `removeHandler` - as a second parameter. It will be injected
 * with the same handler function as before, which now you can use to unregister
 * it from the API. `removeHandler` will be called when consumer of resulting Observable
 * unsubscribes from it.
 *
 * In some APIs unregistering is actually handled differently. Method registering an event handler
 * returns some kind of token, which is later used to identify which function should
 * be unregistered or it itself has method that unregisters event handler.
 * If that is the case with your API, make sure token returned
 * by registering method is returned by `addHandler`. Then it will be passed
 * as a second argument to `removeHandler`, where you will be able to use it.
 *
 * If you need access to all event handler parameters (not only the first one),
 * or you need to transform them in any way, you can call `fromEventPattern` with optional
 * third parameter - project function which will accept all arguments passed to
 * event handler when it is called. Whatever is returned from project function will appear on
 * resulting stream instead of usual event handlers first argument. This means
 * that default project can be thought of as function that takes its first parameter
 * and ignores the rest.
 *
 * ## Example
 * ### Emits clicks happening on the DOM document
 *
 * ```javascript
 * function addClickHandler(handler) {
 *   document.addEventListener('click', handler);
 * }
 *
 * function removeClickHandler(handler) {
 *   document.removeEventListener('click', handler);
 * }
 *
 * const clicks = fromEventPattern(
 *   addClickHandler,
 *   removeClickHandler
 * );
 * clicks.subscribe(x => console.log(x));
 *
 * // Whenever you click anywhere in the browser, DOM MouseEvent
 * // object will be logged.
 * ```
 *
 * ## Example
 * ### Use with API that returns cancellation token
 *
 * ```javascript
 * const token = someAPI.registerEventHandler(function() {});
 * someAPI.unregisterEventHandler(token); // this APIs cancellation method accepts
 *                                        // not handler itself, but special token.
 *
 * const someAPIObservable = fromEventPattern(
 *   function(handler) { return someAPI.registerEventHandler(handler); }, // Note that we return the token here...
 *   function(handler, token) { someAPI.unregisterEventHandler(token); }  // ...to then use it here.
 * );
 * ```
 *
 * ## Example
 * ### Use with project function
 *
 * ```javascript
 * someAPI.registerEventHandler((eventType, eventMessage) => {
 *   console.log(eventType, eventMessage); // Logs "EVENT_TYPE" "EVENT_MESSAGE" to console.
 * });
 *
 * const someAPIObservable = fromEventPattern(
 *   handler => someAPI.registerEventHandler(handler),
 *   handler => someAPI.unregisterEventHandler(handler)
 *   (eventType, eventMessage) => eventType + " --- " + eventMessage // without that function only "EVENT_TYPE"
 * );                                                                // would be emitted by the Observable
 *
 * someAPIObservable.subscribe(value => console.log(value));
 *
 * // Logs:
 * // "EVENT_TYPE --- EVENT_MESSAGE"
 * ```
 *
 * @see {@link fromEvent}
 * @see {@link bindCallback}
 * @see {@link bindNodeCallback}
 *
 * @param {function(handler: Function): any} addHandler A function that takes
 * a `handler` function as argument and attaches it somehow to the actual
 * source of events.
 * @param {function(handler: Function, token?: any): void} [removeHandler] A function that
 * takes a `handler` function as an argument and removes it from the event source. If `addHandler`
 * returns some kind of token, `removeHandler` function will have it as a second parameter.
 * @param {function(...args: any): T} [project] A function to
 * transform results. It takes the arguments from the event handler and
 * should return a single value.
 * @return {Observable<T>} Observable which, when an event happens, emits first parameter
 * passed to registered event handler. Alternatively it emits whatever project function returns
 * at that moment.
 * @static true
 * @name fromEventPattern
 * @owner Observable
 */
function fromEventPattern(addHandler, removeHandler, resultSelector) {
    if (resultSelector) {
        // DEPRECATED PATH
        return fromEventPattern(addHandler, removeHandler).pipe(map_1.map(function (args) { return isArray_1.isArray(args) ? resultSelector.apply(void 0, args) : resultSelector(args); }));
    }
    return new Observable_1.Observable(function (subscriber) {
        var handler = function () {
            var e = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                e[_i] = arguments[_i];
            }
            return subscriber.next(e.length === 1 ? e[0] : e);
        };
        var retValue;
        try {
            retValue = addHandler(handler);
        }
        catch (err) {
            subscriber.error(err);
            return undefined;
        }
        if (!isFunction_1.isFunction(removeHandler)) {
            return undefined;
        }
        return function () { return removeHandler(handler, retValue); };
    });
}
exports.fromEventPattern = fromEventPattern;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJvbUV2ZW50UGF0dGVybi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZyb21FdmVudFBhdHRlcm4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw0Q0FBMkM7QUFDM0MsMkNBQTBDO0FBQzFDLGlEQUFnRDtBQUVoRCx3Q0FBdUM7QUFNdkMsbUNBQW1DO0FBRW5DOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F3SEc7QUFFSCxTQUFnQixnQkFBZ0IsQ0FBSSxVQUFzQyxFQUN0QyxhQUF5RCxFQUN6RCxjQUFzQztJQUV4RSxJQUFJLGNBQWMsRUFBRTtRQUNsQixrQkFBa0I7UUFDbEIsT0FBTyxnQkFBZ0IsQ0FBSSxVQUFVLEVBQUUsYUFBYSxDQUFDLENBQUMsSUFBSSxDQUN4RCxTQUFHLENBQUMsVUFBQSxJQUFJLElBQUksT0FBQSxpQkFBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxjQUFjLGVBQUksSUFBSSxFQUFFLENBQUMsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEVBQTlELENBQThELENBQUMsQ0FDNUUsQ0FBQztLQUNIO0lBRUQsT0FBTyxJQUFJLHVCQUFVLENBQVUsVUFBQSxVQUFVO1FBQ3ZDLElBQU0sT0FBTyxHQUFHO1lBQUMsV0FBUztpQkFBVCxVQUFTLEVBQVQscUJBQVMsRUFBVCxJQUFTO2dCQUFULHNCQUFTOztZQUFLLE9BQUEsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFBMUMsQ0FBMEMsQ0FBQztRQUUxRSxJQUFJLFFBQWEsQ0FBQztRQUNsQixJQUFJO1lBQ0YsUUFBUSxHQUFHLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUNoQztRQUFDLE9BQU8sR0FBRyxFQUFFO1lBQ1osVUFBVSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUN0QixPQUFPLFNBQVMsQ0FBQztTQUNsQjtRQUVELElBQUksQ0FBQyx1QkFBVSxDQUFDLGFBQWEsQ0FBQyxFQUFFO1lBQzlCLE9BQU8sU0FBUyxDQUFDO1NBQ2xCO1FBRUQsT0FBTyxjQUFNLE9BQUEsYUFBYSxDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsRUFBaEMsQ0FBZ0MsQ0FBRTtJQUNqRCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUE1QkQsNENBNEJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJy4uL09ic2VydmFibGUnO1xuaW1wb3J0IHsgaXNBcnJheSB9IGZyb20gJy4uL3V0aWwvaXNBcnJheSc7XG5pbXBvcnQgeyBpc0Z1bmN0aW9uIH0gZnJvbSAnLi4vdXRpbC9pc0Z1bmN0aW9uJztcbmltcG9ydCB7IGZyb21FdmVudCB9IGZyb20gJy4vZnJvbUV2ZW50JztcbmltcG9ydCB7IG1hcCB9IGZyb20gJy4uL29wZXJhdG9ycy9tYXAnO1xuXG4vKiB0c2xpbnQ6ZGlzYWJsZTptYXgtbGluZS1sZW5ndGggKi9cbmV4cG9ydCBmdW5jdGlvbiBmcm9tRXZlbnRQYXR0ZXJuPFQ+KGFkZEhhbmRsZXI6IChoYW5kbGVyOiBGdW5jdGlvbikgPT4gYW55LCByZW1vdmVIYW5kbGVyPzogKGhhbmRsZXI6IEZ1bmN0aW9uLCBzaWduYWw/OiBhbnkpID0+IHZvaWQpOiBPYnNlcnZhYmxlPFQ+O1xuLyoqIEBkZXByZWNhdGVkIHJlc3VsdFNlbGVjdG9yIG5vIGxvbmdlciBzdXBwb3J0ZWQsIHBpcGUgdG8gbWFwIGluc3RlYWQgKi9cbmV4cG9ydCBmdW5jdGlvbiBmcm9tRXZlbnRQYXR0ZXJuPFQ+KGFkZEhhbmRsZXI6IChoYW5kbGVyOiBGdW5jdGlvbikgPT4gYW55LCByZW1vdmVIYW5kbGVyPzogKGhhbmRsZXI6IEZ1bmN0aW9uLCBzaWduYWw/OiBhbnkpID0+IHZvaWQsIHJlc3VsdFNlbGVjdG9yPzogKC4uLmFyZ3M6IGFueVtdKSA9PiBUKTogT2JzZXJ2YWJsZTxUPjtcbi8qIHRzbGludDplbmFibGU6bWF4LWxpbmUtbGVuZ3RoICovXG5cbi8qKlxuICogQ3JlYXRlcyBhbiBPYnNlcnZhYmxlIGZyb20gYW4gYXJiaXRyYXJ5IEFQSSBmb3IgcmVnaXN0ZXJpbmcgZXZlbnQgaGFuZGxlcnMuXG4gKlxuICogPHNwYW4gY2xhc3M9XCJpbmZvcm1hbFwiPldoZW4gdGhhdCBtZXRob2QgZm9yIGFkZGluZyBldmVudCBoYW5kbGVyIHdhcyBzb21ldGhpbmcge0BsaW5rIGZyb21FdmVudH1cbiAqIHdhcyBub3QgcHJlcGFyZWQgZm9yLjwvc3Bhbj5cbiAqXG4gKiAhW10oZnJvbUV2ZW50UGF0dGVybi5wbmcpXG4gKlxuICogYGZyb21FdmVudFBhdHRlcm5gIGFsbG93cyB5b3UgdG8gY29udmVydCBpbnRvIGFuIE9ic2VydmFibGUgYW55IEFQSSB0aGF0IHN1cHBvcnRzIHJlZ2lzdGVyaW5nIGhhbmRsZXIgZnVuY3Rpb25zXG4gKiBmb3IgZXZlbnRzLiBJdCBpcyBzaW1pbGFyIHRvIHtAbGluayBmcm9tRXZlbnR9LCBidXQgZmFyXG4gKiBtb3JlIGZsZXhpYmxlLiBJbiBmYWN0LCBhbGwgdXNlIGNhc2VzIG9mIHtAbGluayBmcm9tRXZlbnR9IGNvdWxkIGJlIGVhc2lseSBoYW5kbGVkIGJ5XG4gKiBgZnJvbUV2ZW50UGF0dGVybmAgKGFsdGhvdWdoIGluIHNsaWdodGx5IG1vcmUgdmVyYm9zZSB3YXkpLlxuICpcbiAqIFRoaXMgb3BlcmF0b3IgYWNjZXB0cyBhcyBhIGZpcnN0IGFyZ3VtZW50IGFuIGBhZGRIYW5kbGVyYCBmdW5jdGlvbiwgd2hpY2ggd2lsbCBiZSBpbmplY3RlZCB3aXRoXG4gKiBoYW5kbGVyIHBhcmFtZXRlci4gVGhhdCBoYW5kbGVyIGlzIGFjdHVhbGx5IGFuIGV2ZW50IGhhbmRsZXIgZnVuY3Rpb24gdGhhdCB5b3Ugbm93IGNhbiBwYXNzXG4gKiB0byBBUEkgZXhwZWN0aW5nIGl0LiBgYWRkSGFuZGxlcmAgd2lsbCBiZSBjYWxsZWQgd2hlbmV2ZXIgT2JzZXJ2YWJsZVxuICogcmV0dXJuZWQgYnkgdGhlIG9wZXJhdG9yIGlzIHN1YnNjcmliZWQsIHNvIHJlZ2lzdGVyaW5nIGhhbmRsZXIgaW4gQVBJIHdpbGwgbm90XG4gKiBuZWNlc3NhcmlseSBoYXBwZW4gd2hlbiBgZnJvbUV2ZW50UGF0dGVybmAgaXMgY2FsbGVkLlxuICpcbiAqIEFmdGVyIHJlZ2lzdHJhdGlvbiwgZXZlcnkgdGltZSBhbiBldmVudCB0aGF0IHdlIGxpc3RlbiB0byBoYXBwZW5zLFxuICogT2JzZXJ2YWJsZSByZXR1cm5lZCBieSBgZnJvbUV2ZW50UGF0dGVybmAgd2lsbCBlbWl0IHZhbHVlIHRoYXQgZXZlbnQgaGFuZGxlclxuICogZnVuY3Rpb24gd2FzIGNhbGxlZCB3aXRoLiBOb3RlIHRoYXQgaWYgZXZlbnQgaGFuZGxlciB3YXMgY2FsbGVkIHdpdGggbW9yZVxuICogdGhlbiBvbmUgYXJndW1lbnQsIHNlY29uZCBhbmQgZm9sbG93aW5nIGFyZ3VtZW50cyB3aWxsIG5vdCBhcHBlYXIgaW4gdGhlIE9ic2VydmFibGUuXG4gKlxuICogSWYgQVBJIHlvdSBhcmUgdXNpbmcgYWxsb3dzIHRvIHVucmVnaXN0ZXIgZXZlbnQgaGFuZGxlcnMgYXMgd2VsbCwgeW91IGNhbiBwYXNzIHRvIGBmcm9tRXZlbnRQYXR0ZXJuYFxuICogYW5vdGhlciBmdW5jdGlvbiAtIGByZW1vdmVIYW5kbGVyYCAtIGFzIGEgc2Vjb25kIHBhcmFtZXRlci4gSXQgd2lsbCBiZSBpbmplY3RlZFxuICogd2l0aCB0aGUgc2FtZSBoYW5kbGVyIGZ1bmN0aW9uIGFzIGJlZm9yZSwgd2hpY2ggbm93IHlvdSBjYW4gdXNlIHRvIHVucmVnaXN0ZXJcbiAqIGl0IGZyb20gdGhlIEFQSS4gYHJlbW92ZUhhbmRsZXJgIHdpbGwgYmUgY2FsbGVkIHdoZW4gY29uc3VtZXIgb2YgcmVzdWx0aW5nIE9ic2VydmFibGVcbiAqIHVuc3Vic2NyaWJlcyBmcm9tIGl0LlxuICpcbiAqIEluIHNvbWUgQVBJcyB1bnJlZ2lzdGVyaW5nIGlzIGFjdHVhbGx5IGhhbmRsZWQgZGlmZmVyZW50bHkuIE1ldGhvZCByZWdpc3RlcmluZyBhbiBldmVudCBoYW5kbGVyXG4gKiByZXR1cm5zIHNvbWUga2luZCBvZiB0b2tlbiwgd2hpY2ggaXMgbGF0ZXIgdXNlZCB0byBpZGVudGlmeSB3aGljaCBmdW5jdGlvbiBzaG91bGRcbiAqIGJlIHVucmVnaXN0ZXJlZCBvciBpdCBpdHNlbGYgaGFzIG1ldGhvZCB0aGF0IHVucmVnaXN0ZXJzIGV2ZW50IGhhbmRsZXIuXG4gKiBJZiB0aGF0IGlzIHRoZSBjYXNlIHdpdGggeW91ciBBUEksIG1ha2Ugc3VyZSB0b2tlbiByZXR1cm5lZFxuICogYnkgcmVnaXN0ZXJpbmcgbWV0aG9kIGlzIHJldHVybmVkIGJ5IGBhZGRIYW5kbGVyYC4gVGhlbiBpdCB3aWxsIGJlIHBhc3NlZFxuICogYXMgYSBzZWNvbmQgYXJndW1lbnQgdG8gYHJlbW92ZUhhbmRsZXJgLCB3aGVyZSB5b3Ugd2lsbCBiZSBhYmxlIHRvIHVzZSBpdC5cbiAqXG4gKiBJZiB5b3UgbmVlZCBhY2Nlc3MgdG8gYWxsIGV2ZW50IGhhbmRsZXIgcGFyYW1ldGVycyAobm90IG9ubHkgdGhlIGZpcnN0IG9uZSksXG4gKiBvciB5b3UgbmVlZCB0byB0cmFuc2Zvcm0gdGhlbSBpbiBhbnkgd2F5LCB5b3UgY2FuIGNhbGwgYGZyb21FdmVudFBhdHRlcm5gIHdpdGggb3B0aW9uYWxcbiAqIHRoaXJkIHBhcmFtZXRlciAtIHByb2plY3QgZnVuY3Rpb24gd2hpY2ggd2lsbCBhY2NlcHQgYWxsIGFyZ3VtZW50cyBwYXNzZWQgdG9cbiAqIGV2ZW50IGhhbmRsZXIgd2hlbiBpdCBpcyBjYWxsZWQuIFdoYXRldmVyIGlzIHJldHVybmVkIGZyb20gcHJvamVjdCBmdW5jdGlvbiB3aWxsIGFwcGVhciBvblxuICogcmVzdWx0aW5nIHN0cmVhbSBpbnN0ZWFkIG9mIHVzdWFsIGV2ZW50IGhhbmRsZXJzIGZpcnN0IGFyZ3VtZW50LiBUaGlzIG1lYW5zXG4gKiB0aGF0IGRlZmF1bHQgcHJvamVjdCBjYW4gYmUgdGhvdWdodCBvZiBhcyBmdW5jdGlvbiB0aGF0IHRha2VzIGl0cyBmaXJzdCBwYXJhbWV0ZXJcbiAqIGFuZCBpZ25vcmVzIHRoZSByZXN0LlxuICpcbiAqICMjIEV4YW1wbGVcbiAqICMjIyBFbWl0cyBjbGlja3MgaGFwcGVuaW5nIG9uIHRoZSBET00gZG9jdW1lbnRcbiAqXG4gKiBgYGBqYXZhc2NyaXB0XG4gKiBmdW5jdGlvbiBhZGRDbGlja0hhbmRsZXIoaGFuZGxlcikge1xuICogICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGhhbmRsZXIpO1xuICogfVxuICpcbiAqIGZ1bmN0aW9uIHJlbW92ZUNsaWNrSGFuZGxlcihoYW5kbGVyKSB7XG4gKiAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGFuZGxlcik7XG4gKiB9XG4gKlxuICogY29uc3QgY2xpY2tzID0gZnJvbUV2ZW50UGF0dGVybihcbiAqICAgYWRkQ2xpY2tIYW5kbGVyLFxuICogICByZW1vdmVDbGlja0hhbmRsZXJcbiAqICk7XG4gKiBjbGlja3Muc3Vic2NyaWJlKHggPT4gY29uc29sZS5sb2coeCkpO1xuICpcbiAqIC8vIFdoZW5ldmVyIHlvdSBjbGljayBhbnl3aGVyZSBpbiB0aGUgYnJvd3NlciwgRE9NIE1vdXNlRXZlbnRcbiAqIC8vIG9iamVjdCB3aWxsIGJlIGxvZ2dlZC5cbiAqIGBgYFxuICpcbiAqICMjIEV4YW1wbGVcbiAqICMjIyBVc2Ugd2l0aCBBUEkgdGhhdCByZXR1cm5zIGNhbmNlbGxhdGlvbiB0b2tlblxuICpcbiAqIGBgYGphdmFzY3JpcHRcbiAqIGNvbnN0IHRva2VuID0gc29tZUFQSS5yZWdpc3RlckV2ZW50SGFuZGxlcihmdW5jdGlvbigpIHt9KTtcbiAqIHNvbWVBUEkudW5yZWdpc3RlckV2ZW50SGFuZGxlcih0b2tlbik7IC8vIHRoaXMgQVBJcyBjYW5jZWxsYXRpb24gbWV0aG9kIGFjY2VwdHNcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIG5vdCBoYW5kbGVyIGl0c2VsZiwgYnV0IHNwZWNpYWwgdG9rZW4uXG4gKlxuICogY29uc3Qgc29tZUFQSU9ic2VydmFibGUgPSBmcm9tRXZlbnRQYXR0ZXJuKFxuICogICBmdW5jdGlvbihoYW5kbGVyKSB7IHJldHVybiBzb21lQVBJLnJlZ2lzdGVyRXZlbnRIYW5kbGVyKGhhbmRsZXIpOyB9LCAvLyBOb3RlIHRoYXQgd2UgcmV0dXJuIHRoZSB0b2tlbiBoZXJlLi4uXG4gKiAgIGZ1bmN0aW9uKGhhbmRsZXIsIHRva2VuKSB7IHNvbWVBUEkudW5yZWdpc3RlckV2ZW50SGFuZGxlcih0b2tlbik7IH0gIC8vIC4uLnRvIHRoZW4gdXNlIGl0IGhlcmUuXG4gKiApO1xuICogYGBgXG4gKlxuICogIyMgRXhhbXBsZVxuICogIyMjIFVzZSB3aXRoIHByb2plY3QgZnVuY3Rpb25cbiAqXG4gKiBgYGBqYXZhc2NyaXB0XG4gKiBzb21lQVBJLnJlZ2lzdGVyRXZlbnRIYW5kbGVyKChldmVudFR5cGUsIGV2ZW50TWVzc2FnZSkgPT4ge1xuICogICBjb25zb2xlLmxvZyhldmVudFR5cGUsIGV2ZW50TWVzc2FnZSk7IC8vIExvZ3MgXCJFVkVOVF9UWVBFXCIgXCJFVkVOVF9NRVNTQUdFXCIgdG8gY29uc29sZS5cbiAqIH0pO1xuICpcbiAqIGNvbnN0IHNvbWVBUElPYnNlcnZhYmxlID0gZnJvbUV2ZW50UGF0dGVybihcbiAqICAgaGFuZGxlciA9PiBzb21lQVBJLnJlZ2lzdGVyRXZlbnRIYW5kbGVyKGhhbmRsZXIpLFxuICogICBoYW5kbGVyID0+IHNvbWVBUEkudW5yZWdpc3RlckV2ZW50SGFuZGxlcihoYW5kbGVyKVxuICogICAoZXZlbnRUeXBlLCBldmVudE1lc3NhZ2UpID0+IGV2ZW50VHlwZSArIFwiIC0tLSBcIiArIGV2ZW50TWVzc2FnZSAvLyB3aXRob3V0IHRoYXQgZnVuY3Rpb24gb25seSBcIkVWRU5UX1RZUEVcIlxuICogKTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gd291bGQgYmUgZW1pdHRlZCBieSB0aGUgT2JzZXJ2YWJsZVxuICpcbiAqIHNvbWVBUElPYnNlcnZhYmxlLnN1YnNjcmliZSh2YWx1ZSA9PiBjb25zb2xlLmxvZyh2YWx1ZSkpO1xuICpcbiAqIC8vIExvZ3M6XG4gKiAvLyBcIkVWRU5UX1RZUEUgLS0tIEVWRU5UX01FU1NBR0VcIlxuICogYGBgXG4gKlxuICogQHNlZSB7QGxpbmsgZnJvbUV2ZW50fVxuICogQHNlZSB7QGxpbmsgYmluZENhbGxiYWNrfVxuICogQHNlZSB7QGxpbmsgYmluZE5vZGVDYWxsYmFja31cbiAqXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKGhhbmRsZXI6IEZ1bmN0aW9uKTogYW55fSBhZGRIYW5kbGVyIEEgZnVuY3Rpb24gdGhhdCB0YWtlc1xuICogYSBgaGFuZGxlcmAgZnVuY3Rpb24gYXMgYXJndW1lbnQgYW5kIGF0dGFjaGVzIGl0IHNvbWVob3cgdG8gdGhlIGFjdHVhbFxuICogc291cmNlIG9mIGV2ZW50cy5cbiAqIEBwYXJhbSB7ZnVuY3Rpb24oaGFuZGxlcjogRnVuY3Rpb24sIHRva2VuPzogYW55KTogdm9pZH0gW3JlbW92ZUhhbmRsZXJdIEEgZnVuY3Rpb24gdGhhdFxuICogdGFrZXMgYSBgaGFuZGxlcmAgZnVuY3Rpb24gYXMgYW4gYXJndW1lbnQgYW5kIHJlbW92ZXMgaXQgZnJvbSB0aGUgZXZlbnQgc291cmNlLiBJZiBgYWRkSGFuZGxlcmBcbiAqIHJldHVybnMgc29tZSBraW5kIG9mIHRva2VuLCBgcmVtb3ZlSGFuZGxlcmAgZnVuY3Rpb24gd2lsbCBoYXZlIGl0IGFzIGEgc2Vjb25kIHBhcmFtZXRlci5cbiAqIEBwYXJhbSB7ZnVuY3Rpb24oLi4uYXJnczogYW55KTogVH0gW3Byb2plY3RdIEEgZnVuY3Rpb24gdG9cbiAqIHRyYW5zZm9ybSByZXN1bHRzLiBJdCB0YWtlcyB0aGUgYXJndW1lbnRzIGZyb20gdGhlIGV2ZW50IGhhbmRsZXIgYW5kXG4gKiBzaG91bGQgcmV0dXJuIGEgc2luZ2xlIHZhbHVlLlxuICogQHJldHVybiB7T2JzZXJ2YWJsZTxUPn0gT2JzZXJ2YWJsZSB3aGljaCwgd2hlbiBhbiBldmVudCBoYXBwZW5zLCBlbWl0cyBmaXJzdCBwYXJhbWV0ZXJcbiAqIHBhc3NlZCB0byByZWdpc3RlcmVkIGV2ZW50IGhhbmRsZXIuIEFsdGVybmF0aXZlbHkgaXQgZW1pdHMgd2hhdGV2ZXIgcHJvamVjdCBmdW5jdGlvbiByZXR1cm5zXG4gKiBhdCB0aGF0IG1vbWVudC5cbiAqIEBzdGF0aWMgdHJ1ZVxuICogQG5hbWUgZnJvbUV2ZW50UGF0dGVyblxuICogQG93bmVyIE9ic2VydmFibGVcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gZnJvbUV2ZW50UGF0dGVybjxUPihhZGRIYW5kbGVyOiAoaGFuZGxlcjogRnVuY3Rpb24pID0+IGFueSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlbW92ZUhhbmRsZXI/OiAoaGFuZGxlcjogRnVuY3Rpb24sIHNpZ25hbD86IGFueSkgPT4gdm9pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdFNlbGVjdG9yPzogKC4uLmFyZ3M6IGFueVtdKSA9PiBUKTogT2JzZXJ2YWJsZTxUIHwgVFtdPiB7XG5cbiAgaWYgKHJlc3VsdFNlbGVjdG9yKSB7XG4gICAgLy8gREVQUkVDQVRFRCBQQVRIXG4gICAgcmV0dXJuIGZyb21FdmVudFBhdHRlcm48VD4oYWRkSGFuZGxlciwgcmVtb3ZlSGFuZGxlcikucGlwZShcbiAgICAgIG1hcChhcmdzID0+IGlzQXJyYXkoYXJncykgPyByZXN1bHRTZWxlY3RvciguLi5hcmdzKSA6IHJlc3VsdFNlbGVjdG9yKGFyZ3MpKVxuICAgICk7XG4gIH1cblxuICByZXR1cm4gbmV3IE9ic2VydmFibGU8VCB8IFRbXT4oc3Vic2NyaWJlciA9PiB7XG4gICAgY29uc3QgaGFuZGxlciA9ICguLi5lOiBUW10pID0+IHN1YnNjcmliZXIubmV4dChlLmxlbmd0aCA9PT0gMSA/IGVbMF0gOiBlKTtcblxuICAgIGxldCByZXRWYWx1ZTogYW55O1xuICAgIHRyeSB7XG4gICAgICByZXRWYWx1ZSA9IGFkZEhhbmRsZXIoaGFuZGxlcik7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBzdWJzY3JpYmVyLmVycm9yKGVycik7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIGlmICghaXNGdW5jdGlvbihyZW1vdmVIYW5kbGVyKSkge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICByZXR1cm4gKCkgPT4gcmVtb3ZlSGFuZGxlcihoYW5kbGVyLCByZXRWYWx1ZSkgO1xuICB9KTtcbn1cbiJdfQ==