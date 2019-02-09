import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { map } from "rxjs/operators";

import { BuscarInterface } from "../interfaces/buscador.interface";

@Injectable({
    providedIn: "root"
})
export class BuscadorService {
    public ciudad: string;
    public universidad: string;
    private items = new Array<BuscarInterface>( );
    
    constructor(private http: Http) { }

    getUniversidad(): BuscarInterface[] {
        this.items= [];
        this.http.get("http://universities.hipolabs.com/search?name=" + this.universidad)
            .pipe(
                map(res => res.json())
            )
            .subscribe((response: any) => {
                
                for (var clave in response){

                    this.items.push({
                        web_pages: response[clave]["web_pages"][0],    
                        country: response[clave]["country"],
                        name: response[clave]["name"]
                    });
                }
                      
        }, error => console.log(JSON.stringify(error) ));
        return this.items;
        
    }

    getUniversidadCiudad() : BuscarInterface[] {
        this.items= [];
        this.http.get("http://universities.hipolabs.com/search?name=" + this.universidad + "&country=" + this.ciudad)
            .pipe(
                map(res => res.json())
            )
            .subscribe((response: any) => {
                
                for (var clave in response){

                    this.items.push({
                        web_pages: response[clave]["web_pages"][0],    
                        country: response[clave]["country"],
                        name: response[clave]["name"]
                    });
                }
                      
        }, error => console.log(JSON.stringify(error) ));
        return this.items;
        
    }
}
