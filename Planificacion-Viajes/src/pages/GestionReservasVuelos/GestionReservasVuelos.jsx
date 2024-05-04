
import { useNavigate } from "react-router-dom"
import "./GestionReservasVuelos.css"
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { userData } from "../../app/slices/userSlice";
import { Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import CTextField from "../../common/CTextField/CTextField";
import { ListarReservasVuelo } from "../../services/rootss";
import { TextField } from "@mui/material";

export const GestionReservasVuelos = () => {
    const navigate = useNavigate();

    /////////////  INSTACIA DE CONEXIÓN A MODO LECTURA   ////////////////
    const rdxUsuario = useSelector(userData);
    const token = rdxUsuario.credentials.token;

    /////////////  CREANDO LOS HOOKS   ////////////////
    const [modalInsertar, setModalInsertar] = useState(false);
    const [modalEditandoReservasVuelos, setModalEditandoReservasVuelos] = useState(false);
    const [vueloSeleccionado, setVueloSeleccionado] = useState({})
    const [reservaVuelo, setReservaVuelo] = useState(false);

    const [vuelosEditando, setVuelosEditando] = useState({
        _id: "",
        name: "",
        aerolinea: "",
        origen: "",
        destino: "",
        precio: "",
        fechaIda: "",
        horaIda: "",
        fechaRegreso: "",
        horaRegreso: "",
    })

    useEffect(() => {
        if (!rdxUsuario.credentials.token) {
            navigate("/")
        }
    }, [rdxUsuario]);

    const inputHandler = (e) => {
        setReservaVuelo((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    /////////////  MÉTODO LISTAR VUELOS   ////////////////
    useEffect(() => {
        const listaDeReservasVuelo = async () => {
            try {
                const listaVuelos = await ListarReservasVuelo(token);
                setVueloSeleccionado(listaVuelos.data);
            } catch (error) {
                console.log("Error:", error);
            }
        }
        listaDeReservasVuelo();
    }, [token])

    /////////////  MÉTODO ADICIONAR VUELO  ////////////////
    // const adicionarVuelo = async () => {
    //     try {
    //         for (let elemento in reservaVuelo) {
    //             if (reservaVuelo[elemento] === "") {
    //                 throw new Error("Todos los campos tienen que estar rellenos");
    //             }
    //         }
    //         const fetched = await AdicionarVuelo(reservaVuelo, token);
    //         setReservaVuelo(fetched)
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    const inputHandlerEditar = (e) => {
        setVuelosEditando((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    }

    /////////////  MÉTODO ACTUALIZAR VUELO   ////////////////
    // const actualizarVuelo = async () => {
    //     try {
    //         const actualizar = await ActualizarVuelo(vuelosEditando, token);
    //         setVuelosEditando(actualizar)
    //         console.log("id:", actualizar);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    const editar = (reservaVuelo) => {
        setVuelosEditando({
            ...reservaVuelo
        });
        abrirCerrarModalEditar();
    }

    /////////////  MÉTODO ELIMINAR VUELO   ////////////////
    // const eliminarVueloId = async (_id) => {
    //     try {
    //         const eliminarUsuario = await EliminarVuelo(_id, token);
    //         setVuelosEditando(eliminarUsuario);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    /////////////  CREACIÓN DE MODALES    ////////////////
    const abrirCerrarModalInsertar = () => {
        setModalInsertar(!modalInsertar);
    }

    const abrirCerrarModalEditar = () => {
        setModalEditandoReservasVuelos(!modalEditandoReservasVuelos);
    }

    return (
        <>
            <div className="gestioVuelos-design">
                <div className="titulo-Vuelos">
                    <h2>Reserva de Vuelos</h2>
                </div>

                <div className="content-vuelos">
                    {<button className="btn-adicinar" onClick={() => abrirCerrarModalInsertar()}>Adicionar Reserva de Vuelo</button>}

                    <div className="tabla-Vuelos">
                        {

                            vueloSeleccionado?.length > 0 ?
                                (
                                    <>
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>ID</th>
                                                    <th>ID Usuario</th>
                                                    <th>Email</th>
                                                    <th>Id Vuelo</th>
                                                    <th>Nombre Vuelo</th>
                                                    <th>Fecha</th>
                                                    <th>Hora</th>
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
                                                                    name="id"
                                                                    value={reservaVuelos._id}
                                                                    readOnly
                                                                />
                                                            </td>
                                                            <td>
                                                                <input
                                                                    type="text"
                                                                    name="name"
                                                                    value={reservaVuelos.emailUsuario}
                                                                    readOnly
                                                                />
                                                            </td>
                                                            <td>
                                                                <input
                                                                    type="text"
                                                                    name="aerolinea"
                                                                    value={reservaVuelos.nameUsuario}
                                                                    readOnly
                                                                />
                                                            </td>
                                                            <td>
                                                                <input
                                                                    type="text"
                                                                    name="origen"
                                                                    value={reservaVuelos.idVuelo}
                                                                    readOnly
                                                                />
                                                            </td>
                                                            <td>
                                                                <input
                                                                    type="text"
                                                                    name="destino"
                                                                    value={reservaVuelos.nameVuelo}
                                                                    readOnly
                                                                />
                                                            </td>
                                                            <td>
                                                                <input
                                                                    type="text"
                                                                    name="fechaIda"
                                                                    value={reservaVuelos.fechaVuelo}
                                                                    readOnly
                                                                />
                                                            </td>
                                                            <td>
                                                                <input
                                                                    type="text"
                                                                    name="horaIda"
                                                                    value={reservaVuelos.horaVuelo}
                                                                    readOnly
                                                                />
                                                            </td>
                                                            <td>
                                                                <input
                                                                    type="text"
                                                                    name="fechaRegreso"
                                                                    value={reservaVuelos.pago}
                                                                    readOnly
                                                                />
                                                            </td>
                                                            <td>
                                                                <button className="btn btn-light" onClick={() => editar(reservaVuelos)}><i className="bi bi-feather"></i></button>
                                                                {/* <button className="btn btn-danger" onClick={() => eliminarVueloId(reservaVuelos._id)}><i className="bi bi-trash3"></i></button> */}
                                                            </td>
                                                        </tr>
                                                    ))
                                                }
                                            </tbody>
                                        </table>
                                        {
                                            <>
                                                <Modal show={modalInsertar} onHide={abrirCerrarModalInsertar}>
                                                    <Modal.Header closeButton>
                                                        <Modal.Title>Adicionar Reserva de Vuelo</Modal.Title>
                                                    </Modal.Header>
                                                    <div className="row">
                                                        <Modal.Body className="modal-vuelo">
                                                            <div className="col">
                                                                <CTextField
                                                                    type="name"
                                                                    name="name"
                                                                    placeholder="Nombre.."
                                                                    value={reservaVuelo.name || ""}
                                                                    changeEmit={inputHandler}
                                                                />
                                                                <CTextField
                                                                    type="aerolinea"
                                                                    name="aerolinea"
                                                                    placeholder="Aerolinea.."
                                                                    value={reservaVuelo.aerolinea || ""}
                                                                    changeEmit={inputHandler}
                                                                />

                                                            </div>
                                                            <div className="col">
                                                                <CTextField
                                                                    type="origen"
                                                                    name="origen"
                                                                    placeholder="Origen..."
                                                                    value={reservaVuelo.origen || ""}
                                                                    changeEmit={inputHandler}
                                                                />
                                                                <CTextField
                                                                    type="destino"
                                                                    name="destino"
                                                                    placeholder="Destino..."
                                                                    value={reservaVuelo.destino || ""}
                                                                    changeEmit={inputHandler}
                                                                />
                                                            </div>
                                                            <div className="col">
                                                                <CTextField
                                                                    type="fechaIda"
                                                                    name="fechaIda"
                                                                    placeholder="Fecha de Ida..."
                                                                    value={reservaVuelo.fechaIda || ""}
                                                                    changeEmit={inputHandler}
                                                                />
                                                                <CTextField
                                                                    type="horaIda"
                                                                    name="horaIda"
                                                                    placeholder="Hora de Ida.."
                                                                    value={reservaVuelo.horaIda || ""}
                                                                    changeEmit={inputHandler}
                                                                />
                                                            </div>
                                                            <div className="col">
                                                                <CTextField
                                                                    type="fechaRegreso"
                                                                    name="fechaRegreso"
                                                                    placeholder="Fecha de Regreso.."
                                                                    value={reservaVuelo.fechaRegreso || ""}
                                                                    changeEmit={inputHandler}
                                                                />
                                                                <CTextField
                                                                    type="horaRegreso"
                                                                    name="horaRegreso"
                                                                    placeholder="hora de Regreso.."
                                                                    value={reservaVuelo.horaRegreso || ""}
                                                                    changeEmit={inputHandler}
                                                                />
                                                            </div>
                                                            <div className="col">
                                                                <CTextField
                                                                    type="precio"
                                                                    name="precio"
                                                                    placeholder="precio.."
                                                                    value={reservaVuelo.precio || ""}
                                                                    changeEmit={inputHandler}
                                                                />
                                                            </div>
                                                        </Modal.Body>
                                                    </div>
                                                    <Modal.Footer className="modal-footer">
                                                        {/* <button className="btn btn-primary" onClick={adicionarVuelo}>Guardar</button> */}
                                                        <button className="btn btn-secondary" onClick={abrirCerrarModalInsertar}>Cancelar</button>
                                                    </Modal.Footer>
                                                </Modal>

                                                <Modal show={modalEditandoReservasVuelos} onHide={abrirCerrarModalEditar}>
                                                    <Modal.Header closeButton>
                                                        <Modal.Title>Editar Reserva</Modal.Title>
                                                    </Modal.Header>
                                                    <Modal.Body className="modal">
                                                        <div className="col">

                                                            <TextField className="textFil"
                                                                type="text"
                                                                name="id"
                                                                value={vuelosEditando._id}
                                                                readOnly
                                                            />
                                                            <CTextField
                                                                type="name"
                                                                name="name"
                                                                placeholder="Nombre.."
                                                                value={vuelosEditando.name || ""}
                                                                changeEmit={inputHandlerEditar}
                                                            />
                                                        </div>

                                                        <div className="col">
                                                            <CTextField
                                                                type="aerolinea"
                                                                name="aerolinea"
                                                                placeholder="Aerolinea.."
                                                                value={vuelosEditando.aerolinea || ""}
                                                                changeEmit={inputHandlerEditar}
                                                            />
                                                            <CTextField
                                                                type="origen"
                                                                name="origen"
                                                                placeholder="Origen..."
                                                                value={vuelosEditando.origen || ""}
                                                                changeEmit={inputHandlerEditar}
                                                            />
                                                        </div>

                                                        <div className="col">
                                                            <CTextField
                                                                type="destino"
                                                                name="destino"
                                                                placeholder="Destino..."
                                                                value={vuelosEditando.destino || ""}
                                                                changeEmit={inputHandlerEditar}
                                                            />
                                                            <CTextField
                                                                type="fechaIda"
                                                                name="fechaIda"
                                                                placeholder="Fecha de Ida..."
                                                                value={vuelosEditando.fechaIda || ""}
                                                                changeEmit={inputHandlerEditar}
                                                            />

                                                        </div>

                                                        <div className="col">
                                                            <CTextField
                                                                type="horaIda"
                                                                name="horaIda"
                                                                placeholder="Hora de Ida.."
                                                                value={vuelosEditando.horaIda || ""}
                                                                changeEmit={inputHandlerEditar}
                                                            />
                                                            <CTextField
                                                                type="fechaRegreso"
                                                                name="fechaRegreso"
                                                                placeholder="Fecha de Regreso.."
                                                                value={vuelosEditando.fechaRegreso || ""}
                                                                changeEmit={inputHandlerEditar}
                                                            />

                                                        </div>

                                                        <div className="col">
                                                            <CTextField
                                                                type="horaRegreso"
                                                                name="horaRegreso"
                                                                placeholder="hora de Regreso.."
                                                                value={vuelosEditando.horaRegreso || ""}
                                                                changeEmit={inputHandlerEditar}
                                                            />
                                                            <CTextField
                                                                type="precio"
                                                                name="precio"
                                                                placeholder="precio.."
                                                                value={vuelosEditando.precio || ""}
                                                                changeEmit={inputHandlerEditar}
                                                            />
                                                        </div>

                                                    </Modal.Body>
                                                    <Modal.Footer>
                                                        {/* <button className="btn btn-primary" onClick={() => actualizarVuelo()} >Guardar</button> */}
                                                        <button className="btn btn-secondary" onClick={abrirCerrarModalEditar}>Cancelar</button>
                                                    </Modal.Footer>
                                                </Modal>
                                            </>
                                        }
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
