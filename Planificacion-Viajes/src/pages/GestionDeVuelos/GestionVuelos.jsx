
import { useNavigate } from "react-router-dom"
import "./GestionVuelos.css"
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { userData } from "../../app/slices/userSlice";
import { Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import CTextField from "../../common/CTextField/CTextField";
import { AdicionarVuelo, ListaDeVuelos } from "../../services/rootss";

export const GestionVuelos = () => {
    const navigate = useNavigate();

    /////////////  INSTACIA DE CONEXIÓN A MODO LECTURA   ////////////////
    const rdxUsuario = useSelector(userData);
    const token = rdxUsuario.credentials.token;

    /////////////  CREANDO LOS HOOKS   ////////////////
    const [modalInsertar, setModalInsertar] = useState(false);
    // const [modalEditandoUsuarios, setModalEditandoUsuarios] = useState(false);
    const [vueloSeleccionado, setVueloSeleccionado] = useState({})
    const [vuelo, setVuelo] = useState(false);

    // const [vuelosEditando, setVuelosEditando] = useState({
    //     _id: "",
    //     name: "",
    //     apellido: "",
    //     email: "",
    //     password: "",
    //     role: "",
    // })

    useEffect(() => {
        if (!rdxUsuario.credentials.token) {
            navigate("/")
        }
    }, [rdxUsuario]);

    const inputHandler = (e) => {
        setVuelo((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    /////////////  MÉTODO IMPRIMIR USUARIOS DEL DEL SISTEMA   ////////////////
    useEffect(() => {
        const listaDeVuelos = async () => {
            try {
                const listaVuelos = await ListaDeVuelos(token);
                setVueloSeleccionado(listaVuelos.data);
            } catch (error) {
                console.log("Error:", error);
            }
        }
        listaDeVuelos();
    }, [token])

    /////////////  MÉTODO REGISTRAR USUARIO   ////////////////
    const adicionarVuelo = async () => {
        try {
            for (let elemento in vuelo) {
                if (vuelo[elemento] === "") {
                    throw new Error("Todos los campos tienen que estar rellenos");
                }
            }
            const fetched = await AdicionarVuelo(vuelo, token);
            setVuelo(fetched)
        } catch (error) {
            console.log(error);
        }
    }

    // const inputHandlerEditar = (e) => {
    //     setVuelosEditando((prevState) => ({
    //         ...prevState,
    //         [e.target.name]: e.target.value,
    //     }));
    // }

    /////////////  MÉTODO ACTUALIZAR USUARIO   ////////////////
    // const actualizarDatosUsuario = async () => {
    //     try {
    //         const actualizar = await ActualizarUsuario(usuarioEditando._id, usuarioEditando, token);
    //         setVuelosEditando(actualizar)
    //         console.log("id:", actualizar);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    /////////////  MÉTODO ELIMINAR USUARIO   ////////////////
    // const eliminarUsuarioId = async (_id) => {
    //     try {
    //         const eliminarUsuario = await EliminarUsuario(_id, token);
    //         setVuelosEditando(eliminarUsuario);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    // const editar = (valor) => {
    //     setVuelosEditando({
    //         ...valor
    //     });
    //     abrirCerrarModalEditar();
    // }

    /////////////  CREACIÓN DE MODALES    ////////////////
    const abrirCerrarModalInsertar = () => {
        setModalInsertar(!modalInsertar);
    }

    // const abrirCerrarModalEditar = () => {
    //     setModalEditandoUsuarios(!modalEditandoUsuarios);
    // }

    return (
        <>
            <div className="gestioVuelos-design">
                <div className="titulo-Vuelos">
                    <h2>Vuelos</h2>
                </div>

                <div className="content-vuelos">
                    {<button className="btn-adicinar" onClick={() => abrirCerrarModalInsertar()}>Adicionar Vuelo</button>}

                    <div className="tabla-Vuelos">
                        {

                            vueloSeleccionado?.length > 0 ?
                                (
                                    <>
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>ID</th>
                                                    <th>Nombre</th>
                                                    <th>Aerolinea</th>
                                                    <th>Origen</th>
                                                    <th>Destino</th>
                                                    <th>Fecha de Ida</th>
                                                    <th>Hora de Ida</th>
                                                    <th>Fecha de Regreso</th>
                                                    <th>Hora de Regreso</th>
                                                    <th>Precio</th>
                                                    <th>Acciones</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    vueloSeleccionado.map((vuelos) => (
                                                        <tr key={vuelos._id}>
                                                            <td>
                                                                <input
                                                                    type="text"
                                                                    name="id"
                                                                    value={vuelos._id}
                                                                    readOnly
                                                                />
                                                            </td>
                                                            <td>
                                                                <input
                                                                    type="text"
                                                                    name="name"
                                                                    value={vuelos.name}
                                                                    readOnly
                                                                />
                                                            </td>
                                                            <td>
                                                                <input
                                                                    type="text"
                                                                    name="aerolinea"
                                                                    value={vuelos.aerolinea}
                                                                    readOnly
                                                                />
                                                            </td>
                                                            <td>
                                                                <input
                                                                    type="text"
                                                                    name="origen"
                                                                    value={vuelos.origen}
                                                                    readOnly
                                                                />
                                                            </td>
                                                            <td>
                                                                <input
                                                                    type="text"
                                                                    name="destino"
                                                                    value={vuelos.destino}
                                                                    readOnly
                                                                />
                                                            </td>
                                                            <td>
                                                                <input
                                                                    type="text"
                                                                    name="fechaIda"
                                                                    value={vuelos.fechaIda}
                                                                    readOnly
                                                                />
                                                            </td>
                                                            <td>
                                                                <input
                                                                    type="text"
                                                                    name="horaIda"
                                                                    value={vuelos.horaIda}
                                                                    readOnly
                                                                />
                                                            </td>
                                                            <td>
                                                                <input
                                                                    type="text"
                                                                    name="fechaRegreso"
                                                                    value={vuelos.fechaRegreso}
                                                                    readOnly
                                                                />
                                                            </td>
                                                            <td>
                                                                <input
                                                                    type="text"
                                                                    name="horaRegreso"
                                                                    value={vuelos.horaRegreso}
                                                                    readOnly
                                                                />
                                                            </td>
                                                            <td>
                                                                <input
                                                                    type="text"
                                                                    name="precio"
                                                                    value={vuelos.precio}
                                                                    readOnly
                                                                />
                                                            </td>
                                                            <td>
                                                                {/* <button className="btn btn-light" onClick={() => editar(usuario)}><i className="bi bi-feather"></i></button>
                                                            <button className="btn btn-danger" onClick={() => eliminarUsuarioId(usuario._id)}><i className="bi bi-trash3"></i></button> */}
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
                                                        <Modal.Title>Insertar Usuario</Modal.Title>
                                                    </Modal.Header>
                                                    <Modal.Body className="modal">
                                                        <CTextField
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
                                                        />
                                                        <CTextField
                                                            type="origen"
                                                            name="origen"
                                                            placeholder="Origen..."
                                                            value={vuelo.origen || ""}
                                                            changeEmit={inputHandler}
                                                        />
                                                        <CTextField
                                                            type="destino"
                                                            name="destino"
                                                            placeholder="Destino..."
                                                            value={vuelo.destino || ""}
                                                            changeEmit={inputHandler}
                                                        />
                                                        <CTextField
                                                            type="fechaIda"
                                                            name="fechaIda"
                                                            placeholder="Fecha de Ida..."
                                                            value={vuelo.fechaIda || ""}
                                                            changeEmit={inputHandler}
                                                        />
                                                        <CTextField
                                                            type="horaIda"
                                                            name="horaIda"
                                                            placeholder="Hora de Ida.."
                                                            value={vuelo.horaIda || ""}
                                                            changeEmit={inputHandler}
                                                        />
                                                        <CTextField
                                                            type="fechaRegreso"
                                                            name="fechaRegreso"
                                                            placeholder="Fecha de Regreso.."
                                                            value={vuelo.fechaRegreso || ""}
                                                            changeEmit={inputHandler}
                                                        />
                                                        <CTextField
                                                            type="horaRegreso"
                                                            name="horaRegreso"
                                                            placeholder="hora de Regreso.."
                                                            value={vuelo.horaRegreso || ""}
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
                                                    <Modal.Footer>
                                                        <button className="btn btn-primary" onClick={adicionarVuelo}>Guardar</button>
                                                        <button className="btn btn-secondary" onClick={abrirCerrarModalInsertar}>Cancelar</button>
                                                    </Modal.Footer>
                                                </Modal>

                                                {/* <Modal show={modalEditandoUsuarios} onHide={abrirCerrarModalEditar}>
                                                    <Modal.Header closeButton>
                                                        <Modal.Title>Editar Usuario</Modal.Title>
                                                    </Modal.Header>
                                                    <Modal.Body className="modal">
                                                        <CTextField
                                                            type="name"
                                                            name="name"
                                                            placeholder="Nombre.."
                                                            value={vuelosEditando.name || ""}
                                                            changeEmit={inputHandlerEditar}
                                                        />
                                                        <CTextField
                                                            type="apellido"
                                                            name="apellido"
                                                            placeholder="Apellido.."
                                                            value={vuelosEditando.apellido || ""}
                                                            changeEmit={inputHandlerEditar}
                                                        />
                                                        <CTextField
                                                            type="password"
                                                            name="password"
                                                            placeholder="Password.."
                                                            value={vuelosEditando.password || ""}
                                                            changeEmit={inputHandlerEditar}
                                                        />
                                                        <CTextField
                                                            type="role"
                                                            name="role"
                                                            placeholder="role.."
                                                            value={vuelosEditando.role || ""}
                                                            changeEmit={inputHandlerEditar}
                                                        />

                                                    </Modal.Body>
                                                    <Modal.Footer>
                                                        <button className="btn btn-primary" onClick={() => actualizarDatosUsuario()} >Guardar</button>
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
