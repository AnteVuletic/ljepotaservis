import React, { Component } from "react";

export default class EditEmployee extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...this.props.employee
    };
  }

  handleSubmit = event => {
    event.preventDefault();
    this.props.onEditEmployee({ ...this.state });
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { firstName, lastName, username, email, password } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <h3>
          Uredi {firstName} {lastName}
        </h3>
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
        <input
          type="password"
          name="password"
          value={password}
          placeholder="Lozinka"
          onChange={this.handleChange}
        />
        <button type="submit">Potvrdi</button>
        <button onClick={this.props.onEditClose}>Odustani</button>
      </form>
    );
  }
}
