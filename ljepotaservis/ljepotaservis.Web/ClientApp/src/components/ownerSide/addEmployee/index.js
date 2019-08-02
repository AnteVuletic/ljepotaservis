import React, { Component } from "react";
import NewEmployee from "./NewEmployee";
import { getStoreEmployees, addEditEmployees } from "../../../services/ownerServices";

export default class AddServices extends Component {
  constructor(props) {
    super(props);

    this.state = {
      employees: []
    };
  }

  componentDidMount() {
    this.loadEmployees();
  }

  loadEmployees = () => {
    getStoreEmployees().then(employees =>{
      this.setState({
        employees
      });
    });
  }

  handleAddEmployee = employeeToAdd => {
    addEditEmployees([...this.state.employees, employeeToAdd])
    .then(() => {
      this.loadEmployees();
    });
  };

  handleRemoveEmployee = employeeToRemove => {
    const employees = this.state.employees.filter(
      employee => employee.id !== employeeToRemove.id
    );

    addEditEmployees(employees)
    .then(() => {
      this.loadEmployees();
    });
  };

  render() {
    return (
      <div>
        <h3>Zaposlenici</h3>
        <ul>
          {this.state.employees.map(employee => (
            <li key={employee.id}>
              Ime: {employee.firstname} Prezime: {employee.lastname}
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
