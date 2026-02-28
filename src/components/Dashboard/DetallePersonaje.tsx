import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import "./DetallePersonaje.css";

const DetallePersonaje = () => {
  const { id } = useParams();
  const paramId = id.toString();
  const { loading, detailPersonaje, error } = useFetch(paramId);
  return (
    <div className="detalle-container">
      {loading && <p>Cargando...</p>}
      {error && <p>Error al cargar datos</p>}

      {!loading && !error && detailPersonaje && (
        <div className="detalle-card">
          <div className="detalle-image">
            <img src={detailPersonaje.image} alt={detailPersonaje.name} />
          </div>

          <div className="detalle-info">
            <h1>{detailPersonaje.name}</h1>
            <p>
              <strong>Especie:</strong> {detailPersonaje.species}
            </p>
            <p>
              <strong>Estado:</strong> {detailPersonaje.status}
            </p>
            <p>
              <strong>Género:</strong> {detailPersonaje.gender}
            </p>
            <p>
              <strong>Origen:</strong> {detailPersonaje.origin?.name}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetallePersonaje;
