import React, {useContext, useState, useEffect} from 'react'
import proyectoContext from '../../context/proyectos/proyectoContext';
import TareaContext from '../../context/tareas/tareasContext';
// import { PROYECTO_ACTUAL } from '../../types';


const FormTarea = () => {

    const proyectosContext = useContext(proyectoContext);
    const {proyecto} = proyectosContext;

    const TareasContext = useContext(TareaContext);
    const { errortarea, tareaSeleccionada, agregarTarea, validarTarea, obtenerTareas, actualizarTarea } = TareasContext;

    useEffect(() => {
        if(tareaSeleccionada !== null){
            guardarTarea(tareaSeleccionada);
        } else{
            guardarTarea({
                nombre: ''
            })
        }
    }, [tareaSeleccionada]);

    // state del form
    const [tarea, guardarTarea] = useState({
        nombre: ''
    });

    const {nombre} = tarea;

    if(!proyecto) return null;

    const [proyectoActual] = proyecto;

    const handleChange = e => {
        guardarTarea({
            ...tarea,
            [e.target.name]: e.target.value
        });
    }

    const onSubmitNuevaTarea = e => {
        e.preventDefault();

        if(nombre.trim() === ''){
            validarTarea();
            return;
        }

        if(tareaSeleccionada === null){
            // nueva tarea
            tarea.proyecto = proyectoActual._id;
            agregarTarea(tarea);
        } else {
            // editar tarea
            actualizarTarea(tarea);
        }

        obtenerTareas(proyectoActual._id);

        guardarTarea({
            nombre: ''
        })
    }

    return ( 
        <div className="formulario">
            <form
                onSubmit={onSubmitNuevaTarea}
            >
                <div className="contenedor-input">
                    <input
                        type="text"
                        className="input-text"
                        placeholder="Nombre de la tarea"
                        name="nombre"
                        value={nombre}
                        onChange={handleChange}
                    />
                </div>
                <div className="contenedor-input">
                    <input
                        type="submit"
                        className="btn btn-primario btn-submit btn-block"
                        value={(tareaSeleccionada) ? "Editar tarea" : "Agregar tarea"}
                    />
                </div>
            </form>
            {errortarea ? <p className="mensaje error">El nombre de la tarea es obligatorio</p> : null}
        </div>
     );
}
 
export default FormTarea;