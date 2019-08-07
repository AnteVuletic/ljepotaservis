import React from "react";
import Calendar from "../../utilComponents/Calendar";
import "../../../styling/calendar/calendar.css";

const DatePicker = props => {
  return (
    <React.Fragment>
      <header className="header__calendar">Odaberi datum</header>
      <Calendar selected={props.date} onChange={props.onChange} />
    </React.Fragment>
  );
};

export default DatePicker;
