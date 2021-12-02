function createDrivingDirectionsMap() {
  navigator.geolocation.getCurrentPosition(OnSuccess, OnError, {
    enableHighAccuracy: true,
    maximumAge: 1000,
    // timeout: 500
  });
}

function OnSuccess(position) {
  showMap(
    position.coords.latitude,
    position.coords.longitude
  );
  console.log(position.coords.latitude)
  console.log(position.coords.longitude)
};

function OnError(error) {
  const mapDiv = document.getElementById("map");
  switch (error.code) {
    case error.PERMISSION_DENIED:
      mapDiv.innerHTML = "User denied the request for Geolocation."
      break;
    case error.POSITION_UNAVAILABLE:
      mapDiv.innerHTML = "Location information is unavailable."
      break;
    case error.TIMEOUT:
      mapDiv.innerHTML = "The request to get user location timed out."
      break;
    case error.UNKNOWN_ERROR:
      mapDiv.innerHTML = "An unknown error occurred."
      break;
  }
};

function showMap(lat, lang) {

  const directionsService = new google.maps.DirectionsService();
  const directionsRenderer = new google.maps.DirectionsRenderer();

  const route = {
    origin: new google.maps.LatLng(lat, lang),
    destination: "Grote Markt, Brussel",
    travelMode: google.maps.DirectionsTravelMode.DRIVING
  };

  const mapOptions = {
    zoom: 10,
    center: new google.maps.LatLng(50.8504500, 4.3487800),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  const map = new google.maps.Map(document.getElementById("map"), mapOptions);
  directionsRenderer.setMap(map);
  directionsRenderer.setPanel(document.getElementById("driving-directions"));
  directionsService.route(route, function (result, status) {
    if (status === google.maps.DirectionsStatus.OK) {
      directionsRenderer.setDirections(result);
    }
  });
}