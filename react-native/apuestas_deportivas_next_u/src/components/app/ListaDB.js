import React, { Component } from 'react';
import { View, ListView, Alert, Text, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
// import firebase from 'firebase';
import { BarraInferior } from '../lib';

import Linea from './LineaDB'

import { connect } from 'react-redux';
import { watchDeporteData } from './../../reducers/reducer';

let cont = 0;
let paisAUx = "";

class ListaDB extends Component {

  constructor(props) {
    super(props);
    
    cont = 0;
  }

  componentWillMount() {
  
    const ds = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.dataSource = ds.cloneWithRows(this.props.deportes);
  
  }
	
	render() {
		return (
			<View style={styles.containerPrincipal}>
        		<ListView
          			dataSource={this.dataSource}
          			renderRow={this.renderLinea.bind(this)}
          			enableEmptySections={true} />
          		<BarraInferior />
			</View>
		);
	}

  renderLinea(lista) { 
    //console.warn(lista);

    if(this.props.deporte === lista.tipo){
	 	return (
	        <View >
	          {this.renderBandera(lista)}
	          <Linea infoLista={lista} posicion={cont++}/>
	        </View>
	  	);
    } else {
    	return (
	        <View >
	          {cont == 0 ? (
	          	<View >
		        <Text style={styles.txtStyles}>Proximos Encuentros</Text>
		        </View>
	          	) : (
	          	<View />
	          	)
	          }
	          	<Linea infoLista={lista} posicion={cont++}/>
	        </View>
      	);
    }
  }

  obtenerFecha() {
    let d = new Date();
    let mes = d.getMonth() + 1
    if (mes.length < 10) {
    	mes = "0"+mes;
    } 
    let dia = d.getDate()
    if (dia.length < 10) {
    	dia = "0"+dia;
    } 
    return d.getFullYear()+"-"+ mes + "-" + dia
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

}

const styles = {
  containerPrincipal: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  contenedorSecundario:{
    flex: 1,
    flexDirection: 'row',
  },
  imageStyles: {
      height: 40,
      width: 40,
      margin: 10
  },
  txtStyles: {
    fontSize: 20,
    margin: 10,
    fontWeight: '700',
  },
  container: {
    backgroundColor: '#EEE',
    margin: 10,
  },
  container2: {
    backgroundColor: '#DDD',
    marginLeft: 10,
    marginRight: 10,
  },
};


// const mapStateToProps = (state) => {
//  return { };
// }
const mapStateToProps = state => ({ 
	deportes: state.deportes 
});

// const mapDispatchToProps = (dispatch) => {
//  return { };
// }

const mapDispatchToProps = (dispatch) => {
  return { 
    watchDeporteData: () => { dispatch(watchDeporteData()) }
  };
}

//export default ListaDB;
export default connect(mapStateToProps, mapDispatchToProps)(ListaDB);
