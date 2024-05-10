
// import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import "./DetalleVueloPasage.css";
import { HacerReservaVuelo, ListaDeVuelos } from "../../services/rootss";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { userData } from "../../app/slices/userSlice";
import CTextField from "../../common/CTextField/CTextField";
import { Button, TextField } from "@mui/material";

export const DetalleVueloPasage = () => {
    const navigate = useNavigate();

    const { _id } = useParams();

    const [reservaVuelo, setReservaVuelo] = useState([]);
    const [vuelo, setVuelo] = useState({
        _id: "",
        cantidadAsiento: "",
        precioPagar: "",
    });

    /////////////  INSTACIA DE CONEXIÓN A MODO LECTURA   ////////////////
    const rdxUsuario = useSelector(userData);
    const token = rdxUsuario.credentials.token;

    useEffect(() => {
        if (!rdxUsuario.credentials.token) {
            navigate("/login")
        }
    }, [rdxUsuario]);

    const inputHandler = (e) => {
        setVuelo((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    useEffect(() => {
        const listaDeVuelos = async () => {
            try {
                const listaVuelos = await ListaDeVuelos(token);
                const vuelosFiltrados = listaVuelos.data.find(reservaVuelo => reservaVuelo._id === _id);
                if (vuelosFiltrados) {
                    setReservaVuelo([vuelosFiltrados]);
                }
            } catch (error) {
                console.log("Error:", error);
            }
        }
        listaDeVuelos();
    }, [_id])

    const comprarBillete = async () => {
        try {


            const billete = await HacerReservaVuelo(_id, vuelo, token);
            setVuelo(billete);
            console.log("B: ", billete);
        } catch (error) {
            console.log("Error:", error);
        }
    }

    return (
        <>
            <div className="design-vuelopasage">
                <div className="content-info">
                    {
                        reservaVuelo.map((vuelo) => (
                            <div key={vuelo._id} className="design-datos">
                                <h2>Detalles del vuelo <i className="bi bi-airplane-engines"></i></h2>
                                <div className="container text-center">
                                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 design-ifno">
                                        <div className="col-3">
                                            <div className="info-vuelo"><strong> Nombre del vuelo </strong></div>
                                            <div className="info-vuelo"><strong> Aerolínea </strong></div>
                                            <div className="info-vuelo"><strong> Capacidad restante</strong></div>
                                            <div className="info-vuelo"><strong> Origen </strong></div>
                                            <div className="info-vuelo"><strong> Destino </strong></div>
                                            <div className="info-vuelo"><strong> Fecha de salida <i className="bi bi-calendar2-date"></i></strong></div>
                                            <div className="info-vuelo"><strong> Hora de salida <i className="bi bi-clock-history"></i> </strong></div>
                                            <div className="info-vuelo"><strong> Pasagen / <i className="bi bi-person-standing"></i> </strong></div>
                                        </div>
                                        <div className="col-3">
                                            <div className="info-vuelo"> {vuelo.name}</div>
                                            <div className="info-vuelo"> {vuelo.aerolinea}</div>
                                            <div className="info-vuelo"> {vuelo.capacidadAsiento}</div>
                                            <div className="info-vuelo">{vuelo.origen}</div>
                                            <div className="info-vuelo"> {vuelo.destino}</div>
                                            <div className="info-vuelo"> {vuelo.fechaIda}</div>
                                            <div className="info-vuelo"> {vuelo.horaIda}</div>
                                            <div className="info-vuelo"> {vuelo.precio} <i className="bi bi-currency-euro"></i></div>
                                        </div>
                                        <div className="col-3">


                                        </div>
                                    </div>
                                </div>
                                {/* Otros detalles del vuelo */}
                            </div>
                        ))
                    }
                    {
                        <>
                            <div className="info-vuelo">
                                <CTextField
                                    type="number"
                                    name="cantidadAsiento"
                                    placeholder="Cantidad de personas..."
                                    value={vuelo.cantidadAsiento || ""}
                                    changeEmit={inputHandler}

                                />
                            </div>

                            <div className="info-vuelo">
                                <CTextField
                                    type="number"
                                    name="precioPagar"
                                    placeholder="Cantidad de personas..."
                                    value={vuelo.precioPagar || ""}
                                    changeEmit={inputHandler}

                                />
                            </div>

                            <div className="info-vuelo">
                                <Button variant="contained" color="success" onClick={() => comprarBillete(_id)}>
                                    Pagar
                                </Button>
                            </div>
                        </>
                    }
                </div>
            </div>
        </>
    );
};


{/* <TextField
id="precioPagar"
name="precioPagar"
label="Precio a pagar"
type="number"
value={vuelo.precioPagar || ""}
onChange={inputHandler}
fullWidth
InputProps={{
    inputProps: { min: 0 }
}}

/> */}