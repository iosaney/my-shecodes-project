function searchResponse (response) {
  let temp = Math.round(response.data.main.temp);
  let temperature = document.querySelector("h1");
  temperature.innerHTML = ` ${temp}`;
  let getTempMax =Math.round(response.data.main.temp_max);
  let getTempMin =Math.round(response.data.main.temp_min);
  let tempMax = document.querySelector(".tempMax");
  tempMax.innerHTML=getTempMax;
  let tempMin = document.querySelector(".tempMin");
   tempMin.innerHTML=getTempMin;
  let description = (response.data.weather[0].description);
  let weatherDescription =document.querySelector(".airDesription");
  weatherDescription.innerHTML=description;
  let countryName= (response.data.name);
  let country = document.querySelector("h4");
  country.innerHTML=countryName;

}
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", function (event){
  event.preventDefault();
  let inputForm = document.querySelector("#search-input")
  let showName = document.querySelector("h4");
  showName.innerHTML= `${inputForm.value}`;
  console.log(inputForm.value);
  let units ="imperial";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather"
  let apiUrl = `${apiEndpoint}?q=${inputForm.value}&units=${units}&appid=97c2f6a3b34509ac62090edc5d18d949`;
  axios.get(apiUrl).then(searchResponse);
})

let todaysDate = document.querySelector("#today-date");

let date = new Date();
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = days[date.getDay()]
let dayDate = date.getDate();
      let months = [
        "Jan",
        "Feb",
        "March",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
      ];
let month = months[date.getMonth()];
let year = date.getFullYear();
todaysDate.innerHTML = `TODAY • ${day}, ${dayDate} ${month} ${year}`;

let unit = document.querySelector("#unit-c");
unit.addEventListener("click", function(event){
  event.preventDefault();
  let temp = document.querySelector("#main-temp");
  let tempDays = document.querySelectorAll(".tempno");
  const isCelsius = temp.getAttribute("data-unit") === "celsius";
 if (!isCelsius) { //checks to see if the attribute value is not celsius
    const fahrenheit = parseInt(temp.innerHTML); //define a const variable as F, retrieves the integer value from temp element 
    const celsius = (fahrenheit - 32) * (5 / 9);
    temp.innerHTML = parseInt(celsius);
    tempDays.innerHTML = parseInt(celsius);
    temp.setAttribute("data-unit", "celsius"); //sets an attribute called data-unit on temp element w the value set to celsius
  }

});

let unitFar = document.querySelector("#unit-f");
unitFar.addEventListener("click", function(event) {
  event.preventDefault();
  let temp = document.querySelector("#main-temp");
  let tempDays = document.querySelectorAll(".tempno");
  let highnlow = document.querySelectorAll(".avgtemp");

  const isCelsius = temp.getAttribute("data-unit") === "celsius";

  if (isCelsius) { //checks to see if the attribute value is celsius
    const celsius = parseInt(temp.innerHTML);
    const fahrenheit = (celsius * 9 / 5) + 32;
    temp.innerHTML = parseInt(fahrenheit);
    temp.setAttribute("data-unit", "fahrenheit");
  }
});

/*get current location*/

        function getResponse(response) {
          console.log(response); //using axios, this will get response from API url you provided
          let temp = Math.round(response.data.main.temp);
          let temperature = document.querySelector("h1");
          temperature.innerHTML = ` ${temp}`;
          let getTempMax =Math.round(response.data.main.temp_max);
          let getTempMin =Math.round(response.data.main.temp_min);
          let tempMax = document.querySelector(".tempMax");
          tempMax.innerHTML=getTempMax;
          let tempMin = document.querySelector(".tempMin");
          tempMin.innerHTML=getTempMin;
          let description = (response.data.weather[0].description);
          let weatherDescription =document.querySelector(".airDesription");
          weatherDescription.innerHTML=description;
          let countryName= (response.data.name);
          let country = document.querySelector("h4");
          country.innerHTML=countryName;
        }

        function getPosition(position) {
          console.log(position); //position is an object that has lots of info but we only need coords of our location so we gat longitude and latitude in the next step
          let latitude = position.coords.latitude;
          let longitude = position.coords.longitude;
          let apiKey = "97c2f6a3b34509ac62090edc5d18d949";
          let units = "imperial";
          let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
          let urlApi = `${apiEndpoint}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`; //returns an object, doesn't give you anything unless you call axios

          axios.get(urlApi).then(getResponse);
        }

        function getLocation() {
          navigator.geolocation.getCurrentPosition(getPosition);
        }

        let locButton = document.querySelector("#current-tab");
        locButton.addEventListener("click", getLocation);

