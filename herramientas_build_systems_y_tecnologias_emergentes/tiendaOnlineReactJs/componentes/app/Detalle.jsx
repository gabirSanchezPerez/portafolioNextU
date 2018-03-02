import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import Menu from './Menu.jsx';

class Detalle extends Component {
	render() {
		return (
		  <section className="body">
		  	<Menu></Menu>
	        
	        <div className=" row ">
	          <div className="catalogo">
	            <div className="row small-12 linea-bottom">
	              <div className="column">
	                <h4>NOMBRE</h4>
	              </div>
	            </div>
	            <div className="row small-12 margin-top-1">
	              <div className="small-6 column">
	                <div className="text-center">
	                  <img className="thumbnail" src="./../assets/img/productos/ajo.jpg" />
	                </div>
	              </div>
	              <div className="small-6 column">
	                <div className="card-section">
	                  <p><strong>Precio</strong>: $10.250</p>
	                  <p><strong>Unidades disponibles</strong>:12</p>
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
