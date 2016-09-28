import Express from 'express';
import requestObject from 'request';
import Database from '../database/db_storage';

const routes = Express.Router();

routes.get('/', (request, response, next) => {
  const responseBody = {
    '/': 'This API guide',
    '/properties/?(lat=<lat>&lng=<lng> | address=<address>)(&distance=<distance>)?': 'List of properties within \<distance\> miles of either \<address\> or \<lat\>,\<lng\>',
    '/property/<id>/': 'property with given \<id\>'
  };

  response.set('Content-Type', 'application/json');
  response.set('Access-Control-Allow-Origin', 'http://localhost:3000');
  response.status(200).json(responseBody);
  response.end();
});

routes.get('/properties/', (request, response, next) => {
  let { lat, lng, address, distance } = request.query;

  if(distance == null) {
      distance = 20;
  }

  if((lat == null || lng == null) && address != null) {
    const url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + address + '&key=AIzaSyDj6uSb4YcqR7hTgSsPduuQ9gsfM4Lf4-k';

    requestObject.get(url, (error, res, body) => {
      body = JSON.parse(body);
      handleResponse(response, body.results[0].geometry.location, distance);
    });
  } else {
    handleResponse(response, {lat, lng}, distance);
  }
});

routes.get('/property/:id', (request, response, next) => {
  const id = request.params.id;

  const property = Database.getProperty(id);

  const jsonObj = JSON.stringify(property);

  response.set('Content-Type', 'application/json');
  response.set('Access-Control-Allow-Origin', 'http://localhost:3000');
  response.status(200).json(jsonObj);
  response.end();
});

function handleResponse(response, location, distance) {
  const propertyList = Database.getAllProperties();

  if(isNaN(location.lat) || isNaN(location.lng)) {
      return redirectTo400(response);
  }

  let results = [];
  for(let i = 0; i < propertyList.length; i++) {
      if(Math.abs(location.lat - propertyList[i].lat) < .3) {
          if(inRange({lat: propertyList[i].lat, lng: propertyList[i].long}, location, distance)) {
              results.push(propertyList[i]);
          }
      }
  }

  const jsonObj = JSON.stringify(results);

  response.set('Content-Type', 'application/json');
  response.set('Access-Control-Allow-Origin', 'http://localhost:3000');
  response.status(200).json(jsonObj);
  response.end();
}

function redirectTo400(response) {
  const responseText = '400 Bad Request: lat and lng must me float';

  response.set('Content-Type', 'application/json');
  response.set('Access-Control-Allow-Origin', 'http://localhost:3000');
  response.status(400).json(responseText);
  response.end();
}

const EARTH_RADIUS_MILES = 3961;

function inRange(location1, location2, distance) {
  const lat1 = degree2rad(location1.lat);
  const lng1 = degree2rad(location1.lng);

  const lat2 = degree2rad(location2.lat);
  const lng2 = degree2rad(location2.lng);

  const deltaLat = lat2 - lat1;
  const deltaLng = lng2 - lng1;

  const a = Math.pow(Math.sin(deltaLat / 2), 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(deltaLng / 2), 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distanceMiles = c * EARTH_RADIUS_MILES;

  return distanceMiles <= distance;
}

function degree2rad(degree) {
  return degree * Math.PI / 180;
}

export default routes;
