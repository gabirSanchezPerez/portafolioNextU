import React, { Component } from 'react';
import { View, ListView, Alert, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import firebase from 'firebase';

import Linea from './LineaDB'

class ListaDB extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource(
        { rowHasChanged: (row1, row2) => row1 !== row2, }
      ),
    }
  }

	render() {
		return (
			<View style={styles.container}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderLinea.bind(this)}
          enableEmptySections={true} />
			</View>
		);
	}

  componentDidMount() {
    const datosObtenidos = firebase.database().ref('Deportes');

    procesarDatosObtenidos();
  }

  procesarDatosObtenidos(datosObtenidos){

    datosObtenidos.on('value', (items) => {

      var linea = [];
      items.forEach((item) => {
        linea.push({
          equipo1: item.val().equipo1,
          equipo2: item.val().equipo2,
          rta1: item.val().rta1,
          rta2: item.val().rta2,
          bandera: item.val().bandera,
          tipo: item.val().tipo,
          id: item.val().id,
          pais: item.val().pais,
          _key: item.key
        });
      });
      
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(linea)
      });
    });

  }

  renderLinea(Lista) { 
    // Alert.alert('Lista ',JSON.stringify(Lista));
    return (
      <View>
        <Text>123 aca {Lista.id}</Text>
      </View>
    );
  }

}

const styles = {
  container: {
  	flexDirection: 'row',
  	flexWrap: 'wrap',
  	justifyContent: 'space-around',
  },
};

export default ListaDB;
