
import "./PerfilUsuario.css"
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { userData } from "../../app/slices/userSlice";
import { useEffect, useState } from "react";
import { EliminarMiReservaVuelos, EliminarReservaAlojamiento, MiPerfil, MisReservaAlojamientos, MisReservaVuelos } from "../../services/rootss";
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import jsPDF from "jspdf";
import Swal from 'sweetalert2';


export const PerfilUsuario = () => {
    const navigate = useNavigate();

    const [datosReservaVuelo, setDatosReservaVuelo] = useState([]);
    const [datosReservaAlojamientos, setDatosReservaAlojamientos] = useState([]);
    const [datosPerfil, setDatosPerfil] = useState([]);
    // const [datosReservaAlojamiento, setDatosReservaAlojamiento] = useState([])

    /////////////  INSTACIA DE CONEXIÓN A MODO LECTURA   ////////////////
    const rdxUsuario = useSelector(userData);
    const token = rdxUsuario.credentials.token;

    useEffect(() => {
        if (!rdxUsuario.credentials.token) {
            navigate("/login")
        }
    }, [rdxUsuario, navigate]);


    /////////////  TRAER DATOS DEL PERFIL DE USUARIO   ////////////////
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
        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: '¿Quieres eliminar esta reserva de vuelo?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        });
    
        if (result.isConfirmed) {
            try {
                const eliminarR = await EliminarMiReservaVuelos(id, token);
                setDatosReservaVuelo(eliminarR);
    
                const rVuelos = await MisReservaVuelos(token);
                setDatosReservaVuelo(rVuelos.data);
                Swal.fire(
                    '¡Eliminado!',
                    'La reserva de vuelo ha sido eliminada.',
                    'success'
                );
            } catch (error) {
                console.log("Error:", error);
                Swal.fire(
                    'Error',
                    'Ha ocurrido un error al intentar eliminar la reserva de vuelo.',
                    'error'
                );
            }
        }
    };

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
                const eReservaUsuario = await EliminarReservaAlojamiento(_id, token);
                setDatosReservaAlojamientos(eReservaUsuario);

                const listaReservaAlojamiento = await MisReservaAlojamientos(token);
                setDatosReservaAlojamientos(listaReservaAlojamiento.data);
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

    const generarPDFVuelo = (id) => {
        const doc = new jsPDF();
        const vuelo = datosReservaVuelo.find(v => v._id === id);
        if (!vuelo) {
            console.error(`No se encontró ninguna reserva con el ID: ${id}`);
            return;
        }
    
        doc.text(`Detalles del ID ${vuelo._id}`, 10, 10);
        doc.text(`Nombre del vuelo: ${vuelo.nameVuelo}`, 10, 20);
        doc.text(`Aerolínea: ${vuelo.aerolineaVuelo}`, 10, 30);
        doc.text(`Pasageiro: ${vuelo.nameUsuario} ${vuelo.nameApellido}`, 10, 40);
        doc.text(`Email: ${vuelo.emailUsuario}`, 10, 50);
        doc.text(`Origen: ${vuelo.origenVuelo}`, 10, 60);
        doc.text(`Destino: ${vuelo.destinoVuelo}`, 10, 70);
        doc.text(`Hora de ida: ${vuelo.horaVuelo}`, 10, 80);
        doc.text(`Total a pagar: ${vuelo.precioPagar}`, 10, 90);
    
        doc.save(`reserva_de_vuelo_${vuelo._id}.pdf`);
    };

    const generarPDF = (id) => {
        generarPDFVuelo(id);
    
        const newWindow = window.open('', '_blank');
        if (newWindow !== null) {
            newWindow.document.write('<html><head><title>PDF</title></head><body>');
            newWindow.document.write('<p>Abriendo PDF en una nueva ventana...</p>');
            newWindow.document.write('</body></html>');
        }
    };
    
    return (
        <>
            <div className="usuarioPerfil-design">
                <div className="porfilColuna1">
                    <div className="row">
                        <div className="coluna1">
                            {datosPerfil.length > 0 ? (
                                <div>
                                    <h1 id="h1">
                                    <Badge
                                        overlap="circular"
                                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                        variant="dot"
                                    >
                                        <Avatar alt="Remy Sharp" src="./src/img/p.JPG" />
                                    </Badge>
                                    </h1>
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
                                                        <button className="btn btn-outline-dark" onClick={() => generarPDF(vuelos._id)} ><i className="bi bi-file-earmark-pdf"></i></button>
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
                                                                value={alojaminetos.nameUsuario + " " + alojaminetos.apellidoUsuario}
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
                                                            <button className="btn btn-danger" onClick={() => eliminarReservaAlojamiento(alojaminetos._id)} ><i className="bi bi-trash3"></i></button>

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
