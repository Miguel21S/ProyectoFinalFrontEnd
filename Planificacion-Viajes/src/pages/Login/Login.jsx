
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { decodeToken } from "react-jwt";
import { LoginUsuario } from "../../services/rootss";
import { login } from "../../app/slices/userSlice";
import "./Login.css";
import { FormControl, IconButton, Input, InputAdornment, InputLabel, TextField } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { CLink } from "../../common/CLink/CLink";

export const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [usuario, setUsuario] = useState({
        email: "",
        password: "",
    });
    const [showPassword, setShowPassword] = useState(false);

    const inputHandler = (e) => {
        const { name, value } = e.target;
        setUsuario(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const loginG = async () => {
        try {
            const fetched = await LoginUsuario(usuario);

            if (fetched.token) {
                const decodificado = decodeToken(fetched.token);
                const passport = {
                    token: fetched.token,
                    usuario: decodificado,
                }
                dispatch(login({ credentials: passport }));

                if (decodificado.userRole === "superAdmin") {
                    navigate("/gestion");
                } else {
                    navigate("/");
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="login-design">
            <div className="card-login">
                <div className="container-login">
                    <h2 className="h2-title-login">¡Feliz planes!</h2>
                    <p className="p-login">Inicia sesión para continuar.</p>
                    <TextField
                        className="textfield-email"
                        id="standard-search"
                        label="Email"
                        variant="standard"
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={usuario.email || ""}
                        onChange={inputHandler}
                    />

                    <FormControl sx={{ m: 1, width: '17vw', marginTop: '10px' }} variant="standard">
                        <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                        <Input
                            id="standard-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            value={usuario.password}
                            onChange={inputHandler}
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
                    <button type='button' id="btn-login" className="btn btn-success" onClick={loginG}>Iniciar sensión</button>
                    <div className="content-linkRe">
                        <div className="info-log">¿No tienes cuenta? </div>
                        <div id="info-log">
                            <CLink path="/registrar" title="Registrarse" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};





