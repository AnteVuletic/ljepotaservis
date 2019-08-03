import React from "react";
import { connect } from "react-redux";
import { Route, Switch, Redirect } from "react-router";
import RoleNavbar from "../navbar";
import PrivateRoute from "../routeHelpers/PrivateRoute";
import Home from "./home";
import Store from "./Store";
import Authentication from "../authentication";
import Role from "../../utils/role";

const UserSide = props => {
  const { path } = props.match;

  return (
    <div>
      <RoleNavbar role={props.user.role} />
      <Switch>
        <Route exact path={path} component={Home} />
        <Route path={path + "stores/:id"} component={Store} />
        <PrivateRoute
          path={path + "authentication"}
          user={props.user}
          roles={[Role.Guest]}
          component={Authentication}
        />
        <Redirect to="/" />
      </Switch>
    </div>
  );
};

const mapStateToProps = state => ({
  user: state.authentication.user
});

export default connect(mapStateToProps)(UserSide);
