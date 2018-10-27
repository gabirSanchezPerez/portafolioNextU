import React from 'react';
import { Router, Scene, Stack } from 'react-native-router-flux';

// Componente principales para navegar
import Inicio from './components/app/Inicio';
import Futbol from './components/app/Futbol';
import Apuesta from './components/app/Apuesta';
import Baloncesto from './components/app/Baloncesto';
import Perfil from './components/app/Perfil';

const RouterComponent = (props) => {

    return (
        <Router
            sceneStyle={{ paddingTop: 50, marginBottom: 0 }}
            navigationBarStyle={{
                height: 50, 
                backgroundColor: '#3b4167', 
                elevation: 0, 
                shadowColor: 'gray', 
                shadowOffset: { width: 0, height: 1 }, 
                shadowOpacity: 0.5 
            }}
            titleStyle={{ fontSize: 22, fontFamily: 'Orkney', color: '#fff' }}
            rightButtonTextStyle={{ 
                fontFamily: 'Bebas Neue', 
                fontSize: 15, 
                lineHeight: 22, 
                color: '#eece54' 
            }} >
            <Scene key="root">
                <Scene key="Inicio" component={Inicio} title="Inicio" 
                    init
                    rightTitle="Cerrar Sesión"
                    wrapRouter={true}
                    onRight={() => props.cerrarSesion()} />
                <Scene key="Futbol" component={Futbol} title="Fútbol" 
                    init
                    rightTitle="Cerrar Sesión"
                    onRight={() => props.cerrarSesion()}  />
                <Scene key="Apuesta" component={Apuesta} title="Apuesta" 
                    init
                    initial={true}
                    rightTitle="Cerrar Sesión"
                    onRight={() => props.cerrarSesion()} />
                <Scene key="Baloncesto" component={Baloncesto} title="Baloncesto" 
                    init
                    rightTitle="Cerrar Sesión"
                    onRight={() => props.cerrarSesion()} />
                <Scene key="Perfil" component={Perfil} title="Perfil" 
                    init 
                    rightTitle="Cerrar Sesión"
                    onRight={() => props.cerrarSesion()} />
            </Scene>
        </Router>
    );
}

export default RouterComponent;