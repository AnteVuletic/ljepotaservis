import React from "react";
import { Route } from "react-router-dom";
import RedirectHelper from "./RedirectHelper";

const PrivateRoute = ({ component: Component, roles, user, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (roles && roles.indexOf(user.role) === -1) {
          return <RedirectHelper role={user.role} />;
        }

        return <Component {...props} />;
      }}
    />
  );
};

export default PrivateRoute;
