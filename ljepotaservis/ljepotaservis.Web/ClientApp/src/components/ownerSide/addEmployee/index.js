import React, { Component } from "react";
import NewEmployee from "./NewEmployee";

export default class AddServices extends Component {
  constructor(props) {
    super(props);

    this.state = {
      employees: []
    };
  }

  componentDidMount() {
    //fetch services i poslat ih u state
  }

  handleAddEmployee = employeeToAdd => {
    this.setState(state => ({
      employees: [...state.employees, employeeToAdd]
    }));

    //http request post koji vraca listu postojecih zaposlenika
  };

  handleRemoveEmployee = employeeToRemove => {
    this.setState(state => ({
      employee: state.employees.filter(
        employee => employee.id !== employeeToRemove.id
      )
    }));

    // http request here
  };

  render() {
    return (
      <div>
        <h3>Zaposlenici</h3>
        <ul>
          {this.state.employees.map(employee => (
            <li key={employee.id}>
              Ime: {employee.firstName} Prezime: {employee.lastName}
              <button onClick={() => this.handleRemoveEmployee(employee)}>
                Obriši zaposlenika
              </button>
            </li>
          ))}
        </ul>
        <NewEmployee onAddEmployee={this.handleAddEmployee} />
      </div>
    );
  }
}
