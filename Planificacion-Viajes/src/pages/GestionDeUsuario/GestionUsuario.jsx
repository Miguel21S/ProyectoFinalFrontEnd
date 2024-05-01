
import { useNavigate } from "react-router-dom"
import "./GestionUsuario.css"
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { userData } from "../../app/slices/userSlice";
import { ActualizarUsuario, EliminarUsuario, ListarUsuarios, RegitrarUser } from "../../services/rootss";
import { Button, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CInput } from "../../common/CInput/CInput";

export const GestionUsuario = () => {
    const navigate = useNavigate();

    /////////////  INSTACIA DE CONEXIÓN A MODO LECTURA   ////////////////
    const rdxUsuario = useSelector(userData);
    const token = rdxUsuario.credentials.token;

    /////////////  CREANDO LOS HOOKS   ////////////////
    const [modalInsertar, setModalInsertar] = useState(false);
    const [modalEditandoUsuarios, setModalEditandoUsuarios] = useState(false);
    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState({})
    const [usuario, setUsuario] = useState(false);

    const [usuarioEditando, setUsuarioEditando] = useState({
        name: "",
        apellido: "",
        email: "",
        password: "",
        _id: ""
    })

    useEffect(() => {
        if (!rdxUsuario.credentials.token) {
            navigate("/")
        }
    }, [rdxUsuario]);

    const inputHandler = (e) => {
        setUsuario((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    /////////////  MÉTODO IMPRIMIR USUARIOS DEL DEL SISTEMA   ////////////////
    useEffect(() => {
        const todosSuarios = async () => {
            try {
                const listaUsuarios = await ListarUsuarios(token);
                setUsuarioSeleccionado(listaUsuarios.data);
            } catch (error) {
                console.log("Error:", error);
            }
        }
        todosSuarios();
        setUsuario(false)
    }, [token])

    /////////////  MÉTODO REGISTRAR USUARIO   ////////////////
    const registrar = async () => {
        try {
            for (let elemento in usuario) {
                if (usuario[elemento] === "") {
                    throw new Error("Todos los campos tienen que estar rellenos");
                }
            }
            const fetched = await RegitrarUser(usuario);
            setUsuario(fetched)
        } catch (error) {
            console.log(error);
        }
    }

    const inputHandlerEditar = (e) => {
        setUsuarioEditando((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    }

    /////////////  MÉTODO ACTUALIZAR USUARIO   ////////////////
    const actualizarDatosUsuario = async ()=>{
        try {
            const actualizar = await ActualizarUsuario(usuarioEditando._id, usuarioEditando, token);
            setUsuarioEditando(actualizar)
            console.log("id:", actualizar);
        } catch (error) {
            console.log(error);
        }
    }

    /////////////  MÉTODO ELIMINAR USUARIO   ////////////////
    const eliminarUsuarioId = async(_id) => {
        try {
            const eliminarUsuario = await EliminarUsuario(_id, token);
            setUsuarioEditando(eliminarUsuario);
        } catch (error) {
            console.log(error);
        }
    }

    const editar = (valor) => {
        setUsuarioEditando({
            ...valor
        });
        abrirCerrarModalEditar();
    }

    /////////////  CREACIÓN DE MODALES    ////////////////
    const abrirCerrarModalInsertar = () => {
        setModalInsertar(!modalInsertar);
    }

    const abrirCerrarModalEditar = () => {
        setModalEditandoUsuarios(!modalEditandoUsuarios);
    }

    return (
        <>
            <div className="gestio-design">
                <div className="titulo">
                    <h2>Usuarios</h2>
                </div>
                {<Button onClick={() => abrirCerrarModalInsertar()}>Registrar Usuario</Button>}
                <div className="tablaEditable">
                    {

                        usuarioSeleccionado?.length > 0 ? (
                            <>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Nombre</th>
                                            <th>Apellido</th>
                                            <th>Email</th>
                                            <th>Role</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            usuarioSeleccionado.map((usuario) => (
                                                <tr key={usuario._id}>
                                                    <td> { usuario.name} </td>
                                                    <td> { usuario.apellido } </td>
                                                    <td> { usuario.email } </td>
                                                    <td> { usuario.role} </td>
                                                    <td> { usuario._id } </td>
                                                    <td>
                                                        <button className="btn btn-light" onClick={() => editar(usuario)}><i className="bi bi-feather"></i></button>
                                                        <button className="btn btn-danger" onClick={()=> eliminarUsuarioId(usuario._id)}><i className="bi bi-trash3"></i></button>
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
                                            <Modal.Body>
                                                <CInput
                                                    type="name"
                                                    name="name"
                                                    placeholder="Nombre.."
                                                    value={usuario.name || ""}
                                                    changeEmit={inputHandler}
                                                />
                                                <CInput
                                                    type="apellido"
                                                    name="apellido"
                                                    placeholder="Apellido.."
                                                    value={usuario.apellido || ""}
                                                    changeEmit={inputHandler}
                                                />
                                                <CInput
                                                    type="email"
                                                    name="email"
                                                    placeholder="Email.."
                                                    value={usuario.email || ""}
                                                    changeEmit={inputHandler}
                                                />
                                                <CInput
                                                    type="password"
                                                    name="password"
                                                    placeholder="Password.."
                                                    value={usuario.password || ""}
                                                    changeEmit={inputHandler}
                                                />
                                            </Modal.Body>
                                            <Modal.Footer>
                                                <button className="btn btn-secondary" onClick={abrirCerrarModalInsertar}>Cerrar</button>
                                                <button className="btn btn-primary" onClick={registrar}>Guardar</button>
                                            </Modal.Footer>
                                        </Modal>

                                        <Modal show={modalEditandoUsuarios} onHide={abrirCerrarModalEditar}>
                                            <Modal.Header closeButton>
                                                <Modal.Title>Editar Usuario</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                                <CInput
                                                    type="name"
                                                    name="name"
                                                    placeholder="Nombre.."
                                                    value={usuarioEditando.name || ""}
                                                    changeEmit={inputHandlerEditar}
                                                />
                                                <CInput
                                                    type="apellido"
                                                    name="apellido"
                                                    placeholder="Apellido.."
                                                    value={usuarioEditando.apellido || ""}
                                                    changeEmit={inputHandlerEditar}
                                                />
                                                <CInput
                                                    type="password"
                                                    name="password"
                                                    placeholder="Password.."
                                                    value={usuarioEditando.password || ""}
                                                    changeEmit={inputHandlerEditar}
                                                />
                                                <CInput
                                                    type="role"
                                                    name="role"
                                                    placeholder="role.."
                                                    value={usuarioEditando.role || ""}
                                                    changeEmit={inputHandlerEditar}
                                                />
                                            </Modal.Body>
                                            <Modal.Footer>
                                                <button className="btn btn-secondary" onClick={abrirCerrarModalEditar}>Cerrar</button>
                                                <button className="btn btn-primary" onClick={()=>actualizarDatosUsuario()} >Guardar</button>
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
            </div >
        </>
    )
}
