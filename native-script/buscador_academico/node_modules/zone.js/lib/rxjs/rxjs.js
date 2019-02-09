"use strict";
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
Zone.__load_patch('rxjs', function (global, Zone, api) {
    var symbol = Zone.__symbol__;
    var nextSource = 'rxjs.Subscriber.next';
    var errorSource = 'rxjs.Subscriber.error';
    var completeSource = 'rxjs.Subscriber.complete';
    var ObjectDefineProperties = Object.defineProperties;
    var patchObservable = function () {
        var ObservablePrototype = rxjs_1.Observable.prototype;
        var _symbolSubscribe = symbol('_subscribe');
        var _subscribe = ObservablePrototype[_symbolSubscribe] = ObservablePrototype._subscribe;
        ObjectDefineProperties(rxjs_1.Observable.prototype, {
            _zone: { value: null, writable: true, configurable: true },
            _zoneSource: { value: null, writable: true, configurable: true },
            _zoneSubscribe: { value: null, writable: true, configurable: true },
            source: {
                configurable: true,
                get: function () {
                    return this._zoneSource;
                },
                set: function (source) {
                    this._zone = Zone.current;
                    this._zoneSource = source;
                }
            },
            _subscribe: {
                configurable: true,
                get: function () {
                    if (this._zoneSubscribe) {
                        return this._zoneSubscribe;
                    }
                    else if (this.constructor === rxjs_1.Observable) {
                        return _subscribe;
                    }
                    var proto = Object.getPrototypeOf(this);
                    return proto && proto._subscribe;
                },
                set: function (subscribe) {
                    this._zone = Zone.current;
                    this._zoneSubscribe = function () {
                        if (this._zone && this._zone !== Zone.current) {
                            var tearDown_1 = this._zone.run(subscribe, this, arguments);
                            if (tearDown_1 && typeof tearDown_1 === 'function') {
                                var zone_1 = this._zone;
                                return function () {
                                    if (zone_1 !== Zone.current) {
                                        return zone_1.run(tearDown_1, this, arguments);
                                    }
                                    return tearDown_1.apply(this, arguments);
                                };
                            }
                            return tearDown_1;
                        }
                        return subscribe.apply(this, arguments);
                    };
                }
            },
            subjectFactory: {
                get: function () {
                    return this._zoneSubjectFactory;
                },
                set: function (factory) {
                    var zone = this._zone;
                    this._zoneSubjectFactory = function () {
                        if (zone && zone !== Zone.current) {
                            return zone.run(factory, this, arguments);
                        }
                        return factory.apply(this, arguments);
                    };
                }
            }
        });
    };
    api.patchMethod(rxjs_1.Observable.prototype, 'lift', function (delegate) { return function (self, args) {
        var observable = delegate.apply(self, args);
        if (observable.operator) {
            observable.operator._zone = Zone.current;
            api.patchMethod(observable.operator, 'call', function (operatorDelegate) { return function (operatorSelf, operatorArgs) {
                if (operatorSelf._zone && operatorSelf._zone !== Zone.current) {
                    return operatorSelf._zone.run(operatorDelegate, operatorSelf, operatorArgs);
                }
                return operatorDelegate.apply(operatorSelf, operatorArgs);
            }; });
        }
        return observable;
    }; });
    var patchSubscription = function () {
        ObjectDefineProperties(rxjs_1.Subscription.prototype, {
            _zone: { value: null, writable: true, configurable: true },
            _zoneUnsubscribe: { value: null, writable: true, configurable: true },
            _unsubscribe: {
                get: function () {
                    if (this._zoneUnsubscribe) {
                        return this._zoneUnsubscribe;
                    }
                    var proto = Object.getPrototypeOf(this);
                    return proto && proto._unsubscribe;
                },
                set: function (unsubscribe) {
                    this._zone = Zone.current;
                    this._zoneUnsubscribe = function () {
                        if (this._zone && this._zone !== Zone.current) {
                            return this._zone.run(unsubscribe, this, arguments);
                        }
                        return unsubscribe.apply(this, arguments);
                    };
                }
            }
        });
    };
    var patchSubscriber = function () {
        var next = rxjs_1.Subscriber.prototype.next;
        var error = rxjs_1.Subscriber.prototype.error;
        var complete = rxjs_1.Subscriber.prototype.complete;
        Object.defineProperty(rxjs_1.Subscriber.prototype, 'destination', {
            configurable: true,
            get: function () {
                return this._zoneDestination;
            },
            set: function (destination) {
                this._zone = Zone.current;
                this._zoneDestination = destination;
            }
        });
        // patch Subscriber.next to make sure it run
        // into SubscriptionZone
        rxjs_1.Subscriber.prototype.next = function () {
            var currentZone = Zone.current;
            var subscriptionZone = this._zone;
            // for performance concern, check Zone.current
            // equal with this._zone(SubscriptionZone) or not
            if (subscriptionZone && subscriptionZone !== currentZone) {
                return subscriptionZone.run(next, this, arguments, nextSource);
            }
            else {
                return next.apply(this, arguments);
            }
        };
        rxjs_1.Subscriber.prototype.error = function () {
            var currentZone = Zone.current;
            var subscriptionZone = this._zone;
            // for performance concern, check Zone.current
            // equal with this._zone(SubscriptionZone) or not
            if (subscriptionZone && subscriptionZone !== currentZone) {
                return subscriptionZone.run(error, this, arguments, errorSource);
            }
            else {
                return error.apply(this, arguments);
            }
        };
        rxjs_1.Subscriber.prototype.complete = function () {
            var currentZone = Zone.current;
            var subscriptionZone = this._zone;
            // for performance concern, check Zone.current
            // equal with this._zone(SubscriptionZone) or not
            if (subscriptionZone && subscriptionZone !== currentZone) {
                return subscriptionZone.run(complete, this, arguments, completeSource);
            }
            else {
                return complete.apply(this, arguments);
            }
        };
    };
    patchObservable();
    patchSubscription();
    patchSubscriber();
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnhqcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInJ4anMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7R0FNRzs7QUFFSCw2QkFBMEQ7QUFFekQsSUFBWSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsVUFBQyxNQUFXLEVBQUUsSUFBYyxFQUFFLEdBQWlCO0lBQ2hGLElBQU0sTUFBTSxHQUFzQyxJQUFZLENBQUMsVUFBVSxDQUFDO0lBQzFFLElBQU0sVUFBVSxHQUFHLHNCQUFzQixDQUFDO0lBQzFDLElBQU0sV0FBVyxHQUFHLHVCQUF1QixDQUFDO0lBQzVDLElBQU0sY0FBYyxHQUFHLDBCQUEwQixDQUFDO0lBRWxELElBQU0sc0JBQXNCLEdBQUcsTUFBTSxDQUFDLGdCQUFnQixDQUFDO0lBRXZELElBQU0sZUFBZSxHQUFHO1FBQ3RCLElBQU0sbUJBQW1CLEdBQVEsaUJBQVUsQ0FBQyxTQUFTLENBQUM7UUFDdEQsSUFBTSxnQkFBZ0IsR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDOUMsSUFBTSxVQUFVLEdBQUcsbUJBQW1CLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxtQkFBbUIsQ0FBQyxVQUFVLENBQUM7UUFFMUYsc0JBQXNCLENBQUMsaUJBQVUsQ0FBQyxTQUFTLEVBQUU7WUFDM0MsS0FBSyxFQUFFLEVBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxJQUFJLEVBQUM7WUFDeEQsV0FBVyxFQUFFLEVBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxJQUFJLEVBQUM7WUFDOUQsY0FBYyxFQUFFLEVBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxJQUFJLEVBQUM7WUFDakUsTUFBTSxFQUFFO2dCQUNOLFlBQVksRUFBRSxJQUFJO2dCQUNsQixHQUFHLEVBQUU7b0JBQ0gsT0FBUSxJQUFZLENBQUMsV0FBVyxDQUFDO2dCQUNuQyxDQUFDO2dCQUNELEdBQUcsRUFBRSxVQUFnQyxNQUFXO29CQUM3QyxJQUFZLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7b0JBQ2xDLElBQVksQ0FBQyxXQUFXLEdBQUcsTUFBTSxDQUFDO2dCQUNyQyxDQUFDO2FBQ0Y7WUFDRCxVQUFVLEVBQUU7Z0JBQ1YsWUFBWSxFQUFFLElBQUk7Z0JBQ2xCLEdBQUcsRUFBRTtvQkFDSCxJQUFLLElBQVksQ0FBQyxjQUFjLEVBQUU7d0JBQ2hDLE9BQVEsSUFBWSxDQUFDLGNBQWMsQ0FBQztxQkFDckM7eUJBQU0sSUFBSSxJQUFJLENBQUMsV0FBVyxLQUFLLGlCQUFVLEVBQUU7d0JBQzFDLE9BQU8sVUFBVSxDQUFDO3FCQUNuQjtvQkFDRCxJQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUMxQyxPQUFPLEtBQUssSUFBSSxLQUFLLENBQUMsVUFBVSxDQUFDO2dCQUNuQyxDQUFDO2dCQUNELEdBQUcsRUFBRSxVQUFnQyxTQUFjO29CQUNoRCxJQUFZLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7b0JBQ2xDLElBQVksQ0FBQyxjQUFjLEdBQUc7d0JBQzdCLElBQUksSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsS0FBSyxLQUFLLElBQUksQ0FBQyxPQUFPLEVBQUU7NEJBQzdDLElBQU0sVUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7NEJBQzVELElBQUksVUFBUSxJQUFJLE9BQU8sVUFBUSxLQUFLLFVBQVUsRUFBRTtnQ0FDOUMsSUFBTSxNQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztnQ0FDeEIsT0FBTztvQ0FDTCxJQUFJLE1BQUksS0FBSyxJQUFJLENBQUMsT0FBTyxFQUFFO3dDQUN6QixPQUFPLE1BQUksQ0FBQyxHQUFHLENBQUMsVUFBUSxFQUFFLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQztxQ0FDNUM7b0NBQ0QsT0FBTyxVQUFRLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQztnQ0FDekMsQ0FBQyxDQUFDOzZCQUNIOzRCQUNELE9BQU8sVUFBUSxDQUFDO3lCQUNqQjt3QkFDRCxPQUFPLFNBQVMsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDO29CQUMxQyxDQUFDLENBQUM7Z0JBQ0osQ0FBQzthQUNGO1lBQ0QsY0FBYyxFQUFFO2dCQUNkLEdBQUcsRUFBRTtvQkFDSCxPQUFRLElBQVksQ0FBQyxtQkFBbUIsQ0FBQztnQkFDM0MsQ0FBQztnQkFDRCxHQUFHLEVBQUUsVUFBUyxPQUFZO29CQUN4QixJQUFNLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO29CQUN4QixJQUFJLENBQUMsbUJBQW1CLEdBQUc7d0JBQ3pCLElBQUksSUFBSSxJQUFJLElBQUksS0FBSyxJQUFJLENBQUMsT0FBTyxFQUFFOzRCQUNqQyxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQzt5QkFDM0M7d0JBQ0QsT0FBTyxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQztvQkFDeEMsQ0FBQyxDQUFDO2dCQUNKLENBQUM7YUFDRjtTQUNGLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQztJQUVGLEdBQUcsQ0FBQyxXQUFXLENBQUMsaUJBQVUsQ0FBQyxTQUFTLEVBQUUsTUFBTSxFQUFFLFVBQUMsUUFBYSxJQUFLLE9BQUEsVUFBQyxJQUFTLEVBQUUsSUFBVztRQUN0RixJQUFNLFVBQVUsR0FBUSxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNuRCxJQUFJLFVBQVUsQ0FBQyxRQUFRLEVBQUU7WUFDdkIsVUFBVSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUN6QyxHQUFHLENBQUMsV0FBVyxDQUNYLFVBQVUsQ0FBQyxRQUFRLEVBQUUsTUFBTSxFQUMzQixVQUFDLGdCQUFxQixJQUFLLE9BQUEsVUFBQyxZQUFpQixFQUFFLFlBQW1CO2dCQUNoRSxJQUFJLFlBQVksQ0FBQyxLQUFLLElBQUksWUFBWSxDQUFDLEtBQUssS0FBSyxJQUFJLENBQUMsT0FBTyxFQUFFO29CQUM3RCxPQUFPLFlBQVksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLGdCQUFnQixFQUFFLFlBQVksRUFBRSxZQUFZLENBQUMsQ0FBQztpQkFDN0U7Z0JBQ0QsT0FBTyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsWUFBWSxFQUFFLFlBQVksQ0FBQyxDQUFDO1lBQzVELENBQUMsRUFMMEIsQ0FLMUIsQ0FBQyxDQUFDO1NBQ1I7UUFDRCxPQUFPLFVBQVUsQ0FBQztJQUNwQixDQUFDLEVBZGdFLENBY2hFLENBQUMsQ0FBQztJQUVILElBQU0saUJBQWlCLEdBQUc7UUFDeEIsc0JBQXNCLENBQUMsbUJBQVksQ0FBQyxTQUFTLEVBQUU7WUFDN0MsS0FBSyxFQUFFLEVBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxJQUFJLEVBQUM7WUFDeEQsZ0JBQWdCLEVBQUUsRUFBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBQztZQUNuRSxZQUFZLEVBQUU7Z0JBQ1osR0FBRyxFQUFFO29CQUNILElBQUssSUFBWSxDQUFDLGdCQUFnQixFQUFFO3dCQUNsQyxPQUFRLElBQVksQ0FBQyxnQkFBZ0IsQ0FBQztxQkFDdkM7b0JBQ0QsSUFBTSxLQUFLLEdBQUcsTUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDMUMsT0FBTyxLQUFLLElBQUksS0FBSyxDQUFDLFlBQVksQ0FBQztnQkFDckMsQ0FBQztnQkFDRCxHQUFHLEVBQUUsVUFBNkIsV0FBZ0I7b0JBQy9DLElBQVksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztvQkFDbEMsSUFBWSxDQUFDLGdCQUFnQixHQUFHO3dCQUMvQixJQUFJLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLEtBQUssS0FBSyxJQUFJLENBQUMsT0FBTyxFQUFFOzRCQUM3QyxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7eUJBQ3JEO3dCQUNELE9BQU8sV0FBVyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7b0JBQzVDLENBQUMsQ0FBQztnQkFDSixDQUFDO2FBQ0Y7U0FDRixDQUFDLENBQUM7SUFDTCxDQUFDLENBQUM7SUFFRixJQUFNLGVBQWUsR0FBRztRQUN0QixJQUFNLElBQUksR0FBRyxpQkFBVSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUM7UUFDdkMsSUFBTSxLQUFLLEdBQUcsaUJBQVUsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDO1FBQ3pDLElBQU0sUUFBUSxHQUFHLGlCQUFVLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQztRQUUvQyxNQUFNLENBQUMsY0FBYyxDQUFDLGlCQUFVLENBQUMsU0FBUyxFQUFFLGFBQWEsRUFBRTtZQUN6RCxZQUFZLEVBQUUsSUFBSTtZQUNsQixHQUFHLEVBQUU7Z0JBQ0gsT0FBUSxJQUFZLENBQUMsZ0JBQWdCLENBQUM7WUFDeEMsQ0FBQztZQUNELEdBQUcsRUFBRSxVQUFnQyxXQUFnQjtnQkFDbEQsSUFBWSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO2dCQUNsQyxJQUFZLENBQUMsZ0JBQWdCLEdBQUcsV0FBVyxDQUFDO1lBQy9DLENBQUM7U0FDRixDQUFDLENBQUM7UUFFSCw0Q0FBNEM7UUFDNUMsd0JBQXdCO1FBQ3hCLGlCQUFVLENBQUMsU0FBUyxDQUFDLElBQUksR0FBRztZQUMxQixJQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO1lBQ2pDLElBQU0sZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUVwQyw4Q0FBOEM7WUFDOUMsaURBQWlEO1lBQ2pELElBQUksZ0JBQWdCLElBQUksZ0JBQWdCLEtBQUssV0FBVyxFQUFFO2dCQUN4RCxPQUFPLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxVQUFVLENBQUMsQ0FBQzthQUNoRTtpQkFBTTtnQkFDTCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDO2FBQ3BDO1FBQ0gsQ0FBQyxDQUFDO1FBRUYsaUJBQVUsQ0FBQyxTQUFTLENBQUMsS0FBSyxHQUFHO1lBQzNCLElBQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7WUFDakMsSUFBTSxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBRXBDLDhDQUE4QztZQUM5QyxpREFBaUQ7WUFDakQsSUFBSSxnQkFBZ0IsSUFBSSxnQkFBZ0IsS0FBSyxXQUFXLEVBQUU7Z0JBQ3hELE9BQU8sZ0JBQWdCLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLFdBQVcsQ0FBQyxDQUFDO2FBQ2xFO2lCQUFNO2dCQUNMLE9BQU8sS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7YUFDckM7UUFDSCxDQUFDLENBQUM7UUFFRixpQkFBVSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEdBQUc7WUFDOUIsSUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUNqQyxJQUFNLGdCQUFnQixHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7WUFFcEMsOENBQThDO1lBQzlDLGlEQUFpRDtZQUNqRCxJQUFJLGdCQUFnQixJQUFJLGdCQUFnQixLQUFLLFdBQVcsRUFBRTtnQkFDeEQsT0FBTyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsY0FBYyxDQUFDLENBQUM7YUFDeEU7aUJBQU07Z0JBQ0wsT0FBTyxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQzthQUN4QztRQUNILENBQUMsQ0FBQztJQUNKLENBQUMsQ0FBQztJQUVGLGVBQWUsRUFBRSxDQUFDO0lBQ2xCLGlCQUFpQixFQUFFLENBQUM7SUFDcEIsZUFBZSxFQUFFLENBQUM7QUFDcEIsQ0FBQyxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7T2JzZXJ2YWJsZSwgU3Vic2NyaWJlciwgU3Vic2NyaXB0aW9ufSBmcm9tICdyeGpzJztcblxuKFpvbmUgYXMgYW55KS5fX2xvYWRfcGF0Y2goJ3J4anMnLCAoZ2xvYmFsOiBhbnksIFpvbmU6IFpvbmVUeXBlLCBhcGk6IF9ab25lUHJpdmF0ZSkgPT4ge1xuICBjb25zdCBzeW1ib2w6IChzeW1ib2xTdHJpbmc6IHN0cmluZykgPT4gc3RyaW5nID0gKFpvbmUgYXMgYW55KS5fX3N5bWJvbF9fO1xuICBjb25zdCBuZXh0U291cmNlID0gJ3J4anMuU3Vic2NyaWJlci5uZXh0JztcbiAgY29uc3QgZXJyb3JTb3VyY2UgPSAncnhqcy5TdWJzY3JpYmVyLmVycm9yJztcbiAgY29uc3QgY29tcGxldGVTb3VyY2UgPSAncnhqcy5TdWJzY3JpYmVyLmNvbXBsZXRlJztcblxuICBjb25zdCBPYmplY3REZWZpbmVQcm9wZXJ0aWVzID0gT2JqZWN0LmRlZmluZVByb3BlcnRpZXM7XG5cbiAgY29uc3QgcGF0Y2hPYnNlcnZhYmxlID0gZnVuY3Rpb24oKSB7XG4gICAgY29uc3QgT2JzZXJ2YWJsZVByb3RvdHlwZTogYW55ID0gT2JzZXJ2YWJsZS5wcm90b3R5cGU7XG4gICAgY29uc3QgX3N5bWJvbFN1YnNjcmliZSA9IHN5bWJvbCgnX3N1YnNjcmliZScpO1xuICAgIGNvbnN0IF9zdWJzY3JpYmUgPSBPYnNlcnZhYmxlUHJvdG90eXBlW19zeW1ib2xTdWJzY3JpYmVdID0gT2JzZXJ2YWJsZVByb3RvdHlwZS5fc3Vic2NyaWJlO1xuXG4gICAgT2JqZWN0RGVmaW5lUHJvcGVydGllcyhPYnNlcnZhYmxlLnByb3RvdHlwZSwge1xuICAgICAgX3pvbmU6IHt2YWx1ZTogbnVsbCwgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZX0sXG4gICAgICBfem9uZVNvdXJjZToge3ZhbHVlOiBudWxsLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlfSxcbiAgICAgIF96b25lU3Vic2NyaWJlOiB7dmFsdWU6IG51bGwsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWV9LFxuICAgICAgc291cmNlOiB7XG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgZ2V0OiBmdW5jdGlvbih0aGlzOiBPYnNlcnZhYmxlPGFueT4pIHtcbiAgICAgICAgICByZXR1cm4gKHRoaXMgYXMgYW55KS5fem9uZVNvdXJjZTtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0OiBmdW5jdGlvbih0aGlzOiBPYnNlcnZhYmxlPGFueT4sIHNvdXJjZTogYW55KSB7XG4gICAgICAgICAgKHRoaXMgYXMgYW55KS5fem9uZSA9IFpvbmUuY3VycmVudDtcbiAgICAgICAgICAodGhpcyBhcyBhbnkpLl96b25lU291cmNlID0gc291cmNlO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgX3N1YnNjcmliZToge1xuICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgIGdldDogZnVuY3Rpb24odGhpczogT2JzZXJ2YWJsZTxhbnk+KSB7XG4gICAgICAgICAgaWYgKCh0aGlzIGFzIGFueSkuX3pvbmVTdWJzY3JpYmUpIHtcbiAgICAgICAgICAgIHJldHVybiAodGhpcyBhcyBhbnkpLl96b25lU3Vic2NyaWJlO1xuICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5jb25zdHJ1Y3RvciA9PT0gT2JzZXJ2YWJsZSkge1xuICAgICAgICAgICAgcmV0dXJuIF9zdWJzY3JpYmU7XG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnN0IHByb3RvID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKHRoaXMpO1xuICAgICAgICAgIHJldHVybiBwcm90byAmJiBwcm90by5fc3Vic2NyaWJlO1xuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uKHRoaXM6IE9ic2VydmFibGU8YW55Piwgc3Vic2NyaWJlOiBhbnkpIHtcbiAgICAgICAgICAodGhpcyBhcyBhbnkpLl96b25lID0gWm9uZS5jdXJyZW50O1xuICAgICAgICAgICh0aGlzIGFzIGFueSkuX3pvbmVTdWJzY3JpYmUgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl96b25lICYmIHRoaXMuX3pvbmUgIT09IFpvbmUuY3VycmVudCkge1xuICAgICAgICAgICAgICBjb25zdCB0ZWFyRG93biA9IHRoaXMuX3pvbmUucnVuKHN1YnNjcmliZSwgdGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgICAgICAgaWYgKHRlYXJEb3duICYmIHR5cGVvZiB0ZWFyRG93biA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHpvbmUgPSB0aGlzLl96b25lO1xuICAgICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgIGlmICh6b25lICE9PSBab25lLmN1cnJlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHpvbmUucnVuKHRlYXJEb3duLCB0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgcmV0dXJuIHRlYXJEb3duLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICByZXR1cm4gdGVhckRvd247XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gc3Vic2NyaWJlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHN1YmplY3RGYWN0b3J5OiB7XG4gICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuICh0aGlzIGFzIGFueSkuX3pvbmVTdWJqZWN0RmFjdG9yeTtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0OiBmdW5jdGlvbihmYWN0b3J5OiBhbnkpIHtcbiAgICAgICAgICBjb25zdCB6b25lID0gdGhpcy5fem9uZTtcbiAgICAgICAgICB0aGlzLl96b25lU3ViamVjdEZhY3RvcnkgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmICh6b25lICYmIHpvbmUgIT09IFpvbmUuY3VycmVudCkge1xuICAgICAgICAgICAgICByZXR1cm4gem9uZS5ydW4oZmFjdG9yeSwgdGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBmYWN0b3J5LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9O1xuXG4gIGFwaS5wYXRjaE1ldGhvZChPYnNlcnZhYmxlLnByb3RvdHlwZSwgJ2xpZnQnLCAoZGVsZWdhdGU6IGFueSkgPT4gKHNlbGY6IGFueSwgYXJnczogYW55W10pID0+IHtcbiAgICBjb25zdCBvYnNlcnZhYmxlOiBhbnkgPSBkZWxlZ2F0ZS5hcHBseShzZWxmLCBhcmdzKTtcbiAgICBpZiAob2JzZXJ2YWJsZS5vcGVyYXRvcikge1xuICAgICAgb2JzZXJ2YWJsZS5vcGVyYXRvci5fem9uZSA9IFpvbmUuY3VycmVudDtcbiAgICAgIGFwaS5wYXRjaE1ldGhvZChcbiAgICAgICAgICBvYnNlcnZhYmxlLm9wZXJhdG9yLCAnY2FsbCcsXG4gICAgICAgICAgKG9wZXJhdG9yRGVsZWdhdGU6IGFueSkgPT4gKG9wZXJhdG9yU2VsZjogYW55LCBvcGVyYXRvckFyZ3M6IGFueVtdKSA9PiB7XG4gICAgICAgICAgICBpZiAob3BlcmF0b3JTZWxmLl96b25lICYmIG9wZXJhdG9yU2VsZi5fem9uZSAhPT0gWm9uZS5jdXJyZW50KSB7XG4gICAgICAgICAgICAgIHJldHVybiBvcGVyYXRvclNlbGYuX3pvbmUucnVuKG9wZXJhdG9yRGVsZWdhdGUsIG9wZXJhdG9yU2VsZiwgb3BlcmF0b3JBcmdzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBvcGVyYXRvckRlbGVnYXRlLmFwcGx5KG9wZXJhdG9yU2VsZiwgb3BlcmF0b3JBcmdzKTtcbiAgICAgICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIG9ic2VydmFibGU7XG4gIH0pO1xuXG4gIGNvbnN0IHBhdGNoU3Vic2NyaXB0aW9uID0gZnVuY3Rpb24oKSB7XG4gICAgT2JqZWN0RGVmaW5lUHJvcGVydGllcyhTdWJzY3JpcHRpb24ucHJvdG90eXBlLCB7XG4gICAgICBfem9uZToge3ZhbHVlOiBudWxsLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlfSxcbiAgICAgIF96b25lVW5zdWJzY3JpYmU6IHt2YWx1ZTogbnVsbCwgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZX0sXG4gICAgICBfdW5zdWJzY3JpYmU6IHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbih0aGlzOiBTdWJzY3JpcHRpb24pIHtcbiAgICAgICAgICBpZiAoKHRoaXMgYXMgYW55KS5fem9uZVVuc3Vic2NyaWJlKSB7XG4gICAgICAgICAgICByZXR1cm4gKHRoaXMgYXMgYW55KS5fem9uZVVuc3Vic2NyaWJlO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjb25zdCBwcm90byA9IE9iamVjdC5nZXRQcm90b3R5cGVPZih0aGlzKTtcbiAgICAgICAgICByZXR1cm4gcHJvdG8gJiYgcHJvdG8uX3Vuc3Vic2NyaWJlO1xuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uKHRoaXM6IFN1YnNjcmlwdGlvbiwgdW5zdWJzY3JpYmU6IGFueSkge1xuICAgICAgICAgICh0aGlzIGFzIGFueSkuX3pvbmUgPSBab25lLmN1cnJlbnQ7XG4gICAgICAgICAgKHRoaXMgYXMgYW55KS5fem9uZVVuc3Vic2NyaWJlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fem9uZSAmJiB0aGlzLl96b25lICE9PSBab25lLmN1cnJlbnQpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3pvbmUucnVuKHVuc3Vic2NyaWJlLCB0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHVuc3Vic2NyaWJlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9O1xuXG4gIGNvbnN0IHBhdGNoU3Vic2NyaWJlciA9IGZ1bmN0aW9uKCkge1xuICAgIGNvbnN0IG5leHQgPSBTdWJzY3JpYmVyLnByb3RvdHlwZS5uZXh0O1xuICAgIGNvbnN0IGVycm9yID0gU3Vic2NyaWJlci5wcm90b3R5cGUuZXJyb3I7XG4gICAgY29uc3QgY29tcGxldGUgPSBTdWJzY3JpYmVyLnByb3RvdHlwZS5jb21wbGV0ZTtcblxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShTdWJzY3JpYmVyLnByb3RvdHlwZSwgJ2Rlc3RpbmF0aW9uJywge1xuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgZ2V0OiBmdW5jdGlvbih0aGlzOiBTdWJzY3JpYmVyPGFueT4pIHtcbiAgICAgICAgcmV0dXJuICh0aGlzIGFzIGFueSkuX3pvbmVEZXN0aW5hdGlvbjtcbiAgICAgIH0sXG4gICAgICBzZXQ6IGZ1bmN0aW9uKHRoaXM6IFN1YnNjcmliZXI8YW55PiwgZGVzdGluYXRpb246IGFueSkge1xuICAgICAgICAodGhpcyBhcyBhbnkpLl96b25lID0gWm9uZS5jdXJyZW50O1xuICAgICAgICAodGhpcyBhcyBhbnkpLl96b25lRGVzdGluYXRpb24gPSBkZXN0aW5hdGlvbjtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIHBhdGNoIFN1YnNjcmliZXIubmV4dCB0byBtYWtlIHN1cmUgaXQgcnVuXG4gICAgLy8gaW50byBTdWJzY3JpcHRpb25ab25lXG4gICAgU3Vic2NyaWJlci5wcm90b3R5cGUubmV4dCA9IGZ1bmN0aW9uKCkge1xuICAgICAgY29uc3QgY3VycmVudFpvbmUgPSBab25lLmN1cnJlbnQ7XG4gICAgICBjb25zdCBzdWJzY3JpcHRpb25ab25lID0gdGhpcy5fem9uZTtcblxuICAgICAgLy8gZm9yIHBlcmZvcm1hbmNlIGNvbmNlcm4sIGNoZWNrIFpvbmUuY3VycmVudFxuICAgICAgLy8gZXF1YWwgd2l0aCB0aGlzLl96b25lKFN1YnNjcmlwdGlvblpvbmUpIG9yIG5vdFxuICAgICAgaWYgKHN1YnNjcmlwdGlvblpvbmUgJiYgc3Vic2NyaXB0aW9uWm9uZSAhPT0gY3VycmVudFpvbmUpIHtcbiAgICAgICAgcmV0dXJuIHN1YnNjcmlwdGlvblpvbmUucnVuKG5leHQsIHRoaXMsIGFyZ3VtZW50cywgbmV4dFNvdXJjZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gbmV4dC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBTdWJzY3JpYmVyLnByb3RvdHlwZS5lcnJvciA9IGZ1bmN0aW9uKCkge1xuICAgICAgY29uc3QgY3VycmVudFpvbmUgPSBab25lLmN1cnJlbnQ7XG4gICAgICBjb25zdCBzdWJzY3JpcHRpb25ab25lID0gdGhpcy5fem9uZTtcblxuICAgICAgLy8gZm9yIHBlcmZvcm1hbmNlIGNvbmNlcm4sIGNoZWNrIFpvbmUuY3VycmVudFxuICAgICAgLy8gZXF1YWwgd2l0aCB0aGlzLl96b25lKFN1YnNjcmlwdGlvblpvbmUpIG9yIG5vdFxuICAgICAgaWYgKHN1YnNjcmlwdGlvblpvbmUgJiYgc3Vic2NyaXB0aW9uWm9uZSAhPT0gY3VycmVudFpvbmUpIHtcbiAgICAgICAgcmV0dXJuIHN1YnNjcmlwdGlvblpvbmUucnVuKGVycm9yLCB0aGlzLCBhcmd1bWVudHMsIGVycm9yU291cmNlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBlcnJvci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBTdWJzY3JpYmVyLnByb3RvdHlwZS5jb21wbGV0ZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgY29uc3QgY3VycmVudFpvbmUgPSBab25lLmN1cnJlbnQ7XG4gICAgICBjb25zdCBzdWJzY3JpcHRpb25ab25lID0gdGhpcy5fem9uZTtcblxuICAgICAgLy8gZm9yIHBlcmZvcm1hbmNlIGNvbmNlcm4sIGNoZWNrIFpvbmUuY3VycmVudFxuICAgICAgLy8gZXF1YWwgd2l0aCB0aGlzLl96b25lKFN1YnNjcmlwdGlvblpvbmUpIG9yIG5vdFxuICAgICAgaWYgKHN1YnNjcmlwdGlvblpvbmUgJiYgc3Vic2NyaXB0aW9uWm9uZSAhPT0gY3VycmVudFpvbmUpIHtcbiAgICAgICAgcmV0dXJuIHN1YnNjcmlwdGlvblpvbmUucnVuKGNvbXBsZXRlLCB0aGlzLCBhcmd1bWVudHMsIGNvbXBsZXRlU291cmNlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBjb21wbGV0ZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfVxuICAgIH07XG4gIH07XG5cbiAgcGF0Y2hPYnNlcnZhYmxlKCk7XG4gIHBhdGNoU3Vic2NyaXB0aW9uKCk7XG4gIHBhdGNoU3Vic2NyaWJlcigpO1xufSk7XG4iXX0=