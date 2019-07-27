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
      <div>
        <div style={{ marginTop: "60px" }}>
          <Switch>
            {/* Employee homepage */}
            <PrivateRoute
              path="/employee"
              user={currentUser}
              roles={[Role.Employee]}
              component={EmployeeSide}
            />
            {/* Owner homepage */}
            <PrivateRoute
              path="/owner"
              user={currentUser}
              roles={[Role.Owner]}
              component={OwnerSide}
            />
            {/* Super admin homepage */}
            <PrivateRoute
              path="/super-admin"
              user={currentUser}
              roles={[Role.SuperAdmin]}
              component={SuperAdminSide}
            />
            {/* Guest and user homepage */}
            <PrivateRoute
              path="/"
              user={currentUser}
              roles={[Role.Guest, Role.User]}
              component={UserSide}
            />
            <RedirectHelper role={currentUser.role} />
          </Switch>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.authentication.user
});

export default withRouter(connect(mapStateToProps)(App));
