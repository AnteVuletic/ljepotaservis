import React, { Component } from "react";
import ImageUploader from "../../utilComponents/ImageUploader";

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

  handleDurationChange = event => {
    if (event.target.value % 15 !== 0) {
      return;
    }
    this.setState({ [event.target.name]: event.target.value });
  };

  handleImageName = imageName => {
    this.setState({ imageName });
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
        <button type="submit">Potvrdi</button>
        <button onClick={this.props.onEditClose}>Odustani</button>
      </form>
    );
  }
}
