
import { useNavigate } from "react-router-dom"
import "./Login.css"
import { useState } from "react";
import { useDispatch } from "react-redux";
import { CInput } from "../../common/CInput/CInput";
import { decodeToken } from "react-jwt";
import { LoginUsuario } from "../../services/rootss";
import { login } from "../../app/slices/userSlice";

export const Login = () => {
    const navigate = useNavigate();

    //Instancia de Redux para escritura
    const dispatch = useDispatch();

    const [usuario, setUsuario] = useState({
        email: "",
        password: "",
    })

    const inputHandler = (e) => {
        setUsuario((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    };

    const loginG = async () => {
        try {
            const fetched = await LoginUsuario(usuario);

            if(fetched.token){
                const decodificado = decodeToken(fetched.token);
                const passport ={
                    token: fetched.token,
                    usuario: decodificado,
                }
                dispatch(login({credentials: passport }))
                
                setTimeout(() => {
                    navigate("/");
                }, 1200);
            }

        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <div className="login-design">

                <CInput
                    type="email"
                    name="email"
                    placeholder=" email.."
                    value={usuario.email || ""}
                    changeEmit={inputHandler}
                />
                <CInput
                    type="password"
                    name="password"
                    placeholder=" password.."
                    value={usuario.password || ""}
                    changeEmit={inputHandler}
                />

                <button type='button' className="btn btn-success" onClick={loginG}>Iniciar</button>

            </div>
        </>
    )
}