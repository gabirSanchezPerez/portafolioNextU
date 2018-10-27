import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { BarraInferior, Encabezado } from '../lib';

import ListaDB from './ListaDB';

class Baloncesto extends Component {
  
  constructor(props) {
    super(props);
    this.state = { 
      
    }

  }
  render() {
    return (
      <View style={styles.container}>
        <ListaDB deporte={'Baloncesto'}  tabActive={3} />
      </View>
    );
  }

}

const styles = {
  container: {
    // flex: 1,
    // flexDirection: 'column',
    // justifyContent: 'space-between',
  },
};

export default Baloncesto;