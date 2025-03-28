const API_KEY = "d33b5dad9f8779faaf1248945394b88f";

export async function getWeatherByCity(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=imperial`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('City not found');
  return await res.json();
}