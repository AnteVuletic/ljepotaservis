import React, { Component } from "react";
import ServicePicker from "./ServicePicker";
import { getStoreDetailById } from "../../../services/storeService";

class Store extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: null,
      name: "",
      address: "",
      openCloseTime: "",
      openTime: new Date(),
      closeTime: new Date(),
      score: 0,
      imageName: "",
      type: "",
      employeeDetails: [],
      services: []
    };
  }

  componentDidMount() {
    const storeId = this.props.match.params.id;
    getStoreDetailById(storeId).then(storeDetail => {
      this.setState({
        storeDetail
      });
    });
  }

  handleServiceChange = selectedServices => {
    this.setState(state => ({
      reservation: { ...state.reservation, services: selectedServices }
    }));
  };

  render() {
    const { name, openCloseTime, services, address } = this.state;
    return (
      <div>
        <h1>Ime {name}</h1>
        <h3>Adresa {address}</h3>
        <h3>
          Radno vrijeme: {openCloseTime}
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
