import React, { Component } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import { Provider } from 'react-redux';
// import { createStore } from 'redux';

import Router from './src/router';
import Inicio from './src/components/app/Inicio';
import Formulario from './src/components/app/Formulario';
import { Encabezado, Spinner } from './src/components/lib'; 
import firebase from 'firebase';

export default class App extends Component<{}> {

  constructor(props) {
    super(props);
    this.state = {
      sesionIniciada: null
    }

  }

  render() {
    return (
      <View>
        {this.contenidoSegunSesion()}
      </View>
    );
  }

  componentWillMount() {
    
    firebase.initializeApp({
      apiKey: 'AIzaSyCDB5XOgOQskv-zs-YzGC_3g9vUtZsWPDc',
      authDomain: 'apuestas-deportivas-next-u.firebaseapp.com',
      databaseURL: 'https://apuestas-deportivas-next-u.firebaseio.com',
      projectId: 'apuestas-deportivas-next-u',
      storageBucket: 'apuestas-deportivas-next-u.appspot.com',
      messagingSenderId: '771392140910'
    });

    firebase.auth().onAuthStateChanged(user => {
      if(user){
        this.setState({sesionIniciada: true});
      }else{
        this.setState({sesionIniciada: false});
      }
    });
  }

  contenidoSegunSesion(){

    switch (this.state.sesionIniciada) {
      case true:
        return (
          <View>
            <Router />
          </View>
        );

      case false:
        return (
          <View>
            <Encabezado tituloEncabezado={'Login App'} />
            <Formulario />
          </View>
        );

      default:
        return (
          <View style={{height: '100%', paddingTop:20}} >
            <Spinner size={100} />
          </View>
        );
        break;
    }
  }

}
