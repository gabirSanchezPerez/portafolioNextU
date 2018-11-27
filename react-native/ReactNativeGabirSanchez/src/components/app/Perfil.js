import React, { Component } from 'react';
import { Text, View, Image, ScrollView } from 'react-native';
import firebase from 'firebase';
import { BarraInferior } from '../lib';

class Perfil extends Component {
  
  constructor(props) {
    super(props);
    this.state = { 
      email: '',
    }
  }

   componentWillMount() {
    //Reiniciar los estados de las variables
    this.state.email = firebase.auth().currentUser.email;
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.header}>
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
        <BarraInferior tabActive={0} />
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
    alignItems: 'center',
    marginTop:10
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

};

export default Perfil;