import React, { Component } from 'react';
import { View, Text } from 'react-native';

import ListaDB from './ListaDB';

class Apostar extends Component {
  
  render() {
    return (
      	<View style={styles.container}>
	        <ListaDB deporte={'Apostar'} /> 
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

export default Apostar;