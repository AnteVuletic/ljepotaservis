import React, { Component } from "react";
import { connect } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { regexEmail, validatePassword } from "../../utils/ValidationHelper";
import { authentication } from "../../services/authentication";
import { userService } from "../../services/userServices";
import {
  FormGroup,
  FormControl,
  HelpBlock,
  ControlLabel,
  Button
} from "react-bootstrap";

class Registration extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      usernameValidationState: null,
      emailValidationState: null,
      passwordValidationState: null,
      passwordConfirmationValidationState: null,
      isRegistrationSubmited: false
    };
  }

  handleChange = event => {
    this.setState({ [event.target.id]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();

    const {
      firstName,
      lastName,
      username,
      email,
      password,
      passwordConfirmation
    } = this.state;

    if (
      regexEmail(email) &&
      validatePassword(password) &&
      password === passwordConfirmation
    ) {
      const userToRegister = {
        firstName,
        lastName,
        username,
        email,
        password
      };

      authentication.register(userToRegister);
    }
  };

  handleUsernameBlur = () => {
    userService.checkUsernameTaken(this.state.username)
    .then(isTaken => {
      isTaken ? 
      this.setState({ usernameValidationState: "success" }) :
      this.setState({ usernameValidationState: "error" });
    });
  };

  handleEmailBlur = () => {
    let isValidEmail = regexEmail(this.state.email);
    if (!isValidEmail) {
      this.setState({ emailValidationState: "error" });
      return;
    }

    userService.checkEmailTaken(this.state.email).then(isTaken => {
      isTaken ? 
      this.setState({ emailValidationState: "success" }) :
      this.setState({ emailValidationState: "error" });
    });
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
      firstName,
      lastName,
      username,
      email,
      password,
      passwordConfirmation,
      emailValidationState,
      usernameValidationState,
      passwordValidationState,
      passwordConfirmationValidationState,
      isRegistrationSubmited
    } = this.state;

    if (isRegistrationSubmited) {
      return <div>Provjerite e-mail za nastavak!</div>;
    }

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
          <FormGroup controlId="firstName">
            <ControlLabel>Ime</ControlLabel>
            <FormControl
              type="text"
              value={firstName}
              placeholder="Ime"
              onChange={this.handleChange}
            />
          </FormGroup>

          <FormGroup controlId="lastName">
            <ControlLabel>Prezime</ControlLabel>
            <FormControl
              type="text"
              value={lastName}
              placeholder="Prezime"
              onChange={this.handleChange}
            />
          </FormGroup>

          <FormGroup 
          controlId="username"
          validationState={usernameValidationState}
          onBlur={this.handleUsernameBlur}
          >
            <ControlLabel>Korisničko ime</ControlLabel>
            <FormControl
              type="text"
              value={username}
              placeholder="Korisničko ime"
              onChange={this.handleChange}
            />
          </FormGroup>
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

export default Registration;
