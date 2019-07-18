import React from "react";
import { Route } from "react-router";
import Registration from "./components/authentication/Registration";
import Login from "./components/authentication/Login";
import Home from "./components/Home";

export default () => (
  <div>
    <Route exact path="/" component={Home} />
    <Route path="/register" component={Registration} />
    <Route path="/login" component={Login} />
  </div>
);
