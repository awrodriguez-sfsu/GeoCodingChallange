/**
 * Created by arod on 6/29/16.
 */

var express = require('express');
var requestObject = require('request');
var db = require('./db_storage');

var router = express.Router();

var EARTH_RADIUS_MILES = 3961;

/* API for getting property list */
router.get('/', function (request, response, next) {
    var lat = request.query.lat;
    var lng = request.query.lng;

    var address = request.query.address;

    var distance = request.query.distance;
    if(distance == null) {
        distance = 20;
    }

    if((lat == null || lng == null) && address != null) {
        var url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + address + '&key=AIzaSyDj6uSb4YcqR7hTgSsPduuQ9gsfM4Lf4-k';

        requestObject.get(url, function(error, res, body) {
            body = JSON.parse(body);
            handleResponse(response, body.results[0].geometry.location, distance);
        });
    } else {
        handleResponse(response, {lat: lat, lng: lng}, distance);
    }

});

router.get('/property/:id', function(request, response, next) {
    var id = request.params.id;

    var property = db.getProperty(id);

    var jsonObj = JSON.stringify(property);

    response.set('Content-Type', 'application/json');
    response.status(200).json(jsonObj);
    response.end();
});

function handleResponse(response, location, distance) {
    var propertyList = db.getAllProperties();

    if(isNaN(location.lat) || isNaN(location.lng)) {
        return redirectTo400(response);
    }

    var results = [];
    for(var i = 0; i < propertyList.length; i++) {
        if(Math.abs(location.lat - propertyList[i].lat) < .3) {
            if(inRange({lat: propertyList[i].lat, lng: propertyList[i].long}, location, distance)) {
                results.push(propertyList[i]);
            }
        }
    }

    var jsonObj = JSON.stringify(results);

    response.set('Content-Type', 'application/json');
    response.status(200).json(jsonObj);
    response.end();
}

function redirectTo400(response) {
    var responseText = '400 Bad Request: lat and lng must me float';

    response.set('Content-Type', 'application/json');
    response.status(400).json(responseText);
    response.end();
}

module.exports = router;

function inRange(location1, location2, distance) {
    var lat1 = degree2rad(location1.lat);
    var lng1 = degree2rad(location1.lng);

    var lat2 = degree2rad(location2.lat);
    var lng2 = degree2rad(location2.lng);

    var deltaLat = lat2 - lat1;
    var deltaLng = lng2 - lng1;

    var a = Math.pow(Math.sin(deltaLat / 2), 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(deltaLng / 2), 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    var distanceMiles = c * EARTH_RADIUS_MILES;

    return distanceMiles <= distance;
}

function degree2rad(degree) {
    return degree * Math.PI / 180;
}
