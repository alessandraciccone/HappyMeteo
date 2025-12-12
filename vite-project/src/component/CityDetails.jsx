import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const CityDetails = () => {
  const { cityName } = useParams();
  const [weather, setWeather] = useState(null);
  const [message, setMessage] = useState("");
  const [cityInput, setCityInput] = useState(cityName);

  const navigate = useNavigate();

  const handleSearch = () => {
    if (cityInput.trim() !== "") {
      navigate(`/city/${cityInput}`);
    }
  };

  useEffect(() => {
    fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${cityName}`)
      .then((res) => res.json())
      .then((geo) => {
        if (geo.results && geo.results.length > 0) {
          const { latitude, longitude } = geo.results[0];
          return fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
          );
        } else {
          throw new Error("Città non trovata");
        }
      })
      .then((res) => res.json())
      .then((data) => {
        if (!data.current_weather) throw new Error("Meteo non disponibile");

        const temp = data.current_weather.temperature;
        const code = data.current_weather.weathercode;
        setWeather({ temp, code });

        if (code >= 60 && code <= 80) {
          setMessage("☔ Porta un ombrello, potrebbe piovere!");
        } else if (temp >= 29) {
          setMessage("🧴 Fa caldo, bevi molta acqua!");
        } else if (temp < 10) {
          setMessage("🧣 Fa davvero freddo, copriti bene!");
        } else {
          setMessage("🔅 Giornata piacevole, goditela!");
        }
      })
      .catch((err) => {
        console.error(err);
        setWeather(null);
        setMessage("⚠️ Città non trovata o meteo non disponibile");
      });
  }, [cityName]);

  return (
    <div className="container">
      <Card className="shadow">
        <Card.Body>
          <Form className="formCd">
            <Form.Control
              type="text"
              value={cityInput}
              onChange={(e) => setCityInput(e.target.value)}
              placeholder="Inserisci la tua città"
              className="formC2"
            />

            <Button className="btnCd" onClick={handleSearch}>
              Vai!
            </Button>
          </Form>
          <Card.Title className="titleC"> Meteo per {cityName}</Card.Title>
          {weather ? (
            <>
              <Card.Text className="txc">
                Temperatura:{weather.temp}°C
              </Card.Text>
              <Card.Text className="tcc"> {message}</Card.Text>
            </>
          ) : (
            <Card.Text className="cs">
              {" "}
              {message || "Caricamento meteo"}
            </Card.Text>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default CityDetails;
