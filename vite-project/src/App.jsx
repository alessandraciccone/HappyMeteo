import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./component/Home.jsx";
import CityDetails from "./component/CityDetails.jsx";
import Footer from "./component/Footer.jsx";
function App() {
  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/city/:cityName" element={<CityDetails />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
