import React, { Component } from "react";
import ServicePicker from "./ServicePicker";

class Store extends Component {
  constructor(props) {
    super(props);

    this.state = {
      store: {
        id: null,
        name: "",
        address: "",
        openingTime: 8,
        closingTime: 14
      },
      employees: [],
      services: [],
      reservation: {}
    };
  }

  componentDidMount() {
    const storeId = this.props.match.params.id;
    //store, employees, services (storeDto) fetch by id ode
    const storeDto = {
      store: {
        id: this.props.match.params.id,
        name: "Store1",
        address: "store address 1",
        openingTime: 8,
        closingTime: 14
      },
      employees: [
        { id: 1, firstName: "teta", lastName: "Marija" },
        { id: 2, firstName: "teta", lastName: "Dubravka" }
      ],
      services: [
        {
          id: 1,
          name: "Brijanje",
          duration: 15
        },
        {
          id: 2,
          name: "Sisanje",
          duration: 60
        }
      ]
    };

    this.setState({
      store: { ...storeDto.store },
      employees: [...storeDto.employees],
      services: [...storeDto.services]
    });
  }

  handleServiceChange = selectedServices => {
    this.setState(state => ({
      reservation: { ...state.reservation, services: selectedServices }
    }));
  };

  render() {
    const { store, employees, services } = this.state;
    return (
      <div>
        <h1>Ime {store.name}</h1>
        <h3>Adresa {store.address}</h3>
        <h3>
          Radno vrijeme: {store.openingTime}-{store.closingTime}
        </h3>
        <ServicePicker
          services={services}
          onChange={this.handleServiceChange}
        />
      </div>
    );
  }
}

export default Store;
