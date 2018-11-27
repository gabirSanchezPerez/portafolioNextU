import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { BarraInferior, Encabezado } from '../lib';

import Lista from './Lista';

class Baloncesto extends Component {
  
  constructor(props) {
    super(props);

  }
  render() {
    return (
      <View>
        <Lista deporte={'Baloncesto'}  tabActive={3} />
      </View>
    );
  }

}

export default Baloncesto;