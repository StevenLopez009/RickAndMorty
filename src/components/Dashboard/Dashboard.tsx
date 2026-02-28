import { useState } from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";
import useFetch from "../../hooks/useFetch";

const Dashboard = () => {
  const [inputValue, setInputValue] = useState("");
  const [selectSpecie, setSelectSpecie] = useState("");
  const [numberPage, setNumberPage] = useState(1);

  const paramId = `?page=${numberPage}`;
  const { loading, personaje, error } = useFetch(paramId);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSpecieChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectSpecie(event.target.value);
  };

  const personajesFiltrados = personaje.filter((p) => {
    const matchName = p.name.toLowerCase().includes(inputValue.toLowerCase());
    const matchSpecie = p.species
      .toLowerCase()
      .includes(selectSpecie.toLowerCase());
    return matchName && matchSpecie;
  });

  const limpiarFiltros = () => {
    setSelectSpecie("");
  };

  return (
    <div>
      <h1>Title</h1>
      <input type="text" value={inputValue} onChange={handleInputChange} />
      <select name="species" onChange={handleSpecieChange} value={selectSpecie}>
        <option value="">Todas</option>
        <option value="human">Humano</option>
        <option value="alien">Alien</option>
        <option value="Humanoid">Humanoid</option>
        <option value="Robot">Robot</option>
        <option value="Mythological Creature">Mythological Creature</option>
        <option value="Cronenberg">Cronenberg</option>
      </select>
      <button onClick={limpiarFiltros}>Limpiar filtros</button>
      {loading && <p>Cargando...</p>}
      {error && <p>Error al cargar datos</p>}
      <ul>
        {personajesFiltrados.map(({ id, name, image, species, status }) => (
          <li key={id}>
            <img src={image} alt="" />
            <p>{name}</p>
            <p>{species}</p>
            <p
              className={
                status === "Alive"
                  ? "green"
                  : status === "Dead"
                    ? "red"
                    : status === "unknown"
                      ? "gray"
                      : ""
              }
            >
              {status}
            </p>
            <Link to={`/${id}`}>Detalles</Link>
          </li>
        ))}
      </ul>
      <div>
        {numberPage > 1 ? (
          <button onClick={() => setNumberPage((prev) => prev - 1)}>
            Atras
          </button>
        ) : (
          <></>
        )}
        <button onClick={() => setNumberPage((prev) => prev + 1)}>
          Adelante
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
