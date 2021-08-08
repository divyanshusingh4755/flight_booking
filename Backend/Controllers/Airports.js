const Airports = require("../models/Airports");

const addAirport = async (req, res) => {
    try {
        const airports = req.body;

        const addAirport = await Airports.insertMany(airports);

        res.status(200).json({
            data: addAirport
        });
    }
    catch (e) {
        console.log(e)
    }
}

const getAirport = async (req, res) => {
    try {
        const airport = await Airports.find()

        res.status(200).json({
            data: airport
        })
    } catch (e) {
        console.log(e)
    }
}


const getSpecificAirport = async (req, res) => {
    const { query } = req.body;
    try {
        const airport = await Airports.find({ $text: { $search: query } })
            .select({ "score": { "$meta": "textScore" } })
            .sort({ "score": { "$meta": "textScore" } })

        res.status(200).send({
            data: airport
        })
    } catch (e) {
        console.log(e)
    }
}
module.exports = { addAirport, getAirport, getSpecificAirport };