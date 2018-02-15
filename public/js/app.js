$(document).ready(function () {
  const showMap = document.getElementById('map');
  let latitude;
  let longitude;

  if (navigator.geolocation) {
    alert('Puedes usar geolocalización en tu dispositivo');
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
      console.log(apiLinkDS);

      $.ajax({
        url: proxy + apiLinkDS,
        success: getApiWheater
      });
    }

    function getApiWheater(data){
      console.log(data);
    }

    let error = () => {
      // En caso el usuario no acepte conocer ubicación
      console.log('no se ingresó nada');
    }
    navigator.geolocation.getCurrentPosition(getPosition, error);

    function weather(e){
      console.log(e)
    }

    function handleError() {
      console.log('Se ha presentado un error');
    }

  } else {
    alert('No se pudo ubicarte');
  }

});