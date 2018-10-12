import React from 'react';
import { Router, Scene, Stack } from 'react-native-router-flux';

// Componente principales para navegar
import Inicio from './components/app/Inicio';
import Futbol from './components/app/Futbol';
import Apuesta from './components/app/Apuesta';
import Baloncesto from './components/app/Baloncesto';
import Perfil from './components/app/Perfil';

const RouterComponent = () => {
    return (
        <Router>
            <Stack key="root">
                <Scene key="Inicio" component={Inicio} title="Inicio" initial />
                <Scene key="Futbol" component={Futbol} title="Futbol"  />
                <Scene key="Apuesta" component={Apuesta} title="Apuesta" />
                <Scene key="Baloncesto" component={Baloncesto} title="Baloncesto" />
                <Scene key="Perfil" component={Perfil} title="Perfil" />
            </Stack>
        </Router>
    );
}

export default RouterComponent;