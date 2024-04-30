
import { useNavigate } from "react-router-dom"
import "./GestionUsuario.css"
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { userData } from "../../app/slices/userSlice";
import { ListarUsuarios, RegitrarUser } from "../../services/rootss";
import { Button, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CInput } from "../../common/CInput/CInput";

export const GestionUsuario = () => {
    const navigate = useNavigate();

    /////////////  INSTACIA DE CONEXIÓN A MODO LECTURA   ////////////////
    const rdxUsuario = useSelector(userData);
    const token = rdxUsuario.credentials.token;

    const [modalInsertar, setModalInsertar] = useState(false);
    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState({
        name: "",
        apellido: "",
        email: "",
        password: "",
        role: ""
    })

    const [usuario, setUsuario] = useState({
        name: "",
        apellido: "",
        email: "",
        password: ""
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
    }, [token])

    const registrar = async () => {
        try {
            for (let elemento in usuario) {
                if (usuario[elemento] === "") {
                    throw new Error("Todos los campos tienen que estar rellenos");
                }
            }
            const fetched = await RegitrarUser(usuario);

        } catch (error) {
            console.log(error);
        }
    }

    const abrirCerrarModalInsertar = () => {
        setModalInsertar(!modalInsertar);
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
                                                    <td>
                                                        <input
                                                            type="text"
                                                            name="name"
                                                            value={usuario.name}
                                                            onChange={e => inputHandler(e, usuario._id)}
                                                        // readOnly={!editandoUsuarios[usuario._id]}
                                                        />
                                                    </td>
                                                    <td>
                                                        <input
                                                            type="text"
                                                            name="apellido"
                                                            value={usuario.apellido}
                                                            onChange={e => inputHandler(e, usuario._id)}
                                                        // readOnly={!editandoUsuarios[usuario._id]}
                                                        />
                                                    </td>
                                                    <td>
                                                        <input
                                                            type="text"
                                                            name="email"
                                                            value={usuario.email}
                                                            onChange={e => inputHandler(e, usuario._id)}
                                                        // readOnly={!editandoUsuarios[usuario._id]}
                                                        />
                                                    </td>
                                                    <td>
                                                        <input
                                                            type="text"
                                                            name="role"
                                                            value={usuario.role}
                                                            onChange={e => inputHandler(e, usuario._id)}
                                                        // readOnly={!editandoUsuarios[usuario._id]}
                                                        />
                                                    </td>
                                                    <td>
                                                        <input
                                                            type="text"
                                                            name="role"
                                                            value={usuario._id}
                                                        // onChange={e => inputHandler(e, usuario._id)}
                                                        // readOnly={!editandoUsuarios[usuario._id]}
                                                        />
                                                    </td>
                                                    <td>
                                                        <button className="btn btn-light" ><i className="bi bi-feather"></i></button>
                                                        <button className="btn btn-danger"><i className="bi bi-trash3"></i></button>
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
