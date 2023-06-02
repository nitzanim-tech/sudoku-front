import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Sumbit from "./pages/Sumbit";
import Check from "./pages/Check";

import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/submit" element={<Sumbit />} />
        <Route path="/check" element={<Check />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
