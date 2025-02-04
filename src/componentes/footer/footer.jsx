import React from "react";
import "./footer-styles.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>Sobre Nosotros</h3>
          <p>
            Ofrecemos soluciones web innovadoras y personalizadas para mejorar la experiencia del usuario y 
            facilitar el acceso a información clave. Nuestra plataforma proporciona datos actualizados sobre 
            el sector de vivienda, calidad del aire, calidad del agua y otros indicadores ambientales, ayudando 
            a los usuarios a tomar decisiones informadas para su bienestar.
          </p>
        </div>
        <div className="footer-section">
          <h3>Enlaces Útiles</h3>
          <ul>
            <li><a href="#header">Inicio</a></li>
            <li><a href="#clima">Datos del Aire</a></li>
            <li><a href="#recomendaciones">Recomendaciones para la salud</a></li>
            <li><a href="#compocision">Composición del Aire</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Contacto</h3>
          <p>Email: soporte@ambientedata.com</p>
          <p>Tel: +593 987 654 321</p>
          <p>Ubicación: Quito, Ecuador</p>
          <div className="img_sociales">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <img src="https://images.freeimages.com/image/large-previews/f35/x-twitter-logo-on-black-circle-5694247.png?h=350" alt="X (Twitter)" />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/2021_Facebook_icon.svg/220px-2021_Facebook_icon.svg.png" alt="Facebook" />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/YouTube_play_button_icon_%282013%E2%80%932017%29.svg/2560px-YouTube_play_button_icon_%282013%E2%80%932017%29.svg.png" alt="YouTube" />
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2025 LifeBreathe | Todos los derechos reservados</p>
      </div>
    </footer>
  );
};

export default Footer;

