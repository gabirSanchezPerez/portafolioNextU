"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Observable_1 = require("../Observable");
var from_1 = require("./from");
var isArray_1 = require("../util/isArray");
var empty_1 = require("./empty");
/* tslint:enable:max-line-length */
/**
 * When any of the provided Observable emits an complete or error notification, it immediately subscribes to the next one
 * that was passed.
 *
 * <span class="informal">Execute series of Observables no matter what, even if it means swallowing errors.</span>
 *
 * ![](onErrorResumeNext.png)
 *
 * `onErrorResumeNext` Will subscribe to each observable source it is provided, in order.
 * If the source it's subscribed to emits an error or completes, it will move to the next source
 * without error.
 *
 * If `onErrorResumeNext` is provided no arguments, or a single, empty array, it will return {@link index/EMPTY}.
 *
 * `onErrorResumeNext` is basically {@link concat}, only it will continue, even if one of its
 * sources emits an error.
 *
 * Note that there is no way to handle any errors thrown by sources via the resuult of
 * `onErrorResumeNext`. If you want to handle errors thrown in any given source, you can
 * always use the {@link catchError} operator on them before passing them into `onErrorResumeNext`.
 *
 * ## Example
 * Subscribe to the next Observable after map fails</caption>
 * ```javascript
 * import { onErrorResumeNext, of } from 'rxjs';
 * import { map } from 'rxjs/operators';
 *
 * onErrorResumeNext(
 *  of(1, 2, 3, 0).pipe(
 *    map(x => {
 *      if (x === 0) throw Error();
 *      return 10 / x;
 *    })
 *  ),
 *  of(1, 2, 3),
 * )
 * .subscribe(
 *   val => console.log(val),
 *   err => console.log(err),          // Will never be called.
 *   () => console.log('done'),
 * );
 *
 * // Logs:
 * // 10
 * // 5
 * // 3.3333333333333335
 * // 1
 * // 2
 * // 3
 * // "done"
 * ```
 *
 * @see {@link concat}
 * @see {@link catchError}
 *
 * @param {...ObservableInput} sources Observables (or anything that *is* observable) passed either directly or as an array.
 * @return {Observable} An Observable that concatenates all sources, one after the other,
 * ignoring all errors, such that any error causes it to move on to the next source.
 */
