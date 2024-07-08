

import { Link, useParams } from "react-router-dom";
import "./DetalleVuelo.css"
import { useEffect, useState } from "react";
import { ListFlights } from "../../services/rootss";
import { Button, Stack, Paper } from "@mui/material";
import EventSeatIcon from '@mui/icons-material/EventSeat';

export const DetalleVuelo = () => {
    // const navigate = useNavigate();
    const { origin } = useParams();

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
                const listaVuelos = await ListFlights();
                const vuelosFiltrados = listaVuelos.data.filter(reservaVuelo => reservaVuelo.origin === origin);
                setReservaVuelo(vuelosFiltrados);
            } catch (error) {
                console.log("Error:", error);
            }
        }
        listaDeVuelos();
    }, [origin])

    return (
        <>
            <div className="detalle-vuelo">
                <div className="content-detalle">
                    <h2>Vuelos disponibles desde {origin}</h2>
                    {
                        reservaVuelo.map((vuelo) => (
                            <div key={vuelo._id} className="col">
                                <div className="card">
                                    <div className="container text-center">
                                        <Stack spacing={2}>
                                            <Paper> <img src="..." className="card-img-top" alt="..." /></Paper>
                                            <Paper>
                                                <h5 className="card-title">{vuelo.name}</h5>
                                            </Paper>
                                            <Paper>
                                                <Stack direction="row" spacing={0.1}>
                                                    <Paper>
                                                        <Stack spacing={2} className="origeDestino">
                                                            <Paper>
                                                                <div className="detalle-origen">
                                                                    <div>
                                                                        <p>Aerolínea</p>
                                                                        <p>{vuelo.airline}</p>
                                                                    </div>
                                                                    <div>
                                                                    <div>Capacidad  <EventSeatIcon /></div>
                                                                        <p>{vuelo.seatcapacity}</p>
                                                                    </div>
                                                                    <div>
                                                                        <p>{vuelo.origin}</p>
                                                                        <p>{vuelo.timeGoTime}</p>
                                                                        <p>{vuelo.dateDeparture}</p>
                                                                    </div>
                                                                </div>
                                                            </Paper>
                                                            <Paper>
                                                                <div className="detalle-destino">
                                                                    <div>
                                                                        <p>Aerolínea</p>
                                                                        <p>{vuelo.airline}</p>
                                                                    </div>
                                                                    <div>
                                                                    <div>Capacidad  <EventSeatIcon /></div>
                                                                        <p>{vuelo.seatcapacity}</p>
                                                                    </div>
                                                                    {vuelo.timeReturn && vuelo.dateReturn &&
                                                                        <div>
                                                                            <p>{vuelo.destination}</p>
                                                                            <p>{vuelo.timeReturn}</p>
                                                                            <p>{vuelo.dateReturn}</p>
                                                                        </div>
                                                                    }
                                                                </div>
                                                            </Paper>
                                                        </Stack>
                                                    </Paper>
                                                    <Paper>
                                                        <div className="detalle-precio">
                                                            <p>Pasagen / <i className="bi bi-person-standing"></i></p>
                                                            <p>{vuelo.price} <i className="bi bi-currency-euro"></i></p>

                                                            <p className="linea-horizontal info-pasage">
                                                                Precio del pasagen no incluye niños y equipaje
                                                            </p>
                                                            <div className="btn-detalleVuelo">
                                                            <Button variant="outlined">
                                                                <Link to={`/detallevuelopasage/${vuelo._id}`} style={{ textDecoration: 'none' }}>Detalle</Link>
                                                            </Button>
                                                            </div>
                                                        </div>
                                                    </Paper>
                                                </Stack>
                                            </Paper>
                                        </Stack>
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
