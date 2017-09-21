import React from 'react';
import Request from 'superagent';

class Login extends React.Component{
  constructor() {
    super();
    this.state = {
      email: 'gabir@sonacis.com',
      password: '123345'
    }
    console.log("Constructor");
  }

  componentWillMount(){
    console.log("component Will Mount ");
    var url = "http://127.0.0.1/portafolioNextU/herramientas_build_systems_y_tecnologias_emergentes/webServices/ws.php";
    Request
    .get(url)
    .set("Access-Control-Allow-Origin", "*")
          .end((error, response) => {
              if (!error || response) {
                  this.setState({ commits: response.body });
                  console.log('RTA SERVER',  response.body);
              } else {
                console.log('ERRR ', error);
              }
          }
      );
    // .set(this.state)
    // .get(url).then((response) => {
    //   console.log(response);
    // });
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
