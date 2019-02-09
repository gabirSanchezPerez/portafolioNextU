"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var iterator_1 = require("../symbol/iterator");
exports.subscribeToIterable = function (iterable) { return function (subscriber) {
    var iterator = iterable[iterator_1.iterator]();
    do {
        var item = iterator.next();
        if (item.done) {
            subscriber.complete();
            break;
        }
        subscriber.next(item.value);
        if (subscriber.closed) {
            break;
        }
    } while (true);
    // Finalize the iterator if it happens to be a Generator
    if (typeof iterator.return === 'function') {
        subscriber.add(function () {
            if (iterator.return) {
                iterator.return();
            }
        });
    }
    return subscriber;
}; };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Vic2NyaWJlVG9JdGVyYWJsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInN1YnNjcmliZVRvSXRlcmFibGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSwrQ0FBaUU7QUFFcEQsUUFBQSxtQkFBbUIsR0FBRyxVQUFJLFFBQXFCLElBQUssT0FBQSxVQUFDLFVBQXlCO0lBQ3pGLElBQU0sUUFBUSxHQUFHLFFBQVEsQ0FBQyxtQkFBZSxDQUFDLEVBQUUsQ0FBQztJQUM3QyxHQUFHO1FBQ0QsSUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQzdCLElBQUksSUFBSSxDQUFDLElBQUksRUFBRTtZQUNiLFVBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUN0QixNQUFNO1NBQ1A7UUFDRCxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM1QixJQUFJLFVBQVUsQ0FBQyxNQUFNLEVBQUU7WUFDckIsTUFBTTtTQUNQO0tBQ0YsUUFBUSxJQUFJLEVBQUU7SUFFZix3REFBd0Q7SUFDeEQsSUFBSSxPQUFPLFFBQVEsQ0FBQyxNQUFNLEtBQUssVUFBVSxFQUFFO1FBQ3pDLFVBQVUsQ0FBQyxHQUFHLENBQUM7WUFDYixJQUFJLFFBQVEsQ0FBQyxNQUFNLEVBQUU7Z0JBQ25CLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQzthQUNuQjtRQUNILENBQUMsQ0FBQyxDQUFDO0tBQ0o7SUFFRCxPQUFPLFVBQVUsQ0FBQztBQUNwQixDQUFDLEVBeEJnRSxDQXdCaEUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFN1YnNjcmliZXIgfSBmcm9tICcuLi9TdWJzY3JpYmVyJztcbmltcG9ydCB7IGl0ZXJhdG9yIGFzIFN5bWJvbF9pdGVyYXRvciB9IGZyb20gJy4uL3N5bWJvbC9pdGVyYXRvcic7XG5cbmV4cG9ydCBjb25zdCBzdWJzY3JpYmVUb0l0ZXJhYmxlID0gPFQ+KGl0ZXJhYmxlOiBJdGVyYWJsZTxUPikgPT4gKHN1YnNjcmliZXI6IFN1YnNjcmliZXI8VD4pID0+IHtcbiAgY29uc3QgaXRlcmF0b3IgPSBpdGVyYWJsZVtTeW1ib2xfaXRlcmF0b3JdKCk7XG4gIGRvIHtcbiAgICBjb25zdCBpdGVtID0gaXRlcmF0b3IubmV4dCgpO1xuICAgIGlmIChpdGVtLmRvbmUpIHtcbiAgICAgIHN1YnNjcmliZXIuY29tcGxldGUoKTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBzdWJzY3JpYmVyLm5leHQoaXRlbS52YWx1ZSk7XG4gICAgaWYgKHN1YnNjcmliZXIuY2xvc2VkKSB7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH0gd2hpbGUgKHRydWUpO1xuXG4gIC8vIEZpbmFsaXplIHRoZSBpdGVyYXRvciBpZiBpdCBoYXBwZW5zIHRvIGJlIGEgR2VuZXJhdG9yXG4gIGlmICh0eXBlb2YgaXRlcmF0b3IucmV0dXJuID09PSAnZnVuY3Rpb24nKSB7XG4gICAgc3Vic2NyaWJlci5hZGQoKCkgPT4ge1xuICAgICAgaWYgKGl0ZXJhdG9yLnJldHVybikge1xuICAgICAgICBpdGVyYXRvci5yZXR1cm4oKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHJldHVybiBzdWJzY3JpYmVyO1xufTtcbiJdfQ==