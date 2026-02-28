import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const DetallePersonaje = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState<boolean>(false);
  const [personaje, setPersonaje] = useState<Character[]>([]);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    async function fetchData() {
      setLoading(true);
      try {
        const response = await fetch(
          `https://rickandmortyapi.com/api/character/${id}`,
          { signal },
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setPersonaje(data);
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
  }, []);

  return (
    <>
      <h1>{personaje.name}</h1>
      <img src={personaje.image} alt="" />
    </>
  );
};

export default DetallePersonaje;
