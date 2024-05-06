
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { userData } from "../../app/slices/userSlice";
import 'bootstrap/dist/css/bootstrap.min.css';
import { ListaDeVuelos, ListarReservasVuelo } from "../../services/rootss";
import { CLink } from "../../common/CLink/CLink";

export const GestionReservasVuelos = () => {
    const navigate = useNavigate();
    const rdxUsuario = useSelector(userData);
    const token = rdxUsuario.credentials.token;
    const [vueloSeleccionado, setVueloSeleccionado] = useState({});
    const [vuelo, setVuelo] = useState([]);

    useEffect(() => {
        if (!rdxUsuario.credentials.token) {
            navigate("/")
        }
    }, [rdxUsuario]);

    useEffect(() => {
        const listaDeReservasVuelo = async () => {
            try {
                const listaReservaVuelos = await ListarReservasVuelo(token);
                setVueloSeleccionado(listaReservaVuelos.data);
            } catch (error) {
                console.log("Error:", error);
            }
        }
        listaDeReservasVuelo();
    }, [])

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
            <div className="gestioVuelos-design">
                <div className="titulo-Vuelos">
                    <h2>Reserva de Vuelos</h2>
                </div>

                <div className="content-vuelos">

                    <button className="btn-adicinar"> <CLink path="/hacerreserva" title="Reservar vuelos"></CLink></button>

                    <div className="tabla-Vuelos">
                        {
                            vueloSeleccionado?.length > 0 ?
                                (
                                    <>
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>ID</th>
                                                    <th>Email</th>
                                                    <th>Id Vuelo</th>
                                                    <th>Nombre Vuelo</th>
                                                    <th>Fecha</th>
                                                    <th>Hora</th>
                                                    <th>Asientos</th>
                                                    <th>Pago</th>
                                                    <th>Acciones</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    vueloSeleccionado.map((reservaVuelos) => (
                                                        <tr key={reservaVuelos._id}>
                                                            <td>
                                                                <input
                                                                    type="text"
                                                                    name="emailUsuario"
                                                                    value={reservaVuelos.emailUsuario}
                                                                    readOnly
                                                                />
                                                            </td>
                                                            <td>
                                                                <input
                                                                    type="text"
                                                                    name="nameUsuario"
                                                                    value={reservaVuelos.nameUsuario}
                                                                    readOnly
                                                                />
                                                            </td>
                                                            <td>
                                                                <input
                                                                    type="text"
                                                                    name="idVuelo"
                                                                    value={reservaVuelos.idVuelo}
                                                                    readOnly
                                                                />
                                                            </td>
                                                            <td>
                                                                <input
                                                                    type="text"
                                                                    name="nameVuelo"
                                                                    value={reservaVuelos.nameVuelo}
                                                                    readOnly
                                                                />
                                                            </td>
                                                            <td>
                                                                <input
                                                                    type="text"
                                                                    name="fechaVuelo"
                                                                    value={reservaVuelos.fechaVuelo}
                                                                    readOnly
                                                                />
                                                            </td>
                                                            <td>
                                                                <input
                                                                    type="text"
                                                                    name="horaVuelo"
                                                                    value={reservaVuelos.horaVuelo}
                                                                    readOnly
                                                                />
                                                            </td>
                                                            <td>
                                                                <input
                                                                    type="text"
                                                                    name="cantidadAsiento"
                                                                    value={reservaVuelos.cantidadAsiento}
                                                                    readOnly
                                                                />
                                                                {console.log("Cant: ", reservaVuelos.cantidadAsiento)}
                                                            </td>
                                                            <td>
                                                                <input
                                                                    type="text"
                                                                    name="pago"
                                                                    value={reservaVuelos.pago}
                                                                    readOnly
                                                                />
                                                            </td>
                                                            <td>
                                                                {/* <button className="btn btn-light" onClick={() => editar(reservaVuelos)}><i className="bi bi-feather"></i></button> */}
                                                                {/* <button className="btn btn-danger" onClick={() => eliminarVueloId(reservaVuelos._id)}><i className="bi bi-trash3"></i></button> */}
                                                            </td>
                                                        </tr>
                                                    ))
                                                }
                                            </tbody>
                                        </table>
                                    </>
                                )
                                :
                                (
                                    <div>No hay usuarios disponibles</div>
                                )
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

