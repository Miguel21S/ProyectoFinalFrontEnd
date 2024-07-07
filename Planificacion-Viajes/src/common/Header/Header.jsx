
import NavDropdown from 'react-bootstrap/NavDropdown';
import "./Header.css"
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import SearchComponent from '../../pages/Component/SearchComponent';
import { logout, userData } from "../../app/slices/userSlice";
import { CLink } from '../CLink/CLink';
import { useNavigate } from 'react-router-dom';
import { Grid } from '@mui/material';

export const Header = () => {
    
    /////////////  INSTACIA DE CONEXIÓN A MODO LECTURA   ////////////////
    const navigate = useNavigate();
    const rdxUsuario = useSelector(userData);
    const dispatch = useDispatch();

    useEffect(() => { }, [rdxUsuario]);

    const handleLogout = () => {
        dispatch(logout({ credentials: "" }));
        navigate("/login");
    };

    ////////////////     RENDER MENU PERFIL DE USUARIO      ////////////////////
    const renderNavDropdown = () => (
        <NavDropdown className='nav-drop' title={rdxUsuario.credentials.usuario.name} id="navbarScrollingDropdown">
            <NavDropdown.Item className="item">
                <CLink path="/perfilusuario" className="item" title="Perfil" />
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item className="salir">
                <div className="header-rigth" onClick={handleLogout}>
                    Salir <i className="bi bi-power"></i>
                </div>
            </NavDropdown.Item>
        </NavDropdown>
    );

    ////////////////     RENDER MENU HEADER SECUNDARIO      ////////////////////
    const renderHeaderLinks = () => (
        <div className="header-secundario-navegate">
            <CLink path="/todosvuelos/destino" title={<span>Vuelos <i className="bi bi-airplane"></i></span>} />
            <CLink path="/todosalojamientos" title={<span>Alojamientos <i className="bi bi-cake"></i></span>} />
            <CLink path="/" title={<span>Planificador <i className="bi bi-calendar-check"></i></span>} />
        </div>
    );

    ////////////////      RENDER BUSCADOR      ////////////////////
    const renderBuscador = () => <SearchComponent />;

    ////////////////      RENDER MENU SUPER ADMIN      ////////////////////
    const renderSuperAdminLinks = () => (
        <NavDropdown className='nav-drop' title={<span>Administración <i className="bi bi-gear-wide-connected"></i></span>} id="navbarScrollingDropdown">
            <NavDropdown.Item className="item">
                <CLink path="/gestionusaurio" title="Usuarios" />
                <CLink path="/gestionvuelo" title="Vuelos" />
                <CLink path="/gestionalojamiento" title="Alojamientos" />
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item className="item">
                <CLink path="/gestionreservavuelo" title="Reserva de vuelos" />
                <NavDropdown.Divider />
                <CLink path="/gestionDeReservaAlojamientos" title="Reserva de Alojamientos" />
            </NavDropdown.Item>
        </NavDropdown>
    );

    ////////////////     RENDER MENU DE USUARIO LOGUEADO      ////////////////////
    const renderHeaderForLoggedInUser = () => (
        <>
            <div className="col col-header">
                <div className="header-principal-top-home">
                    <CLink path="/" title={<span>Home <i className="bi bi-house"></i></span>} />
                </div>
            </div>
            <div className="col col-header">
                {rdxUsuario?.credentials?.usuario?.userRole === "superAdmin" && renderSuperAdminLinks()}
                {renderNavDropdown()}
            </div>
            <Grid item xs={15}>
                {renderHeaderLinks()}
                {renderBuscador()}
            </Grid>
        </>
    );

    ////////////////     RENDER MENU DE USUARIO NO LOGUEADO      ////////////////////
    const renderHeaderForLoggedOutUser = () => (
        <>
            <div className="col col-header">
                <div className="header-principal-top-home">
                    <CLink path="/" title={<span>Home <i className="bi bi-house"></i></span>} />
                </div>
            </div>
            <div className="col col-header">
                <div className="header-secundario-top-resistLogin">
                    <CLink path="/login" title={<span>Iniciar Sesión <i className="bi bi-person-plus"></i></span>} />
                    <CLink path="/registrar" title={<span>Registrarse <i className="bi bi-person"></i></span>} />
                </div>
            </div>
            {!window.location.pathname.includes("/login") && !window.location.pathname.includes("/registrar") && (
                <>
                    {renderHeaderLinks()}
                    {renderBuscador()}
                </>
            )}
        </>
    );

    return (
        <div className="header-design">
            <div className="header-wrapperr">
                <div className="row">
                    {rdxUsuario.credentials?.token ? renderHeaderForLoggedInUser() : renderHeaderForLoggedOutUser()}
                </div>
            </div>
        </div>
    );
}