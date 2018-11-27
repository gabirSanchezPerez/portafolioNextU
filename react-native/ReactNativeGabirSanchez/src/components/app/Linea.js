import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import firebase from 'firebase';

import { CardSection, Input, Boton, Spinner } from '../lib';

class LineaDB extends Component {

  constructor(props) {
    super(props);

    this.state = {
      local: this.props.item.rta1, 
      visitante: this.props.item.rta2,
      apostado: false,
      error: '',
      datosApuestaState: null,
      lineaSeleccionada: 0,
      fadeAnime: new Animated.Value(0),
    }
  }

  componentWillUpdate() {
    Animated.timing( this.state.fadeAnime, {
      toValue: 1,
      duration: 1500,
    }).start()
  }

	render() {
		return (
      
      <TouchableWithoutFeedback
        onPress={() => this.itemSeleccionado(this.props.item.id, this.props.item.tipo)} >
  			<View >

          <CardSection addStyle={this.props.posicion%2==0 ? 
          styles.lineaimpar : styles.lineapar }>

            <Text style={styles.styleLocal}>{this.props.item.equipo1}</Text>

            {this.props.item.finalizado == 1 ? (
              <Text style={styles.score}>{this.props.item.rta1} - {this.props.item.rta2}</Text>
              ):(
              <Text style={styles.score}>VS</Text>
            )}

            <Text style={styles.styleVisitante}>{this.props.item.equipo2}</Text>
          
          </CardSection> 

          {this.props.item.finalizado == 0 && this.state.lineaSeleccionada === this.props.item.id ? (
            <Animated.View style={{
              opacity: this.state.fadeAnime
            }} >
              <View style={styles.apostar}>
                {this.mostrarPanelApuesta()} 
              </View>
            </Animated.View>
            ):(
            <View />
          )}  
        </View>
      </TouchableWithoutFeedback>
		);
	}

  itemSeleccionado(item, deporte) {

    const uid = firebase.auth().currentUser.uid;
    const datosApuestas= [];

    // FIREBASE APUESTAS
    firebase.database().ref('Apuestas/'+uid+'/'+deporte+'/'+item)
      .once('value', (apuesta) => {
      
      //Obtener la información a través de firebase.
      //console.warn(apuesta.val())

      //console.warn(deporte.val())
      if (apuesta.val() === null ) {
          this.setState({
            lineaSeleccionada: item,
            apostado: false
          });
        } else {

          this.setState({
            lineaSeleccionada: item,
            local: apuesta.val().rta1,
            visitante: apuesta.val().rta2,
            apostado:true
          });
        }  

    });
    // FIREBASE APUESTAS
  }

