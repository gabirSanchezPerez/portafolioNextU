import React from 'react';
import * as request from 'superagent';
import { AsyncStorage } from 'AsyncStorage';

// import './Login.css';


var url = "http://127.0.0.1/portafolioNextU/herramientas_build_systems_y_tecnologias_emergentes/webServices/ws.php?query=";

class Login extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      correo: 'gabir_sanchez@hotmail.com',
      contrasenia: 'Gabir123',
    }

    this.logearse = this.logearse.bind(this)
    this.cambiosInput = this.cambiosInput.bind(this)
  }

  // async saveItem(item, value) {
  //   try {
  //     await AsyncStorage.setItem(item, value);
  //   } catch (error) {
  //     Alert.alert('AsyncStorage error', error.message);
  //   }
  // }



  logearse(){
    if(this.state.correo != "" && this.state.contrasenia != "") {
      // console.log(url+"login")
      request
        .post(url+"login")
        .set('Content-Type': 'application/json')
        .field({
          correo: this.state.correo,
          contrasenia: this.state.contrasenia
        })
        .end((error, response) => {
          if (!error || response) {
            console.log('Responseeee',  response);
            // this.setState({ logeado: true });
          } else {
            console.log('ERRR ', error);
          }
        });

    } else {
      console.log(" Alert " + this.state.correo);

    }
  }

  cambiosInput(e){
    this.setState({[e.target.name]: e.target.value});    
  }

  render() {
    // console.log("render");
    return (
      <div>
        <section className="row form_login">
          <form className="small-offset-3 small-6 form">
            <strong>Correo Electrónico</strong>
            <input type="email" name="correo" value={this.state.correo} placeholder="Escriba su Correo Electrónico" required onChange={this.cambiosInput} />
            <strong>Contraseña</strong>
            <input type="password" name="contrasenia" value={this.state.contrasenia} placeholder="Escriba su Contraseña" required onChange={this.cambiosInput}  />
            <div className="text-center">
              <button className="button secondary" onClick = {this.logearse} >Ingresar</button>
            </div>
          </form>
        </section>
      </div>
   );
 }

  // componentDidMount() {
  //   console.log(" componentDidMount ");
  // }

}

export default Login;
