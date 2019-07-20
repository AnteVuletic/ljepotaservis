import React, { Component } from "react";

export default class Store extends Component {
  render() {
    return <div>id: {this.props.match.params.id}</div>;
  }
}
