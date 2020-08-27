import React, {Fragment, useContext} from 'react'
import Tarea from './Tarea';
import proyectoContext from '../../context/proyectos/proyectoContext';
import TareaContext from '../../context/tareas/tareasContext';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
 

const ListadoTareas = () => {
    
    const proyectosContext = useContext(proyectoContext);
    const {proyecto, eliminarProyecto} = proyectosContext;

    const TareasContext = useContext(TareaContext);
    const {tareasproyecto} = TareasContext;

    if(!proyecto) return <h2>Seleccione un proyecto</h2>

    const onClickEliminar = () => {
        eliminarProyecto(proyecto[0]._id);
    }
    
    return (
        <Fragment>
            <h2>{proyecto[0].nombre}</h2> 
            <ul className="listado-tareas"> 
                {tareasproyecto.length === 0
                ? (<li className="tarea"><p>No hay tareas</p></li>)
                : <TransitionGroup>
                    {tareasproyecto.map(tarea=>(
                       <CSSTransition
                            key={tarea._id}
                            timeout={200}
                            classNames="tarea"
                       >
                            <Tarea
                                tarea={tarea}
                            />
                       </CSSTransition>
                       
                    ))}
                </TransitionGroup>
                }
                <button
                    type="button"
                    className="btn btn-eliminar"
                    onClick={onClickEliminar}
                >Eliminar proyecto &times;</button>
            </ul>
            
        </Fragment>
     );
}
 
export default ListadoTareas;