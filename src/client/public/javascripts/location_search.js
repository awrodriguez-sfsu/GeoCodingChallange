function locationMain() {
  $('#search_submit').click(function(event) {
    var selected = $('#input_type_select option:selected').attr('name');

    var location;
    if(selected === 'lat-lng') {
        location = {lat: $('#search_field_lat').val(), lng: $('#search_field_lng').val()};
        getProperties(location);
    } else {
        var input = $('#search_field').val();
        convertToLatLng(input, getProperties);
    }
  });

  $('#input_type_select').change(function(event) {
    var selected = $('#input_type_select option:selected').attr('name');
    if(selected == 'lat-lng') {
        $('#search_field').hide();
        $('#search_field_lat').show();
        $('#search_field_lng').show();
    } else {
        $('#search_field_lat').hide();
        $('#search_field_lng').hide();
        $('#search_field').show();
    }
  });

  $('.table-view').delegate('.modal-trigger', 'click', function(event) {
    var id = $(this).attr('id');
    id = id.split('-')[1];

    $.get({
      url: 'http://localhost:3001/property/' + id,
      success: function(response) {
        response = JSON.parse(response);

        $('#modal-image').attr('src', response.image_url);
        $('#address1').html(response.address);
        $('#address2').html(response.city + ', ' + response.state + ' ' + response.zip);
        $('#property-modal').modal('show');
      },
      error: function(xhr) {
        console.log(xhr);
      }
    })
  });
}

function convertToLatLng(input, callback) {
  $.get({
    url: 'https://maps.googleapis.com/maps/api/geocode/json',
    data: {address: input, key: 'AIzaSyDj6uSb4YcqR7hTgSsPduuQ9gsfM4Lf4-k'},
    success: function(response) {
      callback(response.results[0].geometry.location);
    },
    error: function(xhr) {
      console.log(xhr);
    }
  });
}

function getProperties(location) {
  $.get({
    url: 'http://localhost:3001/properties/',
    data: {lat: location.lat, lng: location.lng},
    async: false,
    success: function(response) {
      const results = JSON.parse(response);
      mapDrawCircle(location);
      displayResults(results);
    },
    error: function(xhr) {
      console.log(xhr);
    }
  });
}

$(document).ready(locationMain);
