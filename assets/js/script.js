//   

// function handleSearchFormSubmit(event) {
//   event.preventDefault();

//   var searchInputVal = document.querySelector('#search-input').value;
//   console.log(searchInputVal);
  
//   localStorage.setItem("City", searchInputVal);

// };

function locationFetch() {
  var city = 'Brisbane';
  localStorage.setItem("City", city);
  var requestUrl = 'http://api.openweathermap.org/geo/1.0/direct?q='+ city +'&limit=5&appid=f51dae6f34b6662dee7748eebb1dcd61';
      fetch(requestUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        var lat = data[0].lat;
        var long = data[0].lon;
        localStorage.setItem("Latitude", lat);
        localStorage.setItem("Longditude", long);
        return;
      })
  };

function searchApi() {

    var lat = localStorage.getItem('Latitude');
    var long = localStorage.getItem('Longditude');
    var weatherQueryUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat='+ lat +'&lon='+ long + '&units=imperial&appid=f51dae6f34b6662dee7748eebb1dcd61';

    fetch(weatherQueryUrl)
      .then(function (response) {
        if (!response.ok) {
          throw response.json();
        }
        return response.json();
      })
      .then(function (weatherRes) {
       for (var i = 2; i < 41 ; i= i+9) {
          printResults(weatherRes.list[i]);
        }
      })
      };

  function printResults(data){
    var dateTime = data.dt_txt;
    var date = dateTime.match(/^(\S+)\s(.*)/).slice(1)[0];
    var icon = 'http://openweathermap.org/img/wn/' + data.weather[0].icon + '.png';
    var temperature = data.main.temp;
    var wind = data.wind.speed;
    var humidity = data.main.humidity;


    

  }
  


  //searchFormEl.addEventListener('click', handleSearchFormSubmit);
  locationFetch();
  searchApi();