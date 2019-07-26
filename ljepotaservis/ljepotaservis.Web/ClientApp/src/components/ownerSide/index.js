import React from "react";
import { connect } from "react-redux";
import { Route, Switch, Redirect } from "react-router";
import Dashboard from "./Dashboard";
import Employees from "./Employees";
import RoleNavbar from "../navbar";

const OwnerSide = props => {
  const { path } = props.match;
  return (
    <div>
      <RoleNavbar role={props.role} />
      <Switch>
        <Route exact path={path} component={Dashboard} />
        <Route path={path + "/employees"} component={Employees} />
        <Redirect to={path} />
      </Switch>
    </div>
  );
};

const mapStateToProps = state => ({
  role: state.authentication.hasOwnProperty("user")
    ? state.authentication.user.role
    : "Guest"
});

export default connect(mapStateToProps)(OwnerSide);
