
import { Routes, Route, Navigate } from "react-router-dom";
import { Home } from "../Home/Home";
import { Registrar } from "../Registro/Registrar";

export const Body = () => {
    return (
        <Routes>
            <Route path="*" element={<Navigate to ={"/"} replace />} />
            <Route path="/" element={<Home />} />
            <Route path="registrar" element={<Registrar />} />
        </Routes>
    )
}