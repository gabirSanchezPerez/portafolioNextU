import React, { Component } from 'react';
import { View, Text } from 'react-native';

import ListaDB from './ListaDB';

class Baloncesto extends Component {
  
  render() {
    return (
      <View style={styles.container}>
        <ListaDB deporte={'Baloncesto'} />
      </View>
    );
  }

}

const styles = {
  container: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    height: '100%'
  },
};

export default Baloncesto;