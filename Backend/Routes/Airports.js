var express = require("express");
const { addAirport, getAirport, getSpecificAirport } = require("../Controllers/Airports");


const router = express.Router();

router.post("/add-airports", addAirport);
router.get("/get-airport", getAirport);
router.post("/get-specific-airport", getSpecificAirport);


module.exports = router;