import React, { Component } from 'react';
import { View, Text, LayoutAnimation } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { CardSection } from '../lib';

class LineaDB extends Component {

  constructor(props) {
    super(props);
  }

  componentWillUpdate() {
    LayoutAnimation.spring();
  }

	render() {
		return (
			<View >
        <CardSection style={styles.container}>
          <Text style={styles.styleLocal}>{this.props.infoLista.equipo1}</Text>
          {this.props.infoLista.finalizado == 1 ? (
            <Text style={styles.score}>{this.props.infoLista.rta1} - {this.props.infoLista.rta2}</Text>
          ):(
            <Text style={styles.score}>VS</Text>
          )}
          <Text style={styles.styleVisitante}>{this.props.infoLista.equipo2}</Text>
        </CardSection> 
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
  styleLocal: {
    textAlign: 'left',
    fontFamily: 'Orkney',
    flex: 1,
    marginTop: 7,
    marginLeft: 10,
  },
  score: {
    textAlign: 'center',
    fontFamily: 'Orkney',
    width: 73, 
    marginTop: 7,
  },
  styleVisitante: {
    textAlign: 'right',
    fontFamily: 'Orkney',
    flex: 1,
    marginTop: 7,
    marginRight: 10,
  },
};

export default LineaDB;
