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
Zone.__load_patch('fs', function () {
    var fs;
    try {
        fs = require('fs');
    }
    catch (err) {
    }
    // watch, watchFile, unwatchFile has been patched
    // because EventEmitter has been patched
    var TO_PATCH_MACROTASK_METHODS = [
        'access', 'appendFile', 'chmod', 'chown', 'close', 'exists', 'fchmod',
        'fchown', 'fdatasync', 'fstat', 'fsync', 'ftruncate', 'futimes', 'lchmod',
        'lchown', 'link', 'lstat', 'mkdir', 'mkdtemp', 'open', 'read',
        'readdir', 'readFile', 'readlink', 'realpath', 'rename', 'rmdir', 'stat',
        'symlink', 'truncate', 'unlink', 'utimes', 'write', 'writeFile',
    ];
    if (fs) {
        TO_PATCH_MACROTASK_METHODS.filter(function (name) { return !!fs[name] && typeof fs[name] === 'function'; })
            .forEach(function (name) {
            utils_1.patchMacroTask(fs, name, function (self, args) {
                return {
                    name: 'fs.' + name,
                    args: args,
                    cbIdx: args.length > 0 ? args.length - 1 : -1,
                    target: self
                };
            });
        });
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7OztHQU1HOztBQUVILHlDQUErQztBQUUvQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRTtJQUN0QixJQUFJLEVBQU8sQ0FBQztJQUNaLElBQUk7UUFDRixFQUFFLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ3BCO0lBQUMsT0FBTyxHQUFHLEVBQUU7S0FDYjtJQUVELGlEQUFpRDtJQUNqRCx3Q0FBd0M7SUFDeEMsSUFBTSwwQkFBMEIsR0FBRztRQUNqQyxRQUFRLEVBQUcsWUFBWSxFQUFFLE9BQU8sRUFBSyxPQUFPLEVBQUssT0FBTyxFQUFNLFFBQVEsRUFBSyxRQUFRO1FBQ25GLFFBQVEsRUFBRyxXQUFXLEVBQUcsT0FBTyxFQUFLLE9BQU8sRUFBSyxXQUFXLEVBQUUsU0FBUyxFQUFJLFFBQVE7UUFDbkYsUUFBUSxFQUFHLE1BQU0sRUFBUSxPQUFPLEVBQUssT0FBTyxFQUFLLFNBQVMsRUFBSSxNQUFNLEVBQU8sTUFBTTtRQUNqRixTQUFTLEVBQUUsVUFBVSxFQUFJLFVBQVUsRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFLLE9BQU8sRUFBTSxNQUFNO1FBQ2pGLFNBQVMsRUFBRSxVQUFVLEVBQUksUUFBUSxFQUFJLFFBQVEsRUFBSSxPQUFPLEVBQU0sV0FBVztLQUMxRSxDQUFDO0lBRUYsSUFBSSxFQUFFLEVBQUU7UUFDTiwwQkFBMEIsQ0FBQyxNQUFNLENBQUMsVUFBQSxJQUFJLElBQUksT0FBQSxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLE9BQU8sRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLFVBQVUsRUFBNUMsQ0FBNEMsQ0FBQzthQUNsRixPQUFPLENBQUMsVUFBQSxJQUFJO1lBQ1gsc0JBQWMsQ0FBQyxFQUFFLEVBQUUsSUFBSSxFQUFFLFVBQUMsSUFBUyxFQUFFLElBQVc7Z0JBQzlDLE9BQU87b0JBQ0wsSUFBSSxFQUFFLEtBQUssR0FBRyxJQUFJO29CQUNsQixJQUFJLEVBQUUsSUFBSTtvQkFDVixLQUFLLEVBQUUsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQzdDLE1BQU0sRUFBRSxJQUFJO2lCQUNiLENBQUM7WUFDSixDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0tBQ1I7QUFDSCxDQUFDLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtwYXRjaE1hY3JvVGFza30gZnJvbSAnLi4vY29tbW9uL3V0aWxzJztcblxuWm9uZS5fX2xvYWRfcGF0Y2goJ2ZzJywgKCkgPT4ge1xuICBsZXQgZnM6IGFueTtcbiAgdHJ5IHtcbiAgICBmcyA9IHJlcXVpcmUoJ2ZzJyk7XG4gIH0gY2F0Y2ggKGVycikge1xuICB9XG5cbiAgLy8gd2F0Y2gsIHdhdGNoRmlsZSwgdW53YXRjaEZpbGUgaGFzIGJlZW4gcGF0Y2hlZFxuICAvLyBiZWNhdXNlIEV2ZW50RW1pdHRlciBoYXMgYmVlbiBwYXRjaGVkXG4gIGNvbnN0IFRPX1BBVENIX01BQ1JPVEFTS19NRVRIT0RTID0gW1xuICAgICdhY2Nlc3MnLCAgJ2FwcGVuZEZpbGUnLCAnY2htb2QnLCAgICAnY2hvd24nLCAgICAnY2xvc2UnLCAgICAgJ2V4aXN0cycsICAgICdmY2htb2QnLFxuICAgICdmY2hvd24nLCAgJ2ZkYXRhc3luYycsICAnZnN0YXQnLCAgICAnZnN5bmMnLCAgICAnZnRydW5jYXRlJywgJ2Z1dGltZXMnLCAgICdsY2htb2QnLFxuICAgICdsY2hvd24nLCAgJ2xpbmsnLCAgICAgICAnbHN0YXQnLCAgICAnbWtkaXInLCAgICAnbWtkdGVtcCcsICAgJ29wZW4nLCAgICAgICdyZWFkJyxcbiAgICAncmVhZGRpcicsICdyZWFkRmlsZScsICAgJ3JlYWRsaW5rJywgJ3JlYWxwYXRoJywgJ3JlbmFtZScsICAgICdybWRpcicsICAgICAnc3RhdCcsXG4gICAgJ3N5bWxpbmsnLCAndHJ1bmNhdGUnLCAgICd1bmxpbmsnLCAgICd1dGltZXMnLCAgICd3cml0ZScsICAgICAnd3JpdGVGaWxlJyxcbiAgXTtcblxuICBpZiAoZnMpIHtcbiAgICBUT19QQVRDSF9NQUNST1RBU0tfTUVUSE9EUy5maWx0ZXIobmFtZSA9PiAhIWZzW25hbWVdICYmIHR5cGVvZiBmc1tuYW1lXSA9PT0gJ2Z1bmN0aW9uJylcbiAgICAgICAgLmZvckVhY2gobmFtZSA9PiB7XG4gICAgICAgICAgcGF0Y2hNYWNyb1Rhc2soZnMsIG5hbWUsIChzZWxmOiBhbnksIGFyZ3M6IGFueVtdKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICBuYW1lOiAnZnMuJyArIG5hbWUsXG4gICAgICAgICAgICAgIGFyZ3M6IGFyZ3MsXG4gICAgICAgICAgICAgIGNiSWR4OiBhcmdzLmxlbmd0aCA+IDAgPyBhcmdzLmxlbmd0aCAtIDEgOiAtMSxcbiAgICAgICAgICAgICAgdGFyZ2V0OiBzZWxmXG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgfVxufSk7XG4iXX0=