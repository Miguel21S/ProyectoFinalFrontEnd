
import "./PerfilUsuario.css"
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { userData } from "../../app/slices/userSlice";
import { useEffect, useState } from "react";
import { MiPerfil } from "../../services/rootss";

export const PerfilUsuario = () => {
    const navigate = useNavigate();

    const [persona, setPersona] = useState([]);

    const rdxUsuario = useSelector(userData);
    const token = rdxUsuario.credentials.token;

    useEffect(() => {
        if (!rdxUsuario.credentials.token) {
            navigate("/login")
        }
    }, [rdxUsuario, navigate]);

    useEffect(() => {
        const fetchPerfil = async () => {
            try {
                const datosMi = await MiPerfil(token);
                setPersona(datosMi.data);
            } catch (error) {
                console.log("Error:", error);
            }
        }
        fetchPerfil();
    }, [token])

    // Aquí deberías devolver tu JSX con la información del perfil, por ejemplo:
    return (
        <>
            <div className="usuarioPerfil-design">
                <div className="porTabla1">
                    <div className="row">
                        <div className="content1">
                            {persona.length > 0 ? (
                                <div>
                                    <h1>Perfil</h1>
                                    {persona.map((per) => (
                                        <div key={per._id}>
                                            <p><strong>Nombre:</strong> {per.name}</p>
                                            <p><strong>Apellido:</strong> {per.apellido}</p>
                                            <p><strong>Email:</strong> {per.email}</p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p>Cargando perfil...</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
