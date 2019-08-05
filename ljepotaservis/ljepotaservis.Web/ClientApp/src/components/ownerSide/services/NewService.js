import React, { Component } from "react";
import ImageUploader from "../../utilComponents/ImageUploader";

export default class NewService extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      price: 0,
      duration: 0,
      imageName: ""
    };
  }

  handleSubmit = async event => {
    event.preventDefault();
    this.props.onAddService({ ...this.state });
    await this.setState({ name: "", price: 0, duration: 0, imageName: "" });
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleImageName = imageName => {
    this.setState({ imageName });
  };

  handleDurationChange = event => {
    if (event.target.value % 15 !== 0) {
      return;
    }
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
        <ImageUploader onImageUploaded={this.handleImageName} />
        <input
          type="number"
          name="price"
          value={price}
          placeholder="Cijena"
          onChange={this.handleChange}
          min="0"
        />
        <input
          type="number"
          name="duration"
          value={duration}
          placeholder="Trajanje"
          onChange={this.handleDurationChange}
          step="15"
          min="0"
        />
        <button type="submit">Dodaj uslugu</button>
      </form>
    );
  }
}
