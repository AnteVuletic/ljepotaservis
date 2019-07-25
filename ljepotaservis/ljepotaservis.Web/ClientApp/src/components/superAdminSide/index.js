import React from "react";
import Dashboard from "./Dashboard";
import Stores from "./Stores";
import { Route, Switch, Redirect } from "react-router";

export default function SuperAdminSide(props) {
  const { path } = props.match;
  return (
    <Switch>
      <Route exact path={path} component={Dashboard} />
      <Route path={path + "/stores"} component={Stores} />
      <Redirect to={path} />
    </Switch>
  );
}
