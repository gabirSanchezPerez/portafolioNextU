"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var isScheduler_1 = require("../util/isScheduler");
var of_1 = require("./of");
var from_1 = require("./from");
var concatAll_1 = require("../operators/concatAll");
/* tslint:enable:max-line-length */
/**
 * Creates an output Observable which sequentially emits all values from given
 * Observable and then moves on to the next.
 *
 * <span class="informal">Concatenates multiple Observables together by
 * sequentially emitting their values, one Observable after the other.</span>
 *
 * ![](concat.png)
 *
 * `concat` joins multiple Observables together, by subscribing to them one at a time and
 * merging their results into the output Observable. You can pass either an array of
 * Observables, or put them directly as arguments. Passing an empty array will result
 * in Observable that completes immediately.
 *
 * `concat` will subscribe to first input Observable and emit all its values, without
 * changing or affecting them in any way. When that Observable completes, it will
 * subscribe to then next Observable passed and, again, emit its values. This will be
 * repeated, until the operator runs out of Observables. When last input Observable completes,
 * `concat` will complete as well. At any given moment only one Observable passed to operator
 * emits values. If you would like to emit values from passed Observables concurrently, check out
 * {@link merge} instead, especially with optional `concurrent` parameter. As a matter of fact,
 * `concat` is an equivalent of `merge` operator with `concurrent` parameter set to `1`.
 *
 * Note that if some input Observable never completes, `concat` will also never complete
 * and Observables following the one that did not complete will never be subscribed. On the other
 * hand, if some Observable simply completes immediately after it is subscribed, it will be
 * invisible for `concat`, which will just move on to the next Observable.
 *
 * If any Observable in chain errors, instead of passing control to the next Observable,
 * `concat` will error immediately as well. Observables that would be subscribed after
 * the one that emitted error, never will.
 *
 * If you pass to `concat` the same Observable many times, its stream of values
 * will be "replayed" on every subscription, which means you can repeat given Observable
 * as many times as you like. If passing the same Observable to `concat` 1000 times becomes tedious,
 * you can always use {@link repeat}.
 *
 * ## Examples
 * ### Concatenate a timer counting from 0 to 3 with a synchronous sequence from 1 to 10
 * ```javascript
 * const timer = interval(1000).pipe(take(4));
 * const sequence = range(1, 10);
 * const result = concat(timer, sequence);
 * result.subscribe(x => console.log(x));
 *
 * // results in:
 * // 0 -1000ms-> 1 -1000ms-> 2 -1000ms-> 3 -immediate-> 1 ... 10
 * ```
 *
 * ### Concatenate an array of 3 Observables
 * ```javascript
 * const timer1 = interval(1000).pipe(take(10));
 * const timer2 = interval(2000).pipe(take(6));
 * const timer3 = interval(500).pipe(take(10));
 * const result = concat([timer1, timer2, timer3]); // note that array is passed
 * result.subscribe(x => console.log(x));
 *
 * // results in the following:
 * // (Prints to console sequentially)
 * // -1000ms-> 0 -1000ms-> 1 -1000ms-> ... 9
 * // -2000ms-> 0 -2000ms-> 1 -2000ms-> ... 5
 * // -500ms-> 0 -500ms-> 1 -500ms-> ... 9
 * ```
 *
 * ### Concatenate the same Observable to repeat it
 * ```javascript
 * const timer = interval(1000).pipe(take(2));
 * *
 * concat(timer, timer) // concatenating the same Observable!
 * .subscribe(
 *   value => console.log(value),
 *   err => {},
 *   () => console.log('...and it is done!')
 * );
 *
 * // Logs:
 * // 0 after 1s
 * // 1 after 2s
 * // 0 after 3s
 * // 1 after 4s
 * // "...and it is done!" also after 4s
 * ```
 *
 * @see {@link concatAll}
 * @see {@link concatMap}
 * @see {@link concatMapTo}
 *
 * @param {ObservableInput} input1 An input Observable to concatenate with others.
 * @param {ObservableInput} input2 An input Observable to concatenate with others.
 * More than one input Observables may be given as argument.
 * @param {SchedulerLike} [scheduler=null] An optional {@link SchedulerLike} to schedule each
 * Observable subscription on.
 * @return {Observable} All values of each passed Observable merged into a
 * single Observable, in order, in serial fashion.
 * @static true
 * @name concat
 * @owner Observable
 */
