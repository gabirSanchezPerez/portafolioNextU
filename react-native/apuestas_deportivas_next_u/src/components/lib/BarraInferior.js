import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux'; 

const BarraInferior = (props) => {
    const { contenedor, item } = styles;
    return (
        <View style={contenedor}>
            <TouchableOpacity style={item} onPress={() => Actions.Inicio()}>
                <Icon name="home" size={30} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity style={item} onPress={() => Actions.Futbol()}>
                <Icon name="futbol-o" size={30} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity style={item} onPress={() => Actions.Baloncesto()}>
                <Icon name="dribbble" size={30} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity style={item} onPress={() => Actions.Apuesta()}>
                <Icon name="money" size={30} color="#000" />
            </TouchableOpacity>
        </View>
    );
};

const styles = {
    contenedor: {
        height: 50,
        backgroundColor: '#E5E5E5',
        flexDirection: 'row',
    },
    item: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#999999',
    }
};

export { BarraInferior };
