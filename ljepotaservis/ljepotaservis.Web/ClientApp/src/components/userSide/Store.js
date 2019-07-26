import React, { Component } from "react";
import { connect } from "react-redux";
import RoleNavbar from "../navbar";

const Store = props => {
  return (
    <div>
      <RoleNavbar role={props.role} />
      <div>id: {props.match.params.id}</div>;
    </div>
  );
};

const mapStateToProps = state => ({
  role: state.authentication.hasOwnProperty("user")
    ? state.authentication.user.role
    : "Guest"
});

export default connect(mapStateToProps)(Store);
