var accessCityForm = document.getElementById("search-cities");
var inputCity = document.getElementById("city");
var key = "e37b1c350cc530571e0d70e62fce1f52";
var dateEl = document.getElementById("today-date");

accessCityForm.addEventListener("submit", function(event) {
    event.preventDefault();
    var inputCityValue = inputCity.value;
    fetch("http://api.openweathermap.org/geo/1.0/direct?q=" + inputCityValue + "&limit=1&appid=" + key).then(function(response) {
        return response.json().then(function(data) {
            var lat = data[0].lat;
            var lon = data[0].lon;
            fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=" + key).then(function(outcome) {
                return outcome.json().then(function(weatherData) {
                    var date = moment.unix(weatherData.current.dt).format("MM/DD/YYYY");
                    dateEl.textContent = date;
                });
            });

        })
    })
})







