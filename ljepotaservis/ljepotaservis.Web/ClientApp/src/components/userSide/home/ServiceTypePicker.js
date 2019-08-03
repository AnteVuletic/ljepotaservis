import React from "react";

const ServiceTypePicker = props => (
  <div>
    <button onClick={() => props.onServiceTypeChange("All")}>Sve</button>
    <button onClick={() => props.onServiceTypeChange("Hairdressing")}>
      Firzerske usluge
    </button>
    <button onClick={() => props.onServiceTypeChange("Cosmetic")}>
      Kozmetičke usluge
    </button>
  </div>
);

export default ServiceTypePicker;
