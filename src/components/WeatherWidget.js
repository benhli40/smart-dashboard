import React, { useState } from 'react';
import { getWeatherByCity } from '../utils/weatherAPI';
import "./WeatherWidget.css";

export default function WeatherWidget() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [savedCities, setSavedCities] = useState(() => {
    return JSON.parse(localStorage.getItem('savedCities')) || [];
  });

  const handleSearch = async () => {
    if (!city) return;
    try {
      const data = await getWeatherByCity(city);
      setWeather(data);
      if (!savedCities.includes(city)) {
        const updated = [...savedCities, city];
        setSavedCities(updated);
        localStorage.setItem('savedCities', JSON.stringify(updated));
      }
    } catch (err) {
      alert('City not found.');
    }
  };

  const handleRemoveCity = (name) => {
    const updated = savedCities.filter((c) => c !== name);
    setSavedCities(updated);
    localStorage.setItem('savedCities', JSON.stringify(updated));
  };

  const handleLoadSaved = async (name) => {
    setCity(name);
    try {
      const data = await getWeatherByCity(name);
      setWeather(data);
    } catch (err) {
      alert('City not found.');
    }
  };

  return (
    <div className="widget">
      <h2>Weather</h2>
      <div className="weather-input">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          placeholder="Enter city..."
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {weather && (
        <div className="weather-info">
          <h3>{weather.name}</h3>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt="Weather Icon"
          />
          <p>{Math.round(weather.main.temp)}°F</p>
          <p>{weather.weather[0].description}</p>
          <p>Humidity: {weather.main.humidity}% | Wind: {weather.wind.speed} m/s</p>
        </div>
      )}

      {savedCities.length > 0 && (
        <div className="saved-cities">
          <h4>Saved Cities</h4>
          <ul>
            {savedCities.map((c) => (
              <li key={c}>
                <button onClick={() => handleLoadSaved(c)}>{c}</button>
                <button onClick={() => handleRemoveCity(c)}>🗑️</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}