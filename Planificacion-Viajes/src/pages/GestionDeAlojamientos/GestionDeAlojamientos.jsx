
import { useNavigate } from "react-router-dom"
import "./GestionDeAlojamientos.css"
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { userData } from "../../app/slices/userSlice";
import { Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ActualizarAlojamiento, CrearAlojamiento, EliminarAjamiento, ListaDeAlojamientos } from "../../services/rootss";
import CTextField from "../../common/CTextField/CTextField";
import { Pagination, Stack, TextField } from "@mui/material";
import Swal from "sweetalert2";
import { profileData } from "../../app/slices/profileSlice";

export const GestionDeAlojamientos = () => {
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

    /////////////  CREANDO LOS HOOKS   ////////////////
    const [modalInsertar, setModalInsertar] = useState(false);
    const [modalEditandoAlojamiento, setModalEditandoAlojamiento] = useState(false);
    const [alojamientoSeleccionado, setAlojamientoSeleccionado] = useState([])
    const [alojamiento, setAlojamiento] = useState(false);

    const [editandoalojamiento, setEditandoAlojamiento] = useState({
        _id: "",
        name: "",
        ciudad: "",
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

    /////////////  MÉTODO FILTRAR USUARIOS   ////////////////
    const filtrarAlojamientos = alojamientoSeleccionado.filter((alojamientos) => {
        const criteria = searchCriteria || '';
        return alojamientos.name.toLowerCase().includes(criteria.toLowerCase()) ||
        alojamientos.ciudad.toLowerCase().includes(criteria.toLowerCase()) ||
        alojamientos.tipo.toLowerCase().includes(criteria.toLowerCase())
    });

    /////////////  MÉTODO ADICIONAR ALOJAMIENTO  ////////////////
    const crearAlojamientos = async () => {
        const result = await Swal.fire({
            title: '¿Adicionar alojamiento?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, adicionar',
            cancelButtonText: 'Cancelar'
        });

        if (result.isConfirmed) {
            try {
                for (let elemento in alojamiento) {
                    if (alojamiento[elemento] === "") {
                        throw new Error("Todos los campos tienen que estar rellenos");
                    }
                }
                const fetched = await CrearAlojamiento(alojamiento, token);
                setAlojamiento(fetched)
    
                const listaVuelos = await ListaDeAlojamientos(token);
                setAlojamientoSeleccionado(listaVuelos.data);
                abrirCerrarModalInsertar();

                Swal.fire(
                    '¡Adicionar!',
                    'Alojamiento adicionado correctamente.',
                    'success'
                );
            } catch (error) {
                // Mostrar un mensaje de error si ocurre un problema
                console.log(error);
                Swal.fire(
                    'Error',
                    'Ha ocurrido un error al intentar adicionar alojamiento.',
                    'error'
                );
            }
        }
    }

    const inputHandlerEditar = (e) => {
        setEditandoAlojamiento((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    }

    /////////////  MÉTODO ACTUALIZAR ALOJAMIENTO   ////////////////
    // const actualizarAlojamiento = async () => {
    //     try {
    //         const actualizar = await ActualizarAlojamiento(editandoalojamiento._id, editandoalojamiento, token);
    //         setEditandoAlojamiento(actualizar)

    //         const listaVuelos = await ListaDeAlojamientos(token);
    //         setAlojamientoSeleccionado(listaVuelos.data);
    //         abrirCerrarModalEditar();
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    const actualizarAlojamiento = async () => {
        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: '¿Quieres actualizar este alojamiento?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, actualizar',
            cancelButtonText: 'Cancelar'
        });
        
        if (result.isConfirmed) {
            try {
                const actualizar = await ActualizarAlojamiento(editandoalojamiento._id, editandoalojamiento, token);
                setEditandoAlojamiento(actualizar);
    
                const listaVuelos = await ListaDeAlojamientos(token);
                setAlojamientoSeleccionado(listaVuelos.data);

                abrirCerrarModalEditar();
    
                // Mostrar un mensaje de éxito
                Swal.fire(
                    '¡Actualizado!',
                    'El alojamiento ha sido actualizado correctamente.',
                    'success'
                );
            } catch (error) {
                // Mostrar un mensaje de error si ocurre un problema
                console.log(error);
                Swal.fire(
                    'Error',
                    'Ha ocurrido un error al intentar actualizar el alojamiento.',
                    'error'
                );
            }
        }
    };
    
    const editar = (alojamiento) => {
        setEditandoAlojamiento({
            ...alojamiento
        });
        abrirCerrarModalEditar();
    }

    /////////////  MÉTODO ELIMINAR ALOJAMIENTO   ////////////////
    const eliminarAlojamiento = async (_id) => {
        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: 'Deseas eliminar esté Alojamiento?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        });

        if (result.isConfirmed) {
            try {
                const eliminarUsuario = await EliminarAjamiento(_id, token);
                setEditandoAlojamiento(eliminarUsuario);

                const listaVuelos = await ListaDeAlojamientos(token);
                setAlojamientoSeleccionado(listaVuelos.data);
                Swal.fire(
                    '¡Eliminado!',
                    'Alojamiento ha sido eliminado.',
                    'success'
                );
            } catch (error) {
                console.log("Error:", error);
                Swal.fire(
                    'Error',
                    'Ha ocurrido un error al intentar eliminar Alojamiento.',
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
        setModalEditandoAlojamiento(!modalEditandoAlojamiento);
    }

    return (
        <>
            <div className="gestioVuelos-design">
                <div className="titulo-alojamiento">
                    <h2>Alojamientos</h2>
                </div>

                <div className="content-alojamiento">
                    {<button className="btn-adicinar" onClick={() => abrirCerrarModalInsertar()}>Adicionar Alojamiento</button>}

                    <div className="tabla-alojamiento">
                        {
                            alojamientoSeleccionado?.length > 0 ?
                                (
                                    <>
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>ID</th>
                                                    <th>Nombre</th>
                                                    <th>ciudad</th>
                                                    <th>tipo</th>
                                                    <th>Precio</th>
                                                    <th>Acciones</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    (
                                                        rowsPerPage > 0 ?
                                                        filtrarAlojamientos.slice((page -1) * rowsPerPage, (page -1) * rowsPerPage + rowsPerPage)
                                                        : filtrarAlojamientos
                                                    ).map((alojamiento) => (
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
                                                                    name="ciudad"
                                                                    value={alojamiento.ciudad}
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
                                    </>
                                )
                                :
                                (
                                    <div>No hay alojamientos disponibles</div>
                                )
                        }
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
                                            type="ciudad"
                                            name="ciudad"
                                            placeholder="ciudad..."
                                            value={alojamiento.ciudad || ""}
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
                                            type="ciudad"
                                            name="ciudad"
                                            placeholder="ciudad..."
                                            value={editandoalojamiento.ciudad || ""}
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
                    </div>
                    <Stack spacing={2} sx={{ justifyContent: 'center', backgroundColor: 'white'}}>
                        <Pagination
                            count={Math.ceil(filtrarAlojamientos.length / rowsPerPage)}
                            page={page}
                            onChange={handleChangePage}
                            size="large"
                        />
                    </Stack>
                </div>
            </div>
        </>
    )
}
