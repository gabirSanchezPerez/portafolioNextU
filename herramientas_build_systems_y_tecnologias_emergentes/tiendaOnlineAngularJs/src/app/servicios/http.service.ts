import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class HttpService {
  private URL = 'https://nextu.000webhostapp.com/webServicesNext/ws.php'
  private datoProductos: string[] = [];

  constructor(private http: Http) { }

  logearse( correo: string, contrasenia: string){

    let cuerpo = JSON.stringify({correo, contrasenia});
    var url = this.URL+"?query=login";
    return this.http.post(url, cuerpo)
      .map((response: Response) => response.json())

  }

  getPagarPedido() {

    let cuerpo = JSON.stringify(this.datoProductos);
    var url = this.URL+"?query=pedido";
    
    this.datoProductos = [];
    return this.http.post(url, cuerpo)
      .map((response: Response) => response.json())

  }
  
  getProductos(){

    var url = this.URL+"?query=productos";
    console.log(url)
    return this.http.get(url)
      .map((response: Response) => response.json())      

  }

  getProducto(id: number) {

    var url = this.URL+"?query=producto&id="+id;
    console.log(url)
    return this.http.get(url)
      .map((response: Response) => response.json())

  }

  productoAComprar(producto) {
    this.datoProductos.push(producto)
  }

  getProductosCarrito() {
    return this.datoProductos;
  }

}
