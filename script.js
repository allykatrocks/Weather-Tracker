var accessCityForm = document.getElementById("search-cities");
var inputCity = document.getElementById("city");
var key = "e37b1c350cc530571e0d70e62fce1f52";
var dateEl = document.querySelector(".card-title");
var tempEl = document.getElementById("temp");
var humidEl = document.getElementById("humid");
var windEl = document.getElementById("wind");
var uviEl = document.getElementById("uvi");
var futureEl = document.getElementById("future-cast");


accessCityForm.addEventListener("submit", function(event) {
    event.preventDefault();
    var city = document.getElementById("city").value;
    var inputCityValue = inputCity.value;
    fetch("http://api.openweathermap.org/geo/1.0/direct?q=" + inputCityValue + "&limit=1&appid=" + key).then(function(response) {
        return response.json().then(function(data) {
            var lat = data[0].lat;
            var lon = data[0].lon;
            fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial" + "&appid=" + key).then(function(outcome) {
                return outcome.json().then(function(weatherData) {
                    console.log(weatherData);
                    var weatherIcon = weatherData.current.weather[0].icon;
                   tempEl.append(weatherData.current.temp + " °F");
                   humidEl.append(weatherData.current.humidity + "%");
                   windEl.append(weatherData.current.wind_speed + " MPH");
                   uviEl.append(weatherData.current.uvi);
                   if(weatherData.current.uvi < 3) {
                       uviEl.style.backgroundColor = "green";
                   } else if(weatherData.current.uvi < 7) {
                    uviEl.style.backgroundColor = "yellow";
                   } else {
                    uviEl.style.backgroundColor = "red";
                   };
                    var date = moment.unix(weatherData.current.dt).format("MM/DD/YYYY");
                    dateEl.textContent = city + " " + date;
                    var iconImg = $("<img>");
                    iconImg.attr("src", "https://openweathermap.org/img/w/" + weatherIcon + ".png");
                    iconImg.appendTo(dateEl);
                    document.getElementById("future-header").textContent = "5 Day Forecast:"
                    for (var i = 0; i < 5; i++) {
                         var col = document.createElement("div");
                         col.setAttribute("class", "col");
                         var cards = document.createElement("div");
                         cards.setAttribute("class", "card");
                         var cardBody = document.createElement("div");
                         cardBody.setAttribute("class", "card-body");
                         console.log(cardBody);
                         var h4 = document.createElement("h4").textContent = moment.unix(weatherData.daily[i].dt).format("MM/DD/YYYY");
                         var newIcon = weatherData.daily[i].weather[0].icon;
                         var icon = document.createElement("img");
                         icon.setAttribute("src", "https://openweathermap.org/img/w/" + newIcon + ".png");
                         var newTemp = document.createElement("p").textContent = "Temp: " + weatherData.daily[i].temp.day + "°F\n";
                         var newHumid = document.createElement("p").textContent = "Humid: " + weatherData.daily[i].humidity + "%";
                         cardBody.append(h4, icon, newTemp, newHumid);
                         cards.append(cardBody);
                         col.append(cards);
                         futureEl.append(col);
                    }
                })
            });

        })
    })
})

// clean up CSS
// clear past results when new search is initiated
// clear text upon start up
// accessible search history





