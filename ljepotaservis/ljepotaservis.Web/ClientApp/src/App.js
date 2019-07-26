import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Switch, Redirect, withRouter } from "react-router";
import PrivateRoute from "./components/PrivateRoute";
import Role from "./utils/role";
import SuperAdminSide from "./components/superAdminSide";
import OwnerSide from "./components/ownerSide";
import EmployeeSide from "./components/employeeSide";
import Home from "./components/Home";
import Authentication from "./components/authentication";
import Store from "./components/userSide/Store";

class App extends Component {
  render() {
    return (
      <div>
        <div style={{ marginTop: "60px" }}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path={"/stores/:id"} component={Store} />
            <Route path={"/authentication"} component={Authentication} />
            <PrivateRoute
              path="/super-admin"
              user={this.props.authentication.user}
              roles={[Role.SuperAdmin]}
              component={SuperAdminSide}
            />
            <PrivateRoute
              path="/owner"
              user={this.props.authentication.user}
              roles={[Role.Owner]}
              component={OwnerSide}
            />
            <PrivateRoute
              path="/employee"
              user={this.props.authentication.user}
              roles={[Role.Employee]}
              component={EmployeeSide}
            />
            <Redirect to="/" />
          </Switch>
        </div>
      </div>
    );
  }
}
//Private route component je na Home samo za testiranje trenutno

const mapStateToProps = state => ({
  authentication: { ...state.authentication }
});

export default withRouter(connect(mapStateToProps)(App));
