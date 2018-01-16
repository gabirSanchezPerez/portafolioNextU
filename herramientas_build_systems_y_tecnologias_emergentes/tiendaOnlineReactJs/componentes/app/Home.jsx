import React from 'react';
import Request from 'superagent';

class Home extends React.Component{

	componentWillMount(){
    	console.log("component Will Mount ");
	    var url = "http://127.0.0.1/portafolioNextU/herramientas_build_systems_y_tecnologias_emergentes/webServices/ws.php?query=productos";
	    Request
	      .post(url)
	      .set('Content-Type': 'application/json')
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
	    return (
	    	<div>
	       		<h1>INICIO</h1>
	     	</div>
	   	);
	}

}

export default Home;
