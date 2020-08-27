import React, {useContext, useEffect} from 'react';
import Proyecto from './Proyecto';
import proyectoContext from '../../context/proyectos/proyectoContext';
import alertaContext from '../../context/alertas/alertaContext';
import {CSSTransition, TransitionGroup} from 'react-transition-group';


const ListadoProyectos = () => {
    // Extraer proyectos del state inicial
    const proyectosContext = useContext(proyectoContext);
    const {mensaje, proyectos, obtenerProyectos} = proyectosContext;

    const AlertaContext = useContext(alertaContext);
    const {alerta, mostrarAlerta} = AlertaContext;

    useEffect( () => {
        if(mensaje){
            mostrarAlerta(mensaje.msg, mensaje.categoria);
        }
        obtenerProyectos();
        // eslint-disable-next-line
    },[mensaje])

    // ver que proyectos tenga contenido
    if (proyectos.length === 0) return <p>No tenes ningún proyecto</p>;

    return ( 
        <ul className="listado-proyectos">
            {alerta ? (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div> ) : null }
            <TransitionGroup>
                {proyectos.map(proyecto => (
                    <CSSTransition
                        key={proyecto._id}
                        timeout={300}
                        classNames="proyecto"
                    >
                        <Proyecto proyecto={proyecto} />
                    </CSSTransition>
                ) )}
            </TransitionGroup>
        </ul>
     );
}
 
export default ListadoProyectos;