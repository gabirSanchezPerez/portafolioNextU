import { combineReducers } from 'redux';

import deportesReducer from './deportesReducer';

export default combineReducers({
	// exportamos todos los reducer de la aplicacion
	deportes: deportesReducer
});