import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { BarraInferior, Encabezado } from '../lib';

import ListaDB from './ListaDB';

class Apuesta extends Component {
  
  render() {
    return (
      <View style={styles.container}>
        <Encabezado 
          tituloEncabezado={"Resultados App A"} 
          tituloLeft={"CerrarSesion"} />
        <ListaDB />
        <BarraInferior />
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

export default Apuesta;