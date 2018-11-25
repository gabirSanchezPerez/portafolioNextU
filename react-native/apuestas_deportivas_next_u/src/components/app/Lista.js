import React, { Component } from 'react';
import { View, ListView, Alert, Text, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import firebase from 'firebase';
import { BarraInferior, Spinner } from '../lib';

import Linea from './Linea'

// import { connect } from 'react-redux';
// import { watchDeporteData } from './../../reducers/reducer';

let cont = 0;
let paisAUx = "";
let ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

class ListaDB extends Component {

  constructor(props) {
    super(props);

    this.state = {
      dataSource: new ListView.DataSource(
        { rowHasChanged: (row1, row2) => row1 !== row2, }
      ),
      resultadosSeccion: null,
      datosApuestaState: null,
    };

  }

  componentWillMount() {
    this.obtenerItems();
  }

	render() {
		return (
      <View>
        {this.contenidoApp()}
      </View>

		);
	}

  contenidoApp(){
    cont = 0;
    switch (this.state.resultadosSeccion) {
      case true:
        return (
          <View style={styles.container}>
            <ListView
              dataSource={this.state.dataSource}
              renderRow={this.mostrarLinea.bind(this)}
              enableEmptySections={true} />
            <BarraInferior tabActive={this.props.tabActive} />
          </View>
        );
        break;

      case null:
      default:
        return (
          <View style={{height: '100%', paddingTop:20}} >
            <Spinner size={100} message="Buscando información" />
          </View>
        );
        break;
    }
  }

  mostrarLinea(item) { 

    if(this.props.deporte === item.tipo){
      return (
          <View style={styles.container2}>
            {this.mostrarBandera(item)}
            <Linea item={item} posicion={cont++} />
          </View>
      );
    } else {
      return (
          <View>
            {cont == 0 ? (
              <View  style={styles.subtitulo} >
                <Text style={styles.subtituloText}>Proximos Encuentros</Text>
              </View>
              ) : null } 
            <View  style={styles.container2} >
              {this.mostrarBandera(item)}
              <Linea item={item} posicion={cont++}/>
            </View>
          </View>
        );
    }
  }


  mostrarBandera(item){
    if(paisAUx != item.pais) {
      paisAUx = item.pais;
      return (
        <View style={styles.contenedorSecundario}>
          <Image
            style={styles.imageStyles}
            source={{ uri: item.bandera }}
          />
          <Text style={styles.txtStyles}>{item.pais}</Text>
        </View>
      );
    } 
  }

  //================================
  //    Consultar la base de datos y obtener los resultados de fútbol
  //================================

DataFire(data) {
  // FIREBASE APUESTAS
  firebase.database().ref('Apuestas/' + uid).on('value', (apuestas) => {
    //Obtener la información a través de firebase.
    apuestas.forEach((deporte) => {

      //Recore los item nivel 1.
      deporte.forEach((item) => {
        data(item.val());
      });
    });

  });

}

  obtenerItems() {
 
    const uid = firebase.auth().currentUser.uid;
    const datosDeporte = [];

    // FIREBASE DEPORTES
    firebase.database().ref('Deportes').on('value', (items) => {
      
      //Obtener la información a través de firebase.
      items.forEach((item) => {
       
       //Recore los item nivel 1.
        if ( (this.props.deporte === item.val().tipo && item.val().finalizado == 1) || (this.props.deporte === "TODOS" && item.val().finalizado == 0) ) {
          item.val().rta2 = 2340;
          datosDeporte.push(item.val());
        }
      });
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(datosDeporte),
        resultadosSeccion: true
      });
    });
    // FIREBASE DEPORTES
  }
}


const styles = {
  contenedorSecundario:{
    flex: 1,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#CCC',
    paddingBottom:5,
  },
  imageStyles: {
      height: 40,
      width: 40,
      marginTop: 5,
      marginLeft:15,
  },
  txtStyles: {
    fontSize: 20,
    marginLeft: 10,
    fontWeight: '700',
    paddingTop:15,
  },
  container: {
    flexWrap: 'wrap',
    flex: -1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    //alignItems: 'center',
  },
  container2: {
    flex: 1,
  },  
  subtitulo: {
    backgroundColor: '#097',
  },
  subtituloText: {
    fontSize: 22,
    margin: 10,
    fontWeight: '700',
    color: '#FFF',
  },  
};

export default ListaDB;
