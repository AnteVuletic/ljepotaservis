import React, { Component } from "react";
import { authentication } from "../../services/authentication";
import { LinkContainer } from "react-router-bootstrap";
import "../../styling/authentication/emailconfirmation.css";

export default class EmailConfirmation extends Component {
  componentDidMount() {
    const { userId } = this.props.match.params;
    const emailToken = this.props.location.search.slice(
      1,
      this.props.location.search.length
    );
    authentication.confirmEmail(userId, emailToken);
  }
  render() {
    return (
      <div className="email__confirmation authentication">
        <div className="authentication__container">
         <h1>Email uspješno potvrđen</h1>
          <LinkContainer className="btn-base" to="/authentication/login">
            <button>Prijavi se</button>
          </LinkContainer>
        </div>
      </div>
    );
  }
}
