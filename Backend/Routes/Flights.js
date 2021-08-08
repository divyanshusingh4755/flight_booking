var express = require("express");
const { addFlight, getAllFlight, findFlight, filterFlight } = require("../Controllers/Flights");

const router = express.Router();

router.post("/add-flight", addFlight);
router.get("/get-flight", getAllFlight);
router.post("/find-flight", findFlight);
router.post("/filter-flight", filterFlight);

module.exports = router