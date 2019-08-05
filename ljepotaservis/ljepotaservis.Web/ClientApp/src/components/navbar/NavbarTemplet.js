import React, { Component } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { logout } from "../../store/actions/authActions";
import { connect } from "react-redux";
import Role from "../../utils/role";
import NavbarConstants from "./roleNavbarConstants";
import "../../styling/navbar/navbar.css";

class NavbarTemplet extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isClosed: true
    };
  }

  handleToggle = event => {
    event.preventDefault();
    this.setState(prevState => {
      return { isClosed: !prevState.isClosed };
    });
  };

  preventPropagation = event => {
    event.stopPropagation();
  };

  render() {
    const { isClosed } = this.state;
    const { role, logout } = this.props;
    const navigation = NavbarConstants[role];

    return (
      <React.Fragment>
        <div className="navigation__wrapper">
          <button className="navigation__toggle" onClick={this.handleToggle}>
            <span />
          </button>
        </div>
        <nav
          className={
            isClosed
              ? "navigation__wrapper--closed"
              : "navigation__wrapper--open"
          }
          onClick={this.handleToggle}
        >
          <div
            className="navigation__content"
            onClick={this.preventPropagation}
          >
            <a href={navigation.homePath}>
              <span>Ljepota servis logo</span>
            </a>
            {navigation.items.map((item, index) => (
              <a href={item.path} key={index}>
                <span className="navigation__item">{item.text}</span>
              </a>
            ))}
            {role === Role.Guest ? (
              <React.Fragment>
                <a href="/authentication/login">
                  <span className="navigation__item">Prijavi se</span>
                </a>
                <a href="/authentication/registration">
                  <span className="navigation__item">Registracija</span>
                </a>
              </React.Fragment>
            ) : (
              <a href="/">
                <button className="navigation__logout" onClick={logout}>
                  Odjavi se
                </button>
              </a>
            )}
          </div>
        </nav>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {
  logout
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavbarTemplet);
