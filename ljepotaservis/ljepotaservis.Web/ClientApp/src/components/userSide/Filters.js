import React from "react";
import { DropdownButton, MenuItem, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";

export default function Filters(props) {
  const {
    selectedService,
    onSelect,
    dateTime,
    onDateChange,
    serviceOptions
  } = props;

  return (
    <div style={{ margin: "5px", padding: "20px" }}>
      <h5>Usluge:</h5>
      <DropdownButton
        title={selectedService}
        onSelect={onSelect}
        id="document-type"
      >
        {serviceOptions.map((service, i) => (
          <MenuItem key={i} eventKey={i}>
            {service}
          </MenuItem>
        ))}
      </DropdownButton>
      <h5>Datum i vrijeme: </h5>
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
      <Button bsStyle="success">Filtriraj</Button>
    </div>
  );
}
