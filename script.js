async function getWeather() {
  const city = document.getElementById("cityInput").value;
  const loading = document.getElementById("loading");
  const weatherCard = document.getElementById("weatherResult");
  const forecastDiv = document.getElementById("forecast");

  if (!city) {
    alert("Please enter a city name!");
    return;
  }

  // Show loading
  loading.style.display = "block";
  weatherCard.style.display = "none";
  forecastDiv.innerHTML = "";

  const url = `https://wttr.in/${city}?format=j1`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("City not found");
    const data = await response.json();

    // Current weather
    const current = data.current_condition[0];
    document.getElementById("cityName").textContent = city;
    document.getElementById("temperature").textContent = `🌡 Temp: ${current.temp_C} °C`;
    document.getElementById("humidity").textContent = `💧 Humidity: ${current.humidity}%`;
    document.getElementById("description").textContent = `☁️ ${current.weatherDesc[0].value}`;

    weatherCard.style.display = "block";

    // Forecast (next 3 days)
    const days = data.weather.slice(0, 3);
    days.forEach((day, index) => {
      const forecastDay = document.createElement("div");
      forecastDay.className = "forecast-day";
      forecastDay.innerHTML = `
        <h3>Day ${index + 1}</h3>
        <p>🌡 Max: ${day.maxtempC}°C</p>
        <p>❄ Min: ${day.mintempC}°C</p>
        <p>☁️ ${day.hourly[4].weatherDesc[0].value}</p>
      `;
      forecastDiv.appendChild(forecastDay);
    });

  } catch (error) {
    alert("❌ Could not fetch weather. Try another city!");
  } finally {
    loading.style.display = "none";
  }
}
