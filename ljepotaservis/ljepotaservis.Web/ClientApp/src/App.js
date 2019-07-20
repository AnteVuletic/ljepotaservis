import React from "react";
import { Route, Switch } from "react-router";
import Registration from "./components/authentication/Registration";
import Login from "./components/authentication/Login";
import Home from "./components/userSide/Home";
import NavbarComponent from "./components/NavbarComponent";
import { PrivateRoute } from "./utils/PrivateRoute";
import Store from "./components/userSide/Store";

export default () => (
  <div>
    <NavbarComponent />
    <div style={{ marginTop: "60px" }}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/register" component={Registration} />
        <Route path="/login" component={Login} />
        <Route path="/stores/:id" component={Store} />
      </Switch>
    </div>
  </div>
);
