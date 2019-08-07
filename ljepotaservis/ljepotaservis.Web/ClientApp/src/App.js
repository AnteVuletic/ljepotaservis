import React, { Component } from "react";
import { connect } from "react-redux";
import { Switch, withRouter } from "react-router";
import PrivateRoute from "./components/routeHelpers/PrivateRoute";
import Role from "./utils/role";
import SuperAdminSide from "./components/superAdminSide";
import OwnerSide from "./components/ownerSide";
import EmployeeSide from "./components/employeeSide";
import UserSide from "./components/userSide";
import RedirectHelper from "./components/routeHelpers/RedirectHelper";

class App extends Component {
  render() {
    const { currentUser } = this.props;
    return (
      <React.Fragment>
        <Switch>
          <PrivateRoute
            path="/employee"
            user={currentUser}
            roles={[Role.Employee]}
            component={EmployeeSide}
          />
          <PrivateRoute
            path="/owner"
            user={currentUser}
            roles={[Role.Owner]}
            component={OwnerSide}
          />
          <PrivateRoute
            path="/super-admin"
            user={currentUser}
            roles={[Role.SuperAdmin]}
            component={SuperAdminSide}
          />
          <PrivateRoute
            path="/"
            user={currentUser}
            roles={[Role.Guest, Role.User]}
            component={UserSide}
          />
          <RedirectHelper role={currentUser.role} />
        </Switch>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.authentication.user
});

export default withRouter(connect(mapStateToProps)(App));
