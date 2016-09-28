function displayResults(results) {
  adjustMapDisplay();
  mapResults(results);
  hideSearch();

  var listView = $('.results .results-container .table-view');

  for(var i = 0; i < results.length; i++) {
    var resultContainer = createResult(results[i]);
    listView.append(resultContainer);
  }

  $('.results').show();
}

function adjustMapDisplay() {
  $('#map').addClass('results');
}

function mapResults(results) {
  var properties = [];
  for(var i = 0; i < results.length; i++) {
    properties.push({
      lat: results[i].lat,
      lng: results[i].long,
      title: results[i].address,
      content: "<a><img class='thumbnail' src='" + results[i].image_url + "' ><p>" + results[i].address + "</p></a>"
    });
  }

  mapDrawMarkers(properties);
}

function hideSearch() {
  $('#search_form').hide();
}

function createResult(result) {
  var anchorWrapper = $('<a class="property-view modal-trigger" id="property-' + result.id + '"></a>');
  var container = $('<div class="list-view"></div>');
  var address1 = $('<p>' + result.address + '</p>');
  var address2 = $('<p>' + result.city + ', ' + result.state + ' ' + result.zip + '</p>');
  var image = $('<img class="property-thumbnail" src="' + result.image_url + '" />');

  container.append(address1);
  container.append(address2);
  container.append(image);

  anchorWrapper.append(container);

  return anchorWrapper;
}
