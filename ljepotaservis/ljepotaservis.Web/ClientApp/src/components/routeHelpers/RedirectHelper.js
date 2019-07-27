import React from "react";
import { Redirect } from "react-router-dom";
import Role from "../../utils/role";

export default function RedirectHelper(props) {
  switch (props.role) {
    case Role.Guest:
      return <Redirect to="/" />;
    case Role.User:
      return <Redirect to="/" />;
    case Role.Employee:
      return <Redirect to="/employee" />;
    case Role.Owner:
      return <Redirect to="/owner" />;
    case Role.SuperAdmin:
      return <Redirect to="/super-admin" />;
    default:
      return <Redirect to="/" />;
  }
}
