import React, { Component } from "react";
import NewService from "./NewService";
import EditService from "./EditService";
import {
  getStoreServices,
  addEditServices
} from "../../../services/ownerServices";

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
    addEditServices([
      ...this.state.services.filter(service => service.id !== serviceToEdit.id),
      serviceToEdit
    ]).then(() => {
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
      <div>
        <h3>Usluge</h3>
        <ul>
          {this.state.services.map(service => (
            <li key={service.name}>
              Ime: {service.name} Cijena: {service.price}
              <button onClick={() => this.handleRemoveService(service)}>
                Obriši uslugu
              </button>
              <button onClick={() => this.handleEdit(service)}>
                Uredi uslugu
              </button>
            </li>
          ))}
        </ul>
        <NewService onAddService={this.handleAddService} />
        {this.state.serviceBeingEdited ? (
          <EditService
            service={this.state.serviceBeingEdited}
            onEditEmployee={this.handleEditService}
            onEditClose={this.handleEditClose}
          />
        ) : null}
      </div>
    );
  }
}
