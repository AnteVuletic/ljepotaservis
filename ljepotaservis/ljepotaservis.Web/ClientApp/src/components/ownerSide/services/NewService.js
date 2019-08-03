import React, { Component } from "react";

export default class NewService extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      price: 0,
      duration: 0
    };
  }

  handleSubmit = async event => {
    event.preventDefault();
    this.props.onAddService({ ...this.state });
    await this.setState({ name: "", price: 0, duration: 0 });
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { name, price, duration } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
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
        <button type="submit">Dodaj uslugu</button>
      </form>
    );
  }
}
