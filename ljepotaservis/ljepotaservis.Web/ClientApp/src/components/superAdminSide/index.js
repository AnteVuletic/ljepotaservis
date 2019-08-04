import React from "react";
import { connect } from "react-redux";
import { Route, Switch, Redirect } from "react-router";
import Dashboard from "./Dashboard";
import AddStoreAndOwner from "./AddStore/index";
import RoleNavbar from "../navbar";

const SuperAdminSide = props => {
  const { path } = props.match;
  return (
    <div>
      <RoleNavbar role={props.role} />
      <Switch>
        <Route exact path={path} component={Dashboard} />
        <Route path={path + "/add-store"} component={AddStoreAndOwner} />
        <Redirect to={path} />
      </Switch>
    </div>
  );
};

const mapStateToProps = state => ({
  role: state.authentication.user.role
});

export default connect(mapStateToProps)(SuperAdminSide);
