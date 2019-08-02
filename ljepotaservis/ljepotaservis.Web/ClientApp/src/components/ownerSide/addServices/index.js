import React, { Component } from "react";
import NewService from "./NewService";
import { getStoreServices, addEditServices } from "../../../services/ownerServices"

export default class AddServices extends Component {
  constructor(props) {
    super(props);

    this.state = {
      services: []
    };
  }
  
  componentDidMount() {
    this.loadServices();
  }

  loadServices = () =>{
    getStoreServices()
      .then(response =>{
        this.setState({
          services: response.services
        });
    });
  }

  handleAddService = serviceToAdd => {
    if (
      this.state.services.filter(service => service.name === serviceToAdd.name)
        .length > 0
    ) {
      alert("Usluga sa istim imenom vec postoji!");
      return;
    }

    addEditServices([...this.state.services, serviceToAdd])
    .then(() => {
      this.loadServices();
    });
  };

  handleRemoveService = serviceToRemove => {
    var services = this.state.services.filter(
      service => service.name !== serviceToRemove.name
    );

    addEditServices(services)
    .then(() => {
      this.loadServices();
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
            </li>
          ))}
        </ul>
        <NewService onAddService={this.handleAddService} />
      </div>
    );
  }
}
