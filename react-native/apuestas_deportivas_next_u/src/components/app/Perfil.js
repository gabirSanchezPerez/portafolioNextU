import React, { Component } from 'react';
import { Text, View, Image, ScrollView } from 'react-native';
import firebase from 'firebase';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';
import { Card, CardSection, Boton, Spinner, BarraInferior } from '../lib';


class Perfil extends Component {
  
  constructor(props) {
    super(props);
    this.state = { 
      email: '',
      totalApuestas: 0,
    }
  }

   componentWillMount() {
    //Reiniciar los estados de las variables
    this.setState({ totalApuestas: 0, cargando: false, error: '', actualizado: false });
    this.state.email = firebase.auth().currentUser.email;
    //this.contarApuestas();
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.header}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.error}>{this.state.error}</Text>
            </View>
            <View style={styles.pictureHolder}>
              <View style={styles.picture}>
                <Image 
                  source={require('../../img/avatar.png')} 
                  style={styles.avatar}
                />
              </View>
            </View>
            <Text style={styles.textUsername}>Gabir Argenis</Text>
            <Text style={styles.textLastname}>Sánchez Pérez</Text>
            <Text style={styles.textInformacioj}> {this.state.email} </Text> 
          </View>
        </ScrollView>
        <BarraInferior tabActive={4} />
      </View>
    );
  }

}

const styles = {
  container: {
    backgroundColor: '#FFF',
    width: '100%',
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
   },
   header: {
    justifyContent: 'center',
    alignItems: 'center'
   },
    pictureHolder: {
      flexDirection: 'row'
    },
    picture: {
      width: 160, 
      height: 170,
      borderColor: '#222',
      borderWidth: 1,
      borderRadius: 250,
      backgroundColor: '#fff',
      overflow: 'hidden',
      padding: 3,
      alignItems: 'center',
      justifyContent: 'center',
    },
    avatar: {
      width: '75%', 
      height: '75%',
      alignItems: 'center',
    },
    textUsername: {
      fontSize: 25,
      fontWeight: '600',
      color: '#222',
      marginTop: 10,
    },
    textLastname: {
      fontSize: 16,
      fontWeight: '600',
      color: '#222',
      marginTop: 10,
    },
    textInformacioj: {
      fontSize: 20,
      marginLeft: 10
    },
    error: {
      marginTop: 5,
      marginBottom: 5,
      padding: 3,
      color: 'white',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
    },
};

export default Perfil;