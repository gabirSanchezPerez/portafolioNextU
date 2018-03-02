import React from 'react';
import { AsyncStorage } from 'AsyncStorage';
import { Switch, Route, Redirect } from 'react-router-dom';

import Login from './componentes/login/Login.jsx'
import Inicio from './componentes/app/Inicio.jsx'
import Detalle from './componentes/app/Detalle.jsx'
import Carrito from './componentes/app/Carrito.jsx'

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      logeado: false
    }
  }

  render() {

    if (!this.state.logeado) {
      return <div>
        <Route path="/" exact component={Inicio} />
        <Route path="/catalogo/:id" exact component={Detalle} />
        <Route path="/carrito" component={Carrito} />
      </div>
    } else {
      return <Login></Login>
    }

  }

  componentDidMount() {

  }

}

export default App;