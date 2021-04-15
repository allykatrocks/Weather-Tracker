var accessCityForm = document.getElementById("search-cities");
var inputCity = document.getElementById("city");
var key = "e37b1c350cc530571e0d70e62fce1f52";
var dateEl = document.querySelector(".card-title");
var tempEl = document.getElementById("temp");
var humidEl = document.getElementById("humid");
var windEl = document.getElementById("wind");
var uviEl = document.getElementById("uvi");


accessCityForm.addEventListener("submit", function(event) {
    event.preventDefault();
    var inputCityValue = inputCity.value;
    fetch("http://api.openweathermap.org/geo/1.0/direct?q=" + inputCityValue + "&limit=1&appid=" + key).then(function(response) {
        return response.json().then(function(data) {
            var lat = data[0].lat;
            var lon = data[0].lon;
            fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=" + key).then(function(outcome) {
                return outcome.json().then(function(weatherData) {
                   tempEl.append(weatherData.daily[0].temp.day);
                   humidEl.append(weatherData.daily[0].humidity);
                   windEl.append(weatherData.daily[0].wind_speed);
                   uviEl.append(weatherData.daily[0].uvi);
                    var date = moment.unix(weatherData.current.dt).format("MM/DD/YYYY");
                    dateEl.textContent = date;
                })
            });

        })
    })
})

//get city and icon to appear
//fix text content of appends
//clear past results when new search is initiated





