import React, { Component } from 'react';
import { Text } from 'react-native';
import { Card, CardSection, Boton, Input, Spinner } from '../lib';
import firebase from 'firebase';

class Formulario extends Component {
  state = { email: '',    password: '', error: '', cargando: false }
  render() {
    return (
      <Card>
        <CardSection>
          <Input
            texto={'Email'}
            value={this.state.email}
            onChangeText={email => this.setState({ email })}
            placeholder={'usuario@mail.com'}
          />
        </CardSection>

        <CardSection>
          <Input
            texto={'Contraseña'}
            value={this.state.password}
            onChangeText={password => this.setState({ password })}
            placeholder='contraseña'
            secureTextEntry
          />
        </CardSection>

        <CardSection>
          {this.mostrarSpinner()}
        </CardSection>
          <Text style={styles.errorMsgStyle}>
            {this.state.error}
          </Text>
        
      </Card>
    );
  }

  enviarFormulario() {
    const { email, password } = this.state;
    this.setState({ error: '', cargando: true });

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(this.loginExitoso.bind(this))
      .catch(this.loginError.bind(this))
  }

  loginExitoso(){
    this.setState({
      email:'', password:'', cargando: false
    });
  }  

  loginError(){
    this.setState({
      error: 'Error en la Autenticación', cargando: false
    });
  }

  mostrarSpinner() {
    if(this.state.cargando){
      return <Spinner size={30} />;
    } else {
      return <Boton texto={'Iniciar Sesión'}
            onPress={this.enviarFormulario.bind(this)} />
    }
  }
}

const styles = {
  errorMsgStyle: {
    fontSize: 20,
    color: 'red',
    alignSelf: 'center',
  }
}
export default Formulario;