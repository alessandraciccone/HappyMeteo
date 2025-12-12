import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./component/Home.jsx";
import CityDetails from "./component/CityDetails.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/city/:cityName" element={<CityDetails />} />
    </Routes>
  );
}

export default App;
