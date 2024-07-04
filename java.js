$(document).ready(function() {
    $("#searchForm").on("submit", function(event) {
      event.preventDefault();
      var city = $("#cityInput").val();
      var apiKey = "YOUR_API_KEY";
      var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;
  
      $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
        var cityName = response.name;
        var temperature = response.main.temp;
        var humidity = response.main.humidity;
        var windSpeed = response.wind.speed;
  
        $("#weatherInfo").html(`
          <h2>${cityName}</h2>
          <p>Temperature: ${temperature} K</p>
          <p>Humidity: ${humidity}%</p>
          <p>Wind Speed: ${windSpeed} m/s</p>
        `);
  
        // Save search history
        var searchItem = `<div class="searchItem" data-city="${cityName}">${cityName}</div>`;
        $("#searchHistory").append(searchItem);
  
        // Future weather forecast
        var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + apiKey;
        $.ajax({
          url: forecastURL,
          method: "GET"
        }).then(function(forecastResponse) {
          var forecastData = forecastResponse.list;
          $("#weatherInfo").append("<h3>5-Day Forecast:</h3>");
          for (var i = 0; i < forecastData.length; i += 8) {
            var date = forecastData[i].dt_txt;
            var temp = forecastData[i].main.temp;
            var humidity = forecastData[i].main.humidity;
            var icon = forecastData[i].weather[0].icon;
            $("#weatherInfo").append(`
              <div class="forecast">
                <p>Date: ${date}</p>
                <p>Temperature: ${temp} K</p>
                <p>Humidity: ${humidity}%</p>
                <img src="http://openweathermap.org/img/w/${icon}.png" alt="Weather Icon">
              </div>
            `);
          }
        });
      });
    });
  
    $(document).on("click", ".searchItem", function() {
      var city = $(this).data("city");
      // Trigger search for the selected city
      $("#cityInput").val(city);
      $("#searchForm").submit();
    });
  });