function getWeather() {
    const locationInput = document.getElementById("locationInput");
    const currentWeather = document.getElementById("currentWeather");
    const forecast = document.getElementById("forecast");

    const apiKey = "7a35a0b684c8408e9188c5b8c53bccbd"; // Replace with your OpenWeatherMap API key

    const currentApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${locationInput.value}&appid=${apiKey}&units=metric`;
    const forecastApiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${locationInput.value}&appid=${apiKey}&units=metric`;

    // Fetch current weather
    fetch(currentApiUrl)
        .then(response => response.json())
        .then(data => {
            displayCurrentWeather(data, currentWeather);
        })
        .catch(error => {
            console.error("Error fetching current weather data:", error);
            currentWeather.innerHTML = "<p>Unable to fetch current weather data. Please try again later.</p>";
        });

    // Fetch 7-day forecast
    fetch(forecastApiUrl)
        .then(response => response.json())
        .then(data => {
            displayForecast(data, forecast);
        })
        .catch(error => {
            console.error("Error fetching forecast data:", error);
            forecast.innerHTML = "<p>Unable to fetch forecast data. Please try again later.</p>";
        });
}

function displayCurrentWeather(data, container) {
    const temperature = data.main.temp;
    const description = data.weather[0].description;
    const weatherIcon = getWeatherIcon(data.weather[0].main);

    container.innerHTML = `<div class="weather-info">
                                <p><i class="weather-icon ${weatherIcon}"></i></p>
                                <p>Temperature: ${temperature} °C</p>
                                <p>Description: ${description}</p>
                            </div>`;
}

function displayForecast(data, container) {
    container.innerHTML = "";
    for (let i = 0; i < data.list.length; i += 8) {
        const date = new Date(data.list[i].dt * 1000);
        const day = date.toLocaleDateString('en-US', { weekday: 'short' });
        const temperature = data.list[i].main.temp;
        const description = data.list[i].weather[0].description;
        const weatherIcon = getWeatherIcon(data.list[i].weather[0].main);

        const dailyWeather = document.createElement("div");
        dailyWeather.className = "daily-weather";
        dailyWeather.innerHTML = `<p>${day}</p>
                                  <p><i class="weather-icon ${weatherIcon}"></i></p>
                                  <p>Temperature: ${temperature} °C</p>
                                  <p>Description: ${description}</p>`;

        container.appendChild(dailyWeather);
    }
}

function getWeatherIcon(weather) {
    switch (weather) {
        case 'Clear':
            return 'fas fa-sun'; // Sun icon for clear weather
        case 'Clouds':
            return 'fas fa-cloud'; // Cloud icon for cloudy weather
        // Add more cases for different weather conditions
        default:
            return 'fas fa-question'; // Question mark for unknown weather
    }
}
