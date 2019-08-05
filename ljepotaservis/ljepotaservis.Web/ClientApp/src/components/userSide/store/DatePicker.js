import React from "react";
import Calendar from "../../utilComponents/Calendar";

const DatePicker = props => {
  return (
    <React.Fragment>
      <Calendar selected={props.date} onChange={props.onChange} />
    </React.Fragment>
  );
};

export default DatePicker;
