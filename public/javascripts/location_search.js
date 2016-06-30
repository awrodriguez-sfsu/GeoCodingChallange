/**
 * Created by arod on 6/28/16.
 */

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

    $('.modal-trigger').click(function(event) {
        event.preventDefault();

        console.log($(this));

        var id = $(this).attr('id');
        id = id.split('-')[1];

        $.ajax({
            url: '/list/get/' + id,
            success: function(response) {
                $('#property-modal #modal-image').attr('src', response.image_url);
                $('#property-modal #address1').val(response.address);
                $('#property-modal #address2').val(response.city + ', ' + response.state + ' ' + response.zip);

            },
            error: function(xhr) {
                console.log(xhr);
            }
        })

    });
}

function convertToLatLng(input, callback) {
    $.ajax({
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
    $.ajax({
        url: '/list',
        data: {lat: location.lat, lng: location.lng},
        success: function(response) {
            var results = JSON.parse(response);
            mapDrawCircle(location);
            displayResults(results);
        },
        error: function(xhr) {
            console.log(xhr);
        }
    });
}

$(document).ready(locationMain);
