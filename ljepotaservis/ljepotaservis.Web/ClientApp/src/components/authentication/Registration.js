import React, { Component } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { validateEmail, validatePassword } from "../../utils/ValidationHelper";
import {
  FormGroup,
  FormControl,
  HelpBlock,
  ControlLabel,
  Button
} from "react-bootstrap";

export default class Registration extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      passwordConfirmation: "",
      emailValidationState: null,
      passwordValidationState: null,
      passwordConfirmationValidationState: null
    };
  }

  handleChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();

    const { email, password, passwordConfirmation } = this.state;

    if (
      validateEmail(email) &&
      validatePassword(password) &&
      password === passwordConfirmation
    ) {
      // HTTP post request here
      return;
    }
    alert("Validation failed!");
  };

  handleEmailBlur = () => {
    if (validateEmail(this.state.email)) {
      this.setState({ emailValidationState: "success" });
    } else {
      this.setState({ emailValidationState: "error" });
    }
  };

  handlePasswordBlur = () => {
    if (validatePassword(this.state.password)) {
      this.setState({ passwordValidationState: "success" });
    } else {
      this.setState({ passwordValidationState: "error" });
    }
  };

  handlePasswordConfirmationBlur = () => {
    if (this.state.password === this.state.passwordConfirmation) {
      this.setState({ passwordConfirmationValidationState: "success" });
    } else {
      this.setState({ passwordConfirmationValidationState: "error" });
    }
  };

  render() {
    const {
      email,
      password,
      passwordConfirmation,
      emailValidationState,
      passwordValidationState,
      passwordConfirmationValidationState
    } = this.state;
    // validationState ne radi idk zasto...
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
          <FormGroup
            controlId="email"
            validationState={emailValidationState}
            onBlur={this.handleEmailBlur}
          >
            <ControlLabel>E-mail</ControlLabel>
            <FormControl
              type="email"
              value={email}
              placeholder="address@mail.com"
              onChange={this.handleChange}
            />
            <FormControl.Feedback />
            <HelpBlock>The address has to be valid.</HelpBlock>
          </FormGroup>

          <FormGroup
            controlId="password"
            validationState={passwordValidationState}
            onBlur={this.handlePasswordBlur}
          >
            <ControlLabel>Password</ControlLabel>
            <FormControl
              type="password"
              value={password}
              placeholder="Password"
              onChange={this.handleChange}
            />
            <FormControl.Feedback />
            <HelpBlock>
              The password has to containt 7 characters, one uppercase, one
              lowercase and a number!
            </HelpBlock>
          </FormGroup>

          <FormGroup
            controlId="passwordConfirmation"
            validationState={passwordConfirmationValidationState}
            onBlur={this.handlePasswordConfirmationBlur}
          >
            <ControlLabel>Confirm password</ControlLabel>
            <FormControl
              type="password"
              value={passwordConfirmation}
              placeholder="Password confirmation"
              onChange={this.handleChange}
            />
            <FormControl.Feedback />
            <HelpBlock>The passwords have to match!</HelpBlock>
          </FormGroup>

          <Button type="submit" bsStyle="success">
            Register
          </Button>
        </form>

        <LinkContainer to="/login">
          <Button>Already have an account? Login here!</Button>
        </LinkContainer>
      </div>
    );
  }
}
