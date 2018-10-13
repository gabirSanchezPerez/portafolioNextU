import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { BarraInferior, Encabezado } from '../lib';
import Menu from './Menu';

class Inicio extends Component {
  
  render() {
    return (
      <View style={styles.container}>
              <Encabezado tituloEncabezado={"Resultados App"} tituloLeft={"CerrarSesion"} />
        <Text>ACA</Text>
        <Text>ACAaaaaaaaaaaaaa</Text>
      </View>
    );
  }

}

const styles = {
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0ff',
    height: 200,
  },
};

export default Inicio;
