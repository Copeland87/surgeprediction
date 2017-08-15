var map, infoWindow;
      function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -34.397, lng: 150.644},
          zoom: 15
        });
        infoWindow = new google.maps.InfoWindow;

        var trafficLayer = new google.maps.TrafficLayer();
        var transitLayer = new google.maps.TransitLayer();
        var bikeLayer = new google.maps.BicyclingLayer();
    
          $('#traffic-b').click(function(){
            trafficLayer.setMap(map);
            transitLayer.setMap(null);
            bikeLayer.setMap(null);
          });
          $('#transit-b').click(function(){
            trafficLayer.setMap(null);
            transitLayer.setMap(map);
            bikeLayer.setMap(null);
          });
          $('#bike-b').click(function(){
            trafficLayer.setMap(null);
            transitLayer.setMap(null);
            bikeLayer.setMap(map);
          });
  

        // Try HTML5 geolocation.
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent('Location found.');
            infoWindow.open(map);
            map.setCenter(pos);
          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }
      }

      function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
      }