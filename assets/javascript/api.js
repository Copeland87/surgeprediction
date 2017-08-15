$(document).ready(function () {

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
    database = firebase.database();


    var ref = database.ref("saving-data");
    var popRef = ref.child("rain");
    var tmRef = ref.child("ticketMaster");
    var tmEventRef = ref.child("ticketMaster").child("tmObject").child("page");

    //  ----------  FUCKING WEATHER API BULLSHIT  ---------
    function weather() {

        // weatherURL = "http://api.wunderground.com/api/050cc66bcd917a79/geolookup/hourly/q/autoip.json"; 
        var weatherThings;
        $.ajax({
            url: "http://api.wunderground.com/api/050cc66bcd917a79/geolookup/hourly/q/autoip.json",
            method: "GET"
        }).done(function (response) {
            console.log(response);

            for (i = 0; i < 3; i++) {
                // updating html to make sure this loop is working, it will be useless later
                $("#hourlyForecast").append(" " + response.hourly_forecast[i].pop + " rain for hour " + i + ".");
            }
            var rainRef = ref.child("rain");
            rainRef.update({
                hour1: response.hourly_forecast[0].pop,
                hour2: response.hourly_forecast[1].pop,
                hour3: response.hourly_forecast[2].pop
            });
        })
    };
    weather();

    function ticketMasterThings() {
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
            type: "GET",
            
            // -- geopoint five miles date/time, categories of sports & music
            url: "https://app.ticketmaster.com/discovery/v2/events.json?apikey=xk2KuXCdtzC0ssvGGZAk2ysiqOtl0dd1&geoPoint&radius=5&unit=miles&startDateTime=" + tmURL + "Z&classificationName=Sports&classificationId=KZFzniwnSyZfZ7v7nJ",
            // THIS IS WHAT THE tmURL SHOULD BE RECREATING "2017-08-09T18:52:00Z&endDateTime=2017-08-09T21:53:00"
            async: true,
            dataType: "json",
            success: function (json) {
                console.log(json);
                // Parse the response.
                // Do other things.

                // This is accessing the child 'tickMaster'
                var tmRef = ref.child("ticketMaster");
                // updates fb with the object
                tmRef.update({
                    tmObject: json,
                });

                // This will reference the firebase and print the info to the console & HTML       
                tmRef.orderByChild("tmObject").on("child_added", function (snapshot) {
                    console.log(snapshot.key + " has " + snapshot.val().page.number + " events");
                    $("#numOfEvents").append("There are " + snapshot.val().page.number + " events during the next three hours");
                });
            },
            error: function (xhr, status, err) {
                // This time, we do not end up here!
            }
        });

    };
    ticketMasterThings();

    // ---------- BEGIN LOGIC FOR FUCKING BULLSHIT ----------
    function state() {
        var POP = 0;
        var eventTrue;
        var state = 0;
        // sets var for CURRENT POP to compare in the things below
        popRef.on("value", function (snapshot) {

            currentPOP = snapshot.val();
            console.log("current pop: " + currentPOP.hour1);
            POP = currentPOP.hour1;
            console.log("pop" + POP);

            // sets var for an event ending this hour
            tmEventRef.on("value", function (snapshot) {
                var wholeObj = snapshot.val();
                console.log("wholeObj " + wholeObj.number);
                var evntNow = wholeObj.number;
                console.log("number of events evntNow " + evntNow);

                if (evntNow > 0) {
                    eventTrue = true;
                    console.log("event happening this hour: " + eventTrue);
                }
                else {
                    eventTrue = false;
                }
                // ---------------- KEY FOR STATE VALUES ----------------
                // RAIN >85 +5
                // RAIN >75 +4
                // RAIN >50 +3
                // EVENT ENDING THIS HOUR + 5
                // 10 = 99% CHANCE OF SURGE 
                // 9 = 95% CHANCE OF SURGE
                // 8 = 85%
                // 5 = 80%
                // 4 = 75%
                // 3 = 50%

                if (POP >= 85 && eventTrue === true) {

                    state = 99;
                }
                else if (POP >= 75 & POP < 85 && eventTrue === true) {

                    state = 92;
                }
                else if (POP >= 50 & POP < 75 && eventTrue === true) {

                    state = 85;
                }

                else if (POP >= 85 || eventTrue === true) {

                    state = 75;
                }
                else if (POP >= 75) {

                    state = 70;
                }
                else if (POP >= 50) {

                    state = 50;
                }
                else if (POP >= 25) {

                    state = 25;
                }
                else if (POP >= 10) {

                    state = 10;
                }
                else if (POP < 10 & POP != 0) {

                    state = 5;
                }
                else {
                    state = 0;
                }
                console.log(POP);
                console.log(state);
                var fireState = ref.child("state");
                fireState.update({
                    state: state
                });

            });


        });

    };
    state();
// end of doc ready
});