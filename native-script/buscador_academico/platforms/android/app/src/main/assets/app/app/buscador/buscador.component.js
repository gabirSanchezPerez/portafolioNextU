"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Geolocation = require("nativescript-geolocation");
var buscador_service_1 = require("../servicios/buscador.service");
var BuscadorComponent = /** @class */ (function () {
    function BuscadorComponent(buscadorService, zone) {
        this.buscadorService = buscadorService;
        this.zone = zone;
        this.miUbicacion = {
            latitud: 0,
            longitud: 0,
            altitud: 0,
            zoom: 0,
            bearing: 0,
            tilt: 0,
            padding: [40, 40, 40, 40]
        };
        this.latitude = 0;
        this.longitude = 0;
        this.txtBuscar = "";
    }
    BuscadorComponent.prototype.buscarUniversiad = function () {
        console.log("---2 " + this.txtBuscar);
        this.items = this.buscadorService.getUniversidad("middle");
    };
    BuscadorComponent.prototype.getDeviceLocation = function () {
        return new Promise(function (resolve, reject) {
            console.log(46);
            Geolocation.enableLocationRequest().then(function () {
                console.log(49);
                Geolocation.getCurrentLocation({ desiredAccuracy: 3, timeout: 10000 })
                    .then(function (location) {
                    console.log(location);
                    resolve(location);
                }).catch(function (error) {
                    reject("Error 52 enableLocationRequest: " + error);
                });
            });
        });
    };
    BuscadorComponent.prototype.buscarme = function () {
        var _this = this;
        this.getDeviceLocation().then(function (result) {
            console.log(result);
            _this.latitude = result.latitude;
            _this.longitude = result.longitude;
        }, function (error) {
            console.error("Error 64 getDeviceLocation: " + error);
        });
    };
    BuscadorComponent = __decorate([
        core_1.Component({
            selector: "ns-buscador",
            moduleId: module.id,
            templateUrl: "./buscador.component.html",
        }),
        __metadata("design:paramtypes", [buscador_service_1.BuscadorService,
            core_1.NgZone])
    ], BuscadorComponent);
    return BuscadorComponent;
}());
exports.BuscadorComponent = BuscadorComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVzY2Fkb3IuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYnVzY2Fkb3IuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBQ2xELHNEQUF3RDtBQUd4RCxrRUFBZ0U7QUFRaEU7SUFnQkksMkJBQ1ksZUFBZ0MsRUFDaEMsSUFBWTtRQURaLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUNoQyxTQUFJLEdBQUosSUFBSSxDQUFRO1FBZnhCLGdCQUFXLEdBQWM7WUFDckIsT0FBTyxFQUFFLENBQUM7WUFDVixRQUFRLEVBQUUsQ0FBQztZQUNYLE9BQU8sRUFBRSxDQUFDO1lBQ1YsSUFBSSxFQUFFLENBQUM7WUFDUCxPQUFPLEVBQUUsQ0FBQztZQUNWLElBQUksRUFBRSxDQUFDO1lBQ1AsT0FBTyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDO1NBQzVCLENBQUE7UUFVRyxJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQztRQUNsQixJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQztRQUNuQixJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztJQUN4QixDQUFDO0lBRU0sNENBQWdCLEdBQXZCO1FBQ0ksT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEdBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3BDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDL0QsQ0FBQztJQUVPLDZDQUFpQixHQUF6QjtRQUNJLE9BQU8sSUFBSSxPQUFPLENBQUMsVUFBQyxPQUFPLEVBQUUsTUFBTTtZQUMzQixPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ3BCLFdBQVcsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDLElBQUksQ0FBQztnQkFDckMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDaEIsV0FBVyxDQUFDLGtCQUFrQixDQUFDLEVBQUMsZUFBZSxFQUFFLENBQUMsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFDLENBQUM7cUJBQ25FLElBQUksQ0FBQyxVQUFBLFFBQVE7b0JBQ1YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztvQkFDdEIsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUN0QixDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBQSxLQUFLO29CQUNWLE1BQU0sQ0FBQyxrQ0FBa0MsR0FBRyxLQUFLLENBQUMsQ0FBQztnQkFDdkQsQ0FBQyxDQUFDLENBQUM7WUFDUCxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVNLG9DQUFRLEdBQWY7UUFBQSxpQkFVQztRQVRHLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFBLE1BQU07WUFDaEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNwQixLQUFJLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUM7WUFDaEMsS0FBSSxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDO1FBQ3RDLENBQUMsRUFBRSxVQUFBLEtBQUs7WUFDSixPQUFPLENBQUMsS0FBSyxDQUFDLDhCQUE4QixHQUFHLEtBQUssQ0FBQyxDQUFDO1FBQzFELENBQUMsQ0FBQyxDQUFDO0lBR1AsQ0FBQztJQXpEUSxpQkFBaUI7UUFMN0IsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxhQUFhO1lBQ3ZCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixXQUFXLEVBQUUsMkJBQTJCO1NBQzNDLENBQUM7eUNBa0IrQixrQ0FBZTtZQUMxQixhQUFNO09BbEJmLGlCQUFpQixDQTJEN0I7SUFBRCx3QkFBQztDQUFBLEFBM0RELElBMkRDO0FBM0RZLDhDQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgTmdab25lIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0ICogYXMgR2VvbG9jYXRpb24gZnJvbSBcIm5hdGl2ZXNjcmlwdC1nZW9sb2NhdGlvblwiO1xyXG5cclxuaW1wb3J0IHsgQnVzY2FyIH0gZnJvbSBcIi4uL3NlcnZpY2lvcy9idXNjYWRvclwiO1xyXG5pbXBvcnQgeyBCdXNjYWRvclNlcnZpY2UgfSBmcm9tIFwiLi4vc2VydmljaW9zL2J1c2NhZG9yLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgVWJpY2FjaW9uIH0gZnJvbSBcIi4vdWJpY2FjaW9uXCI7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiBcIm5zLWJ1c2NhZG9yXCIsXHJcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxyXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9idXNjYWRvci5jb21wb25lbnQuaHRtbFwiLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgQnVzY2Fkb3JDb21wb25lbnQge1xyXG4gICAgaXRlbXM6IEJ1c2NhcltdO1xyXG4gICAgcHVibGljIHR4dEJ1c2Nhcjogc3RyaW5nO1xyXG4gICAgbWlVYmljYWNpb246IFViaWNhY2lvbiA9IHtcclxuICAgICAgICBsYXRpdHVkOiAwLFxyXG4gICAgICAgIGxvbmdpdHVkOiAwLFxyXG4gICAgICAgIGFsdGl0dWQ6IDAsXHJcbiAgICAgICAgem9vbTogMCxcclxuICAgICAgICBiZWFyaW5nOiAwLFxyXG4gICAgICAgIHRpbHQ6IDAsXHJcbiAgICAgICAgcGFkZGluZzogWzQwLCA0MCwgNDAsIDQwXVxyXG4gICAgfVxyXG4gICAgcHVibGljIGxhdGl0dWRlOiBudW1iZXI7XHJcbiAgICBwdWJsaWMgbG9uZ2l0dWRlOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIHdhdGNoSWQ6IG51bWJlcjtcclxuXHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHJpdmF0ZSBidXNjYWRvclNlcnZpY2U6IEJ1c2NhZG9yU2VydmljZSwgXHJcbiAgICAgICAgcHJpdmF0ZSB6b25lOiBOZ1pvbmVcclxuICAgICAgICApIHsgXHJcblxyXG4gICAgICAgIHRoaXMubGF0aXR1ZGUgPSAwO1xyXG4gICAgICAgIHRoaXMubG9uZ2l0dWRlID0gMDtcclxuICAgICAgICB0aGlzLnR4dEJ1c2NhciA9IFwiXCI7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGJ1c2NhclVuaXZlcnNpYWQoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCItLS0yIFwiK3RoaXMudHh0QnVzY2FyKTtcclxuICAgICAgICB0aGlzLml0ZW1zID0gdGhpcy5idXNjYWRvclNlcnZpY2UuZ2V0VW5pdmVyc2lkYWQoXCJtaWRkbGVcIik7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXREZXZpY2VMb2NhdGlvbigpOiBQcm9taXNlPGFueT4ge1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyg0Nik7XHJcbiAgICAgICAgICAgIEdlb2xvY2F0aW9uLmVuYWJsZUxvY2F0aW9uUmVxdWVzdCgpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coNDkpO1xyXG4gICAgICAgICAgICAgICAgR2VvbG9jYXRpb24uZ2V0Q3VycmVudExvY2F0aW9uKHtkZXNpcmVkQWNjdXJhY3k6IDMsIHRpbWVvdXQ6IDEwMDAwfSlcclxuICAgICAgICAgICAgICAgIC50aGVuKGxvY2F0aW9uID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhsb2NhdGlvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShsb2NhdGlvbik7XHJcbiAgICAgICAgICAgICAgICB9KS5jYXRjaChlcnJvciA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KFwiRXJyb3IgNTIgZW5hYmxlTG9jYXRpb25SZXF1ZXN0OiBcIiArIGVycm9yKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYnVzY2FybWUgKCkge1xyXG4gICAgICAgIHRoaXMuZ2V0RGV2aWNlTG9jYXRpb24oKS50aGVuKHJlc3VsdCA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdCk7XHJcbiAgICAgICAgICAgIHRoaXMubGF0aXR1ZGUgPSByZXN1bHQubGF0aXR1ZGU7XHJcbiAgICAgICAgICAgIHRoaXMubG9uZ2l0dWRlID0gcmVzdWx0LmxvbmdpdHVkZTtcclxuICAgICAgICB9LCBlcnJvciA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciA2NCBnZXREZXZpY2VMb2NhdGlvbjogXCIgKyBlcnJvcik7XHJcbiAgICAgICAgfSk7XHJcbiBcclxuXHJcbiAgICB9XHJcblxyXG59Il19