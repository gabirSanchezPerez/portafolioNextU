import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const Boton = ({ texto, onPress, touchableStyle, textStyle }) => {
    const { contenedorStyle, textoStyle } = styles;
    return (
        <TouchableOpacity style={[contenedorStyle, touchableStyle]} onPress={onPress}>
            <Text style={[textoStyle, textStyle]}>{texto}</Text>
        </TouchableOpacity>
    );
};

const styles = {
    contenedorStyle: {
        borderRadius: 5,
        borderWidth: 2,
        borderColor: '#1c2551',
        backgroundColor: '#3b4167',
        marginLeft: 5,
        marginRight: 10,
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
        
    },
    textoStyle: {
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 10,
        paddingRight: 10,
        fontSize: 18,
        fontFamily: 'Bebas Neue',
        color: 'white'

    }
};

export { Boton };

