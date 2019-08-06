import React, { Component } from "react";
import NewEmployee from "./NewEmployee";
import EditEmployee from "./EditEmployee";
import {
  getStoreEmployees,
  addEditEmployees
} from "../../../services/ownerServices";
import "../../../styling/owner/employee.css";
import { getStoreWorkingHours } from "../../../services/ownerServices";

export default class Employees extends Component {
  constructor(props) {
    super(props);

    this.state = {
      employees: [],
      employeeBeingEdited: null,
      openTime: new Date().setHours(6),
      closeTime: new Date().setHours(20)
    };
  }

  componentDidMount() {
    Promise.all([this.initiliazeStartAndClose(), this.loadEmployees()])
    .then(responses => {
      this.setState({
        openTime: new Date(Date.parse(responses[0].result.openTime)),
        closeTime: new Date(Date.parse(responses[0].result.closeTime)),
        employees: responses[1]
      })
    });
  }

  initiliazeStartAndClose = () => {
    return getStoreWorkingHours().then(employees => employees);
  }

  loadEmployees = () => {
    return getStoreEmployees().then(workingHours => workingHours);
  };

  handleAddEmployee = employeeToAdd => {
    addEditEmployees([...this.state.employees, employeeToAdd]).then(() => {
      this.loadEmployees().then(employees => {
        this.setState({
          employees
        });
      });
    });
  };

  handleRemoveEmployee = employeeToRemove => {
    const employees = this.state.employees.filter(
      employee => employee.id !== employeeToRemove.id
    );

    addEditEmployees(employees).then(() => {
      this.loadEmployees().then(employees => {
        this.setState({
          employees
        });
      });
    });
  };

  handleEditClose = () => {
    this.setState({ employeeBeingEdited: null });
  };

  handleEditEmployee = employeeToEdit => {
    const employees = [...this.state.employees.filter(employee => employee.id !== employeeToEdit.id), employeeToEdit];
    addEditEmployees(employees).then(() => {
      this.loadEmployees().then(employees => {
        this.setState({
          employees
        });
      });
      this.handleEditClose();
    });
  };

  handleEdit = employee => {
    this.setState({ employeeBeingEdited: employee });
  };

  render() {
    return (
      <React.Fragment>
        <h3 className="header">Zaposlenici</h3>
        <table className="employee__overview">
          <thead>
            <tr>
              <th>
                Profilna
              </th>
              <th>
                Ime
              </th>
              <th>
                Prezime
              </th>
              <th>
                Start
              </th>
              <th>
                End
              </th>
              <th>
              </th>
              <th>
              </th>
            </tr>
          </thead>
          <tbody>
            {this.state.employees.map(employee => (
              <tr key={employee.id}>
                <td>
                  <div className="aspect__ratio ">
                    <img src={`https://localhost:44349/images/${employee.imageName}`} />
                  </div>
                </td>
                <td>
                  {employee.firstName} 
                </td>
                <td>
                  {employee.lastName}
                </td>
                <td>
                  {new Date(Date.parse(employee.startOfShift)).getHours() + " : " +
                  new Date(Date.parse(employee.startOfShift)).getMinutes()}
                </td>
                <td>
                  {new Date(Date.parse(employee.endOfShift)).getHours() + " : " + 
                  new Date(Date.parse(employee.endOfShift)).getMinutes()}
                </td>
                <td>
                  <button onClick={() => this.handleRemoveEmployee(employee)}>
                    <i className="fa fa-trash" aria-hidden="true"></i>
                  </button>
                </td>
                <td>
                  <button onClick={() => this.handleEdit(employee)}>
                    <i className="fas fa-edit" aria-hidden="true"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <NewEmployee 
          onAddEmployee={this.handleAddEmployee}
          openTime={this.state.openTime}
          closeTime={this.state.closeTime}
        />
        {this.state.employeeBeingEdited ? (
          <EditEmployee
            openTime={this.state.openTime}
            closeTime={this.state.closeTime}
            employee={this.state.employeeBeingEdited}
            onEditEmployee={this.handleEditEmployee}
            onEditClose={this.handleEditClose}
          />
        ) : null}
      </React.Fragment>
    );
  }
}
