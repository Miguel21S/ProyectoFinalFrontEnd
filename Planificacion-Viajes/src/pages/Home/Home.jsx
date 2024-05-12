
import { useEffect, useState } from "react";
import { ListaDeAlojamientos, ListaDeVuelos } from "../../services/rootss";
import "./Home.css";
import Carousel from 'react-bootstrap/Carousel';
import { Link, useNavigate } from "react-router-dom";
import { userData } from "../../app/slices/userSlice";
import { useSelector } from "react-redux";

export const Home = () => {
    const navigate = useNavigate();
    const [vuelo, setVuelo] = useState([]);
    const [alojamiento, setAlojamiento] = useState([]);

    /////////////  INSTACIA DE CONEXIÓN A MODO LECTURA   ////////////////
    const rdxUsuario = useSelector(userData);
    const token = rdxUsuario.credentials.token;

    useEffect(() => {
        if (!rdxUsuario.credentials.token) {
            navigate("/")
        }
    }, [rdxUsuario]);

    /////////////  LISTAR VUELOS   ////////////////
    useEffect(() => {
        const listaDeVuelos = async () => {
            try {
                const listaVuelos = await ListaDeVuelos(token);
                setVuelo(listaVuelos.data);

            } catch (error) {
                console.log("Error:", error);
            }
        }
        listaDeVuelos();
    }, []);

    /////////////  LISTAR ALOJAMIENTOS   ////////////////
    useEffect(() => {
        const listaAlojamientos = async () => {
            try {
                const lAlojamientos = await ListaDeAlojamientos(token);
                setAlojamiento(lAlojamientos.data);

            } catch (error) {
                console.log("Error:", error);
            }
        }
        listaAlojamientos();
    }, []);


    const chunkArray = (array, size) => {
        const chunkedArr = [];
        for (let i = 0; i < array.length; i += size) {
            chunkedArr.push(array.slice(i, i + size));
        }
        return chunkedArr;
    };

    return (
        <div className="home-design">
            <div className="home-content">

                <div className="porColuna1">
                    <h5>Buscar vuelos por ciudad</h5>
                    <div className="row">
                        <div className="content1">
                            <div id="col-cards-ciudads" className="col">
                                <Carousel nextLabel="" prevLabel="" nextIcon={<span className="carousel-control-next-icon" aria-hidden="true" />} prevIcon={<span className="carousel-control-prev-icon" aria-hidden="true" />} className="custom-carousel">
                                    {chunkArray(vuelo, 3).map((chunk, index) => (
                                        <Carousel.Item key={index}>
                                            <div className="d-flex justify-content-center">
                                                {chunk.map((vueloItem) => (
                                                    <Link key={vueloItem._id} to={`/vuelos/${vueloItem.origen}/${vueloItem.destino}`} className="mx-3">
                                                        <div className="text-center">
                                                            <h5 className="mt-2">{`${vueloItem.origen} - ${vueloItem.destino}`}</h5>
                                                        </div>
                                                        <div className="vmb-4">
                                                            <img src="./src/img/av1.jpg" className="imge" alt={vueloItem.name} />
                                                        </div>
                                                    </Link>
                                                ))}
                                            </div>
                                        </Carousel.Item>
                                    ))}
                                </Carousel>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="porColuna2">
                    <h5>Buscar alojamientos por ciudad</h5>
                    <div className="row">
                        <div className="content1">
                            <div id="col-cards-ciudads" className="col">
                                <Carousel nextLabel="" prevLabel="" nextIcon={<span className="carousel-control-next-icon" aria-hidden="true" />} prevIcon={<span className="carousel-control-prev-icon" aria-hidden="true" />} className="custom-carousel">
                                    {chunkArray(alojamiento, 3).map((chunk, index) => (
                                        <Carousel.Item key={index}>
                                            <div className="d-flex justify-content-center">
                                                {chunk.map((alojamientoItem) => (
                                                    <Link key={alojamientoItem._id} to={`/alojamientos/${alojamientoItem.ciudad}`} className="mx-3">
                                                        <div key={alojamientoItem._id} style={{ margin: '0 10px' }}>
                                                            <div className="text-center">
                                                                <h5 className="mt-2">{alojamientoItem.ciudad}</h5>
                                                            </div>
                                                            <img src="./src/img/casa.jpg" className="imge" alt={alojamientoItem.name} />
                                                        </div>
                                                    </Link>
                                                ))}
                                            </div>
                                        </Carousel.Item>
                                    ))}
                                </Carousel>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="porColuna3">
                    <div className="row">
                        <div className="content3">
                            <div id="col-cards-ciudads" className="col">

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}