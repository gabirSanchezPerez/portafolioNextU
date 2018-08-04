import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

class LineaDB extends Component {

    constructor(props) {
    super(props);

  }

	render() {
		return (
			<View style={(this.props.posicion % 2 == 0) ? styles.container : styles.container2}>
        		<Text style={styles.txtListaL}>{this.props.posicion}-{this.props.infoLista.equipo1}</Text>
        		<Text style={styles.txtLista}>
        			{this.props.infoLista.rta1} - {this.props.infoLista.rta2}
        		</Text>
        		<Text style={styles.txtListaL}>{this.props.infoLista.equipo2}</Text>
			</View>
		);
	}
}

const styles = {
  container: {
    flex: 1,
  	flexDirection: 'row',
  	justifyContent: 'space-between',
    paddingTop: 8,
    paddingBottom: 7,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: '#EEE',
  },
    container2: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 8,
    paddingBottom: 7,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: '#DDD',
  },
  txtListaL: {
    color: '#222',
    fontSize: 15,
    paddingLeft: 10,
    paddingRight: 10,
    width: '43%',
    // backgroundColor: '#656565',
  },
  txtLista: {
    color: '#222',
    fontSize: 15,
    width: 65,
  },
};

export default LineaDB;
