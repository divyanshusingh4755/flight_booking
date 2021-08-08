const Flights = require("../models/Flights");

const addFlight = async (req, res) => {
    try {
        const data = req.body

        const flight = new Flights(data);
        const saveFlight = await flight.save()


        res.status(200).json({
            data: saveFlight
        })

    } catch (e) {
        console.log(e)
    }
}

const getAllFlight = async (req, res) => {
    try {
        const flight = await Flights.find()

        res.status(200).json({
            data: flight
        })

    } catch (e) {
        console.log(e)
    }
}

const findFlight = async (req, res) => {
    try {
        const { from, destination, date, price } = req.body

        const findFlight = await Flights.find({
            $or: [
                { "departure.iata": from, "arrival.iata": destination, flight_date: date },
                { flight_price: price }
            ]
        })

        res.status(200).json({
            data: findFlight
        })
    } catch (e) {
        console.log(e)
    }
}

const filterFlight = async (req, res) => {
    try {
        const { from, destination, date, minPrice, maxPrice } = req.body

        const findFlight = await Flights.find({
            $and: [
                { "departure.iata": from, "arrival.iata": destination, flight_date: date },
                { flight_price: { $gte: minPrice, $lte: maxPrice } }
            ]
        })

        res.status(200).json({
            data: findFlight
        })
    } catch (e) {
        console.log(e)
    }
}

module.exports = { addFlight, getAllFlight, findFlight, filterFlight }