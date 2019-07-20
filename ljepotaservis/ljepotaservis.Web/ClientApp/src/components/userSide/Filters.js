import React from "react";
import { DropdownButton, MenuItem, Button } from "react-bootstrap";
import DateTimePicker from "react-datetime-picker";

export default function Filters(props) {
  const {
    selectedService,
    onSelect,
    dateTime,
    onDateChange,
    serviceOptions
  } = props;
  //Date selector lose radi
  return (
    <div style={{ margin: "5px", padding: "20px" }}>
      <h5>Service:</h5>
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
      <br />
      <h5>Date and time: </h5>
      <DateTimePicker
        value={dateTime}
        clearIcon={null}
        format="dd/MM/yyyy HH:mm"
        minDate={new Date()}
        onChange={onDateChange}
      />
      <br />
      <br />
      <Button bsStyle="success">Apply filters</Button>
    </div>
  );
}
