
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormControl, IconButton, Input, InputAdornment, InputLabel, TextField } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Swal from 'sweetalert2';
import { RegitrarUser } from '../../services/rootss';
import { CLink } from '../../common/CLink/CLink';
import { validame } from '../../Utils/Validaciones';
import './Registrar.css';

export const Registrar = () => {
const navigate = useNavigate();

const [usuario, setUsuario] = useState({
    name: '',
    apellido: '',
    email: '',
    password: '',
});

const [userError, setUserError] = useState({
    nameError: '',
    apellidoError: '',
    emailError: '',
    passwordError: '',
});

const [showPassword, setShowPassword] = useState(false);

const inputHandler = (e) => {
    setUsuario((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
    }));

    setUserError((prevState) => ({
        ...prevState,
        [e.target.name + 'Error']: '',
    }));
};

const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
};

const handleMouseDownPassword = (event) => {
    event.preventDefault();
};

const registrar = async () => {
    try {
        let hasError = false;

        for (let campo in usuario) {
            if (usuario[campo] === '') {
                setUserError(prevState => ({
                    ...prevState,
                    [campo + 'Error']: 'Este campo es obligatorio.'
                }));
                hasError = true;
            } else {
                const error = validame(campo, usuario[campo]);
                if (error) {
                    setUserError(prevState => ({
                        ...prevState,
                        [campo + 'Error']: error
                    }));
                    hasError = true;
                }
            }
        }

        if (hasError) return;

        const fetched = await RegitrarUser(usuario);
        setUsuario(fetched);

        Swal.fire({
            icon: 'success',
            title: '¡Registro exitoso!',
            text: `¡Bienvenido, ${usuario.name}! Tu cuenta ha sido creada con éxito.`,
            showConfirmButton: false,
            timer: 3000,
        });

        setTimeout(() => {
            navigate('/login');
        }, 3000);
    } catch (error) {
        console.log(error);
    }
};

const mostrarMensajeError = (campo) => {
    return userError[campo + 'Error'] && <div className="error-message">{userError[campo + 'Error']}</div>;
};

return (
    <>
        <div className="registrar-design">
            <div className="card-registrar">
                <div className="container-registrar">
                    <h2 className="h2-title-registrar">Feliz planes</h2>
                    
                    <TextField
                        className={userError.nameError ? 'textfield-error' : 'textfield-nombre'}
                        label="Nombre"
                        variant="standard"
                        type="name"
                        name="name"
                        value={usuario.name || ''}
                        onChange={inputHandler}
                        onBlur={(e) => setUserError({ ...userError, nameError: validame(e.target.name, e.target.value) })}
                        error={Boolean(userError.nameError)}
                    />
                  

                    {mostrarMensajeError('name')}
                   

                    <TextField
                        className={userError.apellidoError ? 'textfield-error' : 'textfield-apellido'}
                        label="Apellido"
                        variant="standard"
                        type="apellido"
                        name="apellido"
                        value={usuario.apellido || ''}
                        onChange={inputHandler}
                        onBlur={(e) => setUserError({ ...userError, apellidoError: validame(e.target.name, e.target.value) })}
                        error={Boolean(userError.apellidoError)}
                    />
                    {mostrarMensajeError('apellido')}

                    <TextField
                        className={userError.emailError ? 'textfield-error' : 'textfield-email'}
                        label="Email"
                        variant="standard"
                        type="email"
                        name="email"
                        value={usuario.email || ''}
                        onChange={inputHandler}
                        onBlur={(e) => setUserError({ ...userError, emailError: validame(e.target.name, e.target.value) })}
                        error={Boolean(userError.emailError)}
                    />
                    {mostrarMensajeError('email')}

                    <FormControl sx={{ m: 1, width: '17vw', marginTop: '20px' }} variant="standard">
                        <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                        <Input
                            className={userError.passwordError ? 'textfield-error' : ''}
                            id="standard-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            value={usuario.password}
                            onChange={inputHandler}
                            onBlur={(e) => setUserError({ ...userError, passwordError: validame(e.target.name, e.target.value) })}
                            error={Boolean(userError.passwordError)}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                    {mostrarMensajeError('password')}

                    <button type="button" id="btn-registrar" className="btn btn-success" onClick={registrar}>
                        Registrar
                    </button>
                    <div className="info-log">¿Ya tienes cuenta?</div>
                    <label className="info-reg">
                        {' '}
                        <CLink path="/login" title="Login" />
                    </label>
                </div>
            </div>
        </div>
    </>
);
};
