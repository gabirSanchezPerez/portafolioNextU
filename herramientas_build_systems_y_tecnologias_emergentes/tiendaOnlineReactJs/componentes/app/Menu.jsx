import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

class Menu extends Component {

    static propType : {
	    cantidadProductosCarrito: PropTypes.string.isRequired
    };

	salir () {
		localStorage.removeItem("currentUserIdReact");
    	location.reload(true)
	}

	render() {
		const { cantidadProductosCarrito } = this.props;
		return (
	      <div className="barra_menu clearfix">
	        <ul className="menu float-left">
	          <li className="menu-text">La Bodega</li>
	        </ul>
	        
	        <ul className="menu float-right">
	          <li >
	            <NavLink to="/"> <i className="fas fa-th"></i> </NavLink>
	          </li>
	          <li >
	            <NavLink to="/carrito">
	            	<i className="fas fa-shopping-cart"></i>
	            	<span className="badge alert" >{cantidadProductosCarrito}</span>
	            </NavLink>
	          </li>
	          <li >
	            <a href="#" onClick = {this.salir} > <i className="fas fa-sign-out-alt"></i> </a> 
	          </li>
	        </ul>
	        
	      </div>
		);
	}
}

export default Menu;
