"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Observable_1 = require("../Observable");
var subscribeToArray_1 = require("./subscribeToArray");
var subscribeToPromise_1 = require("./subscribeToPromise");
var subscribeToIterable_1 = require("./subscribeToIterable");
var subscribeToObservable_1 = require("./subscribeToObservable");
var isArrayLike_1 = require("./isArrayLike");
var isPromise_1 = require("./isPromise");
var isObject_1 = require("./isObject");
var iterator_1 = require("../symbol/iterator");
var observable_1 = require("../symbol/observable");
exports.subscribeTo = function (result) {
    if (result instanceof Observable_1.Observable) {
        return function (subscriber) {
            if (result._isScalar) {
                subscriber.next(result.value);
                subscriber.complete();
                return undefined;
            }
            else {
                return result.subscribe(subscriber);
            }
        };
    }
    else if (result && typeof result[observable_1.observable] === 'function') {
        return subscribeToObservable_1.subscribeToObservable(result);
    }
    else if (isArrayLike_1.isArrayLike(result)) {
        return subscribeToArray_1.subscribeToArray(result);
    }
    else if (isPromise_1.isPromise(result)) {
        return subscribeToPromise_1.subscribeToPromise(result);
    }
    else if (result && typeof result[iterator_1.iterator] === 'function') {
        return subscribeToIterable_1.subscribeToIterable(result);
    }
    else {
        var value = isObject_1.isObject(result) ? 'an invalid object' : "'" + result + "'";
        var msg = "You provided " + value + " where a stream was expected."
            + ' You can provide an Observable, Promise, Array, or Iterable.';
        throw new TypeError(msg);
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Vic2NyaWJlVG8uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzdWJzY3JpYmVUby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDRDQUEyQztBQUUzQyx1REFBc0Q7QUFDdEQsMkRBQTBEO0FBQzFELDZEQUE0RDtBQUM1RCxpRUFBZ0U7QUFDaEUsNkNBQTRDO0FBQzVDLHlDQUF3QztBQUN4Qyx1Q0FBc0M7QUFDdEMsK0NBQWlFO0FBQ2pFLG1EQUF1RTtBQUcxRCxRQUFBLFdBQVcsR0FBRyxVQUFJLE1BQTBCO0lBQ3ZELElBQUksTUFBTSxZQUFZLHVCQUFVLEVBQUU7UUFDaEMsT0FBTyxVQUFDLFVBQXlCO1lBQzdCLElBQUksTUFBTSxDQUFDLFNBQVMsRUFBRTtnQkFDdEIsVUFBVSxDQUFDLElBQUksQ0FBRSxNQUFjLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ3ZDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztnQkFDdEIsT0FBTyxTQUFTLENBQUM7YUFDbEI7aUJBQU07Z0JBQ0wsT0FBTyxNQUFNLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDO2FBQ3JDO1FBQ0gsQ0FBQyxDQUFDO0tBQ0g7U0FBTSxJQUFJLE1BQU0sSUFBSSxPQUFPLE1BQU0sQ0FBQyx1QkFBaUIsQ0FBQyxLQUFLLFVBQVUsRUFBRTtRQUNwRSxPQUFPLDZDQUFxQixDQUFDLE1BQWEsQ0FBQyxDQUFDO0tBQzdDO1NBQU0sSUFBSSx5QkFBVyxDQUFDLE1BQU0sQ0FBQyxFQUFFO1FBQzlCLE9BQU8sbUNBQWdCLENBQUMsTUFBTSxDQUFDLENBQUM7S0FDakM7U0FBTSxJQUFJLHFCQUFTLENBQUMsTUFBTSxDQUFDLEVBQUU7UUFDNUIsT0FBTyx1Q0FBa0IsQ0FBQyxNQUFzQixDQUFDLENBQUM7S0FDbkQ7U0FBTSxJQUFJLE1BQU0sSUFBSSxPQUFPLE1BQU0sQ0FBQyxtQkFBZSxDQUFDLEtBQUssVUFBVSxFQUFFO1FBQ2xFLE9BQU8seUNBQW1CLENBQUMsTUFBYSxDQUFDLENBQUM7S0FDM0M7U0FBTTtRQUNMLElBQU0sS0FBSyxHQUFHLG1CQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQyxNQUFJLE1BQU0sTUFBRyxDQUFDO1FBQ3JFLElBQU0sR0FBRyxHQUFHLGtCQUFnQixLQUFLLGtDQUErQjtjQUM1RCw4REFBOEQsQ0FBQztRQUNuRSxNQUFNLElBQUksU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQzFCO0FBQ0gsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJy4uL09ic2VydmFibGUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZUlucHV0IH0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IHsgc3Vic2NyaWJlVG9BcnJheSB9IGZyb20gJy4vc3Vic2NyaWJlVG9BcnJheSc7XG5pbXBvcnQgeyBzdWJzY3JpYmVUb1Byb21pc2UgfSBmcm9tICcuL3N1YnNjcmliZVRvUHJvbWlzZSc7XG5pbXBvcnQgeyBzdWJzY3JpYmVUb0l0ZXJhYmxlIH0gZnJvbSAnLi9zdWJzY3JpYmVUb0l0ZXJhYmxlJztcbmltcG9ydCB7IHN1YnNjcmliZVRvT2JzZXJ2YWJsZSB9IGZyb20gJy4vc3Vic2NyaWJlVG9PYnNlcnZhYmxlJztcbmltcG9ydCB7IGlzQXJyYXlMaWtlIH0gZnJvbSAnLi9pc0FycmF5TGlrZSc7XG5pbXBvcnQgeyBpc1Byb21pc2UgfSBmcm9tICcuL2lzUHJvbWlzZSc7XG5pbXBvcnQgeyBpc09iamVjdCB9IGZyb20gJy4vaXNPYmplY3QnO1xuaW1wb3J0IHsgaXRlcmF0b3IgYXMgU3ltYm9sX2l0ZXJhdG9yIH0gZnJvbSAnLi4vc3ltYm9sL2l0ZXJhdG9yJztcbmltcG9ydCB7IG9ic2VydmFibGUgYXMgU3ltYm9sX29ic2VydmFibGUgfSBmcm9tICcuLi9zeW1ib2wvb2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBTdWJzY3JpYmVyIH0gZnJvbSAnLi4vU3Vic2NyaWJlcic7XG5cbmV4cG9ydCBjb25zdCBzdWJzY3JpYmVUbyA9IDxUPihyZXN1bHQ6IE9ic2VydmFibGVJbnB1dDxUPikgPT4ge1xuICBpZiAocmVzdWx0IGluc3RhbmNlb2YgT2JzZXJ2YWJsZSkge1xuICAgIHJldHVybiAoc3Vic2NyaWJlcjogU3Vic2NyaWJlcjxUPikgPT4ge1xuICAgICAgICBpZiAocmVzdWx0Ll9pc1NjYWxhcikge1xuICAgICAgICBzdWJzY3JpYmVyLm5leHQoKHJlc3VsdCBhcyBhbnkpLnZhbHVlKTtcbiAgICAgICAgc3Vic2NyaWJlci5jb21wbGV0ZSgpO1xuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHJlc3VsdC5zdWJzY3JpYmUoc3Vic2NyaWJlcik7XG4gICAgICB9XG4gICAgfTtcbiAgfSBlbHNlIGlmIChyZXN1bHQgJiYgdHlwZW9mIHJlc3VsdFtTeW1ib2xfb2JzZXJ2YWJsZV0gPT09ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm4gc3Vic2NyaWJlVG9PYnNlcnZhYmxlKHJlc3VsdCBhcyBhbnkpO1xuICB9IGVsc2UgaWYgKGlzQXJyYXlMaWtlKHJlc3VsdCkpIHtcbiAgICByZXR1cm4gc3Vic2NyaWJlVG9BcnJheShyZXN1bHQpO1xuICB9IGVsc2UgaWYgKGlzUHJvbWlzZShyZXN1bHQpKSB7XG4gICAgcmV0dXJuIHN1YnNjcmliZVRvUHJvbWlzZShyZXN1bHQgYXMgUHJvbWlzZTxhbnk+KTtcbiAgfSBlbHNlIGlmIChyZXN1bHQgJiYgdHlwZW9mIHJlc3VsdFtTeW1ib2xfaXRlcmF0b3JdID09PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIHN1YnNjcmliZVRvSXRlcmFibGUocmVzdWx0IGFzIGFueSk7XG4gIH0gZWxzZSB7XG4gICAgY29uc3QgdmFsdWUgPSBpc09iamVjdChyZXN1bHQpID8gJ2FuIGludmFsaWQgb2JqZWN0JyA6IGAnJHtyZXN1bHR9J2A7XG4gICAgY29uc3QgbXNnID0gYFlvdSBwcm92aWRlZCAke3ZhbHVlfSB3aGVyZSBhIHN0cmVhbSB3YXMgZXhwZWN0ZWQuYFxuICAgICAgKyAnIFlvdSBjYW4gcHJvdmlkZSBhbiBPYnNlcnZhYmxlLCBQcm9taXNlLCBBcnJheSwgb3IgSXRlcmFibGUuJztcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKG1zZyk7XG4gIH1cbn07XG4iXX0=