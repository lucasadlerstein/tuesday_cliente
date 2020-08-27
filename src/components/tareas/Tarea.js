import React, {useContext} from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';
import TareaContext from '../../context/tareas/tareasContext';


const Tarea = ({tarea}) => {

    const proyectosContext = useContext(proyectoContext);
    const {proyecto} = proyectosContext;

    const TareasContext = useContext(TareaContext);
    const { eliminarTarea, obtenerTareas, actualizarTarea, guardarTareaActual } = TareasContext;

    // funcion de eliminar tarea boton
    const onEliminarTarea = id => {
        eliminarTarea(id, proyecto[0]._id);
        obtenerTareas(proyecto[0]._id);
    }

    const cambiarEstado = tarea => {
        if(tarea.estado){
            tarea.estado = false;
        } else{
            tarea.estado = true;
        }
        actualizarTarea(tarea);
    }

    const seleccionarTarea = tarea => {
        guardarTareaActual(tarea);
    }

    return ( 
        <li className="tarea sombra">
            <p>{tarea.nombre}</p>
            <div className="estado">
                {tarea.estado
                    ? (
                        <button
                            type="button"
                            className="completo"
                            onClick={() => cambiarEstado(tarea)}
                        >Completo</button>
                    )
                    : (
                        <button
                            type="button"
                            className="incompleto"
                            onClick={() => cambiarEstado(tarea)}
                        >Incompleto</button>
                    )
                }
            </div>
            <div className="acciones">
                <button
                    type="button"
                    className="btn btn-primario"
                    onClick={()=> seleccionarTarea(tarea)}
                >Editar</button>
            
                <button
                    type="button"
                    className="btn btn-secundario"
                    onClick={() => onEliminarTarea(tarea._id)}
                >Eliminar</button>
            </div>
        </li>
        
     );
}
 
export default Tarea;