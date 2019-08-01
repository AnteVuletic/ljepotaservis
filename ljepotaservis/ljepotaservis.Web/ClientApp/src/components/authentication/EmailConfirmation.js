import React, { Component } from "react";
import { authActions } from "../../store/actions/authActions";
import UserDto from "../../services/backendModels/dto/userDto";

export default class EmailConfirmation extends Component {
  componentDidMount() {
    const { email, token } = this.props.match.params;

    const userToLogin = new UserDto("", "", email, "", "", null, token);
    console.log(userToLogin);
    // Vidit na koji endpoint slat
  }
  render() {
    return <div>Is confirmed</div>;
  }
}
