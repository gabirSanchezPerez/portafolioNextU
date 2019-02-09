import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { map } from "rxjs/operators";

import { BuscarInterface } from "../interfaces/buscador.interface";

@Injectable({
    providedIn: "root"
})
export class BuscadorService {
    private items = new Array<BuscarInterface>(
        // { name: "Ter Stegen", country: "Goalkeeper", web_pages: "https://google.com" },
    );
    
    constructor(private http: Http) { }

    getItems(): BuscarInterface[] {
        return this.items;
    }

    getItem(name: string): BuscarInterface {
        return this.items.filter(item => item.name === name)[0];
    }

    getUniversidad(name: string): BuscarInterface[] {
        
        this.http.get("http://universities.hipolabs.com/search?name=" + name)
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
