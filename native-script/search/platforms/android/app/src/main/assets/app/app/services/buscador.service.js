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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVzY2Fkb3Iuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImJ1c2NhZG9yLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkM7QUFDM0Msc0NBQXFDO0FBQ3JDLDRDQUFxQztBQU9yQztJQUtJLHlCQUFvQixJQUFVO1FBQVYsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUp0QixVQUFLLEdBQUcsSUFBSSxLQUFLO1FBQ3JCLGtGQUFrRjtTQUNyRixDQUFDO0lBRWdDLENBQUM7SUFFbkMsa0NBQVEsR0FBUjtRQUNJLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztJQUN0QixDQUFDO0lBRUQsaUNBQU8sR0FBUCxVQUFRLElBQVk7UUFDaEIsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxVQUFBLElBQUksSUFBSSxPQUFBLElBQUksQ0FBQyxJQUFJLEtBQUssSUFBSSxFQUFsQixDQUFrQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDNUQsQ0FBQztJQUVELHdDQUFjLEdBQWQsVUFBZSxJQUFZO1FBQTNCLGlCQW9CQztRQWxCRyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQywrQ0FBK0MsR0FBRyxJQUFJLENBQUM7YUFDaEUsSUFBSSxDQUNELGVBQUcsQ0FBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLEdBQUcsQ0FBQyxJQUFJLEVBQUUsRUFBVixDQUFVLENBQUMsQ0FDekI7YUFDQSxTQUFTLENBQUMsVUFBQyxRQUFhO1lBRXJCLEtBQUssSUFBSSxLQUFLLElBQUksUUFBUSxFQUFDO2dCQUV2QixLQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQztvQkFDWixTQUFTLEVBQUUsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDMUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxTQUFTLENBQUM7b0JBQ25DLElBQUksRUFBRSxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDO2lCQUNoQyxDQUFDLENBQUM7YUFDTjtRQUVULENBQUMsRUFBRSxVQUFBLEtBQUssSUFBSSxPQUFBLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBRSxFQUFuQyxDQUFtQyxDQUFDLENBQUM7UUFDakQsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBRXRCLENBQUM7SUFuQ1EsZUFBZTtRQUgzQixpQkFBVSxDQUFDO1lBQ1IsVUFBVSxFQUFFLE1BQU07U0FDckIsQ0FBQzt5Q0FNNEIsV0FBSTtPQUxyQixlQUFlLENBb0MzQjtJQUFELHNCQUFDO0NBQUEsQUFwQ0QsSUFvQ0M7QUFwQ1ksMENBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgSHR0cCB9IGZyb20gXCJAYW5ndWxhci9odHRwXCI7XHJcbmltcG9ydCB7IG1hcCB9IGZyb20gXCJyeGpzL29wZXJhdG9yc1wiO1xyXG5cclxuaW1wb3J0IHsgQnVzY2FySW50ZXJmYWNlIH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvYnVzY2Fkb3IuaW50ZXJmYWNlXCI7XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgICBwcm92aWRlZEluOiBcInJvb3RcIlxyXG59KVxyXG5leHBvcnQgY2xhc3MgQnVzY2Fkb3JTZXJ2aWNlIHtcclxuICAgIHByaXZhdGUgaXRlbXMgPSBuZXcgQXJyYXk8QnVzY2FySW50ZXJmYWNlPihcclxuICAgICAgICAvLyB7IG5hbWU6IFwiVGVyIFN0ZWdlblwiLCBjb3VudHJ5OiBcIkdvYWxrZWVwZXJcIiwgd2ViX3BhZ2VzOiBcImh0dHBzOi8vZ29vZ2xlLmNvbVwiIH0sXHJcbiAgICApO1xyXG4gICAgXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6IEh0dHApIHsgfVxyXG5cclxuICAgIGdldEl0ZW1zKCk6IEJ1c2NhckludGVyZmFjZVtdIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5pdGVtcztcclxuICAgIH1cclxuXHJcbiAgICBnZXRJdGVtKG5hbWU6IHN0cmluZyk6IEJ1c2NhckludGVyZmFjZSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaXRlbXMuZmlsdGVyKGl0ZW0gPT4gaXRlbS5uYW1lID09PSBuYW1lKVswXTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRVbml2ZXJzaWRhZChuYW1lOiBzdHJpbmcpOiBCdXNjYXJJbnRlcmZhY2VbXSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5odHRwLmdldChcImh0dHA6Ly91bml2ZXJzaXRpZXMuaGlwb2xhYnMuY29tL3NlYXJjaD9uYW1lPVwiICsgbmFtZSlcclxuICAgICAgICAgICAgLnBpcGUoXHJcbiAgICAgICAgICAgICAgICBtYXAocmVzID0+IHJlcy5qc29uKCkpXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICAgICAgLnN1YnNjcmliZSgocmVzcG9uc2U6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBjbGF2ZSBpbiByZXNwb25zZSl7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXRlbXMucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdlYl9wYWdlczogcmVzcG9uc2VbY2xhdmVdW1wid2ViX3BhZ2VzXCJdWzBdLCAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgY291bnRyeTogcmVzcG9uc2VbY2xhdmVdW1wiY291bnRyeVwiXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogcmVzcG9uc2VbY2xhdmVdW1wibmFtZVwiXVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgfSwgZXJyb3IgPT4gY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoZXJyb3IpICkpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLml0ZW1zO1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG59XHJcbiJdfQ==