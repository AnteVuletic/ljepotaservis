import React from "react";

const EmployeePicker = props => {
  return (
    <React.Fragment>
      <h5>Odaberite zaposlenika</h5>
      {props.employees.map(employee => (
        <h6 key={employee.id} onClick={() => props.onClick(employee)}>
          {employee.firstName} {employee.lastName}
        </h6>
      ))}
    </React.Fragment>
  );
};

export default EmployeePicker;
