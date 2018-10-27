import React, { Component } from 'react';
import { View } from 'react-native';
import { BarraInferior } from '../lib';

import ListaDB from './ListaDB';

class Futbol extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      
    }

  }

  render() {
    return (
      <View style={styles.container}>
        <ListaDB deporte={'Futbol'} tabActive={2} />
      </View>
    );
  }

}

const styles = {
  container: {
    // flex: 1,
    //flexDirection: 'column',
    //justifyContent: 'flex-start',
    // justifyContent: 'space-between',
    //alignItems: 'flex-start'
    //alignItems: 'center',
    //width: '100%',
  },
};

export default Futbol;