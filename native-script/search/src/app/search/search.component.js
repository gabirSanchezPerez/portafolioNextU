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
    SearchComponent.prototype.getDeviceLocation = function () {
        return new Promise(function (resolve, reject) {
            Geolocation.enableLocationRequest().then(function () {
                Geolocation.getCurrentLocation({ timeout: 10000 }).then(function (location) {
                    // console.log("Ubicacion: " + JSON.stringify(location));
                    resolve(location);
                }).catch(function (error) {
                    // console.log("Error: " +error);
                    reject(error);
                });
            });
        });
    };
    // Universidad
    SearchComponent.prototype.buscarUniversiad = function () {
        var _this = this;
        this.cargando = true;
        this.txtCargando = "Buscando Universidad";
        this.buscadorService.universidad = this.page.getViewById("universidad").text;
        this.buscadorService.ciudad = this.localizarService.ciudad;
        this.buscadorService.getUniversidad()
            .then(function (universidades) {
            _this.cargando = false;
            _this.items = universidades;
            console.log("bUuU " + universidades);
        }, function (err) {
            console.log("BU " + err);
        });
    };
    // public obtenerUniversidad(): Promise<any>{
    //     return new Promise((resolve,reject) => {
    //         if(this.dondeBuscar == "") {
    //             this.items = this.buscadorService.getUniversidad();
    //         } else {
    //             this.buscadorService.ciudad = this.localizarService.ciudad;
    //             this.items = this.buscadorService.getUniversidadCiudad();
    //         }
    //         if(this.items.length > 0){
    //             resolve(this.items);
    //         } else {
    //             reject("NO se obtivuieron datos")
    //         }
    //     });
    // }
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
                _this.buscadorService.buscaren = _this.localizarService.ciudad;
            }
            else if (result == "Buscar en todo el mundo") {
                _this.buscadorService.buscaren = "";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNlYXJjaC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMEQ7QUFDMUQsc0RBQXdEO0FBRXhELGlFQUErRDtBQUMvRCxtRUFBaUU7QUFLakUsc0RBQXNEO0FBQ3RELG9DQUFzQztBQUN0QyxnQ0FBK0I7QUFRL0I7SUFrQkkseUJBQTJCLElBQVksRUFBVSxlQUFnQyxFQUFVLElBQVUsRUFBVSxnQkFBa0M7UUFBdEgsU0FBSSxHQUFKLElBQUksQ0FBUTtRQUFVLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUFVLFNBQUksR0FBSixJQUFJLENBQU07UUFBVSxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBYmpKLGdCQUFXLEdBQXVCO1lBQzlCLE9BQU8sRUFBRSxDQUFDO1lBQ1YsUUFBUSxFQUFFLENBQUM7WUFDWCxPQUFPLEVBQUUsQ0FBQztZQUNWLElBQUksRUFBRSxDQUFDO1lBQ1AsT0FBTyxFQUFFLENBQUM7WUFDVixJQUFJLEVBQUUsQ0FBQztZQUNQLE9BQU8sRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQztTQUM1QixDQUFBO1FBTUcsSUFBSSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUM7UUFDdEIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDakIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7UUFDckIsSUFBSSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUM7SUFDMUIsQ0FBQztJQUVELGtDQUFRLEdBQVI7UUFDSSxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztRQUNyQixJQUFJLENBQUMsV0FBVyxHQUFHLHNCQUFzQixDQUFDO1FBQzFDLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO0lBQzlCLENBQUM7SUFFRCxlQUFlO0lBQ1IsNENBQWtCLEdBQXpCO1FB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LENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQzthQUN2QixJQUFJLENBQUMsVUFBQSxNQUFNO1lBQ1IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsR0FBRyxNQUFNLENBQUMsQ0FBQztZQUN4QyxJQUFHLE1BQU0sSUFBSSx3QkFBd0IsRUFBQztnQkFDbEMsS0FBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLEdBQUcsS0FBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQzthQUNoRTtpQkFBSyxJQUFHLE1BQU0sSUFBSSx5QkFBeUIsRUFBQztnQkFDekMsS0FBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO2FBQ3RDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBdEpRLGVBQWU7UUFOM0IsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxXQUFXO1lBQ3JCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixXQUFXLEVBQUUseUJBQXlCO1NBQ3pDLENBQUM7eUNBb0JtQyxhQUFNLEVBQTJCLGtDQUFlLEVBQWdCLFdBQUksRUFBNEIsb0NBQWdCO09BbEJ4SSxlQUFlLENBdUozQjtJQUFELHNCQUFDO0NBQUEsQUF2SkQsSUF1SkM7QUF2SlksMENBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE5nWm9uZSwgT25Jbml0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0ICogYXMgR2VvbG9jYXRpb24gZnJvbSBcIm5hdGl2ZXNjcmlwdC1nZW9sb2NhdGlvblwiO1xyXG5cclxuaW1wb3J0IHsgQnVzY2Fkb3JTZXJ2aWNlIH0gZnJvbSBcIi4uL3NlcnZpY2VzL2J1c2NhZG9yLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgTG9jYWxpemFyU2VydmljZSB9IGZyb20gXCIuLi9zZXJ2aWNlcy9sb2NhbGl6YXIuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBCdXNjYXJJbnRlcmZhY2UgfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9idXNjYWRvci5pbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgVWJpY2FjaW9uSW50ZXJmYWNlIH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvdWJpY2FjaW9uLmludGVyZmFjZVwiO1xyXG5cclxuaW1wb3J0IHsgVGV4dEZpZWxkIH0gZnJvbSAndWkvdGV4dC1maWVsZCc7XHJcbi8vIGltcG9ydCB7IHNldEludGVydmFsLCBjbGVhckludGVydmFsIH0gZnJvbSAndGltZXInO1xyXG5pbXBvcnQgKiBhcyBkaWFsb2dzIGZyb20gXCJ1aS9kaWFsb2dzXCI7XHJcbmltcG9ydCB7IFBhZ2UgfSBmcm9tIFwidWkvcGFnZVwiO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogXCJucy1zZWFyY2hcIixcclxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXHJcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3NlYXJjaC5jb21wb25lbnQuaHRtbFwiXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgU2VhcmNoQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuXHJcbiAgICBwdWJsaWMgdW5pdmVyc2lkYWQ6IHN0cmluZztcclxuICAgIHByaXZhdGUgd2F0Y2hJZDogbnVtYmVyO1xyXG4gICAgaXRlbXM6IEJ1c2NhckludGVyZmFjZVtdO1xyXG4gICAgbWlVYmljYWNpb246IFViaWNhY2lvbkludGVyZmFjZSA9IHtcclxuICAgICAgICBsYXRpdHVkOiAwLFxyXG4gICAgICAgIGxvbmdpdHVkOiAwLFxyXG4gICAgICAgIGFsdGl0dWQ6IDAsXHJcbiAgICAgICAgem9vbTogMCxcclxuICAgICAgICBiZWFyaW5nOiAwLFxyXG4gICAgICAgIHRpbHQ6IDAsXHJcbiAgICAgICAgcGFkZGluZzogWzQwLCA0MCwgNDAsIDQwXVxyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBjYXJnYW5kbzogYm9vbGVhbjtcclxuICAgIHB1YmxpYyB0eHRDYXJnYW5kbzogc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSBkb25kZUJ1c2Nhcjogc3RyaW5nO1xyXG5cclxuICAgIHB1YmxpYyBjb25zdHJ1Y3Rvcihwcml2YXRlIHpvbmU6IE5nWm9uZSwgcHJpdmF0ZSBidXNjYWRvclNlcnZpY2U6IEJ1c2NhZG9yU2VydmljZSwgcHJpdmF0ZSBwYWdlOiBQYWdlLCBwcml2YXRlIGxvY2FsaXphclNlcnZpY2U6IExvY2FsaXphclNlcnZpY2UgKSB7XHJcbiAgICAgICAgdGhpcy51bml2ZXJzaWRhZCA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy5wYWdlID0gcGFnZTtcclxuICAgICAgICB0aGlzLmNhcmdhbmRvID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmRvbmRlQnVzY2FyID0gXCJcIjtcclxuICAgIH1cclxuXHJcbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmNhcmdhbmRvID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnR4dENhcmdhbmRvID0gXCJCdXNjYW5kbyBjb29yZGVuYWRhc1wiO1xyXG4gICAgICAgIHRoaXMub2J0ZW5lckNvb3JkZW5hZGFzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gTG9jYWxpemFjacOzblxyXG4gICAgcHVibGljIG9idGVuZXJDb29yZGVuYWRhcygpIHtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLmdldERldmljZUxvY2F0aW9uKCkudGhlbihsb2NhdGlvbiA9PiB7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnR4dENhcmdhbmRvID0gXCJCdXNjYW5kbyBDaXVkYWRcIjtcclxuICAgICAgICAgICAgdGhpcy5sb2NhbGl6YXJTZXJ2aWNlLmdldENpdWRhZChsb2NhdGlvbi5sYXRpdHVkZSwgbG9jYXRpb24ubG9uZ2l0dWRlKTtcclxuICAgICAgICAgICAgdGhpcy5jYXJnYW5kbz0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICB0aGlzLm1pVWJpY2FjaW9uID0ge1xyXG4gICAgICAgICAgICAgICAgbGF0aXR1ZDogbG9jYXRpb24ubGF0aXR1ZGUsXHJcbiAgICAgICAgICAgICAgICBsb25naXR1ZDogbG9jYXRpb24ubG9uZ2l0dWRlLFxyXG4gICAgICAgICAgICAgICAgYWx0aXR1ZDogMCxcclxuICAgICAgICAgICAgICAgIHpvb206IDAsXHJcbiAgICAgICAgICAgICAgICBiZWFyaW5nOiAwLFxyXG4gICAgICAgICAgICAgICAgdGlsdDogMCxcclxuICAgICAgICAgICAgICAgIHBhZGRpbmc6IFs0MCwgNDAsIDQwLCA0MF1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIGVycm9yID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcInVwZGF0ZUxvY2F0aW9uOiBcIiArIGVycm9yKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhcnRXYXRjaGluZ0xvY2F0aW9uKCkge1xyXG4gICAgICAgIHRoaXMud2F0Y2hJZCA9IEdlb2xvY2F0aW9uLndhdGNoTG9jYXRpb24obG9jYXRpb24gPT4ge1xyXG4gICAgICAgICAgICBpZihsb2NhdGlvbikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy56b25lLnJ1bigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5taVViaWNhY2lvbiA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGF0aXR1ZDogbG9jYXRpb24ubGF0aXR1ZGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvbmdpdHVkOiBsb2NhdGlvbi5sb25naXR1ZGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsdGl0dWQ6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHpvb206IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJlYXJpbmc6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpbHQ6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhZGRpbmc6IFs0MCwgNDAsIDQwLCA0MF1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIGVycm9yID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICAgIH0sIHsgdXBkYXRlRGlzdGFuY2U6IDEsIG1pbmltdW1VcGRhdGVUaW1lOiAxMDAwIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdG9wV2F0Y2hpbmdMb2NhdGlvbigpIHtcclxuICAgICAgICBpZih0aGlzLndhdGNoSWQpIHtcclxuICAgICAgICAgICAgR2VvbG9jYXRpb24uY2xlYXJXYXRjaCh0aGlzLndhdGNoSWQpO1xyXG4gICAgICAgICAgICB0aGlzLndhdGNoSWQgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldERldmljZUxvY2F0aW9uKCk6IFByb21pc2U8YW55PiB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgR2VvbG9jYXRpb24uZW5hYmxlTG9jYXRpb25SZXF1ZXN0KCkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBHZW9sb2NhdGlvbi5nZXRDdXJyZW50TG9jYXRpb24oe3RpbWVvdXQ6IDEwMDAwfSkudGhlbihsb2NhdGlvbiA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJVYmljYWNpb246IFwiICsgSlNPTi5zdHJpbmdpZnkobG9jYXRpb24pKTtcclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGxvY2F0aW9uKTtcclxuICAgICAgICAgICAgICAgIH0pLmNhdGNoKGVycm9yID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIkVycm9yOiBcIiArZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gVW5pdmVyc2lkYWRcclxuICAgIHB1YmxpYyBidXNjYXJVbml2ZXJzaWFkKCkge1xyXG5cclxuICAgICAgICB0aGlzLmNhcmdhbmRvID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnR4dENhcmdhbmRvID0gXCJCdXNjYW5kbyBVbml2ZXJzaWRhZFwiO1xyXG4gICAgICAgIHRoaXMuYnVzY2Fkb3JTZXJ2aWNlLnVuaXZlcnNpZGFkID0gdGhpcy5wYWdlLmdldFZpZXdCeUlkPFRleHRGaWVsZD4oXCJ1bml2ZXJzaWRhZFwiKS50ZXh0O1xyXG4gICAgICAgIHRoaXMuYnVzY2Fkb3JTZXJ2aWNlLmNpdWRhZCA9IHRoaXMubG9jYWxpemFyU2VydmljZS5jaXVkYWQ7XHJcbiAgICAgICAgdGhpcy5idXNjYWRvclNlcnZpY2UuZ2V0VW5pdmVyc2lkYWQoKVxyXG4gICAgICAgIC50aGVuKHVuaXZlcnNpZGFkZXMgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmNhcmdhbmRvID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuaXRlbXMgPSB1bml2ZXJzaWRhZGVzO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImJVdVUgXCIgKyB1bml2ZXJzaWRhZGVzKTtcclxuICAgICAgICB9LCBlcnIgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkJVIFwiICsgZXJyKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBwdWJsaWMgb2J0ZW5lclVuaXZlcnNpZGFkKCk6IFByb21pc2U8YW55PntcclxuICAgIC8vICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUscmVqZWN0KSA9PiB7XHJcbiAgICAvLyAgICAgICAgIGlmKHRoaXMuZG9uZGVCdXNjYXIgPT0gXCJcIikge1xyXG4gICAgLy8gICAgICAgICAgICAgdGhpcy5pdGVtcyA9IHRoaXMuYnVzY2Fkb3JTZXJ2aWNlLmdldFVuaXZlcnNpZGFkKCk7XHJcbiAgICAvLyAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAvLyAgICAgICAgICAgICB0aGlzLmJ1c2NhZG9yU2VydmljZS5jaXVkYWQgPSB0aGlzLmxvY2FsaXphclNlcnZpY2UuY2l1ZGFkO1xyXG4gICAgLy8gICAgICAgICAgICAgdGhpcy5pdGVtcyA9IHRoaXMuYnVzY2Fkb3JTZXJ2aWNlLmdldFVuaXZlcnNpZGFkQ2l1ZGFkKCk7XHJcbiAgICAvLyAgICAgICAgIH1cclxuICAgIC8vICAgICAgICAgaWYodGhpcy5pdGVtcy5sZW5ndGggPiAwKXtcclxuICAgIC8vICAgICAgICAgICAgIHJlc29sdmUodGhpcy5pdGVtcyk7XHJcbiAgICAvLyAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAvLyAgICAgICAgICAgICByZWplY3QoXCJOTyBzZSBvYnRpdnVpZXJvbiBkYXRvc1wiKVxyXG4gICAgLy8gICAgICAgICB9XHJcbiAgICAvLyAgICAgfSk7XHJcbiAgICAvLyB9XHJcblxyXG4gICAgcHVibGljIG1vc3RyYXJPcGNpb25lc1ViaWNhcm1lKCl7XHJcblxyXG4gICAgICAgIHZhciBvcGNpb25lcyA9IHtcclxuICAgICAgICAgICAgbWVzc2FnZTogXCJUdSB1YmljYWNpw7NuIGVzOiBcIiArIHRoaXMubG9jYWxpemFyU2VydmljZS5jaXVkYWQsXHJcbiAgICAgICAgICAgIGNhbmNlbEJ1dHRvblRleHQ6IFwiQ2FuY2VsYXJcIixcclxuICAgICAgICAgICAgYWN0aW9uczogW1wiQnVzY2FyIGVuIG1pIHViaWNhY2nDs25cIiwgXCJCdXNjYXIgZW4gdG9kbyBlbCBtdW5kb1wiXVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXMubW9zdHJhckRpYWxvZ28ob3BjaW9uZXMpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbW9zdHJhckRpYWxvZ28ob3BjaW9uZXMpIHtcclxuICAgICAgICBkaWFsb2dzLmFjdGlvbihvcGNpb25lcylcclxuICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkRpYWxvZyByZXN1bHQ6IFwiICsgcmVzdWx0KTtcclxuICAgICAgICAgICAgaWYocmVzdWx0ID09IFwiQnVzY2FyIGVuIG1pIHViaWNhY2nDs25cIil7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJ1c2NhZG9yU2VydmljZS5idXNjYXJlbiA9IHRoaXMubG9jYWxpemFyU2VydmljZS5jaXVkYWQ7XHJcbiAgICAgICAgICAgIH1lbHNlIGlmKHJlc3VsdCA9PSBcIkJ1c2NhciBlbiB0b2RvIGVsIG11bmRvXCIpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5idXNjYWRvclNlcnZpY2UuYnVzY2FyZW4gPSBcIlwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuIl19