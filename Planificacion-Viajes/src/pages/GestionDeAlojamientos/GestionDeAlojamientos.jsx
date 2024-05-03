
import { useNavigate } from "react-router-dom"
import "./GestionDeAlojamientos.css"
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { userData } from "../../app/slices/userSlice";
import { Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ActualizarAlojamiento, CrearAlojamiento, EliminarAjamiento, ListaDeAlojamientos } from "../../services/rootss";
import CTextField from "../../common/CTextField/CTextField";
import { TextField } from "@mui/material";

export const GestionDeAlojamientos = () => {
    const navigate = useNavigate();

    /////////////  INSTACIA DE CONEXIÓN A MODO LECTURA   ////////////////
    const rdxUsuario = useSelector(userData);
    const token = rdxUsuario.credentials.token;

    /////////////  CREANDO LOS HOOKS   ////////////////
    const [modalInsertar, setModalInsertar] = useState(false);
    const [modalEditandoAlojamiento, setModalEditandoAlojamiento] = useState(false);
    const [alojamientoSeleccionado, setAlojamientoSeleccionado] = useState({})
    const [alojamiento, setAlojamiento] = useState(false);

    const [editandoalojamiento, setEditandoAlojamiento] = useState({
        _id: "",
        name: "",
        local: "",
        tipo: "",
        precio: "",
    })

    useEffect(() => {
        if (!rdxUsuario.credentials.token) {
            navigate("/")
        }
    }, [rdxUsuario]);

    const inputHandler = (e) => {
        setAlojamiento((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    /////////////  MÉTODO LISTAR ALOJAMIENTO   ////////////////
    useEffect(() => {
        const listaDeAlojamientos = async () => {
            try {
                const listaVuelos = await ListaDeAlojamientos(token);
                setAlojamientoSeleccionado(listaVuelos.data);
            } catch (error) {
                console.log("Error:", error);
            }
        }
        listaDeAlojamientos();
    }, [token])

    /////////////  MÉTODO ADICIONAR ALOJAMIENTO  ////////////////
    const crearAlojamientos = async () => {
        try {
            for (let elemento in alojamiento) {
                if (alojamiento[elemento] === "") {
                    throw new Error("Todos los campos tienen que estar rellenos");
                }
            }
            const fetched = await CrearAlojamiento(alojamiento, token);
            setAlojamiento(fetched)
        } catch (error) {
            console.log(error);
        }
    }

    const inputHandlerEditar = (e) => {
        setEditandoAlojamiento((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    }

    /////////////  MÉTODO ACTUALIZAR ALOJAMIENTO   ////////////////
    const actualizarAlojamiento = async () => {
        try {
            const actualizar = await ActualizarAlojamiento(editandoalojamiento._id, editandoalojamiento, token);
            setEditandoAlojamiento(actualizar)
            console.log("id:", actualizar);
        } catch (error) {
            console.log(error);
        }
    }

    const editar = (alojamiento) => {
        setEditandoAlojamiento({
            ...alojamiento
        });
        abrirCerrarModalEditar();
    }

    /////////////  MÉTODO ELIMINAR ALOJAMIENTO   ////////////////
    const eliminarAlojamiento = async (_id) => {
        try {
            const eliminarUsuario = await EliminarAjamiento(_id, token);
            setEditandoAlojamiento(eliminarUsuario);
        } catch (error) {
            console.log(error);
        }
    }

    /////////////  CREACIÓN DE MODALES    ////////////////
    const abrirCerrarModalInsertar = () => {
        setModalInsertar(!modalInsertar);
    }

    const abrirCerrarModalEditar = () => {
        setModalEditandoAlojamiento(!modalEditandoAlojamiento);
    }

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

                            alojamientoSeleccionado?.length > 0 ?
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
                                                    alojamientoSeleccionado.map((alojamiento) => (
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
                                                                <button className="btn btn-light" onClick={() => editar(alojamiento)}><i className="bi bi-feather"></i></button>
                                                                <button className="btn btn-danger" onClick={() => eliminarAlojamiento(alojamiento._id)}><i className="bi bi-trash3"></i></button>
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
                                                        <Modal.Title>Adicionar Alojamiento</Modal.Title>
                                                    </Modal.Header>

                                                    <Modal.Body className="modal-vuelo">
                                                        <CTextField
                                                            type="name"
                                                            name="name"
                                                            placeholder="Nombre.."
                                                            value={alojamiento.name || ""}
                                                            changeEmit={inputHandler}
                                                        />
                                                        <CTextField
                                                            type="local"
                                                            name="local"
                                                            placeholder="Local..."
                                                            value={alojamiento.local || ""}
                                                            changeEmit={inputHandler}
                                                        />
                                                        <CTextField
                                                            type="tipo"
                                                            name="tipo"
                                                            placeholder="Tipo..."
                                                            value={alojamiento.tipo || ""}
                                                            changeEmit={inputHandler}
                                                        />
                                                        <CTextField
                                                            type="precio"
                                                            name="precio"
                                                            placeholder="precio.."
                                                            value={alojamiento.precio || ""}
                                                            changeEmit={inputHandler}
                                                        />
                                                    </Modal.Body>
                                                    <Modal.Footer className="modal-footer">
                                                        <button className="btn btn-primary" onClick={crearAlojamientos}>Guardar</button>
                                                        <button className="btn btn-secondary" onClick={abrirCerrarModalInsertar}>Cancelar</button>
                                                    </Modal.Footer>
                                                </Modal>

                                                <Modal show={modalEditandoAlojamiento} onHide={abrirCerrarModalEditar}>
                                                    <Modal.Header closeButton>
                                                        <Modal.Title>Editar Vuelo</Modal.Title>
                                                    </Modal.Header>
                                                    <Modal.Body className="modal">
                                                        <TextField className="textFil"
                                                            type="text"
                                                            name="id"
                                                            value={editandoalojamiento._id}
                                                            readOnly
                                                        />
                                                        <CTextField
                                                            type="name"
                                                            name="name"
                                                            placeholder="Nombre.."
                                                            value={editandoalojamiento.name || ""}
                                                            changeEmit={inputHandlerEditar}
                                                        />
                                                        <CTextField
                                                            type="local"
                                                            name="local"
                                                            placeholder="Local..."
                                                            value={editandoalojamiento.local || ""}
                                                            changeEmit={inputHandlerEditar}
                                                        />
                                                        <CTextField
                                                            type="tipo"
                                                            name="tipo"
                                                            placeholder="Tipo..."
                                                            value={editandoalojamiento.tipo || ""}
                                                            changeEmit={inputHandlerEditar}
                                                        />
                                                        <CTextField
                                                            type="precio"
                                                            name="precio"
                                                            placeholder="precio.."
                                                            value={editandoalojamiento.precio || ""}
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
