import PendenciasActionTypes from './pendencias.types';

export const getPendenciasArea = area =>({
    type: PendenciasActionTypes.GET_ALL_BY_AREA,
    payload: area
});

export const selectPendencia = pendencia =>({
    type: PendenciasActionTypes.SELECT_PENDENCIA,
    payload: pendencia
});