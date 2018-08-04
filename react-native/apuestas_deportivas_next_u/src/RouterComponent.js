import React, { Component } from 'react';
import { Scene, Router, Stack } from 'react-native-router-flux';

// Componente principales para navegar
import Baloncesto from './components/app/Baloncesto';
import Apostar from './components/app/Apostar';
import Futbol from './components/app/Futbol';
import Perfil from './components/app/Perfil';
import Inicio from './components/app/Inicio';

class RouterComponent extends Component {
  render() {
  	return(
		<Router>
			<Stack key="root">
				<Scene
					key="Inicio"
					component={Inicio}
					title= "Inicio"
				/>
				<Scene
					key="Futbol"
					direction="horizontal"
					component={Futbol}
					title= "Futbol"
					initial

				/>
				<Scene
					key="Baloncesto"
					direction="vertical"
					component={Baloncesto}
					title= "Baloncesto"
				/>
				<Scene
					key="Apostar"
					component={Apostar}
					title= "Apostar"
				/>
				<Scene
					key="Perfil"
					component={Perfil}
					title= "Perfil"
				/>
			</Stack>
		</Router>
	);
  }
}

export default RouterComponent;