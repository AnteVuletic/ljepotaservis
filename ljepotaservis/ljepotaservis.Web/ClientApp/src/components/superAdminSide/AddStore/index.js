import React, { Component } from "react";
import AddStore from "./AddStore";
import AddOwner from "./AddOwner";
import { createStoreAndOwner } from "../../../services/superAdmin";
import UserDto from "../../../services/backendModels/dto/userDto";
import StoreModel from "../../../services/backendModels/models/storeModel";
import {
  regexEmail,
  validatePassword,
  validateName
} from "../../../utils/ValidationHelper";

class AddStoreAndOwner extends Component {
  constructor(props) {
    super(props);

    this.state = {
      store: {
        name: "",
        address: "",
        openingTime: new Date(),
        closingTime: new Date()
      },
      owner: {
        firstName: "",
        lastName: "",
        email: "",
        username: "",
        password: ""
      }
    };
  }

  handleSubmit = event => {
    event.preventDefault();

    const owner = this.state.owner;
    const store = this.state.store;

    if (!validateName(owner.firstName)) {
      alert("First name not valid");
      return;
    }

    if (!validateName(owner.lastName)) {
      alert("Last name not valid");
      return;
    }

    owner.username = owner.username.trim();
    owner.firstName = validateName(owner.firstName);
    owner.lastName = validateName(owner.lastName);

    if (owner.username.length < 3) {
      alert("username has to be loneger than 3");
      return;
    }

    if (!regexEmail(owner.email)) {
      alert("Enter valid e-mail");
      return;
    }

    if (!validatePassword(owner.password)) {
      alert("7 chars, capital, lower and number");
      return;
    }

    store.name = store.name.trim();
    store.address = store.address.trim();

    if (store.name.length < 3 || store.address.length < 3) {
      alert("store name and address longer than 3");
      return;
    }

    const ownerDto = new UserDto(
      owner.firstName,
      owner.lastName,
      owner.email,
      owner.username,
      owner.password
    );

    const storeModel = new StoreModel(
      store.name,
      store.address,
      store.openingTime,
      store.closingTime
    );

    createStoreAndOwner(storeModel, ownerDto);
  };

  handleChange = formInformation => {
    if (formInformation.hasOwnProperty("store")) {
      this.setState({ store: formInformation.store });
    } else if (formInformation.hasOwnProperty("owner")) {
      this.setState({ owner: formInformation.owner });
    }
  };

  render() {
    return (
      <form>
        <AddStore
          onChange={this.handleChange}
          handleSubmit={this.getStoreInformation}
        />
        <AddOwner onChange={this.handleChange} />
        <button type="submit" onClick={this.handleSubmit}>
          Dodaj
        </button>
      </form>
    );
  }
}

export default AddStoreAndOwner;
