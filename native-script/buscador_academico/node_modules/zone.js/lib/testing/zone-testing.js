"use strict";
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
// load test related files into bundle in correct order
require("../zone-spec/long-stack-trace");
require("../zone-spec/proxy");
require("../zone-spec/sync-test");
require("../jasmine/jasmine");
require("./async-testing");
require("./fake-async");
require("./promise-testing");
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiem9uZS10ZXN0aW5nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiem9uZS10ZXN0aW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7O0dBTUc7O0FBRUgsdURBQXVEO0FBQ3ZELHlDQUF1QztBQUN2Qyw4QkFBNEI7QUFDNUIsa0NBQWdDO0FBQ2hDLDhCQUE0QjtBQUM1QiwyQkFBeUI7QUFDekIsd0JBQXNCO0FBQ3RCLDZCQUEyQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuLy8gbG9hZCB0ZXN0IHJlbGF0ZWQgZmlsZXMgaW50byBidW5kbGUgaW4gY29ycmVjdCBvcmRlclxuaW1wb3J0ICcuLi96b25lLXNwZWMvbG9uZy1zdGFjay10cmFjZSc7XG5pbXBvcnQgJy4uL3pvbmUtc3BlYy9wcm94eSc7XG5pbXBvcnQgJy4uL3pvbmUtc3BlYy9zeW5jLXRlc3QnO1xuaW1wb3J0ICcuLi9qYXNtaW5lL2phc21pbmUnO1xuaW1wb3J0ICcuL2FzeW5jLXRlc3RpbmcnO1xuaW1wb3J0ICcuL2Zha2UtYXN5bmMnO1xuaW1wb3J0ICcuL3Byb21pc2UtdGVzdGluZyc7Il19