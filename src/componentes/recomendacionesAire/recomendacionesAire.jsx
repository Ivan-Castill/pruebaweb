import React, { useState, useEffect } from "react";
import { getAirQuality } from "../recomendacionesAire/api";

const RecomendacionesAire = () => {
  const [airQualityData, setAirQualityData] = useState(null);
  const [error, setError] = useState(false);
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);

  // Obtener la ubicación del usuario al cargar la página
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLat(position.coords.latitude);
          setLon(position.coords.longitude);
        },
        (err) => {
          console.error("Error obteniendo la ubicación:", err);
          setError(true);
        }
      );
    } else {
      console.error("Geolocalización no soportada en este navegador");
      setError(true);
    }
  }, []);

  // Obtener la calidad del aire cuando haya coordenadas disponibles
  useEffect(() => {
    if (lat !== null && lon !== null) {
      const fetchAirQuality = async () => {
        try {
          const data = await getAirQuality(lat, lon);
          setAirQualityData(data);
          setError(false);
        } catch (err) {
          console.error("Error obteniendo calidad del aire:", err);
          setError(true);
        }
      };
      fetchAirQuality();
    }
  }, [lat, lon]);

  // Generar recomendaciones según la calidad del aire
  const obtenerRecomendaciones = (aqi) => {
    switch (aqi) {
      case 1:
        return (
          <>
            ✅ **Excelente (0-50 AQI):**  La calidad del aire es óptima.  <br/> 
            - 🌿 Disfruta actividades al aire libre sin restricciones. <br/>  
            - 🏃‍♂️ Perfecto para ejercicio al aire libre.<br/>   
            - 👶 Seguro para niños, ancianos y personas con problemas respiratorios.<br/>   
          </>
        );
      case 2:
        return (
          <>
            😊 **Buena (51-100 AQI):** La calidad del aire es aceptable.<br/>   
            - 🚴 Puedes salir sin preocupaciones, pero si eres sensible al aire, ten precaución. <br/>  
            - 🏃‍♂️ El ejercicio al aire libre sigue siendo seguro.  <br/> 
            - 🤧 Si tienes alergias, podrías notar molestias leves. <br/>  
          </>
        );
      case 3:
        return (
          <>
            😷 **Moderada (101-150 AQI):** La contaminación empieza a ser un problema.<br/>   
            - 🏃‍♂️ Evita hacer ejercicio intenso al aire libre.  <br/> 
            - 😰 Personas con asma o enfermedades respiratorias deben usar mascarilla.<br/>   
            - 🚪 Cierra las ventanas para evitar que entre contaminación.<br/>   
          </>
        );
      case 4:
        return (
          <>
            ⚠️ **Mala (151-200 AQI):** <br/> Puede afectar a la salud de todos. <br/>  
            - 🏠 Quédate en interiores lo más posible. <br/>  
            - 😷 Usa mascarilla si necesitas salir. <br/>  
            - 🏃‍♂️ Evita actividades físicas al aire libre.<br/>   
          </>
        );
      case 5:
        return (
          <>
            🚨 **Muy Peligrosa (201+ AQI):** Nivel de emergencia. <br/>  
            - 🛑 Evita salir a menos que sea necesario.<br/>   
            - 💨 Usa purificadores de aire en casa.  <br/> 
            - 🚪 Mantén ventanas y puertas cerradas. <br/>  
          </>
        );
      default:
        return "❓ No se pudo determinar la calidad del aire.";
    }
  };

  if (error) {
    return <p style={{ color: "red", textAlign: "center" }}>Error obteniendo datos de calidad del aire.</p>;
  }

  if (!airQualityData) {
    return <p style={{ textAlign: "center" }}>Cargando recomendaciones...</p>;
  }

  const aqi = airQualityData.list[0].main.aqi;
  const recomendacion = obtenerRecomendaciones(aqi);

  return (
    <div style={{ color:'black',textAlign: "center", padding: "20px", backgroundColor: "#d1ecf1", borderRadius: "10px", width: "1000px", margin: "auto", marginTop: "20px" }}>
      <h3>📌 Recomendaciones de Calidad del Aire</h3>
      <p>Índice de Calidad del Aire (AQI): {aqi}</p>
      <p>🌬️ {recomendacion}</p>
    </div>
  );
};

export default RecomendacionesAire;
