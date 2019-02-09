"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var operators_1 = require("rxjs/operators");
var BuscadorService = /** @class */ (function () {
    function BuscadorService(http) {
        this.http = http;
        this.items = new Array();
        this.buscaren = "";
    }
    BuscadorService.prototype.getUniversidad = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (_this.buscaren == "") {
                _this.url = "http://universities.hipolabs.com/search?name=" + _this.universidad;
            }
            else {
                _this.url = "http://universities.hipolabs.com/search?name=" + _this.universidad + "&country=" + _this.ciudad;
            }
            console.log(_this.url);
            _this.items = [];
            _this.http.get(_this.url)
                .pipe(operators_1.map(function (res) { return res.json(); }))
                .subscribe(function (response) {
                for (var clave in response) {
                    _this.items.push({
                        web_pages: response[clave]["web_pages"][0],
                        country: response[clave]["country"],
                        name: response[clave]["name"]
                    });
                }
                console.log(JSON.stringify(_this.items));
                resolve(_this.items);
            }, function (error) {
                console.log(JSON.stringify(error));
                reject("NO se obtivuieron datos (Servicoio)");
            });
        });
    };
    BuscadorService.prototype.getAllUniversidad = function () {
        var _this = this;
        this.items = [];
        this.http.get("http://universities.hipolabs.com/search?name=" + this.universidad)
            .pipe(operators_1.map(function (res) { return res.json(); }))
            .subscribe(function (response) {
            for (var clave in response) {
                _this.items.push({
                    web_pages: response[clave]["web_pages"][0],
                    country: response[clave]["country"],
                    name: response[clave]["name"]
                });
            }
        }, function (error) { return console.log(JSON.stringify(error)); });
    };
    BuscadorService.prototype.getUniversidadCiudad = function () {
    };
    BuscadorService = __decorate([
        core_1.Injectable({
            providedIn: "root"
        }),
        __metadata("design:paramtypes", [http_1.Http])
    ], BuscadorService);
    return BuscadorService;
}());
exports.BuscadorService = BuscadorService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVzY2Fkb3Iuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImJ1c2NhZG9yLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkM7QUFDM0Msc0NBQXFDO0FBQ3JDLDRDQUFxQztBQU9yQztJQU9JLHlCQUFvQixJQUFVO1FBQVYsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUZ0QixVQUFLLEdBQUcsSUFBSSxLQUFLLEVBQW9CLENBQUM7UUFHMUMsSUFBSSxDQUFDLFFBQVEsR0FBRSxFQUFFLENBQUM7SUFDdEIsQ0FBQztJQUVELHdDQUFjLEdBQWQ7UUFBQSxpQkE4QkM7UUE3QkcsT0FBTyxJQUFJLE9BQU8sQ0FBQyxVQUFDLE9BQU8sRUFBQyxNQUFNO1lBQzlCLElBQUcsS0FBSSxDQUFDLFFBQVEsSUFBSSxFQUFFLEVBQUU7Z0JBQ3BCLEtBQUksQ0FBQyxHQUFHLEdBQUcsK0NBQStDLEdBQUcsS0FBSSxDQUFDLFdBQVcsQ0FBQTthQUNoRjtpQkFBTTtnQkFDSCxLQUFJLENBQUMsR0FBRyxHQUFHLCtDQUErQyxHQUFHLEtBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxHQUFHLEtBQUksQ0FBQyxNQUFNLENBQUE7YUFDNUc7WUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTtZQUNyQixLQUFJLENBQUMsS0FBSyxHQUFFLEVBQUUsQ0FBQztZQUNmLEtBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUksQ0FBQyxHQUFHLENBQUM7aUJBQ3RCLElBQUksQ0FDRCxlQUFHLENBQUMsVUFBQSxHQUFHLElBQUksT0FBQSxHQUFHLENBQUMsSUFBSSxFQUFFLEVBQVYsQ0FBVSxDQUFDLENBQ3pCO2lCQUNBLFNBQVMsQ0FBQyxVQUFDLFFBQWE7Z0JBRXJCLEtBQUssSUFBSSxLQUFLLElBQUksUUFBUSxFQUFDO29CQUN2QixLQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQzt3QkFDWixTQUFTLEVBQUUsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDMUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxTQUFTLENBQUM7d0JBQ25DLElBQUksRUFBRSxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDO3FCQUNoQyxDQUFDLENBQUM7aUJBQ047Z0JBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUksQ0FBQyxLQUFLLENBQUMsQ0FBRSxDQUFBO2dCQUN4QyxPQUFPLENBQUMsS0FBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBRXhCLENBQUMsRUFBRSxVQUFBLEtBQUs7Z0JBQ0osT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFFLENBQUE7Z0JBQ25DLE1BQU0sQ0FBQyxxQ0FBcUMsQ0FBQyxDQUFBO1lBQ2pELENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsMkNBQWlCLEdBQWpCO1FBQUEsaUJBbUJDO1FBbEJHLElBQUksQ0FBQyxLQUFLLEdBQUUsRUFBRSxDQUFDO1FBQ2YsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsK0NBQStDLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQzthQUM1RSxJQUFJLENBQ0QsZUFBRyxDQUFDLFVBQUEsR0FBRyxJQUFJLE9BQUEsR0FBRyxDQUFDLElBQUksRUFBRSxFQUFWLENBQVUsQ0FBQyxDQUN6QjthQUNBLFNBQVMsQ0FBQyxVQUFDLFFBQWE7WUFFckIsS0FBSyxJQUFJLEtBQUssSUFBSSxRQUFRLEVBQUM7Z0JBRXZCLEtBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO29CQUNaLFNBQVMsRUFBRSxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUMxQyxPQUFPLEVBQUUsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLFNBQVMsQ0FBQztvQkFDbkMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLENBQUM7aUJBQ2hDLENBQUMsQ0FBQzthQUNOO1FBRVQsQ0FBQyxFQUFFLFVBQUEsS0FBSyxJQUFJLE9BQUEsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFFLEVBQW5DLENBQW1DLENBQUMsQ0FBQztJQUVyRCxDQUFDO0lBRUQsOENBQW9CLEdBQXBCO0lBR0EsQ0FBQztJQW5FUSxlQUFlO1FBSDNCLGlCQUFVLENBQUM7WUFDUixVQUFVLEVBQUUsTUFBTTtTQUNyQixDQUFDO3lDQVE0QixXQUFJO09BUHJCLGVBQWUsQ0FvRTNCO0lBQUQsc0JBQUM7Q0FBQSxBQXBFRCxJQW9FQztBQXBFWSwwQ0FBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBIdHRwIH0gZnJvbSBcIkBhbmd1bGFyL2h0dHBcIjtcclxuaW1wb3J0IHsgbWFwIH0gZnJvbSBcInJ4anMvb3BlcmF0b3JzXCI7XHJcblxyXG5pbXBvcnQgeyBCdXNjYXJJbnRlcmZhY2UgfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9idXNjYWRvci5pbnRlcmZhY2VcIjtcclxuXHJcbkBJbmplY3RhYmxlKHtcclxuICAgIHByb3ZpZGVkSW46IFwicm9vdFwiXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBCdXNjYWRvclNlcnZpY2Uge1xyXG4gICAgcHVibGljIGNpdWRhZDogc3RyaW5nO1xyXG4gICAgcHVibGljIHVuaXZlcnNpZGFkOiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgYnVzY2FyZW46IHN0cmluZztcclxuICAgIHB1YmxpYyB1cmw6IHN0cmluZztcclxuICAgIHByaXZhdGUgaXRlbXMgPSBuZXcgQXJyYXk8QnVzY2FySW50ZXJmYWNlPiggKTtcclxuICAgIFxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwKSB7IFxyXG4gICAgICAgIHRoaXMuYnVzY2FyZW49IFwiXCI7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0VW5pdmVyc2lkYWQoKTogUHJvbWlzZTxhbnk+e1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSxyZWplY3QpID0+IHtcclxuICAgICAgICAgICAgaWYodGhpcy5idXNjYXJlbiA9PSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVybCA9IFwiaHR0cDovL3VuaXZlcnNpdGllcy5oaXBvbGFicy5jb20vc2VhcmNoP25hbWU9XCIgKyB0aGlzLnVuaXZlcnNpZGFkXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVybCA9IFwiaHR0cDovL3VuaXZlcnNpdGllcy5oaXBvbGFicy5jb20vc2VhcmNoP25hbWU9XCIgKyB0aGlzLnVuaXZlcnNpZGFkICsgXCImY291bnRyeT1cIiArIHRoaXMuY2l1ZGFkXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy51cmwpXHJcbiAgICAgICAgICAgIHRoaXMuaXRlbXM9IFtdO1xyXG4gICAgICAgICAgICB0aGlzLmh0dHAuZ2V0KHRoaXMudXJsKVxyXG4gICAgICAgICAgICAucGlwZShcclxuICAgICAgICAgICAgICAgIG1hcChyZXMgPT4gcmVzLmpzb24oKSlcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChyZXNwb25zZTogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGNsYXZlIGluIHJlc3BvbnNlKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLml0ZW1zLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3ZWJfcGFnZXM6IHJlc3BvbnNlW2NsYXZlXVtcIndlYl9wYWdlc1wiXVswXSwgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvdW50cnk6IHJlc3BvbnNlW2NsYXZlXVtcImNvdW50cnlcIl0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IHJlc3BvbnNlW2NsYXZlXVtcIm5hbWVcIl1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHRoaXMuaXRlbXMpIClcclxuICAgICAgICAgICAgICAgIHJlc29sdmUodGhpcy5pdGVtcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfSwgZXJyb3IgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoZXJyb3IpIClcclxuICAgICAgICAgICAgICAgIHJlamVjdChcIk5PIHNlIG9idGl2dWllcm9uIGRhdG9zIChTZXJ2aWNvaW8pXCIpXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEFsbFVuaXZlcnNpZGFkKCkge1xyXG4gICAgICAgIHRoaXMuaXRlbXM9IFtdO1xyXG4gICAgICAgIHRoaXMuaHR0cC5nZXQoXCJodHRwOi8vdW5pdmVyc2l0aWVzLmhpcG9sYWJzLmNvbS9zZWFyY2g/bmFtZT1cIiArIHRoaXMudW5pdmVyc2lkYWQpXHJcbiAgICAgICAgICAgIC5waXBlKFxyXG4gICAgICAgICAgICAgICAgbWFwKHJlcyA9PiByZXMuanNvbigpKVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKHJlc3BvbnNlOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgY2xhdmUgaW4gcmVzcG9uc2Upe1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLml0ZW1zLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3ZWJfcGFnZXM6IHJlc3BvbnNlW2NsYXZlXVtcIndlYl9wYWdlc1wiXVswXSwgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvdW50cnk6IHJlc3BvbnNlW2NsYXZlXVtcImNvdW50cnlcIl0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IHJlc3BvbnNlW2NsYXZlXVtcIm5hbWVcIl1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgIH0sIGVycm9yID0+IGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KGVycm9yKSApKTtcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBnZXRVbml2ZXJzaWRhZENpdWRhZCgpIHtcclxuICAgICAgICBcclxuICAgICAgIFxyXG4gICAgfVxyXG59XHJcbiJdfQ==