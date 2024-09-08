const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const notFound = document.querySelector('.not-found');
const cityInput = document.querySelector('.search-box input');

search.addEventListener('click', () => {
    const APIKey = 'b1f059feb7c18a607a4e4911d4b90dbe';
    const city = cityInput.value.trim();

    if (city === '') return;

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`;

    fetch(url)
        .then(response => response.json())
        .then(json => {
            if (json.cod === '404') {
                container.style.height = '400px';
                weatherBox.classList.remove('active');
                weatherDetails.classList.remove('active');
                notFound.classList.add('active');
                return;
            }

            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');
            const feelsLike = document.querySelector('.weather-details .feels-like span');
            const maxTemp = document.querySelector('.weather-details .max-temp span');
            const minTemp = document.querySelector('.weather-details .min-temp span');

            container.style.height = '650px';
            weatherBox.classList.add('active');
            weatherDetails.classList.add('active');
            notFound.classList.remove('active');

            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'images/clear.png';
                    break;
                case 'Rain':
                    image.src = 'images/rain.png';
                    break;
                case 'Snow':
                    image.src = 'images/snow.png';
                    break;
                case 'Clouds':
                    image.src = 'images/cloud.png';
                    break;
                case 'Mist':
                    image.src = 'images/mist.png';
                    break;
                default:
                    image.src = 'images/default.png';
            }

            temperature.innerHTML = `${Math.round(json.main.temp)}<span>°C</span>`;
            description.textContent = json.weather[0].description;
            humidity.textContent = `${json.main.humidity}%`;
            wind.textContent = `${Math.round(json.wind.speed)} km/hr`;
            feelsLike.textContent = `${Math.round(json.main.feels_like)}°C`;
            maxTemp.textContent = `${Math.round(json.main.temp_max)}°C`;
            minTemp.textContent = `${Math.round(json.main.temp_min)}°C`;
        })
        .catch(() => {
            container.style.height = '400px';
            weatherBox.classList.remove('active');
            weatherDetails.classList.remove('active');
            notFound.classList.add('active');
        });
});
