import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { HttpService } from './../servicios/http.service';

@Component({
  selector: 'ang2-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  public datoProductos: string[] = [];
  public datoProductosAux: string[] = [];

  constructor(private httpService: HttpService) { }

  ngOnInit() {
    this.getProductos();
  }

  getProductos() {

    this.httpService.getProductos()
      .subscribe(
      (data) => {
        let aux: any[] = [];
        for (let key in data) {
          aux.push(data[key])
        }
        this.datoProductos = aux;
        this.datoProductosAux = aux;
      },
      (error) => { return error }
    );

  }

  filtrarProductos(nombreProducto: string) {

    this.datoProductos = this.datoProductosAux.filter(
      item => {
        if (item["nombre"] !== null && item["nombre"].toLowerCase().indexOf(nombreProducto.toLowerCase()) > -1) {

            return item; 
        }
        return false;

      }
    )
  }

}
