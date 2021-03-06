import React from "react";
import { Route, Switch, Redirect } from "react-router";
import { connect } from "react-redux";
import Login from "./Login";
import Registration from "./Registration";
import EmailConfirmation from "./EmailConfirmation";

const Authentication = props => {
  const { path } = props.match;
  return (
    <React.Fragment>
      <Switch>
        <Route path={path + "/login"} component={Login} />
        <Route path={path + "/registration"} component={Registration} />
        <Route
          path={path + "/emailconfirmation/:userId"}
          component={EmailConfirmation}
        />
        <Redirect to={path + "/registration"} />
      </Switch>
    </React.Fragment>
  );
};

const mapStateToProps = state => ({
  role: state.authentication.user.role
});

export default connect(mapStateToProps)(Authentication);
