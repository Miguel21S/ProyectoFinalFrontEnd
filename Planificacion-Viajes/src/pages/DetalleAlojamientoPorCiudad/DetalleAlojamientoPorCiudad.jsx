
import { useNavigate, useParams } from "react-router-dom";
import "./DetalleAlojamientoPorCiudad.css";
import { useEffect, useState } from "react";
import { HacerReservaAlojamiento, ListaDeAlojamientos } from "../../services/rootss";
import { Modal } from "react-bootstrap";
import { Button } from "@mui/material";
import CTextField from "../../common/CTextField/CTextField";
import { useSelector } from "react-redux";
import { userData } from "../../app/slices/userSlice";

export const DetalleAlojamientoPorCiudad = () => {
    const navigate = useNavigate();
    const { ciudad } = useParams();

    const [modalInsertar, setModalInsertar] = useState(false);
    const [reservaAlojamiento, setReservaAlojamiento] = useState([]);
    const [alojamientoAReservar, setAlojamientoAReservar] = useState({
        _id: "",
        fechaEntrada: "",
        horaEntrada: "",
        fechaSalida: "",
        horaSalida: "",
    });

    /////////////  INSTACIA DE CONEXIÓN A MODO LECTURA   ////////////////
    const rdxUsuario = useSelector(userData);
    const token = rdxUsuario.credentials.token;
    
    /////////////  LISTAR ALOJAMIENTOS   ////////////////
    useEffect(() => {
        const listaAlojamientos = async () => {
            try {
                const lAlojamientos = await ListaDeAlojamientos();
                if (lAlojamientos.success) {
                    const alojamientosFiltrados = lAlojamientos.data.filter(alojamiento => alojamiento.ciudad === ciudad);
                    setReservaAlojamiento(alojamientosFiltrados);
                } else {
                    console.log("Error:", lAlojamientos.message);
                }
            } catch (error) {
                console.log("Error:", error);
            }
        };
        listaAlojamientos();
    }, [ciudad]);

    ////////////////   MÉTODO RESERVAR ALOJAMIENTO    //////////////////////////////
    const rAlojamiento = async () => {
        try {
            const alojamientoReservado = await HacerReservaAlojamiento(alojamientoAReservar._id, alojamientoAReservar, token);
            setAlojamientoAReservar({
                _id: "",
                fechaEntrada: "",
                horaEntrada: "",
                fechaSalida: "",
                horaSalida: "",
                alojamientoReservado
            });
            abrirCerrarModalInsertar()

            if (!rdxUsuario.credentials.token) {
                navigate("/login");
            }

        } catch (error) {
            console.log("Error:", error);
        }
    };

    const abrirCerrarModalInsertar = (id) => {
        setAlojamientoAReservar({
            ...alojamientoAReservar,
            _id: id,
            fechaEntrada: "",
            horaEntrada: "",
            fechaSalida: "",
            horaSalida: "",
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
                    <h2>Alojamientos disponibles desde {ciudad}</h2>
                    {reservaAlojamiento.map((alojamiento) => (
                        <div key={alojamiento._id} className="col">
                            <div className="card">
                                <div className="container text-center">
                                    <img src="..." className="card-img-top" alt="..." />
                                    <hr />
                                    <div className="card-body">
                                        <div className="row">
                                            <h5 className="card-title">{alojamiento.ciudad}</h5>
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
                                                            <p>{alojamiento.tipo}</p>
                                                        </div>
                                                        <div>
                                                            <p>Precio</p>
                                                            <p>{alojamiento.precio}</p>
                                                        </div>
                                                    </div>
                                                    <div className="col-4 col-sm-6">
                                                        <Modal show={modalInsertar} onHide={() => setModalInsertar(false)}>
                                                            <Modal.Header closeButton>
                                                                <Modal.Title>Adicionar Vuelo</Modal.Title>
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
                                                                            name="fechaEntrada"
                                                                            placeholder="Fecha de entrada..."
                                                                            value={alojamientoAReservar.fechaEntrada}
                                                                            changeEmit={inputHandler}
                                                                        />
                                                                        <CTextField
                                                                            type="text"
                                                                            name="horaEntrada"
                                                                            placeholder="Hora de entrada..."
                                                                            value={alojamientoAReservar.horaEntrada}
                                                                            changeEmit={inputHandler}
                                                                        />
                                                                    </div>
                                                                    <div className="col">
                                                                        <CTextField
                                                                            type="text"
                                                                            name="fechaSalida"
                                                                            placeholder="Fecha de salida..."
                                                                            value={alojamientoAReservar.fechaSalida}
                                                                            changeEmit={inputHandler}
                                                                        />
                                                                        <CTextField
                                                                            type="text"
                                                                            name="horaSalida"
                                                                            placeholder="Hora de salida..."
                                                                            value={alojamientoAReservar.horaSalida}
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

