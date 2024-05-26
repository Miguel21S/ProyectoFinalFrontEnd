
import { useEffect, useState } from "react";
import "./DetalleVueloPasage.css";
import { HacerReservaVuelo, ListaDeVuelos } from "../../services/rootss";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { userData } from "../../app/slices/userSlice";
import CTextField from "../../common/CTextField/CTextField";
import { Paper } from "@mui/material";
import EventSeatIcon from '@mui/icons-material/EventSeat';
import { Stack } from "react-bootstrap";
import Swal from "sweetalert2";

export const DetalleVueloPasage = () => {
    const navigate = useNavigate();
    const { _id } = useParams();

    const [reservaVuelo, setReservaVuelo] = useState([]);
    const [vueloPagar, setVueloPagar] = useState({
        _id: "",
        cantidadAsiento: "",
        precioPagar: "",
    });

    /////////////  INSTACIA DE CONEXIÓN A MODO LECTURA   ////////////////
    const rdxUsuario = useSelector(userData);
    const token = rdxUsuario.credentials.token;

    const inputHandler = (e) => {
        const { name, value } = e.target;
        setVueloPagar((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    ////////////////////////////////   LISTA DE VUELOS   ///////////////////////////////////
    useEffect(() => {
        const listaDeVuelos = async () => {
            try {
                const listaVuelos = await ListaDeVuelos(token);
                const vuelosFiltrados = listaVuelos.data.find(reservaVuelo => reservaVuelo._id === _id);
                if (vuelosFiltrados) {
                    setReservaVuelo([vuelosFiltrados]);
                }
            } catch (error) {
                console.log("Error:", error);
            }
        }
        listaDeVuelos();
    }, [_id])

    //////////////////////////  MÉTODO COMPRAR BILLETE  /////////////////////////
    const comprarBillete = async () => {
        if (!rdxUsuario.credentials.token) {
            navigate("/login")
        } else {
            const result = await Swal.fire({
                title: '¿Estás seguro?',
                text: '¿Pretendes comprar?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Sí',
                cancelButtonText: 'Cancelar'
            });

            if (result.isConfirmed) {
                const vuelo = reservaVuelo[0]; // Suponiendo que hay un vuelo seleccionado
                const cantidadAsiento = parseInt(vueloPagar.cantidadAsiento);
                const precioIndividual = parseFloat(vuelo.precio);
                const precioTotalEsperado = cantidadAsiento * precioIndividual;

                if (!cantidadAsiento || !precioTotalEsperado) {
                    Swal.fire(
                        'Error',
                        'Todos los campos son obligatorios.',
                        'error'
                    );
                    return;
                } else if (precioTotalEsperado !== parseFloat(vueloPagar.precioPagar)) {
                    Swal.fire(
                        'Error',
                        `El precio total esperado (${precioTotalEsperado}€) no coincide con el precio a pagar (${vueloPagar.precioPagar}€).`,
                        'error'
                    );
                    return;
                }

                try {
                    const billete = await HacerReservaVuelo(_id, vueloPagar, token);
                    setVueloPagar({
                        _id: "",
                        cantidadAsiento: "",
                        precioPagar: "",
                        billete
                    });

                    Swal.fire(
                        '¡Pago!',
                        'Se ha pagado correctamente.',
                        'success',
                    );

                } catch (error) {
                    console.log(error);
                    Swal.fire(
                        'Error',
                        'Ha ocurrido un error al intentar comprar el pasaje.',
                        'error'
                    );
                }
            }

        }
    }

    return (
        <>
            <div className="design-vuelopasage">
                <div className="content-info">
                    {
                        reservaVuelo.map((vuelo) => (
                            <div key={vuelo._id} className="design-datos">
                                <Stack spacing={0.1}>
                                    <Paper>
                                        <h2 className="h2-DVueloPasage">Detalles del vuelo <i className="bi bi-airplane-engines"></i></h2>
                                    </Paper>
                                    <Paper>
                                        <Stack direction="row" spacing={0.1} className="info-genera-vuelo">
                                            <Paper>
                                                <div className="col-3">
                                                    <div className="info-vuelo"><strong> Vuelo <i className="bi bi-airplane"></i></strong></div>
                                                    <div className="info-vuelo"><strong> Aerolínea </strong></div>
                                                    <div className="info-vuelo"><strong> Capacidad restante <EventSeatIcon /></strong></div>
                                                    <div className="info-vuelo"><strong> Origen <i className="bi bi-geo-alt"></i></strong></div>
                                                    <div className="info-vuelo"><strong> Destino <i className="bi bi-flag"></i></strong></div>
                                                    <div className="info-vuelo"><strong> Fecha de salida <i className="bi bi-calendar2-date"></i></strong></div>
                                                    <div className="info-vuelo"><strong> Hora de salida <i className="bi bi-clock-history"></i> </strong></div>
                                                    <div className="info-vuelo"><strong> Pasagen / <i className="bi bi-person-standing"></i> </strong></div>
                                                </div>
                                            </Paper>
                                            <Paper>
                                                <div className="col-3">
                                                    <div className="info-vuelo"> {vuelo.name}</div>
                                                    <div className="info-vuelo"> {vuelo.aerolinea}</div>
                                                    <div className="info-vuelo"> {vuelo.capacidadAsiento}</div>
                                                    <div className="info-vuelo">{vuelo.origen}</div>
                                                    <div className="info-vuelo"> {vuelo.destino}</div>
                                                    <div className="info-vuelo"> {vuelo.fechaIda}</div>
                                                    <div className="info-vuelo"> {vuelo.horaIda}</div>
                                                    <div className="info-vuelo"> {vuelo.precio} <i className="bi bi-currency-euro"></i></div>
                                                </div>
                                            </Paper>
                                            <Paper >
                                                <Stack spacing={0.1}>
                                                    <Paper>
                                                        <div className="input-info-DPasage">
                                                            <div className="info-vuelo-textfield">
                                                                <CTextField
                                                                    type="number"
                                                                    name="cantidadAsiento"
                                                                    placeholder="Cantidad de personas..."
                                                                    value={vueloPagar.cantidadAsiento}
                                                                    changeEmit={inputHandler}
                                                                />
                                                            </div>

                                                            <div className="info-vuelo-textfield">
                                                                <CTextField
                                                                    type="number"
                                                                    name="precioPagar"
                                                                    placeholder="Valor a pagar..."
                                                                    value={vueloPagar.precioPagar}
                                                                    changeEmit={inputHandler}
                                                                />
                                                            </div>

                                                            <div className="btn-info-DPasage">
                                                                <div className="btn-info-Pagar">
                                                                    <button type="button" onClick={() => comprarBillete(_id)} className="btn btn-outline-success btn-size">Pagar</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Paper>
                                                    <Paper >
                                                        <div className="btn-info-DPasage">
                                                            {/* <div className="btn-info-Pagar">
                                                                <button type="button" onClick={() => comprarBillete(_id)} className="btn btn-outline-success">Pagar</button>
                                                            </div>
                                                            <div className="btn-info-pdf">
                                                                <button type="button" onClick={generarPDF} className="btn btn-outline-dark">Generar PDF</button>
                                                            </div> */}
                                                        </div>
                                                    </Paper>
                                                </Stack>
                                            </Paper>
                                        </Stack>
                                    </Paper>
                                </Stack>

                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    );
};