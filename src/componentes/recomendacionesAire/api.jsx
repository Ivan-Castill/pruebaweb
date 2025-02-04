import axios from 'axios';

const API_KEY = 'f2d927bca90781655ccbc59c516ac186';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/air_pollution'; // URL base de la API

export const getAirQuality = async (lat, lon) => {
  try {
    const response = await axios.get(`${BASE_URL}`, {
      params: {
        lat: lat, // Latitud
        lon: lon, // Longitud
        appid: API_KEY, // Clave de API
      },
    });
    return response.data; // Devuelve los datos obtenidos
  } catch (error) {
    console.error('Error fetching air quality data:', error);
    throw error;
  }
};
