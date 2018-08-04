import React, { Component } from 'react';
import { View, Text } from 'react-native';

import ListaDB from './ListaDB';

class Perfil extends Component {
  
  render() {
    return (
      	<View style={styles.container}>
	        <Text>Perfil</Text>
      	</View>
    );
  }

}

const styles = {
  container: {
  	flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#FFF',
    height: '100%'
  },
};

export default Perfil;