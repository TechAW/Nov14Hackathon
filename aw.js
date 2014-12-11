
function buildMap() {
	var addresses = [{"Lat":36.169991,"Long":-115.14200},{"Lat":36.1699412,"Long":-115.13983}];
    var map;
    var elevator;
    var myOptions = {
        zoom: 15,
        center: new google.maps.LatLng(36.169941, -115.13983),
        mapTypeId: 'terrain'
    };
    map = new google.maps.Map($('#map_canvas')[0], myOptions);

    addresses.forEach(function(geocode) {
        var latlng = new google.maps.LatLng(geocode.Lat, geocode.Long);
        new google.maps.Marker({
            position: latlng,
            map: map,
        icon: "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
        });
		
		var options = {
		  strokeColor: '#FF0000',
		  strokeOpacity: 0.8,
		  strokeWeight: 2,
		  fillColor: '#FF0000',
		  fillOpacity: 0.35,
		  map: map,
		  center: latlng,
		  radius: 75
		};
		// Add the circle for this city to the map.
		cityCircle = new google.maps.Circle(options);
    });
}
function register() {
	var phone = $('#phone-number').val();
	var lat = $('#lat').val();
	var lng = $('#lng').val();
	
	console.log("Sending ",{ phone : phone, lat : lat, lng : lng });
	var request = $.ajax({
	  url: "http://54.148.111.245/api/users",
	  type: "POST",
	  data: { phone : phone, lat : lat, lng : lng },
	  dataType: "json"
	});
	request.done(function( msg ) {
		console.log(msg);
		$('#user-success').show('slow');
	});
	event.preventDefault();
}

function buildAtrocitiesTable() {
	var request = $.ajax({
	  url: "http://54.148.111.245/admin/atrocities/all",
	  type: "GET",
	  dataType: "json"
	});
	request.done(function( res ) {
		var i = 1;
		res.forEach(function(row) {
			if (i < 20) $('#at-table-body').append('<tr><td>' + row.reportedDate + '</td><td>'+row.description+'</td></tr>');
			i++;
		});
	});
}

$( document ).ready(function() {
	$("#location").geocomplete({
		details: "form"
	}); 
	$('#register').on('click',register);
	buildAtrocitiesTable();
	buildMap();
});
