
import { useNavigate } from "react-router-dom"
import "./GestionDeReservaAlojamientos.css"
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { userData } from "../../app/slices/userSlice";
import { Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { UpdateReservationAccommodation, DeleteReservationAccommodation, ListReservationAccommodationAdmin } from "../../services/rootss";
import CTextField from "../../common/CTextField/CTextField";
import { Pagination, Stack, TextField } from "@mui/material";
import Swal from "sweetalert2";
import { profileData } from "../../app/slices/profileSlice";

export const GestionDeReservaAlojamientos = () => {
    const navigate = useNavigate();

    /////////////  INSTACIA DE CONEXIÓN A MODO LECTURA   ////////////////
    const rdxUsuario = useSelector(userData);
    const token = rdxUsuario.credentials.token;
    const searchCriteria = useSelector(profileData).criteria;

    /////////////  CREANDO LOS HOOKS   ////////////////
    const [modalInsertar, setModalInsertar] = useState(false);
    const [modalEditandoReservaAlojamiento, setModalEditandoReservaAlojamiento] = useState(false);
    const [reservaAlojamientoSeleccionado, setReservaAlojamientoSeleccionado] = useState([])
    //const [alojamiento, setAlojamiento] = useState(false);

    ////////////////    PAGINACIÓN    ///////////////////////////////
    const [page, setPage] = React.useState(1);
    const [rowsPerPage] = React.useState(5);

    const handleChangePage = (event, value) => {
        setPage(value);
    };

    const [editandoReservaAlojamiento, setEditandoReservaAlojamiento] = useState({
        _id: "",
        dateInput: "",
        timeInput: "",
        dateExit: "",
        timeExit: " "
    })

    useEffect(() => {
        if (!rdxUsuario.credentials.token) {
            navigate("/")
        }
    }, [rdxUsuario]);

   /*  const inputHandler = (e) => {
        setAlojamiento((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    } */

    const inputHandlerEditar = (e) => {
        setEditandoReservaAlojamiento((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    }


    /////////////  MÉTODO LISTAR RESERVA DE ALOJAMIENTOS   ////////////////
    useEffect(() => {
        const reservaAlojamientos = async () => {
            try {
                const listaReservaAlojamiento = await ListReservationAccommodationAdmin(token);
                setReservaAlojamientoSeleccionado(listaReservaAlojamiento.data);
            } catch (error) {
                console.log("Error:", error);
            }
        }
        reservaAlojamientos();
    }, [token])

    /////////////  MÉTODO ADICIONAR ALOJAMIENTO  ////////////////
    // const crearAlojamientos = async () => {
    //     try {
    //         for (let elemento in alojamiento) {
    //             if (alojamiento[elemento] === "") {
    //                 throw new Error("Todos los campos tienen que estar rellenos");
    //             }
    //         }
    //         const fetched = await CrearAlojamiento(alojamiento, token);
    //         setAlojamiento(fetched)

    //         const listaReservaAlojamiento = await ListaReservaAlojamiento(token);
    //         setReservaAlojamientoSeleccionado(listaReservaAlojamiento.data);
    //         abrirCerrarModalInsertar();
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }


    /////////////  MÉTODO ACTUALIZAR ALOJAMIENTO   ////////////////
    const actualizarAlojamiento = async () => {
        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: '¿Quieres actualizar reserva de alojamiento?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, actualizar',
            cancelButtonText: 'Cancelar'
        });

        if (result.isConfirmed) {
            try {
                const actualizar = await UpdateReservationAccommodation(editandoReservaAlojamiento._id, editandoReservaAlojamiento, token);
                setModalEditandoReservaAlojamiento(actualizar)

                const listaReservaAlojamiento = await ListReservationAccommodationAdmin(token);
                setReservaAlojamientoSeleccionado(listaReservaAlojamiento.data);
                abrirCerrarModalEditar();

                Swal.fire(
                    '¡Actualizado!',
                    'La reserva de alojamiento ha sido actualizado correctamente.',
                    'success'
                );
            } catch (error) {
                console.log(error);
                Swal.fire(
                    'Error',
                    'Ha ocurrido un error al intentar actualizar la reserva de alojamiento.',
                    'error'
                );
            }
        }
    };

    /////////////  MÉTODO FILTRAR RESERVA DE ALOJAMIENTOS   ////////////////
    const filtrarReservaAlojamiento = reservaAlojamientoSeleccionado.filter((rAlojamiento) => {
        const criteria = searchCriteria || '';
        return rAlojamiento.nameAccommodation.toLowerCase().includes(criteria.toLowerCase()) ||
            rAlojamiento.nameUser.toLowerCase().includes(criteria.toLowerCase()) ||
            rAlojamiento.emailUser.toLowerCase().includes(criteria.toLowerCase())
    });

    const editar = (rAlojamiento) => {
        setEditandoReservaAlojamiento({
            ...rAlojamiento
        });
        abrirCerrarModalEditar();
    }

    /////////////  MÉTODO ELIMINAR RESERVA DE ALOJAMIENTO   ////////////////
    const eliminarReservaAlojamiento = async (_id) => {
        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: 'Deseas eliminar reserva de alojamiento?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        });

        if (result.isConfirmed) {
            try {
                const eReservaUsuario = await DeleteReservationAccommodation(_id, token);
                setEditandoReservaAlojamiento(eReservaUsuario);

                const listaReservaAlojamiento = await ListReservationAccommodationAdmin(token);
                setReservaAlojamientoSeleccionado(listaReservaAlojamiento.data);
                Swal.fire(
                    '¡Eliminado!',
                    'Reserva de alojamiento ha sido eliminado.',
                    'success'
                );
            } catch (error) {
                console.log("Error:", error);
                Swal.fire(
                    'Error',
                    'Ha ocurrido un error al intentar eliminar reserva de alojamiento.',
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
        setModalEditandoReservaAlojamiento(!modalEditandoReservaAlojamiento);
    }

    return (
        <>
            <div className="gestioVuelos-design">
                <div className="titulo-Vuelos">
                    <h2>Alojamientos Reservados</h2>
                </div>

                <div className="content-vuelos">
                    {<button className="btn-adicinar" onClick={() => abrirCerrarModalInsertar()}>Reservar Alojamiento</button>}

                    <div className="tabla-Vuelos">
                        {

                            reservaAlojamientoSeleccionado?.length > 0 ?
                                (
                                    <>
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>ID</th>
                                                    <th>Alojamiento</th>
                                                    <th>Ciudad</th>
                                                    <th>Usuario</th>
                                                    <th>Email</th>
                                                    <th>Fecha de entrada</th>
                                                    <th>Hora de entrada</th>
                                                    <th>Fecha de salida</th>
                                                    <th>Hora de salida</th>
                                                    <th>Acciones</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    (
                                                        rowsPerPage > 0 ?
                                                            filtrarReservaAlojamiento.slice((page - 1) * rowsPerPage, (page - 1) * rowsPerPage + rowsPerPage)
                                                            : filtrarReservaAlojamiento
                                                    ).map((rAlojamiento) => (
                                                        <tr key={rAlojamiento._id}>
                                                            <td>
                                                                <input
                                                                    type="text"
                                                                    name="id"
                                                                    value={rAlojamiento._id}
                                                                    readOnly
                                                                />
                                                            </td>
                                                            <td>
                                                                <input
                                                                    type="text"
                                                                    name="name"
                                                                    value={rAlojamiento.nameAccommodation}
                                                                    readOnly
                                                                />
                                                            </td>
                                                            <td>
                                                                <input
                                                                    type="text"
                                                                    name="cityAccommodation"
                                                                    value={rAlojamiento.cityAccommodation}
                                                                    readOnly
                                                                />
                                                            </td>
                                                            <td>
                                                                <input
                                                                    type="text"
                                                                    name="nameUser"
                                                                    value={rAlojamiento.nameUser}
                                                                    readOnly
                                                                />
                                                            </td>
                                                            <td>
                                                                <input
                                                                    type="text"
                                                                    name="emailUser"
                                                                    value={rAlojamiento.emailUser}
                                                                    readOnly
                                                                />
                                                            </td>
                                                            <td>
                                                                <input
                                                                    type="text"
                                                                    name="dateInput"
                                                                    value={rAlojamiento.dateInput}
                                                                    readOnly
                                                                />
                                                            </td>
                                                            <td>
                                                                <input
                                                                    type="text"
                                                                    name="timeInput"
                                                                    value={rAlojamiento.timeInput}
                                                                    readOnly
                                                                />
                                                            </td>
                                                            <td>
                                                                <input
                                                                    type="text"
                                                                    name="dateExit"
                                                                    value={rAlojamiento.dateExit}
                                                                    readOnly
                                                                />
                                                            </td>
                                                            <td>
                                                                <input
                                                                    type="text"
                                                                    name="timeExit"
                                                                    value={rAlojamiento.timeExit}
                                                                    readOnly
                                                                />
                                                            </td>
                                                            <td>
                                                                <button className="btn btn-light" onClick={() => editar(rAlojamiento)}><i className="bi bi-feather"></i></button>
                                                                <button className="btn btn-danger" onClick={() => eliminarReservaAlojamiento(rAlojamiento._id)}><i className="bi bi-trash3"></i></button>
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
                                {/* <Modal show={modalInsertar} onHide={abrirCerrarModalInsertar}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Reservar Alojamiento</Modal.Title>
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
                                </Modal> */}

                                <Modal show={modalEditandoReservaAlojamiento} onHide={abrirCerrarModalEditar}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Editar Alojamiento</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body className="modal">
                                        <TextField className="textFil"
                                            type="text"
                                            name="id"
                                            value={editandoReservaAlojamiento._id}
                                            readOnly
                                        />
                                        <CTextField
                                            type="dateInput"
                                            name="dateInput"
                                            placeholder="Fecha entrada.."
                                            value={editandoReservaAlojamiento.dateInput || ""}
                                            changeEmit={inputHandlerEditar}
                                        />
                                        <CTextField
                                            type="timeInput"
                                            name="timeInput"
                                            placeholder="Hora entrada..."
                                            value={editandoReservaAlojamiento.timeInput || ""}
                                            changeEmit={inputHandlerEditar}
                                        />
                                        <CTextField
                                            type="dateExit"
                                            name="dateExit"
                                            placeholder="Fecha salida..."
                                            value={editandoReservaAlojamiento.dateExit || ""}
                                            changeEmit={inputHandlerEditar}
                                        />
                                        <CTextField
                                            type="timeExit"
                                            name="timeExit"
                                            placeholder="hora salida.."
                                            value={editandoReservaAlojamiento.timeExit || ""}
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
                    <Stack spacing={2} sx={{ marginTop: '7px', marginBottom: '5px', justifyContent: 'center', backgroundColor: 'white' }}>
                        <Pagination
                            count={Math.ceil(filtrarReservaAlojamiento.length / rowsPerPage)}
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
