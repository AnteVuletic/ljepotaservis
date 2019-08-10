import React, { Component } from "react";
import { authentication } from "../../services/authentication";
import { LinkContainer } from "react-router-bootstrap";

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
      <div>
        <h3>Email uspješno potvrđen</h3>
        <LinkContainer to="/authentication/login">
          <button>Prijavi se</button>
        </LinkContainer>
      </div>
    );
  }
}
