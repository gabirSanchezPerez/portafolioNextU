import data from './data.json';

export default (state, action) => {
    switch (action.type) {
        case 'eliminarMovimiento':
            return state.filter(movimiento => movimiento.titulo !== action.payload);
        default: 
        	return data;
    }
};
