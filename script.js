var accessCityForm = document.getElementById("search-cities");
var inputCity = document.getElementById("city");
var key = "e37b1c350cc530571e0d70e62fce1f52";
var dateEl = document.querySelector(".card-title");
var tempEl = document.getElementById("temp");
var humidEl = document.getElementById("humid");
var windEl = document.getElementById("wind");
var uviEl = document.getElementById("uvi");
var futureEl = document.getElementById("future-cast");
var getDataBack = document.getElementById("weather-card");
var searchHistory = JSON.parse(localStorage.getItem("searchHistoryList")) || [];
var containerEl = document.getElementById("container");
var clearEl = document.getElementById("clear-history");

function showWeatherData(city) {
    console.log(city);
    fetch("https://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=1&appid=" + key).then(function (response) {
        return response.json().then(function (data) {
            var lat = data[0].lat;
            var lon = data[0].lon;
            fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial" + "&appid=" + key).then(function (outcome) {
                return outcome.json().then(function (weatherData) {
                    console.log(weatherData);
                    var weatherIcon = weatherData.current.weather[0].icon;
                    tempEl.textContent = "Temperature: " + weatherData.current.temp + " °F";
                    humidEl.textContent = "Humidity: " + weatherData.current.humidity + "%";
                    windEl.textContent = "Wind Speed: " + weatherData.current.wind_speed + " MPH";
                    uviEl.textContent = "UVI: " + weatherData.current.uvi;
                    if (weatherData.current.uvi < 3) {
                        uviEl.style.backgroundColor = "green";
                        uviEl.style.color = "white";
                    } else if (weatherData.current.uvi < 7) {
                        uviEl.style.backgroundColor = "yellow";
                        uviEl.style.color = "black";
                    } else {
                        uviEl.style.backgroundColor = "red";
                        uviEl.style.color = "white";
                    };
                    var date = moment.unix(weatherData.current.dt).format("MM/DD/YYYY");
                    dateEl.textContent = city + " " + date;
                    var iconImg = $("<img>");
                    iconImg.attr("src", "https://openweathermap.org/img/w/" + weatherIcon + ".png");
                    iconImg.appendTo(dateEl);
                    document.getElementById("future-header").textContent = "5 Day Forecast:"
                    futureEl.innerHTML = "";
                    for (var i = 0; i < 5; i++) {
                        var col = document.createElement("div");
                        col.setAttribute("class", "col");
                        var cards = document.createElement("div");
                        cards.setAttribute("class", "card");
                        var cardBody = document.createElement("div");
                        cardBody.setAttribute("class", "card-body");
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
            })
        })
    })
}

containerEl.addEventListener("click", function (e) {
    console.log(e.target);
    var city = e.target.getAttribute("data-city");
    showWeatherData(city)
})

accessCityForm.addEventListener("submit", function (event) {
    event.preventDefault();
    getDataBack.classList.remove("weather");
    getDataBack.style.display = "block";
    var city = document.getElementById("city").value;
    saveSearch(city);
    showWeatherData(city)


})

clearEl.addEventListener("click", function() {
    localStorage.removeItem("searchHistoryList");
    containerEl.innerHTML = "";
    searchHistory = [];
})




function saveSearch(city) {
    searchHistory.push(city);
    localStorage.setItem("searchHistoryList", JSON.stringify(searchHistory));
    containerEl.innerHTML = "";
    for (var i = 0; i < searchHistory.length; i++) {
        var btn = document.createElement("button");
        btn.textContent = searchHistory[i];
        btn.classList.add("searched-city");
        btn.setAttribute("data-city", searchHistory[i]);
        containerEl.append(btn);
    }
}







