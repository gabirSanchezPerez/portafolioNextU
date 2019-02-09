import { Component, NgZone } from "@angular/core";
import * as Geolocation from "nativescript-geolocation";

import { Buscar } from "../servicios/buscador";
import { BuscadorService } from "../servicios/buscador.service";
import { Ubicacion } from "./ubicacion";

@Component({
    selector: "ns-buscador",
    moduleId: module.id,
    templateUrl: "./buscador.component.html",
})
export class BuscadorComponent {
    items: Buscar[];
    public txtBuscar: string;
    miUbicacion: Ubicacion = {
        latitud: 0,
        longitud: 0,
        altitud: 0,
        zoom: 0,
        bearing: 0,
        tilt: 0,
        padding: [40, 40, 40, 40]
    }
    public latitude: number;
    public longitude: number;
    private watchId: number;

    public constructor(
        private buscadorService: BuscadorService, 
        private zone: NgZone
        ) { 

        this.latitude = 0;
        this.longitude = 0;
        this.txtBuscar = "";
    }

    public buscarUniversiad() {
        console.log("---2 "+this.txtBuscar);
        this.items = this.buscadorService.getUniversidad("middle");
    }

    private getDeviceLocation(): Promise<any> {
        return new Promise((resolve, reject) => {
                console.log(46);
            Geolocation.enableLocationRequest().then(() => {
                console.log(49);
                Geolocation.getCurrentLocation({desiredAccuracy: 3, timeout: 10000})
                .then(location => {
                    console.log(location);
                    resolve(location);
                }).catch(error => {
                    reject("Error 52 enableLocationRequest: " + error);
                });
            });
        });
    }

    public buscarme () {
        this.getDeviceLocation().then(result => {
            console.log(result);
            this.latitude = result.latitude;
            this.longitude = result.longitude;
        }, error => {
            console.error("Error 64 getDeviceLocation: " + error);
        });
 

    }

}