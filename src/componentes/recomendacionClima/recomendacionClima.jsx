import React, { useState, useEffect } from "react";

const RecomendacionesDia = ({ ciudad = "Quito" }) => {
  const [clima, setClima] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiKey = "7c9e9a4f95160e867246c130b07286fb"; // Reemplaza con tu API Key
    const obtenerClima = async () => {
      try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&units=metric&lang=es&appid=${apiKey}`;
        const respuesta = await fetch(url);

        if (!respuesta.ok) {
          throw new Error(`Error ${respuesta.status}: No se pudo obtener el clima.`);
        }

        const datos = await respuesta.json();
        setClima({
          temperatura: datos.main.temp,
          descripcion: datos.weather[0].description,
        });
      } catch (err) {
        setError(err.message);
      }
    };

    obtenerClima();
  }, [ciudad]);

  if (error) {
    return <p style={{ color: "red" }}>Error: {error}</p>;
  }

  if (!clima) {
    return <p>Cargando recomendaciones...</p>;
  }

  // Generar recomendaciones según el clima
  const { temperatura, descripcion } = clima;
  let recomendaciones = [];

  if (temperatura > 25) {
    recomendaciones.push("Usa ropa ligera y protector solar. 🌞");
  } else if (temperatura < 15) {
    recomendaciones.push("Lleva un abrigo y toma bebidas calientes. 🧥☕");
  }

  if (descripcion.includes("lluvia")) {
    recomendaciones.push("Lleva un paraguas o impermeable. ☔");
  }

  if (descripcion.includes("nieve")) {
    recomendaciones.push("Usa ropa térmica y botas impermeables. ❄️");
  }

  if (descripcion.includes("niebla")) {
    recomendaciones.push("Conduce con precaución, la visibilidad es baja. 🚗💨");
  }

  if (recomendaciones.length === 0) {
    recomendaciones.push("El clima está agradable, disfruta tu día. 😊");
  }

  return (
    <div style={{ color:'black', textAlign: "center", padding: "15px", backgroundColor: "#d1ecf1", borderRadius: "10px", width: "1000px", margin: "auto", marginTop: "20px" }}>
      <h3>📌 Recomendaciones del Clima</h3>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {recomendaciones.map((rec, index) => (
          <li key={index}>✅ {rec}</li>
        ))}
      </ul>
    </div>
  );
};

export default RecomendacionesDia;
