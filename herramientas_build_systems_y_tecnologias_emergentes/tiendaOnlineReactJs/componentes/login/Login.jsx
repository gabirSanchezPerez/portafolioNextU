import React from 'react';
import * as request from 'superagent';
import { NavLink } from 'react-router-dom';

var url = "https://nextu.000webhostapp.com/webServicesNext/ws.php";

class Login extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      correo: '',
      contrasenia: '',
      logeado: false,
    }

    this.logearse = this.logearse.bind(this)
    this.cambiosInput = this.cambiosInput.bind(this)
  }

  logearse(event){
    event.preventDefault();

    if(this.state.correo != "" && this.state.contrasenia != "") {
      // console.log(url+"?query=login")
      request
        .post(url+"?query=login")
        .set('Content-Type': 'application/json')
        .field({
          // query: 'login',
          correo: this.state.correo,
          contrasenia: this.state.contrasenia
        })
        .end((err, res) => {
          if (err || !res.ok) {
            console.log('ERRR ', err);
          } else {
            res = JSON.parse(res.text)
            if(Array.isArray(res)){
              alert("Usuario y/o contraseña errados");

            } else {
              // console.log('Reseee',  res);
              localStorage.setItem('currentUserIdReact', res.id);
              location.reload(true)
            }
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
          <form onSubmit={this.logearse} className="small-offset-3 small-6 form">
            <strong>Correo Electrónico</strong>
            <input type="email" name="correo" value={this.state.correo} placeholder="Escriba su Correo Electrónico" required onChange={this.cambiosInput} />
            <strong>Contraseña</strong>
            <input type="password" name="contrasenia" value={this.state.contrasenia} placeholder="Escriba su Contraseña" required onChange={this.cambiosInput}  />
            <div className="text-center">
              <button className="button success padding-horizontal-1" type="submit" >Ingresar</button>
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
