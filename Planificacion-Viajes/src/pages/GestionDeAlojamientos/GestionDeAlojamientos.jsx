
import { useNavigate } from "react-router-dom"
import "./GestionDeAlojamientos.css"
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { userData } from "../../app/slices/userSlice";
// import { Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ListaDeAlojamientos } from "../../services/rootss";
// import CTextField from "../../common/CTextField/CTextField";
// import { TextField } from "@mui/material";

export const GestionDeAlojamientos = () => {
    const navigate = useNavigate();

    /////////////  INSTACIA DE CONEXIÓN A MODO LECTURA   ////////////////
    const rdxUsuario = useSelector(userData);
    const token = rdxUsuario.credentials.token;

    /////////////  CREANDO LOS HOOKS   ////////////////
    const [modalInsertar, setModalInsertar] = useState(false);
    // const [modalEditandoAlojamiento, setModalEditandoAlojamiento] = useState(false);
    // const [alojamientoSeleccionado, setAlojamientoSeleccionado] = useState({})
    const [alojamiento, setAlojamiento] = useState(false);

    // const [alojamientoEditando, setAlojamientoEditando] = useState({
    //     _id: "",
    //     name: "",
    //     local: "",
    //     tipo: "",
    //     precio: "",
    // })

    useEffect(() => {
        if (!rdxUsuario.credentials.token) {
            navigate("/")
        }
    }, [rdxUsuario]);

    // const inputHandler = (e) => {
    //     setAlojamiento((prevState) => ({
    //         ...prevState,
    //         [e.target.name]: e.target.value,
    //     }))
    // }

    /////////////  MÉTODO LISTAR VUELOS   ////////////////
    useEffect(() => {
        const listaDeAlojamientos = async () => {
            try {
                const listaVuelos = await ListaDeAlojamientos(token);
                setAlojamiento(listaVuelos.data);
            } catch (error) {
                console.log("Error:", error);
            }
        }
        listaDeAlojamientos();
    }, [token])

    /////////////  MÉTODO ADICIONAR VUELO  ////////////////
    // const adicionarVuelo = async () => {
    //     try {
    //         for (let elemento in alojamiento) {
    //             if (alojamiento[elemento] === "") {
    //                 throw new Error("Todos los campos tienen que estar rellenos");
    //             }
    //         }
    //         const fetched = await AdicionarVuelo(alojamiento, token);
    //         setAlojamiento(fetched)
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    // const inputHandlerEditar = (e) => {
    //     setAlojamientoEditando((prevState) => ({
    //         ...prevState,
    //         [e.target.name]: e.target.value,
    //     }));
    // }

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

    // const editar = (vuelo) => {
    //     setAlojamientoEditando({
    //         ...vuelo
    //     });
    //     abrirCerrarModalEditar();
    // }

    /////////////  MÉTODO ELIMINAR VUELO   ////////////////
    // const eliminarVueloId = async (_id) => {
    //     try {
    //         const eliminarUsuario = await EliminarVuelo(_id, token);
    //         setAlojamientoEditando(eliminarUsuario);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    /////////////  CREACIÓN DE MODALES    ////////////////
    const abrirCerrarModalInsertar = () => {
        setModalInsertar(!modalInsertar);
    }

    // const abrirCerrarModalEditar = () => {
    //     setModalEditandoAlojamiento(!modalEditandoAlojamiento);
    // }

    return (
        <>
            <div className="gestioVuelos-design">
                <div className="titulo-Vuelos">
                    <h2>Alojamientos</h2>
                </div>

                <div className="content-vuelos">
                    {<button className="btn-adicinar" onClick={() => abrirCerrarModalInsertar()}>Adicionar Alojamiento</button>}

                    <div className="tabla-Vuelos">
                        {

                            alojamiento?.length > 0 ?
                                (
                                    <>
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>ID</th>
                                                    <th>Nombre</th>
                                                    <th>local</th>
                                                    <th>tipo</th>
                                                    <th>Precio</th>
                                                    <th>Acciones</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    alojamiento.map((alojamiento) => (
                                                        <tr key={alojamiento._id}>
                                                            <td>
                                                                <input
                                                                    type="text"
                                                                    name="id"
                                                                    value={alojamiento._id}
                                                                    readOnly
                                                                />
                                                            </td>
                                                            <td>
                                                                <input
                                                                    type="text"
                                                                    name="name"
                                                                    value={alojamiento.name}
                                                                    readOnly
                                                                />
                                                            </td>
                                                            <td>
                                                                <input
                                                                    type="text"
                                                                    name="local"
                                                                    value={alojamiento.local}
                                                                    readOnly
                                                                />
                                                            </td>
                                                            <td>
                                                                <input
                                                                    type="text"
                                                                    name="tipo"
                                                                    value={alojamiento.tipo}
                                                                    readOnly
                                                                />
                                                            </td>
                                                            <td>
                                                                <input
                                                                    type="text"
                                                                    name="precio"
                                                                    value={alojamiento.precio}
                                                                    readOnly
                                                                />
                                                            </td>
                                                            <td>
                                                                {/* <button className="btn btn-light" onClick={() => editar(vuelos)}><i className="bi bi-feather"></i></button>
                                                                <button className="btn btn-danger" onClick={() => eliminarVueloId(vuelos._id)}><i className="bi bi-trash3"></i></button> */}
                                                            </td>
                                                        </tr>
                                                    ))
                                                }
                                            </tbody>
                                        </table>
                                        {
                                            <>
                                                {/* <Modal show={modalInsertar} onHide={abrirCerrarModalInsertar}>
                                                    <Modal.Header closeButton>
                                                        <Modal.Title>Adicionar Alojamiento</Modal.Title>
                                                    </Modal.Header>

                                                    <Modal.Body className="modal-vuelo">

                                                        <CTextField
                                                            type="name"
                                                            name="name"
                                                            placeholder="Nombre.."
                                                            value={vuelo.name || ""}
                                                            changeEmit={inputHandler}
                                                        />
                                                        <CTextField
                                                            type="local"
                                                            name="local"
                                                            placeholder="Local..."
                                                            value={vuelo.origen || ""}
                                                            changeEmit={inputHandler}
                                                        />
                                                        <CTextField
                                                            type="tipo"
                                                            name="tipo"
                                                            placeholder="Tipo..."
                                                            value={vuelo.aerolinea || ""}
                                                            changeEmit={inputHandler}
                                                        />
                                                        <CTextField
                                                            type="precio"
                                                            name="precio"
                                                            placeholder="precio.."
                                                            value={vuelo.precio || ""}
                                                            changeEmit={inputHandler}
                                                        />
                                                    </Modal.Body>
                                                    <Modal.Footer className="modal-footer">
                                                        <button className="btn btn-primary" onClick={adicionarVuelo}>Guardar</button>
                                                        <button className="btn btn-secondary" onClick={abrirCerrarModalInsertar}>Cancelar</button>
                                                    </Modal.Footer>
                                                </Modal>

                                                <Modal show={modalEditandoAlojamiento} onHide={abrirCerrarModalEditar}>
                                                    <Modal.Header closeButton>
                                                        <Modal.Title>Editar Vuelo</Modal.Title>
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
                                                        <button className="btn btn-primary" onClick={() => actualizarVuelo()} >Guardar</button>
                                                        <button className="btn btn-secondary" onClick={abrirCerrarModalEditar}>Cancelar</button>
                                                    </Modal.Footer>
                                                </Modal> */}
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
