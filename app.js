// Tutorial by http://youtube.com/CodeExplained
// api key : 82005d27a116c2880c8f0fcb866998a0


//SELECT ELEMENTS
const container = document.querySelector(".container");
const container1 = document.querySelector(".container1");
const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location p");
const notificationElement = document.querySelector(".notification");


// App data
const weather = {};

weather.temperature = {
  unit : "celcius"
}

// APP CONSTS AND VARS
const KELVIN = 273;
//API key
const key = "82005d27a116c2880c8f0fcb866998a0";

//CHECK if browser supports geolocation
if(navigator.geolocation){
  navigator.geolocation.getCurrentPosition(setPosition, showError);
  getCoinData("bitcoin");
} else{
  notificatonElement.style.display = "block";
  notificationElement.innerHTML = "<p>Browser doesn't support Geolocation</p>";
}


// SET USER'S setPosition

function setPosition(position){
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  getWeather(latitude, longitude);
}

// SHOW error when there is an issue with geolocation service
function showError(error){
  notificationElement.style.display = "block";
  notificationElement.innerHTML = `<p> ${error.message} </p>`;
}

//GET WEATHER FROM API PROVIDER
function getWeather(latitude, longitude){
  let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;

  fetch(api)
  .then(function(response){
    let data = response.json();
    return data;
  })
  .then(function(data){
    weather.temperature.value = Math.floor(data.main.temp - KELVIN);
    weather.description = data.weather[0].description;
    weather.iconId = data.weather[0].icon;
    weather.city = data.name;
    weather.country = data.sys.country;
  })
  .then(function(){
    displayWeather();//Does this function have to wrapped in another function?
  });
}

function displayWeather(){
    iconElement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
    tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
    descElement.innerHTML = weather.description;
    locationElement.innerHTML = `${weather.city}, ${weather.country}`;
}

// C to F conversion

function celciusToFahrenheit(temperature){
  return (temperature * 9/5) + 32;
}

//When the user clicks o the temperature ELEMENTS
container.addEventListener("click", function(){
  if(weather.temperature.value == undefined) return;//What does this do?

  if(weather.temperature.unit == "celcius"){
    let fahrenheit = celciusToFahrenheit(weather.temperature.value);
    fahrenheit = Math.floor(fahrenheit);
    tempElement.innerHTML = `${fahrenheit}°<span>F</span>`;
    weather.temperature.unit = "fahrenheit";
  }else{
    tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
    weather.temperature.unit = "celcius";
  }
})



const coinId = document.querySelector(".coin p");
const coinSymbol = document.querySelector(".coinsymbol p");
const currencySymbol = document.querySelector(".currency-symbol p");
const currencyRate = document.querySelector(".rate p");
const coin_icon = document.querySelector(".coin-icon");

let coinData = {};
//get coin data
function getCoinData(coinName){
  let api = `https://api.coincap.io/v2/assets/${coinName}`;
  fetch(api)
  .then((response)=>{
    let data = response.json();
    return data;
  })
  .then((data)=>{
    coinData.id = data.data.id;
    coinData.symbol = data.data.symbol;
    coinData.rate = Math.floor(data.data.priceUsd*100)/100;
  })
  .then(()=>{
    displayCoinData(coinName)
  })
}

function displayCoinData(coinname){
  coinId.innerHTML = `${coinData.id}`;
  coinSymbol.innerHTML = `${coinData.symbol}`;
  currencyRate.innerHTML = `<span>$ </span>${coinData.rate}`;
  coin_icon.innerHTML = `<img src="icons/${coinname}-icon.png" alt="">`
}

container1.addEventListener('click', () =>{
  if(coinId.innerHTML == "bitcoin"){
  getCoinData("ethereum");
} else if(coinId.innerHTML == "ethereum"){
  getCoinData("ripple");
} else {
  getCoinData('bitcoin');
}
})
