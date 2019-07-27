import React from "react";
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
  role: state.authentication.user.role
});

export default connect(mapStateToProps)(Store);
