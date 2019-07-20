import React, { Component } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { FormGroup, FormControl, ControlLabel, Button } from "react-bootstrap";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      loginError: ""
    };
  }

  handleChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();

    //const { email, password } = this.state;
    // HTTP post request here
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
              placeholder="address@mail.com"
              onChange={this.handleChange}
            />
            <FormControl.Feedback />
          </FormGroup>

          <FormGroup controlId="password">
            <ControlLabel>Password</ControlLabel>
            <FormControl
              type="password"
              value={password}
              placeholder="Password"
              onChange={this.handleChange}
            />
            <FormControl.Feedback />
          </FormGroup>

          <Button bsStyle="success" type="submit">
            Login
          </Button>
        </form>
        <LinkContainer to="/register">
          <Button>Don't have an account? Register here!</Button>
        </LinkContainer>
      </div>
    );
  }
}