  //========================================================================
  //      Mostrar el panel de apuestas de acuerdo al estado del evento
  //========================================================================
  mostrarPanelApuesta() {

    return (
      <View>
        <View style={{ flexDirection: 'row' }}>
          { this.props.item.finalizado === 0 ? (
            <Text style={{ textAlign: 'center', flex: 1, marginTop: 20, color: '#3b4167' }}>
              Introduce el marcador final del partido
            </Text>
          ) : null }
        </View>

        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.error}>{this.state.error}</Text>
        </View>

        <View style={ styles.container }>
          <Input
            etiqueta=''
            value={ this.state.local!='' ? this.state.local+'' : this.props.item.rta1 }
            onChangeText={
                (local) => this.setState({ local: this.validarCampos(local) })
            }
            secureTextEntry={false}
            autoCorrect={false}
            addEtiquetaStyle={{ 
              backgroundColor: 'transparent', 
              fontSize: 0,
            }}
            addInputStyle={
              this.state.apostado === true
              ? [styles.inputStyle, styles.disabled]
              : styles.inputStyle
            }
            editable={this.state.apostado}
          />

          <Input
            etiqueta=''
            value={ this.state.visitante!='' ? this.state.visitante+'' : this.props.item.rta2 }
            onChangeText={
                (visitante) => 
                this.setState({ visitante: this.validarCampos(visitante) })
            }
            secureTextEntry={false}
            autoCorrect={false}
            addEtiquetaStyle={{
                backgroundColor: 'transparent',
                fontFamily: 'Bebas Neue', 
                fontSize: 0, 
                color: '#FFF' 
            }}
            addInputStyle={
                this.state.apostado === true 
                ? [styles.inputStyle, styles.disabled]
                : styles.inputStyle
            }
            editable={this.state.apostado}
          />
          </View>

          <View style={{ flexDirection: 'row', marginTop: 5 }}>
              {this.mostrarAccion()}
          </View>

       </View>
    );

  }

  //========================================================================
  //    Verificar que solo puedan introducirse numeros en el campo de texto
  //========================================================================
  validarCampos(texto) {
    let newText = '';
    const numbers = '0123456789';
    for (let i = 0; i < texto.length; i++) {
      if (numbers.indexOf(texto[i]) > -1) {
        newText += texto[i];
        this.setState({ error: '' });
      } else {
        this.setState({ error: 'Solo se aceptan números' });
      }
    }
    return newText;
  }

  //==================================================
  //          Verificar acción a realizar
  //==================================================
  mostrarAccion() {

    // Si el estado es cargando. Mostrar Spinner
    if (this.state.cargando) {
      return <Spinner size="large" message="Guardando apuesta" />;
    }
    //Mostrar botón de enviar si el item no posee una apuesta asignada
    if (this.state.apostado === false) {
      return (
        <View style={styles.botonView}>
          <Boton
            texto="Apostar"
            onPress={() => this.enviarFormulario()}
            touchableStyle={{ borderWidth: 1, }}
            textStyle={{ color: '#FFF', fontSize: 15 }}
          />
        </View>
      );
    }
    return (
      <View style={styles.botonView} >
        <Icon name='check-circle' size={35} color="#3c763d" />
      </View>
    );
  }

  //==================================================
  //          Enviar información al formulario
  //==================================================
  enviarFormulario() {
    const { local, visitante } = this.state;
    //Verificar que no hayan campos vacíos antes de envíar el formulario
    if (local === '' || visitante === '') {
        this.setState({ error: 'Introduzca la información correcta' });
    } else {
        this.setState({ cargando: true });
        this.actualizarApuesta();
    }
  }

  //==================================================
  //          Actualizar Apuesta
  //==================================================
  actualizarApuesta() {
    //Asignar el email del usuario actual a la abriable email
    const uid = firebase.auth().currentUser.uid;
    const { tipo, id, pais } = this.props.item;

    //Crear un objeto con los valores a actualizar
    const itemApuesta = {
      deporte: tipo,
      id: id,
      rta1: this.state.local,
      rta2: this.state.visitante,
    };
    //==================================================
    //          Actualizar la base de datos
    //==================================================
    firebase.database().ref().child("Apuestas").child(uid)
    .child(tipo).child(id)
    .update(itemApuesta, (error) => {
      if (error) {
        this.setState({ error: error });
      } else {
        this.setState({ cargando: false, apostado: true });
      }
    })
    .catch((res) => {
      this.setState({ error: res });
    });
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
  inputStyle: {
    fontFamily: 'Bebas Neue',
    textAlign: 'center',
    backgroundColor: 'transparent',
    elevation: 0,
    borderRadius: 5,
  },
  disabled: {
    backgroundColor: '#E8E8E8',
    borderColor: '#999',
    elevation: 0,
  },
  apostar: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20,
    marginLeft: 5,
    marginRight: 5,
    backgroundColor: '#F7F7F7',
  },
  error: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 5,
    padding: 3,
    color: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },

  botonView: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row',
    marginTop: 0,
  },
  lineaimpar: {
    backgroundColor: '#F9F9F9',
  },
  lineapar: {
    backgroundColor: '#FCFCFC',
  }
};

export default LineaDB;
