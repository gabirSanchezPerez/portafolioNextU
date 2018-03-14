import React from 'react';
import * as request from 'superagent';
import { NavLink } from 'react-router-dom';

import Menu from './Menu.jsx';

let url = "https://nextu.000webhostapp.com/webServicesNext/ws.php";
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

    // this.cambiosInput = this.cambiosInput.bind(this)
  }

  filtrarProductos(e) {
    try {
      this.setState({txt_filtro: e.target.value}); 
      let txt_flt = e.target.value

      let updateList = this.state.productosAux.filter(
        function (item) {
          if (item.nombre !== null && item.nombre.toLowerCase().search(txt_flt.toLowerCase()) > -1) {
              return item; 
          }
          return false;
      })
      this.setState({productos: updateList});    

    } catch (err) {
      console.log(err)
    }
  }

  anadirCarrito(prd_sel, refName) {
    let idProductInput = document.getElementById("cant_"+refName).value;
    console.log(idProductInput+'??'+refName)
    prd_sel.cantidad_solicitada = idProductInput;

    prd_sel_aux.push(prd_sel)
    localStorage.setItem('currentPrdSelectReact', JSON.stringify(prd_sel_aux));
    this.setState({prdSeleccionado: prd_sel_aux});
  }

  cambiosInput(e){
    console.log(e.target.value)
    this.setState({[e.target.name]: e.target.value});    
  }

  componentWillMount() {
    if (localStorage.getItem("currentPrdSelectReact") !== null) {
      prd_sel_aux = JSON.parse(localStorage.getItem("currentPrdSelectReact"))
      this.setState({prdSeleccionado: prd_sel_aux});
      // console.log(prd_sel_aux)
    }

    request
      .get(url+"?query=productos")
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

    // console.log( this.props )
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
                <input type="text" value={this.state.txt_filtro} placeholder="Buscar producto" onChange={this.filtrarProductos.bind(this)} />
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
                        <input type="button" onClick={() => this.anadirCarrito(prd, prd.id)} className="small-offset-1 small-3 button warning" value="Añadir"  />
                        <input id={"cant_"+prd.id} type="number" defaultValue="1" onChange={this.cambiosInput} className="column text-right prueba"/>
                        {/*<input type="number" ref={'cant_'+prd.id} onChange={this.cambiosInput} className="column text-right" value="1" />*/}
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