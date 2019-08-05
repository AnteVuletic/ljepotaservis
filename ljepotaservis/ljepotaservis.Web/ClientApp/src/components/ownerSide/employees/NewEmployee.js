import React, { Component } from "react";
import ImageUploader from "../../utilComponents/ImageUploader";

export default class NewEmployee extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      imageName: ""
    };
  }

  handleSubmit = event => {
    event.preventDefault();
    this.props.onAddEmployee({ ...this.state });
    this.setState({
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
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
    const { firstName, lastName, username, email, password } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          name="firstName"
          value={firstName}
          placeholder="Ime"
          onChange={this.handleChange}
        />
        <input
          type="text"
          name="lastName"
          value={lastName}
          placeholder="Prezime"
          onChange={this.handleChange}
        />
        <input
          type="text"
          name="username"
          value={username}
          placeholder="Korisničko ime"
          onChange={this.handleChange}
        />
        <input
          type="email"
          name="email"
          value={email}
          placeholder="E-mail"
          onChange={this.handleChange}
        />
        <ImageUploader onImageUploaded={this.handleImageName} />
        <input
          type="password"
          name="password"
          value={password}
          placeholder="Lozinka"
          onChange={this.handleChange}
        />
        <button type="submit">Dodaj zaposlenika</button>
      </form>
    );
  }
}
