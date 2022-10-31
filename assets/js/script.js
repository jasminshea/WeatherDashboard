var cardsEl = document.querySelector('#card-container');
var historyEl = document.querySelector('#searchHistory');
var searchFormEl = document.querySelector('#search-form');
var currentDayEl = document.querySelector('#currentDay');

function printResults(data){
  var dateTime = data.dt_txt;
  var date = dateTime.match(/^(\S+)\s(.*)/).slice(1)[0];
  localStorage.setItem("Today", date);
  var icon = "http://openweathermap.org/img/wn/" + data.weather[0].icon + ".png";
  var temperature = data.main.temp;
  var wind = data.wind.speed;
  var humidity = data.main.humidity;

  var resultsCard = document.createElement('div');
  resultsCard.classList.add('card', 'bg-primary', 'bg-gradient', 'text-white', 'mb-3', 'p-5', 'd-inline');

  var iconContentEl = document.createElement('a');
  iconContentEl.setAttribute('src', icon);

  var datesContentEl = document.createElement('h4');
  datesContentEl.innerHTML = '<strong> ' + date + '</strong>';

  var tempsContentEl = document.createElement('p');
  tempsContentEl.innerHTML = 'Temp: ' + temperature + 'F';

  var windsContentEl = document.createElement('p');
  windsContentEl.innerHTML = 'Wind: ' + wind + ' MPH';

  var humidsContentEl = document.createElement('p');
  humidsContentEl.innerHTML = 'Humidity: ' + humidity + '%';

  var resultsBody = document.createElement('div');
  resultsCard.append(resultsBody);

  resultsBody.append(datesContentEl, tempsContentEl, windsContentEl, humidsContentEl);

  cardsEl.append(resultsCard);
};

function todayWeather(data){
  var title = localStorage.getItem("City");
  var dateTime = data.dt_txt;
  var date = dateTime.match(/^(\S+)\s(.*)/).slice(1)[0];
  var icon = 'http://openweathermap.org/img/wn/' + data.weather[0].icon + '.png';
  var temperature = data.main.temp;
  var wind = data.wind.speed;
  var humidity = data.main.humidity;

  var resultCard = document.createElement('div');
  resultCard.classList.add('card', 'mb-3', 'p-5', 'd-inline', 'shadow-none');
  
  var titleContentEl = document.createElement('h1');
  titleContentEl.innerHTML = '<strong> ' + title + '</strong>' + '<strong>   ' + date + '</strong>';

  var tempContentEl = document.createElement('p');
  tempContentEl.innerHTML = 'Temp: ' + temperature + 'F';

  var windContentEl = document.createElement('p');
  windContentEl.innerHTML = 'Wind: ' + wind + ' MPH';

  var humidContentEl = document.createElement('p');
  humidContentEl.innerHTML = 'Humidity: ' + humidity + '%';

  var resultBody = document.createElement('div');
  resultCard.append(resultBody);

  resultBody.append(titleContentEl, tempContentEl, windContentEl, humidContentEl);

  resultCard.append(resultBody);

  currentDayEl.append(resultCard);
};


// function historyDisplay(){
//   var cities = JSON.parse(localStorage.getItem('CityHistory'));


//   for (i = 0; i < cities.length; i++){
//     var historyContentEl = document.createElement('div');
//     historyContentEl.classList.add('card');

//     var titleContentEl = document.createElement('a');
//     titleContentEl.title = cities[i];

//     historyContentEl.append(titleContentEl);

//     historyEl.append(historyContentEl);
//   };

// };

function locationFetch(city) {
  localStorage.setItem("City", city);
  var requestUrl = 'https://api.openweathermap.org/geo/1.0/direct?q='+ city +'&limit=5&appid=f51dae6f34b6662dee7748eebb1dcd61';
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
        todayWeather(weatherRes.list[0]);
       for (var i = 2; i < 41 ; i= i+9) {
          printResults(weatherRes.list[i]);
        }
      })
      };
  
      function handleSearchFormSubmit(event) {
        event.preventDefault();
      
        while(cardsEl.firstChild){
          cardsEl.removeChild(cardsEl.firstChild);
        }

        while(currentDayEl.firstChild){
          currentDayEl.removeChild(currentDayEl.firstChild);
        }
      
        var searchInputVal = document.querySelector('#search-input').value;
        console.log(searchInputVal);
        
        localStorage.setItem("City", searchInputVal);
      
        locationFetch(searchInputVal);
        searchApi();


        // if (!localStorage.getItem("CityHistory")){
        //   var cityNames = [];
        //   cityNames.push(searchInputVal);
        //   localStorage.setItem("CityHistory", JSON.stringify(cityNames));
        //   return;
        // } else {
        //   var storedNames = JSON.parse(localStorage.getItem("City-Storage"));
        //   storedNames.push(searchInputVal);
        //   localStorage.setItem("CityHistory", JSON.stringify(storedNames));
        // };

        // historyDisplay();
      };

  // historyDisplay();
  searchFormEl.addEventListener('click', handleSearchFormSubmit);
