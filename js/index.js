    
    const cityInput= document.querySelector(".city-input");
    const searchButton = document.querySelector(".search-btn");
    const locationButton = document.querySelector(".location-btn");
    const weatherCardsDiv = document.querySelector(".weather-cards")
    const API_KEY="128182610de69e3aad1bfdfe0ec9af44"
    const createWeatherCard=(cityName,weatherItem)=>{
      return `<li class="card">
      <h3>(${weatherItem.dt_txt.split(" ")[0]})</h3>
      <h4><img src="https://openweathermap.org/img/wn/${weatherItem.weather[0].icon}@2x.png"></h4>
      <div class="info">
      <h4>${(weatherItem.weather[0].description)}</h4>
      </div>
      <h5>high:-${(weatherItem.main.temp_max-273.15).toFixed(2)}</h5>
      <h5>low:-${(weatherItem.main.temp_min-273.15).toFixed(2)}</h5>
      </li>`;
    }
    const getWeatherDetails=(cityName,lat,lon)=>{
      const WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}`;
      fetch(WEATHER_API_URL).then(res=>res.json()).then(data =>{
          const uniqueForecastDays =[];
          const sevenDaysforecast=data.list.filter(forecast =>{
            const forecastDate = new Date(forecast.dt_txt).getDate();
            if(!uniqueForecastDays.includes(forecastDate)){
              return uniqueForecastDays.push(forecastDate);
            }
          });

          cityInput.value="";
          
          weatherCardsDiv.innerHTML= "";
          console.log(sevenDaysforecast);
          
          sevenDaysforecast.forEach(weatherItem =>{
            weatherCardsDiv.insertAdjacentHTML("beforeend",createWeatherCard(cityName,weatherItem));
          });
      }).catch(()=>{
        alert("An error occured while fetching the weather forecast");
      });

  
    
    }
     const getCityCoordinates=() =>{
        const cityName=cityInput.value.trim();
        if(!cityName) return;
        const GEOCODING_API_URL=`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`;
      fetch(GEOCODING_API_URL).then(res=> res.json()).then(data=>{
        if(!data.length) return alert(`No coordinates found for ${cityName}`);
        const {name,lat,lon}=data[0];
        getWeatherDetails(name,lat,lon);
      }).catch(()=>{
        alert("An error occured while fetching the city!");
      });
    }
    const getUserCoordinates=()=>{
      navigator.geolocation.getCurrentPosition(
      position=>{
        const {latitude, longitude} =position.coords;
        const REVERSE_GEOCODING_URL =`http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${API_KEY}`;
        fetch(REVERSE_GEOCODING_URL).then(res=> res.json()).then(data=>{
          console.log(data);
        }).catch(()=>{
          alert("An error occured while fetching the coordinates!");
        });
      },
      error =>{
        if(error.code === error.PERMISSION_DENIED){
          alert("Geolocation request denied.Please reset location permision to grant access again.");
        }
      }
    );

    }
   locationButton.addEventListener("click",getUserCoordinates);
   searchButton.addEventListener("click",getCityCoordinates);
/*
const cityInput = document.querySelector(".city-input");
const searchButton = document.querySelector(".search-btn");
const locationButton = document.querySelector(".location-btn");
const weatherCardsDiv = document.querySelector(".weather-cards");

const createWeatherCard = (cityName, weatherItem) => {
  return `<li class="card">
    <h3>(${weatherItem.dt_txt.split(" ")[0]})</h3>
    <h4><img src="https://openweathermap.org/img/wn/${weatherItem.weather[0].icon}@2x.png"></h4>
    <div class="info">
      <h4>${(weatherItem.weather[0].description)}</h4>
    </div>
    <h5>high: ${(weatherItem.main.temp_max - 273.15).toFixed(2)}°C</h5>
    <h5>low: ${(weatherItem.main.temp_min - 273.15).toFixed(2)}°C</h5>
  </li>`;
};

const getWeatherDetails = (cityName) => {
  // Call the Vercel serverless API route to fetch weather data
  const WEATHER_API_URL = `/api/weather?cityName=${cityName}`;

  fetch(WEATHER_API_URL)
    .then((res) => res.json())
    .then((data) => {
      const uniqueForecastDays = [];
      const sevenDaysforecast = data.list.filter((forecast) => {
        const forecastDate = new Date(forecast.dt_txt).getDate();
        if (!uniqueForecastDays.includes(forecastDate)) {
          return uniqueForecastDays.push(forecastDate);
        }
      });

      cityInput.value = "";
      weatherCardsDiv.innerHTML = "";
      console.log(sevenDaysforecast);

      sevenDaysforecast.forEach((weatherItem) => {
        weatherCardsDiv.insertAdjacentHTML("beforeend", createWeatherCard(cityName, weatherItem));
      });
    })
    .catch(() => {
      alert("An error occurred while fetching the weather forecast.");
    });
};

const getCityCoordinates = () => {
  const cityName = cityInput.value.trim();
  if (!cityName) return;

  const GEOCODING_API_URL = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${process.env.WEATHER_API_KEY}`;

  fetch(GEOCODING_API_URL)
    .then((res) => res.json())
    .then((data) => {
      if (!data.length) return alert(`No coordinates found for ${cityName}`);
      const { name, lat, lon } = data[0];
      getWeatherDetails(name, lat, lon);
    })
    .catch(() => {
      alert("An error occurred while fetching the city!");
    });
};

const getUserCoordinates = () => {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      const REVERSE_GEOCODING_URL = `http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${process.env.WEATHER_API_KEY}`;
      fetch(REVERSE_GEOCODING_URL)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        })
        .catch(() => {
          alert("An error occurred while fetching the coordinates!");
        });
    },
    (error) => {
      if (error.code === error.PERMISSION_DENIED) {
        alert("Geolocation request denied. Please reset location permission to grant access again.");
      }
    }
  );
};

locationButton.addEventListener("click", getUserCoordinates);
searchButton.addEventListener("click", getCityCoordinates);

*/