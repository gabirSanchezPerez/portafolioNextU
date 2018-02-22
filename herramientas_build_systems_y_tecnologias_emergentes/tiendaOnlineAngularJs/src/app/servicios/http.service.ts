import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class HttpService {
  private URL = 'http://127.0.0.1/portafolioNextU/herramientas_build_systems_y_tecnologias_emergentes/webServices/ws.php'

  constructor(private http: Http) { }

  getDatos(){
    var url = this.URL;
    
    return this.http.get(url)
        .map((response: Response) => response.json())
  }

  logearse( correo: string, contrasenia: string){

    let cuerpo = JSON.stringify({correo, contrasenia});
    var url = this.URL+"?query=login";
    
    return this.http.post(url, cuerpo)
        .map((response: Response) => response.json())
  }

  getProductos(){
    var url = this.URL+"?query=productos";
    
    return this.http.get(url)
        .map((response: Response) => response.json())
  }

  getProducto(id: number) {
    var url = this.URL+"?query=producto&id="+id;
    
    return this.http.get(url)
        .map((response: Response) => response.json())
  }
}
