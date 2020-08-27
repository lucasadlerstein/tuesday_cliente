import {REGISTRO_EXITOSO, REGISTRO_ERROR, OBTENER_USUARIO, LOGIN_EXITOSO, LOGIN_ERROR, CERRAR_SESION} from '../../types/index';


export default(state, action) => {
    switch(action.type){
        case REGISTRO_EXITOSO:
        case LOGIN_EXITOSO:
            localStorage.setItem('token', action.payload.token);
            return{
                ...state,
                autenticado: true,
                mensaje: null,
                cargando: false
            }
        case CERRAR_SESION:
        case REGISTRO_ERROR:
        case LOGIN_ERROR:
            localStorage.removeItem('token');
            return{
                ...state,
                token: null,
                usuario: null,
                autenticado: null,
                cargando: false,
                mensaje: action.payload
            }
        case OBTENER_USUARIO:
            return{
                ...state,
                autenticado: true,
                usuario: action.payload,
                cargando: false
            }
        default:
            return state;
    }
}