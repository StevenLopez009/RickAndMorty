import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import "./DetallePersonaje.css";

const DetallePersonaje = () => {
  const { id } = useParams();

  // validar id
  if (!id) {
    return <p>ID no encontrado</p>;
  }

  const paramId = id.toString();

  const { loading, detailPersonaje, error } = useFetch(paramId);

  // obtener primer personaje si viene como array
  const personaje = Array.isArray(detailPersonaje)
    ? detailPersonaje[0]
    : detailPersonaje;

  return (
    <div className="detalle-container">
      {loading && <p>Cargando...</p>}
      {error && <p>Error al cargar datos</p>}

      {!loading && !error && personaje && (
        <div className="detalle-card">
          <div className="detalle-image">
            <img src={personaje.image} alt={personaje.name} />
          </div>

          <div className="detalle-info">
            <h1>{personaje.name}</h1>

            <p>
              <strong>Especie:</strong> {personaje.species}
            </p>

            <p>
              <strong>Estado:</strong> {personaje.status}
            </p>

            <p>
              <strong>Género:</strong> {personaje.gender}
            </p>

            <p>
              <strong>Origen:</strong> {personaje.origin?.name}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetallePersonaje;
