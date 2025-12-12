import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
const Home = () => {
  const [city, setCity] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (city.trim() !== "") {
      navigate(`/city/${city}`);
    }
  };

  return (
    <div className="container">
      <Card>
        <Card.Body>
          <Card.Title className="titleC"> Happy Meteo!</Card.Title>
          <Card.Subtitle className="subC">
            {" "}
            Cerca la tua città per scoprire il consiglio del giorno
          </Card.Subtitle>
          <Form.Control
            typoe="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Iserisci la tua città!"
            className="inputC"
          />
          <Button className="btnC" onClick={handleSearch}>
            {" "}
            Vai!
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Home;
