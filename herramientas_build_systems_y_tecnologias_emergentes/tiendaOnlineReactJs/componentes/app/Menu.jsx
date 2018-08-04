import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

class Menu extends Component {

    static propType : {
	    cantidadProductosCarrito: PropTypes.string.isRequired
    };

	salir () {
		localStorage.removeItem("currentUserIdReact");
		 window.location.href='/';
	}

	render() {
		const { cantidadProductosCarrito } = this.props;
		return (
			<div className=" row ">
				<div className="barra_menu clearfix small-12">
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
			            	{ cantidadProductosCarrito > 0 ? (
			            		<span className="badge alert" >{cantidadProductosCarrito}</span>
			            		) : (
			            		<span ></span>
			            		)
			            	}
			            	
			            </NavLink>
			          </li>
			          <li >
			            <a href="#" onClick = {this.salir} > <i className="fas fa-sign-out-alt"></i> </a> 
			          </li>
			        </ul>
	      		</div>
	      </div>
		);
	}
}

export default Menu;
