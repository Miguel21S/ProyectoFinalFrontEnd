
import { useNavigate } from "react-router-dom"
import "./Registrar.css"
import { useState } from "react";
import { RegitrarUser } from "../../services/rootss";
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import { CLink } from "../../common/CLink/CLink";
import { FormControl, IconButton, Input, InputAdornment, InputLabel, TextField } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Swal from "sweetalert2";

export const Registrar = () => {
    const navigate = useNavigate();

    const [usuario, setUsuario] = useState({
        name: "",
        apellido: "",
        email: "",
        password: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const inputHandler = (e) => {
        setUsuario((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const registrar = async () => {
        try {
            for (let elemento in usuario) {
                if (usuario[elemento] === "") {
                    throw new Error("Todos los campos deben ser completados");
                }
            }
            const fetched = await RegitrarUser(usuario);
            setUsuario(fetched);
            Swal.fire({
                icon: 'success',
                title: '¡Registro exitoso!',
                text: `¡Bienvenido y Feliz planes, ${usuario.name}! Tu cuenta ha sido creada exito.`,
                showConfirmButton: false,
                timer: 3000 
            });
            setTimeout(() => {
                navigate("/login");
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
                        <h2 className="h2-registrar">Feliz planes</h2>
                        <h1 className="h1-registrar">
                            <Badge
                                overlap="circular"
                                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                variant="dot"
                            >
                                <Avatar alt="Remy Sharp" src="./src/img/p.JPG" />
                            </Badge>
                        </h1>
                        <TextField
                            className="textfield-nombre"
                            id="standard-search"
                            label="Nombre"
                            variant="standard"
                            type="name"
                            name="name"
                            placeholder="Nombre..."
                            value={usuario.name || ""}
                            onChange={inputHandler}
                        />
                        <TextField
                            className="textfield-apellido"
                            id="standard-search"
                            label="Apellido"
                            variant="standard"
                            type="apellido"
                            name="apellido"
                            placeholder="Apellido"
                            value={usuario.apellido || ""}
                            onChange={inputHandler}
                        />
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
                        <button type='button' id="btn-registrar" className="btn btn-success" onClick={registrar}>registrar</button>
                        <div className="info-log">¿Ya tienes cuenta?</div>
                        <label className="info-reg"> <CLink path="/login" title="Login" /></label>
                    </div>
                </div>
            </div>
        </>
    )
}