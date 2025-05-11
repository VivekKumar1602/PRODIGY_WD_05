const API_KEY = 'dd10e5576865c98b8aa5e55765ba116f'; // Replace with your OpenWeatherMap API key

async function getWeather() {
    const city = document.getElementById('cityInput').value.trim();
    const resultDiv = document.getElementById('weatherResult');

    if (!city) {
        resultDiv.innerHTML = "Please enter a city name.";
        return;
    }

    try {
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
        if (!res.ok) throw new Error("City not found");

        const data = await res.json();

        const temp = data.main.temp;
        const desc = data.weather[0].description;
        const humidity = data.main.humidity;
        const wind = data.wind.speed;

        resultDiv.innerHTML = `
          <h2>${data.name}, ${data.sys.country}</h2>
          <p><strong>Temperature:</strong> ${temp}°C</p>
          <p><strong>Condition:</strong> ${desc}</p>
          <p><strong>Humidity:</strong> ${humidity}%</p>
          <p><strong>Wind Speed:</strong> ${wind} m/s</p>
        `;
    } catch (err) {
        resultDiv.innerHTML = "Error fetching weather. Check city name.";
    }
}