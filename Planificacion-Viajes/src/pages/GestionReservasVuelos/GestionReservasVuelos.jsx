
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { userData } from "../../app/slices/userSlice";
import 'bootstrap/dist/css/bootstrap.min.css';
import { EditarReservaVuelo, EliminarReservaVuelo, ListarReservasVuelo } from "../../services/rootss";
import { CLink } from "../../common/CLink/CLink";
import { Modal } from "react-bootstrap";
import CTextField from "../../common/CTextField/CTextField";
import { TextField } from "@mui/material";

export const GestionReservasVuelos = () => {
    const navigate = useNavigate();
    const rdxUsuario = useSelector(userData);
    const token = rdxUsuario.credentials.token;

    const [vueloSeleccionado, setVueloSeleccionado] = useState({});
    const [modalEditandoReservaVuelo, setModalEditandoReservaVuelo] = useState(false);

    const [editandoReservaVuelo, setEditandoReservaVuelo] = useState({
        _id: "",
        cantidadAsiento: "",
        precioPagar: "",
        idUsuario: "",
        nameUsuario: "",
        emailUsuario: "",
        idVuelo: "",
        nameVuelo: "",
        origeVuelo: "",
        destinoVuelo: "",
        fechaVuelo: "",
        horaVuelo: "",
    })

    // const [vuelo, setVuelo] = useState([]);

    useEffect(() => {
        if (!rdxUsuario.credentials.token) {
            navigate("/")
        }
    }, []);

    const inputHandlerEditar = (e) => {
        setEditandoReservaVuelo((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    }
    
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

    const editar = (reservaV) => {
        setEditandoReservaVuelo({
            ...reservaV
        });
        abrirCerrarModalEditar();
    }

    /////////////  MÉTODO ACTUALIZAR RESERVA DE VUELO   ////////////////
    const actualizarAlojamiento = async () => {
        try {
            const actualizar = await EditarReservaVuelo(editandoReservaVuelo._id, editandoReservaVuelo, token);
            setEditandoReservaVuelo(actualizar)

            const listaReservaVuelos = await ListarReservasVuelo(token);
            setVueloSeleccionado(listaReservaVuelos.data);
            abrirCerrarModalEditar();
        } catch (error) {
            console.log(error);
        }
    }

    /////////////  MÉTODO ELIMINAR RESERVA DE VUELO   ////////////////
    const eliminarReservaVuelo = async (_id) => {
        try {
            const eliminarRe = await EliminarReservaVuelo(_id, token);
            setEditandoReservaVuelo(eliminarRe);

            const listaReservaVuelos = await ListarReservasVuelo(token);
            setVueloSeleccionado(listaReservaVuelos.data);
        } catch (error) {
            console.log("Error:", error);

        }
    }

    /////////////  CREACIÓN DE MODALES    ////////////////
    const abrirCerrarModalEditar = () => {
        setModalEditandoReservaVuelo(!modalEditandoReservaVuelo);
    }

    return (
        <>
            <div className="gestioVuelos-design">
                <div className="titulo-Vuelos">
                    <h2>Vuelos Reservado</h2>
                </div>

                <div className="content-vuelos">

                    <button className="btn-adicinar"> <CLink path="/vuelos/:origenDestino" title="Reservar vuelos"></CLink></button>

                    <div className="tabla-Vuelos">
                        {
                            vueloSeleccionado?.length > 0 ?
                                (
                                    <>
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>Email</th>
                                                    <th>Nombre</th>
                                                    <th>Id Vuelo</th>
                                                    <th>Vuelo</th>
                                                    <th>Aerolinea</th>
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
                                                                    name="aerolineaVuelo"
                                                                    value={reservaVuelos.aerolineaVuelo}
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
                                                            </td>
                                                            <td>
                                                                <input
                                                                    type="text"
                                                                    name="precioPagar"
                                                                    value={reservaVuelos.precioPagar}
                                                                    readOnly
                                                                />
                                                            </td>
                                                            <td>
                                                                <button className="btn btn-light" onClick={() => editar(reservaVuelos)}><i className="bi bi-feather"></i></button>
                                                                <button className="btn btn-danger" onClick={() => eliminarReservaVuelo(reservaVuelos._id)}><i className="bi bi-trash3"></i></button>
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
                                    <div>No hay reserva de vuelos</div>
                                )
                        }
                        {
                            <>
                                <Modal show={modalEditandoReservaVuelo} onHide={abrirCerrarModalEditar}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Editar Vuelo</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body className="modal">
                                        <TextField className="textFil"
                                            type="text"
                                            name="id"
                                            value={editandoReservaVuelo._id}
                                            readOnly
                                        />
                                        <CTextField
                                            type="cantidadAsiento"
                                            name="cantidadAsiento"
                                            placeholder="Cantidad de asientos.."
                                            value={editandoReservaVuelo.cantidadAsiento || ""}
                                            changeEmit={inputHandlerEditar}
                                        />
                                        <CTextField
                                            type="precioPagar"
                                            name="precioPagar"
                                            placeholder="Precio a pagar.."
                                            value={editandoReservaVuelo.precioPagar || ""}
                                            changeEmit={inputHandlerEditar}
                                        />

                                    </Modal.Body>
                                    <Modal.Footer>
                                        <button className="btn btn-primary" onClick={() => actualizarAlojamiento()} >Guardar</button>
                                        <button className="btn btn-secondary" onClick={abrirCerrarModalEditar}>Cancelar</button>
                                    </Modal.Footer>
                                </Modal>
                            </>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

