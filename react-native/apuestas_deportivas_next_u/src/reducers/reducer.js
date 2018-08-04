import { Alert } from 'react-native';
import { createStore } from 'redux';
import data from './data.json';
// import * as firebase from 'firebase';

/*const initialState = {
  personData: { },
}
*/
// Quito los datos
const initialState = {
  deportes: [
  /*{
    "id": 1,
    "equipo1": "Nacional",
    "equipo2": "Junior",
    "rta1": 3,
    "rta2": 1,
    "pais": "Colombia",
    "tipo": "Futbol",
    "bandera": "https://cdn.icon-icons.com/icons2/107/PNG/512/colombia_18292.png",
    "fecha": "2018-06-20"
  },
  {
    "id": 3,
    "equipo1": "Millonarios",
    "equipo2": "Cucuta",
    "rta1": 2,
    "rta2": 1,
    "pais": "Colombia",
    "tipo": "Futbol",
    "bandera": "https://cdn.icon-icons.com/icons2/107/PNG/512/colombia_18292.png",
    "fecha": "2018-06-22"
  },
  {
    "id": 5,
    "equipo1": "Millonarios",
    "equipo2": "Santa fe",
    "rta1": 2,
    "rta2": 0,
    "pais": "Colombia",
    "tipo": "Futbol",
    "bandera": "https://cdn.icon-icons.com/icons2/107/PNG/512/colombia_18292.png",
    "fecha": "2018-07-24"
  },
  {
    "id": 7,
    "equipo1": "Las Pastusos",
    "equipo2": "Los Costeños",
    "rta1": 200,
    "rta2": 150,
    "pais": "Colombia",
    "tipo": "Baloncesto",
    "bandera": "https://cdn.icon-icons.com/icons2/107/PNG/512/colombia_18292.png",
    "fecha": "2018-06-26"
  },
  {
    "id": 9,
    "equipo1": "Las Aguilas",
    "equipo2": "Los Leikers",
    "rta1": 123,
    "rta2": 100,
    "pais": "Colombia",
    "tipo": "Baloncesto",
    "bandera": "https://cdn.icon-icons.com/icons2/107/PNG/512/colombia_18292.png",
    "fecha": "2018-06-30"
  },
  {
    "id": 11,
    "equipo1": "Los Rojos",
    "equipo2": "Los Paisas",
    "rta1": 97,
    "rta2": 107,
    "pais": "Colombia",
    "tipo": "Baloncesto",
    "bandera": "https://cdn.icon-icons.com/icons2/107/PNG/512/colombia_18292.png",
    "fecha": "2018-06-26"
  },
  {
    "id": 13,
    "equipo1": "Caracas",
    "equipo2": "Tachira",
    "rta1": 3,
    "rta2": 1,
    "pais": "Venezuela",
    "tipo": "Futbol",
    "bandera": "https://cdn.icon-icons.com/icons2/238/PNG/256/Venezuela_26406.png",
    "fecha": "2018-06-22"
  },
  {
    "id": 15,
    "equipo1": "Caracas",
    "equipo2": "Barinas",
    "rta1": 2,
    "rta2": 3,
    "pais": "Venezuela",
    "tipo": "Futbol",
    "bandera": "https://cdn.icon-icons.com/icons2/238/PNG/256/Venezuela_26406.png",
    "fecha": "2018-07-01"
  },
  {
    "id": 17,
    "equipo1": "El Paso",
    "equipo2": "Caracas",
    "rta1": 2,
    "rta2": 0,
    "pais": "Venezuela",
    "tipo": "Futbol",
    "bandera": "https://cdn.icon-icons.com/icons2/238/PNG/256/Venezuela_26406.png",
    "fecha": "2018-06-10"
  },
  {
    "id": 19,
    "equipo1": "Las Perlas",
    "equipo2": "Los Puntos",
    "rta1": 126,
    "rta2": 142,
    "pais": "Venezuela",
    "tipo": "Baloncesto",
    "bandera": "https://cdn.icon-icons.com/icons2/238/PNG/256/Venezuela_26406.png",
    "fecha": "2018-06-13"
  },
  {
    "id": 21,
    "equipo1": "Los Salados",
    "equipo2": "Los Veintitres",
    "rta1": 97,
    "rta2": 67,
    "pais": "Venezuela",
    "tipo": "Baloncesto",
    "bandera": "https://cdn.icon-icons.com/icons2/238/PNG/256/Venezuela_26406.png",
    "fecha": "2018-07-12"
  },
  {
    "id": 23,
    "equipo1": "Carneros",
    "equipo2": "La Vengaza",
    "rta1": 201,
    "rta2": 178,
    "pais": "Venezuela",
    "tipo": "Baloncesto",
    "bandera": "https://cdn.icon-icons.com/icons2/238/PNG/256/Venezuela_26406.png",
    "fecha": "2018-06-12"
  },*/
  ]
}

//
// Reducer...
//

// const reducer = (state = initialState, action) => {
//   return state;
// }
const reducer = (state = initialState, action) => {
  switch(action.type) {

    case "setDeporteData": 
    	 Alert.alert('setDeporteData => ', action.type);
      	return { ...state, deportes: action.resultado };

    default: 
      	return state;
  }
}

//
// Store...
//

const store = createStore(reducer);
export { store };

//
// Action Creators
//

const setDeporteData = (deportes) => {
  return {
    type: "setDeporteData",
    resultado: deportes
  };
};

export { setDeporteData };

const watchDeporteData = () => {

	var deportes = data;
	var actionSetDeporteData = setDeporteData(deportes);
	//dispatch(actionSetDeporteData);
  return function(dispatch) {
     firebase.database().ref('Deportes').on("value", function(snapshot)
     { 
         var deportes = snapshot.val();
         var actionSetDeporteData = setDeporteData(deportes);
         dispatch(actionSetDeporteData);

     }, function(error) { console.warn(error); });
   }
};

export { watchDeporteData };
