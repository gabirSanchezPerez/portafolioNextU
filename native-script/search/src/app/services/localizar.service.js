"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var operators_1 = require("rxjs/operators");
var LocalizarService = /** @class */ (function () {
    function LocalizarService(http) {
        this.http = http;
    }
    LocalizarService.prototype.getCiudad = function (lat, long) {
        var _this = this;
        this.http.get("http://api.geonames.org/findNearbyPlaceNameJSON?username=gsanchez&lat=" + lat + "&lng=" + long)
            .pipe(operators_1.map(function (res) { return res.json(); }))
            .subscribe(function (res) {
            console.log("response " + JSON.stringify(res.geonames[0].countryName));
            _this.ciudad = res.geonames[0].countryName;
        }, function (err) {
            console.log("Error getCiudad: " + err);
        });
    };
    LocalizarService = __decorate([
        core_1.Injectable({
            providedIn: "root"
        }),
        __metadata("design:paramtypes", [http_1.Http])
    ], LocalizarService);
    return LocalizarService;
}());
exports.LocalizarService = LocalizarService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYWxpemFyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJsb2NhbGl6YXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEyQztBQUMzQyxzQ0FBcUM7QUFDckMsNENBQXFDO0FBS3JDO0lBRUksMEJBQW9CLElBQVU7UUFBVixTQUFJLEdBQUosSUFBSSxDQUFNO0lBQUksQ0FBQztJQUduQyxvQ0FBUyxHQUFULFVBQVUsR0FBVyxFQUFFLElBQVk7UUFBbkMsaUJBZUM7UUFiRyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyx3RUFBd0UsR0FBQyxHQUFHLEdBQUMsT0FBTyxHQUFHLElBQUksQ0FBQzthQUNyRyxJQUFJLENBQ0QsZUFBRyxDQUFDLFVBQUEsR0FBRyxJQUFJLE9BQUEsR0FBRyxDQUFDLElBQUksRUFBRSxFQUFWLENBQVUsQ0FBQyxDQUN6QjthQUNBLFNBQVMsQ0FBQyxVQUFBLEdBQUc7WUFDVixPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsR0FBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQTtZQUVyRSxLQUFJLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFBO1FBRWpELENBQUMsRUFBRSxVQUFBLEdBQUc7WUFDRixPQUFPLENBQUMsR0FBRyxDQUFDLG1CQUFtQixHQUFHLEdBQUcsQ0FBRSxDQUFBO1FBQzNDLENBQUMsQ0FBQyxDQUFDO0lBRVAsQ0FBQztJQXBCUSxnQkFBZ0I7UUFINUIsaUJBQVUsQ0FBQztZQUNSLFVBQVUsRUFBRSxNQUFNO1NBQ3JCLENBQUM7eUNBRzRCLFdBQUk7T0FGckIsZ0JBQWdCLENBcUI1QjtJQUFELHVCQUFDO0NBQUEsQUFyQkQsSUFxQkM7QUFyQlksNENBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IEh0dHAgfSBmcm9tIFwiQGFuZ3VsYXIvaHR0cFwiO1xyXG5pbXBvcnQgeyBtYXAgfSBmcm9tIFwicnhqcy9vcGVyYXRvcnNcIjtcclxuXHJcbkBJbmplY3RhYmxlKHtcclxuICAgIHByb3ZpZGVkSW46IFwicm9vdFwiXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBMb2NhbGl6YXJTZXJ2aWNlIHtcclxuICAgIFxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwKSB7IH1cclxuICAgIHB1YmxpYyBjaXVkYWQ6IHN0cmluZztcclxuXHJcbiAgICBnZXRDaXVkYWQobGF0OiBzdHJpbmcsIGxvbmc6IHN0cmluZykge1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuaHR0cC5nZXQoXCJodHRwOi8vYXBpLmdlb25hbWVzLm9yZy9maW5kTmVhcmJ5UGxhY2VOYW1lSlNPTj91c2VybmFtZT1nc2FuY2hleiZsYXQ9XCIrbGF0K1wiJmxuZz1cIiArIGxvbmcpXHJcbiAgICAgICAgICAgIC5waXBlKFxyXG4gICAgICAgICAgICAgICAgbWFwKHJlcyA9PiByZXMuanNvbigpKVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgICAgIC5zdWJzY3JpYmUocmVzID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVzcG9uc2UgXCIrIEpTT04uc3RyaW5naWZ5KHJlcy5nZW9uYW1lc1swXS5jb3VudHJ5TmFtZSkpXHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5jaXVkYWQgPSByZXMuZ2VvbmFtZXNbMF0uY291bnRyeU5hbWVcclxuXHJcbiAgICAgICAgfSwgZXJyID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciBnZXRDaXVkYWQ6IFwiICsgZXJyIClcclxuICAgICAgICB9KTtcclxuICAgICAgICBcclxuICAgIH1cclxufVxyXG4iXX0=