import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class HttpService {

  constructor(private http: Http) { }

  getDatos(){
    var url = "http://127.0.0.1/portafolioNextU/herramientas_build_systems_y_tecnologias_emergentes/webServices/ws.php";
    
    return this.http.get(url)
        .map((response: Response) => response.json())
  }

  setDatos( correo: string, contrasenia: string){

    let cuerpo = JSON.stringify({correo, contrasenia});
    var url = "http://127.0.0.1/portafolioNextU/herramientas_build_systems_y_tecnologias_emergentes/webServices/ws.php";
    
    return this.http.post(url, cuerpo)
        .map((response: Response) => response.json())
  }
}
