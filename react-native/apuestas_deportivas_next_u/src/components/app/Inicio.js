import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { BarraInferior, Encabezado } from '../lib';

import Menu from './Menu';

class Inicio extends Component {
  
  render() {
    return (
      <View style={styles.container}>
        <Menu />
        <BarraInferior />
      </View>
    );
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

export default Inicio;