"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Geolocation = require("nativescript-geolocation");
var buscador_service_1 = require("../services/buscador.service");
var localizar_service_1 = require("../services/localizar.service");
// import { setInterval, clearInterval } from 'timer';
var dialogs = require("ui/dialogs");
var page_1 = require("ui/page");
var SearchComponent = /** @class */ (function () {
    function SearchComponent(zone, buscadorService, page, localizarService) {
        this.zone = zone;
        this.buscadorService = buscadorService;
        this.page = page;
        this.localizarService = localizarService;
        this.miUbicacion = {
            latitud: 0,
            longitud: 0,
            altitud: 0,
            zoom: 0,
            bearing: 0,
            tilt: 0,
            padding: [40, 40, 40, 40]
        };
        this.universidad = "";
        this.page = page;
        this.cargando = true;
        this.dondeBuscar = "";
    }
    SearchComponent.prototype.ngOnInit = function () {
        this.cargando = true;
        this.txtCargando = "Buscando coordenadas";
        this.obtenerCoordenadas();
    };
    // Localización
    SearchComponent.prototype.getDeviceLocation = function () {
        return new Promise(function (resolve, reject) {
            Geolocation.enableLocationRequest().then(function () {
                Geolocation.getCurrentLocation({ timeout: 10000 }).then(function (location) {
                    console.log("Ubicacion: " + JSON.stringify(location));
                    resolve(location);
                }).catch(function (error) {
                    console.log("Error: " + error);
                    reject(error);
                });
            });
        });
    };
    SearchComponent.prototype.obtenerCoordenadas = function () {
        var _this = this;
        this.getDeviceLocation().then(function (location) {
            _this.txtCargando = "Buscando Ciudad";
            _this.localizarService.getCiudad(location.latitude, location.longitude);
            _this.cargando = false;
            _this.miUbicacion = {
                latitud: location.latitude,
                longitud: location.longitude,
                altitud: 0,
                zoom: 0,
                bearing: 0,
                tilt: 0,
                padding: [40, 40, 40, 40]
            };
        }, function (error) {
            console.error("updateLocation: " + error);
        });
    };
    SearchComponent.prototype.startWatchingLocation = function () {
        var _this = this;
        this.watchId = Geolocation.watchLocation(function (location) {
            if (location) {
                _this.zone.run(function () {
                    _this.miUbicacion = {
                        latitud: location.latitude,
                        longitud: location.longitude,
                        altitud: 0,
                        zoom: 0,
                        bearing: 0,
                        tilt: 0,
                        padding: [40, 40, 40, 40]
                    };
                });
            }
        }, function (error) {
            console.log(error);
        }, { updateDistance: 1, minimumUpdateTime: 1000 });
    };
    SearchComponent.prototype.stopWatchingLocation = function () {
        if (this.watchId) {
            Geolocation.clearWatch(this.watchId);
            this.watchId = null;
        }
    };
    // Universidad
    SearchComponent.prototype.buscarUniversiad = function () {
        this.cargando = true;
        this.txtCargando = "Buscando Universidad";
        this.buscadorService.universidad = this.page.getViewById("universidad").text;
        if (this.dondeBuscar == "") {
            this.items = this.buscadorService.getUniversidad();
        }
        else {
            this.buscadorService.ciudad = this.localizarService.ciudad;
            this.items = this.buscadorService.getUniversidadCiudad();
        }
        console.log(this.items);
        // this.cargando = false;
    };
    SearchComponent.prototype.mostrarOpcionesUbicarme = function () {
        var opciones = {
            message: "Tu ubicación es: " + this.localizarService.ciudad,
            cancelButtonText: "Cancelar",
            actions: ["Buscar en mi ubicación", "Buscar en todo el mundo"]
        };
        this.mostrarDialogo(opciones);
    };
    SearchComponent.prototype.mostrarDialogo = function (opciones) {
        var _this = this;
        dialogs.action(opciones)
            .then(function (result) {
            console.log("Dialog result: " + result);
            if (result == "Buscar en mi ubicación") {
                _this.dondeBuscar = _this.localizarService.ciudad;
            }
            else if (result == "Buscar en todo el mundo") {
                _this.dondeBuscar = "";
            }
        });
    };
    SearchComponent = __decorate([
        core_1.Component({
            selector: "ns-search",
            moduleId: module.id,
            templateUrl: "./search.component.html"
        }),
        __metadata("design:paramtypes", [core_1.NgZone, buscador_service_1.BuscadorService, page_1.Page, localizar_service_1.LocalizarService])
    ], SearchComponent);
    return SearchComponent;
}());
exports.SearchComponent = SearchComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNlYXJjaC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMEQ7QUFDMUQsc0RBQXdEO0FBRXhELGlFQUErRDtBQUMvRCxtRUFBaUU7QUFLakUsc0RBQXNEO0FBQ3RELG9DQUFzQztBQUN0QyxnQ0FBK0I7QUFRL0I7SUFrQkkseUJBQTJCLElBQVksRUFBVSxlQUFnQyxFQUFVLElBQVUsRUFBVSxnQkFBa0M7UUFBdEgsU0FBSSxHQUFKLElBQUksQ0FBUTtRQUFVLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUFVLFNBQUksR0FBSixJQUFJLENBQU07UUFBVSxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBYmpKLGdCQUFXLEdBQXVCO1lBQzlCLE9BQU8sRUFBRSxDQUFDO1lBQ1YsUUFBUSxFQUFFLENBQUM7WUFDWCxPQUFPLEVBQUUsQ0FBQztZQUNWLElBQUksRUFBRSxDQUFDO1lBQ1AsT0FBTyxFQUFFLENBQUM7WUFDVixJQUFJLEVBQUUsQ0FBQztZQUNQLE9BQU8sRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQztTQUM1QixDQUFBO1FBTUcsSUFBSSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUM7UUFDdEIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDakIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7UUFDckIsSUFBSSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUM7SUFDMUIsQ0FBQztJQUVELGtDQUFRLEdBQVI7UUFDSSxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztRQUNyQixJQUFJLENBQUMsV0FBVyxHQUFHLHNCQUFzQixDQUFDO1FBQzFDLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO0lBQzlCLENBQUM7SUFFRCxlQUFlO0lBQ1AsMkNBQWlCLEdBQXpCO1FB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d0IsRUFBQztnQkFDbEMsS0FBSSxDQUFDLFdBQVcsR0FBRyxLQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDO2FBQ25EO2lCQUFLLElBQUcsTUFBTSxJQUFJLHlCQUF5QixFQUFDO2dCQUN6QyxLQUFJLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQzthQUN6QjtRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQXRJUSxlQUFlO1FBTjNCLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsV0FBVztZQUNyQixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsV0FBVyxFQUFFLHlCQUF5QjtTQUN6QyxDQUFDO3lDQW9CbUMsYUFBTSxFQUEyQixrQ0FBZSxFQUFnQixXQUFJLEVBQTRCLG9DQUFnQjtPQWxCeEksZUFBZSxDQXVJM0I7SUFBRCxzQkFBQztDQUFBLEFBdklELElBdUlDO0FBdklZLDBDQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBOZ1pvbmUsIE9uSW5pdCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCAqIGFzIEdlb2xvY2F0aW9uIGZyb20gXCJuYXRpdmVzY3JpcHQtZ2VvbG9jYXRpb25cIjtcclxuXHJcbmltcG9ydCB7IEJ1c2NhZG9yU2VydmljZSB9IGZyb20gXCIuLi9zZXJ2aWNlcy9idXNjYWRvci5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IExvY2FsaXphclNlcnZpY2UgfSBmcm9tIFwiLi4vc2VydmljZXMvbG9jYWxpemFyLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgQnVzY2FySW50ZXJmYWNlIH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvYnVzY2Fkb3IuaW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFViaWNhY2lvbkludGVyZmFjZSB9IGZyb20gXCIuLi9pbnRlcmZhY2VzL3ViaWNhY2lvbi5pbnRlcmZhY2VcIjtcclxuXHJcbmltcG9ydCB7IFRleHRGaWVsZCB9IGZyb20gJ3VpL3RleHQtZmllbGQnO1xyXG4vLyBpbXBvcnQgeyBzZXRJbnRlcnZhbCwgY2xlYXJJbnRlcnZhbCB9IGZyb20gJ3RpbWVyJztcclxuaW1wb3J0ICogYXMgZGlhbG9ncyBmcm9tIFwidWkvZGlhbG9nc1wiO1xyXG5pbXBvcnQgeyBQYWdlIH0gZnJvbSBcInVpL3BhZ2VcIjtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6IFwibnMtc2VhcmNoXCIsXHJcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxyXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9zZWFyY2guY29tcG9uZW50Lmh0bWxcIlxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIFNlYXJjaENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcblxyXG4gICAgcHVibGljIHVuaXZlcnNpZGFkOiBzdHJpbmc7XHJcbiAgICBwcml2YXRlIHdhdGNoSWQ6IG51bWJlcjtcclxuICAgIGl0ZW1zOiBCdXNjYXJJbnRlcmZhY2VbXTtcclxuICAgIG1pVWJpY2FjaW9uOiBVYmljYWNpb25JbnRlcmZhY2UgPSB7XHJcbiAgICAgICAgbGF0aXR1ZDogMCxcclxuICAgICAgICBsb25naXR1ZDogMCxcclxuICAgICAgICBhbHRpdHVkOiAwLFxyXG4gICAgICAgIHpvb206IDAsXHJcbiAgICAgICAgYmVhcmluZzogMCxcclxuICAgICAgICB0aWx0OiAwLFxyXG4gICAgICAgIHBhZGRpbmc6IFs0MCwgNDAsIDQwLCA0MF1cclxuICAgIH1cclxuICAgIHByaXZhdGUgY2FyZ2FuZG86IGJvb2xlYW47XHJcbiAgICBwdWJsaWMgdHh0Q2FyZ2FuZG86IHN0cmluZztcclxuICAgIHByaXZhdGUgZG9uZGVCdXNjYXI6IHN0cmluZztcclxuXHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IocHJpdmF0ZSB6b25lOiBOZ1pvbmUsIHByaXZhdGUgYnVzY2Fkb3JTZXJ2aWNlOiBCdXNjYWRvclNlcnZpY2UsIHByaXZhdGUgcGFnZTogUGFnZSwgcHJpdmF0ZSBsb2NhbGl6YXJTZXJ2aWNlOiBMb2NhbGl6YXJTZXJ2aWNlICkge1xyXG4gICAgICAgIHRoaXMudW5pdmVyc2lkYWQgPSBcIlwiO1xyXG4gICAgICAgIHRoaXMucGFnZSA9IHBhZ2U7XHJcbiAgICAgICAgdGhpcy5jYXJnYW5kbyA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5kb25kZUJ1c2NhciA9IFwiXCI7XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5jYXJnYW5kbyA9IHRydWU7XHJcbiAgICAgICAgdGhpcy50eHRDYXJnYW5kbyA9IFwiQnVzY2FuZG8gY29vcmRlbmFkYXNcIjtcclxuICAgICAgICB0aGlzLm9idGVuZXJDb29yZGVuYWRhcygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIExvY2FsaXphY2nDs25cclxuICAgIHByaXZhdGUgZ2V0RGV2aWNlTG9jYXRpb24oKTogUHJvbWlzZTxhbnk+IHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICBHZW9sb2NhdGlvbi5lbmFibGVMb2NhdGlvblJlcXVlc3QoKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIEdlb2xvY2F0aW9uLmdldEN1cnJlbnRMb2NhdGlvbih7dGltZW91dDogMTAwMDB9KS50aGVuKGxvY2F0aW9uID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlViaWNhY2lvbjogXCIgKyBKU09OLnN0cmluZ2lmeShsb2NhdGlvbikpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUobG9jYXRpb24pO1xyXG4gICAgICAgICAgICAgICAgfSkuY2F0Y2goZXJyb3IgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3I6IFwiICtlcnJvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb2J0ZW5lckNvb3JkZW5hZGFzKCkge1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuZ2V0RGV2aWNlTG9jYXRpb24oKS50aGVuKGxvY2F0aW9uID0+IHtcclxuXHJcbiAgICAgICAgICAgIHRoaXMudHh0Q2FyZ2FuZG8gPSBcIkJ1c2NhbmRvIENpdWRhZFwiO1xyXG4gICAgICAgICAgICB0aGlzLmxvY2FsaXphclNlcnZpY2UuZ2V0Q2l1ZGFkKGxvY2F0aW9uLmxhdGl0dWRlLCBsb2NhdGlvbi5sb25naXR1ZGUpO1xyXG4gICAgICAgICAgICB0aGlzLmNhcmdhbmRvPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMubWlVYmljYWNpb24gPSB7XHJcbiAgICAgICAgICAgICAgICBsYXRpdHVkOiBsb2NhdGlvbi5sYXRpdHVkZSxcclxuICAgICAgICAgICAgICAgIGxvbmdpdHVkOiBsb2NhdGlvbi5sb25naXR1ZGUsXHJcbiAgICAgICAgICAgICAgICBhbHRpdHVkOiAwLFxyXG4gICAgICAgICAgICAgICAgem9vbTogMCxcclxuICAgICAgICAgICAgICAgIGJlYXJpbmc6IDAsXHJcbiAgICAgICAgICAgICAgICB0aWx0OiAwLFxyXG4gICAgICAgICAgICAgICAgcGFkZGluZzogWzQwLCA0MCwgNDAsIDQwXVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwgZXJyb3IgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwidXBkYXRlTG9jYXRpb246IFwiICsgZXJyb3IpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGFydFdhdGNoaW5nTG9jYXRpb24oKSB7XHJcbiAgICAgICAgdGhpcy53YXRjaElkID0gR2VvbG9jYXRpb24ud2F0Y2hMb2NhdGlvbihsb2NhdGlvbiA9PiB7XHJcbiAgICAgICAgICAgIGlmKGxvY2F0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnpvbmUucnVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1pVWJpY2FjaW9uID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsYXRpdHVkOiBsb2NhdGlvbi5sYXRpdHVkZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbG9uZ2l0dWQ6IGxvY2F0aW9uLmxvbmdpdHVkZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWx0aXR1ZDogMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgem9vbTogMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgYmVhcmluZzogMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGlsdDogMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGFkZGluZzogWzQwLCA0MCwgNDAsIDQwXVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwgZXJyb3IgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgICAgfSwgeyB1cGRhdGVEaXN0YW5jZTogMSwgbWluaW11bVVwZGF0ZVRpbWU6IDEwMDAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0b3BXYXRjaGluZ0xvY2F0aW9uKCkge1xyXG4gICAgICAgIGlmKHRoaXMud2F0Y2hJZCkge1xyXG4gICAgICAgICAgICBHZW9sb2NhdGlvbi5jbGVhcldhdGNoKHRoaXMud2F0Y2hJZCk7XHJcbiAgICAgICAgICAgIHRoaXMud2F0Y2hJZCA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIFVuaXZlcnNpZGFkXHJcbiAgICBwdWJsaWMgYnVzY2FyVW5pdmVyc2lhZCgpIHtcclxuXHJcbiAgICAgICAgdGhpcy5jYXJnYW5kbyA9IHRydWU7XHJcbiAgICAgICAgdGhpcy50eHRDYXJnYW5kbyA9IFwiQnVzY2FuZG8gVW5pdmVyc2lkYWRcIjtcclxuICAgICAgICB0aGlzLmJ1c2NhZG9yU2VydmljZS51bml2ZXJzaWRhZCA9IHRoaXMucGFnZS5nZXRWaWV3QnlJZDxUZXh0RmllbGQ+KFwidW5pdmVyc2lkYWRcIikudGV4dDtcclxuICAgICAgICBpZih0aGlzLmRvbmRlQnVzY2FyID09IFwiXCIpIHtcclxuICAgICAgICAgICAgdGhpcy5pdGVtcyA9IHRoaXMuYnVzY2Fkb3JTZXJ2aWNlLmdldFVuaXZlcnNpZGFkKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5idXNjYWRvclNlcnZpY2UuY2l1ZGFkID0gdGhpcy5sb2NhbGl6YXJTZXJ2aWNlLmNpdWRhZDtcclxuICAgICAgICAgICAgdGhpcy5pdGVtcyA9IHRoaXMuYnVzY2Fkb3JTZXJ2aWNlLmdldFVuaXZlcnNpZGFkQ2l1ZGFkKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuaXRlbXMpO1xyXG4gICAgICAgIC8vIHRoaXMuY2FyZ2FuZG8gPSBmYWxzZTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG1vc3RyYXJPcGNpb25lc1ViaWNhcm1lKCl7XHJcblxyXG4gICAgICAgIHZhciBvcGNpb25lcyA9IHtcclxuICAgICAgICAgICAgbWVzc2FnZTogXCJUdSB1YmljYWNpw7NuIGVzOiBcIiArIHRoaXMubG9jYWxpemFyU2VydmljZS5jaXVkYWQsXHJcbiAgICAgICAgICAgIGNhbmNlbEJ1dHRvblRleHQ6IFwiQ2FuY2VsYXJcIixcclxuICAgICAgICAgICAgYWN0aW9uczogW1wiQnVzY2FyIGVuIG1pIHViaWNhY2nDs25cIiwgXCJCdXNjYXIgZW4gdG9kbyBlbCBtdW5kb1wiXVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXMubW9zdHJhckRpYWxvZ28ob3BjaW9uZXMpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbW9zdHJhckRpYWxvZ28ob3BjaW9uZXMpIHtcclxuICAgICAgICBkaWFsb2dzLmFjdGlvbihvcGNpb25lcylcclxuICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkRpYWxvZyByZXN1bHQ6IFwiICsgcmVzdWx0KTtcclxuICAgICAgICAgICAgaWYocmVzdWx0ID09IFwiQnVzY2FyIGVuIG1pIHViaWNhY2nDs25cIil7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRvbmRlQnVzY2FyID0gdGhpcy5sb2NhbGl6YXJTZXJ2aWNlLmNpdWRhZDtcclxuICAgICAgICAgICAgfWVsc2UgaWYocmVzdWx0ID09IFwiQnVzY2FyIGVuIHRvZG8gZWwgbXVuZG9cIil7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRvbmRlQnVzY2FyID0gXCJcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==