import { Component, NgZone } from "@angular/core";
import * as Geolocation from "nativescript-geolocation";

import { BuscarInterface } from "../interfaces/buscador.interface";
import { BuscadorService } from "../services/buscador.service";
import { UbicacionInterface } from "../interfaces/ubicacion.interface";

@Component({
    selector: "ns-search",
    moduleId: module.id,
    templateUrl: "./search.component.html"
})
export class SearchComponent {
    public universidad: string;
    public latitude: number;
    public longitude: number;
    public altitude: number;
    private watchId: number;
    items: BuscarInterface[];

    public constructor(private zone: NgZone, private buscadorService: BuscadorService ) {
        this.latitude = 0;
        this.longitude = 0;
        this.altitude = 0;
        this.universidad = ""
    }
    // Localización
    private getDeviceLocation(): Promise<any> {
        return new Promise((resolve, reject) => {
            Geolocation.enableLocationRequest().then(() => {
                Geolocation.getCurrentLocation({timeout: 10000}).then(location => {
                    resolve(location);
                }).catch(error => {
                    reject(error);
                });
            });
        });
    }

    public updateLocation() {
        this.getDeviceLocation().then(result => {
            this.latitude = result.latitude;
            this.longitude = result.longitude;
            this.altitude = result.altitude;
        }, error => {
            console.error(error);
        });
    }

    public startWatchingLocation() {
        this.watchId = Geolocation.watchLocation(location => {
            if(location) {
                this.zone.run(() => {
                    this.latitude = location.latitude;
                    this.longitude = location.longitude;
                });
            }
        }, error => {
            console.log(error);
        }, { updateDistance: 1, minimumUpdateTime: 1000 });
    }

    public stopWatchingLocation() {
        if(this.watchId) {
            Geolocation.clearWatch(this.watchId);
            this.watchId = null;
        }
    }

    // Universidad
    public buscarUniversiad() {
        console.log("---2 "+this.universidad);
        this.items = this.buscadorService.getUniversidad("middle");
    }
}
