import React from "react";
import "../css/Footer.css";

const Footer = () => {
  return (
    <footer className="weather-footer">
      <div className="footer-top">
        <span role="img" aria-label="sun">
          🌞
        </span>
        <span role="img" aria-label="cloud">
          ☁️
        </span>
        <span role="img" aria-label="rain">
          🌧️
        </span>
        <span role="img" aria-label="snow">
          ❄️
        </span>
        <span role="img" aria-label="rainbow">
          🌈
        </span>
      </div>
      <div className="footer-middle">
        <p>
          Dati meteo aggiornati da fonti ufficiali e affidabili. Ultimo
          aggiornamento:{" "}
          <strong>{new Date().toLocaleDateString("it-IT")}</strong>
        </p>
        <p>
          © {new Date().getFullYear()} MeteoMagico · Pescara, Italia ·{" "}
          <a href="/privacy">Privacy</a> · <a href="/contatti">Contatti</a>
        </p>
      </div>
      <div className="footer-bottom">
        <p>
          Sviluppato con ❤️ da Alessandra · UI gioiosa, accessibile e regionale
        </p>
      </div>
    </footer>
  );
};

export default Footer;
