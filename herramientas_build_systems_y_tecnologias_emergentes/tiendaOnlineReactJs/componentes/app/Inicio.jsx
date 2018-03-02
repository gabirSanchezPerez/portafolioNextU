import React from 'react';
import * as request from 'superagent';
import { AsyncStorage } from 'AsyncStorage';
import { NavLink } from 'react-router-dom';

import Menu from './Menu.jsx';

let url = "http://127.0.0.1/portafolioNextU/herramientas_build_systems_y_tecnologias_emergentes/webServices/ws.php?query=productos";
class Inicio extends React.Component {

  // componentWillMount() {
  //   console.log("component url " + url);
  //   request
  //     .post(url)
  //     .set('Content-Type': 'application/json')
  //     .end((error, response) => {
  //       if (!error || response) {
  //         console.log('Response',  response);
  //         // this.setState({ logeado: true });
  //       } else {
  //         console.log('ERRR ', error);
  //       }
  //     });
  // }

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
              <div className="small-12 medium-4 large-3 column">
                <div className="card">
                  <div className="text-center">
                    <img className="" src="./assets/img/productos/ajo.jpg" />
                  </div>
                  <div className="card-section">
                    <p><strong>NOMBRE</strong></p>
                    <p>Precio: $200.000</p>
                    <p>Unidades disponibles: 3000</p>
                
                      <div className=" row small-12 padding-horizontal-1">
                        <NavLink to="/catalogo/1" className="small-4 button primary">Ver más</NavLink>
                        <input type="button" className="small-offset-1 small-3 button warning" value="Añadir" />
                        <input type="number" className="column text-right" value="" />
                      </div>
                  </div>
                </div>
              </div>

              <div className="small-12 medium-4 large-3 column">
                <div className="card">
                  <div className="text-center">
                    <img className="" src="./assets/img/productos/ajo.jpg" />
                  </div>
                  <div className="card-section">
                    <p><strong>NOMBRE</strong></p>
                    <p>Precio: $200.000</p>
                    <p>Unidades disponibles: 3000</p>
                
                      <div className=" row small-12 padding-horizontal-1">
                        <a className="small-4 button primary" href="#">Ver más</a>
                        <input type="button" className="small-offset-1 small-3 button warning" value="Añadir" />
                        <input type="number" className="column text-right" value="" />
                      </div>
                  </div>
                </div>
              </div>

              <div className="small-12 medium-4 large-3 column">
                <div className="card">
                  <div className="text-center">
                    <img className="" src="./assets/img/productos/ajo.jpg" />
                  </div>
                  <div className="card-section">
                    <p><strong>NOMBRE</strong></p>
                    <p>Precio: $200.000</p>
                    <p>Unidades disponibles: 3000</p>
                
                      <div className=" row small-12 padding-horizontal-1">
                        <a className="small-4 button primary" href="#">Ver más</a>
                        <input type="button" className="small-offset-1 small-3 button warning" value="Añadir" />
                        <input type="number" className="column text-right" value="" />
                      </div>
                  </div>
                </div>
              </div>


              <div className="small-12 medium-4 large-3 column">
                <div className="card">
                  <div className="text-center">
                    <img className="" src="./assets/img/productos/ajo.jpg" />
                  </div>
                  <div className="card-section">
                    <p><strong>NOMBRE</strong></p>
                    <p>Precio: $200.000</p>
                    <p>Unidades disponibles: 3000</p>
                
                      <div className=" row small-12 padding-horizontal-1">
                        <a className="small-4 button primary" href="#">Ver más</a>
                        <input type="button" className="small-offset-1 small-3 button warning" value="Añadir" />
                        <input type="number" className="column text-right" value="" />
                      </div>
                  </div>
                </div>
              </div>


              <div className="small-12 medium-4 large-3 column">
                <div className="card">
                  <div className="text-center">
                    <img className="" src="./assets/img/productos/ajo.jpg" />
                  </div>
                  <div className="card-section">
                    <p><strong>NOMBRE</strong></p>
                    <p>Precio: $200.000</p>
                    <p>Unidades disponibles: 3000</p>
                
                      <div className=" row small-12 padding-horizontal-1">
                        <a className="small-4 button primary" href="#">Ver más</a>
                        <input type="button" className="small-offset-1 small-3 button warning" value="Añadir" />
                        <input type="number" className="column text-right" value="" />
                      </div>
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

export default Inicio;