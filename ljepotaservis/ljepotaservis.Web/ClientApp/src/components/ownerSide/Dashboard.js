import React, { Component } from "react";

class OwnerDashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      employees: [],
      selectedEmployee: null
    };
  }

  componentDidMount() {
    const employees = [
      {
        id: 1,
        firstName: "Jure",
        lastName: "Miric",
        reservations: [
          { date: new Date(), customer: { id: 1, firstName: "Ivana" } },
          { date: new Date(), customer: { id: 2, firstName: "Milan" } }
        ]
      },
      {
        id: 2,
        firstName: "Mila",
        lastName: "Miric",
        reservations: [
          { date: new Date(), customer: { id: 3, firstName: "Mirko" } }
        ]
      }
    ];
    this.setState({ employees, selectedEmployee: employees[0] });
  }

  render() {
    return (
      <React.Fragment>
        {this.state.employees.map(employee => (
          <span
            key={employee.id}
            onClick={() => this.setState({ selectedEmployee: employee })}
            style={
              this.state.selectedEmployee.id === employee.id
                ? { border: "solid red 3px" }
                : null
            }
          >
            {employee.firstName} {employee.lastName}
          </span>
        ))}
        <ul>
          {this.state.selectedEmployee &&
            this.state.selectedEmployee.reservations.map(reservation => (
              <li key={reservation.customer.id}>
                Klijent: {reservation.customer.firstName}
                Datum: {reservation.date.toString()}
              </li>
            ))}
        </ul>
      </React.Fragment>
    );
  }
}

export default OwnerDashboard;
