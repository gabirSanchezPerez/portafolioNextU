"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var operators_1 = require("rxjs/operators");
var BuscadorService = /** @class */ (function () {
    function BuscadorService(http) {
        this.http = http;
        this.items = new Array();
    }
    BuscadorService.prototype.getUniversidad = function () {
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
        return this.items;
    };
    BuscadorService.prototype.getUniversidadCiudad = function () {
        var _this = this;
        this.items = [];
        this.http.get("http://universities.hipolabs.com/search?name=" + this.universidad + "&country=" + this.ciudad)
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
        return this.items;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVzY2Fkb3Iuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImJ1c2NhZG9yLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkM7QUFDM0Msc0NBQXFDO0FBQ3JDLDRDQUFxQztBQU9yQztJQUtJLHlCQUFvQixJQUFVO1FBQVYsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUZ0QixVQUFLLEdBQUcsSUFBSSxLQUFLLEVBQW9CLENBQUM7SUFFWixDQUFDO0lBRW5DLHdDQUFjLEdBQWQ7UUFBQSxpQkFvQkM7UUFuQkcsSUFBSSxDQUFDLEtBQUssR0FBRSxFQUFFLENBQUM7UUFDZixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQywrQ0FBK0MsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO2FBQzVFLElBQUksQ0FDRCxlQUFHLENBQUMsVUFBQSxHQUFHLElBQUksT0FBQSxHQUFHLENBQUMsSUFBSSxFQUFFLEVBQVYsQ0FBVSxDQUFDLENBQ3pCO2FBQ0EsU0FBUyxDQUFDLFVBQUMsUUFBYTtZQUVyQixLQUFLLElBQUksS0FBSyxJQUFJLFFBQVEsRUFBQztnQkFFdkIsS0FBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7b0JBQ1osU0FBUyxFQUFFLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQzFDLE9BQU8sRUFBRSxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsU0FBUyxDQUFDO29CQUNuQyxJQUFJLEVBQUUsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sQ0FBQztpQkFDaEMsQ0FBQyxDQUFDO2FBQ047UUFFVCxDQUFDLEVBQUUsVUFBQSxLQUFLLElBQUksT0FBQSxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUUsRUFBbkMsQ0FBbUMsQ0FBQyxDQUFDO1FBQ2pELE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztJQUV0QixDQUFDO0lBRUQsOENBQW9CLEdBQXBCO1FBQUEsaUJBb0JDO1FBbkJHLElBQUksQ0FBQyxLQUFLLEdBQUUsRUFBRSxDQUFDO1FBQ2YsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsK0NBQStDLEdBQUcsSUFBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQzthQUN4RyxJQUFJLENBQ0QsZUFBRyxDQUFDLFVBQUEsR0FBRyxJQUFJLE9BQUEsR0FBRyxDQUFDLElBQUksRUFBRSxFQUFWLENBQVUsQ0FBQyxDQUN6QjthQUNBLFNBQVMsQ0FBQyxVQUFDLFFBQWE7WUFFckIsS0FBSyxJQUFJLEtBQUssSUFBSSxRQUFRLEVBQUM7Z0JBRXZCLEtBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO29CQUNaLFNBQVMsRUFBRSxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUMxQyxPQUFPLEVBQUUsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLFNBQVMsQ0FBQztvQkFDbkMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLENBQUM7aUJBQ2hDLENBQUMsQ0FBQzthQUNOO1FBRVQsQ0FBQyxFQUFFLFVBQUEsS0FBSyxJQUFJLE9BQUEsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFFLEVBQW5DLENBQW1DLENBQUMsQ0FBQztRQUNqRCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7SUFFdEIsQ0FBQztJQWpEUSxlQUFlO1FBSDNCLGlCQUFVLENBQUM7WUFDUixVQUFVLEVBQUUsTUFBTTtTQUNyQixDQUFDO3lDQU00QixXQUFJO09BTHJCLGVBQWUsQ0FrRDNCO0lBQUQsc0JBQUM7Q0FBQSxBQWxERCxJQWtEQztBQWxEWSwwQ0FBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBIdHRwIH0gZnJvbSBcIkBhbmd1bGFyL2h0dHBcIjtcclxuaW1wb3J0IHsgbWFwIH0gZnJvbSBcInJ4anMvb3BlcmF0b3JzXCI7XHJcblxyXG5pbXBvcnQgeyBCdXNjYXJJbnRlcmZhY2UgfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9idXNjYWRvci5pbnRlcmZhY2VcIjtcclxuXHJcbkBJbmplY3RhYmxlKHtcclxuICAgIHByb3ZpZGVkSW46IFwicm9vdFwiXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBCdXNjYWRvclNlcnZpY2Uge1xyXG4gICAgcHVibGljIGNpdWRhZDogc3RyaW5nO1xyXG4gICAgcHVibGljIHVuaXZlcnNpZGFkOiBzdHJpbmc7XHJcbiAgICBwcml2YXRlIGl0ZW1zID0gbmV3IEFycmF5PEJ1c2NhckludGVyZmFjZT4oICk7XHJcbiAgICBcclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cCkgeyB9XHJcblxyXG4gICAgZ2V0VW5pdmVyc2lkYWQoKTogQnVzY2FySW50ZXJmYWNlW10ge1xyXG4gICAgICAgIHRoaXMuaXRlbXM9IFtdO1xyXG4gICAgICAgIHRoaXMuaHR0cC5nZXQoXCJodHRwOi8vdW5pdmVyc2l0aWVzLmhpcG9sYWJzLmNvbS9zZWFyY2g/bmFtZT1cIiArIHRoaXMudW5pdmVyc2lkYWQpXHJcbiAgICAgICAgICAgIC5waXBlKFxyXG4gICAgICAgICAgICAgICAgbWFwKHJlcyA9PiByZXMuanNvbigpKVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKHJlc3BvbnNlOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgY2xhdmUgaW4gcmVzcG9uc2Upe1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLml0ZW1zLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3ZWJfcGFnZXM6IHJlc3BvbnNlW2NsYXZlXVtcIndlYl9wYWdlc1wiXVswXSwgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvdW50cnk6IHJlc3BvbnNlW2NsYXZlXVtcImNvdW50cnlcIl0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IHJlc3BvbnNlW2NsYXZlXVtcIm5hbWVcIl1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgIH0sIGVycm9yID0+IGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KGVycm9yKSApKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5pdGVtcztcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBnZXRVbml2ZXJzaWRhZENpdWRhZCgpIDogQnVzY2FySW50ZXJmYWNlW10ge1xyXG4gICAgICAgIHRoaXMuaXRlbXM9IFtdO1xyXG4gICAgICAgIHRoaXMuaHR0cC5nZXQoXCJodHRwOi8vdW5pdmVyc2l0aWVzLmhpcG9sYWJzLmNvbS9zZWFyY2g/bmFtZT1cIiArIHRoaXMudW5pdmVyc2lkYWQgKyBcIiZjb3VudHJ5PVwiICsgdGhpcy5jaXVkYWQpXHJcbiAgICAgICAgICAgIC5waXBlKFxyXG4gICAgICAgICAgICAgICAgbWFwKHJlcyA9PiByZXMuanNvbigpKVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKHJlc3BvbnNlOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgY2xhdmUgaW4gcmVzcG9uc2Upe1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLml0ZW1zLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3ZWJfcGFnZXM6IHJlc3BvbnNlW2NsYXZlXVtcIndlYl9wYWdlc1wiXVswXSwgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvdW50cnk6IHJlc3BvbnNlW2NsYXZlXVtcImNvdW50cnlcIl0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IHJlc3BvbnNlW2NsYXZlXVtcIm5hbWVcIl1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgIH0sIGVycm9yID0+IGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KGVycm9yKSApKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5pdGVtcztcclxuICAgICAgICBcclxuICAgIH1cclxufVxyXG4iXX0=