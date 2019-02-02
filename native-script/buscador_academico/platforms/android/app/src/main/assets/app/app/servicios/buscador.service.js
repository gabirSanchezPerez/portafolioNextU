"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var operators_1 = require("rxjs/operators");
var BuscadorService = /** @class */ (function () {
    function BuscadorService(http) {
        this.http = http;
        this.items = new Array(
        // { name: "Ter Stegen", country: "Goalkeeper", web_pages: "https://google.com" },
        );
    }
    BuscadorService.prototype.getItems = function () {
        return this.items;
    };
    BuscadorService.prototype.getItem = function (name) {
        return this.items.filter(function (item) { return item.name === name; })[0];
    };
    BuscadorService.prototype.getUniversidad = function (name) {
        var _this = this;
        this.http.get("http://universities.hipolabs.com/search?name=" + name)
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVzY2Fkb3Iuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImJ1c2NhZG9yLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkM7QUFDM0Msc0NBQXFDO0FBQ3JDLDRDQUFxQztBQU9yQztJQUtJLHlCQUFvQixJQUFVO1FBQVYsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUp0QixVQUFLLEdBQUcsSUFBSSxLQUFLO1FBQ3JCLGtGQUFrRjtTQUNyRixDQUFDO0lBRWdDLENBQUM7SUFFbkMsa0NBQVEsR0FBUjtRQUNJLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztJQUN0QixDQUFDO0lBRUQsaUNBQU8sR0FBUCxVQUFRLElBQVk7UUFDaEIsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxVQUFBLElBQUksSUFBSSxPQUFBLElBQUksQ0FBQyxJQUFJLEtBQUssSUFBSSxFQUFsQixDQUFrQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDNUQsQ0FBQztJQUVELHdDQUFjLEdBQWQsVUFBZSxJQUFZO1FBQTNCLGlCQW9CQztRQWxCRyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQywrQ0FBK0MsR0FBRyxJQUFJLENBQUM7YUFDaEUsSUFBSSxDQUNELGVBQUcsQ0FBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLEdBQUcsQ0FBQyxJQUFJLEVBQUUsRUFBVixDQUFVLENBQUMsQ0FDekI7YUFDQSxTQUFTLENBQUMsVUFBQyxRQUFhO1lBRXJCLEtBQUssSUFBSSxLQUFLLElBQUksUUFBUSxFQUFDO2dCQUV2QixLQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQztvQkFDWixTQUFTLEVBQUUsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDMUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxTQUFTLENBQUM7b0JBQ25DLElBQUksRUFBRSxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDO2lCQUNoQyxDQUFDLENBQUM7YUFDTjtRQUVULENBQUMsRUFBRSxVQUFBLEtBQUssSUFBSSxPQUFBLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBRSxFQUFuQyxDQUFtQyxDQUFDLENBQUM7UUFDakQsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBRXRCLENBQUM7SUFuQ1EsZUFBZTtRQUgzQixpQkFBVSxDQUFDO1lBQ1IsVUFBVSxFQUFFLE1BQU07U0FDckIsQ0FBQzt5Q0FNNEIsV0FBSTtPQUxyQixlQUFlLENBb0MzQjtJQUFELHNCQUFDO0NBQUEsQUFwQ0QsSUFvQ0M7QUFwQ1ksMENBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgSHR0cCB9IGZyb20gXCJAYW5ndWxhci9odHRwXCI7XHJcbmltcG9ydCB7IG1hcCB9IGZyb20gXCJyeGpzL29wZXJhdG9yc1wiO1xyXG5cclxuaW1wb3J0IHsgQnVzY2FyIH0gZnJvbSBcIi4vYnVzY2Fkb3JcIjtcclxuXHJcbkBJbmplY3RhYmxlKHtcclxuICAgIHByb3ZpZGVkSW46IFwicm9vdFwiXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBCdXNjYWRvclNlcnZpY2Uge1xyXG4gICAgcHJpdmF0ZSBpdGVtcyA9IG5ldyBBcnJheTxCdXNjYXI+KFxyXG4gICAgICAgIC8vIHsgbmFtZTogXCJUZXIgU3RlZ2VuXCIsIGNvdW50cnk6IFwiR29hbGtlZXBlclwiLCB3ZWJfcGFnZXM6IFwiaHR0cHM6Ly9nb29nbGUuY29tXCIgfSxcclxuICAgICk7XHJcbiAgICBcclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cCkgeyB9XHJcblxyXG4gICAgZ2V0SXRlbXMoKTogQnVzY2FyW10ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLml0ZW1zO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEl0ZW0obmFtZTogc3RyaW5nKTogQnVzY2FyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5pdGVtcy5maWx0ZXIoaXRlbSA9PiBpdGVtLm5hbWUgPT09IG5hbWUpWzBdO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFVuaXZlcnNpZGFkKG5hbWU6IHN0cmluZyk6IEJ1c2NhcltdIHtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLmh0dHAuZ2V0KFwiaHR0cDovL3VuaXZlcnNpdGllcy5oaXBvbGFicy5jb20vc2VhcmNoP25hbWU9XCIgKyBuYW1lKVxyXG4gICAgICAgICAgICAucGlwZShcclxuICAgICAgICAgICAgICAgIG1hcChyZXMgPT4gcmVzLmpzb24oKSlcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChyZXNwb25zZTogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGNsYXZlIGluIHJlc3BvbnNlKXtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pdGVtcy5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2ViX3BhZ2VzOiByZXNwb25zZVtjbGF2ZV1bXCJ3ZWJfcGFnZXNcIl1bMF0sICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb3VudHJ5OiByZXNwb25zZVtjbGF2ZV1bXCJjb3VudHJ5XCJdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiByZXNwb25zZVtjbGF2ZV1bXCJuYW1lXCJdXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICB9LCBlcnJvciA9PiBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShlcnJvcikgKSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaXRlbXM7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcbn1cclxuIl19