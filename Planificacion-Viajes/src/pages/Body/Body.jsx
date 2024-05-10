
import { Routes, Route, Navigate } from "react-router-dom";
import { Home } from "../Home/Home";
import { Registrar } from "../Registro/Registrar";
import { Login } from "../Login/Login";
import { GestionUsuario } from "../GestionDeUsuario/GestionUsuario";
import { GestionVuelos } from "../GestionDeVuelos/GestionVuelos";
import { GestionDeAlojamientos } from "../GestionDeAlojamientos/GestionDeAlojamientos";
import { GestionReservasVuelos } from "../GestionReservasVuelos/GestionReservasVuelos";
import { DetalleVuelo } from "../DetalleVuelo/DetalleVuelo";
import { GestionDeReservaAlojamientos } from "../GestionDeReservaAlojamientos/GestionDeReservaAlojamientos";
import { DetalleVueloPasage } from "../DetalleVueloPasage/DetalleVueloPasage";


export const Body = () => {
    return (
        <Routes>
            <Route path="*" element={<Navigate to ={"/"} replace />} />
            <Route path="/" element={<Home />} />
            <Route path="/registrar" element={<Registrar />} />
            <Route path="/login" element={<Login />} />
            <Route path="/gestionusaurio" element={<GestionUsuario />} />
            <Route path="/gestionvuelo" element={<GestionVuelos />} />
            <Route path="/gestionalojamiento" element={<GestionDeAlojamientos />} />
            <Route path="/gestionreservavuelo" element={<GestionReservasVuelos />} />
            <Route path="/gestionDeReservaAlojamientos" element={<GestionDeReservaAlojamientos />} />
            {/* Agrega una ruta para mostrar detalles del vuelo */}
            <Route path="/vuelos/:origen/:destino" element={<DetalleVuelo />} />
            <Route path="/detallevuelopasage/:_id" element={<DetalleVueloPasage />} />
      {/* <Route path="/vuelos/:origenDestino" element={<DetalleVuelo />} /> */}
        </Routes>
    )
}