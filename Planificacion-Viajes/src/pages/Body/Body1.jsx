
import { Routes, Route, Navigate } from "react-router-dom";

import { Registrar } from "../Registro/Registrar";
import { Login } from "../Login/Login";

export const Body = () => {
    return (
        <Routes>
            <Route path="*" element={<Navigate to ={"/"} replace />} />
            
            <Route path="/registrar" element={<Registrar />} />
            <Route path="/login" element={<Login />} />
            
        </Routes>
    )
}