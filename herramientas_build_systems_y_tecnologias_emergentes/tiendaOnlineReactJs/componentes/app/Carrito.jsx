import React, { Component } from 'react';

import Menu from './Menu.jsx';

class Carrito extends Component {

	constructor(props) {
		super(props);
		this.state = {
		  productos: [],
		  prdSeleccionado: []
		}
	}

	render() {
		return (
	      	<section className="body">
	      	<Menu cantidadProductosCarrito={this.state.prdSeleccionado.length}></Menu>

			<div className=" row ">
			  <div className="carrito">
			    <div className="row small-12 linea-bottom">
			      <div className="column">
			        <h4>Carrito de Compras</h4>
			      </div>
			      <div className="column">
			      </div>
			    </div>
			    <div className="row small-12 ">
			      
			      <div className="column small-6">
			        <div className="row small-12 producto_carrito" >
			          <div className="column small-4">
			            <img src="./../assets/img/productos/ajo.jpg" alt="" />
			          </div>
			          <div className="column small-8">
			            <p><strong className="column">Nombre:</strong>&nbsp;&nbsp;NOMBRE</p>
			            <p><strong className="column">Cantidad:</strong>&nbsp;&nbsp;25</p>
			            <p><strong className="column">Subtotal:</strong>&nbsp;&nbsp;20.000</p>
			          </div>
			        </div>

			        <div className="row small-12 producto_carrito" >
			          <div className="column small-4">
			            <img src="./../assets/img/productos/ajo.jpg" alt="" />
			          </div>
			          <div className="column small-8">
			            <p><strong className="column">Nombre:</strong>&nbsp;&nbsp;NOMBRE</p>
			            <p><strong className="column">Cantidad:</strong>&nbsp;&nbsp;25</p>
			            <p><strong className="column">Subtotal:</strong>&nbsp;&nbsp;20.000</p>
			          </div>
			        </div>

			      </div>
			      <div className="column padding-horizontal-2">
			        <h2><strong>Total</strong>: $20.000</h2>
			        <div className="column small-6">
			          <div className="small stacked-for-small button-group">
			            <input type="button" className="hollow button secondary" value="Cancelar" />
			            <input type="button" className=" button warning" value="Pagar" />
			          </div>
			        </div>
			      </div>
			    </div>
			  </div>
			</div>

	      </section>
		);
	}
}

export default Carrito;