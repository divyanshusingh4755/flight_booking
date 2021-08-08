var express = require("express");
var cors = require("cors");
var mongoose = require("mongoose")
var Airports = require("./Routes/Airports");
var Flights = require("./Routes/Flights");

const app = express();

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use('/api', Airports);
app.use('/api', Flights);

app.get("/", (req, res) => {
    res.send("Hello to Flight Booking API")
})


mongoose.connect('mongodb+srv://divyanshu:itsmywish@cluster0.5wif7.mongodb.net/Cluster0?retryWrites=true&w=majority', {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log("MongoDB Connected")
})


app.listen(5000, function () {
    console.log("Server is listening");
})