import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { map } from "rxjs/operators";

@Injectable({
    providedIn: "root"
})
export class LocalizarService {
    
    constructor(private http: Http) { }
    public ciudad: string;

    getCiudad(lat: string, long: string) {
        
        this.http.get("http://api.geonames.org/findNearbyPlaceNameJSON?username=gsanchez&lat="+lat+"&lng=" + long)
            .pipe(
                map(res => res.json())
            )
            .subscribe(res => {
                console.log("response "+ JSON.stringify(res.geonames[0].countryName))

                this.ciudad = res.geonames[0].countryName

        }, err => {
            console.log("Error getCiudad: " + err )
        });
        
    }
}
