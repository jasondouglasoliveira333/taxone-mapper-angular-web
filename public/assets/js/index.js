let map;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -23.5438633, lng: -46.8155989 },
    zoom: 20,
  });
}

window.initMap = initMap;