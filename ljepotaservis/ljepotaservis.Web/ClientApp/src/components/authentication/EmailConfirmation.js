import React, { Component } from "react";
import { userService } from "../../services/userServices"

export default class EmailConfirmation extends Component {
  componentDidMount() {
    const { userId, emailToken } = this.props.match.params;
    
    userService.confirmEmail(userId, emailToken);
  }
  render() {
    return <div>Is confirmed</div>;
  }
};