import React, {Fragment, useState, useContext} from 'react'
import proyectoContext from '../../context/proyectos/proyectoContext';

const NuevoProyecto = () => {
    
    const proyectosContext = useContext(proyectoContext);
    const {formulario, errorformulario, mostrarForm, agregarProyecto, mostrarError} = proyectosContext;

    const [proyecto, guardarProyecto] = useState({
        nombre: ''
    });

    const {nombre} = proyecto;

    const onChangeProyecto = e => {
        guardarProyecto({
            ...proyecto,
            [e.target.name]: e.target.value
        })
    }

    const onSubmitProyecto = e =>{
        e.preventDefault();
        // validar
        if(nombre === ''){
            mostrarError();
            return null;
        } 
        // agregar al state
        agregarProyecto(proyecto);

        // reiniciar form
        guardarProyecto({
            nombre: ''
        });
    }

    return ( 
        <Fragment>
            {
                formulario ? (
                    <form
                        className="formulario-nuevo-proyecto"
                        onSubmit={onSubmitProyecto}
                    >
                        <input
                            type="text"
                            className="input-text"
                            placeholder="Nombre del proyecto"
                            name="nombre"
                            value={nombre}
                            onChange={onChangeProyecto}
                        />
                        <input 
                            type="submit"
                            className="btn btn-primario btn-block"
                            value="Crear"
                        />
                    </form>
                )
                : (
                    <button
                        type="button"
                        className="btn btn-block btn-primario"
                        onClick={() => mostrarForm()}
                    >Proyecto nuevo</button>
                )
            }

            {errorformulario ? <p className="mensaje error">¿El proyecto no tiene nombre?</p> : null}
        </Fragment>
        
     );
}
 
export default NuevoProyecto;