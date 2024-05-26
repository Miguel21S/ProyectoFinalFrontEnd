
import { useNavigate } from "react-router-dom"
import "./GestionUsuario.css"
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { userData } from "../../app/slices/userSlice";
import { ActualizarUsuario, EliminarUsuario, ListarUsuarios, RegitrarUser } from "../../services/rootss";
import { Modal } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
import CTextField from "../../common/CTextField/CTextField";
import Swal from "sweetalert2";
import { Pagination, Stack } from "@mui/material";
import { profileData } from "../../app/slices/profileSlice";

export const GestionUsuario = () => {
    const navigate = useNavigate();

    /////////////  INSTACIA DE CONEXIÓN A MODO LECTURA   ////////////////
    const rdxUsuario = useSelector(userData);
    const token = rdxUsuario.credentials.token;
    const searchCriteria = useSelector(profileData).criteria;

    ////////////////   PAGINACIÓN   ////////////////
    const [page, setPage] = React.useState(1);
    const [rowsPerPage] = React.useState(6);

    const handleChangePage = (event, value) => {
        setPage(value);
    };

    useEffect(() => {
        if (!rdxUsuario.credentials.token) {
            navigate("/login")
        }
    }, [token]);

    /////////////  CREANDO LOS HOOKS   ////////////////
    const [modalInsertar, setModalInsertar] = useState(false);
    const [modalEditandoUsuarios, setModalEditandoUsuarios] = useState(false);
    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState([])
    const [usuario, setUsuario] = useState(false);

    const [usuarioEditando, setUsuarioEditando] = useState({
        _id: "",
        name: "",
        apellido: "",
        email: "",
        password: "",
        role: "",
    })

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

    /////////////  MÉTODO FILTRAR USUARIOS   ////////////////
    const filteredUsuarios = usuarioSeleccionado.filter((usuario) => {
        const criteria = searchCriteria || '';
        return usuario.name.toLowerCase().includes(criteria.toLowerCase()) ||
            usuario.apellido.toLowerCase().includes(criteria.toLowerCase()) ||
            usuario.email.toLowerCase().includes(criteria.toLowerCase());
    });

    /////////////  MÉTODO REGISTRAR USUARIO   ////////////////
    const registrar = async () => {
        const result = await Swal.fire({
            title: '¿Registrar usuario?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, registrar',
            cancelButtonText: 'Cancelar'
        });

        if (result.isConfirmed) {
            try {
                for (let elemento in usuario) {
                    if (usuario[elemento] === "") {
                        throw new Error("Todos los campos tienen que estar rellenos");
                    }
                }
                const fetched = await RegitrarUser(usuario);
                setUsuario(fetched)
    
                const listaUsuarios = await ListarUsuarios(token);
                setUsuarioSeleccionado(listaUsuarios.data);
                abrirCerrarModalInsertar()

                // Mostrar un mensaje de éxito
                Swal.fire(
                    '¡Registrar!',
                    'Usuario registrado correctamente.',
                    'success'
                );
            } catch (error) {
                // Mostrar un mensaje de error si ocurre un problema
                console.log(error);
                Swal.fire(
                    'Error',
                    'Ha ocurrido un error al intentar registrar el usuario.',
                    'error'
                );
            }
        }
    }

    const inputHandlerEditar = (e) => {
        setUsuarioEditando((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    }

    /////////////  MÉTODO ACTUALIZAR USUARIO   ////////////////
    const actualizarDatosUsuario = async () => {
        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: '¿Quieres actualizar este usuario?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, actualizar',
            cancelButtonText: 'Cancelar'
        });

        if (result.isConfirmed) {
            try {
                const actualizar = await ActualizarUsuario(usuarioEditando._id, usuarioEditando, token);
                setUsuarioEditando(actualizar)

                const listaUsuarios = await ListarUsuarios(token);
                setUsuarioSeleccionado(listaUsuarios.data);
                abrirCerrarModalEditar();

                // Mostrar un mensaje de éxito
                Swal.fire(
                    '¡Actualizado!',
                    'El usuario ha sido actualizado correctamente.',
                    'success'
                );
            } catch (error) {
                // Mostrar un mensaje de error si ocurre un problema
                console.log(error);
                Swal.fire(
                    'Error',
                    'Ha ocurrido un error al intentar actualizar el usuario.',
                    'error'
                );
            }
        }
    };

    const editar = (valor) => {
        setUsuarioEditando({
            ...valor
        });
        abrirCerrarModalEditar();
    }

    /////////////  MÉTODO ELIMINAR USUARIO   ////////////////
    const eliminarUsuarioId = async (_id) => {
        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: 'Deseas eliminar esté Usuario?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        });

        if (result.isConfirmed) {
            try {
                const eliminarUsuario = await EliminarUsuario(_id, token);
                setUsuarioEditando(eliminarUsuario);
                const listaUsuarios = await ListarUsuarios(token);
                setUsuarioSeleccionado(listaUsuarios.data);
                Swal.fire(
                    '¡Eliminado!',
                    'Usuario ha sido eliminado.',
                    'success'
                );
            } catch (error) {
                console.log("Error:", error);
                Swal.fire(
                    'Error',
                    'Ha ocurrido un error al intentar eliminar Usuario.',
                    'error'
                );
            }
        }
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
                <div className="titulo-usuario">
                    <h2>Usuarios</h2>
                </div>
                <div className="content-usuarios">
                    {<button className="btn-registrar" onClick={() => abrirCerrarModalInsertar()}>Registrar Usuario</button>}

                    <div className="tabla-usuarios">
                        {
                            filteredUsuarios?.length > 0 ?
                                (
                                    <>
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>ID</th>
                                                    <th>Nombre</th>
                                                    <th>Apellido</th>
                                                    <th>Email</th>
                                                    <th>Role</th>
                                                    <th>Acciones</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    (
                                                        rowsPerPage > 0
                                                            ? filteredUsuarios.slice((page - 1) * rowsPerPage, (page - 1) * rowsPerPage + rowsPerPage)
                                                            : filteredUsuarios
                                                    ).map((usuario) => (
                                                        <tr key={usuario._id}>
                                                            <td>
                                                                <input
                                                                    type="text"
                                                                    name="id"
                                                                    value={usuario._id}
                                                                    readOnly
                                                                />
                                                            </td>
                                                            <td>
                                                                <input
                                                                    type="text"
                                                                    name="name"
                                                                    value={usuario.name}
                                                                    readOnly
                                                                />
                                                            </td>
                                                            <td>
                                                                <input
                                                                    type="text"
                                                                    name="apellido"
                                                                    value={usuario.apellido}
                                                                    readOnly
                                                                />
                                                            </td>
                                                            <td>
                                                                <input
                                                                    type="text"
                                                                    name="email"
                                                                    value={usuario.email}
                                                                    readOnly
                                                                />
                                                            </td>
                                                            <td>
                                                                <input
                                                                    type="text"
                                                                    name="role"
                                                                    value={usuario.role}
                                                                    readOnly
                                                                />
                                                            </td>
                                                            <td>
                                                                <button className="btn btn-light" onClick={() => editar(usuario)}><i className="bi bi-feather"></i></button>
                                                                <button className="btn btn-danger" onClick={() => eliminarUsuarioId(usuario._id)}><i className="bi bi-trash3"></i></button>
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
                                            value={usuario.name || ""}
                                            changeEmit={inputHandler}
                                        />
                                        <CTextField
                                            type="apellido"
                                            name="apellido"
                                            placeholder="Apellido.."
                                            value={usuario.apellido || ""}
                                            changeEmit={inputHandler}
                                        />
                                        <CTextField
                                            type="email"
                                            name="email"
                                            placeholder="Email..."
                                            value={usuario.email || ""}
                                            changeEmit={inputHandler}
                                        />
                                        <CTextField
                                            type="password"
                                            name="password"
                                            placeholder="Password.."
                                            value={usuario.password || ""}
                                            changeEmit={inputHandler}
                                        />
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <button className="btn btn-primary" onClick={registrar}>Guardar</button>
                                        <button className="btn btn-secondary" onClick={abrirCerrarModalInsertar}>Cancelar</button>
                                    </Modal.Footer>
                                </Modal>

                                <Modal show={modalEditandoUsuarios} onHide={abrirCerrarModalEditar}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Editar Usuario</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body className="modal">
                                        <CTextField
                                            type="name"
                                            name="name"
                                            placeholder="Nombre.."
                                            value={usuarioEditando.name || ""}
                                            changeEmit={inputHandlerEditar}
                                        />
                                        <CTextField
                                            type="apellido"
                                            name="apellido"
                                            placeholder="Apellido.."
                                            value={usuarioEditando.apellido || ""}
                                            changeEmit={inputHandlerEditar}
                                        />
                                        <CTextField
                                            type="password"
                                            name="password"
                                            placeholder="Password.."
                                            value={usuarioEditando.password || ""}
                                            changeEmit={inputHandlerEditar}
                                        />
                                        <CTextField
                                            type="role"
                                            name="role"
                                            placeholder="role.."
                                            value={usuarioEditando.role || ""}
                                            changeEmit={inputHandlerEditar}
                                        />

                                    </Modal.Body>
                                    <Modal.Footer className="modal-footer">
                                        <button className="btn btn-primary" onClick={() => actualizarDatosUsuario()} >Guardar</button>
                                        <button className="btn btn-secondary" onClick={abrirCerrarModalEditar}>Cancelar</button>
                                    </Modal.Footer>
                                </Modal>
                            </>
                        }
                    </div>
                    <Stack spacing={2} sx={{ marginBottom: '10px', justifyContent: 'center', backgroundColor: 'white' }}>
                        <Pagination
                            count={Math.ceil(filteredUsuarios.length / rowsPerPage)}
                            page={page}
                            onChange={handleChangePage}
                            size="large"
                        />
                    </Stack>
                </div>
            </div >
        </>
    )
}
