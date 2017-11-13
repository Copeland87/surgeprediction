# Surge Prediction

## Why We Made This

### Problem
* Using ride-sharing apps can be unpredictably expensive.
* Local environmental factors (Weather | Social & Sporting Events) cause demand for drivers, and fares increase to meet this demand.
### Solution
* Local events and weather predictions are compared in a logical way, to provide users with the likelyhood (%) of a fare surge for the next three hours.
* Users are able to call a Lyft directly from the site.

## How Does It Work?
### Information Gathering
* First, data is gathered from the following API
    * Weather Underground (Weather info: Percepitation, Incliment weather)
    * Google Maps && Places (Traffic Data)
    * Ticket Master (Event Start & End Times | Number of Events | 5 Mile Radius)
    * Lyft
### Logic
* Logic for % Chance of Fare Surge:
    * Current weather, and current + 2 hours
    * Local events beginning and ending within the hour, and the following two hours
    * Predicted likelyhood offare surge increases as incliment weather increases, or with presence of events. Both conditions occuring at the same time dramatically increase the likelyhood of a surge in pricing.
### Tech Used
* JavaScript / jQuery
* Firebase (Data Storage)
* Chart.js (Graphical Display of Prediciton)
* Ajax 


