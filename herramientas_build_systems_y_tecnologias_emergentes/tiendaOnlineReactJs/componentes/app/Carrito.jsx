import React, { Component } from 'react';
import * as request from 'superagent';

import Menu from './Menu.jsx';
var url = "https://nextu.000webhostapp.com/webServicesNext/ws.php";

class Carrito extends Component {

	constructor(props) {
		super(props);
		this.state = {
		  productos: [],
		  prdSeleccionado: [],
		  valorTotal: 0,
		  mostrar: true, 
		}
	}

	pagarPedido() {
		request
        .post(url+"?query=pedido")
        .set('Content-Type': 'application/json')
        .send(
                JSON.stringify(this.state.prdSeleccionado)
               )
        .end((err, res) => {
          if (err || !res.ok) {
            console.log('ERRR ', err);
          } else {
            res = JSON.parse(res.text)
            // console.log('SUCCESS ', res);
              localStorage.removeItem('currentPrdSelectReact');
              window.location.href='/';
            // }
          }
        });
	}

	componentWillMount() {
		// this.props.match.params.id
		if (localStorage.getItem("currentPrdSelectReact") !== null) {
			let prd_sel_aux = JSON.parse(localStorage.getItem("currentPrdSelectReact"))
			let total = 0
			prd_sel_aux.map(function (prd, key) {
	      		total += prd.cantidad_solicitada * parseInt(prd.valor)
	    	})

			this.setState({prdSeleccionado: prd_sel_aux, valorTotal: total});
			console.log(prd_sel_aux)
		} else {
			this.setState({mostrar: false});
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
			    {this.state.mostrar ? (
			    <div className="row small-12 ">
			      
			      <div className="column small-6">
			      	{ this.state.prdSeleccionado.map((prd, i) => 
			      		<div className="row small-12 producto_carrito" key={prd.id.toString()} >
				          	<div className="column small-4">
				            	<img src={'./../assets/img/productos/'+prd.imagen} alt="" />
				          	</div>
				          	<div className="column small-8">
				            	<p><strong className="column">Nombre:</strong>&nbsp;&nbsp;{prd.nombre}</p>
				            	<p><strong className="column">Cantidad:</strong>&nbsp;&nbsp;{prd.cantidad_solicitada}</p>
				            	<p><strong className="column">Subtotal:</strong>&nbsp;&nbsp;${prd.valor * prd.cantidad_solicitada}</p>
				          	</div>
				        </div>
		            )}

			      </div>
			      <div className="column padding-horizontal-2">
			        <h2><strong>Total</strong>: ${this.state.valorTotal}</h2>
			        <div className="column small-6">
			          <div className="small stacked-for-small button-group">
			            <input type="button" className="hollow button secondary" value="Cancelar" />
			            <input type="button" className=" button warning" value="Pagar" onClick={() => this.pagarPedido()} />
			          </div>
			        </div>
			      </div>
			    </div>
			    ) : (
			    	<div className="alert alert-danger"> NO ha añadido ningun producto al carrito</div>
			    )}
			  </div>
			</div>

	      </section>
		);
	}
}

export default Carrito;