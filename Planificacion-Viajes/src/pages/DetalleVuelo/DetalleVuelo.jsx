

import { Link, useParams } from "react-router-dom";
import "./DetalleVuelo.css"
import { useEffect, useState } from "react";
import { ListaDeVuelos } from "../../services/rootss";
import { Button } from "@mui/material";

export const DetalleVuelo = () => {
    // const navigate = useNavigate();
    const { origen } = useParams();

    const [reservaVuelo, setReservaVuelo] = useState([]);

    /////////////  INSTACIA DE CONEXIÓN A MODO LECTURA   ////////////////
    // const rdxUsuario = useSelector(userData);
    // const token = rdxUsuario.credentials.token;

    // useEffect(() => {
    //     if (!rdxUsuario.credentials.token) {
    //         navigate("/vuelos/:origen/:destino")
    //     }
    // }, [rdxUsuario]);

    /////////////  MÉTODO LISTAR VUELOS   ////////////////
    useEffect(() => {
        const listaDeVuelos = async () => {
            try {
                const listaVuelos = await ListaDeVuelos();
                const vuelosFiltrados = listaVuelos.data.filter(reservaVuelo => reservaVuelo.origen === origen);
                setReservaVuelo(vuelosFiltrados);
            } catch (error) {
                console.log("Error:", error);
            }
        }
        listaDeVuelos();
    }, [origen])

    return (
        <>
            <div className="detalle-vuelo">
                <div className="content-detalle">
                    <h2>Vuelos disponibles desde {origen}</h2>
                    {
                        reservaVuelo.map((vuelo) => (
                            <div key={vuelo._id} className="col">
                                <div className="card">
                                    <div className="container text-center">
                                        <img src="..." className="card-img-top" alt="..." />
                                        <hr />
                                        <div className="card-body">
                                            <div className="row">
                                                <h5 className="card-title">{vuelo.name}</h5>
                                                <hr />
                                                <div className="col-sm-9">
                                                    <div className="row  origeDestino">
                                                        <div className="col-8 col-sm-6 origen">
                                                            <div>
                                                                <p>Aerolínea</p>
                                                                <p>{vuelo.aerolinea}</p>
                                                            </div>
                                                            <div>
                                                                <p>Capacidad</p>
                                                                <p>{vuelo.capacidadAsiento}</p>
                                                            </div>
                                                            <div>
                                                                <p>{vuelo.origen}</p>
                                                                <p>{vuelo.horaIda}</p>
                                                                <p>{vuelo.fechaIda}</p>
                                                            </div>
                                                        </div>
                                                        <div className="col-4 col-sm-6 destino">
                                                            <div>
                                                                <p>Aerolínea</p>
                                                                <p>{vuelo.aerolinea}</p>
                                                            </div>
                                                            <div>
                                                                <p>Capacidad</p>
                                                                <p>{vuelo.capacidadAsiento}</p>
                                                            </div>
                                                            {vuelo.horaRegreso && vuelo.fechaRegreso &&
                                                                <div>
                                                                    <p>{vuelo.destino}</p>
                                                                    <p>{vuelo.horaRegreso}</p>
                                                                    <p>{vuelo.fechaRegreso}</p>
                                                                </div>
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-sm-3 precio">
                                                    <p>Pasagen / <i className="bi bi-person-standing"></i></p>
                                                    <p>{vuelo.precio} <i className="bi bi-currency-euro"></i></p>

                                                    <div className="linea-horizontal">
                                                        <p> Precio del pasagen no incluye niños y equipaje</p>
                                                    </div>
                                                    <Button variant="outlined" >
                                                        <Link to={`/detallevuelopasage/${vuelo._id}`} style={{ textDecoration: 'none' }}>Detalle</Link>
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>

            </div>
        </>
    )
}
