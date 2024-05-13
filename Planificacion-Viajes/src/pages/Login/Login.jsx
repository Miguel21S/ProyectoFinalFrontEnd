
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { decodeToken } from "react-jwt";
import { LoginUsuario } from "../../services/rootss";
import { login } from "../../app/slices/userSlice";
import "./Login.css";
import { FormControl, IconButton, Input, InputAdornment, InputLabel, TextField } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
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
                    <h2>Feliz planes</h2>
                    <h1 className="h1-login">
                        <Badge
                            overlap="circular"
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            variant="dot"
                        >
                            <Avatar alt="Remy Sharp" src="./src/img/p.JPG" />
                        </Badge>
                    </h1>
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

                    <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
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
                    <div className="info-log">¿Aún no tienes cuenta?</div>
                    
                    <label className="info-log"> <CLink path="/registrar" title="Registrarse" /></label>
                </div>
            </div>
        </div>
    );
};