function concat() {
    var observables = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        observables[_i] = arguments[_i];
    }
    if (observables.length === 1 || (observables.length === 2 && isScheduler_1.isScheduler(observables[1]))) {
        return from_1.from(observables[0]);
    }
    return concatAll_1.concatAll()(of_1.of.apply(void 0, observables));
}
exports.concat = concat;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uY2F0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY29uY2F0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEsbURBQWtEO0FBQ2xELDJCQUEwQjtBQUMxQiwrQkFBOEI7QUFDOUIsb0RBQW1EO0FBV25ELG1DQUFtQztBQUNuQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWlHRztBQUNILFNBQWdCLE1BQU07SUFBTyxxQkFBMkQ7U0FBM0QsVUFBMkQsRUFBM0QscUJBQTJELEVBQTNELElBQTJEO1FBQTNELGdDQUEyRDs7SUFDdEYsSUFBSSxXQUFXLENBQUMsTUFBTSxLQUFLLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEtBQUssQ0FBQyxJQUFJLHlCQUFXLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTtRQUN6RixPQUFPLFdBQUksQ0FBTSxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUNsQztJQUNELE9BQU8scUJBQVMsRUFBSyxDQUFDLE9BQUUsZUFBSSxXQUFXLEVBQUUsQ0FBQztBQUM1QyxDQUFDO0FBTEQsd0JBS0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAnLi4vT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlSW5wdXQsIFNjaGVkdWxlckxpa2UgfSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQgeyBpc1NjaGVkdWxlciB9IGZyb20gJy4uL3V0aWwvaXNTY2hlZHVsZXInO1xuaW1wb3J0IHsgb2YgfSBmcm9tICcuL29mJztcbmltcG9ydCB7IGZyb20gfSBmcm9tICcuL2Zyb20nO1xuaW1wb3J0IHsgY29uY2F0QWxsIH0gZnJvbSAnLi4vb3BlcmF0b3JzL2NvbmNhdEFsbCc7XG5cbi8qIHRzbGludDpkaXNhYmxlOm1heC1saW5lLWxlbmd0aCAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNvbmNhdDxUPih2MTogT2JzZXJ2YWJsZUlucHV0PFQ+LCBzY2hlZHVsZXI/OiBTY2hlZHVsZXJMaWtlKTogT2JzZXJ2YWJsZTxUPjtcbmV4cG9ydCBmdW5jdGlvbiBjb25jYXQ8VCwgVDI+KHYxOiBPYnNlcnZhYmxlSW5wdXQ8VD4sIHYyOiBPYnNlcnZhYmxlSW5wdXQ8VDI+LCBzY2hlZHVsZXI/OiBTY2hlZHVsZXJMaWtlKTogT2JzZXJ2YWJsZTxUIHwgVDI+O1xuZXhwb3J0IGZ1bmN0aW9uIGNvbmNhdDxULCBUMiwgVDM+KHYxOiBPYnNlcnZhYmxlSW5wdXQ8VD4sIHYyOiBPYnNlcnZhYmxlSW5wdXQ8VDI+LCB2MzogT2JzZXJ2YWJsZUlucHV0PFQzPiwgc2NoZWR1bGVyPzogU2NoZWR1bGVyTGlrZSk6IE9ic2VydmFibGU8VCB8IFQyIHwgVDM+O1xuZXhwb3J0IGZ1bmN0aW9uIGNvbmNhdDxULCBUMiwgVDMsIFQ0Pih2MTogT2JzZXJ2YWJsZUlucHV0PFQ+LCB2MjogT2JzZXJ2YWJsZUlucHV0PFQyPiwgdjM6IE9ic2VydmFibGVJbnB1dDxUMz4sIHY0OiBPYnNlcnZhYmxlSW5wdXQ8VDQ+LCBzY2hlZHVsZXI/OiBTY2hlZHVsZXJMaWtlKTogT2JzZXJ2YWJsZTxUIHwgVDIgfCBUMyB8IFQ0PjtcbmV4cG9ydCBmdW5jdGlvbiBjb25jYXQ8VCwgVDIsIFQzLCBUNCwgVDU+KHYxOiBPYnNlcnZhYmxlSW5wdXQ8VD4sIHYyOiBPYnNlcnZhYmxlSW5wdXQ8VDI+LCB2MzogT2JzZXJ2YWJsZUlucHV0PFQzPiwgdjQ6IE9ic2VydmFibGVJbnB1dDxUND4sIHY1OiBPYnNlcnZhYmxlSW5wdXQ8VDU+LCBzY2hlZHVsZXI/OiBTY2hlZHVsZXJMaWtlKTogT2JzZXJ2YWJsZTxUIHwgVDIgfCBUMyB8IFQ0IHwgVDU+O1xuZXhwb3J0IGZ1bmN0aW9uIGNvbmNhdDxULCBUMiwgVDMsIFQ0LCBUNSwgVDY+KHYxOiBPYnNlcnZhYmxlSW5wdXQ8VD4sIHYyOiBPYnNlcnZhYmxlSW5wdXQ8VDI+LCB2MzogT2JzZXJ2YWJsZUlucHV0PFQzPiwgdjQ6IE9ic2VydmFibGVJbnB1dDxUND4sIHY1OiBPYnNlcnZhYmxlSW5wdXQ8VDU+LCB2NjogT2JzZXJ2YWJsZUlucHV0PFQ2Piwgc2NoZWR1bGVyPzogU2NoZWR1bGVyTGlrZSk6IE9ic2VydmFibGU8VCB8IFQyIHwgVDMgfCBUNCB8IFQ1IHwgVDY+O1xuZXhwb3J0IGZ1bmN0aW9uIGNvbmNhdDxUPiguLi5vYnNlcnZhYmxlczogKE9ic2VydmFibGVJbnB1dDxUPiB8IFNjaGVkdWxlckxpa2UpW10pOiBPYnNlcnZhYmxlPFQ+O1xuZXhwb3J0IGZ1bmN0aW9uIGNvbmNhdDxULCBSPiguLi5vYnNlcnZhYmxlczogKE9ic2VydmFibGVJbnB1dDxhbnk+IHwgU2NoZWR1bGVyTGlrZSlbXSk6IE9ic2VydmFibGU8Uj47XG4vKiB0c2xpbnQ6ZW5hYmxlOm1heC1saW5lLWxlbmd0aCAqL1xuLyoqXG4gKiBDcmVhdGVzIGFuIG91dHB1dCBPYnNlcnZhYmxlIHdoaWNoIHNlcXVlbnRpYWxseSBlbWl0cyBhbGwgdmFsdWVzIGZyb20gZ2l2ZW5cbiAqIE9ic2VydmFibGUgYW5kIHRoZW4gbW92ZXMgb24gdG8gdGhlIG5leHQuXG4gKlxuICogPHNwYW4gY2xhc3M9XCJpbmZvcm1hbFwiPkNvbmNhdGVuYXRlcyBtdWx0aXBsZSBPYnNlcnZhYmxlcyB0b2dldGhlciBieVxuICogc2VxdWVudGlhbGx5IGVtaXR0aW5nIHRoZWlyIHZhbHVlcywgb25lIE9ic2VydmFibGUgYWZ0ZXIgdGhlIG90aGVyLjwvc3Bhbj5cbiAqXG4gKiAhW10oY29uY2F0LnBuZylcbiAqXG4gKiBgY29uY2F0YCBqb2lucyBtdWx0aXBsZSBPYnNlcnZhYmxlcyB0b2dldGhlciwgYnkgc3Vic2NyaWJpbmcgdG8gdGhlbSBvbmUgYXQgYSB0aW1lIGFuZFxuICogbWVyZ2luZyB0aGVpciByZXN1bHRzIGludG8gdGhlIG91dHB1dCBPYnNlcnZhYmxlLiBZb3UgY2FuIHBhc3MgZWl0aGVyIGFuIGFycmF5IG9mXG4gKiBPYnNlcnZhYmxlcywgb3IgcHV0IHRoZW0gZGlyZWN0bHkgYXMgYXJndW1lbnRzLiBQYXNzaW5nIGFuIGVtcHR5IGFycmF5IHdpbGwgcmVzdWx0XG4gKiBpbiBPYnNlcnZhYmxlIHRoYXQgY29tcGxldGVzIGltbWVkaWF0ZWx5LlxuICpcbiAqIGBjb25jYXRgIHdpbGwgc3Vic2NyaWJlIHRvIGZpcnN0IGlucHV0IE9ic2VydmFibGUgYW5kIGVtaXQgYWxsIGl0cyB2YWx1ZXMsIHdpdGhvdXRcbiAqIGNoYW5naW5nIG9yIGFmZmVjdGluZyB0aGVtIGluIGFueSB3YXkuIFdoZW4gdGhhdCBPYnNlcnZhYmxlIGNvbXBsZXRlcywgaXQgd2lsbFxuICogc3Vic2NyaWJlIHRvIHRoZW4gbmV4dCBPYnNlcnZhYmxlIHBhc3NlZCBhbmQsIGFnYWluLCBlbWl0IGl0cyB2YWx1ZXMuIFRoaXMgd2lsbCBiZVxuICogcmVwZWF0ZWQsIHVudGlsIHRoZSBvcGVyYXRvciBydW5zIG91dCBvZiBPYnNlcnZhYmxlcy4gV2hlbiBsYXN0IGlucHV0IE9ic2VydmFibGUgY29tcGxldGVzLFxuICogYGNvbmNhdGAgd2lsbCBjb21wbGV0ZSBhcyB3ZWxsLiBBdCBhbnkgZ2l2ZW4gbW9tZW50IG9ubHkgb25lIE9ic2VydmFibGUgcGFzc2VkIHRvIG9wZXJhdG9yXG4gKiBlbWl0cyB2YWx1ZXMuIElmIHlvdSB3b3VsZCBsaWtlIHRvIGVtaXQgdmFsdWVzIGZyb20gcGFzc2VkIE9ic2VydmFibGVzIGNvbmN1cnJlbnRseSwgY2hlY2sgb3V0XG4gKiB7QGxpbmsgbWVyZ2V9IGluc3RlYWQsIGVzcGVjaWFsbHkgd2l0aCBvcHRpb25hbCBgY29uY3VycmVudGAgcGFyYW1ldGVyLiBBcyBhIG1hdHRlciBvZiBmYWN0LFxuICogYGNvbmNhdGAgaXMgYW4gZXF1aXZhbGVudCBvZiBgbWVyZ2VgIG9wZXJhdG9yIHdpdGggYGNvbmN1cnJlbnRgIHBhcmFtZXRlciBzZXQgdG8gYDFgLlxuICpcbiAqIE5vdGUgdGhhdCBpZiBzb21lIGlucHV0IE9ic2VydmFibGUgbmV2ZXIgY29tcGxldGVzLCBgY29uY2F0YCB3aWxsIGFsc28gbmV2ZXIgY29tcGxldGVcbiAqIGFuZCBPYnNlcnZhYmxlcyBmb2xsb3dpbmcgdGhlIG9uZSB0aGF0IGRpZCBub3QgY29tcGxldGUgd2lsbCBuZXZlciBiZSBzdWJzY3JpYmVkLiBPbiB0aGUgb3RoZXJcbiAqIGhhbmQsIGlmIHNvbWUgT2JzZXJ2YWJsZSBzaW1wbHkgY29tcGxldGVzIGltbWVkaWF0ZWx5IGFmdGVyIGl0IGlzIHN1YnNjcmliZWQsIGl0IHdpbGwgYmVcbiAqIGludmlzaWJsZSBmb3IgYGNvbmNhdGAsIHdoaWNoIHdpbGwganVzdCBtb3ZlIG9uIHRvIHRoZSBuZXh0IE9ic2VydmFibGUuXG4gKlxuICogSWYgYW55IE9ic2VydmFibGUgaW4gY2hhaW4gZXJyb3JzLCBpbnN0ZWFkIG9mIHBhc3NpbmcgY29udHJvbCB0byB0aGUgbmV4dCBPYnNlcnZhYmxlLFxuICogYGNvbmNhdGAgd2lsbCBlcnJvciBpbW1lZGlhdGVseSBhcyB3ZWxsLiBPYnNlcnZhYmxlcyB0aGF0IHdvdWxkIGJlIHN1YnNjcmliZWQgYWZ0ZXJcbiAqIHRoZSBvbmUgdGhhdCBlbWl0dGVkIGVycm9yLCBuZXZlciB3aWxsLlxuICpcbiAqIElmIHlvdSBwYXNzIHRvIGBjb25jYXRgIHRoZSBzYW1lIE9ic2VydmFibGUgbWFueSB0aW1lcywgaXRzIHN0cmVhbSBvZiB2YWx1ZXNcbiAqIHdpbGwgYmUgXCJyZXBsYXllZFwiIG9uIGV2ZXJ5IHN1YnNjcmlwdGlvbiwgd2hpY2ggbWVhbnMgeW91IGNhbiByZXBlYXQgZ2l2ZW4gT2JzZXJ2YWJsZVxuICogYXMgbWFueSB0aW1lcyBhcyB5b3UgbGlrZS4gSWYgcGFzc2luZyB0aGUgc2FtZSBPYnNlcnZhYmxlIHRvIGBjb25jYXRgIDEwMDAgdGltZXMgYmVjb21lcyB0ZWRpb3VzLFxuICogeW91IGNhbiBhbHdheXMgdXNlIHtAbGluayByZXBlYXR9LlxuICpcbiAqICMjIEV4YW1wbGVzXG4gKiAjIyMgQ29uY2F0ZW5hdGUgYSB0aW1lciBjb3VudGluZyBmcm9tIDAgdG8gMyB3aXRoIGEgc3luY2hyb25vdXMgc2VxdWVuY2UgZnJvbSAxIHRvIDEwXG4gKiBgYGBqYXZhc2NyaXB0XG4gKiBjb25zdCB0aW1lciA9IGludGVydmFsKDEwMDApLnBpcGUodGFrZSg0KSk7XG4gKiBjb25zdCBzZXF1ZW5jZSA9IHJhbmdlKDEsIDEwKTtcbiAqIGNvbnN0IHJlc3VsdCA9IGNvbmNhdCh0aW1lciwgc2VxdWVuY2UpO1xuICogcmVzdWx0LnN1YnNjcmliZSh4ID0+IGNvbnNvbGUubG9nKHgpKTtcbiAqXG4gKiAvLyByZXN1bHRzIGluOlxuICogLy8gMCAtMTAwMG1zLT4gMSAtMTAwMG1zLT4gMiAtMTAwMG1zLT4gMyAtaW1tZWRpYXRlLT4gMSAuLi4gMTBcbiAqIGBgYFxuICpcbiAqICMjIyBDb25jYXRlbmF0ZSBhbiBhcnJheSBvZiAzIE9ic2VydmFibGVzXG4gKiBgYGBqYXZhc2NyaXB0XG4gKiBjb25zdCB0aW1lcjEgPSBpbnRlcnZhbCgxMDAwKS5waXBlKHRha2UoMTApKTtcbiAqIGNvbnN0IHRpbWVyMiA9IGludGVydmFsKDIwMDApLnBpcGUodGFrZSg2KSk7XG4gKiBjb25zdCB0aW1lcjMgPSBpbnRlcnZhbCg1MDApLnBpcGUodGFrZSgxMCkpO1xuICogY29uc3QgcmVzdWx0ID0gY29uY2F0KFt0aW1lcjEsIHRpbWVyMiwgdGltZXIzXSk7IC8vIG5vdGUgdGhhdCBhcnJheSBpcyBwYXNzZWRcbiAqIHJlc3VsdC5zdWJzY3JpYmUoeCA9PiBjb25zb2xlLmxvZyh4KSk7XG4gKlxuICogLy8gcmVzdWx0cyBpbiB0aGUgZm9sbG93aW5nOlxuICogLy8gKFByaW50cyB0byBjb25zb2xlIHNlcXVlbnRpYWxseSlcbiAqIC8vIC0xMDAwbXMtPiAwIC0xMDAwbXMtPiAxIC0xMDAwbXMtPiAuLi4gOVxuICogLy8gLTIwMDBtcy0+IDAgLTIwMDBtcy0+IDEgLTIwMDBtcy0+IC4uLiA1XG4gKiAvLyAtNTAwbXMtPiAwIC01MDBtcy0+IDEgLTUwMG1zLT4gLi4uIDlcbiAqIGBgYFxuICpcbiAqICMjIyBDb25jYXRlbmF0ZSB0aGUgc2FtZSBPYnNlcnZhYmxlIHRvIHJlcGVhdCBpdFxuICogYGBgamF2YXNjcmlwdFxuICogY29uc3QgdGltZXIgPSBpbnRlcnZhbCgxMDAwKS5waXBlKHRha2UoMikpO1xuICogKlxuICogY29uY2F0KHRpbWVyLCB0aW1lcikgLy8gY29uY2F0ZW5hdGluZyB0aGUgc2FtZSBPYnNlcnZhYmxlIVxuICogLnN1YnNjcmliZShcbiAqICAgdmFsdWUgPT4gY29uc29sZS5sb2codmFsdWUpLFxuICogICBlcnIgPT4ge30sXG4gKiAgICgpID0+IGNvbnNvbGUubG9nKCcuLi5hbmQgaXQgaXMgZG9uZSEnKVxuICogKTtcbiAqXG4gKiAvLyBMb2dzOlxuICogLy8gMCBhZnRlciAxc1xuICogLy8gMSBhZnRlciAyc1xuICogLy8gMCBhZnRlciAzc1xuICogLy8gMSBhZnRlciA0c1xuICogLy8gXCIuLi5hbmQgaXQgaXMgZG9uZSFcIiBhbHNvIGFmdGVyIDRzXG4gKiBgYGBcbiAqXG4gKiBAc2VlIHtAbGluayBjb25jYXRBbGx9XG4gKiBAc2VlIHtAbGluayBjb25jYXRNYXB9XG4gKiBAc2VlIHtAbGluayBjb25jYXRNYXBUb31cbiAqXG4gKiBAcGFyYW0ge09ic2VydmFibGVJbnB1dH0gaW5wdXQxIEFuIGlucHV0IE9ic2VydmFibGUgdG8gY29uY2F0ZW5hdGUgd2l0aCBvdGhlcnMuXG4gKiBAcGFyYW0ge09ic2VydmFibGVJbnB1dH0gaW5wdXQyIEFuIGlucHV0IE9ic2VydmFibGUgdG8gY29uY2F0ZW5hdGUgd2l0aCBvdGhlcnMuXG4gKiBNb3JlIHRoYW4gb25lIGlucHV0IE9ic2VydmFibGVzIG1heSBiZSBnaXZlbiBhcyBhcmd1bWVudC5cbiAqIEBwYXJhbSB7U2NoZWR1bGVyTGlrZX0gW3NjaGVkdWxlcj1udWxsXSBBbiBvcHRpb25hbCB7QGxpbmsgU2NoZWR1bGVyTGlrZX0gdG8gc2NoZWR1bGUgZWFjaFxuICogT2JzZXJ2YWJsZSBzdWJzY3JpcHRpb24gb24uXG4gKiBAcmV0dXJuIHtPYnNlcnZhYmxlfSBBbGwgdmFsdWVzIG9mIGVhY2ggcGFzc2VkIE9ic2VydmFibGUgbWVyZ2VkIGludG8gYVxuICogc2luZ2xlIE9ic2VydmFibGUsIGluIG9yZGVyLCBpbiBzZXJpYWwgZmFzaGlvbi5cbiAqIEBzdGF0aWMgdHJ1ZVxuICogQG5hbWUgY29uY2F0XG4gKiBAb3duZXIgT2JzZXJ2YWJsZVxuICovXG5leHBvcnQgZnVuY3Rpb24gY29uY2F0PFQsIFI+KC4uLm9ic2VydmFibGVzOiBBcnJheTxPYnNlcnZhYmxlSW5wdXQ8YW55PiB8IFNjaGVkdWxlckxpa2U+KTogT2JzZXJ2YWJsZTxSPiB7XG4gIGlmIChvYnNlcnZhYmxlcy5sZW5ndGggPT09IDEgfHwgKG9ic2VydmFibGVzLmxlbmd0aCA9PT0gMiAmJiBpc1NjaGVkdWxlcihvYnNlcnZhYmxlc1sxXSkpKSB7XG4gICAgcmV0dXJuIGZyb20oPGFueT5vYnNlcnZhYmxlc1swXSk7XG4gIH1cbiAgcmV0dXJuIGNvbmNhdEFsbDxSPigpKG9mKC4uLm9ic2VydmFibGVzKSk7XG59XG4iXX0=