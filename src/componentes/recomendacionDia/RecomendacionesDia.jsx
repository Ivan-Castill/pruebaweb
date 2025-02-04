// src/componentes/RecomendacionesDia/RecomendacionesDia.jsx
import React from "react";
import "./RecomendacionesDia.css"; // Asegúrate de importar el archivo CSS para los estilos

const RecomendacionesDia = ({ temperatura, humedad, descripcion }) => {
  // Función para generar recomendaciones basadas en la temperatura
  const obtenerRecomendacionTemperatura = () => {
    if (temperatura < 15) {
      return "Hace frío, usa ropa cálida.";
    } else if (temperatura >= 15 && temperatura <= 25) {
      return "Temperatura moderada, ropa ligera con algo de abrigo.";
    } else {
      return "Hace calor, usa ropa fresca y no olvides el protector solar.";
    }
  };

  // Función para generar recomendaciones basadas en la humedad
  const obtenerRecomendacionHumedad = () => {
    if (humedad < 40) {
      return "La humedad está baja, mantente hidratado.";
    } else if (humedad >= 40 && humedad <= 70) {
      return "Humedad normal, el día es bastante confortable.";
    } else {
      return "La humedad está alta, intenta evitar actividades intensas al aire libre.";
    }
  };

  return (
    <div className="recomendaciones-dia">
      <h3>Recomendaciones para el día:</h3>
      <p>Clima: {descripcion}</p>
      <p>{obtenerRecomendacionTemperatura()}</p>
      <p>{obtenerRecomendacionHumedad()}</p>
    </div>
  );
};

export default RecomendacionesDia;