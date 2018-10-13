import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { BarraInferior, Encabezado } from '../lib';

import ListaDB from './ListaDB';

class Baloncesto extends Component {
  
  render() {
    return (
      <View style={styles.container}>
        <Encabezado 
          tituloEncabezado={"Resultados App B"} 
          tituloLeft={"CerrarSesion"} />
        <ListaDB />
        <BarraInferior />
      </View>
    );
  }

}

const styles = {
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
};

export default Baloncesto;