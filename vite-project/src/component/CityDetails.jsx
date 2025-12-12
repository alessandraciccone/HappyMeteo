import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../css/CityDetails.css";
import SunIcon from "./SunIcon";
import RainIcon from "./RainIcon";
import Snow from "./Snow";
import Rainbow from "./Rainbow";
import img from "../assets/img/img.png";
import SunEmoji from "./SunEmoji";
import SweatEmoji from "./SweatEmoji";
import UmbrellaEmoji from "./UmbrellaEmoji";
import ScarfEmoji from "./ScarfEmoji";
import SunCloudEmoji from "./SunCloudEmoji";

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
          setMessage(
            <>
              <UmbrellaEmoji /> Porta un ombrello, potrebbe piovere!
            </>
          );
        } else if (temp >= 25) {
          setMessage(
            <>
              <SweatEmoji /> Giornata perfetta per il mare!
            </>
          );
        } else if (temp >= 15 && temp < 25) {
          setMessage(
            <>
              <SunEmoji /> Giornata piacevole, perfetta per un picnic!
            </>
          );
        } else if (temp >= 7 && temp < 15) {
          setMessage(
            <>
              <SunCloudEmoji /> Clima fresco, ideale per una passeggiata!
            </>
          );
        } else if (temp < 7) {
          setMessage(
            <>
              <ScarfEmoji /> Fa davvero freddo, copriti bene!
            </>
          );
        }
      })
      .catch((err) => {
        console.error(err);
        setWeather(null);
        setMessage("⚠️ Città non trovata o meteo non disponibile");
      });
  }, [cityName]);

  return (
    <div>
      <h1>Happy Meteo!</h1>
      <div className="container">
        <Card className="shadow cardCd">
          <Card.Body className="cbody">
            <div className="emoji-strip">
              <SunIcon />
              <RainIcon />
              <Snow />
              <Rainbow />
            </div>
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
            <Card.Title className="titleC">Meteo per: {cityName}</Card.Title>
            {weather ? (
              <>
                <Card.Text className="txc">
                  Temperatura: {weather.temp}°C
                </Card.Text>
                <Card.Text className="tcc">{message}</Card.Text>
              </>
            ) : (
              <Card.Text className="cs">
                {message || "Caricamento meteo"}
              </Card.Text>
            )}
          </Card.Body>
        </Card>
      </div>
      <div className="imm">
        <img src={img} alt="sfondo" className="sImg" />
      </div>
    </div>
  );
};

export default CityDetails;
