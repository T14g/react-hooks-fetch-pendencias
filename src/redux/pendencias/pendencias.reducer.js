import PendenciasActionTypes from './pendencias.types';

const INITIAL_STATE = {
    pendencias : [],
    pendenciaSelecionada: {}
};

const PendenciasReducer = (state = INITIAL_STATE, action) =>{
    switch(action.type){
        case PendenciasActionTypes.GET_ALL_BY_AREA:
            return {
                ...state,
                pendencias: action.payload
            }
        case PendenciasActionTypes.GET_ALL_BY_AREA:
            return {
                ...state,
                pendencias: action.payload
            }

        default:
            return state;
    }
}

export default PendenciasReducer;