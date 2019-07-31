import React, { Component } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { regexEmail, validatePassword } from "../../utils/ValidationHelper";
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

  handleChange = event => {
    this.setState({ [event.target.id]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();

    const { email, password, passwordConfirmation } = this.state;

    if (
      regexEmail(email) &&
      validatePassword(password) &&
      password === passwordConfirmation
    ) {
      // HTTP post request here
      return;
    }
    alert("Validation failed!");
  };

  handleEmailBlur = () => {
    if (regexEmail(this.state.email)) {
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
              placeholder="adresa@mail.com"
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
              placeholder="Lozinka"
              onChange={this.handleChange}
            />
            <FormControl.Feedback />
            <HelpBlock>
              Lozinka treba sadržavati 7 ili više zankova, veliko i malo slovo i
              broj!
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
              placeholder="Potvrdi lozinku"
              onChange={this.handleChange}
            />
            <FormControl.Feedback />
            <HelpBlock>Lozinke se trebaju podudarati!</HelpBlock>
          </FormGroup>

          <Button type="submit" bsStyle="success">
            Registriraj se
          </Button>
        </form>

        <LinkContainer to="/authentication/login">
          <Button>Već imaš račun? Prijavi se!</Button>
        </LinkContainer>
      </div>
    );
  }
}
