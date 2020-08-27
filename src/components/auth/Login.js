import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import alertaContext from '../../context/alertas/alertaContext';
import AuthContext from '../../context/autenticacion/authContext';

const Login = (props) => {

    const AlertaContext = useContext(alertaContext);
    const { alerta, mostrarAlerta } = AlertaContext;

    const authContext = useContext(AuthContext);
    const { mensaje, autenticado, iniciarSesion } = authContext;

    const [usuario, guardarUsuario] = useState({
        email: '',
        password: ''
    });

    // Si el usuario se autentica o no
    useEffect(() => {
        if(autenticado){
            props.history.push('/proyectos');
        }
        if(mensaje){
            mostrarAlerta(mensaje.msg, mensaje.categoria);
            return;
        }
        // eslint-disable-next-line
    }, [mensaje, autenticado, props.history]);

    const {email, password} = usuario;

    const onChangeIniciarSesion = e =>{
        guardarUsuario({
            ...usuario,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = e => {
        e.preventDefault();
        // Validar login
        if(email.trim() === '' || password.trim() === ''){
            mostrarAlerta('Todos los campos son obligatorios', 'alerta-error');
            return;
        }
        iniciarSesion({email, password});
    }

    return ( 
        <div className="form-usuario">
            {alerta ? ( <div className={`alerta ${alerta.categoria}`}> {alerta.msg} </div> ) : null }
            <div className="contenedor-form sombra-dark">
                <h1>Iniciar Sesión</h1>
                <form
                    onSubmit={onSubmit}
                >
                    <div className="campo-form">
                        <label htmlFor="email">Email</label>
                        <input type="email"
                        id="email"
                        name="email"
                        value={email}
                        placeholder="Tu Email"
                        onChange={onChangeIniciarSesion} />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="password">Contraseña</label>
                        <input type="password"
                        id="password"
                        value={password}
                        name="password"
                        placeholder="Tu Contraseña"
                        onChange={onChangeIniciarSesion} />
                    </div>
                    <div className="campo-form">
                        <input type="submit" value="Iniciar sesión" className="btn btn-primario btn-block" />
                    </div>
                </form>
                <Link to={'/nueva-cuenta'} className="enlace-cuenta">
                    Crear cuenta
                </Link>
            </div>
        </div>
     );
}
 
export default Login;