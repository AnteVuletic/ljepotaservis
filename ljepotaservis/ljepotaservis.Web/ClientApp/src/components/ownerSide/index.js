import React from "react";
import Dashboard from "./Dashboard";
import Employees from "./Employees";
import { Route, Switch, Redirect } from "react-router";

export default function OwnerSide(props) {
  const { path } = props.match;
  return (
    <Switch>
      <Route exact path={path} component={Dashboard} />
      <Route path={path + "/employees"} component={Employees} />
      <Redirect to={path} />
    </Switch>
  );
}
