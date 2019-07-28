import { userConstants } from "../constants/userConstants";
import Role from "../../utils/role";

let user = JSON.parse(localStorage.getItem("user"));

let initialState = {
  loggedIn: false,
  user: { role: Role.Guest }
};

if (user) {
  if (Role.hasOwnProperty(user.role)) {
    initialState = {
      loggedIn: true,
      user
    };
  }
}

export function authentication(state = initialState, action) {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        loggingIn: true,
        user: action.user
      };
    case userConstants.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.user
      };
    case userConstants.LOGIN_FAILURE:
      return {
        loggedIn: false,
        user: { role: "Guest" }
      };
    case userConstants.LOGOUT:
      return {
        loggedIn: false,
        user: { role: "Guest" }
      };
    default:
      return state;
  }
}
