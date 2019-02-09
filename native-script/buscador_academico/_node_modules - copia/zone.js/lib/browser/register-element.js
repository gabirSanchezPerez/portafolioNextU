"use strict";
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../common/utils");
var define_property_1 = require("./define-property");
function patchCallbacks(target, targetName, method, callbacks) {
    var symbol = Zone.__symbol__(method);
    if (target[symbol]) {
        return;
    }
    var nativeDelegate = target[symbol] = target[method];
    target[method] = function (name, opts, options) {
        if (opts && opts.prototype) {
            callbacks.forEach(function (callback) {
                var source = targetName + "." + method + "::" + callback;
                var prototype = opts.prototype;
                if (prototype.hasOwnProperty(callback)) {
                    var descriptor = utils_1.ObjectGetOwnPropertyDescriptor(prototype, callback);
                    if (descriptor && descriptor.value) {
                        descriptor.value = utils_1.wrapWithCurrentZone(descriptor.value, source);
                        define_property_1._redefineProperty(opts.prototype, callback, descriptor);
                    }
                    else if (prototype[callback]) {
                        prototype[callback] = utils_1.wrapWithCurrentZone(prototype[callback], source);
                    }
                }
                else if (prototype[callback]) {
                    prototype[callback] = utils_1.wrapWithCurrentZone(prototype[callback], source);
                }
            });
        }
        return nativeDelegate.call(target, name, opts, options);
    };
    utils_1.attachOriginToPatched(target[method], nativeDelegate);
}
function registerElementPatch(_global) {
    if ((!utils_1.isBrowser && !utils_1.isMix) || !('registerElement' in _global.document)) {
        return;
    }
    var callbacks = ['createdCallback', 'attachedCallback', 'detachedCallback', 'attributeChangedCallback'];
    patchCallbacks(document, 'Document', 'registerElement', callbacks);
}
exports.registerElementPatch = registerElementPatch;
function patchCustomElements(_global) {
    if ((!utils_1.isBrowser && !utils_1.isMix) || !('customElements' in _global)) {
        return;
    }
    var callbacks = ['connectedCallback', 'disconnectedCallback', 'adoptedCallback', 'attributeChangedCallback'];
    patchCallbacks(_global.customElements, 'customElements', 'define', callbacks);
}
exports.patchCustomElements = patchCustomElements;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnaXN0ZXItZWxlbWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInJlZ2lzdGVyLWVsZW1lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7R0FNRzs7QUFFSCx5Q0FBNkg7QUFFN0gscURBQW9EO0FBRXBELFNBQVMsY0FBYyxDQUFDLE1BQVcsRUFBRSxVQUFrQixFQUFFLE1BQWMsRUFBRSxTQUFtQjtJQUMxRixJQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3ZDLElBQUksTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFO1FBQ2xCLE9BQU87S0FDUjtJQUNELElBQU0sY0FBYyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDdkQsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLFVBQVMsSUFBUyxFQUFFLElBQVMsRUFBRSxPQUFhO1FBQzNELElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDMUIsU0FBUyxDQUFDLE9BQU8sQ0FBQyxVQUFTLFFBQVE7Z0JBQ2pDLElBQU0sTUFBTSxHQUFNLFVBQVUsU0FBSSxNQUFNLE9BQUksR0FBRyxRQUFRLENBQUM7Z0JBQ3RELElBQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7Z0JBQ2pDLElBQUksU0FBUyxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsRUFBRTtvQkFDdEMsSUFBTSxVQUFVLEdBQUcsc0NBQThCLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBQyxDQUFDO29CQUN2RSxJQUFJLFVBQVUsSUFBSSxVQUFVLENBQUMsS0FBSyxFQUFFO3dCQUNsQyxVQUFVLENBQUMsS0FBSyxHQUFHLDJCQUFtQixDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7d0JBQ2pFLG1DQUFpQixDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsUUFBUSxFQUFFLFVBQVUsQ0FBQyxDQUFDO3FCQUN6RDt5QkFBTSxJQUFJLFNBQVMsQ0FBQyxRQUFRLENBQUMsRUFBRTt3QkFDOUIsU0FBUyxDQUFDLFFBQVEsQ0FBQyxHQUFHLDJCQUFtQixDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQztxQkFDeEU7aUJBQ0Y7cUJBQU0sSUFBSSxTQUFTLENBQUMsUUFBUSxDQUFDLEVBQUU7b0JBQzlCLFNBQVMsQ0FBQyxRQUFRLENBQUMsR0FBRywyQkFBbUIsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUM7aUJBQ3hFO1lBQ0gsQ0FBQyxDQUFDLENBQUM7U0FDSjtRQUVELE9BQU8sY0FBYyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztJQUMxRCxDQUFDLENBQUM7SUFFRiw2QkFBcUIsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsY0FBYyxDQUFDLENBQUM7QUFDeEQsQ0FBQztBQUVELFNBQWdCLG9CQUFvQixDQUFDLE9BQVk7SUFDL0MsSUFBSSxDQUFDLENBQUMsaUJBQVMsSUFBSSxDQUFDLGFBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxpQkFBaUIsSUFBVSxPQUFRLENBQUMsUUFBUSxDQUFDLEVBQUU7UUFDN0UsT0FBTztLQUNSO0lBRUQsSUFBTSxTQUFTLEdBQ1gsQ0FBQyxpQkFBaUIsRUFBRSxrQkFBa0IsRUFBRSxrQkFBa0IsRUFBRSwwQkFBMEIsQ0FBQyxDQUFDO0lBRTVGLGNBQWMsQ0FBQyxRQUFRLEVBQUUsVUFBVSxFQUFFLGlCQUFpQixFQUFFLFNBQVMsQ0FBQyxDQUFDO0FBQ3JFLENBQUM7QUFURCxvREFTQztBQUVELFNBQWdCLG1CQUFtQixDQUFDLE9BQVk7SUFDOUMsSUFBSSxDQUFDLENBQUMsaUJBQVMsSUFBSSxDQUFDLGFBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxnQkFBZ0IsSUFBSSxPQUFPLENBQUMsRUFBRTtRQUM1RCxPQUFPO0tBQ1I7SUFFRCxJQUFNLFNBQVMsR0FDWCxDQUFDLG1CQUFtQixFQUFFLHNCQUFzQixFQUFFLGlCQUFpQixFQUFFLDBCQUEwQixDQUFDLENBQUM7SUFFakcsY0FBYyxDQUFDLE9BQU8sQ0FBQyxjQUFjLEVBQUUsZ0JBQWdCLEVBQUUsUUFBUSxFQUFFLFNBQVMsQ0FBQyxDQUFDO0FBQ2hGLENBQUM7QUFURCxrREFTQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHthdHRhY2hPcmlnaW5Ub1BhdGNoZWQsIGlzQnJvd3NlciwgaXNNaXgsIE9iamVjdEdldE93blByb3BlcnR5RGVzY3JpcHRvciwgd3JhcFdpdGhDdXJyZW50Wm9uZX0gZnJvbSAnLi4vY29tbW9uL3V0aWxzJztcblxuaW1wb3J0IHtfcmVkZWZpbmVQcm9wZXJ0eX0gZnJvbSAnLi9kZWZpbmUtcHJvcGVydHknO1xuXG5mdW5jdGlvbiBwYXRjaENhbGxiYWNrcyh0YXJnZXQ6IGFueSwgdGFyZ2V0TmFtZTogc3RyaW5nLCBtZXRob2Q6IHN0cmluZywgY2FsbGJhY2tzOiBzdHJpbmdbXSkge1xuICBjb25zdCBzeW1ib2wgPSBab25lLl9fc3ltYm9sX18obWV0aG9kKTtcbiAgaWYgKHRhcmdldFtzeW1ib2xdKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGNvbnN0IG5hdGl2ZURlbGVnYXRlID0gdGFyZ2V0W3N5bWJvbF0gPSB0YXJnZXRbbWV0aG9kXTtcbiAgdGFyZ2V0W21ldGhvZF0gPSBmdW5jdGlvbihuYW1lOiBhbnksIG9wdHM6IGFueSwgb3B0aW9ucz86IGFueSkge1xuICAgIGlmIChvcHRzICYmIG9wdHMucHJvdG90eXBlKSB7XG4gICAgICBjYWxsYmFja3MuZm9yRWFjaChmdW5jdGlvbihjYWxsYmFjaykge1xuICAgICAgICBjb25zdCBzb3VyY2UgPSBgJHt0YXJnZXROYW1lfS4ke21ldGhvZH06OmAgKyBjYWxsYmFjaztcbiAgICAgICAgY29uc3QgcHJvdG90eXBlID0gb3B0cy5wcm90b3R5cGU7XG4gICAgICAgIGlmIChwcm90b3R5cGUuaGFzT3duUHJvcGVydHkoY2FsbGJhY2spKSB7XG4gICAgICAgICAgY29uc3QgZGVzY3JpcHRvciA9IE9iamVjdEdldE93blByb3BlcnR5RGVzY3JpcHRvcihwcm90b3R5cGUsIGNhbGxiYWNrKTtcbiAgICAgICAgICBpZiAoZGVzY3JpcHRvciAmJiBkZXNjcmlwdG9yLnZhbHVlKSB7XG4gICAgICAgICAgICBkZXNjcmlwdG9yLnZhbHVlID0gd3JhcFdpdGhDdXJyZW50Wm9uZShkZXNjcmlwdG9yLnZhbHVlLCBzb3VyY2UpO1xuICAgICAgICAgICAgX3JlZGVmaW5lUHJvcGVydHkob3B0cy5wcm90b3R5cGUsIGNhbGxiYWNrLCBkZXNjcmlwdG9yKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHByb3RvdHlwZVtjYWxsYmFja10pIHtcbiAgICAgICAgICAgIHByb3RvdHlwZVtjYWxsYmFja10gPSB3cmFwV2l0aEN1cnJlbnRab25lKHByb3RvdHlwZVtjYWxsYmFja10sIHNvdXJjZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHByb3RvdHlwZVtjYWxsYmFja10pIHtcbiAgICAgICAgICBwcm90b3R5cGVbY2FsbGJhY2tdID0gd3JhcFdpdGhDdXJyZW50Wm9uZShwcm90b3R5cGVbY2FsbGJhY2tdLCBzb3VyY2UpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmF0aXZlRGVsZWdhdGUuY2FsbCh0YXJnZXQsIG5hbWUsIG9wdHMsIG9wdGlvbnMpO1xuICB9O1xuXG4gIGF0dGFjaE9yaWdpblRvUGF0Y2hlZCh0YXJnZXRbbWV0aG9kXSwgbmF0aXZlRGVsZWdhdGUpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVnaXN0ZXJFbGVtZW50UGF0Y2goX2dsb2JhbDogYW55KSB7XG4gIGlmICgoIWlzQnJvd3NlciAmJiAhaXNNaXgpIHx8ICEoJ3JlZ2lzdGVyRWxlbWVudCcgaW4gKDxhbnk+X2dsb2JhbCkuZG9jdW1lbnQpKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3QgY2FsbGJhY2tzID1cbiAgICAgIFsnY3JlYXRlZENhbGxiYWNrJywgJ2F0dGFjaGVkQ2FsbGJhY2snLCAnZGV0YWNoZWRDYWxsYmFjaycsICdhdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2snXTtcblxuICBwYXRjaENhbGxiYWNrcyhkb2N1bWVudCwgJ0RvY3VtZW50JywgJ3JlZ2lzdGVyRWxlbWVudCcsIGNhbGxiYWNrcyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXRjaEN1c3RvbUVsZW1lbnRzKF9nbG9iYWw6IGFueSkge1xuICBpZiAoKCFpc0Jyb3dzZXIgJiYgIWlzTWl4KSB8fCAhKCdjdXN0b21FbGVtZW50cycgaW4gX2dsb2JhbCkpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCBjYWxsYmFja3MgPVxuICAgICAgWydjb25uZWN0ZWRDYWxsYmFjaycsICdkaXNjb25uZWN0ZWRDYWxsYmFjaycsICdhZG9wdGVkQ2FsbGJhY2snLCAnYXR0cmlidXRlQ2hhbmdlZENhbGxiYWNrJ107XG5cbiAgcGF0Y2hDYWxsYmFja3MoX2dsb2JhbC5jdXN0b21FbGVtZW50cywgJ2N1c3RvbUVsZW1lbnRzJywgJ2RlZmluZScsIGNhbGxiYWNrcyk7XG59XG4iXX0=