
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, FormControl, IconButton, Input, InputAdornment, InputLabel, Snackbar, TextField } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Swal from 'sweetalert2';
import { RegisterUser } from '../../services/rootss';
import { CLink } from '../../common/CLink/CLink';
import { validame } from '../../Utils/Validaciones';
import './Registrar.css';

export const Register = () => {
    const navigate = useNavigate();

    const [snackbars, setSnackbars] = useState({
        name: { open: false, message: '' },
        lastName: { open: false, message: '' },
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


    const [user, setUser] = useState({
        name: '',
        lastName: '',
        email: '',
        password: '',
    });

    const [userError, setUserError] = useState({
        nameError: '',
        lastNameError: '',
        emailError: '',
        passwordError: '',
    });

    const [showPassword, setShowPassword] = useState(false);

    const inputHandler = (e) => {
        setUser((prevState) => ({
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

            for (let campo in user) {
                if (user[campo] === '') {
                    setUserError(prevState => ({
                        ...prevState,
                        [campo + 'Error']: 'Este campo es obligatorio.'
                    }));
                    showSnackbar(campo, 'Campo obligatorio.');
                    hasError = true;
                } else {
                    const error = validame(campo, user[campo]);
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

            const fetched = await RegisterUser(user);
            setUser(fetched);

            Swal.fire({
                icon: 'success',
                title: '¡Registro exitoso!',
                text: `¡Bienvenido, ${user.name}! Tu cuenta ha sido creada con éxito.`,
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
                                label="Name"
                                variant="standard"
                                type="name"
                                name="name"
                                value={user.name || ''}
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
                                className={userError.lastNameError ? 'textfield-error' : 'textfield-apellido'}
                                label="Last Name"
                                variant="standard"
                                type="lastName"
                                name="lastName"
                                value={user.lastName || ''}
                                onChange={inputHandler}
                                onBlur={(e) => {
                                    const error = validame(e.target.name, e.target.value);
                                    setUserError({ ...userError, lastNameError: error });
                                }}
                                error={Boolean(userError.lastNameError)}
                            />
                            <Snackbar
                                open={snackbars.lastName.open}
                                autoHideDuration={6000}
                                onClose={() => handleCloseSnackbar('lastName')}
                                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                            >
                                <Alert onClose={() => handleCloseSnackbar('lastName')} severity="error">
                                    {snackbars.lastName.message}
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
                                value={user.email || ''}
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
                                    value={user.password}
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