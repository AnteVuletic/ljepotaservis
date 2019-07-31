import React, { Component } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { FormGroup, FormControl, ControlLabel, Button } from "react-bootstrap";
import UserDto from "../../services/backendModels/dto/userDto";
import { authActions } from "../../store/actions/authActions";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      loginError: ""
    };
  }

  handleChange = event => {
    this.setState({ [event.target.id]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();

    const userToAdd = new UserDto(
      "",
      "",
      this.state.email,
      "",
      this.state.email
    );

    authActions(userToAdd);
  };

  render() {
    const { email, password } = this.state;
    return (
      <div
        style={{
          border: "1px solid",
          margin: "5px",
          padding: "15px",
          maxWidth: "400px"
        }}
      >
        <form onSubmit={this.handleSubmit} noValidate>
          <FormGroup controlId="email">
            <ControlLabel>E-mail</ControlLabel>
            <FormControl
              type="email"
              value={email}
              placeholder="adresa@mail.com"
              onChange={this.handleChange}
            />
            <FormControl.Feedback />
          </FormGroup>

          <FormGroup controlId="password">
            <ControlLabel>Password</ControlLabel>
            <FormControl
              type="password"
              value={password}
              placeholder="Lozinka"
              onChange={this.handleChange}
            />
            <FormControl.Feedback />
          </FormGroup>

          <Button bsStyle="success" type="submit">
            Prijavi se
          </Button>
        </form>
        <LinkContainer to="/authentication/registration">
          <Button>Nemaš račun? Registriraj se!</Button>
        </LinkContainer>
      </div>
    );
  }
}
