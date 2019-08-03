import React, { Component } from "react";

export default class EditService extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...this.props.service
    };
  }

  handleSubmit = event => {
    event.preventDefault();
    this.props.onAddService({ ...this.state });
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { name, price, duration } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <h3>Uredi {name}</h3>
        <input
          type="text"
          name="name"
          value={name}
          placeholder="ime"
          onChange={this.handleChange}
        />
        <input
          type="number"
          name="price"
          value={price}
          placeholder="Cijena"
          onChange={this.handleChange}
        />
        <input
          type="number"
          name="duration"
          value={duration}
          placeholder="Trajanje"
          onChange={this.handleChange}
        />
        <button type="submit">Potvrdi</button>
        <button onClick={this.props.onEditClose}>Odustani</button>
      </form>
    );
  }
}
