var searchFormEl = document.querySelector('#search-form');

function handleSearchFormSubmit(event) {
  event.preventDefault();

  var searchInputVal = document.querySelector('#search-input').value;

  if (!searchInputVal) {
    console.error('You need a search input value!');
    return;
  }
  var queryString = './index.html?q=' + searchInputVal;

  location.assign(queryString);

  searchApi(searchInputVal);
};

var city = 'Brisbane';

var requestUrl = 'http://api.openweathermap.org/geo/1.0/direct?q='+ city +'&limit=5&appid=f51dae6f34b6662dee7748eebb1dcd61';
    fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      var lat = data[0].lat;
      var long = data[0].lon;
      console.log(lat);
      console.log(long);
    });

    var weatherQueryUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat='+ lat +'&lon='+ long +'&appid=f51dae6f34b6662dee7748eebb1dcd61';


// function searchApi(city) {
    // var requestUrl = 'http://api.openweathermap.org/geo/1.0/direct?q='+ city +'&limit=5&appid=f51dae6f34b6662dee7748eebb1dcd61';
    // fetch(requestUrl)
    // .then(function (response) {
    //   return response.json();
    // })
    // .then(function (data) {
    //   console.log(data)
    // });

    // var lat = 100;
    // var long = 100;
    // var weatherQueryUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat='+ lat +'&lon='+ long +'&appid=f51dae6f34b6662dee7748eebb1dcd61';
  
    // fetch(weatherQueryUrl)
    //   .then(function (response) {
    //     if (!response.ok) {
    //       throw response.json();
    //     }
    //     return response.json();
    //   })
    //   .then(function (weatherRes) {
    //     // write query to page so user knows what they are viewing
    //    console.log(weatherRes)
    //   })
    //   .catch(function (error) {
    //     console.error(error);
    //   });
  // };

  searchFormEl.addEventListener("submit", handleSearchFormSubmit);