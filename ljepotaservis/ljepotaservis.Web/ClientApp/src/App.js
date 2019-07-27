import React, { Component } from "react";
import { connect } from "react-redux";
import { Switch, withRouter } from "react-router";
import PrivateRoute from "./components/routeHelpers/PrivateRoute";
import Role from "./utils/role";
import SuperAdminSide from "./components/superAdminSide";
import OwnerSide from "./components/ownerSide";
import EmployeeSide from "./components/employeeSide";
import Home from "./components/userSide/Home";
import Authentication from "./components/authentication";
import Store from "./components/userSide/Store";
import RedirectHelper from "./components/routeHelpers/RedirectHelper";

class App extends Component {
  render() {
    const { user } = this.props.authentication;
    return (
      <div>
        <div style={{ marginTop: "60px" }}>
          <Switch>
            {/* Guest and user homepage */}
            <PrivateRoute
              exact
              path="/"
              user={user}
              roles={[Role.Guest, Role.User]}
              component={Home}
            />
            {/* Store routes */}
            <PrivateRoute
              path={"/stores/:id"}
              user={user}
              roles={[Role.Guest, Role.User]}
              component={Store}
            />
            {/* Login and registration */}
            <PrivateRoute
              path={"/authentication"}
              user={user}
              roles={[Role.Guest]}
              component={Authentication}
            />
            {/* Employee homepage */}
            <PrivateRoute
              path="/employee"
              user={user}
              roles={[Role.Employee]}
              component={EmployeeSide}
            />
            {/* Owner homepage */}
            <PrivateRoute
              path="/owner"
              user={user}
              roles={[Role.Owner]}
              component={OwnerSide}
            />
            {/* Super admin homepage */}
            <PrivateRoute
              path="/super-admin"
              user={user}
              roles={[Role.SuperAdmin]}
              component={SuperAdminSide}
            />
            <RedirectHelper role={user.role} />
          </Switch>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  authentication: state.authentication.user
    ? { ...state.authentication }
    : { ...state.authentication, user: { role: Role.Guest } }
});

export default withRouter(connect(mapStateToProps)(App));
