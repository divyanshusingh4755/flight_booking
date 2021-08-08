const mongoose = require("mongoose");

var airports = new mongoose.Schema({
    name: {
        type: String
    },
    city: {
        type: String
    },
    country: {
        type: String
    },

    iata_code: {
        type: String
    },
    _geoloc: {
        lat: {
            type: Number
        },
        lng: {
            type: Number
        }
    },
    links_count: {
        type: Number
    },
    objectID: {
        type: String
    }
})
airports.index({ name: 'text', city: 'text', country: 'text', iata_code: 'text' });

var Airports = mongoose.model('Airports', airports);

module.exports = Airports