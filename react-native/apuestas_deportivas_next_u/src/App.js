import React, { Component } from 'react';
import { View } from 'react-native';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './reducers';
import RouterComponent from './RouterComponent';
import Formulario from './components/app/Formulario';
import { Spinner, BarraInferior } from './components/lib'; 

import firebase from 'firebase';

export default class App extends Component<{}> {

  constructor(props) {
    super(props);
    this.state = {
      sesionIniciada: null,
    }

  }

  render() {
    return (
      <View style={styles.container}>
        {this.contenidoSegunSesion()}
      </View>
    );
  }

  componentWillMount() {
    
    var config = {
      apiKey: 'AIzaSyCDB5XOgOQskv-zs-YzGC_3g9vUtZsWPDc',
      authDomain: 'apuestas-deportivas-next-u.firebaseapp.com',
      databaseURL: 'https://apuestas-deportivas-next-u.firebaseio.com',
      projectId: 'apuestas-deportivas-next-u',
      storageBucket: 'apuestas-deportivas-next-u.appspot.com',
      messagingSenderId: '771392140910'
    };

    if (!firebase.apps.length) {
      firebase.initializeApp(config);
    }

    firebase.auth().onAuthStateChanged(user => {
      if(user){
        this.setState({sesionIniciada: true});
      }else{
        this.setState({sesionIniciada: false});
      }
    });
  }

  //Cerrar sesión
  cerrarSesion() {
    firebase.auth().signOut();
  }

  contenidoSegunSesion(){

    switch (this.state.sesionIniciada) {
      case true:
        return (
          <Provider store={createStore(reducer)} >
            <View style={{ flex: 1 }} >
              <RouterComponent cerrarSesion={this.cerrarSesion.bind(this)} />
            </View>   
          </Provider>
        );
        break;

      case false:
        return (
          <Formulario />
        );
        break;

      default:
        return (
          <View style={{height: '100%', paddingTop:20}} >
            <Spinner size={100} message="Actualizando información" />
          </View>
        );
        break;
    }
  }

}

const styles = {
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: '#f5f5f5',
  },
};
