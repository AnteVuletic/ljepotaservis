import React from "react";
import { connect } from "react-redux";
import { Route, Switch, Redirect } from "react-router";
import Dashboard from "./Dashboard";
import Reservations from "./Reservations";
import RoleNavbar from "../navbar";

const EmployeeSide = props => {
  const { path } = props.match;
  return (
    <div>
      <RoleNavbar role={props.role} />
      <Switch>
        <Route exact path={path} component={Dashboard} />
        <Route path={path + "/reservations"} component={Reservations} />
        <Redirect to={path} />
      </Switch>
    </div>
  );
};

const mapStateToProps = state => ({
  role: state.authentication.user.role
});

export default connect(mapStateToProps)(EmployeeSide);
