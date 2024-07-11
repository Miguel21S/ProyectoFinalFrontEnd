
import { useNavigate, useParams } from "react-router-dom";
import "./DetalleAlojamientoPorCiudad.css";
import { useEffect, useState } from "react";
import { MakeReservationAccommodation, ListAccommodations } from "../../services/rootss";
import { Modal } from "react-bootstrap";
import { Button } from "@mui/material";
import CTextField from "../../common/CTextField/CTextField";
import { useSelector } from "react-redux";
import { userData } from "../../app/slices/userSlice";
import Swal from "sweetalert2";

export const DetalleAlojamientoPorCiudad = () => {
    const navigate = useNavigate();
    const { city } = useParams();

    const [modalInsertar, setModalInsertar] = useState(false);
    const [reservaAlojamiento, setReservaAlojamiento] = useState([]);
    const [alojamientoAReservar, setAlojamientoAReservar] = useState({
        _id: "",
        dateInput: "",
        timeInput: "",
        dateExit: "",
        timeExit: "",
    });

    /////////////  INSTACIA DE CONEXIÓN A MODO LECTURA   ////////////////
    const rdxUsuario = useSelector(userData);
    const token = rdxUsuario.credentials.token;

    /////////////  LISTAR ALOJAMIENTOS   ////////////////
    useEffect(() => {
        const listaAlojamientos = async () => {
            try {
                const lAlojamientos = await ListAccommodations();
                if (lAlojamientos.success) {
                    const alojamientosFiltrados = lAlojamientos.data.filter(reservaAlojamiento => reservaAlojamiento.city === city);
                    setReservaAlojamiento(alojamientosFiltrados);
                } else {
                    console.log("Error:", lAlojamientos.message);
                }
            } catch (error) {
                console.log("Error:", error);
            }
        };
        listaAlojamientos();
    }, [city]);

    ////////////////   MÉTODO RESERVAR ALOJAMIENTO    //////////////////////////////
    const rAlojamiento = async () => {
        if (!rdxUsuario.credentials.token) {
            navigate("/login");
        } else {
            const { dateInput, timeInput, dateExit, timeExit } = alojamientoAReservar;

            if (!dateInput || !timeInput || !dateExit || !timeExit) {
                Swal.fire(
                    'Error',
                    'Todos los campos son obligatorios.',
                    'error'
                );
                return;
            }

            const result = await Swal.fire({
                title: '¿Estás seguro?',
                text: '¿Pretendes salvar la reserva?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Sí',
                cancelButtonText: 'Cancelar'
            });

            if (result.isConfirmed) {
                try {
                    const alojamientoReservado = await MakeReservationAccommodation(alojamientoAReservar._id, alojamientoAReservar, token);
                    setAlojamientoAReservar({
                        _id: "",
                        dateInput: "",
                        timeInput: "",
                        dateExit: "",
                        timeExit: "",
                        alojamientoReservado
                    });
                    abrirCerrarModalInsertar()

                    Swal.fire(
                        '¡Reservado!',
                        'Alojamiento se ha reservado correctamente.',
                        'success'
                    );

                } catch (error) {
                    console.log(error);
                    Swal.fire(
                        'Error',
                        'Ha ocurrido un error al intentar reservar alojamiento.',
                        'error'
                    );
                }
            }
        }

    };

    const abrirCerrarModalInsertar = (id) => {
        setAlojamientoAReservar({
            ...alojamientoAReservar,
            _id: id,
            dateInput: "",
            timeInput: "",
            dateExit: "",
            timeExit: "",
        });
        setModalInsertar(!modalInsertar);
    };

    const inputHandler = (e) => {
        const { name, value } = e.target;
        setAlojamientoAReservar((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    return (
        <>
            <div className="detalle-alojamiento">
                <div className="content-detalle">
                    <h2>Alojamientos disponibles desde {city}</h2>
                    {reservaAlojamiento.map((alojamiento) => (
                        <div key={alojamiento._id} className="col">
                            <div className="card">
                                <div className="container text-center">
                                    <img src="..." className="card-img-top" alt="..." />
                                    <hr />
                                    <div className="card-body">
                                        <div className="row">
                                            <h5 className="card-title">{alojamiento.city}</h5>
                                            <hr />
                                            <div className="col-sm-9">
                                                <div className="row origeDestino">
                                                    <div className="col-8 col-sm-6 origen">
                                                        <div>
                                                            <p>Nombre</p>
                                                            <p>{alojamiento.name}</p>
                                                        </div>
                                                        <div>
                                                            <p>Tipo</p>
                                                            <p>{alojamiento.kinds}</p>
                                                        </div>
                                                        <div>
                                                            <p>Precio</p>
                                                            <p>{alojamiento.price}</p>
                                                        </div>
                                                    </div>
                                                    <div className="col-4 col-sm-6">
                                                        <Modal show={modalInsertar} onHide={() => setModalInsertar(false)}>
                                                            <Modal.Header closeButton>
                                                                <Modal.Title>Reservar Alojamiento</Modal.Title>
                                                            </Modal.Header>
                                                            <div className="row">
                                                                <Modal.Body className="modal-vuelo">
                                                                    <div className="col">
                                                                        <CTextField
                                                                            type="_id"
                                                                            name="_id"
                                                                            placeholder=""
                                                                            value={alojamientoAReservar._id || ""}
                                                                            readOnly
                                                                        />
                                                                    </div>
                                                                    <div className="col">
                                                                        <CTextField
                                                                            type="text"
                                                                            name="dateInput"
                                                                            placeholder="Fecha de entrada..."
                                                                            value={alojamientoAReservar.dateInput}
                                                                            changeEmit={inputHandler}
                                                                        />
                                                                        <CTextField
                                                                            type="text"
                                                                            name="timeInput"
                                                                            placeholder="Hora de entrada..."
                                                                            value={alojamientoAReservar.timeInput}
                                                                            changeEmit={inputHandler}
                                                                        />
                                                                    </div>
                                                                    <div className="col">
                                                                        <CTextField
                                                                            type="text"
                                                                            name="dateExit"
                                                                            placeholder="Fecha de salida..."
                                                                            value={alojamientoAReservar.dateExit}
                                                                            changeEmit={inputHandler}
                                                                        />
                                                                        <CTextField
                                                                            type="text"
                                                                            name="timeExit"
                                                                            placeholder="Hora de salida..."
                                                                            value={alojamientoAReservar.timeExit}
                                                                            changeEmit={inputHandler}
                                                                        />
                                                                    </div>
                                                                </Modal.Body>
                                                            </div>
                                                            <Modal.Footer className="modal-footer">
                                                                <button className="btn btn-primary" onClick={rAlojamiento}>Guardar</button>
                                                                <button className="btn btn-secondary" onClick={() => setModalInsertar(false)}>Cancelar</button>
                                                            </Modal.Footer>
                                                        </Modal>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-3 precio">
                                                <Button variant="contained" color="success" className="btn-adicinar" onClick={() => abrirCerrarModalInsertar(alojamiento._id)}>Reservar</Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

