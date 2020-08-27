import React, {useContext, useEffect} from 'react';
import AuthContext from './../../context/autenticacion/authContext';


const Barra = () => {

    const authContext = useContext(AuthContext);
    const {usuario, usuarioAutenticado, cerrarSesion} = authContext;

    useEffect(() => {
        usuarioAutenticado();
        // eslint-disable-next-line
    }, []);

    function primerLetraMayus(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    return ( 
        <header className="app-header">
            {usuario ? <p className="nombre-usuario">Hola <span>{primerLetraMayus(usuario.nombre)}</span></p> : null}
            
            <nav className="nav-principal">
                <button
                    className="btn btn-blank cerrar-sesion"
                    onClick={() => cerrarSesion()}
                >Cerrar sesión</button>
            </nav>
        </header>
     );
}
 
export default Barra;