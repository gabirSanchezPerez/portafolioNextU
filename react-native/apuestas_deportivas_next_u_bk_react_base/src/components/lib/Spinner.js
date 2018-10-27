import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';

const Spinner = ({ size, message }) => {
    return (
        <View style={styles.viewStyles}>
            <ActivityIndicator size={size} />
            <Text style={styles.mensaje}>{message}</Text>
        </View>
    );
};

const styles = {
    viewStyles: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    mensaje: {
        fontSize: 25,
    }
};

export { Spinner };
