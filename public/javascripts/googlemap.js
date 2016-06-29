/**
 * Created by arod on 6/29/16.
 */
var map;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 41, lng: -97},
        zoom: 5
    });
}
