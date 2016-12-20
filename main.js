$(document).ready(function(){
  $('body').hide();
  var fullApi;
  locationVar = navigator.geolocation;
  locationVar.getCurrentPosition(success, failure);
  var currentWeatherDegrees;
  var convertedToCelsius;

 function success(position) {
      var myLat  = position.coords.latitude;
      var myLong = position.coords.longitude;
      $("#lat").append(myLat)
      $("#long").append(myLong)
      var apiPath = "http://api.openweathermap.org/data/2.5/weather?";
      var apiKey = "54bb8217ac16dd3a3f7de14d4e768e9a";
      var api = apiPath + "lat=" + myLat + "&lon=" + myLong + "&units=imperial" + "&APPID=" + apiKey;
      console.log(api);


      $.ajax({url: api , success : function(weatherData){
          console.log(weatherData);
          var currentWeatherDegrees = Math.round(weatherData.main.temp);
          var cityName = weatherData.name;
          var countryName = weatherData.sys.country;
          var weatherId = weatherData.weather[0];
          var weatherDescription = weatherData.weather[0].description
          ;
          var humidity = weatherData.main.humidity;

          //celcius conversion
          var convertedToCelsius = Math.round((currentWeatherDegrees - 32) * 1.8);

          $('#unitedKingdom').click(function(){
              $("#temp").empty();
              $("#temp").prepend(convertedToCelsius + " Degrees Celsius");
            });
             
             $('#unitedStates').click(function(){

              $("#temp").empty();
              $("#temp").prepend(currentWeatherDegrees + " Degrees Fahrenheit");
          });


          $('body').show();
          $("#temp").hide().prepend(currentWeatherDegrees).fadeIn(900);
          $("#cityName").hide().append(cityName).fadeIn(900);
          $("#countryName").hide().append(countryName).fadeIn(900);
          $("#weatherDescription").hide().append(weatherDescription).fadeIn(900);
          
          $("#humidity").hide().append(humidity).fadeIn(900);

          
          //rain
          if (weatherId >= 300 && weatherId <= 531) {
            $('body').css('background-image', 'url(https://source.unsplash.com/HNx4QLRgy2k/1600x900)');
          }

          //snow
          else if (weatherId >= 600 && weatherId <= 622)  {
            
            $('body').css('background-image', 'url(https://source.unsplash.com/67t2GJcD5PI/1600x900)');

          }

            //thunderstorms
          else if (weatherId >= 200 && weatherId <= 232) {
            
            $('body').css('background-image', 'url(https://source.unsplash.com/td7G4W1HSIE/1600x900)');
          }

          //really hot
          else if (currentWeatherDegrees >= 90) {
            
            $('body').css('background-image', 'url(https://source.unsplash.com/KVdfkteD34U/1600x900)');
          }

          //kinda hot
          else if (currentWeatherDegrees >= 75) {
            
            $('body').css('background-image', 'url(https://source.unsplash.com/V63oM8OPJSo/1600x900)');
          }

          //ideal weather
          else if (currentWeatherDegrees >= 55) {
            
            $('body').css('background-image', 'url(https://source.unsplash.com/A8UG9NpS5OU/1600x900)');
          }

          //cool
          else if (currentWeatherDegrees >= 32) {
            
            $('body').css('background-image', 'url(https://source.unsplash.com/GZwg03HNrno/1600x900)');
          }

          //cold
          else if (currentWeatherDegrees >= 20) {
            
            $('body').css('background-image', 'url(https://source.unsplash.com/LyPngX5sVm8/1600x900)');
          }

          //freezing cold!
          else {
            
            $('body').css('background-image', 'url(https://source.unsplash.com/-rNlq4IN_1k/1600x900)');
          }

          
      }
      

    });
  }

  function failure(position) {
    alert("Location services are not permited right now. App cannot function")

  }

  
});

