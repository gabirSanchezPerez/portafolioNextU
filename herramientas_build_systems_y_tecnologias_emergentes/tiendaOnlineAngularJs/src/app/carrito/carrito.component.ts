import { Component, OnInit } from '@angular/core';
// import { Response } from '@angular/http';
import { Router } from '@angular/router';
import { HttpService } from './../servicios/http.service';

@Component({
  selector: 'ang2-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})

export class CarritoComponent implements OnInit {
	public productos: string[] = [];
  public valorTotal: number;

  constructor(private httpService: HttpService, private router: Router) { }

  ngOnInit() {
  	this.obtenerProductosCarrito()

  }

  obtenerProductosCarrito() {
    let total: number = 0;
  	this.productos = this.httpService.getProductosCarrito()
    this.productos.map(function (prd, key) {
      total += prd["cantidad_solicitada"] * prd["valor"]
    })

    this.valorTotal = total
  }

  pagarPedido() {
    // Afectar BD
    this.httpService.getPagarPedido()    
      .subscribe(
      (data) => { 
        let aux : any[] = [];
        for(let key in data){
          aux.push(data[key])
        }
          console.log(aux);
          this.router.navigate(['/catalogo']);
      },
      (error) => { 
        console.log(error);
        return error
       }
    );
  }
}
