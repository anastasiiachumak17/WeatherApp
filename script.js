const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');// choose dom-elem

search.addEventListener('click', () =>
{
    const APIKey = 'f8c55614ff8e58d9b7fa64ffc0e4427d';
    const city = document.querySelector ('.search-box input').value;// подія під час натіску на кнопку

    if (city =='') return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`) //Глобальный метод fetch() запускает процесс извлечения ресурса из сети. Возвращает promise, содержащий Response объект (ответ на запрос).
        .then(response => response.json()).then(json => { //API-ключ і запит до OpenWeatherMap AP
            
        if (city.trim() !== '') {
            // Зберігання ім'я міста в localStorage
            localStorage.setItem('selectedCity', city);
        }
        const temperatureElement = document.querySelector('.weather-box .temperature');

        temperatureElement.addEventListener('click', () => {           //switch C to F
            const currentUnit = temperatureElement.dataset.unit || 'celsius';
            const newUnit = currentUnit === 'celsius' ? 'fahrenheit' : 'celsius';

            updateTemperatureUnit(newUnit);

        });

        function updateTemperatureUnit(unit) {
            const temperatureValue = parseInt(json.main.temp);

            if (unit === 'celsius') {
                temperatureElement.innerHTML = `${temperatureValue}<span> C°</span>`;
                temperatureElement.dataset.unit = 'celsius';
            } else {
                
                const temperatureFahrenheit = Math.round((temperatureValue * 9/5) + 32);
                temperatureElement.innerHTML = `${temperatureFahrenheit}<span> F°</span>`;
                temperatureElement.dataset.unit = 'fahrenheit';
            }
        }

        const image = document.querySelector('.weather-box img');
        const temperature = document.querySelector('.weather-box .temperature');
        const description = document.querySelector('.weather-box .description');
        const humidity = document.querySelector('.weather-details .humidity span');
        const wind = document.querySelector('.weather-details .wind span');
        const forecast = document.querySelector("#forecast");
        
        function getForecast(latitude, longitude){
            let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=current,minutely,hourly&appid=${apiKey}&units=metric`;
            axios.get(apiUrl).then(response => { //Axios is a promise-based HTTP library that lets developers make requests to either their own or a third-party server to fetch data.
                let tempArr = response.data.daily;
                for (let i = 1; i < 5; i++){
                    forecastArr.push(tempArr[i]);
                }
                displayForecast(forecastArr);
            });
        }

        function displayForecast(arr){ //відораження прогнозу погоди

            arr.forEach(item => {
                let li = document.createElement("li");
                li.classList.add("week-item");

                let image = document.createElement("div");
                image.classList.add("day-img");
                let icon = findIcon(item.weather[0].id);
                image.style.backgroundImage = `url("/img/${icon}d.png")`;


                let weekDay = document.createElement("div");
                weekDay.classList.add("day-name");
                let unixTimestamp = item.dt;
                let date = new Date(unixTimestamp * 1000);
                let dayName = date.toLocaleDateString("en-GB", {weekday: "short"});
                weekDay.innerText = dayName;

                let weekDayTemp = document.createElement("div");
                weekDayTemp.classList.add("day-temp");
                weekDayTemp.innerHTML = `<span>${Math.round(item.temp.day)}</span>°C`;

                li.append(image);
                li.append(weekDay);
                li.append(weekDayTemp);
                forecast.append(li);
            })
        }
  switch (json.weather[0].main){ //choose icon
    case 'Clear':
        image.src = 'assets/clear.png';
        break;
    case 'Rain':
        image.src = 'assets/rain.png';
        break;
    case 'Snow':
        image.src = 'assets/snow.png';
        break;
    case 'Clouds':
        image.src = 'assets/cloud.png';
        break;
    case 'Mist':
        image.src = 'assets/mist.png';
        break;
    case 'Haze':
        image.src = 'assets/mist.png';
        break;
      default:
            image.src = 'assets/cloud.png';
  }
          temperature.innerHTML = `${parseInt (json.main.temp)}<span> C°</span>`;
          description.innerHTML = `${json.weather[0].description}`;
          humidity.innerHTML = `${json.main.humidity}%`;
          wind.innerHTML = `${parseInt (json.wind.speed)}Km/h`;
          
        const currentDate = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = currentDate.toLocaleDateString('en-US', options);
        
        const dateElement = document.querySelector('.date');
        dateElement.innerHTML = formattedDate;
        
});
});
    const selectedCity = localStorage.getItem('selectedCity');
    if (selectedCity) {

        document.querySelector('.search-box input').value = selectedCity;

    }