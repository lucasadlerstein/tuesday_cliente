import React, {useReducer} from 'react';
import TareaContext from '../tareas/tareasContext';
import TareaReducer from '../tareas/tareasReducer';
import clienteAxios from '../../config/axios';

import {TAREAS_PROYECTO, AGREGAR_TAREA, VALIDAR_TAREA, ELIMINAR_TAREA, TAREA_ACTUAL, ACTUALIZAR_TAREA} from '../../types/index';

const TareaState = props => {
    const initialState = {
        tareasproyecto: [],
        errortarea: false,
        tareaSeleccionada: null
    }
    
    // crear dispatch y state
    const [state, dispatch] = useReducer(TareaReducer, initialState);

    // crear funciones
    const obtenerTareas = async proyecto => {
        try {
            const resultado = await clienteAxios.get('/api/tareas/', { params: {proyecto} } );

            dispatch({
                type: TAREAS_PROYECTO,
                payload: resultado.data.tareas
            })
                
        } catch (error) {
            console.log(error);
        }
    }

    const agregarTarea = async tarea => {
        try {
            const resultado = await clienteAxios.post('/api/tareas/',tarea);
            console.log(resultado);
            dispatch({
                type: AGREGAR_TAREA,
                payload: tarea
            });
        } catch (error) {
            console.log(error);
        }
    }

    // validar y mostrar error
    const validarTarea = () => {
        dispatch({
            type: VALIDAR_TAREA
        })
    }

    const eliminarTarea = async (id, proyecto) => {
        try {
            await clienteAxios.delete(`/api/tareas/${id}`, {params: {proyecto}});
            dispatch({
                type: ELIMINAR_TAREA,
                payload: id
            });
        } catch (error) {
            console.log(error);
        }
    }

    const actualizarTarea = async tarea => {
        try {
            const resultado = await clienteAxios.put(`/api/tareas/${tarea._id}`, tarea);
            dispatch({
                type: ACTUALIZAR_TAREA,
                payload: resultado.data.tarea
            });   
        } catch (error) {
            console.log(error);
        }
    }


    const guardarTareaActual = tarea => {
        dispatch({
            type: TAREA_ACTUAL,
            payload: tarea
        })
    }

    return (
        <TareaContext.Provider
            value={{
                tareasproyecto: state.tareasproyecto,
                errortarea: state.errortarea,
                tareaSeleccionada: state.tareaSeleccionada,
                obtenerTareas,
                agregarTarea,
                validarTarea,
                eliminarTarea,
                guardarTareaActual,
                actualizarTarea
            }}
        >
            {props.children}
        </TareaContext.Provider>
    )
}

export default TareaState;