import { useEffect, useState } from "react";

interface Character {
  id: number;
  name: string;
  image: string;
  species: string;
  status: string;
}

const useFetch = (param: string) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [personaje, setPersonaje] = useState<Character[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [detailPersonaje, setDetailPersonaje] = useState<Character[]>([]);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    async function fetchData() {
      setLoading(true);
      try {
        const response = await fetch(
          `https://rickandmortyapi.com/api/character/${param}`,
          { signal },
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setPersonaje(data.results);
        setDetailPersonaje(data);
        console.log(data);
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
  }, [param]);

  return {
    loading,
    personaje,
    error,
    detailPersonaje,
  };
};

export default useFetch;
