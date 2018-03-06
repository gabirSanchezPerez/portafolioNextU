import React from 'react';
import * as request from 'superagent';
// import _ from 'lodash';
// import { AsyncStorage } from 'AsyncStorage';
import { NavLink } from 'react-router-dom';

import Menu from './Menu.jsx';

let url = "http://127.0.0.1/portafolioNextU/herramientas_build_systems_y_tecnologias_emergentes/webServices/ws.php?query=";
let prd_sel_aux = []

class Inicio extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      productos: [],
      productosAux: [],
      prdSeleccionado: [],
      txt_filtro: '',
    }

    this.filtrarProductos = this.filtrarProductos.bind(this)
    this.anadirCarrito = this.anadirCarrito.bind(this)
    this.cambiosInput = this.cambiosInput.bind(this)
  }

  filtrarProductos(e) {
    this.setState({txt_filtro: e.target.value}); 
    var txt_flt = this.state.txt_filtro

    var updateList = this.state.productosAux.filter(
      function (item) {
        if (item.nombre !== null && item.nombre.toLowerCase().search(txt_flt.toLowerCase()) > -1) {
            return item; 
        }
        return false;
    })
    this.setState({productos: updateList});    
  }

  anadirCarrito(prd_sel, refName) {
    prd_sel.cantidad_seleccionada = 4;
    console.log(prd_sel)
    console.log(refName)

    prd_sel_aux.push(prd_sel)
    this.setState({prdSeleccionado: prd_sel_aux});
  }

  cambiosInput(e){
    this.setState({[e.target.name]: e.target.value});    
  }

  componentWillMount() {
    // console.log(this.props.match)
    request
      .get(url+"productos")
      .set('Content-Type': 'application/json')
      .end((err, res) => {
        // console.log('RESPONSE',  res);
        if (err || !res.ok) {
          console.log('ERRR ', err);
        } else {

          this.setState({ productos:JSON.parse(res.text), productosAux:JSON.parse(res.text) });
        }
      });
  }

  render() {

    return ( 
      <section className="body">
        <Menu cantidadProductosCarrito={this.state.prdSeleccionado.length}></Menu>
        <div className=" row ">
          <div className="catalogo">
            <div className="row small-12 linea-bottom">
              <div className="column">
                <h4>Catálogo de productos </h4>
              </div>
              <div className="column small-offset-5">
                <strong>¿Que estas buscando?</strong>
                <input type="text" value={this.state.txt_filtro} placeholder="Buscar producto" onChange={this.filtrarProductos} />
              </div>
            </div>
            <div className="row">
              { this.state.productos.map((prd, i) => 
              <div className="small-12 medium-4 large-3 column" key={prd.id.toString()}>
                <div className="card">
                  <div className="text-center">
                    <img className="" src={'./assets/img/productos/'+prd.imagen} />
                  </div>
                  <div className="card-section">
                    <p><strong>{prd.nombre}</strong></p>
                    <p>Precio: ${prd.valor}</p>
                    <p>Unidades disponibles: {prd.cantidad}</p>
                
                      <div className=" row small-12 padding-horizontal-1">
                        <NavLink to={'/catalogo/'+prd.id} className="small-4 button primary">Ver más</NavLink>
                        <input type="button" onClick={() => this.anadirCarrito(prd, 'cant_'+prd.id)} className="small-offset-1 small-3 button warning" value="Añadir"  />
                        <input type="number" ref={'cant_'+prd.id} name={'cant_'+prd.id} onChange={this.cambiosInput} className="column text-right" value="1" />
                      </div>
                  </div>
                </div>
              </div>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }

}

export default Inicio;