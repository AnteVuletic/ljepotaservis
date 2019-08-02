import React, { Component } from "react";
import NewEmployee from "./NewEmployee";
import EditEmployee from "./EditEmployee";
import {
  getStoreEmployees,
  addEditEmployees
} from "../../../services/ownerServices";

export default class Employees extends Component {
  constructor(props) {
    super(props);

    this.state = {
      employees: [],
      employeeBeingEdited: null
    };
  }

  componentDidMount() {
    this.loadEmployees();
  }

  loadEmployees = () => {
    getStoreEmployees().then(employees => {
      this.setState({
        employees
      });
    });
  };

  handleAddEmployee = employeeToAdd => {
    addEditEmployees([...this.state.employees, employeeToAdd]).then(() => {
      this.loadEmployees();
    });
  };

  handleRemoveEmployee = employeeToRemove => {
    const employees = this.state.employees.filter(
      employee => employee.id !== employeeToRemove.id
    );

    addEditEmployees(employees).then(() => {
      this.loadEmployees();
    });
  };

  handleEditClose = () => {
    this.setState({ employeeBeingEdited: null });
  };

  handleEditEmployee = employeeToEdit => {
    addEditEmployees([
      ...this.state.employees.filter(
        employee => employee.id !== employeeToEdit.id
      ),
      employeeToEdit
    ]).then(() => {
      this.loadEmployees();
      this.handleEditClose();
    });
  };

  handleEdit = employee => {
    this.setState({ employeeBeingEdited: employee });
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
              <button onClick={() => this.handleEdit(employee)}>
                Uredi zaposlenika
              </button>
            </li>
          ))}
        </ul>
        <NewEmployee onAddEmployee={this.handleAddEmployee} />
        {this.state.employeeBeingEdited ? (
          <EditEmployee
            employee={this.state.employeeBeingEdited}
            onEditEmployee={this.handleEditEmployee}
            onEditClose={this.handleEditClose}
          />
        ) : null}
      </div>
    );
  }
}