function onErrorResumeNext() {
    var sources = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        sources[_i] = arguments[_i];
    }
    if (sources.length === 0) {
        return empty_1.EMPTY;
    }
    var first = sources[0], remainder = sources.slice(1);
    if (sources.length === 1 && isArray_1.isArray(first)) {
        return onErrorResumeNext.apply(void 0, first);
    }
    return new Observable_1.Observable(function (subscriber) {
        var subNext = function () { return subscriber.add(onErrorResumeNext.apply(void 0, remainder).subscribe(subscriber)); };
        return from_1.from(first).subscribe({
            next: function (value) { subscriber.next(value); },
            error: subNext,
            complete: subNext,
        });
    });
}
exports.onErrorResumeNext = onErrorResumeNext;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib25FcnJvclJlc3VtZU5leHQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJvbkVycm9yUmVzdW1lTmV4dC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDRDQUEyQztBQUUzQywrQkFBOEI7QUFDOUIsMkNBQTBDO0FBQzFDLGlDQUFnQztBQVdoQyxtQ0FBbUM7QUFFbkM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EwREc7QUFDSCxTQUFnQixpQkFBaUI7SUFBTyxpQkFFcUQ7U0FGckQsVUFFcUQsRUFGckQscUJBRXFELEVBRnJELElBRXFEO1FBRnJELDRCQUVxRDs7SUFFM0YsSUFBSSxPQUFPLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtRQUN4QixPQUFPLGFBQUssQ0FBQztLQUNkO0lBRU8sSUFBQSxrQkFBSyxFQUFFLDRCQUFZLENBQWE7SUFFeEMsSUFBSSxPQUFPLENBQUMsTUFBTSxLQUFLLENBQUMsSUFBSSxpQkFBTyxDQUFDLEtBQUssQ0FBQyxFQUFFO1FBQzFDLE9BQU8saUJBQWlCLGVBQUksS0FBSyxFQUFFO0tBQ3BDO0lBRUQsT0FBTyxJQUFJLHVCQUFVLENBQUMsVUFBQSxVQUFVO1FBQzlCLElBQU0sT0FBTyxHQUFHLGNBQU0sT0FBQSxVQUFVLENBQUMsR0FBRyxDQUNsQyxpQkFBaUIsZUFBSSxTQUFTLEVBQUUsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUN0RCxFQUZxQixDQUVyQixDQUFDO1FBRUYsT0FBTyxXQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsU0FBUyxDQUFDO1lBQzNCLElBQUksWUFBQyxLQUFLLElBQUksVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdkMsS0FBSyxFQUFFLE9BQU87WUFDZCxRQUFRLEVBQUUsT0FBTztTQUNsQixDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUF6QkQsOENBeUJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJy4uL09ic2VydmFibGUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZUlucHV0IH0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IHsgZnJvbSB9IGZyb20gJy4vZnJvbSc7XG5pbXBvcnQgeyBpc0FycmF5IH0gZnJvbSAnLi4vdXRpbC9pc0FycmF5JztcbmltcG9ydCB7IEVNUFRZIH0gZnJvbSAnLi9lbXB0eSc7XG5cbi8qIHRzbGludDpkaXNhYmxlOm1heC1saW5lLWxlbmd0aCAqL1xuZXhwb3J0IGZ1bmN0aW9uIG9uRXJyb3JSZXN1bWVOZXh0PFI+KHY6IE9ic2VydmFibGVJbnB1dDxSPik6IE9ic2VydmFibGU8Uj47XG5leHBvcnQgZnVuY3Rpb24gb25FcnJvclJlc3VtZU5leHQ8VDIsIFQzLCBSPih2MjogT2JzZXJ2YWJsZUlucHV0PFQyPiwgdjM6IE9ic2VydmFibGVJbnB1dDxUMz4pOiBPYnNlcnZhYmxlPFI+O1xuZXhwb3J0IGZ1bmN0aW9uIG9uRXJyb3JSZXN1bWVOZXh0PFQyLCBUMywgVDQsIFI+KHYyOiBPYnNlcnZhYmxlSW5wdXQ8VDI+LCB2MzogT2JzZXJ2YWJsZUlucHV0PFQzPiwgdjQ6IE9ic2VydmFibGVJbnB1dDxUND4pOiBPYnNlcnZhYmxlPFI+O1xuZXhwb3J0IGZ1bmN0aW9uIG9uRXJyb3JSZXN1bWVOZXh0PFQyLCBUMywgVDQsIFQ1LCBSPih2MjogT2JzZXJ2YWJsZUlucHV0PFQyPiwgdjM6IE9ic2VydmFibGVJbnB1dDxUMz4sIHY0OiBPYnNlcnZhYmxlSW5wdXQ8VDQ+LCB2NTogT2JzZXJ2YWJsZUlucHV0PFQ1Pik6IE9ic2VydmFibGU8Uj47XG5leHBvcnQgZnVuY3Rpb24gb25FcnJvclJlc3VtZU5leHQ8VDIsIFQzLCBUNCwgVDUsIFQ2LCBSPih2MjogT2JzZXJ2YWJsZUlucHV0PFQyPiwgdjM6IE9ic2VydmFibGVJbnB1dDxUMz4sIHY0OiBPYnNlcnZhYmxlSW5wdXQ8VDQ+LCB2NTogT2JzZXJ2YWJsZUlucHV0PFQ1PiwgdjY6IE9ic2VydmFibGVJbnB1dDxUNj4pOiBPYnNlcnZhYmxlPFI+O1xuXG5leHBvcnQgZnVuY3Rpb24gb25FcnJvclJlc3VtZU5leHQ8Uj4oLi4ub2JzZXJ2YWJsZXM6IEFycmF5PE9ic2VydmFibGVJbnB1dDxhbnk+IHwgKCguLi52YWx1ZXM6IEFycmF5PGFueT4pID0+IFIpPik6IE9ic2VydmFibGU8Uj47XG5leHBvcnQgZnVuY3Rpb24gb25FcnJvclJlc3VtZU5leHQ8Uj4oYXJyYXk6IE9ic2VydmFibGVJbnB1dDxhbnk+W10pOiBPYnNlcnZhYmxlPFI+O1xuLyogdHNsaW50OmVuYWJsZTptYXgtbGluZS1sZW5ndGggKi9cblxuLyoqXG4gKiBXaGVuIGFueSBvZiB0aGUgcHJvdmlkZWQgT2JzZXJ2YWJsZSBlbWl0cyBhbiBjb21wbGV0ZSBvciBlcnJvciBub3RpZmljYXRpb24sIGl0IGltbWVkaWF0ZWx5IHN1YnNjcmliZXMgdG8gdGhlIG5leHQgb25lXG4gKiB0aGF0IHdhcyBwYXNzZWQuXG4gKlxuICogPHNwYW4gY2xhc3M9XCJpbmZvcm1hbFwiPkV4ZWN1dGUgc2VyaWVzIG9mIE9ic2VydmFibGVzIG5vIG1hdHRlciB3aGF0LCBldmVuIGlmIGl0IG1lYW5zIHN3YWxsb3dpbmcgZXJyb3JzLjwvc3Bhbj5cbiAqXG4gKiAhW10ob25FcnJvclJlc3VtZU5leHQucG5nKVxuICpcbiAqIGBvbkVycm9yUmVzdW1lTmV4dGAgV2lsbCBzdWJzY3JpYmUgdG8gZWFjaCBvYnNlcnZhYmxlIHNvdXJjZSBpdCBpcyBwcm92aWRlZCwgaW4gb3JkZXIuXG4gKiBJZiB0aGUgc291cmNlIGl0J3Mgc3Vic2NyaWJlZCB0byBlbWl0cyBhbiBlcnJvciBvciBjb21wbGV0ZXMsIGl0IHdpbGwgbW92ZSB0byB0aGUgbmV4dCBzb3VyY2VcbiAqIHdpdGhvdXQgZXJyb3IuXG4gKlxuICogSWYgYG9uRXJyb3JSZXN1bWVOZXh0YCBpcyBwcm92aWRlZCBubyBhcmd1bWVudHMsIG9yIGEgc2luZ2xlLCBlbXB0eSBhcnJheSwgaXQgd2lsbCByZXR1cm4ge0BsaW5rIGluZGV4L0VNUFRZfS5cbiAqXG4gKiBgb25FcnJvclJlc3VtZU5leHRgIGlzIGJhc2ljYWxseSB7QGxpbmsgY29uY2F0fSwgb25seSBpdCB3aWxsIGNvbnRpbnVlLCBldmVuIGlmIG9uZSBvZiBpdHNcbiAqIHNvdXJjZXMgZW1pdHMgYW4gZXJyb3IuXG4gKlxuICogTm90ZSB0aGF0IHRoZXJlIGlzIG5vIHdheSB0byBoYW5kbGUgYW55IGVycm9ycyB0aHJvd24gYnkgc291cmNlcyB2aWEgdGhlIHJlc3V1bHQgb2ZcbiAqIGBvbkVycm9yUmVzdW1lTmV4dGAuIElmIHlvdSB3YW50IHRvIGhhbmRsZSBlcnJvcnMgdGhyb3duIGluIGFueSBnaXZlbiBzb3VyY2UsIHlvdSBjYW5cbiAqIGFsd2F5cyB1c2UgdGhlIHtAbGluayBjYXRjaEVycm9yfSBvcGVyYXRvciBvbiB0aGVtIGJlZm9yZSBwYXNzaW5nIHRoZW0gaW50byBgb25FcnJvclJlc3VtZU5leHRgLlxuICpcbiAqICMjIEV4YW1wbGVcbiAqIFN1YnNjcmliZSB0byB0aGUgbmV4dCBPYnNlcnZhYmxlIGFmdGVyIG1hcCBmYWlsczwvY2FwdGlvbj5cbiAqIGBgYGphdmFzY3JpcHRcbiAqIGltcG9ydCB7IG9uRXJyb3JSZXN1bWVOZXh0LCBvZiB9IGZyb20gJ3J4anMnO1xuICogaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuICpcbiAqIG9uRXJyb3JSZXN1bWVOZXh0KFxuICogIG9mKDEsIDIsIDMsIDApLnBpcGUoXG4gKiAgICBtYXAoeCA9PiB7XG4gKiAgICAgIGlmICh4ID09PSAwKSB0aHJvdyBFcnJvcigpO1xuICogICAgICByZXR1cm4gMTAgLyB4O1xuICogICAgfSlcbiAqICApLFxuICogIG9mKDEsIDIsIDMpLFxuICogKVxuICogLnN1YnNjcmliZShcbiAqICAgdmFsID0+IGNvbnNvbGUubG9nKHZhbCksXG4gKiAgIGVyciA9PiBjb25zb2xlLmxvZyhlcnIpLCAgICAgICAgICAvLyBXaWxsIG5ldmVyIGJlIGNhbGxlZC5cbiAqICAgKCkgPT4gY29uc29sZS5sb2coJ2RvbmUnKSxcbiAqICk7XG4gKlxuICogLy8gTG9nczpcbiAqIC8vIDEwXG4gKiAvLyA1XG4gKiAvLyAzLjMzMzMzMzMzMzMzMzMzMzVcbiAqIC8vIDFcbiAqIC8vIDJcbiAqIC8vIDNcbiAqIC8vIFwiZG9uZVwiXG4gKiBgYGBcbiAqXG4gKiBAc2VlIHtAbGluayBjb25jYXR9XG4gKiBAc2VlIHtAbGluayBjYXRjaEVycm9yfVxuICpcbiAqIEBwYXJhbSB7Li4uT2JzZXJ2YWJsZUlucHV0fSBzb3VyY2VzIE9ic2VydmFibGVzIChvciBhbnl0aGluZyB0aGF0ICppcyogb2JzZXJ2YWJsZSkgcGFzc2VkIGVpdGhlciBkaXJlY3RseSBvciBhcyBhbiBhcnJheS5cbiAqIEByZXR1cm4ge09ic2VydmFibGV9IEFuIE9ic2VydmFibGUgdGhhdCBjb25jYXRlbmF0ZXMgYWxsIHNvdXJjZXMsIG9uZSBhZnRlciB0aGUgb3RoZXIsXG4gKiBpZ25vcmluZyBhbGwgZXJyb3JzLCBzdWNoIHRoYXQgYW55IGVycm9yIGNhdXNlcyBpdCB0byBtb3ZlIG9uIHRvIHRoZSBuZXh0IHNvdXJjZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG9uRXJyb3JSZXN1bWVOZXh0PFQsIFI+KC4uLnNvdXJjZXM6IEFycmF5PE9ic2VydmFibGVJbnB1dDxhbnk+IHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQXJyYXk8T2JzZXJ2YWJsZUlucHV0PGFueT4+IHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKCguLi52YWx1ZXM6IEFycmF5PGFueT4pID0+IFIpPik6IE9ic2VydmFibGU8Uj4ge1xuXG4gIGlmIChzb3VyY2VzLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiBFTVBUWTtcbiAgfVxuXG4gIGNvbnN0IFsgZmlyc3QsIC4uLnJlbWFpbmRlciBdID0gc291cmNlcztcblxuICBpZiAoc291cmNlcy5sZW5ndGggPT09IDEgJiYgaXNBcnJheShmaXJzdCkpIHtcbiAgICByZXR1cm4gb25FcnJvclJlc3VtZU5leHQoLi4uZmlyc3QpO1xuICB9XG5cbiAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlKHN1YnNjcmliZXIgPT4ge1xuICAgIGNvbnN0IHN1Yk5leHQgPSAoKSA9PiBzdWJzY3JpYmVyLmFkZChcbiAgICAgIG9uRXJyb3JSZXN1bWVOZXh0KC4uLnJlbWFpbmRlcikuc3Vic2NyaWJlKHN1YnNjcmliZXIpXG4gICAgKTtcblxuICAgIHJldHVybiBmcm9tKGZpcnN0KS5zdWJzY3JpYmUoe1xuICAgICAgbmV4dCh2YWx1ZSkgeyBzdWJzY3JpYmVyLm5leHQodmFsdWUpOyB9LFxuICAgICAgZXJyb3I6IHN1Yk5leHQsXG4gICAgICBjb21wbGV0ZTogc3ViTmV4dCxcbiAgICB9KTtcbiAgfSk7XG59XG4iXX0=