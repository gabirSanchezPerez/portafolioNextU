import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { BarraInferior } from '../lib';

import Lista from './Lista';

class Apuesta extends Component {
  
  constructor(props) {
    super(props);
    this.state = { 
      
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Lista deporte={"TODOS"} tabActive={4}  />
      </View>
    );
  }

}

const styles = {
  container: {
    flex: 1,
    // flexDirection: 'column',
    // flexWrap: 'wrap',
    // justifyContent: 'center',
    // backgroundColor: '#0fff0a',
    // alignItems: 'stretch'
  },
};

export default Apuesta;