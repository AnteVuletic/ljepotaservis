import React from "react";
import { connect } from "react-redux";
import { Route, Switch, Redirect } from "react-router";
import Dashboard from "./Dashboard";
import AddServices from "./addServices";
import AddEmployee from "./addEmployee";
import RoleNavbar from "../navbar";

const OwnerSide = props => {
  const { path } = props.match;
  return (
    <div>
      <RoleNavbar role={props.role} />
      <Switch>
        <Route exact path={path} component={Dashboard} />
        <Route path={path + "/add-service"} component={AddServices} />
        <Route path={path + "/add-employee"} component={AddEmployee} />
        <Redirect to={path} />
      </Switch>
    </div>
  );
};

const mapStateToProps = state => ({
  role: state.authentication.user.role
});

export default connect(mapStateToProps)(OwnerSide);
