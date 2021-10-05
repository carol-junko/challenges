
let apiEnd = "https://api.openweathermap.org/data/2.5/weather?"
let apiKey = "de31afd036b8bd58c684a452ffef335f";
let unit = "&units=metric";
let key = `&appid=${apiKey}`;

function getElement(element){
    return document.querySelector(element);
}

function informCurrentDataInPage(response){

    let cityName = response.data.name;
    let humidityData = response.data.main.humidity;
    let temperatureData = Math.round(response.data.main.temp);
    let descriptionData = response.data.weather[0].description;
    let windData = Math.round(response.data.wind.speed);


    let city = getElement("#city");
    city.innerHTML = cityName;
    
    let description = getElement("#weather-description");
    description.innerHTML = descriptionData;
    
    let temperature = getElement("#temperature");
    temperature.innerHTML = temperatureData;

    let humidity = getElement("#humidity");
    humidity.innerHTML = `Humidity: ${humidityData}%`;

    let wind = getElement("#wind-speed");
    wind.innerHTML = `Wind: ${windData} km/hr`;
}

function getData(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let location = `&lat=${latitude}&lon=${longitude}`;
    
    let apiUrl = apiEnd + key + unit + location;

    axios.get(apiUrl).then(informCurrentDataInPage);
}

function informDay(){
    let currentDate = new Date();
    let day = currentDate.getDay();
    let weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return weekDays[day]

}

function informTime(){
    let currentDate = new Date();
    let hours = currentDate.getHours();
    let minutes = currentDate.getMinutes();
    if(minutes < 10){
        minutes = "0" + minutes;
    }
    let time = hours + ":" + minutes;
    return time;
}

function informCurrentWeather(event){
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(getData);
    let date = getElement("#date-time");
    date.innerHTML = `${informDay()} ${informTime()}`;
}

function informSearchDataInPage(response){
    console.log(response);
    let cityName = response.data.name;
    let humidityData = response.data.main.humidity;
    let temperatureData = Math.round(response.data.main.temp);
    let descriptionData = response.data.weather[0].description;
    let windData = Math.round(response.data.wind.speed);


    let city = getElement("#city");
    city.innerHTML = cityName;
    
    let description = getElement("#weather-description");
    description.innerHTML = descriptionData;
    
    let temperature = getElement("#temperature");
    temperature.innerHTML = temperatureData;

    let humidity = getElement("#humidity");
    humidity.innerHTML = `Humidity: ${humidityData}%`;

    let wind = getElement("#wind-speed");
    wind.innerHTML = `Wind: ${windData} km/hr`;
}

function informSearchWeather(event){
    event.preventDefault();

    let searchInput = getElement("#search-input");
    let searchInputText = searchInput.value;
    let citySearch = `q=${searchInputText}`;
   
    let key = `&appid=${apiKey}`;
    let apiUrl = apiEnd + citySearch + key + unit;

    axios.get(apiUrl).then(informSearchDataInPage);
    searchInput.value = null;

}

let searchButton = getElement("#search-button");
searchButton.addEventListener("click", informSearchWeather)

let currentButton = getElement("#current-button");
currentButton.addEventListener("click", informCurrentWeather);

// transform temperature
function transformToFahrenheit(){
    let temperature = document.querySelector("#temperature");
    let fahrenheitTemperature = Math.round((temperature.innerHTML * 1.8) + 32);
    temperature.innerHTML = fahrenheitTemperature;
}

let fahrenheit = document.querySelector("#fahrenheit-link");
fahrenheit.addEventListener("click", transformToFahrenheit);


function transformToCelcius(){
    let temperature = document.querySelector("#temperature");
    let celciusTemperature = Math.round((temperature.innerHTML-32)* 5/9);
    temperature.innerHTML = celciusTemperature;
}

let celcius = document.querySelector("#celcius-link");
celcius.addEventListener("click", transformToCelcius);
