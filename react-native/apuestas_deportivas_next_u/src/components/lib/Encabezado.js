import React from 'react';
import { Text, View } from 'react-native';

const Encabezado = (props) => {
    const { viewStyle, textCenter, textRight } = styles;
    return (
        <View style={viewStyle}>
            <Text style={textCenter}>
                {props.tituloEncabezado}
            </Text>
            <Text style={textRight}>
                {props.tituloLeft}
            </Text>
        </View>
    );
};

const styles = {
    viewStyle: {
        paddingTop: 5,
        backgroundColor: '#0094FF',
        height: 50,
        shadowColor: '#F00',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 6,
        paddingRight: 6
    },
    textCenter: {
        color: '#000',
        fontSize: 20,
    },
    textRight: {
        color: '#494949',
        fontSize: 15,
        paddingRight: 6
    }
};

export { Encabezado };
