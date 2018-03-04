import React from 'react';
import * as request from 'superagent';
// import _ from 'lodash';
import { AsyncStorage } from 'AsyncStorage';
import { NavLink } from 'react-router-dom';

import Menu from './Menu.jsx';

let url = "http://127.0.0.1/portafolioNextU/herramientas_build_systems_y_tecnologias_emergentes/webServices/ws.php?query=";
class Inicio extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      productos: []
    }
  }

  componentWillMount() {
    // console.log("component url " + url);
    request
      .get(url+"productos")
      // .then()
      .set('Content-Type': 'application/json')
      .end((err, res) => {
        // console.log('RESPONSE',  res);
        if (err || !res.ok) {
          console.log('ERRR ', err);
        } else {

          this.setState({ productos : JSON.parse(res.text)});
        }
      });
  }

  render() {

    return ( 
      <section className="body">
        <Menu></Menu>
        <div className=" row ">
          <div className="catalogo">
            <div className="row small-12 linea-bottom">
              <div className="column">
                <h4>Catálogo de productos </h4>
              </div>
              <div className="column small-offset-5">
                <strong>¿Que estas buscando?</strong>
                <input type="text" placeholder="Buscar producto" />
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
                        <input type="button" className="small-offset-1 small-3 button warning" value="Añadir" />
                        <input type="number" className="column text-right" value="" />
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