import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Sumbit from "./pages/Sumbit";
import Check from "./pages/Check";
import SumbitSent from "./pages/SumbitSent";
import Instructors from "./pages/instractors/Instructors";
import RegionalFameWall from "./pages/RegionalFameWall";
import "./App.css";
import { useEffect } from "react";

import ReactGA from "react-ga4";
ReactGA.initialize('G-T0656S73M1');


function App() {
    useEffect(() => {
    ReactGA.send("pageview", window.location.pathname + window.location.search);
  }, []);

  return (
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/submit" element={<Sumbit />} />
        <Route path="/check" element={<Check />} />
        <Route path="/sent" element={<SumbitSent />} />
        <Route path="/famewall" element={<RegionalFameWall />} />
        <Route path="/inst" element={<Instructors />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
