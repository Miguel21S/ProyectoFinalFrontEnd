
import { useEffect, useState } from "react";
import { ListaDeVuelos } from "../../services/rootss";
import "./Home.css"
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { userData } from "../../app/slices/userSlice";
import Carousel from 'react-bootstrap/Carousel';

export const Home = () => {
    // const navigate = useNavigate();

    // INSTACIA DE CONEXIÓN A MODO LECTURA
    const rdxUsuario = useSelector(userData);
    const token = rdxUsuario.credentials.token;

    const [vuelo, setVuelo] = useState([]);

    // useEffect(() => {
    //     if (!rdxUsuario.credentials.token) {
    //         navigate("/")
    //     }
    // }, [rdxUsuario]);

    // MÉTODO LISTAR VUELOS
    useEffect(() => {
        const listaDeVuelos = async () => {
            try {
                const listaVuelos = await ListaDeVuelos();
                setVuelo(listaVuelos.data);
            } catch (error) {
                console.log("Error:", error);
            }
        }
        listaDeVuelos();
    }, [])

    // Divide el array en subarrays de tamaño específico
    const chunkArray = (array, size) => {
        const chunkedArr = [];
        for (let i = 0; i < array.length; i += size) {
            chunkedArr.push(array.slice(i, i + size));
        }
        return chunkedArr;
    };

    return (
        <>
            <div className="home-design">
                <div className="porColuna1">
                    <div className="row">
                        <div className="content1">
                            <div id="col-cards-ciudads" className="col">
                                <Carousel nextLabel="" prevLabel="" nextIcon={<span className="carousel-control-next-icon" aria-hidden="true" />} prevIcon={<span className="carousel-control-prev-icon" aria-hidden="true" />} className="custom-carousel">
                                    {chunkArray(vuelo, 3).map((chunk, index) => (
                                        <Carousel.Item key={index}>
                                            <div className="d-flex justify-content-center">
                                                {chunk.map((vuelo) => (
                                                    <a key={vuelo._id} href={`/vuelos/${vuelo.origen}-${vuelo.destino}`} className="mx-3">
                                                        <div className="text-center">
                                                            <h5 className="mt-2">{`${vuelo.origen} - ${vuelo.destino}`}</h5>
                                                        </div>
                                                        <div className="vmb-4">
                                                            <img src="./src/img/av1.jpg" className="imge" alt={vuelo.name} />
                                                        </div>
                                                    </a>
                                                ))}
                                            </div>
                                        </Carousel.Item>
                                    ))}
                                </Carousel>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}







{/* <div className="porColuna2">
<div className="row">
    <div className="content1">
        <div id="col-cards-ciudads" className="col">
            <Carousel nextLabel="" prevLabel="" nextIcon={<span className="carousel-control-next-icon" aria-hidden="true" />} prevIcon={<span className="carousel-control-prev-icon" aria-hidden="true" />} className="custom-carousel">
                {chunkArray(vuelo, 3).map((chunk, index) => (
                    <Carousel.Item key={index}>
                        <div className="d-flex justify-content-center">
                            {
                                <a key={vuelo._id} href="/hacerreserva" className="mx-3">
                                    <div className="text-center">
                                        <h5 className="mt-2"></h5>
                                    </div>
                                    <div className="vmb-4">
                                        <img src="./src/img/av1.jpg" className="imge" alt="" />
                                    </div>
                                </a>
                            }
                        </div>
                    </Carousel.Item>
                ))}
            </Carousel>
        </div>
    </div>
</div>
</div> */}

// import { useEffect, useState } from "react";
// import { ListaDeVuelos } from "../../services/rootss";
// import "./Home.css"
// import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { userData } from "../../app/slices/userSlice";

// import AliceCarousel from 'react-alice-carousel';
// import 'react-alice-carousel/lib/alice-carousel.css';
// export const Home = () => {
//     const navigate = useNavigate();

//     /////////////  INSTACIA DE CONEXIÓN A MODO LECTURA   ////////////////
//     const rdxUsuario = useSelector(userData);
//     const token = rdxUsuario.credentials.token;

//     const [vuelo, setVuelo] = useState([]);

//     useEffect(() => {
//         if (!rdxUsuario.credentials.token) {
//             navigate("/")
//         }
//     }, [rdxUsuario]);

//     /////////////  MÉTODO LISTAR VUELOS   ////////////////
//     useEffect(() => {
//         const listaDeVuelos = async () => {
//             try {
//                 const listaVuelos = await ListaDeVuelos(token);
//                 setVuelo(listaVuelos.data);
//             } catch (error) {
//                 console.log("Error:", error);
//             }
//         }
//         listaDeVuelos();
//     }, [token])

//     const responsive = {
//         0: { items: 1 },
//         568: { items: 2 },
//         1024: { items: 3 },
//     };


//     return (
//         <>
//             <div className="home-design">
//                 <div className="porColuna1">
//                     <div className="row">
//                         <div className="content1">
//                             <div id="col-cards-ciudads" className="col">
//                                 {vuelo?.length > 0 ? (
//                                     <AliceCarousel
//                                         mouseTracking
//                                         items={vuelo.map((vuelo) => (
//                                             <a href="/hacerreserva" key={vuelo._id} className="card mb-4 h-100">
//                                                 <div className="card-body">
//                                                     <h5 className="card-title">{vuelo.name}</h5>
//                                                     <img src="./src/img/av1.jpg" className="imge card-img-top" alt={vuelo.name} />
//                                                 </div>
//                                             </a>
//                                         ))}
//                                         responsive={responsive}
//                                         controlsStrategy="alternate"
//                                     />
//                                 ) : (
//                                     <div>No hay vuelos disponibles</div>
//                                 )}
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 <div className="porColuna2">
//                     <div className="row">
//                         <div className="content1">
//                             <div id="col-cards-ciudads" className="col">
//                                 {vuelo?.length > 0 ? (
//                                     vuelo.map((post) => (
//                                         <a href="#" className="card-link" key={post._id}>
//                                             <div className="card mb-4 h-100">
//                                                 <div className="card-body">
//                                                     <h5 className="card-title">{post.name}</h5>
//                                                     <img src="..." className="card-img-top" alt="..." />
//                                                 </div>
//                                             </div>
//                                         </a>
//                                     ))
//                                 ) : (
//                                     <div>No hay posts disponibles</div>
//                                 )}
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// }