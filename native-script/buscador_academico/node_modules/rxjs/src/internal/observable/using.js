"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Observable_1 = require("../Observable");
var from_1 = require("./from"); // from from from! LAWL
var empty_1 = require("./empty");
/**
 * Creates an Observable that uses a resource which will be disposed at the same time as the Observable.
 *
 * <span class="informal">Use it when you catch yourself cleaning up after an Observable.</span>
 *
 * `using` is a factory operator, which accepts two functions. First function returns a disposable resource.
 * It can be an arbitrary object that implements `unsubscribe` method. Second function will be injected with
 * that object and should return an Observable. That Observable can use resource object during its execution.
 * Both functions passed to `using` will be called every time someone subscribes - neither an Observable nor
 * resource object will be shared in any way between subscriptions.
 *
 * When Observable returned by `using` is subscribed, Observable returned from the second function will be subscribed
 * as well. All its notifications (nexted values, completion and error events) will be emitted unchanged by the output
 * Observable. If however someone unsubscribes from the Observable or source Observable completes or errors by itself,
 * the `unsubscribe` method on resource object will be called. This can be used to do any necessary clean up, which
 * otherwise would have to be handled by hand. Note that complete or error notifications are not emitted when someone
 * cancels subscription to an Observable via `unsubscribe`, so `using` can be used as a hook, allowing you to make
 * sure that all resources which need to exist during an Observable execution will be disposed at appropriate time.
 *
 * @see {@link defer}
 *
 * @param {function(): ISubscription} resourceFactory A function which creates any resource object
 * that implements `unsubscribe` method.
 * @param {function(resource: ISubscription): Observable<T>} observableFactory A function which
 * creates an Observable, that can use injected resource object.
 * @return {Observable<T>} An Observable that behaves the same as Observable returned by `observableFactory`, but
 * which - when completed, errored or unsubscribed - will also call `unsubscribe` on created resource object.
 */
