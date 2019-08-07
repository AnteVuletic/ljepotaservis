import React from "react";
import { connect } from "react-redux";
import { Route, Switch, Redirect } from "react-router";
import Dashboard from "./Dashboard";
import Services from "./services";
import Employees from "./employees";
import Portfolios from "./portfolios/index";
import RoleNavbar from "../navbar";

const OwnerSide = props => {
  const { path } = props.match;
  return (
    <div>
      <RoleNavbar role={props.role} />
      <Switch>
        <Route exact path={path} component={Dashboard} />
        <Route path={path + "/services"} component={Services} />
        <Route path={path + "/employees"} component={Employees} />
        <Route path={path + "/portfolios"} component={Portfolios} />
        <Redirect to={path} />
      </Switch>
    </div>
  );
};

const mapStateToProps = state => ({
  role: state.authentication.user.role
});

export default connect(mapStateToProps)(OwnerSide);
