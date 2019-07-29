import React, { Component } from "react";
import AddStore from "./AddStore";
import AddOwner from "./AddOwner";

class AddStoreAndOwner extends Component {
  constructor(props) {
    super(props);

    this.state = {
      store: {},
      owner: {}
    };
  }

  handleSubmit = event => {
    event.preventDefault();

    console.log({
      ...this.state,
      owner: { ...this.state.owner, role: "SuperAdmin" }
    });
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
