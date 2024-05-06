
import { useEffect, useState } from "react";
import { ListaDeVuelos } from "../../services/rootss";
import "./Home.css"
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { userData } from "../../app/slices/userSlice";

export const Home = () => {
    const navigate = useNavigate();

    /////////////  INSTACIA DE CONEXIÓN A MODO LECTURA   ////////////////
    const rdxUsuario = useSelector(userData);
    const token = rdxUsuario.credentials.token;

    const [vuelo, setVuelo] = useState([]);

    useEffect(() => {
        if (!rdxUsuario.credentials.token) {
            navigate("/")
        }
    }, [rdxUsuario]);

    /////////////  MÉTODO LISTAR VUELOS   ////////////////
    useEffect(() => {
        const listaDeVuelos = async () => {
            try {
                const listaVuelos = await ListaDeVuelos(token);
                setVuelo(listaVuelos.data);
            } catch (error) {
                console.log("Error:", error);
            }
        }
        listaDeVuelos();
    }, [token])

    return (
        <>
            <div className="home-design">
                <div className="porColuna1">
                    <div className="row">
                        <div className="content1">
                            <div id="col-cards-ciudads" className="col">
                                {vuelo?.length > 0 ? (
                                    vuelo.map((post) => (
                                        <a href="#" className="card-link" key={post._id}>
                                            <div className="card mb-4 h-100">
                                                <div className="card-body">
                                                    <h5 className="card-title">{post.name}</h5>
                                                    <img src="..." className="card-img-top" alt="..." />
                                                </div>
                                            </div>
                                        </a>
                                    ))
                                ) : (
                                    <div>No hay posts disponibles</div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="porColuna2">
                    <div className="row">
                        <div className="content1">
                            <div id="col-cards-ciudads" className="col">
                                {vuelo?.length > 0 ? (
                                    vuelo.map((post) => (
                                        <a href="#" className="card-link" key={post._id}>
                                            <div className="card mb-4 h-100">
                                                <div className="card-body">
                                                    <h5 className="card-title">{post.name}</h5>
                                                    <img src="..." className="card-img-top" alt="..." />
                                                </div>
                                            </div>
                                        </a>
                                    ))
                                ) : (
                                    <div>No hay posts disponibles</div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}