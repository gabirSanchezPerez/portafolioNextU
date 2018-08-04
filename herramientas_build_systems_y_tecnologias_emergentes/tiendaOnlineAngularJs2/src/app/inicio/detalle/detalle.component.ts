import { Component, OnInit } from '@angular/core';
// import { Response } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from './../../servicios/http.service';

@Component({
  selector: 'ang2-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./../inicio.component.css']
})
export class DetalleComponent implements OnInit {
	
  public producto: string[] = [];
  public datoProductosCarrito: string[] = [];
  constructor(private httpService: HttpService, private router: ActivatedRoute) { }

  ngOnInit() {
    this.getProducto();
    this.obtenerProductosCarrito()
  }

  getProducto() {
    
  	console.log(this.router.snapshot.params['id'])
  	let id = +this.router.snapshot.params['id'];

    this.httpService.getProducto(id)
          .subscribe(
        (data) => {
          this.producto = data;
        },
        (error) => { return error }
      );

  }

  obtenerProductosCarrito() {
    this.datoProductosCarrito = this.httpService.getProductosCarrito()
  }

}
