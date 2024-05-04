
import { Routes, Route, Navigate } from "react-router-dom";
import { Home } from "../Home/Home";
import { Registrar } from "../Registro/Registrar";
import { Login } from "../Login/Login";
import { GestionUsuario } from "../GestionDeUsuario/GestionUsuario";
import { GestionVuelos } from "../GestionDeVuelos/GestionVuelos";
import { GestionDeAlojamientos } from "../GestionDeAlojamientos/GestionDeAlojamientos";
import { GestionReservasVuelos } from "../GestionReservasVuelos/GestionReservasVuelos";

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
        </Routes>
    )
}