import React from "react";
import DatePicker from "react-datepicker";

const Filters = props => {
  const { dateTime, onDateChange, onFilter } = props;

  return (
    <div>
      <h5>Datum i vrijeme:</h5>
      <DatePicker
        selected={dateTime}
        onChange={onDateChange}
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={15}
        dateFormat="MMMM d, yyyy HH:mm"
        timeCaption="time"
        minDate={new Date()}
      />
      <button onClick={onFilter}>Filtriraj</button>
    </div>
  );
};

export default Filters;
