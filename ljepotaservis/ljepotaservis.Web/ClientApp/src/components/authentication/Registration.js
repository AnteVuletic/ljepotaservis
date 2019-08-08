import React, { Component } from "react";
import { regexEmail, validatePassword } from "../../utils/ValidationHelper";
import { LinkContainer } from "react-router-bootstrap";
import { authentication } from "../../services/authentication";
import { userService } from "../../services/userServices";
import "../../styling/authentication/authentication.css";

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
      isUsernameValid: null,
      isEmailValid: null,
      isPasswordValid: null,
      isPasswordConfirmationValid: null,
      isRegistrationSubmited: false
    };
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const {
      firstName,
      lastName,
      username,
      email,
      password,
      isUsernameValid,
      isEmailValid,
      isPasswordValid,
      isPasswordConfirmationValid
    } = this.state;

    if (
      isUsernameValid &&
      isEmailValid &&
      isPasswordValid &&
      isPasswordConfirmationValid
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

  handleUsernameBlur = event => {
    userService.checkUsernameTaken(event.target.value).then(isTaken => {
      this.setState({ isUsernameValid: isTaken });
    });
  };

  handleEmailChange = event => {
    let isValidEmail = regexEmail(event.target.value);
    if (!isValidEmail) {
      this.setState({ isEmailValid: false });
      return;
    }

    userService.checkEmailTaken(event.target.value).then(isTaken => {
      isTaken
        ? this.setState({ isEmailValid: true })
        : this.setState({ isEmailValid: false });
    });
  };

  handlePasswordChange = event => {
    this.setState({ isPasswordValid: validatePassword(event.target.value) });
  };

  handlePasswordConfirmationChange = event => {
    this.setState({
      isPasswordConfirmationValid: this.state.password === event.target.value
    });
  };

  render() {
    const {
      firstName,
      lastName,
      username,
      email,
      password,
      passwordConfirmation,
      isEmailValid,
      isUsernameValid,
      isPasswordValid,
      isPasswordConfirmationValid,
      isRegistrationSubmited
    } = this.state;

    if (isRegistrationSubmited) {
      return <div>Provjerite e-mail za nastavak!</div>;
    }

    return (
      <div className="authentication">
        <div className="authentication__container">
          <h1 className="authentication__header authentication__header--register">
            <span>Ljepota servis</span>
          </h1>
          <form
            className="authentication__form"
            onSubmit={this.handleSubmit}
            noValidate
          >
            <label>Ime</label>
            <input
              name="firstName"
              type="text"
              value={firstName}
              placeholder="Ime"
              onChange={this.handleChange}
            />
            <label>Prezime</label>
            <input
              name="lastName"
              type="text"
              value={lastName}
              placeholder="Prezime"
              onChange={this.handleChange}
            />
            <label>Korisničko ime</label>
            <input
              name="username"
              type="text"
              value={username}
              placeholder="Korisničko ime"
              onChange={event => this.handleChange(event)}
              onBlur={event => this.handleUsernameBlur(event)}
              className={
                !isUsernameValid ? "authentication__input--fail" : null
              }
            />
            <label>E-mail</label>
            <input
              name="email"
              type="email"
              value={email}
              placeholder="adresa@mail.com"
              onChange={event => {
                this.handleChange(event);
                this.handleEmailChange(event);
              }}
              className={
                isEmailValid === false ? "authentication__input--fail" : null
              }
            />
            <label>Password</label>
            <input
              name="password"
              type="password"
              value={password}
              placeholder="Lozinka"
              onChange={event => {
                this.handleChange(event);
                this.handlePasswordChange(event);
              }}
              className={
                isPasswordValid === false ? "authentication__input--fail" : null
              }
            />
            <input
              name="passwordConfirmation"
              type="password"
              value={passwordConfirmation}
              placeholder="Potvrdi lozinku"
              onChange={event => {
                this.handleChange(event);
                this.handlePasswordConfirmationChange(event);
              }}
              className={
                isPasswordConfirmationValid === false
                  ? "authentication__input--fail"
                  : null
              }
            />
            <div className="authentication__submit">
              <input type="submit" value="Registriraj se!" />
            </div>
          </form>
          <div className="authentication__navigate">
            <span>Već imaš račun?</span>
            <LinkContainer to="/authentication/login">
              <span className="authentication__navigate__link">
                Prijavi se!
              </span>
            </LinkContainer>
          </div>
        </div>
      </div>
    );
  }
}

export default Registration;
