import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

class LineaDB extends Component {
	render() {
		return (
			<View style={styles.container}>
               
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
  btnMenu: {
    width: '35%',
  	alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 2,
    borderWidth: 2,
    borderColor: '#545454',
    padding: 10,
    justifyContent: 'center',
    shadowColor: '#F00',
	shadowOffset: { width: 0, height: 10 },
	shadowOpacity: 0.5,
  },
  txtBtnMenu: {
    color: '#333',
    fontSize: 20,
    textAlign: 'center',
    fontWeight: '700',
  },
};

export default LineaDB;
