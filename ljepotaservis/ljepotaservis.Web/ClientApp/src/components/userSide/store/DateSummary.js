import React from "react";
import Calendar from "../../utilComponents/Calendar";
import "../../../styling/calendar/calendar.css";
import "../../../styling/store/summary.css"

const DateSummary = props => {

    return (
        <div className="summary__calendar">
            <div className="summary__appoitments">
                <span className="btn-base">{props.appoitment}</span>
            </div>
            <Calendar selected={props.date} onChange={() => {}}/>
        </div>
    );
}

export default DateSummary;
