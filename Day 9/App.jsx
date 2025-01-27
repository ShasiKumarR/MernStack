import React, { useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const fetchWeather = async () => {
    const apiKey = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key
    const url = "https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric";

    try {
      const response = await axios.get(url);
      setWeather(response.data);
      setError('');
    } catch (err) {
      setError('City not found. Please try again.');
      setWeather(null);
    }
  };

  return (
    <div className="app">
      <h1 className="title">Weather App</h1>
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="input"
        />
        <button onClick={fetchWeather} className="btn">
          Get Weather
        </button>
      </div>
      {error && <p className="error">{error}</p>}
      {weather && (
        <div className="weather-info">
          <h2>{weather.name}</h2>
          <p>{weather.weather[0].description}</p>
          <p>
            <strong>Temperature:</strong> {weather.main.temp}°C
          </p>
          <p>
            <strong>Humidity:</strong> {weather.main.humidity}%
          </p>
          <p>
            <strong>Wind Speed:</strong> {weather.wind.speed} m/s
          </p>
        </div>
      )}
    </div>
  );
}

export default App;