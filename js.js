var lat;
var lon;
function geolocation(){
        if(!navigator.geolocation)
        return null;
    navigator.geolocation.getCurrentPosition((pos)=>{
        lat = document.getElementById("lat").innerText = pos.coords.latitude;
        lon = document.getElementById("lon").innerText = pos.coords.longitude;
        initMap();
    })    
}

function initMap(){
     const uluru = {lat: lat, lng:lon};
    map = new google.maps.Map(document.getElementById('map'),{
        center: uluru,
        zoom:12,
    });
    const marker = new google.maps.Marker({
        position: uluru,
        map: map,
    });
    const final = new google.maps.Marker({
        position: {lat: -23.192075, lng: -45.88987 },
        map: map,
    });
}
geolocation();

