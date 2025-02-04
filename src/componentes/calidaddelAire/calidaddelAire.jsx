import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';

const LocationMap = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [airQuality, setAirQuality] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
          fetchAirQuality(latitude, longitude);
        },
        (err) => {
          setError(err.message);
        }
      );
    } else {
      setError('La geolocalización no está soportada en este navegador.');
    }
  }, []);

  const fetchAirQuality = async (latitude, longitude) => {
    const apiKey = '7c9e9a4f95160e867246c130b07286fb'; // Reemplaza con tu API Key
    const url = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      setAirQuality(data.list[0].main.aqi);
    } catch (error) {
      setError('No se pudo obtener la calidad del aire.');
    }
  };

  const getAirQualityInfo = (aqi) => {
    switch (aqi) {
      case 1:
        return { text: '🌿 La calidad del aire es excelente. Puedes disfrutar de actividades al aire libre.', gif: 'excellent.gif' };
      case 2:
        return { text: '😊 La calidad del aire es buena. Es seguro realizar actividades al aire libre.', gif: 'good.gif' };
      case 3:
        return { text: '😷 La calidad del aire es moderada. Las personas sensibles pueden comenzar a notar efectos.', gif: 'moderate.gif' };
      case 4:
        return { text: '🤢 La calidad del aire es deficiente. Las personas con condiciones respiratorias pueden verse afectadas.', gif: 'poor.gif' };
      case 5:
        return { text: '🚨 La calidad del aire es muy mala. Se recomienda evitar actividades al aire libre.', gif: 'very-poor.gif' };
      default:
        return { text: '❓ No se pudo determinar la calidad del aire.', gif: 'unknown.gif' };
    }
  };

  return (
    <div style={{ alignItems:'center',textAlign: 'center', padding: '20px', backgroundColor: '#e2cbaf', borderRadius: '10px', width: '300px',height: '475px', margin: 'auto' }}>
      {error && <p>Error: {error}</p>}
      {location ? (
        airQuality ? (
          <div>
            <img 
              src={`/gifs/${getAirQualityInfo(airQuality).gif}`} 
              alt="Calidad del aire"
              style={{ width: '200px', height: '200px', borderRadius: '10px', marginTop:'80px' }}
            />
            <p style={{ fontSize: '18px', fontWeight: 'bold' }}>{getAirQualityInfo(airQuality).text}</p>
          </div>
        ) : (
          <p>Cargando calidad del aire...</p>
        )
      ) : (
        <p>Cargando ubicación...</p>
      )}
    </div>
  );
};

export default LocationMap;
