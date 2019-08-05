import React from "react";

const ReservationSummary = props => {
  let totalPrice = 0;

  return (
    <React.Fragment>
      <h5>
        Datum i vrijeme: {props.reservation.date.toDateString()}{" "}
        {props.reservation.date.getHours()}:
        {props.reservation.date.getMinutes()}
      </h5>
      <h3>Usluge:</h3>
      {props.reservation.services.map(service => {
        totalPrice += service.price;
        return (
          <h5 key={service.id}>
            {service.name} {service.price} kn
          </h5>
        );
      })}
      <h5>Total: {totalPrice}</h5>
    </React.Fragment>
  );
};

export default ReservationSummary;
