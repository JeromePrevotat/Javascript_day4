const getLocationBtn = document.getElementById("getLocationBtn");
const locationInfo = document.getElementById("location-info");
const mapContainer = document.getElementById("map");
let map;
let positionMarker = L.marker();

function getLocation(){
    let latitude;
    let longitude;
    navigator.geolocation.getCurrentPosition((position) => {
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
        locationInfo.textContent = `Latitude: ${latitude}, Longitude: ${longitude}`;
        map = map.setView([latitude, longitude], 15);
        positionMarker = positionMarker.setLatLng([latitude, longitude]).addTo(map);

        console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
    },
    (error) => {
        console.error("Error getting location:", error);
    },
    // OPTIONS timeout, accuracy, max cached
    { timeout: 5000, enableHighAccuracy: true, maximumAge: 2000 });
}

function addEventListeners() {
    console.log("Listeners added");
    getLocationBtn.addEventListener("click", getLocation);
}

function addMapCredits(map){
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);
}

function initMap(mapContainer) {
    map = L.map(mapContainer).setView([45.77, 3.09], 12);
    addMapCredits(map);
    console.log("Map initialized");
}

function main(){
    console.log("Geolocation module loaded successfully");
    if (!navigator.geolocation) console.error("Geolocation is not supported by this browser.");
    addEventListeners();
    initMap(mapContainer);
}

main();