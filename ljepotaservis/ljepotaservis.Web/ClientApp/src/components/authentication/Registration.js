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
      usernameValidationState: null,
      emailValidationState: null,
      passwordValidationState: null,
      passwordConfirmationValidationState: null,
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
    userService.checkUsernameTaken(this.state.username).then(isTaken => {
      isTaken
        ? this.setState({ usernameValidationState: "success" })
        : this.setState({ usernameValidationState: "error" });
    });
  };

  handleEmailBlur = () => {
    let isValidEmail = regexEmail(this.state.email);
    if (!isValidEmail) {
      this.setState({ emailValidationState: "error" });
      return;
    }

    userService.checkEmailTaken(this.state.email).then(isTaken => {
      isTaken
        ? this.setState({ emailValidationState: "success" })
        : this.setState({ emailValidationState: "error" });
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
      <div className="authentication">
        <div className="authentication__container">
          <h1 className="authentication__header authentication__header--register">
            <span>Ljepota servis</span>
          </h1>
          <form className="authentication__form" onSubmit={this.handleSubmit} noValidate>
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
              onChange={this.handleChange}
            />
            <label>E-mail</label>
            <input
              name="email"
              type="email"
              value={email}
              placeholder="adresa@mail.com"
              onChange={this.handleChange}
            />
            <label>Password</label>
            <input
              name="password"
              type="password"
              value={password}
              placeholder="Lozinka"
              onChange={this.handleChange}
            />
            <input
              name="passwordConfirm"
              type="password"
              value={passwordConfirmation}
              placeholder="Potvrdi lozinku"
              onChange={this.handleChange}
            />
            <div className="authentication__submit">
              <input type="submit" value="Registriraj se!"/>
            </div>
          </form>
          <div className="authentication__navigate">
            <span>Već imaš račun?</span>             
            <LinkContainer to="/authentication/login">
              <span className="authentication__navigate__link">Prijavi se!</span>
            </LinkContainer>
          </div>
        </div>
      </div>
    );
  }
}

export default Registration;
