var lat;
var lon;
function geolocation() {
    if (!navigator.geolocation)
        return null;
    navigator.geolocation.getCurrentPosition((pos) => {
        lat = document.getElementById("lat").innerText = pos.coords.latitude;
        lon = document.getElementById("lon").innerText = pos.coords.longitude;
        initMap();
    })
}
const image = "./person.png";
const pilon = "./pilon.png";

function initMap() {
    const uluru = { lat: lat, lng: lon };
    map = new google.maps.Map(document.getElementById('map'), {
        center: uluru,
        zoom: 7,
    });
    const marker = new google.maps.Marker({
        position: uluru,
        map: map,
        icon: image,
    });
    const final = new google.maps.Marker({
        position: { lat: -23.192075, lng: -45.88987 },
        map: map,
        icon: pilon,
    });

    //Distance Matrix para calcular a distância e o tempo entre dois pontos
    var origin1 = new google.maps.LatLng(lat, lon);
    var destinationA = new google.maps.LatLng(-23.192075, -45.88987);

    var service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix(
        {
            origins: [origin1],
            destinations: [destinationA],
            travelMode: 'DRIVING',
        }, callback);

    function callback(response, status) {
        var retorno = JSON.stringify(response);
        ret = document.getElementById("retorno").innerText = retorno;
        stat = document.getElementById("status").innerText = status;
        var new_end = response.originAddresses[0];
    }
    //******* Fim de Distance Matrix */
    var directionsService = new google.maps.DirectionsService();
    var directionsRenderer = new google.maps.DirectionsRenderer({suppressMarkers:true});
    
    directionsRenderer.setMap(map);
    calculateAndDisplayRoute(directionsService, directionsRenderer);
}
function calculateAndDisplayRoute(directionsService, directionsRenderer) {
    directionsService
        .route({
            origin: new_end,
            destination: "R. Euclídes Miragaia, 25 - Centro, São José dos Campos - SP, 12245-820, Brasil",
            travelMode: google.maps.TravelMode.DRIVING,
        })
        .then(function (response) {
            directionsRenderer.setDirections(response);
        })
        .catch(function (e) { return window.alert("Directions request failed due to " + status); });
}


geolocation();

