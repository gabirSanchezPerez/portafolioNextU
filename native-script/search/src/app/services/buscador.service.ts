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
    public buscaren: string;
    public url: string;
    private items = new Array<BuscarInterface>( );
    
    constructor(private http: Http) { 
        this.buscaren= "";
    }

    getUniversidad(): Promise<any>{
        return new Promise((resolve,reject) => {
            if(this.buscaren == "") {
                this.url = "http://universities.hipolabs.com/search?name=" + this.universidad
            } else {
                this.url = "http://universities.hipolabs.com/search?name=" + this.universidad + "&country=" + this.ciudad
            }
            console.log(this.url)
            this.items= [];
            this.http.get(this.url)
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
                console.log(JSON.stringify(this.items) )
                resolve(this.items);
                      
            }, error => {
                console.log(JSON.stringify(error) )
                reject("NO se obtivuieron datos (Servicoio)")
            });
        });
    }

    getAllUniversidad() {
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
        
    }

    getUniversidadCiudad() {
        
       
    }
}
