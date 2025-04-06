import React from "react";

function SingleSummary({date, summaryStat, year, text}) {
    return (
        <div>
            <h1>{`${date} ${summaryStat}`}</h1>
            <h3>{year}</h3>
            <h3>{text}</h3>
        </div>
    )
}

export default SingleSummary;