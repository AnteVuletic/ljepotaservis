import React, { Component } from "react";

export default class NewService extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: ""
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
      password: ""
    });
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { firstname, lastName, username, email, password } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          name="firstName"
          value={firstname}
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
        <button type="submit">Dodaj zaposlenika</button>
      </form>
    );
  }
}
