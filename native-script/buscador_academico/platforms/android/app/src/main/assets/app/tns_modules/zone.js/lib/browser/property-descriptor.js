"use strict";
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @fileoverview
 * @suppress {globalThis}
 */
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../common/utils");
var webSocketPatch = require("./websocket");
var globalEventHandlersEventNames = [
    'abort',
    'animationcancel',
    'animationend',
    'animationiteration',
    'auxclick',
    'beforeinput',
    'blur',
    'cancel',
    'canplay',
    'canplaythrough',
    'change',
    'compositionstart',
    'compositionupdate',
    'compositionend',
    'cuechange',
    'click',
    'close',
    'contextmenu',
    'curechange',
    'dblclick',
    'drag',
    'dragend',
    'dragenter',
    'dragexit',
    'dragleave',
    'dragover',
    'drop',
    'durationchange',
    'emptied',
    'ended',
    'error',
    'focus',
    'focusin',
    'focusout',
    'gotpointercapture',
    'input',
    'invalid',
    'keydown',
    'keypress',
    'keyup',
    'load',
    'loadstart',
    'loadeddata',
    'loadedmetadata',
    'lostpointercapture',
    'mousedown',
    'mouseenter',
    'mouseleave',
    'mousemove',
    'mouseout',
    'mouseover',
    'mouseup',
    'mousewheel',
    'orientationchange',
    'pause',
    'play',
    'playing',
    'pointercancel',
    'pointerdown',
    'pointerenter',
    'pointerleave',
    'pointerlockchange',
    'mozpointerlockchange',
    'webkitpointerlockerchange',
    'pointerlockerror',
    'mozpointerlockerror',
    'webkitpointerlockerror',
    'pointermove',
    'pointout',
    'pointerover',
    'pointerup',
    'progress',
    'ratechange',
    'reset',
    'resize',
    'scroll',
    'seeked',
    'seeking',
    'select',
    'selectionchange',
    'selectstart',
    'show',
    'sort',
    'stalled',
    'submit',
    'suspend',
    'timeupdate',
    'volumechange',
    'touchcancel',
    'touchmove',
    'touchstart',
    'touchend',
    'transitioncancel',
    'transitionend',
    'waiting',
    'wheel'
];
var documentEventNames = [
    'afterscriptexecute', 'beforescriptexecute', 'DOMContentLoaded', 'freeze', 'fullscreenchange',
    'mozfullscreenchange', 'webkitfullscreenchange', 'msfullscreenchange', 'fullscreenerror',
    'mozfullscreenerror', 'webkitfullscreenerror', 'msfullscreenerror', 'readystatechange',
    'visibilitychange', 'resume'
];
var windowEventNames = [
    'absolutedeviceorientation',
    'afterinput',
    'afterprint',
    'appinstalled',
    'beforeinstallprompt',
    'beforeprint',
    'beforeunload',
    'devicelight',
    'devicemotion',
    'deviceorientation',
    'deviceorientationabsolute',
    'deviceproximity',
    'hashchange',
    'languagechange',
    'message',
    'mozbeforepaint',
    'offline',
    'online',
    'paint',
    'pageshow',
    'pagehide',
    'popstate',
    'rejectionhandled',
    'storage',
    'unhandledrejection',
    'unload',
    'userproximity',
    'vrdisplyconnected',
    'vrdisplaydisconnected',
    'vrdisplaypresentchange'
];
var htmlElementEventNames = [
    'beforecopy', 'beforecut', 'beforepaste', 'copy', 'cut', 'paste', 'dragstart', 'loadend',
    'animationstart', 'search', 'transitionrun', 'transitionstart', 'webkitanimationend',
    'webkitanimationiteration', 'webkitanimationstart', 'webkittransitionend'
];
var mediaElementEventNames = ['encrypted', 'waitingforkey', 'msneedkey', 'mozinterruptbegin', 'mozinterruptend'];
var ieElementEventNames = [
    'activate',
    'afterupdate',
    'ariarequest',
    'beforeactivate',
    'beforedeactivate',
    'beforeeditfocus',
    'beforeupdate',
    'cellchange',
    'controlselect',
    'dataavailable',
    'datasetchanged',
    'datasetcomplete',
    'errorupdate',
    'filterchange',
    'layoutcomplete',
    'losecapture',
    'move',
    'moveend',
    'movestart',
    'propertychange',
    'resizeend',
    'resizestart',
    'rowenter',
    'rowexit',
    'rowsdelete',
    'rowsinserted',
    'command',
    'compassneedscalibration',
    'deactivate',
    'help',
    'mscontentzoom',
    'msmanipulationstatechanged',
    'msgesturechange',
    'msgesturedoubletap',
    'msgestureend',
    'msgesturehold',
    'msgesturestart',
    'msgesturetap',
    'msgotpointercapture',
    'msinertiastart',
    'mslostpointercapture',
    'mspointercancel',
    'mspointerdown',
    'mspointerenter',
    'mspointerhover',
    'mspointerleave',
    'mspointermove',
    'mspointerout',
    'mspointerover',
    'mspointerup',
    'pointerout',
    'mssitemodejumplistitemremoved',
    'msthumbnailclick',
    'stop',
    'storagecommit'
];
var webglEventNames = ['webglcontextrestored', 'webglcontextlost', 'webglcontextcreationerror'];
var formEventNames = ['autocomplete', 'autocompleteerror'];
var detailEventNames = ['toggle'];
var frameEventNames = ['load'];
var frameSetEventNames = ['blur', 'error', 'focus', 'load', 'resize', 'scroll', 'messageerror'];
var marqueeEventNames = ['bounce', 'finish', 'start'];
var XMLHttpRequestEventNames = [
    'loadstart', 'progress', 'abort', 'error', 'load', 'progress', 'timeout', 'loadend',
    'readystatechange'
];
var IDBIndexEventNames = ['upgradeneeded', 'complete', 'abort', 'success', 'error', 'blocked', 'versionchange', 'close'];
var websocketEventNames = ['close', 'error', 'open', 'message'];
var workerEventNames = ['error', 'message'];
exports.eventNames = globalEventHandlersEventNames.concat(webglEventNames, formEventNames, detailEventNames, documentEventNames, windowEventNames, htmlElementEventNames, ieElementEventNames);
function filterProperties(target, onProperties, ignoreProperties) {
    if (!ignoreProperties || ignoreProperties.length === 0) {
        return onProperties;
    }
    var tip = ignoreProperties.filter(function (ip) { return ip.target === target; });
    if (!tip || tip.length === 0) {
        return onProperties;
    }
    var targetIgnoreProperties = tip[0].ignoreProperties;
    return onProperties.filter(function (op) { return targetIgnoreProperties.indexOf(op) === -1; });
}
function patchFilteredProperties(target, onProperties, ignoreProperties, prototype) {
    // check whether target is available, sometimes target will be undefined
    // because different browser or some 3rd party plugin.
    if (!target) {
        return;
    }
    var filteredProperties = filterProperties(target, onProperties, ignoreProperties);
    utils_1.patchOnProperties(target, filteredProperties, prototype);
}
exports.patchFilteredProperties = patchFilteredProperties;
function propertyDescriptorPatch(api, _global) {
    if (utils_1.isNode && !utils_1.isMix) {
        return;
    }
    var supportsWebSocket = typeof WebSocket !== 'undefined';
    if (canPatchViaPropertyDescriptor()) {
        var ignoreProperties = _global['__Zone_ignore_on_properties'];
        // for browsers that we can patch the descriptor:  Chrome & Firefox
        if (utils_1.isBrowser) {
            var internalWindow = window;
            var ignoreErrorProperties = utils_1.isIE ? [{ target: internalWindow, ignoreProperties: ['error'] }] : [];
            // in IE/Edge, onProp not exist in window object, but in WindowPrototype
            // so we need to pass WindowPrototype to check onProp exist or not
            patchFilteredProperties(internalWindow, exports.eventNames.concat(['messageerror']), ignoreProperties ? ignoreProperties.concat(ignoreErrorProperties) : ignoreProperties, utils_1.ObjectGetPrototypeOf(internalWindow));
            patchFilteredProperties(Document.prototype, exports.eventNames, ignoreProperties);
            if (typeof internalWindow['SVGElement'] !== 'undefined') {
                patchFilteredProperties(internalWindow['SVGElement'].prototype, exports.eventNames, ignoreProperties);
            }
            patchFilteredProperties(Element.prototype, exports.eventNames, ignoreProperties);
            patchFilteredProperties(HTMLElement.prototype, exports.eventNames, ignoreProperties);
            patchFilteredProperties(HTMLMediaElement.prototype, mediaElementEventNames, ignoreProperties);
            patchFilteredProperties(HTMLFrameSetElement.prototype, windowEventNames.concat(frameSetEventNames), ignoreProperties);
            patchFilteredProperties(HTMLBodyElement.prototype, windowEventNames.concat(frameSetEventNames), ignoreProperties);
            patchFilteredProperties(HTMLFrameElement.prototype, frameEventNames, ignoreProperties);
            patchFilteredProperties(HTMLIFrameElement.prototype, frameEventNames, ignoreProperties);
            var HTMLMarqueeElement_1 = internalWindow['HTMLMarqueeElement'];
            if (HTMLMarqueeElement_1) {
                patchFilteredProperties(HTMLMarqueeElement_1.prototype, marqueeEventNames, ignoreProperties);
            }
            var Worker_1 = internalWindow['Worker'];
            if (Worker_1) {
                patchFilteredProperties(Worker_1.prototype, workerEventNames, ignoreProperties);
            }
        }
        patchFilteredProperties(XMLHttpRequest.prototype, XMLHttpRequestEventNames, ignoreProperties);
        var XMLHttpRequestEventTarget_1 = _global['XMLHttpRequestEventTarget'];
        if (XMLHttpRequestEventTarget_1) {
            patchFilteredProperties(XMLHttpRequestEventTarget_1 && XMLHttpRequestEventTarget_1.prototype, XMLHttpRequestEventNames, ignoreProperties);
        }
        if (typeof IDBIndex !== 'undefined') {
            patchFilteredProperties(IDBIndex.prototype, IDBIndexEventNames, ignoreProperties);
            patchFilteredProperties(IDBRequest.prototype, IDBIndexEventNames, ignoreProperties);
            patchFilteredProperties(IDBOpenDBRequest.prototype, IDBIndexEventNames, ignoreProperties);
            patchFilteredProperties(IDBDatabase.prototype, IDBIndexEventNames, ignoreProperties);
            patchFilteredProperties(IDBTransaction.prototype, IDBIndexEventNames, ignoreProperties);
            patchFilteredProperties(IDBCursor.prototype, IDBIndexEventNames, ignoreProperties);
        }
        if (supportsWebSocket) {
            patchFilteredProperties(WebSocket.prototype, websocketEventNames, ignoreProperties);
        }
    }
    else {
        // Safari, Android browsers (Jelly Bean)
        patchViaCapturingAllTheEvents();
        utils_1.patchClass('XMLHttpRequest');
        if (supportsWebSocket) {
            webSocketPatch.apply(api, _global);
        }
    }
}
exports.propertyDescriptorPatch = propertyDescriptorPatch;
function canPatchViaPropertyDescriptor() {
    if ((utils_1.isBrowser || utils_1.isMix) && !utils_1.ObjectGetOwnPropertyDescriptor(HTMLElement.prototype, 'onclick') &&
        typeof Element !== 'undefined') {
        // WebKit https://bugs.webkit.org/show_bug.cgi?id=134364
        // IDL interface attributes are not configurable
        var desc = utils_1.ObjectGetOwnPropertyDescriptor(Element.prototype, 'onclick');
        if (desc && !desc.configurable)
            return false;
    }
    var ON_READY_STATE_CHANGE = 'onreadystatechange';
    var XMLHttpRequestPrototype = XMLHttpRequest.prototype;
    var xhrDesc = utils_1.ObjectGetOwnPropertyDescriptor(XMLHttpRequestPrototype, ON_READY_STATE_CHANGE);
    // add enumerable and configurable here because in opera
    // by default XMLHttpRequest.prototype.onreadystatechange is undefined
    // without adding enumerable and configurable will cause onreadystatechange
    // non-configurable
    // and if XMLHttpRequest.prototype.onreadystatechange is undefined,
    // we should set a real desc instead a fake one
    if (xhrDesc) {
        utils_1.ObjectDefineProperty(XMLHttpRequestPrototype, ON_READY_STATE_CHANGE, {
            enumerable: true,
            configurable: true,
            get: function () {
                return true;
            }
        });
        var req = new XMLHttpRequest();
        var result = !!req.onreadystatechange;
        // restore original desc
        utils_1.ObjectDefineProperty(XMLHttpRequestPrototype, ON_READY_STATE_CHANGE, xhrDesc || {});
        return result;
    }
    else {
        var SYMBOL_FAKE_ONREADYSTATECHANGE_1 = utils_1.zoneSymbol('fake');
        utils_1.ObjectDefineProperty(XMLHttpRequestPrototype, ON_READY_STATE_CHANGE, {
            enumerable: true,
            configurable: true,
            get: function () {
                return this[SYMBOL_FAKE_ONREADYSTATECHANGE_1];
            },
            set: function (value) {
                this[SYMBOL_FAKE_ONREADYSTATECHANGE_1] = value;
            }
        });
        var req = new XMLHttpRequest();
        var detectFunc = function () { };
        req.onreadystatechange = detectFunc;
        var result = req[SYMBOL_FAKE_ONREADYSTATECHANGE_1] === detectFunc;
        req.onreadystatechange = null;
        return result;
    }
}
var unboundKey = utils_1.zoneSymbol('unbound');
// Whenever any eventListener fires, we check the eventListener target and all parents
// for `onwhatever` properties and replace them with zone-bound functions
// - Chrome (for now)
function patchViaCapturingAllTheEvents() {
    var _loop_1 = function (i) {
        var property = exports.eventNames[i];
        var onproperty = 'on' + property;
        self.addEventListener(property, function (event) {
            var elt = event.target, bound, source;
            if (elt) {
                source = elt.constructor['name'] + '.' + onproperty;
            }
            else {
                source = 'unknown.' + onproperty;
            }
            while (elt) {
                if (elt[onproperty] && !elt[onproperty][unboundKey]) {
                    bound = utils_1.wrapWithCurrentZone(elt[onproperty], source);
                    bound[unboundKey] = elt[onproperty];
                    elt[onproperty] = bound;
                }
                elt = elt.parentElement;
            }
        }, true);
    };
    for (var i = 0; i < exports.eventNames.length; i++) {
        _loop_1(i);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvcGVydHktZGVzY3JpcHRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInByb3BlcnR5LWRlc2NyaXB0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7R0FNRztBQUNIOzs7R0FHRzs7QUFFSCx5Q0FBMk07QUFFM00sNENBQThDO0FBRTlDLElBQU0sNkJBQTZCLEdBQUc7SUFDcEMsT0FBTztJQUNQLGlCQUFpQjtJQUNqQixjQUFjO0lBQ2Qsb0JBQW9CO0lBQ3BCLFVBQVU7SUFDVixhQUFhO0lBQ2IsTUFBTTtJQUNOLFFBQVE7SUFDUixTQUFTO0lBQ1QsZ0JBQWdCO0lBQ2hCLFFBQVE7SUFDUixrQkFBa0I7SUFDbEIsbUJBQW1CO0lBQ25CLGdCQUFnQjtJQUNoQixXQUFXO0lBQ1gsT0FBTztJQUNQLE9BQU87SUFDUCxhQUFhO0lBQ2IsWUFBWTtJQUNaLFVBQVU7SUFDVixNQUFNO0lBQ04sU0FBUztJQUNULFdBQVc7SUFDWCxVQUFVO0lBQ1YsV0FBVztJQUNYLFVBQVU7SUFDVixNQUFNO0lBQ04sZ0JBQWdCO0lBQ2hCLFNBQVM7SUFDVCxPQUFPO0lBQ1AsT0FBTztJQUNQLE9BQU87SUFDUCxTQUFTO0lBQ1QsVUFBVTtJQUNWLG1CQUFtQjtJQUNuQixPQUFPO0lBQ1AsU0FBUztJQUNULFNBQVM7SUFDVCxVQUFVO0lBQ1YsT0FBTztJQUNQLE1BQU07SUFDTixXQUFXO0lBQ1gsWUFBWTtJQUNaLGdCQUFnQjtJQUNoQixvQkFBb0I7SUFDcEIsV0FBVztJQUNYLFlBQVk7SUFDWixZQUFZO0lBQ1osV0FBVztJQUNYLFVBQVU7SUFDVixXQUFXO0lBQ1gsU0FBUztJQUNULFlBQVk7SUFDWixtQkFBbUI7SUFDbkIsT0FBTztJQUNQLE1BQU07SUFDTixTQUFTO0lBQ1QsZUFBZTtJQUNmLGFBQWE7SUFDYixjQUFjO0lBQ2QsY0FBYztJQUNkLG1CQUFtQjtJQUNuQixzQkFBc0I7SUFDdEIsMkJBQTJCO0lBQzNCLGtCQUFrQjtJQUNsQixx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QUFVLENBQUMsRUFBRTtvQkFDbkQsS0FBSyxHQUFHLDJCQUFtQixDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQztvQkFDckQsS0FBSyxDQUFDLFVBQVUsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztvQkFDcEMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxHQUFHLEtBQUssQ0FBQztpQkFDekI7Z0JBQ0QsR0FBRyxHQUFHLEdBQUcsQ0FBQyxhQUFhLENBQUM7YUFDekI7UUFDSCxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDWCxDQUFDO0lBbkJELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxrQkFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUU7Z0JBQWpDLENBQUM7S0FtQlQ7QUFDSCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuLyoqXG4gKiBAZmlsZW92ZXJ2aWV3XG4gKiBAc3VwcHJlc3Mge2dsb2JhbFRoaXN9XG4gKi9cblxuaW1wb3J0IHtpc0Jyb3dzZXIsIGlzSUUsIGlzTWl4LCBpc05vZGUsIE9iamVjdERlZmluZVByb3BlcnR5LCBPYmplY3RHZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IsIE9iamVjdEdldFByb3RvdHlwZU9mLCBwYXRjaENsYXNzLCBwYXRjaE9uUHJvcGVydGllcywgd3JhcFdpdGhDdXJyZW50Wm9uZSwgem9uZVN5bWJvbH0gZnJvbSAnLi4vY29tbW9uL3V0aWxzJztcblxuaW1wb3J0ICogYXMgd2ViU29ja2V0UGF0Y2ggZnJvbSAnLi93ZWJzb2NrZXQnO1xuXG5jb25zdCBnbG9iYWxFdmVudEhhbmRsZXJzRXZlbnROYW1lcyA9IFtcbiAgJ2Fib3J0JyxcbiAgJ2FuaW1hdGlvbmNhbmNlbCcsXG4gICdhbmltYXRpb25lbmQnLFxuICAnYW5pbWF0aW9uaXRlcmF0aW9uJyxcbiAgJ2F1eGNsaWNrJyxcbiAgJ2JlZm9yZWlucHV0JyxcbiAgJ2JsdXInLFxuICAnY2FuY2VsJyxcbiAgJ2NhbnBsYXknLFxuICAnY2FucGxheXRocm91Z2gnLFxuICAnY2hhbmdlJyxcbiAgJ2NvbXBvc2l0aW9uc3RhcnQnLFxuICAnY29tcG9zaXRpb251cGRhdGUnLFxuICAnY29tcG9zaXRpb25lbmQnLFxuICAnY3VlY2hhbmdlJyxcbiAgJ2NsaWNrJyxcbiAgJ2Nsb3NlJyxcbiAgJ2NvbnRleHRtZW51JyxcbiAgJ2N1cmVjaGFuZ2UnLFxuICAnZGJsY2xpY2snLFxuICAnZHJhZycsXG4gICdkcmFnZW5kJyxcbiAgJ2RyYWdlbnRlcicsXG4gICdkcmFnZXhpdCcsXG4gICdkcmFnbGVhdmUnLFxuICAnZHJhZ292ZXInLFxuICAnZHJvcCcsXG4gICdkdXJhdGlvbmNoYW5nZScsXG4gICdlbXB0aWVkJyxcbiAgJ2VuZGVkJyxcbiAgJ2Vycm9yJyxcbiAgJ2ZvY3VzJyxcbiAgJ2ZvY3VzaW4nLFxuICAnZm9jdXNvdXQnLFxuICAnZ290cG9pbnRlcmNhcHR1cmUnLFxuICAnaW5wdXQnLFxuICAnaW52YWxpZCcsXG4gICdrZXlkb3duJyxcbiAgJ2tleXByZXNzJyxcbiAgJ2tleXVwJyxcbiAgJ2xvYWQnLFxuICAnbG9hZHN0YXJ0JyxcbiAgJ2xvYWRlZGRhdGEnLFxuICAnbG9hZGVkbWV0YWRhdGEnLFxuICAnbG9zdHBvaW50ZXJjYXB0dXJlJyxcbiAgJ21vdXNlZG93bicsXG4gICdtb3VzZWVudGVyJyxcbiAgJ21vdXNlbGVhdmUnLFxuICAnbW91c2Vtb3ZlJyxcbiAgJ21vdXNlb3V0JyxcbiAgJ21vdXNlb3ZlcicsXG4gICdtb3VzZXVwJyxcbiAgJ21vdXNld2hlZWwnLFxuICAnb3JpZW50YXRpb25jaGFuZ2UnLFxuICAncGF1c2UnLFxuICAncGxheScsXG4gICdwbGF5aW5nJyxcbiAgJ3BvaW50ZXJjYW5jZWwnLFxuICAncG9pbnRlcmRvd24nLFxuICAncG9pbnRlcmVudGVyJyxcbiAgJ3BvaW50ZXJsZWF2ZScsXG4gICdwb2ludGVybG9ja2NoYW5nZScsXG4gICdtb3pwb2ludGVybG9ja2NoYW5nZScsXG4gICd3ZWJraXRwb2ludGVybG9ja2VyY2hhbmdlJyxcbiAgJ3BvaW50ZXJsb2NrZXJyb3InLFxuICAnbW96cG9pbnRlcmxvY2tlcnJvcicsXG4gICd3ZWJraXRwb2ludGVybG9ja2Vycm9yJyxcbiAgJ3BvaW50ZXJtb3ZlJyxcbiAgJ3BvaW50b3V0JyxcbiAgJ3BvaW50ZXJvdmVyJyxcbiAgJ3BvaW50ZXJ1cCcsXG4gICdwcm9ncmVzcycsXG4gICdyYXRlY2hhbmdlJyxcbiAgJ3Jlc2V0JyxcbiAgJ3Jlc2l6ZScsXG4gICdzY3JvbGwnLFxuICAnc2Vla2VkJyxcbiAgJ3NlZWtpbmcnLFxuICAnc2VsZWN0JyxcbiAgJ3NlbGVjdGlvbmNoYW5nZScsXG4gICdzZWxlY3RzdGFydCcsXG4gICdzaG93JyxcbiAgJ3NvcnQnLFxuICAnc3RhbGxlZCcsXG4gICdzdWJtaXQnLFxuICAnc3VzcGVuZCcsXG4gICd0aW1ldXBkYXRlJyxcbiAgJ3ZvbHVtZWNoYW5nZScsXG4gICd0b3VjaGNhbmNlbCcsXG4gICd0b3VjaG1vdmUnLFxuICAndG91Y2hzdGFydCcsXG4gICd0b3VjaGVuZCcsXG4gICd0cmFuc2l0aW9uY2FuY2VsJyxcbiAgJ3RyYW5zaXRpb25lbmQnLFxuICAnd2FpdGluZycsXG4gICd3aGVlbCdcbl07XG5jb25zdCBkb2N1bWVudEV2ZW50TmFtZXMgPSBbXG4gICdhZnRlcnNjcmlwdGV4ZWN1dGUnLCAnYmVmb3Jlc2NyaXB0ZXhlY3V0ZScsICdET01Db250ZW50TG9hZGVkJywgJ2ZyZWV6ZScsICdmdWxsc2NyZWVuY2hhbmdlJyxcbiAgJ21vemZ1bGxzY3JlZW5jaGFuZ2UnLCAnd2Via2l0ZnVsbHNjcmVlbmNoYW5nZScsICdtc2Z1bGxzY3JlZW5jaGFuZ2UnLCAnZnVsbHNjcmVlbmVycm9yJyxcbiAgJ21vemZ1bGxzY3JlZW5lcnJvcicsICd3ZWJraXRmdWxsc2NyZWVuZXJyb3InLCAnbXNmdWxsc2NyZWVuZXJyb3InLCAncmVhZHlzdGF0ZWNoYW5nZScsXG4gICd2aXNpYmlsaXR5Y2hhbmdlJywgJ3Jlc3VtZSdcbl07XG5jb25zdCB3aW5kb3dFdmVudE5hbWVzID0gW1xuICAnYWJzb2x1dGVkZXZpY2VvcmllbnRhdGlvbicsXG4gICdhZnRlcmlucHV0JyxcbiAgJ2FmdGVycHJpbnQnLFxuICAnYXBwaW5zdGFsbGVkJyxcbiAgJ2JlZm9yZWluc3RhbGxwcm9tcHQnLFxuICAnYmVmb3JlcHJpbnQnLFxuICAnYmVmb3JldW5sb2FkJyxcbiAgJ2RldmljZWxpZ2h0JyxcbiAgJ2RldmljZW1vdGlvbicsXG4gICdkZXZpY2VvcmllbnRhdGlvbicsXG4gICdkZXZpY2VvcmllbnRhdGlvbmFic29sdXRlJyxcbiAgJ2RldmljZXByb3hpbWl0eScsXG4gICdoYXNoY2hhbmdlJyxcbiAgJ2xhbmd1YWdlY2hhbmdlJyxcbiAgJ21lc3NhZ2UnLFxuICAnbW96YmVmb3JlcGFpbnQnLFxuICAnb2ZmbGluZScsXG4gICdvbmxpbmUnLFxuICAncGFpbnQnLFxuICAncGFnZXNob3cnLFxuICAncGFnZWhpZGUnLFxuICAncG9wc3RhdGUnLFxuICAncmVqZWN0aW9uaGFuZGxlZCcsXG4gICdzdG9yYWdlJyxcbiAgJ3VuaGFuZGxlZHJlamVjdGlvbicsXG4gICd1bmxvYWQnLFxuICAndXNlcnByb3hpbWl0eScsXG4gICd2cmRpc3BseWNvbm5lY3RlZCcsXG4gICd2cmRpc3BsYXlkaXNjb25uZWN0ZWQnLFxuICAndnJkaXNwbGF5cHJlc2VudGNoYW5nZSdcbl07XG5jb25zdCBodG1sRWxlbWVudEV2ZW50TmFtZXMgPSBbXG4gICdiZWZvcmVjb3B5JywgJ2JlZm9yZWN1dCcsICdiZWZvcmVwYXN0ZScsICdjb3B5JywgJ2N1dCcsICdwYXN0ZScsICdkcmFnc3RhcnQnLCAnbG9hZGVuZCcsXG4gICdhbmltYXRpb25zdGFydCcsICdzZWFyY2gnLCAndHJhbnNpdGlvbnJ1bicsICd0cmFuc2l0aW9uc3RhcnQnLCAnd2Via2l0YW5pbWF0aW9uZW5kJyxcbiAgJ3dlYmtpdGFuaW1hdGlvbml0ZXJhdGlvbicsICd3ZWJraXRhbmltYXRpb25zdGFydCcsICd3ZWJraXR0cmFuc2l0aW9uZW5kJ1xuXTtcbmNvbnN0IG1lZGlhRWxlbWVudEV2ZW50TmFtZXMgPVxuICAgIFsnZW5jcnlwdGVkJywgJ3dhaXRpbmdmb3JrZXknLCAnbXNuZWVka2V5JywgJ21vemludGVycnVwdGJlZ2luJywgJ21vemludGVycnVwdGVuZCddO1xuY29uc3QgaWVFbGVtZW50RXZlbnROYW1lcyA9IFtcbiAgJ2FjdGl2YXRlJyxcbiAgJ2FmdGVydXBkYXRlJyxcbiAgJ2FyaWFyZXF1ZXN0JyxcbiAgJ2JlZm9yZWFjdGl2YXRlJyxcbiAgJ2JlZm9yZWRlYWN0aXZhdGUnLFxuICAnYmVmb3JlZWRpdGZvY3VzJyxcbiAgJ2JlZm9yZXVwZGF0ZScsXG4gICdjZWxsY2hhbmdlJyxcbiAgJ2NvbnRyb2xzZWxlY3QnLFxuICAnZGF0YWF2YWlsYWJsZScsXG4gICdkYXRhc2V0Y2hhbmdlZCcsXG4gICdkYXRhc2V0Y29tcGxldGUnLFxuICAnZXJyb3J1cGRhdGUnLFxuICAnZmlsdGVyY2hhbmdlJyxcbiAgJ2xheW91dGNvbXBsZXRlJyxcbiAgJ2xvc2VjYXB0dXJlJyxcbiAgJ21vdmUnLFxuICAnbW92ZWVuZCcsXG4gICdtb3Zlc3RhcnQnLFxuICAncHJvcGVydHljaGFuZ2UnLFxuICAncmVzaXplZW5kJyxcbiAgJ3Jlc2l6ZXN0YXJ0JyxcbiAgJ3Jvd2VudGVyJyxcbiAgJ3Jvd2V4aXQnLFxuICAncm93c2RlbGV0ZScsXG4gICdyb3dzaW5zZXJ0ZWQnLFxuICAnY29tbWFuZCcsXG4gICdjb21wYXNzbmVlZHNjYWxpYnJhdGlvbicsXG4gICdkZWFjdGl2YXRlJyxcbiAgJ2hlbHAnLFxuICAnbXNjb250ZW50em9vbScsXG4gICdtc21hbmlwdWxhdGlvbnN0YXRlY2hhbmdlZCcsXG4gICdtc2dlc3R1cmVjaGFuZ2UnLFxuICAnbXNnZXN0dXJlZG91YmxldGFwJyxcbiAgJ21zZ2VzdHVyZWVuZCcsXG4gICdtc2dlc3R1cmVob2xkJyxcbiAgJ21zZ2VzdHVyZXN0YXJ0JyxcbiAgJ21zZ2VzdHVyZXRhcCcsXG4gICdtc2dvdHBvaW50ZXJjYXB0dXJlJyxcbiAgJ21zaW5lcnRpYXN0YXJ0JyxcbiAgJ21zbG9zdHBvaW50ZXJjYXB0dXJlJyxcbiAgJ21zcG9pbnRlcmNhbmNlbCcsXG4gICdtc3BvaW50ZXJkb3duJyxcbiAgJ21zcG9pbnRlcmVudGVyJyxcbiAgJ21zcG9pbnRlcmhvdmVyJyxcbiAgJ21zcG9pbnRlcmxlYXZlJyxcbiAgJ21zcG9pbnRlcm1vdmUnLFxuICAnbXNwb2ludGVyb3V0JyxcbiAgJ21zcG9pbnRlcm92ZXInLFxuICAnbXNwb2ludGVydXAnLFxuICAncG9pbnRlcm91dCcsXG4gICdtc3NpdGVtb2RlanVtcGxpc3RpdGVtcmVtb3ZlZCcsXG4gICdtc3RodW1ibmFpbGNsaWNrJyxcbiAgJ3N0b3AnLFxuICAnc3RvcmFnZWNvbW1pdCdcbl07XG5jb25zdCB3ZWJnbEV2ZW50TmFtZXMgPSBbJ3dlYmdsY29udGV4dHJlc3RvcmVkJywgJ3dlYmdsY29udGV4dGxvc3QnLCAnd2ViZ2xjb250ZXh0Y3JlYXRpb25lcnJvciddO1xuY29uc3QgZm9ybUV2ZW50TmFtZXMgPSBbJ2F1dG9jb21wbGV0ZScsICdhdXRvY29tcGxldGVlcnJvciddO1xuY29uc3QgZGV0YWlsRXZlbnROYW1lcyA9IFsndG9nZ2xlJ107XG5jb25zdCBmcmFtZUV2ZW50TmFtZXMgPSBbJ2xvYWQnXTtcbmNvbnN0IGZyYW1lU2V0RXZlbnROYW1lcyA9IFsnYmx1cicsICdlcnJvcicsICdmb2N1cycsICdsb2FkJywgJ3Jlc2l6ZScsICdzY3JvbGwnLCAnbWVzc2FnZWVycm9yJ107XG5jb25zdCBtYXJxdWVlRXZlbnROYW1lcyA9IFsnYm91bmNlJywgJ2ZpbmlzaCcsICdzdGFydCddO1xuXG5jb25zdCBYTUxIdHRwUmVxdWVzdEV2ZW50TmFtZXMgPSBbXG4gICdsb2Fkc3RhcnQnLCAncHJvZ3Jlc3MnLCAnYWJvcnQnLCAnZXJyb3InLCAnbG9hZCcsICdwcm9ncmVzcycsICd0aW1lb3V0JywgJ2xvYWRlbmQnLFxuICAncmVhZHlzdGF0ZWNoYW5nZSdcbl07XG5jb25zdCBJREJJbmRleEV2ZW50TmFtZXMgPVxuICAgIFsndXBncmFkZW5lZWRlZCcsICdjb21wbGV0ZScsICdhYm9ydCcsICdzdWNjZXNzJywgJ2Vycm9yJywgJ2Jsb2NrZWQnLCAndmVyc2lvbmNoYW5nZScsICdjbG9zZSddO1xuY29uc3Qgd2Vic29ja2V0RXZlbnROYW1lcyA9IFsnY2xvc2UnLCAnZXJyb3InLCAnb3BlbicsICdtZXNzYWdlJ107XG5jb25zdCB3b3JrZXJFdmVudE5hbWVzID0gWydlcnJvcicsICdtZXNzYWdlJ107XG5cbmV4cG9ydCBjb25zdCBldmVudE5hbWVzID0gZ2xvYmFsRXZlbnRIYW5kbGVyc0V2ZW50TmFtZXMuY29uY2F0KFxuICAgIHdlYmdsRXZlbnROYW1lcywgZm9ybUV2ZW50TmFtZXMsIGRldGFpbEV2ZW50TmFtZXMsIGRvY3VtZW50RXZlbnROYW1lcywgd2luZG93RXZlbnROYW1lcyxcbiAgICBodG1sRWxlbWVudEV2ZW50TmFtZXMsIGllRWxlbWVudEV2ZW50TmFtZXMpO1xuXG5leHBvcnQgaW50ZXJmYWNlIElnbm9yZVByb3BlcnR5IHtcbiAgdGFyZ2V0OiBhbnk7XG4gIGlnbm9yZVByb3BlcnRpZXM6IHN0cmluZ1tdO1xufVxuXG5mdW5jdGlvbiBmaWx0ZXJQcm9wZXJ0aWVzKFxuICAgIHRhcmdldDogYW55LCBvblByb3BlcnRpZXM6IHN0cmluZ1tdLCBpZ25vcmVQcm9wZXJ0aWVzOiBJZ25vcmVQcm9wZXJ0eVtdKTogc3RyaW5nW10ge1xuICBpZiAoIWlnbm9yZVByb3BlcnRpZXMgfHwgaWdub3JlUHJvcGVydGllcy5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gb25Qcm9wZXJ0aWVzO1xuICB9XG5cbiAgY29uc3QgdGlwOiBJZ25vcmVQcm9wZXJ0eVtdID0gaWdub3JlUHJvcGVydGllcy5maWx0ZXIoaXAgPT4gaXAudGFyZ2V0ID09PSB0YXJnZXQpO1xuICBpZiAoIXRpcCB8fCB0aXAubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIG9uUHJvcGVydGllcztcbiAgfVxuXG4gIGNvbnN0IHRhcmdldElnbm9yZVByb3BlcnRpZXM6IHN0cmluZ1tdID0gdGlwWzBdLmlnbm9yZVByb3BlcnRpZXM7XG4gIHJldHVybiBvblByb3BlcnRpZXMuZmlsdGVyKG9wID0+IHRhcmdldElnbm9yZVByb3BlcnRpZXMuaW5kZXhPZihvcCkgPT09IC0xKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBhdGNoRmlsdGVyZWRQcm9wZXJ0aWVzKFxuICAgIHRhcmdldDogYW55LCBvblByb3BlcnRpZXM6IHN0cmluZ1tdLCBpZ25vcmVQcm9wZXJ0aWVzOiBJZ25vcmVQcm9wZXJ0eVtdLCBwcm90b3R5cGU/OiBhbnkpIHtcbiAgLy8gY2hlY2sgd2hldGhlciB0YXJnZXQgaXMgYXZhaWxhYmxlLCBzb21ldGltZXMgdGFyZ2V0IHdpbGwgYmUgdW5kZWZpbmVkXG4gIC8vIGJlY2F1c2UgZGlmZmVyZW50IGJyb3dzZXIgb3Igc29tZSAzcmQgcGFydHkgcGx1Z2luLlxuICBpZiAoIXRhcmdldCkge1xuICAgIHJldHVybjtcbiAgfVxuICBjb25zdCBmaWx0ZXJlZFByb3BlcnRpZXM6IHN0cmluZ1tdID0gZmlsdGVyUHJvcGVydGllcyh0YXJnZXQsIG9uUHJvcGVydGllcywgaWdub3JlUHJvcGVydGllcyk7XG4gIHBhdGNoT25Qcm9wZXJ0aWVzKHRhcmdldCwgZmlsdGVyZWRQcm9wZXJ0aWVzLCBwcm90b3R5cGUpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcHJvcGVydHlEZXNjcmlwdG9yUGF0Y2goYXBpOiBfWm9uZVByaXZhdGUsIF9nbG9iYWw6IGFueSkge1xuICBpZiAoaXNOb2RlICYmICFpc01peCkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0IHN1cHBvcnRzV2ViU29ja2V0ID0gdHlwZW9mIFdlYlNvY2tldCAhPT0gJ3VuZGVmaW5lZCc7XG4gIGlmIChjYW5QYXRjaFZpYVByb3BlcnR5RGVzY3JpcHRvcigpKSB7XG4gICAgY29uc3QgaWdub3JlUHJvcGVydGllczogSWdub3JlUHJvcGVydHlbXSA9IF9nbG9iYWxbJ19fWm9uZV9pZ25vcmVfb25fcHJvcGVydGllcyddO1xuICAgIC8vIGZvciBicm93c2VycyB0aGF0IHdlIGNhbiBwYXRjaCB0aGUgZGVzY3JpcHRvcjogIENocm9tZSAmIEZpcmVmb3hcbiAgICBpZiAoaXNCcm93c2VyKSB7XG4gICAgICBjb25zdCBpbnRlcm5hbFdpbmRvdzogYW55ID0gd2luZG93O1xuICAgICAgY29uc3QgaWdub3JlRXJyb3JQcm9wZXJ0aWVzID1cbiAgICAgICAgICBpc0lFID8gW3t0YXJnZXQ6IGludGVybmFsV2luZG93LCBpZ25vcmVQcm9wZXJ0aWVzOiBbJ2Vycm9yJ119XSA6IFtdO1xuICAgICAgLy8gaW4gSUUvRWRnZSwgb25Qcm9wIG5vdCBleGlzdCBpbiB3aW5kb3cgb2JqZWN0LCBidXQgaW4gV2luZG93UHJvdG90eXBlXG4gICAgICAvLyBzbyB3ZSBuZWVkIHRvIHBhc3MgV2luZG93UHJvdG90eXBlIHRvIGNoZWNrIG9uUHJvcCBleGlzdCBvciBub3RcbiAgICAgIHBhdGNoRmlsdGVyZWRQcm9wZXJ0aWVzKFxuICAgICAgICAgIGludGVybmFsV2luZG93LCBldmVudE5hbWVzLmNvbmNhdChbJ21lc3NhZ2VlcnJvciddKSxcbiAgICAgICAgICBpZ25vcmVQcm9wZXJ0aWVzID8gaWdub3JlUHJvcGVydGllcy5jb25jYXQoaWdub3JlRXJyb3JQcm9wZXJ0aWVzKSA6IGlnbm9yZVByb3BlcnRpZXMsXG4gICAgICAgICAgT2JqZWN0R2V0UHJvdG90eXBlT2YoaW50ZXJuYWxXaW5kb3cpKTtcbiAgICAgIHBhdGNoRmlsdGVyZWRQcm9wZXJ0aWVzKERvY3VtZW50LnByb3RvdHlwZSwgZXZlbnROYW1lcywgaWdub3JlUHJvcGVydGllcyk7XG5cbiAgICAgIGlmICh0eXBlb2YgaW50ZXJuYWxXaW5kb3dbJ1NWR0VsZW1lbnQnXSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgcGF0Y2hGaWx0ZXJlZFByb3BlcnRpZXMoXG4gICAgICAgICAgICBpbnRlcm5hbFdpbmRvd1snU1ZHRWxlbWVudCddLnByb3RvdHlwZSwgZXZlbnROYW1lcywgaWdub3JlUHJvcGVydGllcyk7XG4gICAgICB9XG4gICAgICBwYXRjaEZpbHRlcmVkUHJvcGVydGllcyhFbGVtZW50LnByb3RvdHlwZSwgZXZlbnROYW1lcywgaWdub3JlUHJvcGVydGllcyk7XG4gICAgICBwYXRjaEZpbHRlcmVkUHJvcGVydGllcyhIVE1MRWxlbWVudC5wcm90b3R5cGUsIGV2ZW50TmFtZXMsIGlnbm9yZVByb3BlcnRpZXMpO1xuICAgICAgcGF0Y2hGaWx0ZXJlZFByb3BlcnRpZXMoSFRNTE1lZGlhRWxlbWVudC5wcm90b3R5cGUsIG1lZGlhRWxlbWVudEV2ZW50TmFtZXMsIGlnbm9yZVByb3BlcnRpZXMpO1xuICAgICAgcGF0Y2hGaWx0ZXJlZFByb3BlcnRpZXMoXG4gICAgICAgICAgSFRNTEZyYW1lU2V0RWxlbWVudC5wcm90b3R5cGUsIHdpbmRvd0V2ZW50TmFtZXMuY29uY2F0KGZyYW1lU2V0RXZlbnROYW1lcyksXG4gICAgICAgICAgaWdub3JlUHJvcGVydGllcyk7XG4gICAgICBwYXRjaEZpbHRlcmVkUHJvcGVydGllcyhcbiAgICAgICAgICBIVE1MQm9keUVsZW1lbnQucHJvdG90eXBlLCB3aW5kb3dFdmVudE5hbWVzLmNvbmNhdChmcmFtZVNldEV2ZW50TmFtZXMpLCBpZ25vcmVQcm9wZXJ0aWVzKTtcbiAgICAgIHBhdGNoRmlsdGVyZWRQcm9wZXJ0aWVzKEhUTUxGcmFtZUVsZW1lbnQucHJvdG90eXBlLCBmcmFtZUV2ZW50TmFtZXMsIGlnbm9yZVByb3BlcnRpZXMpO1xuICAgICAgcGF0Y2hGaWx0ZXJlZFByb3BlcnRpZXMoSFRNTElGcmFtZUVsZW1lbnQucHJvdG90eXBlLCBmcmFtZUV2ZW50TmFtZXMsIGlnbm9yZVByb3BlcnRpZXMpO1xuXG4gICAgICBjb25zdCBIVE1MTWFycXVlZUVsZW1lbnQgPSBpbnRlcm5hbFdpbmRvd1snSFRNTE1hcnF1ZWVFbGVtZW50J107XG4gICAgICBpZiAoSFRNTE1hcnF1ZWVFbGVtZW50KSB7XG4gICAgICAgIHBhdGNoRmlsdGVyZWRQcm9wZXJ0aWVzKEhUTUxNYXJxdWVlRWxlbWVudC5wcm90b3R5cGUsIG1hcnF1ZWVFdmVudE5hbWVzLCBpZ25vcmVQcm9wZXJ0aWVzKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IFdvcmtlciA9IGludGVybmFsV2luZG93WydXb3JrZXInXTtcbiAgICAgIGlmIChXb3JrZXIpIHtcbiAgICAgICAgcGF0Y2hGaWx0ZXJlZFByb3BlcnRpZXMoV29ya2VyLnByb3RvdHlwZSwgd29ya2VyRXZlbnROYW1lcywgaWdub3JlUHJvcGVydGllcyk7XG4gICAgICB9XG4gICAgfVxuICAgIHBhdGNoRmlsdGVyZWRQcm9wZXJ0aWVzKFhNTEh0dHBSZXF1ZXN0LnByb3RvdHlwZSwgWE1MSHR0cFJlcXVlc3RFdmVudE5hbWVzLCBpZ25vcmVQcm9wZXJ0aWVzKTtcbiAgICBjb25zdCBYTUxIdHRwUmVxdWVzdEV2ZW50VGFyZ2V0ID0gX2dsb2JhbFsnWE1MSHR0cFJlcXVlc3RFdmVudFRhcmdldCddO1xuICAgIGlmIChYTUxIdHRwUmVxdWVzdEV2ZW50VGFyZ2V0KSB7XG4gICAgICBwYXRjaEZpbHRlcmVkUHJvcGVydGllcyhcbiAgICAgICAgICBYTUxIdHRwUmVxdWVzdEV2ZW50VGFyZ2V0ICYmIFhNTEh0dHBSZXF1ZXN0RXZlbnRUYXJnZXQucHJvdG90eXBlLFxuICAgICAgICAgIFhNTEh0dHBSZXF1ZXN0RXZlbnROYW1lcywgaWdub3JlUHJvcGVydGllcyk7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgSURCSW5kZXggIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBwYXRjaEZpbHRlcmVkUHJvcGVydGllcyhJREJJbmRleC5wcm90b3R5cGUsIElEQkluZGV4RXZlbnROYW1lcywgaWdub3JlUHJvcGVydGllcyk7XG4gICAgICBwYXRjaEZpbHRlcmVkUHJvcGVydGllcyhJREJSZXF1ZXN0LnByb3RvdHlwZSwgSURCSW5kZXhFdmVudE5hbWVzLCBpZ25vcmVQcm9wZXJ0aWVzKTtcbiAgICAgIHBhdGNoRmlsdGVyZWRQcm9wZXJ0aWVzKElEQk9wZW5EQlJlcXVlc3QucHJvdG90eXBlLCBJREJJbmRleEV2ZW50TmFtZXMsIGlnbm9yZVByb3BlcnRpZXMpO1xuICAgICAgcGF0Y2hGaWx0ZXJlZFByb3BlcnRpZXMoSURCRGF0YWJhc2UucHJvdG90eXBlLCBJREJJbmRleEV2ZW50TmFtZXMsIGlnbm9yZVByb3BlcnRpZXMpO1xuICAgICAgcGF0Y2hGaWx0ZXJlZFByb3BlcnRpZXMoSURCVHJhbnNhY3Rpb24ucHJvdG90eXBlLCBJREJJbmRleEV2ZW50TmFtZXMsIGlnbm9yZVByb3BlcnRpZXMpO1xuICAgICAgcGF0Y2hGaWx0ZXJlZFByb3BlcnRpZXMoSURCQ3Vyc29yLnByb3RvdHlwZSwgSURCSW5kZXhFdmVudE5hbWVzLCBpZ25vcmVQcm9wZXJ0aWVzKTtcbiAgICB9XG4gICAgaWYgKHN1cHBvcnRzV2ViU29ja2V0KSB7XG4gICAgICBwYXRjaEZpbHRlcmVkUHJvcGVydGllcyhXZWJTb2NrZXQucHJvdG90eXBlLCB3ZWJzb2NrZXRFdmVudE5hbWVzLCBpZ25vcmVQcm9wZXJ0aWVzKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgLy8gU2FmYXJpLCBBbmRyb2lkIGJyb3dzZXJzIChKZWxseSBCZWFuKVxuICAgIHBhdGNoVmlhQ2FwdHVyaW5nQWxsVGhlRXZlbnRzKCk7XG4gICAgcGF0Y2hDbGFzcygnWE1MSHR0cFJlcXVlc3QnKTtcbiAgICBpZiAoc3VwcG9ydHNXZWJTb2NrZXQpIHtcbiAgICAgIHdlYlNvY2tldFBhdGNoLmFwcGx5KGFwaSwgX2dsb2JhbCk7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGNhblBhdGNoVmlhUHJvcGVydHlEZXNjcmlwdG9yKCkge1xuICBpZiAoKGlzQnJvd3NlciB8fCBpc01peCkgJiYgIU9iamVjdEdldE93blByb3BlcnR5RGVzY3JpcHRvcihIVE1MRWxlbWVudC5wcm90b3R5cGUsICdvbmNsaWNrJykgJiZcbiAgICAgIHR5cGVvZiBFbGVtZW50ICE9PSAndW5kZWZpbmVkJykge1xuICAgIC8vIFdlYktpdCBodHRwczovL2J1Z3Mud2Via2l0Lm9yZy9zaG93X2J1Zy5jZ2k/aWQ9MTM0MzY0XG4gICAgLy8gSURMIGludGVyZmFjZSBhdHRyaWJ1dGVzIGFyZSBub3QgY29uZmlndXJhYmxlXG4gICAgY29uc3QgZGVzYyA9IE9iamVjdEdldE93blByb3BlcnR5RGVzY3JpcHRvcihFbGVtZW50LnByb3RvdHlwZSwgJ29uY2xpY2snKTtcbiAgICBpZiAoZGVzYyAmJiAhZGVzYy5jb25maWd1cmFibGUpIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGNvbnN0IE9OX1JFQURZX1NUQVRFX0NIQU5HRSA9ICdvbnJlYWR5c3RhdGVjaGFuZ2UnO1xuICBjb25zdCBYTUxIdHRwUmVxdWVzdFByb3RvdHlwZSA9IFhNTEh0dHBSZXF1ZXN0LnByb3RvdHlwZTtcblxuICBjb25zdCB4aHJEZXNjID0gT2JqZWN0R2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKFhNTEh0dHBSZXF1ZXN0UHJvdG90eXBlLCBPTl9SRUFEWV9TVEFURV9DSEFOR0UpO1xuXG4gIC8vIGFkZCBlbnVtZXJhYmxlIGFuZCBjb25maWd1cmFibGUgaGVyZSBiZWNhdXNlIGluIG9wZXJhXG4gIC8vIGJ5IGRlZmF1bHQgWE1MSHR0cFJlcXVlc3QucHJvdG90eXBlLm9ucmVhZHlzdGF0ZWNoYW5nZSBpcyB1bmRlZmluZWRcbiAgLy8gd2l0aG91dCBhZGRpbmcgZW51bWVyYWJsZSBhbmQgY29uZmlndXJhYmxlIHdpbGwgY2F1c2Ugb25yZWFkeXN0YXRlY2hhbmdlXG4gIC8vIG5vbi1jb25maWd1cmFibGVcbiAgLy8gYW5kIGlmIFhNTEh0dHBSZXF1ZXN0LnByb3RvdHlwZS5vbnJlYWR5c3RhdGVjaGFuZ2UgaXMgdW5kZWZpbmVkLFxuICAvLyB3ZSBzaG91bGQgc2V0IGEgcmVhbCBkZXNjIGluc3RlYWQgYSBmYWtlIG9uZVxuICBpZiAoeGhyRGVzYykge1xuICAgIE9iamVjdERlZmluZVByb3BlcnR5KFhNTEh0dHBSZXF1ZXN0UHJvdG90eXBlLCBPTl9SRUFEWV9TVEFURV9DSEFOR0UsIHtcbiAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBjb25zdCByZXEgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICBjb25zdCByZXN1bHQgPSAhIXJlcS5vbnJlYWR5c3RhdGVjaGFuZ2U7XG4gICAgLy8gcmVzdG9yZSBvcmlnaW5hbCBkZXNjXG4gICAgT2JqZWN0RGVmaW5lUHJvcGVydHkoWE1MSHR0cFJlcXVlc3RQcm90b3R5cGUsIE9OX1JFQURZX1NUQVRFX0NIQU5HRSwgeGhyRGVzYyB8fCB7fSk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfSBlbHNlIHtcbiAgICBjb25zdCBTWU1CT0xfRkFLRV9PTlJFQURZU1RBVEVDSEFOR0UgPSB6b25lU3ltYm9sKCdmYWtlJyk7XG4gICAgT2JqZWN0RGVmaW5lUHJvcGVydHkoWE1MSHR0cFJlcXVlc3RQcm90b3R5cGUsIE9OX1JFQURZX1NUQVRFX0NIQU5HRSwge1xuICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzW1NZTUJPTF9GQUtFX09OUkVBRFlTVEFURUNIQU5HRV07XG4gICAgICB9LFxuICAgICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICB0aGlzW1NZTUJPTF9GQUtFX09OUkVBRFlTVEFURUNIQU5HRV0gPSB2YWx1ZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBjb25zdCByZXEgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICBjb25zdCBkZXRlY3RGdW5jID0gKCkgPT4ge307XG4gICAgcmVxLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGRldGVjdEZ1bmM7XG4gICAgY29uc3QgcmVzdWx0ID0gKHJlcSBhcyBhbnkpW1NZTUJPTF9GQUtFX09OUkVBRFlTVEFURUNIQU5HRV0gPT09IGRldGVjdEZ1bmM7XG4gICAgcmVxLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IG51bGwgYXMgYW55O1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbn1cblxuY29uc3QgdW5ib3VuZEtleSA9IHpvbmVTeW1ib2woJ3VuYm91bmQnKTtcblxuLy8gV2hlbmV2ZXIgYW55IGV2ZW50TGlzdGVuZXIgZmlyZXMsIHdlIGNoZWNrIHRoZSBldmVudExpc3RlbmVyIHRhcmdldCBhbmQgYWxsIHBhcmVudHNcbi8vIGZvciBgb253aGF0ZXZlcmAgcHJvcGVydGllcyBhbmQgcmVwbGFjZSB0aGVtIHdpdGggem9uZS1ib3VuZCBmdW5jdGlvbnNcbi8vIC0gQ2hyb21lIChmb3Igbm93KVxuZnVuY3Rpb24gcGF0Y2hWaWFDYXB0dXJpbmdBbGxUaGVFdmVudHMoKSB7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgZXZlbnROYW1lcy5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IHByb3BlcnR5ID0gZXZlbnROYW1lc1tpXTtcbiAgICBjb25zdCBvbnByb3BlcnR5ID0gJ29uJyArIHByb3BlcnR5O1xuICAgIHNlbGYuYWRkRXZlbnRMaXN0ZW5lcihwcm9wZXJ0eSwgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgIGxldCBlbHQ6IGFueSA9IDxOb2RlPmV2ZW50LnRhcmdldCwgYm91bmQsIHNvdXJjZTtcbiAgICAgIGlmIChlbHQpIHtcbiAgICAgICAgc291cmNlID0gZWx0LmNvbnN0cnVjdG9yWyduYW1lJ10gKyAnLicgKyBvbnByb3BlcnR5O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc291cmNlID0gJ3Vua25vd24uJyArIG9ucHJvcGVydHk7XG4gICAgICB9XG4gICAgICB3aGlsZSAoZWx0KSB7XG4gICAgICAgIGlmIChlbHRbb25wcm9wZXJ0eV0gJiYgIWVsdFtvbnByb3BlcnR5XVt1bmJvdW5kS2V5XSkge1xuICAgICAgICAgIGJvdW5kID0gd3JhcFdpdGhDdXJyZW50Wm9uZShlbHRbb25wcm9wZXJ0eV0sIHNvdXJjZSk7XG4gICAgICAgICAgYm91bmRbdW5ib3VuZEtleV0gPSBlbHRbb25wcm9wZXJ0eV07XG4gICAgICAgICAgZWx0W29ucHJvcGVydHldID0gYm91bmQ7XG4gICAgICAgIH1cbiAgICAgICAgZWx0ID0gZWx0LnBhcmVudEVsZW1lbnQ7XG4gICAgICB9XG4gICAgfSwgdHJ1ZSk7XG4gIH1cbn1cbiJdfQ==