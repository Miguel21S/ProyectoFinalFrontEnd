

import { useNavigate } from "react-router-dom";
import "./DetalleVuelo.css"
import { useSelector } from "react-redux";
import { userData } from "../../app/slices/userSlice";
import { useEffect } from "react";
// import CTextField from "../../common/CTextField/CTextField";
// import { ListaDeVuelos } from "../../services/rootss";


export const DetalleVuelo = () => {
    const navigate = useNavigate();

    // const [reservaVuelo, setReservaVuelo] = useState([]);

    /////////////  INSTACIA DE CONEXIÓN A MODO LECTURA   ////////////////
    const rdxUsuario = useSelector(userData);
    const token = rdxUsuario.credentials.token;

    useEffect(() => {
        if (!rdxUsuario.credentials.token) {
            navigate("/")
        }
    }, [rdxUsuario]);

    /////////////  MÉTODO LISTAR VUELOS   ////////////////
    // useEffect(() => {
    //     const listaDeVuelos = async () => {
    //         try {
    //             const listaVuelos = await ListaDeVuelos(token);
    //             setReservaVuelo(listaVuelos.data);
    //         } catch (error) {
    //             console.log("Error:", error);
    //         }
    //     }
    //     listaDeVuelos();
    // }, [token])

    return (
        <>
            <div className="home-design">
                <div className="content-texfield">
                    <div className="col">
                        {/* <CTextField
                            type="name"
                            name="name"
                            placeholder="Nombre.."
                            value={vuelo.name || ""}
                            changeEmit={inputHandler}
                        />
                        <CTextField
                            type="aerolinea"
                            name="aerolinea"
                            placeholder="Aerolinea.."
                            value={vuelo.aerolinea || ""}
                            changeEmit={inputHandler}
                        /> */}

                    </div>
                </div>

            </div>
        </>
    )
}