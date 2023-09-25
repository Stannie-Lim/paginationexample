import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import { Pagination, CircularProgress } from "@mui/material";

const NUM_PER_PAGE = 10;

function App() {
  const [page, setPage] = useState(1);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);

      const offset = (page - 1) * NUM_PER_PAGE;

      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=${NUM_PER_PAGE}&offset=${offset}`
      );

      const data = await response.json();

      setData(data);
      setLoading(false);
    };

    getData();
  }, [page]);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <div>
      <ul>
        {data.results.map((pokemon, index) => (
          <li key={pokemon.name}>
            {(page - 1) * NUM_PER_PAGE + index + 1}. {pokemon.name}
          </li>
        ))}
      </ul>
      <Pagination
        count={Math.floor(data.count / NUM_PER_PAGE)}
        page={page}
        onChange={(_, value) => setPage(value)}
      />
    </div>
  );
}

export default App;
