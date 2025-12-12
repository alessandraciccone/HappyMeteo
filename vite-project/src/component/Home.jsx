import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../css/Home.css";
import SunIcon from "./SunIcon";
import RainIcon from "./RainIcon";
import Snow from "./Snow";
import Rainbow from "./Rainbow";
import Sfondo from "../assets/img/sfondo.png";
const Home = () => {
  const [city, setCity] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (city.trim() !== "") {
      navigate(`/city/${city}`);
    }
  };

  return (
    <div>
      <h1> Happy Meteo!</h1>

      <div className="container">
        <Card className="cardHome">
          <Card.Body>
            <div className="emoji-strip">
              <SunIcon />
              <RainIcon />
              <Snow />
              <Rainbow />
            </div>

            <Card.Subtitle className="subC">
              {" "}
              Cerca la tua città per scoprire il consiglio del giorno!
            </Card.Subtitle>
            <Form>
              <Form.Control
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Iserisci la tua città!"
                className="inputC"
              />
            </Form>
            <Button className="btnC mx-auto d-block" onClick={handleSearch}>
              {" "}
              Vai!
            </Button>
          </Card.Body>
        </Card>
      </div>

      <div className="sfondi">
        <img src={Sfondo} alt="sfondo" className="sImg"></img>
      </div>
    </div>
  );
};

export default Home;
