import React, { Component } from "react";
import { connect } from "react-redux";
import { login } from "../../store/actions/authActions";
import "../../styling/authentication/authentication.css";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      loginError: ""
    };
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();

    const { login } = this.props;
    const { email, password } = this.state;

    login(email, password);
  };

  render() {
    const { email, password } = this.state;
    return (
      <div className="authentication">
        <div className="authentication__container">
          <h1 className="authentication__header">
            <span>Ljepota servis</span>
          </h1>
          <form className="authentication__form" onSubmit={this.handleSubmit} noValidate>
              <label>E-mail</label>
              <input
                name="email"
                type="email"
                value={email}
                placeholder="adresa@mail.com"
                onChange={this.handleChange}
                required
              />
              <label>Password</label>
              <input
                name="password"
                type="password"
                value={password}
                placeholder="Lozinka"
                onChange={this.handleChange}
                required
              />
              <div className="authentication__submit">
                <input type="submit" value="Prijavi se"/>
              </div>
          </form>
          <div className="authentication__navigate">
            <span>Nemaš račun?</span>             
            <a href="/authentication/registration">Registriraj se!
            </a>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  authentication: state.authentication
});

const mapDispatchToProps = {
  login
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
