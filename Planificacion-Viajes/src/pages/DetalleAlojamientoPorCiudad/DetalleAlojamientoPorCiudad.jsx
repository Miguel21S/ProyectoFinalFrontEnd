
import { Link, useParams } from "react-router-dom";
import "./DetalleAlojamientoPorCiudad.css"
import { useEffect, useState } from "react";
import { ListaDeAlojamientos } from "../../services/rootss";
import { Button } from "react-bootstrap";

export const DetalleAlojamientoPorCiudad = () => {
    const { ciudad } = useParams();

    const [reservaAlojamiento, setReservaAlojamiento] = useState([]);

    /////////////  LISTAR ALOJAMIENTOS   ////////////////
    useEffect(() => {
        const listaAlojamientos = async () => {
            try {
                const lAlojamientos = await ListaDeAlojamientos();
                if (lAlojamientos.success) {
                    const alojamientosFiltrados = lAlojamientos.data.filter(alojamiento => alojamiento.ciudad === ciudad);
                    setReservaAlojamiento(alojamientosFiltrados);
                } else {
                    console.log("Error:", lAlojamientos.message);
                }
            } catch (error) {
                console.log("Error:", error);
            }
        }
        listaAlojamientos();
    }, [ciudad]);

    return (
        <>
            <div className="detalle-alojamiento">
                <div className="content-detalle">
                    <h2>Alojamientos disponibles desde {ciudad}</h2>
                    {
                        reservaAlojamiento.map((alojamiento) => (
                            <div key={alojamiento._id} className="col">
                                <div className="card">
                                    <div className="container text-center">
                                        <img src="..." className="card-img-top" alt="..." />
                                        <hr />
                                        <div className="card-body">
                                            <div className="row">
                                                <h5 className="card-title">{alojamiento.ciudad}</h5>
                                                <hr />
                                                <div className="col-sm-9">
                                                    <div className="row  origeDestino">
                                                        <div className="col-8 col-sm-6 origen">
                                                            <div>
                                                                <p>Nombre</p>
                                                                <p>{alojamiento.name}</p>
                                                            </div>
                                                            <div>
                                                                <p>Tipo</p>
                                                                <p>{alojamiento.tipo}</p>
                                                            </div>
                                                            <div>
                                                                <p>Precio</p>
                                                                <p>{alojamiento.precio}</p>
                                                            
                                                            </div>
                                                        </div>
                                                        <div className="col-4 col-sm-6 destino">
                                                    
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-sm-3 precio">
                                                    <Button variant="outlined" >
                                                        <Link to={`/alojamientos/${alojamiento.ciudad}`} style={{ textDecoration: 'none' }}>Detalle</Link>
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    )
}
