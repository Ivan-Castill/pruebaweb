import React, { useState, useEffect } from "react";
import "./horaActual-styles.css";


const HoraActual = () => {
  const [hora, setHora] = useState("");
  const [gif, setGif] = useState(""); // Estado para el GIF

  useEffect(() => {
    const actualizarHora = () => {
      const ahora = new Date();
      const horaActual = ahora.getHours(); // Obtener la hora actual
      const horaFormateada = ahora.toLocaleTimeString("es-ES", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });

      setHora(horaFormateada);

      // Seleccionar el GIF según la hora del día
      if (horaActual >= 6 && horaActual < 12) {
        setGif("/gifs/manana.gif"); // Mañana
      } else if (horaActual >= 12 && horaActual < 14) {
        setGif("/gifs/mediodia.gif"); // Mediodía
      } else if (horaActual >= 14 && horaActual < 19) {
        setGif("/gifs/tarde.gif"); // Tarde
      } else {
        setGif("/gifs/noche.gif"); // Noche
      }
    };

    const intervalo = setInterval(actualizarHora, 1000);
    actualizarHora(); // Llamar inmediatamente al montar el componente

    return () => clearInterval(intervalo); // Limpiar intervalo al desmontar
  }, []);

  return (
    <div className="hora-contenedor">
      {gif && <img src={gif} alt="GIF del momento del día" className="hora-gif" />}
      <p className="hora-actual">{hora}</p>
    </div>
  );
};

export default HoraActual;
