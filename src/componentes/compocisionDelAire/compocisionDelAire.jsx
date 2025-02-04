import React, { useEffect, useState } from "react";
import { getAirQuality } from "../compocisionDelAire/api";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import "./compocisionDelAire.css";

const CalidadDelAire = () => {
  const [airQualityData, setAirQualityData] = useState(null);
  const [error, setError] = useState(false);
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);

  // Obtener ubicación del usuario al cargar la página
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

  // Manejar clics en el mapa
  const MapClickHandler = () => {
    useMapEvents({
      click(e) {
        setLat(e.latlng.lat);
        setLon(e.latlng.lng);
      },
    });
    return null;
  };

  // Obtener calidad del aire cuando las coordenadas cambien
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

  // Función para obtener las recomendaciones detalladas
  const obtenerRecomendaciones = (aqi) => {
    switch (aqi) {
      case 1:
        return (
          <>
            <p><strong>¡Aire limpio!</strong> 🌿</p>
            <p>La calidad del aire es excelente. Puedes realizar actividades al aire libre sin problemas.</p>
            <ul>
              <li>Realiza caminatas o paseos en bicicleta.</li>
              <li>Practica deportes al aire libre.</li>
              <li>Disfruta del tiempo libre sin preocupaciones.</li>
            </ul>
          </>
        );
      case 2:
        return (
          <>
            <p><strong>Calidad del aire buena.</strong> 😊</p>
            <p>Aunque el aire es adecuado, es mejor evitar exposiciones prolongadas al sol si tienes condiciones respiratorias preexistentes.</p>
            <ul>
              <li>Haz caminatas cortas.</li>
              <li>Realiza actividades al aire libre, pero con moderación.</li>
              <li>Evita el esfuerzo físico excesivo.</li>
            </ul>
          </>
        );
      case 3:
        return (
          <>
            <p><strong>Calidad del aire moderada.</strong> 😷</p>
            <p>El aire podría afectar a personas sensibles. Considera limitar actividades al aire libre.</p>
            <ul>
              <li>Evita hacer ejercicio intenso fuera.</li>
              <li>Limita el tiempo al aire libre, especialmente para personas con problemas respiratorios o cardíacos.</li>
              <li>Consulta con un médico si tienes síntomas respiratorios.</li>
            </ul>
          </>
        );
      case 4:
        return (
          <>
            <p><strong>Calidad del aire mala.</strong> 🚨</p>
            <p>Es recomendable permanecer en interiores. El aire puede ser perjudicial para la salud.</p>
            <ul>
              <li>Evita hacer cualquier actividad física al aire libre.</li>
              <li>Personas con problemas respiratorios deben reducir aún más su exposición.</li>
              <li>Cierra ventanas y puertas, y usa purificadores de aire si es posible.</li>
            </ul>
          </>
        );
      case 5:
        return (
          <>
            <p><strong>Calidad del aire peligrosa.</strong> ☠️</p>
            <p>El aire es muy perjudicial para todos. Limita al máximo las actividades al aire libre y sigue las recomendaciones de las autoridades de salud.</p>
            <ul>
              <li>Evita cualquier actividad física fuera de casa.</li>
              <li>Personas con afecciones respiratorias o cardiovasculares deben quedarse en casa.</li>
              <li>Usa mascarillas si es necesario salir.</li>
              <li>Sigue las indicaciones de las autoridades locales de salud.</li>
            </ul>
          </>
        );
      default:
        return (
          <>
            <p><strong>Información desconocida.</strong> ❓</p>
            <p>No se pudo obtener la calidad del aire. Por favor, intenta nuevamente más tarde.</p>
          </>
        );
    }
  };

  // Función para obtener el GIF correspondiente
  const obtenerGifAire = (aqi) => {
    switch (aqi) {
      case 1:
        return "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExMDNycThkaG1lcjhuamQ3cjV4d3I4YWt0OHVvZnF5OHphd2lqOXI0YiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/WtUK5I9TbWiRcGrVZh/giphy.gif"; // Aire limpio 🌿
      case 2:
        return "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExZnl5M2Q5ZzYxOHlvMzV0MG82aGZidGp4bmk0dzB0MXF6eDczMm5leCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/yGj5bmYMl2r02YhiRt/giphy.gif"; // Aire aceptable 😊
      case 3:
        return "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExdzR5dmVkOWhhYmpheTc3NnhtYmRyeDhxYzdtY3NjbjdsdGRrYW1sNyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/fyitaOqckoJX9k9tf2/giphy.gif"; // Calidad moderada 😷
      case 4:
        return "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExaXJieWs1OWFrcmNqMWg4OTF4dnppa2NtY2k2dHZhc3poN2FpaTBmOSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/L4g9rIbHTxauq5iDYB/giphy.gif"; // Aire malo 🚨
      case 5:
        return "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExNTZtaHhwMTJreDZ1cmMzbDNyamVkbXFpdTE3ajBsZzZkbHpyMnlidSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/MEKv349tM4yVZvhMqE/giphy.gif"; // Nivel peligroso ☠️
      default:
        return "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExa2Vrd3A5aTcyNzIxeTJtMzJxYjRkZ3kzd3B3MDU2Z3oxZWdvcjVldiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/YjeBio7xUw8gF1zlVK/giphy.gif"; // Desconocido ❓
    }
  };

  return (
    <div className="app-container">
      <div className="main-content">
        <div className="air-info-container">
          <div className="air-quality-title">
            <h2>Informe de Calidad del Aire</h2>
          </div>

          <div className="air-quality-data">
            {error && <p className="error-message">No se pudo obtener la calidad del aire.</p>}
            {airQualityData && (
              <>
                <div>
                <p>Índice de Calidad del Aire (AQI): {airQualityData.list[0].main.aqi}</p>
                <p>CO: {airQualityData.list[0].components.co} µg/m³</p>
                <p>NO: {airQualityData.list[0].components.no} µg/m³</p>
                <p>PM2.5: {airQualityData.list[0].components.pm2_5} µg/m³</p>
                <p>PM10: {airQualityData.list[0].components.pm10} µg/m³</p>
                </div>
                {/* Recomendaciones detalladas */}
                <div className="air-quality-recommendations">
                  {obtenerRecomendaciones(airQualityData.list[0].main.aqi)}
                </div>
                {/* Mostrar GIF según AQI */}
                <div className="air-quality-gif">
                  <img src={obtenerGifAire(airQualityData.list[0].main.aqi)} alt="Estado del aire" />
                </div>
              </>
            )}
          </div>
        </div>

        {lat === null || lon === null ? (
          <p>Cargando ubicación...</p>
        ) : (
          <div className="map-container">
            <MapContainer center={[lat, lon]} zoom={13} style={{ width: "100%", height: "250px" }}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <MapClickHandler />
              <Marker position={[lat, lon]}>
                <Popup>Ubicación actual</Popup>
              </Marker>
            </MapContainer>
          </div>
        )}
      </div>
    </div>
  );
};

export default CalidadDelAire;

