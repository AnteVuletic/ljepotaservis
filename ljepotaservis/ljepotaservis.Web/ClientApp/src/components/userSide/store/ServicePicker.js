import React from "react";

const ServicePicker = props => {
  const handleChange = event => {
    console.log(event.target.value);
  };

  return (
    <form>
      {props.services.map(service => (
        <input
          key={service.id}
          type="checkbox"
          value={service.name}
          onChange={handleChange}
        />
      ))}
    </form>
  );
};

export default ServicePicker;
