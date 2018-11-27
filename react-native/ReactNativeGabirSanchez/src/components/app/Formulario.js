import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Card, CardSection, Boton, Input, Spinner } from '../lib';
import firebase from 'firebase';

class Formulario extends Component {
  state = { email: '',    password: '', error: '', cargando: false }
  
  render() {
    return (
      <View style={styles.contentView}>

      <Card addStyle={{ borderWidth: 0, shadowColor: 'transparent', elevation: 0 }} >
        <CardSection addStyle={{ paddingBottom: 1,
          borderBottomWidth: 0 }} >
          <Input
            texto={'Email'}
            value={this.state.email}
            onChangeText={email => this.setState({ email })}
            placeholder={'usuario@mail.com'}
            secureTextEntry={false}
            autoCorrect={false}
            addEtiquetaStyle={{ fontFamily: 'Bebas Neue', fontSize: 18, fontWeight: '700'}}
            addInputStyle={{ fontSize: 15, lineHeight: 20, }}
          />
        </CardSection>

        <CardSection addStyle={{ paddingBottom: 1,
            borderBottomWidth: 0 }}>
          <Input
            texto={'Contraseña'}
            value={this.state.password}
            onChangeText={password => this.setState({ password })}
            placeholder='Contraseña'
            secureTextEntry
            autoCorrect={false}
            addEtiquetaStyle={{ fontFamily: 'Bebas Neue', fontSize: 18, fontWeight: '700'}}
            addInputStyle={{ fontSize: 15, lineHeight: 20, }}
          />
        </CardSection>

        <CardSection addStyle={{ 
          borderBottomWidth: 0,
          justifyContent: 'flex-end', }}>
          {this.mostrarSpinner()}
        </CardSection>

        <CardSection addStyle={{ paddingLeft: 10, paddingRight: 10,
           borderBottomWidth: 0 }}>
          <Text style={styles.errorMsgStyle}>
            {this.state.error}
          </Text>
        </CardSection>
        
      </Card>
      </View>
    );
  }

  enviarFormulario() {
    const { email, password } = this.state;
    this.setState({ error: '', cargando: true });

    if(email === "" || password === "") {
      this.setState({
        error: "El campo Email y Contraseña no deben estar vacios", 
        cargando: false
      });
    } else {
      firebase.auth().signInWithEmailAndPassword(email, password)
        .then(this.loginExitoso.bind(this))
        .catch((err) => {
          this.loginError(err);
        });
    }
  }

  loginExitoso(){
    this.setState({
      email:'', password:'', cargando: false
    });
  }  

  loginError(res){
    //res.message
    this.setState({
      error: res.message, 
      cargando: false
    });
  }

  mostrarSpinner() {
    if(this.state.cargando){
      return <Spinner size={30} />;
    } else {
      return <Boton 
        texto={'Iniciar Sesión'}
        onPress={this.enviarFormulario.bind(this)}
        touchableStyle={{ backgroundColor: '#4D5B90'}}
        textStyle={{ fontSize: 15, }} />
    }
  }

}

const styles = {

  contentView: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#333',
    padding: 10,
  },
  errorMsgStyle: {
    fontSize: 15,
    color: '#E00',
    alignSelf: 'center',
  }
}
export default Formulario;