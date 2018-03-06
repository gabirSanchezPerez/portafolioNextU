import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import * as request from 'superagent';

import Menu from './Menu.jsx';

let url = "http://127.0.0.1/portafolioNextU/herramientas_build_systems_y_tecnologias_emergentes/webServices/ws.php?query=";

class Detalle extends Component {

	constructor(props) {
		super(props)
		this.state = {
			producto: [],
			prdSeleccionado: []
		}
	}

	componentWillMount(){
		// this.props.match.params.id
		console.log(this.props.match)
      	let productoId = this.props.match.params.id; //;//this.props.match.params.index;
      	request
      	.get(url+'producto&id='+productoId)
        .end((err, res) => {
            if(err || !res.ok){
                console.log("Error en la peticion: "+err);
            }else{
            	// console.log(res)
                this.setState({ producto : JSON.parse(res.text)});
            }
        })
    }

	render() {
		
		return (
		  <section className="body">
		  	<Menu cantidadProductosCarrito={this.state.prdSeleccionado.length} ></Menu>
	        
	        <div className=" row ">
	          <div className="catalogo">
	            <div className="row small-12 linea-bottom">
	              <div className="column">
	                <h4>{this.state.producto.nombre}</h4>
	              </div>
	            </div>
	            <div className="row small-12 margin-top-1">
	              <div className="small-6 column">
	                <div className="text-center">
	                  <img className="thumbnail" src={"./../assets/img/productos/"+this.state.producto.imagen} />
	                </div>
	              </div>
	              <div className="small-6 column">
	                <div className="card-section">
	                  <p><strong>Precio</strong>: ${this.state.producto.valor}</p>
	                  <p><strong>Unidades disponibles</strong>: {this.state.producto.cantidad}</p>
	                </div>
	              </div>
	            </div>
	            <div className=" row small-12 margin-top-1">
	              <NavLink to="/" className="small-1 button primary"> Atras </NavLink>
	            </div>
	          </div>
	        </div>
	      </section>
		);
	}
}

export default Detalle;
