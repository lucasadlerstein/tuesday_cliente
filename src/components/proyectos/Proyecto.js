import React, {useContext} from 'react'
import proyectoContext from '../../context/proyectos/proyectoContext';
import TareaContext from '../../context/tareas/tareasContext';

const Proyecto = ({proyecto}) => {

    const proyectosContext = useContext(proyectoContext);
    const {proyectoActual} = proyectosContext;

    const TareasContext = useContext(TareaContext);
    const {obtenerTareas} = TareasContext;

    const seleccionarProyecto = id => {
        proyectoActual(id); // fijar proyecto
        obtenerTareas(id);
    }

    return ( 
        <li>
            <button
                type="button"
                className="btn btn-blank"
                onClick={ () => seleccionarProyecto(proyecto._id)}
                >{proyecto.nombre}</button>
        </li>
     );
}
 
export default Proyecto;