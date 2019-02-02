"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var buscador_service_1 = require("../servicios/buscador.service");
var BuscadorComponent = /** @class */ (function () {
    function BuscadorComponent(buscadorService) {
        this.buscadorService = buscadorService;
    }
    BuscadorComponent.prototype.ngOnInit = function () {
    };
    BuscadorComponent.prototype.buscarUniversiad = function () {
        this.items = this.buscadorService.getUniversidad("middle");
    };
    BuscadorComponent.prototype.buscarme = function () {
    };
    BuscadorComponent = __decorate([
        core_1.Component({
            selector: "ns-buscador",
            moduleId: module.id,
            templateUrl: "./buscador.component.html",
        }),
        __metadata("design:paramtypes", [buscador_service_1.BuscadorService])
    ], BuscadorComponent);
    return BuscadorComponent;
}());
exports.BuscadorComponent = BuscadorComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVzY2Fkb3IuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYnVzY2Fkb3IuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBR2xELGtFQUFnRTtBQU9oRTtJQUdJLDJCQUFvQixlQUFnQztRQUFoQyxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7SUFBSSxDQUFDO0lBRXpELG9DQUFRLEdBQVI7SUFHQSxDQUFDO0lBRUQsNENBQWdCLEdBQWhCO1FBQ0ksSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUMvRCxDQUFDO0lBRUQsb0NBQVEsR0FBUjtJQUVBLENBQUM7SUFoQlEsaUJBQWlCO1FBTDdCLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsYUFBYTtZQUN2QixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsV0FBVyxFQUFFLDJCQUEyQjtTQUMzQyxDQUFDO3lDQUl1QyxrQ0FBZTtPQUgzQyxpQkFBaUIsQ0FpQjdCO0lBQUQsd0JBQUM7Q0FBQSxBQWpCRCxJQWlCQztBQWpCWSw4Q0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcblxyXG5pbXBvcnQgeyBCdXNjYXIgfSBmcm9tIFwiLi4vc2VydmljaW9zL2J1c2NhZG9yXCI7XHJcbmltcG9ydCB7IEJ1c2NhZG9yU2VydmljZSB9IGZyb20gXCIuLi9zZXJ2aWNpb3MvYnVzY2Fkb3Iuc2VydmljZVwiO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogXCJucy1idXNjYWRvclwiLFxyXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuICAgIHRlbXBsYXRlVXJsOiBcIi4vYnVzY2Fkb3IuY29tcG9uZW50Lmh0bWxcIixcclxufSlcclxuZXhwb3J0IGNsYXNzIEJ1c2NhZG9yQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICAgIGl0ZW1zOiBCdXNjYXJbXTtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGJ1c2NhZG9yU2VydmljZTogQnVzY2Fkb3JTZXJ2aWNlKSB7IH1cclxuXHJcbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgICAgICBcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBidXNjYXJVbml2ZXJzaWFkKCkge1xyXG4gICAgICAgIHRoaXMuaXRlbXMgPSB0aGlzLmJ1c2NhZG9yU2VydmljZS5nZXRVbml2ZXJzaWRhZChcIm1pZGRsZVwiKTtcclxuICAgIH1cclxuXHJcbiAgICBidXNjYXJtZSAoKSB7XHJcblxyXG4gICAgfVxyXG59Il19