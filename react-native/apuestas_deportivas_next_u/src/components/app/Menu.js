import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux'; 

class Menu extends Component {
	render() {
		return (
			<View style={styles.container}>
                <TouchableOpacity 
					style={styles.btnMenu}
                    onPress={() => Actions.Futbol()}>
                    <Icon name="futbol-o" size={50} color="#293229" />
                    <Text style={styles.txtBtnMenu}>Fútbol</Text>
                </TouchableOpacity>

                <TouchableOpacity 
					style={styles.btnMenu}
                    onPress={() => Actions.Baloncesto()}>
                    <Icon name="dribbble" size={50} color="#FF2200" />
                    <Text style={styles.txtBtnMenu}>Baloncesto</Text>
                </TouchableOpacity>

                <TouchableOpacity 
					style={styles.btnMenu}
                    onPress={() => Actions.Apuesta()}>
                    <Icon name="money" size={50} color="#4E884F" />
                    <Text style={styles.txtBtnMenu}>Apostar</Text>
                </TouchableOpacity>

				<TouchableOpacity 
					style={styles.btnMenu}
                    onPress={() => Actions.Perfil()}>
                    <Icon name="user" size={50} color="#29A1D5" />
                    <Text style={styles.txtBtnMenu}>Perfil</Text>
                </TouchableOpacity>
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

export default Menu;
