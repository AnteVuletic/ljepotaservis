import React, { Component } from "react";
import NewService from "./NewService";

export default class AddServices extends Component {
  constructor(props) {
    super(props);

    this.state = {
      services: [
        { name: "Brijanje", price: 20, duration: 20 },
        { name: "Sisanje", price: 120, duration: 60 }
      ]
    };
  }

  componentDidMount() {
    //fetch services i poslat ih u state
  }

  handleAddService = serviceToAdd => {
    if (
      this.state.services.filter(service => service.name === serviceToAdd.name)
        .length > 0
    ) {
      alert("Usluga sa istim imenom vec postoji!");
      return;
    }

    this.setState(state => ({ services: [...state.services, serviceToAdd] }));

    //http request ode
  };

  handleRemoveService = serviceToRemove => {
    // tribat ce pazit da salon nemoze imat dvi usluge istog imena
    this.setState(state => ({
      services: state.services.filter(
        service => service.name !== serviceToRemove.name
      )
    }));

    // http request here
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
