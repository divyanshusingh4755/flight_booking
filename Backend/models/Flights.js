const mongoose = require("mongoose");

var flight = new mongoose.Schema({
    flight_date: {
        type: Date
    },
    flight_status: {
        type: String
    },
    flight_price: {
        type: String
    },
    flight_via: [String],
    departure: {
        airport: {
            type: String
        },
        iata: {
            type: String
        },
        icao: {
            type: String
        },
        scheduled: {
            type: String
        }
    },
    arrival: {
        airport: {
            type: String
        },
        iata: {
            type: String
        },
        icao: {
            type: String
        },
        scheduled: {
            type: String
        }
    },
    airline: {
        name: {
            type: String
        },
        iata: {
            type: String
        },
        icao: {
            type: String
        },
        image: {
            type: String
        }
    }
})

flight.index({ "departure.iata": 1, "arrival.iata": 1 });

var Flights = mongoose.model("Flights", flight)

module.exports = Flights