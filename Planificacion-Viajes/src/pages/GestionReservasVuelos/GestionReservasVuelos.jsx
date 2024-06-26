
import React, { useState, useEffect } from "react";
import "./GestionReservasVuelos.css"
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { userData } from "../../app/slices/userSlice";
import 'bootstrap/dist/css/bootstrap.min.css';
import { EliminarReservaVuelo, ListarReservasVuelo } from "../../services/rootss";
import { CLink } from "../../common/CLink/CLink";
import { Modal } from "react-bootstrap";
import CTextField from "../../common/CTextField/CTextField";
import { Pagination, Stack, TextField } from "@mui/material";
import Swal from "sweetalert2";
import { profileData } from "../../app/slices/profileSlice";

export const GestionReservasVuelos = () => {
    const navigate = useNavigate();
    const rdxUsuario = useSelector(userData);
    const token = rdxUsuario.credentials.token;
    const searchCriteria = useSelector(profileData).criteria;

    ////////////////   PAGINACIÓN   ////////////////
    const [page, setPage] = React.useState(1);
    const [rowsPerPage] = React.useState(6);

    const handleChangePage = (event, value) => {
        setPage(value);
    };

    const [rVueloSeleccionado, setrVueloSeleccionado] = useState([]);
    const [modalEditandoReservaVuelo, setModalEditandoReservaVuelo] = useState(false);

    const [editandoReservaVuelo, setEditandoReservaVuelo] = useState({
        _id: "",
        cantidadAsiento: "",
        precioPagar: "",
        idUsuario: "",
        nameUsuario: "",
        emailUsuario: "",
        idVuelo: "",
        nameVuelo: "",
        origeVuelo: "",
        destinoVuelo: "",
        fechaVuelo: "",
        horaVuelo: "",
    })

    // const [vuelo, setVuelo] = useState([]);

    useEffect(() => {
        if (!rdxUsuario.credentials.token) {
            navigate("/")
        }
    }, []);

    const inputHandlerEditar = (e) => {
        setEditandoReservaVuelo((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    }

    ////////////////////   MÉTODO LISTAR RESERVAS DE VUELO   /////////////////////////////////////
    useEffect(() => {
        const listaDeReservasVuelo = async () => {
            try {
                const listaReservaVuelos = await ListarReservasVuelo(token);
                setrVueloSeleccionado(listaReservaVuelos.data);
            } catch (error) {
                console.log("Error:", error);
            }
        }
        listaDeReservasVuelo();
    }, [])

    /////////////  MÉTODO FILTRAR RESERVA DE VUELOS   ////////////////
    const filtrarReservaVuelo = rVueloSeleccionado.filter((rVuelo) => {
        const criteria = searchCriteria || '';
        return rVuelo.emailUsuario.toLowerCase().includes(criteria.toLowerCase()) ||
            rVuelo.nameUsuario.toLowerCase().includes(criteria.toLowerCase()) ||
            rVuelo.nameVuelo.toLowerCase().includes(criteria.toLowerCase())

    });

    // const editar = (reservaV) => {
    //     setEditandoReservaVuelo({
    //         ...reservaV
    //     });
    //     abrirCerrarModalEditar();
    // }

    /////////////  MÉTODO ACTUALIZAR RESERVA DE VUELO   ////////////////
    // const actualizarAlojamiento = async () => {
    //     const result = await Swal.fire({
    //         title: '¿Estás seguro?',
    //         text: '¿Quieres actualizar este reserva de vuelo?',
    //         icon: 'warning',
    //         showCancelButton: true,
    //         confirmButtonText: 'Sí, actualizar',
    //         cancelButtonText: 'Cancelar'
    //     });

    //     if (result.isConfirmed) {
    //         try {
    //             const actualizar = await EditarReservaVuelo(editandoReservaVuelo._id, editandoReservaVuelo, token);
    //             setEditandoReservaVuelo(actualizar)

    //             const listaReservaVuelos = await ListarReservasVuelo(token);
    //             setVueloSeleccionado(listaReservaVuelos.data);
    //             abrirCerrarModalEditar();

    //             // Mostrar un mensaje de éxito
    //             Swal.fire(
    //                 '¡Actualizado!',
    //                 'La reserva de vuelo ha sido actualizado correctamente.',
    //                 'success'
    //             );
    //         } catch (error) {
    //             // Mostrar un mensaje de error si ocurre un problema
    //             console.log(error);
    //             Swal.fire(
    //                 'Error',
    //                 'Ha ocurrido un error al intentar actualizar la reserva de vuelo.',
    //                 'error'
    //             );
    //         }
    //     }
    // };

    /////////////  MÉTODO ELIMINAR RESERVA DE VUELO   ////////////////
    const eliminarReservaVuelo = async (_id) => {
        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: 'Deseas eliminar reserva de vuelo?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        });

        if (result.isConfirmed) {
            try {
                const eliminarRe = await EliminarReservaVuelo(_id, token);
                setEditandoReservaVuelo(eliminarRe);

                const listaReservaVuelos = await ListarReservasVuelo(token);
                setrVueloSeleccionado(listaReservaVuelos.data);
                Swal.fire(
                    '¡Eliminado!',
                    'Reserva de vuelo ha sido eliminado.',
                    'success'
                );
            } catch (error) {
                console.log("Error:", error);
                Swal.fire(
                    'Error',
                    'Ha ocurrido un error al intentar eliminar reserva de vuelo.',
                    'error'
                );
            }
        }
    }

    /////////////  CREACIÓN DE MODALES    ////////////////
    const abrirCerrarModalEditar = () => {
        setModalEditandoReservaVuelo(!modalEditandoReservaVuelo);
    }

    return (
        <>
            <div className="gestiorVuelos-design">
                <div className="titulo-rVuelos">
                    <h2>Vuelos Reservado</h2>
                </div>

                <div className="content-rVuelos">
                    <button className="btn-adicinarRV"> <CLink path="/vuelos/:origenDestino" title="Reservar vuelos"></CLink></button>

                    <div className="tabla-rVuelos">
                        {
                            rVueloSeleccionado?.length > 0 ?
                                (
                                    <>
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>Email</th>
                                                    <th>Nombre</th>
                                                    <th>Id Vuelo</th>
                                                    <th>Vuelo</th>
                                                    <th>Aerolinea</th>
                                                    <th>Fecha</th>
                                                    <th>Hora</th>
                                                    <th>Asientos</th>
                                                    <th>Pago</th>
                                                    <th>Acciones</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    (
                                                        rowsPerPage > 0 ?
                                                            filtrarReservaVuelo.slice((page - 1) * rowsPerPage, (page - 1) * rowsPerPage + rowsPerPage)
                                                            : filtrarReservaVuelo
                                                    ).map((reservaVuelos) => (
                                                        <tr key={reservaVuelos._id}>
                                                            <td>
                                                                <input
                                                                    type="text"
                                                                    name="emailUsuario"
                                                                    value={reservaVuelos.emailUsuario}
                                                                    readOnly
                                                                />
                                                            </td>
                                                            <td>
                                                                <input
                                                                    type="text"
                                                                    name="nameUsuario"
                                                                    value={reservaVuelos.nameUsuario}
                                                                    readOnly
                                                                />
                                                            </td>
                                                            <td>
                                                                <input
                                                                    type="text"
                                                                    name="idVuelo"
                                                                    value={reservaVuelos.idVuelo}
                                                                    readOnly
                                                                />
                                                            </td>
                                                            <td>
                                                                <input
                                                                    type="text"
                                                                    name="nameVuelo"
                                                                    value={reservaVuelos.nameVuelo}
                                                                    readOnly
                                                                />
                                                            </td>
                                                            <td>
                                                                <input
                                                                    type="text"
                                                                    name="aerolineaVuelo"
                                                                    value={reservaVuelos.aerolineaVuelo}
                                                                    readOnly
                                                                />
                                                            </td>
                                                            <td>
                                                                <input
                                                                    type="text"
                                                                    name="fechaVuelo"
                                                                    value={reservaVuelos.fechaVuelo}
                                                                    readOnly
                                                                />
                                                            </td>
                                                            <td>
                                                                <input
                                                                    type="text"
                                                                    name="horaVuelo"
                                                                    value={reservaVuelos.horaVuelo}
                                                                    readOnly
                                                                />
                                                            </td>
                                                            <td>
                                                                <input
                                                                    type="text"
                                                                    name="cantidadAsiento"
                                                                    value={reservaVuelos.cantidadAsiento}
                                                                    readOnly
                                                                />
                                                            </td>
                                                            <td>
                                                                <input
                                                                    type="text"
                                                                    name="precioPagar"
                                                                    value={reservaVuelos.precioPagar}
                                                                    readOnly
                                                                />
                                                            </td>
                                                            <td>
                                                                {/* <button className="btn btn-light" onClick={() => editar(reservaVuelos)}><i className="bi bi-feather"></i></button> */}
                                                                <button className="btn btn-danger" onClick={() => eliminarReservaVuelo(reservaVuelos._id)}><i className="bi bi-trash3"></i></button>
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
                                    <div>No hay reserva de vuelos</div>
                                )
                        }
                        {
                            <>
                                <Modal show={modalEditandoReservaVuelo} onHide={abrirCerrarModalEditar}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Editar Vuelo</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body className="modal">
                                        <TextField className="textFil"
                                            type="text"
                                            name="id"
                                            value={editandoReservaVuelo._id}
                                            readOnly
                                        />
                                        <CTextField
                                            type="cantidadAsiento"
                                            name="cantidadAsiento"
                                            placeholder="Cantidad de asientos.."
                                            value={editandoReservaVuelo.cantidadAsiento || ""}
                                            changeEmit={inputHandlerEditar}
                                        />
                                        <CTextField
                                            type="precioPagar"
                                            name="precioPagar"
                                            placeholder="Precio a pagar.."
                                            value={editandoReservaVuelo.precioPagar || ""}
                                            changeEmit={inputHandlerEditar}
                                        />

                                    </Modal.Body>
                                    <Modal.Footer>
                                        {/* <button className="btn btn-primary" onClick={() => actualizarAlojamiento()} >Guardar</button> */}
                                        <button className="btn btn-secondary" onClick={abrirCerrarModalEditar}>Cancelar</button>
                                    </Modal.Footer>
                                </Modal>
                            </>
                        }
                    </div>
                    <Stack spacing={2} sx={{ marginTop: '5px', justifyContent: 'center', backgroundColor: 'white' }}>
                        <Pagination
                            count={Math.ceil(filtrarReservaVuelo.length / rowsPerPage)}
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

