import React from "react";
import "../../../styling/store/servicepicker.css"
import "../../../styling/store/summary.css"
import DateSummary from "./DateSummary";
import Rating from "../../utilComponents/Rating";

const ReservationSummary = props => {
  let totalPrice = 0;

  return (
    <main className="summary__container">
      <div className="servicepicker servicepicker__container__summary">
        <h5 className="servicepicker__header">Odabrane usluge:</h5>
        <table className="servicepicker__service__container">
          <tbody> 
          {props.reservation.services.map(service => {
            totalPrice += service.price;
            return (
              <tr key={service.id} className="service__item service__item--selected">
                <td>
                <span className="servicepicker__service__name">
                    {service.name}
                  </span>
                  <span className="servicepicker__service__duration">
                    {service.duration.slice(0, 5)} hh:min
                  </span>
                </td>
                <td>
                  {service.price} kn
                </td>
              </tr>
            );
          })}
          </tbody>
        </table>
      <div className="summary__total">
        <h5>Total: {totalPrice} kn</h5>
      </div>
      <div className="summary__employees">
        {
          props.employees.map((employee, index) => 
            <article key={index} 
                    className={employee.id === props.reservation.employee.id ? "employee__picked" : ""}>
              <div className="employee__image__wrapper">
                <div className="aspect__ratio">
                  <img
                    src={`https://ljepotaservisweb.azurewebsites.net/images/${employee.imageName}`}
                    alt="Employee"
                  />
                </div>
              </div>
              <div className="emplyoee__description__name">
                {employee.firstName} {employee.lastName}
                <Rating score={employee.rating} colorClass={"star-pink"} />
              </div>
            </article>
          )
        }
      </div>
      </div>
      <DateSummary
        date={props.reservation.date}
        appoitment={`${props.reservation.date.getHours()} : ${props.reservation.date.getMinutes()}`}
      />
    </main>
  );
};

export default ReservationSummary;
