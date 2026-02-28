import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";

interface Character {
  id: number;
  name: string;
  image: string;
  species: string;
  status: string;
}

const Dashboard = () => {
  const [personaje, setPersonaje] = useState<Character[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState("");
  const [selectSpecie, setSelectSpecie] = useState("");
  const [numberPage, setNumberPage] = useState<number>(1);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    async function fetchData() {
      setLoading(true);
      try {
        const response = await fetch(
          `https://rickandmortyapi.com/api/character/?page=${numberPage}`,
          { signal },
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setPersonaje(data.results);
        console.log(personaje);
        setError(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
    return () => abortController.abort();
  }, [numberPage]);

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
        <button onClick={() => setNumberPage(numberPage - 1)}>Atras</button>
        <button onClick={() => setNumberPage(numberPage + 1)}>Adelante</button>
      </div>
    </div>
  );
};

export default Dashboard;
