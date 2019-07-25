import React from "react";
import Dashboard from "./Dashboard";
import Reservations from "./Reservations";
import { Route, Switch, Redirect } from "react-router";

export default function EmployeeSide(props) {
  const { path } = props.match;
  return (
    <Switch>
      <Route exact path={path} component={Dashboard} />
      <Route path={path + "/reservations"} component={Reservations} />
      <Redirect to={path} />
    </Switch>
  );
}
