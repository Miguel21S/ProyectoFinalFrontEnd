
import { useNavigate } from "react-router-dom"
import "./GestionDeAlojamientos.css"
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { userData } from "../../app/slices/userSlice";
import { Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { UpdateAccmmodation, CreateAccmmodation, DeleteAccommodation, ListAccommodations } from "../../services/rootss";
import CTextField from "../../common/CTextField/CTextField";
import { Pagination, Stack, TextField } from "@mui/material";
import Swal from "sweetalert2";
import { profileData } from "../../app/slices/profileSlice";
import { CTable } from "../../common/CTable/CTable";

export const GestionDeAlojamientos = () => {
    const navigate = useNavigate();

    /////////////  INSTACIA DE CONEXIÓN A MODO LECTURA   ////////////////
    const rdxUsuario = useSelector(userData);
    const token = rdxUsuario.credentials.token;
    const searchCriteria = useSelector(profileData).criteria;
    ////////////////   PAGINACIÓN   ////////////////
    const [page, setPage] = React.useState(1);
    const [rowsPerPage] = React.useState(5);

    const handleChangePage = (event, value) => {
        setPage(value);
    };

    /////////////  CREANDO LOS HOOKS   ////////////////
    const [modalInsertar, setModalInsertar] = useState(false);
    const [modalEditandoAlojamiento, setModalEditandoAlojamiento] = useState(false);
    const [alojamientoSeleccionado, setAlojamientoSeleccionado] = useState([])
    const [alojamiento, setAlojamiento] = useState(false);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [editandoalojamiento, setEditandoAlojamiento] = useState({
        _id: "",
        name: "",
        city: "",
        kinds: "",
        price: "",
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
                const listaVuelos = await ListAccommodations(token);
                setAlojamientoSeleccionado(listaVuelos.data);
            } catch (error) {
                console.log("Error:", error);
                setError("Hubo un problema al cargar los datos");
            } finally {
                setLoading(false); // Finaliza la carga
            }
        }
        listaDeAlojamientos();
    }, [token])

    if (loading) return <p>Cargando datos...</p>;
    if (error) return <p>{error}</p>;

    /////////////  MÉTODO FILTRAR USUARIOS   ////////////////
    const filtrarAlojamientos = alojamientoSeleccionado.filter((alojamientos) => {
        const criteria = searchCriteria || '';
        return alojamientos.name.toLowerCase().includes(criteria.toLowerCase()) ||
            alojamientos.city.toLowerCase().includes(criteria.toLowerCase()) ||
            alojamientos.kinds.toLowerCase().includes(criteria.toLowerCase())
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
                const fetched = await CreateAccmmodation(alojamiento, token);
                setAlojamiento(fetched)

                const listaVuelos = await ListAccommodations(token);
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
                const actualizar = await UpdateAccmmodation(editandoalojamiento._id, editandoalojamiento, token);
                setEditandoAlojamiento(actualizar);

                const listaVuelos = await ListAccommodations(token);
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
                const eliminarUsuario = await DeleteAccommodation(_id, token);
                setEditandoAlojamiento(eliminarUsuario);

                const listaVuelos = await ListAccommodations(token);
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

    ///////////  TRANSFORMACIÓN Y MAPEO DE LOS DATOS PARA SER AJUSTADO EN LAS COLUMNAS
    const mappedData = filtrarAlojamientos.map(item => ({
        id: item._id,
        nombre: item.name,
        ciudad: item.city,
        tipo: item.kinds,
        precio: item.price,
        acciones: "Acciones disponibles", // O CUALQUIER VALOR PARA ESTA COLUMNA
    }));

    ///////////  PAGINACIÓN Y FILTRO DE DATOS
    const paginatedData = mappedData.slice(
        (page - 1) * rowsPerPage,
        (page - 1) * rowsPerPage + rowsPerPage
    );

    ///////////////   EN CABEZADOS Y BOTTONES DE ACCIONES
    const columns = [
        { header: "ID", accessor: "id" },
        { header: "Nombre", accessor: "nombre" },
        { header: "Ciudad", accessor: "ciudad" },
        { header: "Tipo", accessor: "tipo" },
        { header: "Precio", accessor: "precio" },
        { header: "Acciones", accessor: "acciones" },
        {
            header: "Acciones",
            accessor: "acciones",
            render: (row) => (
                <div>
                    <button className="btn btn-light" onClick={() => editar(row)}>
                        <i className="bi bi-feather"></i>
                    </button>
                    <button
                        className="btn btn-danger"
                        onClick={() => eliminarAlojamiento(row._id)}
                    >
                        <i className="bi bi-trash3"></i>
                    </button>
                </div>
            ),
        },
    ];

    return (
        <>
            <div className="gestioVuelos-design">
                <div className="titulo-alojamiento">
                    <h2>Alojamientos</h2>
                </div>

                <div className="content-alojamiento">
                    {<button className="btn-adicinar" onClick={() => abrirCerrarModalInsertar()}>Adicionar Alojamiento</button>}

                    <div className="tabla-alojamiento">
                        <>
                            <CTable columns={columns} data={paginatedData} customClass="custom-table" />
                        </>

                        <Stack spacing={2} sx={{ justifyContent: 'center', backgroundColor: 'white' }}>
                            <Pagination
                                count={Math.ceil(mappedData.length / rowsPerPage)}
                                page={page}
                                onChange={handleChangePage}
                                size="large"
                            />
                        </Stack>

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
                                    type="city"
                                    name="city"
                                    placeholder="ciudad..."
                                    value={alojamiento.city || ""}
                                    changeEmit={inputHandler}
                                />
                                <CTextField
                                    type="kinds"
                                    name="kinds"
                                    placeholder="Tipo..."
                                    value={alojamiento.kinds || ""}
                                    changeEmit={inputHandler}
                                />
                                <CTextField
                                    type="price"
                                    name="price"
                                    placeholder="precio.."
                                    value={alojamiento.price || ""}
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
                                    type="city"
                                    name="city"
                                    placeholder="ciudad..."
                                    value={editandoalojamiento.city || ""}
                                    changeEmit={inputHandlerEditar}
                                />
                                <CTextField
                                    type="kinds"
                                    name="kinds"
                                    placeholder="Tipo..."
                                    value={editandoalojamiento.kinds || ""}
                                    changeEmit={inputHandlerEditar}
                                />
                                <CTextField
                                    type="price"
                                    name="price"
                                    placeholder="precio.."
                                    value={editandoalojamiento.price || ""}
                                    changeEmit={inputHandlerEditar}
                                />

                            </Modal.Body>
                            <Modal.Footer>
                                <button className="btn btn-primary" onClick={() => actualizarAlojamiento()} >Guardar</button>
                                <button className="btn btn-secondary" onClick={abrirCerrarModalEditar}>Cancelar</button>
                            </Modal.Footer>
                        </Modal>
                    </div>
                </div>
            </div>
        </>
    )
}
