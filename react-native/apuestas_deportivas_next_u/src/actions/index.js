export const eliminarMovimiento = (movimientoTitulo) => {
    return {
        type: 'eliminarMovimiento',
        payload: movimientoTitulo
    };
};
