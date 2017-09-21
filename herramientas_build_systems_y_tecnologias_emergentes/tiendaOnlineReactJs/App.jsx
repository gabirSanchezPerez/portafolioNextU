import React from 'react';

import Login from './componentes/Login.jsx'
import Home from './componentes/Home.jsx'

class App extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
       logeado: false
    }
  }
  
  render() {

    if(this.state.logeado) {
      return <Home></Home>
    }else{
      return <Login></Login>
    }

  }
}

export default App;
