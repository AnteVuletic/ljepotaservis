import React from "react";
import { Route, Switch, Redirect } from "react-router";
import { connect } from "react-redux";
import Login from "./Login";
import Registration from "./Registration";
import RoleNavbar from "../navbar";

const Authentication = props => {
  const { path } = props.match;
  return (
    <div>
      <RoleNavbar role={props.role} />
      <Switch>
        <Route path={path + "/login"} component={Login} />
        <Route path={path + "/registration"} component={Registration} />
        <Redirect to={path + "/registration"} />
      </Switch>
    </div>
  );
};

const mapStateToProps = state => ({
  role: state.authentication.user.role
});

export default connect(mapStateToProps)(Authentication);
