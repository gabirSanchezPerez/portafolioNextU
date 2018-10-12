import React, { Component } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome';
import { Provider } from 'react-redux';
// import { createStore } from 'redux';
import { store } from './reducers/reducer';
// import Inicio from './components/app/Inicio';
import Router from './Router';
import Formulario from './components/app/Formulario';
import { Encabezado, Spinner } from './components/lib'; 
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

          // <Provider store={store} >
          // </Provider>
  contenidoSegunSesion(){

    switch (this.state.sesionIniciada) {
      case true:
        return (
          <Router />
        );
        break;

      case false:
        return (
          <View>
            <Encabezado tituloEncabezado={'Login App'} />
            <Formulario />
          </View>
        );
        break;

      default:
        return (
          <View style={{height: '100%', paddingTop:20}} >
            <Spinner size={100} message="Iniciando conexión" />
          </View>
        );
        break;
    }
  }

}
