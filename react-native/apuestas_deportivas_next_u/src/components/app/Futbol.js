import React, { Component } from 'react';
import { View } from 'react-native';
import { BarraInferior } from '../lib';

import Lista from './Lista';

class Futbol extends Component {

  constructor(props) {
    super(props);

  }

  render() {
    return (
      <View >
        <Lista deporte={'Futbol'} tabActive={2} />
      </View>
    );
  }

}

export default Futbol;