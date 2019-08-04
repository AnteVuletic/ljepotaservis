import React, { Component } from "react";

class AddStore extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      username: "",
      password: ""
    };
  }

  handleChange = async event => {
    await this.setState({ [event.target.name]: event.target.value });
    this.props.onChange({ owner: { ...this.state } });
  };

  render() {
    const { firstName, lastName, email, username, password } = this.state;

    return (
      <div>
        <h3>Dodaj vlasnika</h3>
        <input
          name="firstName"
          type="text"
          value={firstName}
          onChange={this.handleChange}
          placeholder="Ime vlasnika"
        />
        <input
          name="lastName"
          type="text"
          value={lastName}
          onChange={this.handleChange}
          placeholder="Prezime vlasnika"
        />
        <input
          name="email"
          type="email"
          value={email}
          onChange={this.handleChange}
          placeholder="E-mail"
        />
        <input
          name="username"
          type="text"
          value={username}
          onChange={this.handleChange}
          placeholder="Korisničko ime"
        />
        <input
          name="password"
          type="password"
          value={password}
          onChange={this.handleChange}
          placeholder="Lozinka"
        />
      </div>
    );
  }
}

export default AddStore;
