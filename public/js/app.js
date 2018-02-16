$(document).ready(function() {
  const showMap = document.getElementById('map');
  let latitude;
  let longitude;
  let $temperature = $('#temperature');

  // Función para acceder al api DarkSky
  let getApiWheater = (data) => {
    let currentlyWheater = data.currently;
    console.log(data);
    // console.log(currentlyWheater.temperature);
    let temperatureFarenheit = currentlyWheater.temperature;
    let temperatureCentigrados = parseInt(((temperatureFarenheit - 32) * 5 / (9.340)), 10);
    // console.log(temperatureCentigrados); // 23° convertidos de farenheit
    let summary = currentlyWheater.summary;
    console.log(summary);
    let humidity = currentlyWheater.humidity;
    let summary2 = data.daily.summary;

    $('#temperature').text(`${temperatureCentigrados}º`);
    $('#summary').text(summary);
    $('#humidity').text(humidity);
    $('#summary2').text(summary2);
  };

  // En caso el usuario no acepte conocer ubicación
  let error = () => {
    console.log('no se ingresó nada');
  };

  if (navigator.geolocation) {
    // alert('Puedes usar geolocalización en tu dispositivo');
    let getPosition = (position) => {
      console.log(position.coords.latitude);
      console.log(position.coords.longitude);
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;
      // guardando en localstorage
      localStorage.lat = latitude;
      localStorage.long = longitude;

      var proxy = 'https://cors-anywhere.herokuapp.com/';
      var apiLinkDS = `https://api.darksky.net/forecast/5ff2d970aaf45a79eb77da634a352045/${latitude},${longitude}`;
      $.ajax({
        url: proxy + apiLinkDS,
        success: getApiWheater
      });
    };
    navigator.geolocation.getCurrentPosition(getPosition, error);
  } else {
    alert('No se pudo ubicarte');
  }

  $('#predictions').on('click', function() {
    window.location.href = 'views/week.html';
  });
});