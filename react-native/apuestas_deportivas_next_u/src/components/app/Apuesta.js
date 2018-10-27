import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { BarraInferior } from '../lib';

import ListaDB from './ListaDB';

class Apuesta extends Component {
  
  constructor(props) {
    super(props);
    this.state = { 
      
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <ListaDB deporte={"TODOS"} tabActive={4}  />
      </View>
    );
  }

}

const styles = {
  container: {
    //flex: 1,
    // flexDirection: 'column',
    // flexWrap: 'wrap',
    // justifyContent: 'center',
    // backgroundColor: '#0fff0a',
    // alignItems: 'center'
  },
};

export default Apuesta;