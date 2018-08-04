import React, { Component } from 'react';
import { Platform, StyleSheet, View } from 'react-native';

import { Provider } from 'react-redux';
// import { createStore } from 'redux';
// import { store } from './src/reducers/deportesReducer';
import { store } from './src/reducers/reducer';

import RouterComponent from './src/RouterComponent';
import Formulario from './src/components/app/Formulario';
import { Encabezado, Spinner } from './src/components/lib'; 
import firebase from 'firebase';

export default class App extends Component<{}> {

  constructor(props) {
    //console.warn(this.state.sesionIniciada)
    super(props);
    this.state = {
      sesionIniciada: null
    }

  }

  render() {
    return (
      <Provider store={store}>
        <View>
          {this.contenidoSegunSesion()}
        </View>
      </Provider>
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
      case false:
        return (
          <View style={styles.container}>
            <RouterComponent />
          </View>
        );

      case true:
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

const styles = {
  container: {
  	// flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    height: '100%'
  },
};


/* 
      <Provider store={store}>
        <View>
          {this.contenidoSegunSesion()}
        </View>
      </Provider>

      */