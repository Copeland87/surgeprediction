$(document).ready(function(){	

    // ----------  GOOGLE MAPS API  ----------
    // Note: This example requires that you consent to location sharing when
    // prompted by your browser. If you see the error "The Geolocation service
    // failed.", it means you probably did not give permission for the browser to
    // locate you.
                //     var map, infoWindow, geocoder;

                //     function initMap() {
                //         map = new google.maps.Map(document.getElementById('map'), {
                //             center: { lat: -34.397, lng: 150.644 },
                //             zoom: 6
                //         });
                //         infoWindow = new google.maps.InfoWindow;
                //         geocoder = new google.maps.Geocoder;
                //         // Try HTML5 geolocation.
                //         if (navigator.geolocation) {
                //             navigator.geolocation.getCurrentPosition(function (position) {
                //                 var pos = {
                //                     lat: position.coords.latitude,
                //                     lng: position.coords.longitude,
                //                 };
                //                 console.log(pos);

                //                 infoWindow.setPosition(pos);
                //                 infoWindow.setContent('Location found.');
                //                 infoWindow.open(map);
                //                 map.setCenter(pos);
                //                 geocodeLatLng(geocoder, map, infoWindow);
                //             }, function () {
                //                 handleLocationError(true, infoWindow, map.getCenter());
                //                 handleLocationError(true, infoWindow, map.getGeometricCenter());
                //                 console.log(getGeometricCenter)
                                
                //             });
                //         } else {
                //             // Browser doesn't support Geolocation
                //             handleLocationError(false, infoWindow, map.getCenter());
                //         }
                //     };

                //     function handleLocationError(browserHasGeolocation, infoWindow, pos) {
                //         infoWindow.setPosition(pos);
                //         infoWindow.setContent(browserHasGeolocation ?
                //             'Error: The Geolocation service failed.' :
                //             'Error: Your browser doesn\'t support geolocation.');
                //         infoWindow.open(map);
                //     };

                //     // reverse geocoding
                // function geocodeLatLng(geocoder, map, infowindow) {
                //         //var input = document.getElementById('latlng').value;
                //         //var latlngStr = input.split(',', 2);
                //         var latlng = {lat: parseFloat(38.8999428), lng: parseFloat(-94.7260105)};
                //         geocoder.geocode({'location': latlng}, function(results, status) {
                //             if (status === 'OK') {
                //             if (results[1]) {
                //             map.setZoom(11);
                //             var marker = new google.maps.Marker({
                //                 position: latlng,
                //                 map: map
                //             });
                //             infowindow.setContent(results[1].formatted_address);
                //             console.log(results[1].formatted_address);
                //             infowindow.open(map, marker);
                            
                //             var zipCode = results[0].address_components[7].long_name;
                //             $("#zipCode").html(zipCode);
                //             console.log(zipCode);
                //             } else {
                //             window.alert('No results found');
                //             }
                //         } else {
                //             window.alert('Geocoder failed due to: ' + status);
                //         }
                //         });
                //     };

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCCy8pzN-PhzClI9_biA_eNwXlK77CMrtw",
    authDomain: "surgeprediction.firebaseapp.com",
    databaseURL: "https://surgeprediction.firebaseio.com",
    projectId: "surgeprediction",
    storageBucket: "surgeprediction.appspot.com",
    messagingSenderId: "807686524220"
  };
  firebase.initializeApp(config);

   //  ----------  FUCKING WEATHER API BULLSHIT  ---------
   function weather() {
    
   // weatherURL = "http://api.wunderground.com/api/050cc66bcd917a79/geolookup/hourly/q/autoip.json"; 
    $.ajax({
            url: "http://api.wunderground.com/api/050cc66bcd917a79/geolookup/hourly/q/autoip.json",
            method: "GET"
        }).done(function (response) {
            console.log(response);
            for (i = 0; i < 3; i++) {
                $("#hourlyForecast").append(" " +response.hourly_forecast[i].pop + " rain for hour " + i +"." );
                // state(response.hourly_forecast[i].pop, i);
                hourlyRain = response.hourly_forecast[i].pop;
                database.ref().push({
                    hourlyRain : hourlyRain,

                });
            }
           // $("#hourlyForecast").html(response.hourly_forecast[0].pop + "% hour 1. " + response.hourly_forecast[1].pop+ "% hour 2 " + response.hourly_forecast[2].pop + "% hour 3");
        })

   };
    weather();

//  --------- TICKETMASTER URL FUCKING-BULLSHIT  ----------
var currentTime = moment();
console.log(currentTime);
currentTimeFormatted = moment(currentTime).format("YYYY-MM-DD HH:mm");
console.log(currentTimeFormatted);
var urlCurrentDate = moment(currentTimeFormatted).format("YYYY-MM-DD");
console.log(urlCurrentDate);
var urlCurrentTime = moment(currentTimeFormatted).format("HH:mm:ss");
console.log(urlCurrentTime);
var urlEndTime = currentTime.add(moment.duration(3, 'hours')).format("HH:mm:ss");
console.log(urlEndTime);
var tmURL = urlCurrentDate + "T" + urlCurrentTime + "Z&endDateTime=" + urlCurrentDate + "T" + urlEndTime;
console.log(tmURL);

//  ----------  TICKET MASTER FUCKING BULLSHIT  ----------
 $.ajax({
  type:"GET",
  //--ORIGINAL--
  // url:"https://app.ticketmaster.com/discovery/v2/events.json?size=1?geoPoint&apikey=xk2KuXCdtzC0ssvGGZAk2ysiqOtl0dd1",
  //---This is geopoint & 5 mile radius---
  //  url: "https://app.ticketmaster.com/discovery/v2/events.json?apikey=xk2KuXCdtzC0ssvGGZAk2ysiqOtl0dd1&geoPoint&radius=5&unit=miles",
  // --- geopoint & 5mile radius & date & time, bitches
  // url: "https://app.ticketmaster.com/discovery/v2/events.json?apikey=xk2KuXCdtzC0ssvGGZAk2ysiqOtl0dd1&geoPoint&radius=5&unit=miles&startDateTime=2017-08-09T18:52:00Z&endDateTime=2017-08-09T21:53:00Z",
  // -- geopoint five miles date/time, categories of sports & music
  url: "https://app.ticketmaster.com/discovery/v2/events.json?apikey=xk2KuXCdtzC0ssvGGZAk2ysiqOtl0dd1&geoPoint&radius=5&unit=miles&startDateTime="+tmURL+"Z&classificationName=Sports&classificationId=KZFzniwnSyZfZ7v7nJ",
  // THIS IS WHAT THE tmURL SHOULD BE RECREATING "2017-08-09T18:52:00Z&endDateTime=2017-08-09T21:53:00"
  async:true,
  dataType: "json",
  success: function(json) {
              console.log(json);
              // Parse the response.
              // Do other things.
           },
  error: function(xhr, status, err) {
              // This time, we do not end up here!
           }
});

  $('#submit-train').on('click',function(){
  	event.preventDefault();
  	name = $('#train-name').val().trim();
  	destination = $('#train-destination').val().trim();
  	freakquency = $('#train-Freakquency').val().trim();
  	arrival = $('#train-arrival').val().trim();

  	database.ref().push({
  		name : name,
  		destination : destination,
		freakquency : freakquency,
		arrival : arrival,
  		
	  });
	
  	
  });

    //  ----------  CREATE ARRAY WITH API INFO TO POPULATE AJAX CALL 9IF POSSIBLE  ---------
    // arrURL = [
    //     weatherURL : "http://api.wunderground.com/api/050cc66bcd917a79/geolookup/hourly/q/autoip.json",
    //     ticketMasterURL = "https://app.ticketmaster.com/discovery/v2/events.json?apikey=xk2KuXCdtzC0ssvGGZAk2ysiqOtl0dd1&geoPoint&radius=5&unit=miles&startDateTime="+tmURL+"Z&classificationName=Sports&classificationId=KZFzniwnSyZfZ7v7nJ",
    // ];



   

    // ---------- BEGIN LOGIC FOR FUCKING BULLSHIT ----------
    // CREATE A GLOBAL STATE ARRAY 
    // state1 variable state2 variable && state3 variable ----- THIS FUNCTION PUSHES TO GLOBAL STATE ARRAY
    // -----DREW---- I have started coding how to set the states, but it isn't finsiehd (basically some flushed out psuedo code)
    // -----I think it is better to just set state1 to the rain percentage, and then do another compare of rainState and ticketmaster info
    // function rainState(random, i) {
    //     state1 = 0;
    //     state2 = 0;
    //     state3 = 0;
    //     //console.log(random);
    //     if (response.hourly_forecast[i].pop >= 85) {
    //         console.log("greater than 85% chance of rain");
    //         state1 = 85;
    //     }
    //     else if (response.hourly_forecast[i].pop >= 85) {
    //         console.log("greater than 75% change of rain");
    //         state1 = 75;
    //     }
    //     if (response.hourly_forecast[i].pop >= 85) {
    //         console.log("greater than 50% change of rain");
    //         state1 = 50;
    //     }
        

    // }

 });