import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { BarraInferior } from '../lib';

import Lista from './Lista';

class Apuesta extends Component {
  
  constructor(props) {
    super(props);

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
  },
};

export default Apuesta;