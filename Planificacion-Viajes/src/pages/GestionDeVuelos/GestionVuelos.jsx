
import { useNavigate } from "react-router-dom"
import "./GestionVuelos.css"
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { userData } from "../../app/slices/userSlice";
import { Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import CTextField from "../../common/CTextField/CTextField";
import { ActualizarVuelo, AdicionarVuelo, EliminarVuelo, ListaDeVuelos } from "../../services/rootss";
import { Pagination, Stack, TextField } from "@mui/material";
import Swal from "sweetalert2";
import { profileData } from "../../app/slices/profileSlice";

export const GestionVuelos = () => {
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
    const [modalEditandoVuelo, setModalEditandoVuelo] = useState(false);
    const [vueloSeleccionado, setVueloSeleccionado] = useState([])
    const [vuelo, setVuelo] = useState(false);

    const [vuelosEditando, setVuelosEditando] = useState({
        _id: "",
        name: "",
        aerolinea: "",
        capacidadAsiento: "",
        origen: "",
        destino: "",
        precio: "",
        fechaIda: "",
        horaIda: "",
        fechaRegreso: "",
        horaRegreso: "",
    })

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

    /////////////  MÉTODO LISTAR VUELOS   ////////////////
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

    /////////////  MÉTODO FILTRAR VUELOS   ////////////////
    const filtrarVuelos = vueloSeleccionado.filter((vuelos) => {
        const criteria = searchCriteria || '';
        return vuelos.name.toLowerCase().includes(criteria.toLowerCase()) ||
            vuelos.aerolinea.toLowerCase().includes(criteria.toLowerCase()) ||
            vuelos.destino.toLowerCase().includes(criteria.toLowerCase()) ||
            vuelos.fechaIda.toLowerCase().includes(criteria.toLowerCase())
    });

    /////////////  MÉTODO ADICIONAR VUELO  ////////////////
    const adicionarVuelo = async () => {
        const result = await Swal.fire({
            title: '¿Adicionar vuelo?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, adicionar',
            cancelButtonText: 'Cancelar'
        });

        if (result.isConfirmed) {
            try {
                for (let elemento in vuelo) {
                    if (vuelo[elemento] === "") {
                        throw new Error("Todos los campos tienen que estar rellenos");
                    }
                }

                const fetched = await AdicionarVuelo(vuelo, token);
                setVuelo(fetched)

                const listaVuelos = await ListaDeVuelos(token);
                setVueloSeleccionado(listaVuelos.data);
                abrirCerrarModalInsertar();

                Swal.fire(
                    '¡Adicionar!',
                    'Vuelo adicionado correctamente.',
                    'success'
                );
            } catch (error) {
                console.log(error);
                Swal.fire(
                    'Error',
                    'Ha ocurrido un error al intentar adicionar vuelo.',
                    'error'
                );
            }
        }
    }

    const inputHandlerEditar = (e) => {
        setVuelosEditando((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    }

    const editar = (vuelo) => {
        setVuelosEditando({
            ...vuelo
        });
        abrirCerrarModalEditar();
    }
    /////////////  MÉTODO ACTUALIZAR VUELO   ////////////////
    const actualizarVuelo = async () => {
        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: '¿Quieres actualizar este vuelo?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, actualizar',
            cancelButtonText: 'Cancelar'
        });

        if (result.isConfirmed) {
            try {
                const actualizar = await ActualizarVuelo(vuelosEditando._id, vuelosEditando, token);
                setVuelosEditando(actualizar)

                const listaVuelos = await ListaDeVuelos(token);
                setVueloSeleccionado(listaVuelos.data);
                abrirCerrarModalEditar();

                abrirCerrarModalEditar();

                Swal.fire(
                    '¡Actualizado!',
                    'El vuelo ha sido actualizado correctamente.',
                    'success'
                );
            } catch (error) {
                console.log(error);
                Swal.fire(
                    'Error',
                    'Ha ocurrido un error al intentar actualizar el vuelo.',
                    'error'
                );
            }
        }
    };

    /////////////  MÉTODO ELIMINAR VUELO   ////////////////
    const eliminarVueloId = async (_id) => {
        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: 'Deseas eliminar esté Vuelo?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        });

        if (result.isConfirmed) {
            try {
                const eliminarVuelo = await EliminarVuelo(_id, token);
                setVuelosEditando(eliminarVuelo);

                const listaVuelos = await ListaDeVuelos(token);
                setVueloSeleccionado(listaVuelos.data);
                Swal.fire(
                    '¡Eliminado!',
                    'Vuelo ha sido eliminado.',
                    'success'
                );
            } catch (error) {
                console.log("Error:", error);
                Swal.fire(
                    'Error',
                    'Ha ocurrido un error al intentar eliminar Vuelo.',
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
        setModalEditandoVuelo(!modalEditandoVuelo);
    }

    return (
        <>
            <div className="gestioVuelos-design">
                <div className="titulo-Vuelos">
                    <h2>Vuelos</h2>
                </div>

                <div className="content-Vuelos">
                    {<button className="btn-adicinar" onClick={() => abrirCerrarModalInsertar()}>Adicionar Vuelo</button>}

                    <div className="tabla-Vuelos">
                        {
                            filtrarVuelos?.length > 0 ?
                                (
                                    <>
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>ID</th>
                                                    <th>Nombre</th>
                                                    <th>Aerolinea</th>
                                                    <th>Capacidad</th>
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
                                                    (
                                                        rowsPerPage > 0 ?
                                                            filtrarVuelos.slice((page - 1) * rowsPerPage, (page - 1) * rowsPerPage + rowsPerPage)
                                                            : filtrarVuelos
                                                    ).map((vuelos) => (
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
                                                                    name="aerolinea"
                                                                    value={vuelos.capacidadAsiento}
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

                                                                <button className="btn btn-light" onClick={() => editar(vuelos)}><i className="bi bi-feather"></i></button>
                                                                <button className="btn btn-danger" onClick={() => eliminarVueloId(vuelos._id)}><i className="bi bi-trash3"></i></button>
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
                                    <div>No hay vuelos disponibles</div>
                                )
                        }

                        {
                            <>
                                <Modal show={modalInsertar} onHide={abrirCerrarModalInsertar}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Adicionar Vuelo</Modal.Title>
                                    </Modal.Header>
                                    <div className="row">
                                        <Modal.Body className="modal-vuelo">
                                            <div className="col">
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

                                            </div>
                                            <div className="col">
                                                <CTextField
                                                    type="capacidadAsiento"
                                                    name="capacidadAsiento"
                                                    placeholder="Capacidad de asientos..."
                                                    value={vuelo.capacidadAsiento || ""}
                                                    changeEmit={inputHandler}
                                                />
                                                <CTextField
                                                    type="origen"
                                                    name="origen"
                                                    placeholder="Origen..."
                                                    value={vuelo.origen || ""}
                                                    changeEmit={inputHandler}
                                                />
                                            </div>
                                            <div className="col">
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
                                            </div>
                                            <div className="col">
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
                                            </div>
                                            <div className="col">
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
                                            </div>
                                        </Modal.Body>
                                    </div>
                                    <Modal.Footer className="modal-footer">
                                        <button className="btn btn-primary" onClick={adicionarVuelo}>Guardar</button>
                                        <button className="btn btn-secondary" onClick={abrirCerrarModalInsertar}>Cancelar</button>
                                    </Modal.Footer>
                                </Modal>

                                <Modal show={modalEditandoVuelo} onHide={abrirCerrarModalEditar}>
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
                                        </div>
                                        <div className="col">
                                            <CTextField
                                                type="name"
                                                name="name"
                                                placeholder="Nombre.."
                                                value={vuelosEditando.name || ""}
                                                changeEmit={inputHandlerEditar}
                                            />
                                            <CTextField
                                                type="aerolinea"
                                                name="aerolinea"
                                                placeholder="Aerolinea.."
                                                value={vuelosEditando.aerolinea || ""}
                                                changeEmit={inputHandlerEditar}
                                            />
                                        </div>

                                        <div className="col">
                                            <CTextField
                                                type="capacidadAsiento"
                                                name="capacidadAsiento"
                                                placeholder="Capacidad de asientos..."
                                                value={vuelosEditando.capacidadAsiento || ""}
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
                                </Modal>
                            </>
                        }
                    </div>
                    <Stack spacing={2} sx={{ marginTop: '7px', marginBottom: '5px', justifyContent: 'center', backgroundColor: 'white' }}>
                        <Pagination
                            count={Math.ceil(filtrarVuelos.length / rowsPerPage)}
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
