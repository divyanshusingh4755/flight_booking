import React, { useEffect, useRef, useState } from "react";
import './FlightSearch.css'
import TripData from "./TripData";
import DatePicker from "react-datepicker";
import { API_URL } from "../constants"
import axios from "axios";
import moment from "moment";

function FlightSearch() {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [oneway, setOneWay] = useState(true);
    const [roundTrip, setRoundTrip] = useState(false);
    const [oneWayPrice, setOneWayPrice] = useState("")
    const [returnPrice, setReturnPrice] = useState("")
    const wrapperRef = useRef(null);

    // state for flight search
    const [from, setFrom] = useState("");
    const [destination, setDestination] = useState("");
    const [savedFrom, setSavedFrom] = useState("");
    const [savedDestination, setSavedDestination] = useState("");

    const [fromData, setFromData] = useState([]);
    const [destionationData, setDestinationData] = useState([]);

    const [oneWayFlight, setOneWayFlight] = useState([]);
    const [returnFlight, setReturnFlight] = useState([]);

    // one way price
    const [oneWayPriceArray, setOnePriceArray] = useState([]);
    const [minOneWayPrice, setMinOneWayPrice] = useState("");
    const [maxOneWayPrice, setMaxOneWayPrice] = useState("");

    // return way price
    const [returnWayPriceArray, setReturnPriceArray] = useState([]);
    const [minReturnWayPrice, setMinReturnWayPrice] = useState("");
    const [maxReturnWayPrice, setMaxReturnWayPrice] = useState("");



    function handleFromChange(e) {
        setFrom(e.target.value)
    }

    function handleDestinationChange(e) {
        setDestination(e.target.value)
    }


    useEffect(() => {
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setFromData([]);
                setDestinationData([]);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [wrapperRef]);


    useEffect(() => {
        if (from.length > 3) {
            const query = {
                query: from
            }
            axios.post(`${API_URL}/get-specific-airport`, query).then((response) => {
                if (response.data.data) {
                    setFromData(response.data.data);

                }

            })
        }
    }, [from])

    useEffect(() => {
        if (destination.length > 3) {
            const query = {
                query: destination
            }
            axios.post(`${API_URL}/get-specific-airport`, query).then((response) => {
                if (response.data.data) {
                    setDestinationData(response.data.data);
                }

            })
        }
    }, [destination])


    const selectFrom = (id) => {
        setFrom(id)
        setFromData([]);
    }

    const selectDestination = (id) => {
        setDestination(id)
        setDestinationData([]);
    }

    const oneWayPriceChange = (e) => {
        setOneWayPrice(e.target.value);
    }
    const returnPriceChange = (e) => {
        setReturnPrice(e.target.value);
    }

    useEffect(() => {

        const data = {
            from: savedFrom.toUpperCase(),
            destination: savedDestination.toUpperCase(),
            date: moment(startDate).format("YYYY-MM-DD"),
            minPrice: Number(minOneWayPrice),
            maxPrice: Number(oneWayPrice)
        }

        axios.post(`${API_URL}/filter-flight`, data).then((response) => {
            if (response.data.data) {
                setOneWayFlight(response.data.data)
            }

        })

    }, [oneWayPrice])

    useEffect(() => {

        const data = {
            from: savedDestination.toUpperCase(),
            destination: savedFrom.toUpperCase(),
            date: moment(endDate).format("YYYY-MM-DD"),
            minPrice: Number(minReturnWayPrice),
            maxPrice: Number(returnPrice)
        }
        axios.post(`${API_URL}/filter-flight`, data).then((response) => {
            if (response.data.data) {
                setReturnFlight(response.data.data)
            }

        })

    }, [returnPrice])


    const handleSubmit = (e) => {
        e.preventDefault();

        setSavedFrom(from)
        setSavedDestination(destination)

        if (roundTrip) {
            const data = {
                from: destination.toUpperCase(),
                destination: from.toUpperCase(),
                date: moment(endDate).format("YYYY-MM-DD"),
                price: ""
            }
            axios.post(`${API_URL}/find-flight`, data).then((response) => {
                var returnwayprice = []
                if (response.data.data) {
                    response.data.data.forEach((price) => {
                        returnwayprice.push(price.flight_price)
                    })
                    setReturnPriceArray(returnwayprice)
                    setReturnFlight(response.data.data)

                    // setting maximum and minimum price
                    const minPrice = Math.min(...returnwayprice)
                    const maxPrice = Math.max(...returnwayprice)

                    setMinReturnWayPrice(minPrice);
                    setMaxReturnWayPrice(maxPrice)

                }

            })

        }

        const data = {
            from: from.toUpperCase(),
            destination: destination.toUpperCase(),
            date: moment(startDate).format("YYYY-MM-DD"),
            price: ""
        }

        axios.post(`${API_URL}/find-flight`, data).then((response) => {
            var onewayprice = []
            if (response.data.data) {
                response.data.data.forEach((price) => {
                    onewayprice.push(price.flight_price)
                })

                setOnePriceArray(onewayprice)
                setOneWayFlight(response.data.data)

                // setting maximum and minimum price
                const minPrice = Math.min(...onewayprice)
                const maxPrice = Math.max(...onewayprice)

                setMinOneWayPrice(minPrice);
                setMaxOneWayPrice(maxPrice)

            }
        })
    }

    return (
        <>
            <div className="card">
                <h2 className="card-heading">Search Flight</h2>
                <div className="flight-trip">
                    <span className={oneway ? "flight-trip-switch active" : "flight-trip-switch"} onClick={() => {
                        setOneWay(true)
                        setRoundTrip(false)
                        setEndDate(null)
                        setReturnFlight([])
                    }
                    }>One Way</span>
                    <span className={roundTrip ? "flight-trip-switch active" : "flight-trip-switch"} onClick={() => {
                        setOneWay(false)
                        setRoundTrip(true)
                    }}>Round Trip</span>
                </div>
                <form>
                    <div className="search-card search-card-inner">

                        <div className="form-group">
                            <input
                                type="search"
                                value={from.toUpperCase()}
                                placeholder="From"
                                onChange={handleFromChange}
                                required
                            />
                            {
                                fromData.length > 0 && from.length > 3 ? (
                                    <div className="suggestion-from" ref={wrapperRef}>
                                        <ul className="suggestion-from-list">
                                            {
                                                fromData.map((data) => {
                                                    return (
                                                        <>
                                                            <li key={data._id} onClick={() => selectFrom(data.iata_code,)} className="suggestion-from-data">
                                                                <b>{data.iata_code}</b>{" - "}{data.name}{", "}{data.country}
                                                            </li>
                                                            <hr />
                                                        </>
                                                    )
                                                })
                                            }
                                            <hr />
                                        </ul>
                                    </div>
                                ) :
                                    (
                                        ""
                                    )
                            }
                        </div>

                        <div className="form-group">
                            <input
                                type="search"
                                placeholder="Destination"
                                value={destination.toUpperCase()}
                                onChange={handleDestinationChange}
                                required
                            />
                            {
                                destionationData.length > 0 && destination.length > 3 ? (
                                    <div className="suggestion-destination" ref={wrapperRef}>
                                        <ul className="suggestion-destination-list">
                                            {
                                                destionationData.map((data) => {
                                                    return (
                                                        <>
                                                            <li key={data._id} onClick={() => selectDestination(data.iata_code,)} className="suggestion-from-data">
                                                                <b>{data.iata_code}</b>{" - "}{data.name}{", "}{data.country}
                                                            </li>
                                                            <hr />
                                                        </>
                                                    )
                                                })
                                            }
                                            <hr />
                                        </ul>
                                    </div>
                                ) :
                                    (
                                        ""
                                    )
                            }
                        </div>

                        <div className="form-group">
                            <DatePicker
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                                selectsStart
                                startDate={startDate}
                                endDate={endDate}
                                placeholderText="Departure"
                                className="form-control"
                            />
                        </div>

                        <div className="form-group">
                            <DatePicker
                                disabled={!roundTrip}
                                selected={endDate}
                                onChange={(date) => setEndDate(date)}
                                selectsEnd
                                startDate={startDate}
                                endDate={endDate}
                                minDate={startDate}
                                placeholderText="Return"
                            />
                        </div>

                        <button className="search-button" type="submit" onClick={handleSubmit}>Search</button>
                    </div>
                </form>
            </div>


            <div className="data">
                {
                    oneWayFlight.length > 0 && (
                        <div className="filter-card">
                            <h2 className="filter-heading">Filter</h2>
                            <hr className="filter-line" />
                            {
                                oneWayFlight.length > 0 && (
                                    <>
                                        <h4 className="filter-heading">One way Price</h4>
                                        <span className="range-slider">{minOneWayPrice}</span><input onChange={oneWayPriceChange} type="range" min={minOneWayPrice} max={maxOneWayPrice} /><span className="range-slider">{maxOneWayPrice}</span>
                                    </>
                                )
                            }

                            {
                                returnFlight.length > 0 && (
                                    <>
                                        <h4 className="filter-heading">Return Price</h4>
                                        <span className="range-slider">{minReturnWayPrice}</span><input onChange={returnPriceChange} type="range" min={minReturnWayPrice} max={maxReturnWayPrice} /><span className="range-slider">{maxReturnWayPrice}</span>
                                    </>
                                )
                            }
                        </div>
                    )
                }


                {/* for one way */}
                <div className={!oneway ? "content-card-half" : "content-card"}>
                    {
                        oneWayFlight.length > 0 ? (
                            <>
                                {
                                    oneWayFlight.map((flight, id) => {
                                        return (
                                            <TripData key={id} {...flight} />
                                        )
                                    })
                                }
                            </>
                        )
                            :
                            "No Single Trip Flights Found"
                    }

                </div>

                {/* For Return */}
                {
                    !oneway && (
                        <>
                            <div className={!oneway ? "content-card-half" : "content-card"}>
                                {
                                    returnFlight.length > 0 ? (
                                        <>
                                            {
                                                returnFlight.map((flight, id) => {
                                                    return (
                                                        <TripData key={id} {...flight} />
                                                    )
                                                })
                                            }
                                        </>
                                    )
                                        :
                                        "No Return Flights Found"
                                }
                            </div>
                        </>
                    )}
            </div>
        </>
    )
}

export default FlightSearch;