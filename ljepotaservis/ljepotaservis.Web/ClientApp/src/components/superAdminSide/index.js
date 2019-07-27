import React from "react";
import { connect } from "react-redux";
import { Route, Switch, Redirect } from "react-router";
import Dashboard from "./Dashboard";
import Stores from "./Stores";
import RoleNavbar from "../navbar";

const SuperAdminSide = props => {
  const { path } = props.match;
  return (
    <div>
      <RoleNavbar role={props.role} />
      <Switch>
        <Route exact path={path} component={Dashboard} />
        <Route path={path + "/stores"} component={Stores} />
        <Redirect to={path} />
      </Switch>{" "}
    </div>
  );
};

const mapStateToProps = state => ({
  role: state.authentication.user.role
});

export default connect(mapStateToProps)(SuperAdminSide);
