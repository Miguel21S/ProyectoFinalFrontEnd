
import { useNavigate } from "react-router-dom"
import "./Registrar.css"
import { useState } from "react";
import { RegitrarUser } from "../../services/rootss";
import { CInput } from "../../common/CInput/CInput";

export const Registrar = () => {
    const navigate = useNavigate();

    const [usuario, setUsuario] = useState({
        name: "",
        apellido: "",
        email: "",
        password: "",
    });

    const inputHandler = (e) => {
        setUsuario((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const registrar = async () => {
        try {
            for (let elemento in usuario) {
                if (usuario[elemento] === "") {
                    throw new Error("Todos los campos tienen que estar rellenos");
                }
            }
            const fetched = await RegitrarUser(usuario);
            
            setTimeout(() => {
                navigate("/");
            }, 1200);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <div className="registrar-design">
                <CInput
                    type="name"
                    name="name"
                    placeholder=" Nombre.."
                    value={usuario.name || ""}
                    changeEmit={inputHandler}
                />
                <CInput
                    type="apellido"
                    name="apellido"
                    placeholder=" Apellido.."
                    value={usuario.apellido || ""}
                    changeEmit={inputHandler}
                />

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

                <button type='button' className="btn btn-success" onClick={registrar}>Registrarse</button>

            </div>
        </>
    )
}