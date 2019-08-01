import { userConstants } from "../constants/userConstants";
import { userService } from "../../services/userServices";

export const login = (email, password) => {
  return dispatch => {
    dispatch(request());

    userService.login(email, password)
    .then(user => {
        dispatch(success(user));
      },
      error => {
        dispatch(failure(error));
      });
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
}

export const register = (username, email, password) => {
  return dispatch => {
    dispatch(request());
    
    userService.register(username, email, password)
      .then(() => {
        dispatch(success());
      },
      error => {
        dispatch(failure(error));
      });
  }

  
  function request() {
    return { type: userConstants.REGISTER_REQUEST };
  }
  function success() {
    return { type: userConstants.REGISTER_SUCCESS };
  }
  function failure(error) {
    return { type: userConstants.REGISTER_FAILURE, error };
  }
}

export const logout = () => {
  userService.logout();
  return { type: userConstants.LOGOUT };
}

export const getAll = () => {
  return dispatch => {
    dispatch(request());

    userService.getAll().then(
      users => dispatch(success(users)),
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: userConstants.GETALL_REQUEST };
  }
  function success(users) {
    return { type: userConstants.GETALL_SUCCESS, users };
  }
  function failure(error) {
    return { type: userConstants.GETALL_FAILURE, error };
  }
}
