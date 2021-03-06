import React from "react";
import { connect } from "react-redux";
import { Route, Switch, Redirect } from "react-router";
import RoleNavbar from "../navbar";
import PrivateRoute from "../routeHelpers/PrivateRoute";
import Home from "./home";
import Store from "./store";
import Authentication from "../authentication";
import Role from "../../utils/role";
import Reservations from "./reservations";

const UserSide = props => {
  const { path } = props.match;

  return (
    <React.Fragment>
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
        <PrivateRoute
          path={path + "reservations"}
          user={props.user}
          roles={[Role.User]}
          component={Reservations}
        />
        <Redirect to="/" />
      </Switch>
    </React.Fragment>
  );
};

const mapStateToProps = state => ({
  user: state.authentication.user
});

export default connect(mapStateToProps)(UserSide);
