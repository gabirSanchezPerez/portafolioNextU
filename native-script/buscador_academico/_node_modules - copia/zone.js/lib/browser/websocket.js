"use strict";
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
var events_1 = require("../common/events");
var utils_1 = require("../common/utils");
// we have to patch the instance since the proto is non-configurable
function apply(api, _global) {
    var WS = _global.WebSocket;
    // On Safari window.EventTarget doesn't exist so need to patch WS add/removeEventListener
    // On older Chrome, no need since EventTarget was already patched
    if (!_global.EventTarget) {
        events_1.patchEventTarget(_global, [WS.prototype]);
    }
    _global.WebSocket = function (x, y) {
        var socket = arguments.length > 1 ? new WS(x, y) : new WS(x);
        var proxySocket;
        var proxySocketProto;
        // Safari 7.0 has non-configurable own 'onmessage' and friends properties on the socket instance
        var onmessageDesc = utils_1.ObjectGetOwnPropertyDescriptor(socket, 'onmessage');
        if (onmessageDesc && onmessageDesc.configurable === false) {
            proxySocket = utils_1.ObjectCreate(socket);
            // socket have own property descriptor 'onopen', 'onmessage', 'onclose', 'onerror'
            // but proxySocket not, so we will keep socket as prototype and pass it to
            // patchOnProperties method
            proxySocketProto = socket;
            [utils_1.ADD_EVENT_LISTENER_STR, utils_1.REMOVE_EVENT_LISTENER_STR, 'send', 'close'].forEach(function (propName) {
                proxySocket[propName] = function () {
                    var args = utils_1.ArraySlice.call(arguments);
                    if (propName === utils_1.ADD_EVENT_LISTENER_STR || propName === utils_1.REMOVE_EVENT_LISTENER_STR) {
                        var eventName = args.length > 0 ? args[0] : undefined;
                        if (eventName) {
                            var propertySymbol = Zone.__symbol__('ON_PROPERTY' + eventName);
                            socket[propertySymbol] = proxySocket[propertySymbol];
                        }
                    }
                    return socket[propName].apply(socket, args);
                };
            });
        }
        else {
            // we can patch the real socket
            proxySocket = socket;
        }
        utils_1.patchOnProperties(proxySocket, ['close', 'error', 'message', 'open'], proxySocketProto);
        return proxySocket;
    };
    var globalWebSocket = _global['WebSocket'];
    for (var prop in WS) {
        globalWebSocket[prop] = WS[prop];
    }
}
exports.apply = apply;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2Vic29ja2V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsid2Vic29ja2V0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7O0dBTUc7O0FBRUgsMkNBQWtEO0FBQ2xELHlDQUErSjtBQUUvSixvRUFBb0U7QUFDcEUsU0FBZ0IsS0FBSyxDQUFDLEdBQWlCLEVBQUUsT0FBWTtJQUNuRCxJQUFNLEVBQUUsR0FBUyxPQUFRLENBQUMsU0FBUyxDQUFDO0lBQ3BDLHlGQUF5RjtJQUN6RixpRUFBaUU7SUFDakUsSUFBSSxDQUFPLE9BQVEsQ0FBQyxXQUFXLEVBQUU7UUFDL0IseUJBQWdCLENBQUMsT0FBTyxFQUFFLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7S0FDM0M7SUFDSyxPQUFRLENBQUMsU0FBUyxHQUFHLFVBQVMsQ0FBTSxFQUFFLENBQU07UUFDaEQsSUFBTSxNQUFNLEdBQUcsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDL0QsSUFBSSxXQUFnQixDQUFDO1FBRXJCLElBQUksZ0JBQXFCLENBQUM7UUFFMUIsZ0dBQWdHO1FBQ2hHLElBQU0sYUFBYSxHQUFHLHNDQUE4QixDQUFDLE1BQU0sRUFBRSxXQUFXLENBQUMsQ0FBQztRQUMxRSxJQUFJLGFBQWEsSUFBSSxhQUFhLENBQUMsWUFBWSxLQUFLLEtBQUssRUFBRTtZQUN6RCxXQUFXLEdBQUcsb0JBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNuQyxrRkFBa0Y7WUFDbEYsMEVBQTBFO1lBQzFFLDJCQUEyQjtZQUMzQixnQkFBZ0IsR0FBRyxNQUFNLENBQUM7WUFDMUIsQ0FBQyw4QkFBc0IsRUFBRSxpQ0FBeUIsRUFBRSxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQ3pFLFFBQVE7Z0JBQ1YsV0FBVyxDQUFDLFFBQVEsQ0FBQyxHQUFHO29CQUN0QixJQUFNLElBQUksR0FBRyxrQkFBVSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztvQkFDeEMsSUFBSSxRQUFRLEtBQUssOEJBQXNCLElBQUksUUFBUSxLQUFLLGlDQUF5QixFQUFFO3dCQUNqRixJQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7d0JBQ3hELElBQUksU0FBUyxFQUFFOzRCQUNiLElBQU0sY0FBYyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxHQUFHLFNBQVMsQ0FBQyxDQUFDOzRCQUNsRSxNQUFNLENBQUMsY0FBYyxDQUFDLEdBQUcsV0FBVyxDQUFDLGNBQWMsQ0FBQyxDQUFDO3lCQUN0RDtxQkFDRjtvQkFDRCxPQUFPLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO2dCQUM5QyxDQUFDLENBQUM7WUFDSixDQUFDLENBQUMsQ0FBQztTQUNKO2FBQU07WUFDTCwrQkFBK0I7WUFDL0IsV0FBVyxHQUFHLE1BQU0sQ0FBQztTQUN0QjtRQUVELHlCQUFpQixDQUFDLFdBQVcsRUFBRSxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sQ0FBQyxFQUFFLGdCQUFnQixDQUFDLENBQUM7UUFDeEYsT0FBTyxXQUFXLENBQUM7SUFDckIsQ0FBQyxDQUFDO0lBRUYsSUFBTSxlQUFlLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQzdDLEtBQUssSUFBTSxJQUFJLElBQUksRUFBRSxFQUFFO1FBQ3JCLGVBQWUsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDbEM7QUFDSCxDQUFDO0FBaERELHNCQWdEQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtwYXRjaEV2ZW50VGFyZ2V0fSBmcm9tICcuLi9jb21tb24vZXZlbnRzJztcbmltcG9ydCB7QUREX0VWRU5UX0xJU1RFTkVSX1NUUiwgQXJyYXlTbGljZSwgT2JqZWN0Q3JlYXRlLCBPYmplY3RHZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IsIHBhdGNoT25Qcm9wZXJ0aWVzLCBSRU1PVkVfRVZFTlRfTElTVEVORVJfU1RSfSBmcm9tICcuLi9jb21tb24vdXRpbHMnO1xuXG4vLyB3ZSBoYXZlIHRvIHBhdGNoIHRoZSBpbnN0YW5jZSBzaW5jZSB0aGUgcHJvdG8gaXMgbm9uLWNvbmZpZ3VyYWJsZVxuZXhwb3J0IGZ1bmN0aW9uIGFwcGx5KGFwaTogX1pvbmVQcml2YXRlLCBfZ2xvYmFsOiBhbnkpIHtcbiAgY29uc3QgV1MgPSAoPGFueT5fZ2xvYmFsKS5XZWJTb2NrZXQ7XG4gIC8vIE9uIFNhZmFyaSB3aW5kb3cuRXZlbnRUYXJnZXQgZG9lc24ndCBleGlzdCBzbyBuZWVkIHRvIHBhdGNoIFdTIGFkZC9yZW1vdmVFdmVudExpc3RlbmVyXG4gIC8vIE9uIG9sZGVyIENocm9tZSwgbm8gbmVlZCBzaW5jZSBFdmVudFRhcmdldCB3YXMgYWxyZWFkeSBwYXRjaGVkXG4gIGlmICghKDxhbnk+X2dsb2JhbCkuRXZlbnRUYXJnZXQpIHtcbiAgICBwYXRjaEV2ZW50VGFyZ2V0KF9nbG9iYWwsIFtXUy5wcm90b3R5cGVdKTtcbiAgfVxuICAoPGFueT5fZ2xvYmFsKS5XZWJTb2NrZXQgPSBmdW5jdGlvbih4OiBhbnksIHk6IGFueSkge1xuICAgIGNvbnN0IHNvY2tldCA9IGFyZ3VtZW50cy5sZW5ndGggPiAxID8gbmV3IFdTKHgsIHkpIDogbmV3IFdTKHgpO1xuICAgIGxldCBwcm94eVNvY2tldDogYW55O1xuXG4gICAgbGV0IHByb3h5U29ja2V0UHJvdG86IGFueTtcblxuICAgIC8vIFNhZmFyaSA3LjAgaGFzIG5vbi1jb25maWd1cmFibGUgb3duICdvbm1lc3NhZ2UnIGFuZCBmcmllbmRzIHByb3BlcnRpZXMgb24gdGhlIHNvY2tldCBpbnN0YW5jZVxuICAgIGNvbnN0IG9ubWVzc2FnZURlc2MgPSBPYmplY3RHZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Ioc29ja2V0LCAnb25tZXNzYWdlJyk7XG4gICAgaWYgKG9ubWVzc2FnZURlc2MgJiYgb25tZXNzYWdlRGVzYy5jb25maWd1cmFibGUgPT09IGZhbHNlKSB7XG4gICAgICBwcm94eVNvY2tldCA9IE9iamVjdENyZWF0ZShzb2NrZXQpO1xuICAgICAgLy8gc29ja2V0IGhhdmUgb3duIHByb3BlcnR5IGRlc2NyaXB0b3IgJ29ub3BlbicsICdvbm1lc3NhZ2UnLCAnb25jbG9zZScsICdvbmVycm9yJ1xuICAgICAgLy8gYnV0IHByb3h5U29ja2V0IG5vdCwgc28gd2Ugd2lsbCBrZWVwIHNvY2tldCBhcyBwcm90b3R5cGUgYW5kIHBhc3MgaXQgdG9cbiAgICAgIC8vIHBhdGNoT25Qcm9wZXJ0aWVzIG1ldGhvZFxuICAgICAgcHJveHlTb2NrZXRQcm90byA9IHNvY2tldDtcbiAgICAgIFtBRERfRVZFTlRfTElTVEVORVJfU1RSLCBSRU1PVkVfRVZFTlRfTElTVEVORVJfU1RSLCAnc2VuZCcsICdjbG9zZSddLmZvckVhY2goZnVuY3Rpb24oXG4gICAgICAgICAgcHJvcE5hbWUpIHtcbiAgICAgICAgcHJveHlTb2NrZXRbcHJvcE5hbWVdID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgY29uc3QgYXJncyA9IEFycmF5U2xpY2UuY2FsbChhcmd1bWVudHMpO1xuICAgICAgICAgIGlmIChwcm9wTmFtZSA9PT0gQUREX0VWRU5UX0xJU1RFTkVSX1NUUiB8fCBwcm9wTmFtZSA9PT0gUkVNT1ZFX0VWRU5UX0xJU1RFTkVSX1NUUikge1xuICAgICAgICAgICAgY29uc3QgZXZlbnROYW1lID0gYXJncy5sZW5ndGggPiAwID8gYXJnc1swXSA6IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIGlmIChldmVudE5hbWUpIHtcbiAgICAgICAgICAgICAgY29uc3QgcHJvcGVydHlTeW1ib2wgPSBab25lLl9fc3ltYm9sX18oJ09OX1BST1BFUlRZJyArIGV2ZW50TmFtZSk7XG4gICAgICAgICAgICAgIHNvY2tldFtwcm9wZXJ0eVN5bWJvbF0gPSBwcm94eVNvY2tldFtwcm9wZXJ0eVN5bWJvbF07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBzb2NrZXRbcHJvcE5hbWVdLmFwcGx5KHNvY2tldCwgYXJncyk7XG4gICAgICAgIH07XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gd2UgY2FuIHBhdGNoIHRoZSByZWFsIHNvY2tldFxuICAgICAgcHJveHlTb2NrZXQgPSBzb2NrZXQ7XG4gICAgfVxuXG4gICAgcGF0Y2hPblByb3BlcnRpZXMocHJveHlTb2NrZXQsIFsnY2xvc2UnLCAnZXJyb3InLCAnbWVzc2FnZScsICdvcGVuJ10sIHByb3h5U29ja2V0UHJvdG8pO1xuICAgIHJldHVybiBwcm94eVNvY2tldDtcbiAgfTtcblxuICBjb25zdCBnbG9iYWxXZWJTb2NrZXQgPSBfZ2xvYmFsWydXZWJTb2NrZXQnXTtcbiAgZm9yIChjb25zdCBwcm9wIGluIFdTKSB7XG4gICAgZ2xvYmFsV2ViU29ja2V0W3Byb3BdID0gV1NbcHJvcF07XG4gIH1cbn1cbiJdfQ==