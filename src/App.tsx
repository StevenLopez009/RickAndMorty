import { Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./components/Dashboard/Dashboard";
import DetallePersonaje from "./components/Dashboard/DetallePersonaje";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/:id" element={<DetallePersonaje />} />
      </Routes>
    </>
  );
}

export default App;
