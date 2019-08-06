import React, { Component } from "react";
import NewService from "./NewService";
import EditService from "./EditService";
import {
  getStoreServices,
  addEditServices
} from "../../../services/ownerServices";
import "../../../styling/owner/services.css";

export default class Services extends Component {
  constructor(props) {
    super(props);

    this.state = {
      services: [],
      serviceBeingEdited: null
    };
  }

  componentDidMount() {
    this.loadServices();
  }

  loadServices = () => {
    getStoreServices().then(response => {
      this.setState({
        services: response.services
      });
    });
  };

  handleAddService = serviceToAdd => {
    if (
      this.state.services.filter(service => service.name === serviceToAdd.name)
        .length > 0
    ) {
      alert("Usluga sa istim imenom vec postoji!");
      return;
    }

    addEditServices([...this.state.services, serviceToAdd]).then(() => {
      this.loadServices();
    });
  };

  handleRemoveService = serviceToRemove => {
    var services = this.state.services.filter(
      service => service.name !== serviceToRemove.name
    );

    addEditServices(services).then(() => {
      this.loadServices();
    });
  };

  handleEditClose = () => {
    this.setState({ serviceBeingEdited: null });
  };

  handleEditService = serviceToEdit => {
    const services = [...this.state.services.filter(service => service.id !== serviceToEdit.id), serviceToEdit];
    addEditServices(services).then(() => {
      this.loadServices();
      this.handleEditClose();
    });
  };

  handleEdit = service => {
    this.setState({
      serviceBeingEdited: service
    });
  };

  render() {
    return (
      <React.Fragment>
        <h3 className="header">Usluge</h3>
        <table className="service__overview">
          <thead>
            <tr>
              <th>
                Ime
              </th>
              <th>
                Cijena
              </th>
              <th>
                Trajanje
              </th>
              <th>
              </th>
              <th>
              </th>
            </tr>
          </thead>
          <tbody>
            {this.state.services.map(service => (
              <tr key={service.name}>
                <td>
                  {service.name} 
                </td>
                <td>
                  {service.price}
                </td>
                <td>
                  {service.duration} min's
                </td>
                <td>
                  <button onClick={() => this.handleRemoveService(service)}>
                    <i className="fas fa-trash" aria-hidden="true"></i>
                  </button>
                </td>
                <td>
                  <button onClick={() => this.handleEdit(service)}>
                    <i className="fas fa-edit" aria-hidden="true"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <ul>
        </ul>
        <NewService onAddService={this.handleAddService} />
        {this.state.serviceBeingEdited ? (
          <EditService
            service={this.state.serviceBeingEdited}
            onEditEmployee={this.handleEditService}
            onEditClose={this.handleEditClose}
          />
        ) : null}
      </React.Fragment>
    );
  }
}
