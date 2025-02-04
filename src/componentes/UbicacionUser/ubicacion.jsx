import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './ubicacion.css'

const LocationMap = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
        },
        (err) => {
          setError(err.message);
        }
      );
    } else {
      setError('La geolocalización no está soportada en este navegador.');
    }
  }, []);

  return (
    <div>
      <section className='fondo'>
        <p>Ubicacion de Usuario</p>
    <div className="Ubicacion">
      
      {error && <p>Error: {error}</p>}
      {location ? (
        <MapContainer
          center={[location.latitude, location.longitude]}
          zoom={13}
          style={{ height: '400px', width: '300px' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker
            position={[location.latitude, location.longitude]}
            icon={
              new Icon({
                iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
              })
            }
          >
            <Popup>
              <span>Estás aquí!</span>
            </Popup>
          </Marker>
        </MapContainer>
      ) : (
        <p>Cargando ubicación...</p>
      )}
    </div>
    </section>
    </div>
  );
};

export default LocationMap;
