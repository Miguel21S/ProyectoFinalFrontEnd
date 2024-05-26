
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, FormControl, IconButton, Input, InputAdornment, InputLabel, Snackbar, TextField } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Swal from 'sweetalert2';
import { RegitrarUser } from '../../services/rootss';
import { CLink } from '../../common/CLink/CLink';
import { validame } from '../../Utils/Validaciones';
import './Registrar.css';

export const Registrar = () => {
    const navigate = useNavigate();

    const [snackbars, setSnackbars] = useState({
        name: { open: false, message: '' },
        apellido: { open: false, message: '' },
        email: { open: false, message: '' },
        password: { open: false, message: '' },
    });
    const showSnackbar = (campo, message) => {
        setSnackbars((prevState) => ({
            ...prevState,
            [campo]: { open: true, message },
        }));
    };

    const handleCloseSnackbar = (campo) => {
        setSnackbars((prevState) => ({
            ...prevState,
            [campo]: { open: false, message: '' },
        }));
    };


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
        handleCloseSnackbar(e.target.name);
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
                    showSnackbar(campo, 'Campo obligatorio.');
                    hasError = true;
                } else {
                    const error = validame(campo, usuario[campo]);
                    if (error) {
                        setUserError(prevState => ({
                            ...prevState,
                            [campo + 'Error']: error
                        }));
                        showSnackbar(campo, error);
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

    return (
        <>
            <div className="registrar-design">
                <div className="card-registrar">
                    <div className="container-registrar">
                        <h2 className="h2-title-registrar">¡Feliz planes!</h2>

                        <div className="textfield-container">
                            <TextField
                                className={userError.nameError ? 'textfield-error' : 'textfield-nombre'}
                                label="Nombre"
                                variant="standard"
                                type="name"
                                name="name"
                                value={usuario.name || ''}
                                onChange={inputHandler}
                                onBlur={(e) => {
                                    const error = validame(e.target.name, e.target.value);
                                    setUserError({ ...userError, nameError: error });
                                }}
                                error={Boolean(userError.nameError)}
                            />
                            <Snackbar
                                open={snackbars.name.open}
                                autoHideDuration={6000}
                                onClose={() => handleCloseSnackbar('name')}
                                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                            >
                                <Alert onClose={() => handleCloseSnackbar('name')} severity="error">
                                    {snackbars.name.message}
                                </Alert>
                            </Snackbar>
                        </div>

                        <div className="textfield-container">
                            <TextField
                                className={userError.apellidoError ? 'textfield-error' : 'textfield-apellido'}
                                label="Apellido"
                                variant="standard"
                                type="apellido"
                                name="apellido"
                                value={usuario.apellido || ''}
                                onChange={inputHandler}
                                onBlur={(e) => {
                                    const error = validame(e.target.name, e.target.value);
                                    setUserError({ ...userError, apellidoError: error });
                                }}
                                error={Boolean(userError.apellidoError)}
                            />
                            <Snackbar
                                open={snackbars.apellido.open}
                                autoHideDuration={6000}
                                onClose={() => handleCloseSnackbar('apellido')}
                                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                            >
                                <Alert onClose={() => handleCloseSnackbar('apellido')} severity="error">
                                    {snackbars.apellido.message}
                                </Alert>
                            </Snackbar>
                        </div>

                        <div className="textfield-container">
                            <TextField
                                className={userError.emailError ? 'textfield-error' : 'textfield-email'}
                                label="Email"
                                variant="standard"
                                type="email"
                                name="email"
                                value={usuario.email || ''}
                                onChange={inputHandler}
                                onBlur={(e) => {
                                    const error = validame(e.target.name, e.target.value);
                                    setUserError({ ...userError, emailError: error });
                                }}
                                error={Boolean(userError.emailError)}
                            />
                            <Snackbar
                                open={snackbars.email.open}
                                autoHideDuration={6000}
                                onClose={() => handleCloseSnackbar('email')}
                                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                            >
                                <Alert onClose={() => handleCloseSnackbar('email')} severity="error">
                                    {snackbars.email.message}
                                </Alert>
                            </Snackbar>
                        </div>

                        <div className="textfield-container">
                            <FormControl sx={{ m: 1, width: '17vw' }} variant="standard">
                                <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                                <Input
                                    className={userError.passwordError ? 'textfield-error' : ''}
                                    id="standard-adornment-password"
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={usuario.password}
                                    onChange={inputHandler}
                                    onBlur={(e) => {
                                        const error = validame(e.target.name, e.target.value);
                                        setUserError({ ...userError, passwordError: error });
                                    }}
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
                            <Snackbar
                                open={snackbars.password.open}
                                autoHideDuration={6000}
                                onClose={() => handleCloseSnackbar('password')}
                                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                            >
                                <Alert onClose={() => handleCloseSnackbar('password')} severity="error">
                                    {snackbars.password.message}
                                </Alert>
                            </Snackbar>
                        </div>

                        <button type="button" id="btn-registrar" className="btn btn-success" onClick={registrar}>
                            Registrar
                        </button>
                        <div className="content-linkLo">
                            <div className="info-reg">¿Ya tienes cuenta? </div>
                            <div id="info-reg">
                                <CLink path="/login" title="Login" />
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );


};