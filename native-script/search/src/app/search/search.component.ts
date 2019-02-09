import { Component, NgZone, OnInit } from "@angular/core";
import * as Geolocation from "nativescript-geolocation";

import { BuscadorService } from "../services/buscador.service";
import { LocalizarService } from "../services/localizar.service";
import { BuscarInterface } from "../interfaces/buscador.interface";
import { UbicacionInterface } from "../interfaces/ubicacion.interface";

import { TextField } from 'ui/text-field';
// import { setInterval, clearInterval } from 'timer';
import * as dialogs from "ui/dialogs";
import { Page } from "ui/page";

@Component({
    selector: "ns-search",
    moduleId: module.id,
    templateUrl: "./search.component.html"
})

export class SearchComponent implements OnInit {

    public universidad: string;
    private watchId: number;
    items: BuscarInterface[];
    miUbicacion: UbicacionInterface = {
        latitud: 0,
        longitud: 0,
        altitud: 0,
        zoom: 0,
        bearing: 0,
        tilt: 0,
        padding: [40, 40, 40, 40]
    }
    private cargando: boolean;
    public txtCargando: string;
    private dondeBuscar: string;

    public constructor(private zone: NgZone, private buscadorService: BuscadorService, private page: Page, private localizarService: LocalizarService ) {
        this.universidad = "";
        this.page = page;
        this.cargando = true;
        this.dondeBuscar = "";
    }

    ngOnInit(): void {
        this.cargando = true;
        this.txtCargando = "Buscando coordenadas";
        this.obtenerCoordenadas();
    }

    // Localización
    private getDeviceLocation(): Promise<any> {
        return new Promise((resolve, reject) => {
            Geolocation.enableLocationRequest().then(() => {
                Geolocation.getCurrentLocation({timeout: 10000}).then(location => {
                    console.log("Ubicacion: " + JSON.stringify(location));
                    resolve(location);
                }).catch(error => {
                    console.log("Error: " +error);
                    reject(error);
                });
            });
        });
    }

    public obtenerCoordenadas() {
        
        this.getDeviceLocation().then(location => {

            this.txtCargando = "Buscando Ciudad";
            this.localizarService.getCiudad(location.latitude, location.longitude);
            this.cargando= false;

            this.miUbicacion = {
                latitud: location.latitude,
                longitud: location.longitude,
                altitud: 0,
                zoom: 0,
                bearing: 0,
                tilt: 0,
                padding: [40, 40, 40, 40]
            }
        }, error => {
            console.error("updateLocation: " + error);
        });
    }

    public startWatchingLocation() {
        this.watchId = Geolocation.watchLocation(location => {
            if(location) {
                this.zone.run(() => {
                    this.miUbicacion = {
                        latitud: location.latitude,
                        longitud: location.longitude,
                        altitud: 0,
                        zoom: 0,
                        bearing: 0,
                        tilt: 0,
                        padding: [40, 40, 40, 40]
                    }
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

        this.cargando = true;
        this.txtCargando = "Buscando Universidad";
        this.buscadorService.universidad = this.page.getViewById<TextField>("universidad").text;
        if(this.dondeBuscar == "") {
            this.items = this.buscadorService.getUniversidad();
        } else {
            this.buscadorService.ciudad = this.localizarService.ciudad;
            this.items = this.buscadorService.getUniversidadCiudad();
        }
        console.log(this.items);
        // this.cargando = false;

    }

    public mostrarOpcionesUbicarme(){

        var opciones = {
            message: "Tu ubicación es: " + this.localizarService.ciudad,
            cancelButtonText: "Cancelar",
            actions: ["Buscar en mi ubicación", "Buscar en todo el mundo"]
        };

        this.mostrarDialogo(opciones);

    }

    public mostrarDialogo(opciones) {
        dialogs.action(opciones)
        .then(result => {
            console.log("Dialog result: " + result);
            if(result == "Buscar en mi ubicación"){
                this.dondeBuscar = this.localizarService.ciudad;
            }else if(result == "Buscar en todo el mundo"){
                this.dondeBuscar = "";
            }
        });
    }
}
