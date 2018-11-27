import React from 'react';
import { View } from 'react-native';

const CardSection = (props) => {
    const { viewStyles } = styles;
    return (
        <View style={[viewStyles, props.addStyle]}>
            {props.children}
        </View>
    );
};

const styles = {
    viewStyles: {
        borderBottomWidth: 1,
        borderColor: '#CCC',
        paddingLeft: 5,
        paddingRight: 5,
        paddingBottom: 10,
        position: 'relative',
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
        flexDirection: 'row'
    }
};

export { CardSection };


