import { userConstants } from "../constants/userConstants";
import { authentication } from "../../services/authentication";

export const login = (email, password) => {
  return dispatch => {
    dispatch(request());
    authentication.login(email, password).then(
      user => {
        dispatch(success(user));
      },
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: userConstants.LOGIN_REQUEST };
  }
  function success(user) {
    return { type: userConstants.LOGIN_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.LOGIN_FAILURE, error };
  }
};

export const logout = () => {
  authentication.logout();
  return { type: userConstants.LOGOUT };
};
