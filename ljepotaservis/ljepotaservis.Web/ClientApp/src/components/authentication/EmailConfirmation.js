import React, { Component } from "react";
import { authentication } from "../../services/authentication"

export default class EmailConfirmation extends Component {
  componentDidMount() {
    const { userId } = this.props.match.params;
    const emailToken = this.props.location.search.slice(1, this.props.location.search.length);
    authentication.confirmEmail(userId, emailToken);
  }
  render() {
    return <div>Is confirmed</div>;
  }
};