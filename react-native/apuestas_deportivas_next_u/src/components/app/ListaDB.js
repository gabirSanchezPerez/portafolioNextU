import React, { Component } from 'react';
import { View, ListView, Alert, Text, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import firebase from 'firebase';
import { BarraInferior, Spinner } from '../lib';

import Linea from './LineaDB'

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
      resultadosSeccion: null
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
              renderRow={this.renderLinea.bind(this)}
              enableEmptySections={true} />
            <BarraInferior tabActive={this.props.tabActive} />
          </View>
        );
        break;

      case null:
      default:
        return (
          <View style={{height: '100%', paddingTop:20}} >
            <Spinner size={100} message="Obteniendo información" />
          </View>
        );
        break;
    }
  }

  renderLinea(lista) { 

    if(this.props.deporte === lista.tipo){
      return (
          <View style={styles.container2}>
            {this.renderBandera(lista)}
            <Linea infoLista={lista} posicion={cont++} />
          </View>
      );
    } else {
      return (
          <View>
            {cont == 0 ? (
              <View  style={styles.subtitulo} >
                <Text style={styles.subtituloText}>Proximos Encuentros</Text>
              </View>
              ) : (
              <View />
              )
            } 
            <View  style={styles.container2} >
              {this.renderBandera(lista)}
              <Linea infoLista={lista} posicion={cont++}/>
            </View>
          </View>
        );
    }
  }


  renderBandera(lista){
    if(paisAUx != lista.pais) {
      paisAUx = lista.pais;
      return (
        <View style={styles.contenedorSecundario}>
          <Image
            style={styles.imageStyles}
            source={{ uri: lista.bandera }}
          />
          <Text style={styles.txtStyles}>{lista.pais}</Text>
        </View>
      );
    } 
  }

  //================================
  //    Consultar la base de datos y obtener los resultados de fútbol
  //================================
  obtenerItems() {

    const datos = [];

    firebase.database().ref('Deportes').on('value', (items) => {
      //Obtener la información a través de firebase.

      items.forEach((item) => {
        //Recore los item nivel 1.

        if (
          (this.props.deporte === item.val().tipo && item.val().finalizado == 1) || 
          (this.props.deporte === "TODOS" && item.val().finalizado == 0) 
        ) {
          //console.warn(JSON.stringify(item.val().tipo));
          datos.push(item.val());
        }
      });

      this.setState({ 
        dataSource: this.state.dataSource.cloneWithRows(datos),
        resultadosSeccion: true
      });

    });
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
    // width: 400,
    flexWrap: 'wrap',
    flexDirection: 'column',
    justifyContent: 'space-between',

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
