import React, { Component } from "react";
import { authActions } from "../../store/actions/authActions";

export default class EmailConfirmation extends Component {
  componentDidMount() {
    const { email, token } = this.props.match.params;

    console.log(email, token);
    // Vidit na koji endpoint slat
  }
  render() {
    return <div>Is confirmed</div>;
  }
}
