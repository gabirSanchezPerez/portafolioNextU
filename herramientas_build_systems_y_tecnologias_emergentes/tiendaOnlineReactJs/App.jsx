import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Login from './componentes/login/Login.jsx'
import Inicio from './componentes/app/Inicio.jsx'
import Detalle from './componentes/app/Detalle.jsx'
import Carrito from './componentes/app/Carrito.jsx'

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      logeado: false,
      contador: 2,
    }
  }

  render() {

    if (this.state.logeado) {
      return <div>
        <Route  staticContext={this.state.contador} path="/" exact component={Inicio} />
        <Route path="/catalogo/:id" exact component={Detalle} />
        <Route path="/carrito" component={Carrito} />
      </div>
    } else {
      return <Login></Login>
    }

  }

  componentDidMount() {
    console.log("revisando logeo")
    if(parseInt(localStorage.getItem("currentUserIdReact")) > 0) {
      this.setState({ logeado: true});
    }
  }

}

export default App;