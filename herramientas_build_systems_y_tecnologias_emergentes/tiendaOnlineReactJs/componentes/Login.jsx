import React from 'react';
import Request from 'superagent';

class Login extends React.Component{
  constructor() {
    super();
    this.state = {
      email: 'gabir_sanchez@hotmail.com',
      password: 'Gabir123',

    }
    console.log("Constructor");
  }

  componentWillMount(){
    console.log("component Will Mount ");
    var url = "http://127.0.0.1/portafolioNextU/herramientas_build_systems_y_tecnologias_emergentes/webServices/ws.php?query=login";
    Request
      .post(url)
      .set('Content-Type': 'application/json')
      .query({
          correo: this.state.email,
          contrasenia: this.state.password
        })
      .end((error, response) => {
        if (!error || response) {
          console.log('RTA SERVER 1',  response);
          // this.setState({logeado: true});
        } else {
          console.log('ERRR ', error);
        }
      }
    );

  }


 render() {
   console.log("render");
   return (
     <div>
       <section className="row form_login">
         <form className="small-offset-3 small-6 form">

           <strong>Correo Electrónico</strong>
           <input type="email" value={this.state.email} required />
           <strong>Contraseña</strong>
           <input type="password" value={this.state.password} required />
           <div className="text-center">
             <button className="button secondary" >Ingresar</button>
           </div>
         </form>
       </section>
     </div>
   );
 }

}

export default Login;
