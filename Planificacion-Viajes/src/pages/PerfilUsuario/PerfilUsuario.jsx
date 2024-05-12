
import "./PerfilUsuario.css"
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { userData } from "../../app/slices/userSlice";
import { useEffect, useState } from "react";
import { EliminarMiReservaVuelos, MiPerfil, MisReservaAlojamientos, MisReservaVuelos } from "../../services/rootss";

export const PerfilUsuario = () => {
    const navigate = useNavigate();

    const [datosReservaVuelo, setDatosReservaVuelo] = useState([]);
    const [datosReservaAlojamientos, setDatosReservaAlojamientos] = useState([]);
    const [datosPerfil, setDatosPerfil] = useState([]);

    /////////////  INSTACIA DE CONEXIÓN A MODO LECTURA   ////////////////
    const rdxUsuario = useSelector(userData);
    const token = rdxUsuario.credentials.token;

    /////////////  TRAER DATOS DEL PERFIL DE USUARIO   ////////////////
    useEffect(() => {
        if (!rdxUsuario.credentials.token) {
            navigate("/login")
        }
    }, [rdxUsuario, navigate]);


    useEffect(() => {
        const perfil = async () => {
            try {
                const datosMi = await MiPerfil(token);
                setDatosPerfil(datosMi.data);
            } catch (error) {
                console.log("Error:", error);
            }
        }
        perfil();
    }, [token])

    /////////////  TRAER DATOS DE RESERVAS DE VUELO   ////////////////
    useEffect(() => {
        const listaMiReservasVuelo = async () => {
            try {
                const rVuelos = await MisReservaVuelos(token);
                setDatosReservaVuelo(rVuelos.data);
            } catch (error) {
                console.log("Error:", error);
            }
        }
        listaMiReservasVuelo()
    }, [token])

    /////////////  TRAER DATOS DE RESERVAS DE VUELO   ////////////////
    useEffect(() => {
        const listaMiReservasAlojamientos = async () => {
            try {
                const rAlojamientos = await MisReservaAlojamientos(token);
                setDatosReservaAlojamientos(rAlojamientos.data);
            } catch (error) {
                console.log("Error:", error);
            }
        }
        listaMiReservasAlojamientos()
    }, [token])

    ////////////////////////    ELIMINAR MI RESERVA DE VUELO    //////////////////////////////
    const eliminarResVuelo = async (id) => {
        try {
            const eliminarR = await EliminarMiReservaVuelos(id, token);
            setDatosReservaVuelo(eliminarR);

            const rVuelos = await MisReservaVuelos(token);
            setDatosReservaVuelo(rVuelos.data);
        } catch (error) {
            console.log("Error:", error);
        }
    }
    return (
        <>
            <div className="usuarioPerfil-design">
                <div className="porfilColuna1">
                    <div className="row">
                        <div className="coluna1">
                            {datosPerfil.length > 0 ? (
                                <div>
                                    <h1 id="h1">Perfil</h1>
                                    {datosPerfil.map((datos) => (
                                        <div key={datos._id}>
                                            <div>{datos.name} {datos.apellido}</div>
                                            <div className="datosPerfil">{datos.email}</div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p>Cargando perfil...</p>
                            )}
                        </div>
                    </div>
                </div>

                <div className="perfil-body">
                    <div className="row row-content">
                        <div className="perfil-body-content1">
                            <div className="tabla-reserva-vuelo">
                                <h4 id="h4">Reservas de vuelo</h4>
                                {datosReservaVuelo.length > 0 ? (
                                    <>
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th className="th-design">Id</th>
                                                    <th className="th-design">Vuelo</th>
                                                    <th className="th-design">AerolineaVuelo</th>
                                                    <th className="th-design">Nombre</th>
                                                    <th className="th-design">Hora</th>
                                                    <th className="th-design">origenVuelo</th>
                                                    <th className="th-design">destinoVuelo</th>
                                                    <th className="th-design">Pago</th>
                                                    <th className="th-design">Ación</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {datosReservaVuelo.map((vuelos) => (
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
                                                                name="id"
                                                                value={vuelos.nameVuelo}
                                                                readOnly
                                                            />
                                                        </td>
                                                        <td>
                                                            <input
                                                                type="text"
                                                                name="id"
                                                                value={vuelos.aerolineaVuelo}
                                                                readOnly
                                                            />
                                                        </td>
                                                        <td>
                                                            <input
                                                                type="text"
                                                                name="id"
                                                                value={vuelos.nameUsuario + " " + vuelos.nameApellido}
                                                                readOnly
                                                            />
                                                        </td>
                                                        <td>
                                                            <input
                                                                type="text"
                                                                name="id"
                                                                value={vuelos.horaVuelo}
                                                                readOnly
                                                            />
                                                        </td>
                                                        <td>
                                                            <input
                                                                type="text"
                                                                name="id"
                                                                value={vuelos.origenVuelo}
                                                                readOnly
                                                            />
                                                        </td>
                                                        <td>
                                                            <input
                                                                type="text"
                                                                name="id"
                                                                value={vuelos.destinoVuelo}
                                                                readOnly
                                                            />
                                                        </td>
                                                        <td>
                                                            <input
                                                                type="text"
                                                                name="id"
                                                                value={vuelos.precioPagar}
                                                                readOnly
                                                            />
                                                        </td>
                                                        <td>
                                                            <button className="btn btn-danger" onClick={() => eliminarResVuelo(vuelos._id)} ><i className="bi bi-trash3"></i></button>

                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </>

                                ) : (
                                    <p>Cargando perfil...</p>
                                )}
                            </div>
                        </div>
                        <div className="perfil-body-content2">
                            <div className="tabla-reserva-vuelo">
                                <h4>Reservas de alojamientos</h4>
                                {datosReservaAlojamientos.length > 0 ? (
                                    <>
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th className="th-design">Id</th>
                                                    <th className="th-design">Alojamiento</th>
                                                    <th className="th-design">Ciudad</th>
                                                    <th className="th-design">Nombre</th>
                                                    <th className="th-design">Email</th>
                                                    <th className="th-design">Fecha de entrada</th>
                                                    <th className="th-design">Hora de entrada</th>
                                                    <th className="th-design">Fecha de salida</th>
                                                    <th className="th-design">Hora de salida</th>
                                                    <th className="th-design">Ación</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {datosReservaAlojamientos.map((alojaminetos) => (
                                                    <tr key={alojaminetos._id}>
                                                        <td>
                                                            <input
                                                                type="text"
                                                                name="id"
                                                                value={alojaminetos._id}
                                                                readOnly
                                                            />
                                                        </td>
                                                        <td>
                                                            <input
                                                                type="text"
                                                                name="nameVuelo"
                                                                value={alojaminetos.nameAlojamiento}
                                                                readOnly
                                                            />
                                                        </td>
                                                        <td>
                                                            <input
                                                                type="text"
                                                                name="ciudadAlojamiento"
                                                                value={alojaminetos.ciudadAlojamiento}
                                                                readOnly
                                                            />
                                                        </td>
                                                        <td>
                                                            <input
                                                                type="text"
                                                                name="nameUsuario"
                                                                value={alojaminetos.nameUsuario +" "+ alojaminetos.apellidoUsuario}
                                                                readOnly
                                                            />
                                                        </td>
                                                        <td>
                                                            <input
                                                                type="text"
                                                                name="emailUsuario"
                                                                value={alojaminetos.emailUsuario}
                                                                readOnly
                                                            />
                                                        </td>
                                                        <td>
                                                            <input
                                                                type="text"
                                                                name="fechaEntrada"
                                                                value={alojaminetos.fechaEntrada}
                                                                readOnly
                                                            />
                                                        </td>
                                                        <td>
                                                            <input
                                                                type="text"
                                                                name="horaEntrada"
                                                                value={alojaminetos.horaEntrada}
                                                                readOnly
                                                            />
                                                        </td>
                                                        <td>
                                                            <input
                                                                type="text"
                                                                name="fechaSalida"
                                                                value={alojaminetos.fechaSalida}
                                                                readOnly
                                                            />
                                                        </td>
                                                        <td>
                                                            <input
                                                                type="text"
                                                                name="horaSalida"
                                                                value={alojaminetos.horaSalida}
                                                                readOnly
                                                            />
                                                        </td>
                                                        <td>
                                                            <button className="btn btn-danger" onClick={() => eliminarResVuelo(alojaminetos._id)} ><i className="bi bi-trash3"></i></button>

                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </>

                                ) : (
                                    <p>Cargando perfil...</p>
                                )}
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </>
    );
}
