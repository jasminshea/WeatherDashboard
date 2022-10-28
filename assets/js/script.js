//   

// function handleSearchFormSubmit(event) {
//   event.preventDefault();

//   var searchInputVal = document.querySelector('#search-input').value;
//   console.log(searchInputVal);
  
//   localStorage.setItem("City", searchInputVal);

// };

function locationFetch() {
  var city = 'Brisbane';
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
    var weatherQueryUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat='+ lat +'&lon='+ long +'&appid=f51dae6f34b6662dee7748eebb1dcd61';
    console.log(weatherQueryUrl);

    fetch(weatherQueryUrl)
      .then(function (response) {
        if (!response.ok) {
          throw response.json();
        }
        return response.json();
      })
      .then(function (weatherRes) {
        // write query to page so user knows what they are viewing
       console.log(weatherRes)
      })
  };

  //searchFormEl.addEventListener('click', handleSearchFormSubmit);
  locationFetch();
  searchApi();