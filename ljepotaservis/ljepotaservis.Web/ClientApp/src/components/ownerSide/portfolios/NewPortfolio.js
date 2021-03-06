import React, { Component } from "react";
import ImageUploader from "../../utilComponents/ImageUploader";
import "../../../styling/owner/forms.css";

export default class NewPortfolio extends Component {
  constructor(props) {
    super(props);

    this.state = {
      description: "",
      imageName: ""
    };
  }

  handleSubmit = event => {
    event.preventDefault();
    this.props.onAddPortfolio({ ...this.state });
    this.setState({
      description: "",
      imageName: ""
    });
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
