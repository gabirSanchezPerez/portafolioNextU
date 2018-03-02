import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Menu extends Component {
	render() {
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
	            <NavLink to="/carrito"> <i className="fas fa-shopping-cart"></i> </NavLink>
	          </li>
	          <li >
	            <a href="#"> <i className="fas fa-sign-out-alt"></i> </a>
	          </li>
	        </ul>
	        
	      </div>
		);
	}
}

export default Menu;
