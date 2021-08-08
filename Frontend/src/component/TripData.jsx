import React from "react"
import moment from "moment"

function TripData({ airline, arrival, departure, flight_price, flight_via }) {

    const time_dffernce = moment.utc(moment(departure).diff(moment(arrival))).format("HH:mm:ss")

    return (
        <div className="content-card-data">
            <div className="image-data">
                <img className="image" src={airline?.image} alt="" />
                <span className="image-text">{airline?.name}</span>
            </div>
            <div className="content-data">
                <p className="country">{departure?.iata}</p>
                <p className="time">{moment(departure?.scheduled).format("hh:mm")}</p>
            </div>
            <div className="content-data">
                <p className="travel-time">{time_dffernce}</p>
                <p className="travel-time">{flight_via?.length > 0 ? <>{`${flight_via?.length} STOP`}</> : "NON-STOP"}</p>
            </div>
            <div className="content-data">
                <p className="country">{arrival?.iata}</p>
                <p className="time">{moment(arrival?.scheduled).format("hh:mm")}</p>
            </div>
            <p className="price">${flight_price}</p>
        </div>
    )
}

export default TripData;