function using(resourceFactory, observableFactory) {
    return new Observable_1.Observable(function (subscriber) {
        var resource;
        try {
            resource = resourceFactory();
        }
        catch (err) {
            subscriber.error(err);
            return undefined;
        }
        var result;
        try {
            result = observableFactory(resource);
        }
        catch (err) {
            subscriber.error(err);
            return undefined;
        }
        var source = result ? from_1.from(result) : empty_1.EMPTY;
        var subscription = source.subscribe(subscriber);
        return function () {
            subscription.unsubscribe();
            if (resource) {
                resource.unsubscribe();
            }
        };
    });
}
exports.using = using;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNpbmcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ1c2luZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDRDQUEyQztBQUUzQywrQkFBOEIsQ0FBQyx1QkFBdUI7QUFDdEQsaUNBQWdDO0FBRWhDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EyQkc7QUFDSCxTQUFnQixLQUFLLENBQUksZUFBNEMsRUFDNUMsaUJBQWlGO0lBQ3hHLE9BQU8sSUFBSSx1QkFBVSxDQUFJLFVBQUEsVUFBVTtRQUNqQyxJQUFJLFFBQStCLENBQUM7UUFFcEMsSUFBSTtZQUNGLFFBQVEsR0FBRyxlQUFlLEVBQUUsQ0FBQztTQUM5QjtRQUFDLE9BQU8sR0FBRyxFQUFFO1lBQ1osVUFBVSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUN0QixPQUFPLFNBQVMsQ0FBQztTQUNsQjtRQUVELElBQUksTUFBaUMsQ0FBQztRQUN0QyxJQUFJO1lBQ0YsTUFBTSxHQUFHLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQ3RDO1FBQUMsT0FBTyxHQUFHLEVBQUU7WUFDWixVQUFVLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3RCLE9BQU8sU0FBUyxDQUFDO1NBQ2xCO1FBRUQsSUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxXQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLGFBQUssQ0FBQztRQUM3QyxJQUFNLFlBQVksR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ2xELE9BQU87WUFDTCxZQUFZLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDM0IsSUFBSSxRQUFRLEVBQUU7Z0JBQ1osUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDO2FBQ3hCO1FBQ0gsQ0FBQyxDQUFDO0lBQ0osQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBN0JELHNCQTZCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICcuLi9PYnNlcnZhYmxlJztcbmltcG9ydCB7IFVuc3Vic2NyaWJhYmxlLCBPYnNlcnZhYmxlSW5wdXQgfSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQgeyBmcm9tIH0gZnJvbSAnLi9mcm9tJzsgLy8gZnJvbSBmcm9tIGZyb20hIExBV0xcbmltcG9ydCB7IEVNUFRZIH0gZnJvbSAnLi9lbXB0eSc7XG5cbi8qKlxuICogQ3JlYXRlcyBhbiBPYnNlcnZhYmxlIHRoYXQgdXNlcyBhIHJlc291cmNlIHdoaWNoIHdpbGwgYmUgZGlzcG9zZWQgYXQgdGhlIHNhbWUgdGltZSBhcyB0aGUgT2JzZXJ2YWJsZS5cbiAqXG4gKiA8c3BhbiBjbGFzcz1cImluZm9ybWFsXCI+VXNlIGl0IHdoZW4geW91IGNhdGNoIHlvdXJzZWxmIGNsZWFuaW5nIHVwIGFmdGVyIGFuIE9ic2VydmFibGUuPC9zcGFuPlxuICpcbiAqIGB1c2luZ2AgaXMgYSBmYWN0b3J5IG9wZXJhdG9yLCB3aGljaCBhY2NlcHRzIHR3byBmdW5jdGlvbnMuIEZpcnN0IGZ1bmN0aW9uIHJldHVybnMgYSBkaXNwb3NhYmxlIHJlc291cmNlLlxuICogSXQgY2FuIGJlIGFuIGFyYml0cmFyeSBvYmplY3QgdGhhdCBpbXBsZW1lbnRzIGB1bnN1YnNjcmliZWAgbWV0aG9kLiBTZWNvbmQgZnVuY3Rpb24gd2lsbCBiZSBpbmplY3RlZCB3aXRoXG4gKiB0aGF0IG9iamVjdCBhbmQgc2hvdWxkIHJldHVybiBhbiBPYnNlcnZhYmxlLiBUaGF0IE9ic2VydmFibGUgY2FuIHVzZSByZXNvdXJjZSBvYmplY3QgZHVyaW5nIGl0cyBleGVjdXRpb24uXG4gKiBCb3RoIGZ1bmN0aW9ucyBwYXNzZWQgdG8gYHVzaW5nYCB3aWxsIGJlIGNhbGxlZCBldmVyeSB0aW1lIHNvbWVvbmUgc3Vic2NyaWJlcyAtIG5laXRoZXIgYW4gT2JzZXJ2YWJsZSBub3JcbiAqIHJlc291cmNlIG9iamVjdCB3aWxsIGJlIHNoYXJlZCBpbiBhbnkgd2F5IGJldHdlZW4gc3Vic2NyaXB0aW9ucy5cbiAqXG4gKiBXaGVuIE9ic2VydmFibGUgcmV0dXJuZWQgYnkgYHVzaW5nYCBpcyBzdWJzY3JpYmVkLCBPYnNlcnZhYmxlIHJldHVybmVkIGZyb20gdGhlIHNlY29uZCBmdW5jdGlvbiB3aWxsIGJlIHN1YnNjcmliZWRcbiAqIGFzIHdlbGwuIEFsbCBpdHMgbm90aWZpY2F0aW9ucyAobmV4dGVkIHZhbHVlcywgY29tcGxldGlvbiBhbmQgZXJyb3IgZXZlbnRzKSB3aWxsIGJlIGVtaXR0ZWQgdW5jaGFuZ2VkIGJ5IHRoZSBvdXRwdXRcbiAqIE9ic2VydmFibGUuIElmIGhvd2V2ZXIgc29tZW9uZSB1bnN1YnNjcmliZXMgZnJvbSB0aGUgT2JzZXJ2YWJsZSBvciBzb3VyY2UgT2JzZXJ2YWJsZSBjb21wbGV0ZXMgb3IgZXJyb3JzIGJ5IGl0c2VsZixcbiAqIHRoZSBgdW5zdWJzY3JpYmVgIG1ldGhvZCBvbiByZXNvdXJjZSBvYmplY3Qgd2lsbCBiZSBjYWxsZWQuIFRoaXMgY2FuIGJlIHVzZWQgdG8gZG8gYW55IG5lY2Vzc2FyeSBjbGVhbiB1cCwgd2hpY2hcbiAqIG90aGVyd2lzZSB3b3VsZCBoYXZlIHRvIGJlIGhhbmRsZWQgYnkgaGFuZC4gTm90ZSB0aGF0IGNvbXBsZXRlIG9yIGVycm9yIG5vdGlmaWNhdGlvbnMgYXJlIG5vdCBlbWl0dGVkIHdoZW4gc29tZW9uZVxuICogY2FuY2VscyBzdWJzY3JpcHRpb24gdG8gYW4gT2JzZXJ2YWJsZSB2aWEgYHVuc3Vic2NyaWJlYCwgc28gYHVzaW5nYCBjYW4gYmUgdXNlZCBhcyBhIGhvb2ssIGFsbG93aW5nIHlvdSB0byBtYWtlXG4gKiBzdXJlIHRoYXQgYWxsIHJlc291cmNlcyB3aGljaCBuZWVkIHRvIGV4aXN0IGR1cmluZyBhbiBPYnNlcnZhYmxlIGV4ZWN1dGlvbiB3aWxsIGJlIGRpc3Bvc2VkIGF0IGFwcHJvcHJpYXRlIHRpbWUuXG4gKlxuICogQHNlZSB7QGxpbmsgZGVmZXJ9XG4gKlxuICogQHBhcmFtIHtmdW5jdGlvbigpOiBJU3Vic2NyaXB0aW9ufSByZXNvdXJjZUZhY3RvcnkgQSBmdW5jdGlvbiB3aGljaCBjcmVhdGVzIGFueSByZXNvdXJjZSBvYmplY3RcbiAqIHRoYXQgaW1wbGVtZW50cyBgdW5zdWJzY3JpYmVgIG1ldGhvZC5cbiAqIEBwYXJhbSB7ZnVuY3Rpb24ocmVzb3VyY2U6IElTdWJzY3JpcHRpb24pOiBPYnNlcnZhYmxlPFQ+fSBvYnNlcnZhYmxlRmFjdG9yeSBBIGZ1bmN0aW9uIHdoaWNoXG4gKiBjcmVhdGVzIGFuIE9ic2VydmFibGUsIHRoYXQgY2FuIHVzZSBpbmplY3RlZCByZXNvdXJjZSBvYmplY3QuXG4gKiBAcmV0dXJuIHtPYnNlcnZhYmxlPFQ+fSBBbiBPYnNlcnZhYmxlIHRoYXQgYmVoYXZlcyB0aGUgc2FtZSBhcyBPYnNlcnZhYmxlIHJldHVybmVkIGJ5IGBvYnNlcnZhYmxlRmFjdG9yeWAsIGJ1dFxuICogd2hpY2ggLSB3aGVuIGNvbXBsZXRlZCwgZXJyb3JlZCBvciB1bnN1YnNjcmliZWQgLSB3aWxsIGFsc28gY2FsbCBgdW5zdWJzY3JpYmVgIG9uIGNyZWF0ZWQgcmVzb3VyY2Ugb2JqZWN0LlxuICovXG5leHBvcnQgZnVuY3Rpb24gdXNpbmc8VD4ocmVzb3VyY2VGYWN0b3J5OiAoKSA9PiBVbnN1YnNjcmliYWJsZSB8IHZvaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgb2JzZXJ2YWJsZUZhY3Rvcnk6IChyZXNvdXJjZTogVW5zdWJzY3JpYmFibGUgfCB2b2lkKSA9PiBPYnNlcnZhYmxlSW5wdXQ8VD4gfCB2b2lkKTogT2JzZXJ2YWJsZTxUPiB7XG4gIHJldHVybiBuZXcgT2JzZXJ2YWJsZTxUPihzdWJzY3JpYmVyID0+IHtcbiAgICBsZXQgcmVzb3VyY2U6IFVuc3Vic2NyaWJhYmxlIHwgdm9pZDtcblxuICAgIHRyeSB7XG4gICAgICByZXNvdXJjZSA9IHJlc291cmNlRmFjdG9yeSgpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgc3Vic2NyaWJlci5lcnJvcihlcnIpO1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBsZXQgcmVzdWx0OiBPYnNlcnZhYmxlSW5wdXQ8VD4gfCB2b2lkO1xuICAgIHRyeSB7XG4gICAgICByZXN1bHQgPSBvYnNlcnZhYmxlRmFjdG9yeShyZXNvdXJjZSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBzdWJzY3JpYmVyLmVycm9yKGVycik7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIGNvbnN0IHNvdXJjZSA9IHJlc3VsdCA/IGZyb20ocmVzdWx0KSA6IEVNUFRZO1xuICAgIGNvbnN0IHN1YnNjcmlwdGlvbiA9IHNvdXJjZS5zdWJzY3JpYmUoc3Vic2NyaWJlcik7XG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIHN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgaWYgKHJlc291cmNlKSB7XG4gICAgICAgIHJlc291cmNlLnVuc3Vic2NyaWJlKCk7XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG59XG4iXX0=