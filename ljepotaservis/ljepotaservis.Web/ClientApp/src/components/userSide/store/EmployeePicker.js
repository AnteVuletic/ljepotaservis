import React from "react";
import "../../../styling/store/employeepicker.css";
import Rating from "../../utilComponents/Rating";

const EmployeePicker = props => {
  return (
    <React.Fragment>
      <h5 className="employee__header">Odaberite zaposlenika</h5>
      <main className="employee__wrapper">
        {props.employees.map(employee => (
          <article
            className={props.currentEmployee && props.currentEmployee.Id === employee.Id ? "employee__tile employee__tile--selected" : "employee__tile"}
            key={employee.id}
            onClick={() => props.onClick(employee)}
          >
            <div className="employee__tile__image__wrapper">
              <div className="aspect__ratio">
                <img
                  src={`https://ljepotaservisweb.azurewebsites.net/images/${employee.imageName}`}
                  alt="Employee"
                />
              </div>
            </div>
            <div className="employee__tile__description">
              <div className="emplyoee__tile__description__name">
                {employee.firstName} {employee.lastName}
                <Rating score={employee.rating} colorClass={"star-pink"} />
              </div>
              <div className="employee__tile__description__shift">
                <span>Radno vrijeme:</span>
                <span>{employee.startEndShift}</span>
              </div>
            </div>
          </article>
        ))}
      </main>
    </React.Fragment>
  );
};

export default EmployeePicker;
