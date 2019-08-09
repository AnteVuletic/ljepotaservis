import React, { Component } from "react";
import ImageUploader from "../../utilComponents/ImageUploader";
import "../../../styling/owner/forms.css";

export default class EditPortfolio extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...this.props.portfolio
    };
  }

  handleSubmit = event => {
    event.preventDefault();
    this.props.onAddPortfolio({ ...this.state });
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleImageName = imageName => {
    this.setState({ imageName });
  };


  render() {
    return (
      <form className="form" onSubmit={this.handleSubmit}>
        <ImageUploader onImageUploaded={this.handleImageName} />
        <textarea
          onChange={this.handleChange}
          name="description"
        />
        <button type="submit">Dodaj portfolio</button>
      </form>
    );
  }
}
