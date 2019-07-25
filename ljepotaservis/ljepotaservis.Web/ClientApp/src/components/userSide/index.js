import React from "react";
import Dashboard from "./Dashboard";
import Login from "../authentication/Login";
import Registration from "../authentication/Registration";
import Store from "./Store";
import { Route, Switch, Redirect } from "react-router";

export default function UserSide(props) {
  const { path } = props.match;
  return (
    <Switch>
      <Route exact path={path} component={Dashboard} />
      <Route path={path + "register"} component={Registration} />
      <Route path={path + "login"} component={Login} />
      <Route path={path + "stores/:id"} component={Store} />
    </Switch>
  );
}
