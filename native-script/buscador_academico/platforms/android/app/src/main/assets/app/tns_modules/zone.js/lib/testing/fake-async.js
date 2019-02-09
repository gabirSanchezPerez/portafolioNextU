"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
require("../zone-spec/fake-async-test");
Zone.__load_patch('fakeasync', function (global, Zone, api) {
    var FakeAsyncTestZoneSpec = Zone && Zone['FakeAsyncTestZoneSpec'];
    var ProxyZoneSpec = Zone && Zone['ProxyZoneSpec'];
    var _fakeAsyncTestZoneSpec = null;
    /**
     * Clears out the shared fake async zone for a test.
     * To be called in a global `beforeEach`.
     *
     * @experimental
     */
    function resetFakeAsyncZone() {
        if (_fakeAsyncTestZoneSpec) {
            _fakeAsyncTestZoneSpec.unlockDatePatch();
        }
        _fakeAsyncTestZoneSpec = null;
        // in node.js testing we may not have ProxyZoneSpec in which case there is nothing to reset.
        ProxyZoneSpec && ProxyZoneSpec.assertPresent().resetDelegate();
    }
    /**
     * Wraps a function to be executed in the fakeAsync zone:
     * - microtasks are manually executed by calling `flushMicrotasks()`,
     * - timers are synchronous, `tick()` simulates the asynchronous passage of time.
     *
     * If there are any pending timers at the end of the function, an exception will be thrown.
     *
     * Can be used to wrap inject() calls.
     *
     * ## Example
     *
     * {@example core/testing/ts/fake_async.ts region='basic'}
     *
     * @param fn
     * @returns The function wrapped to be executed in the fakeAsync zone
     *
     * @experimental
     */
    function fakeAsync(fn) {
        // Not using an arrow function to preserve context passed from call site
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var proxyZoneSpec = ProxyZoneSpec.assertPresent();
            if (Zone.current.get('FakeAsyncTestZoneSpec')) {
                throw new Error('fakeAsync() calls can not be nested');
            }
            try {
                // in case jasmine.clock init a fakeAsyncTestZoneSpec
                if (!_fakeAsyncTestZoneSpec) {
                    if (proxyZoneSpec.getDelegate() instanceof FakeAsyncTestZoneSpec) {
                        throw new Error('fakeAsync() calls can not be nested');
                    }
                    _fakeAsyncTestZoneSpec = new FakeAsyncTestZoneSpec();
                }
                var res = void 0;
                var lastProxyZoneSpec = proxyZoneSpec.getDelegate();
                proxyZoneSpec.setDelegate(_fakeAsyncTestZoneSpec);
                _fakeAsyncTestZoneSpec.lockDatePatch();
                try {
                    res = fn.apply(this, args);
                    flushMicrotasks();
                }
                finally {
                    proxyZoneSpec.setDelegate(lastProxyZoneSpec);
                }
                if (_fakeAsyncTestZoneSpec.pendingPeriodicTimers.length > 0) {
                    throw new Error(_fakeAsyncTestZoneSpec.pendingPeriodicTimers.length + " " +
                        "periodic timer(s) still in the queue.");
                }
                if (_fakeAsyncTestZoneSpec.pendingTimers.length > 0) {
                    throw new Error(_fakeAsyncTestZoneSpec.pendingTimers.length + " timer(s) still in the queue.");
                }
                return res;
            }
            finally {
                resetFakeAsyncZone();
            }
        };
    }
    function _getFakeAsyncZoneSpec() {
        if (_fakeAsyncTestZoneSpec == null) {
            _fakeAsyncTestZoneSpec = Zone.current.get('FakeAsyncTestZoneSpec');
            if (_fakeAsyncTestZoneSpec == null) {
                throw new Error('The code should be running in the fakeAsync zone to call this function');
            }
        }
        return _fakeAsyncTestZoneSpec;
    }
    /**
     * Simulates the asynchronous passage of time for the timers in the fakeAsync zone.
     *
     * The microtasks queue is drained at the very start of this function and after any timer callback
     * has been executed.
     *
     * ## Example
     *
     * {@example core/testing/ts/fake_async.ts region='basic'}
     *
     * @experimental
     */
    function tick(millis) {
        if (millis === void 0) { millis = 0; }
        _getFakeAsyncZoneSpec().tick(millis);
    }
    /**
     * Simulates the asynchronous passage of time for the timers in the fakeAsync zone by
     * draining the macrotask queue until it is empty. The returned value is the milliseconds
     * of time that would have been elapsed.
     *
     * @param maxTurns
     * @returns The simulated time elapsed, in millis.
     *
     * @experimental
     */
    function flush(maxTurns) {
        return _getFakeAsyncZoneSpec().flush(maxTurns);
    }
    /**
     * Discard all remaining periodic tasks.
     *
     * @experimental
     */
    function discardPeriodicTasks() {
        var zoneSpec = _getFakeAsyncZoneSpec();
        var pendingTimers = zoneSpec.pendingPeriodicTimers;
        zoneSpec.pendingPeriodicTimers.length = 0;
    }
    /**
     * Flush any pending microtasks.
     *
     * @experimental
     */
    function flushMicrotasks() {
        _getFakeAsyncZoneSpec().flushMicrotasks();
    }
    Zone[api.symbol('fakeAsyncTest')] =
        { resetFakeAsyncZone: resetFakeAsyncZone, flushMicrotasks: flushMicrotasks, discardPeriodicTasks: discardPeriodicTasks, tick: tick, flush: flush, fakeAsync: fakeAsync };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFrZS1hc3luYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZha2UtYXN5bmMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7Ozs7O0dBTUc7QUFDSCx3Q0FBc0M7QUFFdEMsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsVUFBQyxNQUFXLEVBQUUsSUFBYyxFQUFFLEdBQWlCO0lBQzVFLElBQU0scUJBQXFCLEdBQUcsSUFBSSxJQUFLLElBQVksQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO0lBSTdFLElBQU0sYUFBYSxHQUNmLElBQUksSUFBSyxJQUFZLENBQUMsZUFBZSxDQUFDLENBQUM7SUFFM0MsSUFBSSxzQkFBc0IsR0FBUSxJQUFJLENBQUM7SUFFdkM7Ozs7O09BS0c7SUFDSCxTQUFTLGtCQUFrQjtRQUN6QixJQUFJLHNCQUFzQixFQUFFO1lBQzFCLHNCQUFzQixDQUFDLGVBQWUsRUFBRSxDQUFDO1NBQzFDO1FBQ0Qsc0JBQXNCLEdBQUcsSUFBSSxDQUFDO1FBQzlCLDRGQUE0RjtRQUM1RixhQUFhLElBQUksYUFBYSxDQUFDLGFBQWEsRUFBRSxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQ2pFLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FpQkc7SUFDSCxTQUFTLFNBQVMsQ0FBQyxFQUFZO1FBQzdCLHdFQUF3RTtRQUN4RSxPQUFPO1lBQVMsY0FBYztpQkFBZCxVQUFjLEVBQWQscUJBQWMsRUFBZCxJQUFjO2dCQUFkLHlCQUFjOztZQUM1QixJQUFNLGFBQWEsR0FBRyxhQUFhLENBQUMsYUFBYSxFQUFFLENBQUM7WUFDcEQsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsQ0FBQyxFQUFFO2dCQUM3QyxNQUFNLElBQUksS0FBSyxDQUFDLHFDQUFxQyxDQUFDLENBQUM7YUFDeEQ7WUFDRCxJQUFJO2dCQUNGLHFEQUFxRDtnQkFDckQsSUFBSSxDQUFDLHNCQUFzQixFQUFFO29CQUMzQixJQUFJLGFBQWEsQ0FBQyxXQUFXLEVBQUUsWUFBWSxxQkFBcUIsRUFBRTt3QkFDaEUsTUFBTSxJQUFJLEtBQUssQ0FBQyxxQ0FBcUMsQ0FBQyxDQUFDO3FCQUN4RDtvQkFFRCxzQkFBc0IsR0FBRyxJQUFJLHFCQUFxQixFQUFFLENBQUM7aUJBQ3REO2dCQUVELElBQUksR0FBRyxTQUFLLENBQUM7Z0JBQ2IsSUFBTSxpQkFBaUIsR0FBRyxhQUFhLENBQUMsV0FBVyxFQUFFLENBQUM7Z0JBQ3RELGFBQWEsQ0FBQyxXQUFXLENBQUMsc0JBQXNCLENBQUMsQ0FBQztnQkFDbEQsc0JBQXNCLENBQUMsYUFBYSxFQUFFLENBQUM7Z0JBQ3ZDLElBQUk7b0JBQ0YsR0FBRyxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO29CQUMzQixlQUFlLEVBQUUsQ0FBQztpQkFDbkI7d0JBQVM7b0JBQ1IsYUFBYSxDQUFDLFdBQVcsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO2lCQUM5QztnQkFFRCxJQUFJLHNCQUFzQixDQUFDLHFCQUFxQixDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7b0JBQzNELE1BQU0sSUFBSSxLQUFLLENBQ1Isc0JBQXNCLENBQUMscUJBQXFCLENBQUMsTUFBTSxNQUFHO3dCQUN6RCx1Q0FBdUMsQ0FBQyxDQUFDO2lCQUM5QztnQkFFRCxJQUFJLHNCQUFzQixDQUFDLGFBQWEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO29CQUNuRCxNQUFNLElBQUksS0FBSyxDQUNSLHNCQUFzQixDQUFDLGFBQWEsQ0FBQyxNQUFNLGtDQUErQixDQUFDLENBQUM7aUJBQ3BGO2dCQUNELE9BQU8sR0FBRyxDQUFDO2FBQ1o7b0JBQVM7Z0JBQ1Isa0JBQWtCLEVBQUUsQ0FBQzthQUN0QjtRQUNILENBQUMsQ0FBQztJQUNKLENBQUM7SUFFRCxTQUFTLHFCQUFxQjtRQUM1QixJQUFJLHNCQUFzQixJQUFJLElBQUksRUFBRTtZQUNsQyxzQkFBc0IsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO1lBQ25FLElBQUksc0JBQXNCLElBQUksSUFBSSxFQUFFO2dCQUNsQyxNQUFNLElBQUksS0FBSyxDQUFDLHdFQUF3RSxDQUFDLENBQUM7YUFDM0Y7U0FDRjtRQUNELE9BQU8sc0JBQXNCLENBQUM7SUFDaEMsQ0FBQztJQUVEOzs7Ozs7Ozs7OztPQVdHO0lBQ0gsU0FBUyxJQUFJLENBQUMsTUFBa0I7UUFBbEIsdUJBQUEsRUFBQSxVQUFrQjtRQUM5QixxQkFBcUIsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBRUQ7Ozs7Ozs7OztPQVNHO0lBQ0gsU0FBUyxLQUFLLENBQUMsUUFBaUI7UUFDOUIsT0FBTyxxQkFBcUIsRUFBRSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNqRCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILFNBQVMsb0JBQW9CO1FBQzNCLElBQU0sUUFBUSxHQUFHLHFCQUFxQixFQUFFLENBQUM7UUFDekMsSUFBTSxhQUFhLEdBQUcsUUFBUSxDQUFDLHFCQUFxQixDQUFDO1FBQ3JELFFBQVEsQ0FBQyxxQkFBcUIsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsU0FBUyxlQUFlO1FBQ3RCLHFCQUFxQixFQUFFLENBQUMsZUFBZSxFQUFFLENBQUM7SUFDNUMsQ0FBQztJQUNBLElBQVksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQ3RDLEVBQUMsa0JBQWtCLG9CQUFBLEVBQUUsZUFBZSxpQkFBQSxFQUFFLG9CQUFvQixzQkFBQSxFQUFFLElBQUksTUFBQSxFQUFFLEtBQUssT0FBQSxFQUFFLFNBQVMsV0FBQSxFQUFDLENBQUM7QUFDMUYsQ0FBQyxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5pbXBvcnQgJy4uL3pvbmUtc3BlYy9mYWtlLWFzeW5jLXRlc3QnO1xuXG5ab25lLl9fbG9hZF9wYXRjaCgnZmFrZWFzeW5jJywgKGdsb2JhbDogYW55LCBab25lOiBab25lVHlwZSwgYXBpOiBfWm9uZVByaXZhdGUpID0+IHtcbiAgY29uc3QgRmFrZUFzeW5jVGVzdFpvbmVTcGVjID0gWm9uZSAmJiAoWm9uZSBhcyBhbnkpWydGYWtlQXN5bmNUZXN0Wm9uZVNwZWMnXTtcbiAgdHlwZSBQcm94eVpvbmVTcGVjID0ge1xuICAgIHNldERlbGVnYXRlKGRlbGVnYXRlU3BlYzogWm9uZVNwZWMpOiB2b2lkOyBnZXREZWxlZ2F0ZSgpOiBab25lU3BlYzsgcmVzZXREZWxlZ2F0ZSgpOiB2b2lkO1xuICB9O1xuICBjb25zdCBQcm94eVpvbmVTcGVjOiB7Z2V0KCk6IFByb3h5Wm9uZVNwZWM7IGFzc2VydFByZXNlbnQ6ICgpID0+IFByb3h5Wm9uZVNwZWN9ID1cbiAgICAgIFpvbmUgJiYgKFpvbmUgYXMgYW55KVsnUHJveHlab25lU3BlYyddO1xuXG4gIGxldCBfZmFrZUFzeW5jVGVzdFpvbmVTcGVjOiBhbnkgPSBudWxsO1xuXG4gIC8qKlxuICAgKiBDbGVhcnMgb3V0IHRoZSBzaGFyZWQgZmFrZSBhc3luYyB6b25lIGZvciBhIHRlc3QuXG4gICAqIFRvIGJlIGNhbGxlZCBpbiBhIGdsb2JhbCBgYmVmb3JlRWFjaGAuXG4gICAqXG4gICAqIEBleHBlcmltZW50YWxcbiAgICovXG4gIGZ1bmN0aW9uIHJlc2V0RmFrZUFzeW5jWm9uZSgpIHtcbiAgICBpZiAoX2Zha2VBc3luY1Rlc3Rab25lU3BlYykge1xuICAgICAgX2Zha2VBc3luY1Rlc3Rab25lU3BlYy51bmxvY2tEYXRlUGF0Y2goKTtcbiAgICB9XG4gICAgX2Zha2VBc3luY1Rlc3Rab25lU3BlYyA9IG51bGw7XG4gICAgLy8gaW4gbm9kZS5qcyB0ZXN0aW5nIHdlIG1heSBub3QgaGF2ZSBQcm94eVpvbmVTcGVjIGluIHdoaWNoIGNhc2UgdGhlcmUgaXMgbm90aGluZyB0byByZXNldC5cbiAgICBQcm94eVpvbmVTcGVjICYmIFByb3h5Wm9uZVNwZWMuYXNzZXJ0UHJlc2VudCgpLnJlc2V0RGVsZWdhdGUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBXcmFwcyBhIGZ1bmN0aW9uIHRvIGJlIGV4ZWN1dGVkIGluIHRoZSBmYWtlQXN5bmMgem9uZTpcbiAgICogLSBtaWNyb3Rhc2tzIGFyZSBtYW51YWxseSBleGVjdXRlZCBieSBjYWxsaW5nIGBmbHVzaE1pY3JvdGFza3MoKWAsXG4gICAqIC0gdGltZXJzIGFyZSBzeW5jaHJvbm91cywgYHRpY2soKWAgc2ltdWxhdGVzIHRoZSBhc3luY2hyb25vdXMgcGFzc2FnZSBvZiB0aW1lLlxuICAgKlxuICAgKiBJZiB0aGVyZSBhcmUgYW55IHBlbmRpbmcgdGltZXJzIGF0IHRoZSBlbmQgb2YgdGhlIGZ1bmN0aW9uLCBhbiBleGNlcHRpb24gd2lsbCBiZSB0aHJvd24uXG4gICAqXG4gICAqIENhbiBiZSB1c2VkIHRvIHdyYXAgaW5qZWN0KCkgY2FsbHMuXG4gICAqXG4gICAqICMjIEV4YW1wbGVcbiAgICpcbiAgICoge0BleGFtcGxlIGNvcmUvdGVzdGluZy90cy9mYWtlX2FzeW5jLnRzIHJlZ2lvbj0nYmFzaWMnfVxuICAgKlxuICAgKiBAcGFyYW0gZm5cbiAgICogQHJldHVybnMgVGhlIGZ1bmN0aW9uIHdyYXBwZWQgdG8gYmUgZXhlY3V0ZWQgaW4gdGhlIGZha2VBc3luYyB6b25lXG4gICAqXG4gICAqIEBleHBlcmltZW50YWxcbiAgICovXG4gIGZ1bmN0aW9uIGZha2VBc3luYyhmbjogRnVuY3Rpb24pOiAoLi4uYXJnczogYW55W10pID0+IGFueSB7XG4gICAgLy8gTm90IHVzaW5nIGFuIGFycm93IGZ1bmN0aW9uIHRvIHByZXNlcnZlIGNvbnRleHQgcGFzc2VkIGZyb20gY2FsbCBzaXRlXG4gICAgcmV0dXJuIGZ1bmN0aW9uKC4uLmFyZ3M6IGFueVtdKSB7XG4gICAgICBjb25zdCBwcm94eVpvbmVTcGVjID0gUHJveHlab25lU3BlYy5hc3NlcnRQcmVzZW50KCk7XG4gICAgICBpZiAoWm9uZS5jdXJyZW50LmdldCgnRmFrZUFzeW5jVGVzdFpvbmVTcGVjJykpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdmYWtlQXN5bmMoKSBjYWxscyBjYW4gbm90IGJlIG5lc3RlZCcpO1xuICAgICAgfVxuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gaW4gY2FzZSBqYXNtaW5lLmNsb2NrIGluaXQgYSBmYWtlQXN5bmNUZXN0Wm9uZVNwZWNcbiAgICAgICAgaWYgKCFfZmFrZUFzeW5jVGVzdFpvbmVTcGVjKSB7XG4gICAgICAgICAgaWYgKHByb3h5Wm9uZVNwZWMuZ2V0RGVsZWdhdGUoKSBpbnN0YW5jZW9mIEZha2VBc3luY1Rlc3Rab25lU3BlYykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdmYWtlQXN5bmMoKSBjYWxscyBjYW4gbm90IGJlIG5lc3RlZCcpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIF9mYWtlQXN5bmNUZXN0Wm9uZVNwZWMgPSBuZXcgRmFrZUFzeW5jVGVzdFpvbmVTcGVjKCk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgcmVzOiBhbnk7XG4gICAgICAgIGNvbnN0IGxhc3RQcm94eVpvbmVTcGVjID0gcHJveHlab25lU3BlYy5nZXREZWxlZ2F0ZSgpO1xuICAgICAgICBwcm94eVpvbmVTcGVjLnNldERlbGVnYXRlKF9mYWtlQXN5bmNUZXN0Wm9uZVNwZWMpO1xuICAgICAgICBfZmFrZUFzeW5jVGVzdFpvbmVTcGVjLmxvY2tEYXRlUGF0Y2goKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICByZXMgPSBmbi5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICAgICAgICBmbHVzaE1pY3JvdGFza3MoKTtcbiAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICBwcm94eVpvbmVTcGVjLnNldERlbGVnYXRlKGxhc3RQcm94eVpvbmVTcGVjKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChfZmFrZUFzeW5jVGVzdFpvbmVTcGVjLnBlbmRpbmdQZXJpb2RpY1RpbWVycy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICAgICBgJHtfZmFrZUFzeW5jVGVzdFpvbmVTcGVjLnBlbmRpbmdQZXJpb2RpY1RpbWVycy5sZW5ndGh9IGAgK1xuICAgICAgICAgICAgICBgcGVyaW9kaWMgdGltZXIocykgc3RpbGwgaW4gdGhlIHF1ZXVlLmApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKF9mYWtlQXN5bmNUZXN0Wm9uZVNwZWMucGVuZGluZ1RpbWVycy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICAgICBgJHtfZmFrZUFzeW5jVGVzdFpvbmVTcGVjLnBlbmRpbmdUaW1lcnMubGVuZ3RofSB0aW1lcihzKSBzdGlsbCBpbiB0aGUgcXVldWUuYCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIHJlc2V0RmFrZUFzeW5jWm9uZSgpO1xuICAgICAgfVxuICAgIH07XG4gIH1cblxuICBmdW5jdGlvbiBfZ2V0RmFrZUFzeW5jWm9uZVNwZWMoKTogYW55IHtcbiAgICBpZiAoX2Zha2VBc3luY1Rlc3Rab25lU3BlYyA9PSBudWxsKSB7XG4gICAgICBfZmFrZUFzeW5jVGVzdFpvbmVTcGVjID0gWm9uZS5jdXJyZW50LmdldCgnRmFrZUFzeW5jVGVzdFpvbmVTcGVjJyk7XG4gICAgICBpZiAoX2Zha2VBc3luY1Rlc3Rab25lU3BlYyA9PSBudWxsKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignVGhlIGNvZGUgc2hvdWxkIGJlIHJ1bm5pbmcgaW4gdGhlIGZha2VBc3luYyB6b25lIHRvIGNhbGwgdGhpcyBmdW5jdGlvbicpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gX2Zha2VBc3luY1Rlc3Rab25lU3BlYztcbiAgfVxuXG4gIC8qKlxuICAgKiBTaW11bGF0ZXMgdGhlIGFzeW5jaHJvbm91cyBwYXNzYWdlIG9mIHRpbWUgZm9yIHRoZSB0aW1lcnMgaW4gdGhlIGZha2VBc3luYyB6b25lLlxuICAgKlxuICAgKiBUaGUgbWljcm90YXNrcyBxdWV1ZSBpcyBkcmFpbmVkIGF0IHRoZSB2ZXJ5IHN0YXJ0IG9mIHRoaXMgZnVuY3Rpb24gYW5kIGFmdGVyIGFueSB0aW1lciBjYWxsYmFja1xuICAgKiBoYXMgYmVlbiBleGVjdXRlZC5cbiAgICpcbiAgICogIyMgRXhhbXBsZVxuICAgKlxuICAgKiB7QGV4YW1wbGUgY29yZS90ZXN0aW5nL3RzL2Zha2VfYXN5bmMudHMgcmVnaW9uPSdiYXNpYyd9XG4gICAqXG4gICAqIEBleHBlcmltZW50YWxcbiAgICovXG4gIGZ1bmN0aW9uIHRpY2sobWlsbGlzOiBudW1iZXIgPSAwKTogdm9pZCB7XG4gICAgX2dldEZha2VBc3luY1pvbmVTcGVjKCkudGljayhtaWxsaXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNpbXVsYXRlcyB0aGUgYXN5bmNocm9ub3VzIHBhc3NhZ2Ugb2YgdGltZSBmb3IgdGhlIHRpbWVycyBpbiB0aGUgZmFrZUFzeW5jIHpvbmUgYnlcbiAgICogZHJhaW5pbmcgdGhlIG1hY3JvdGFzayBxdWV1ZSB1bnRpbCBpdCBpcyBlbXB0eS4gVGhlIHJldHVybmVkIHZhbHVlIGlzIHRoZSBtaWxsaXNlY29uZHNcbiAgICogb2YgdGltZSB0aGF0IHdvdWxkIGhhdmUgYmVlbiBlbGFwc2VkLlxuICAgKlxuICAgKiBAcGFyYW0gbWF4VHVybnNcbiAgICogQHJldHVybnMgVGhlIHNpbXVsYXRlZCB0aW1lIGVsYXBzZWQsIGluIG1pbGxpcy5cbiAgICpcbiAgICogQGV4cGVyaW1lbnRhbFxuICAgKi9cbiAgZnVuY3Rpb24gZmx1c2gobWF4VHVybnM/OiBudW1iZXIpOiBudW1iZXIge1xuICAgIHJldHVybiBfZ2V0RmFrZUFzeW5jWm9uZVNwZWMoKS5mbHVzaChtYXhUdXJucyk7XG4gIH1cblxuICAvKipcbiAgICogRGlzY2FyZCBhbGwgcmVtYWluaW5nIHBlcmlvZGljIHRhc2tzLlxuICAgKlxuICAgKiBAZXhwZXJpbWVudGFsXG4gICAqL1xuICBmdW5jdGlvbiBkaXNjYXJkUGVyaW9kaWNUYXNrcygpOiB2b2lkIHtcbiAgICBjb25zdCB6b25lU3BlYyA9IF9nZXRGYWtlQXN5bmNab25lU3BlYygpO1xuICAgIGNvbnN0IHBlbmRpbmdUaW1lcnMgPSB6b25lU3BlYy5wZW5kaW5nUGVyaW9kaWNUaW1lcnM7XG4gICAgem9uZVNwZWMucGVuZGluZ1BlcmlvZGljVGltZXJzLmxlbmd0aCA9IDA7XG4gIH1cblxuICAvKipcbiAgICogRmx1c2ggYW55IHBlbmRpbmcgbWljcm90YXNrcy5cbiAgICpcbiAgICogQGV4cGVyaW1lbnRhbFxuICAgKi9cbiAgZnVuY3Rpb24gZmx1c2hNaWNyb3Rhc2tzKCk6IHZvaWQge1xuICAgIF9nZXRGYWtlQXN5bmNab25lU3BlYygpLmZsdXNoTWljcm90YXNrcygpO1xuICB9XG4gIChab25lIGFzIGFueSlbYXBpLnN5bWJvbCgnZmFrZUFzeW5jVGVzdCcpXSA9XG4gICAgICB7cmVzZXRGYWtlQXN5bmNab25lLCBmbHVzaE1pY3JvdGFza3MsIGRpc2NhcmRQZXJpb2RpY1Rhc2tzLCB0aWNrLCBmbHVzaCwgZmFrZUFzeW5jfTtcbn0pOyJdfQ==