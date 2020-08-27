import React, {useState, useContext, useEffect} from 'react';
import { Link } from 'react-router-dom';
import alertaContext from '../../context/alertas/alertaContext';
import AuthContext from '../../context/autenticacion/authContext';

const NuevaCuenta = (props) => {

    const AlertaContext = useContext(alertaContext);
    const { alerta, mostrarAlerta } = AlertaContext;

    const authContext = useContext(AuthContext);
    const { mensaje, autenticado, registrarUsuario } = authContext;

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

    const [usuario, guardarUsuario] = useState({
        nombre: '',
        email: '',
        password: '',
        confirmar: ''
    });

    const {nombre, email, password, confirmar} = usuario;

    const onChangeRegistro = e =>{
        guardarUsuario({
            ...usuario,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = e => {
        e.preventDefault();
        
        // Validar
        if(nombre.trim() === '' || email.trim() === '' || password.trim() === '' || confirmar.trim() === ''){
            mostrarAlerta('Todos los campos son obligatorios', 'alerta-error');
            return;
        }
        // Pass minimo de 6 caracteres
        if(password.length < 6){
            mostrarAlerta('La contraseña debe tener al menos 6 caracteres', 'alerta-error');
            return;
        }
        if(password !== confirmar){
            mostrarAlerta('Las contraseñas no coinciden', 'alerta-error');
            return;
        }

        registrarUsuario({
            nombre,
            email,
            password
        });
        
    }

    return ( 
        <div className="form-usuario">
            {alerta ? ( <div className={`alerta ${alerta.categoria}`}> {alerta.msg} </div> ) : null }
            <div className="contenedor-form sombra-dark">
                <h1>Crear Cuenta</h1>
                <form
                    onSubmit={onSubmit}
                >
                    <div className="campo-form">
                        <label htmlFor="nombre">Nombre</label>
                        <input type="text"
                        id="nombre"
                        name="nombre"
                        value={nombre}
                        placeholder="Tu nombre"
                        onChange={onChangeRegistro} />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="email">Email</label>
                        <input type="email"
                        id="email"
                        name="email"
                        value={email}
                        placeholder="Tu Email"
                        onChange={onChangeRegistro} />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="password">Contraseña</label>
                        <input type="password"
                        id="password"
                        value={password}
                        name="password"
                        placeholder="Tu Contraseña"
                        onChange={onChangeRegistro} />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="confirmar">Confirmar contraseña</label>
                        <input type="password"
                        id="confirmar"
                        value={confirmar}
                        name="confirmar"
                        placeholder="Confirmá tu Contraseña"
                        onChange={onChangeRegistro} />
                    </div>
                    <div className="campo-form">
                        <input type="submit" value="Registrarme" className="btn btn-primario btn-block" />
                    </div>
                </form>
                <Link to={'/'} className="enlace-cuenta">
                    Iniciar sesión
                </Link>
            </div>
        </div>
     );
}
 
export default NuevaCuenta;