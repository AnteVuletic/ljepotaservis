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
      loading: false,
      user
    };
  }
}

export function authentication(state = initialState, action) {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        loggedIn: false,
        loading: true,
        ...state
      };
    case userConstants.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        loading: false,
        user: action.user
      };
    case userConstants.LOGIN_FAILURE:
      return {
        loggedIn: false,
        loading: false,
        user: { role: "Guest" }
      };
    case userConstants.REGISTER_REQUEST:
      return {
        loading: true,
        ...state
      };
    case userConstants.REGISTER_SUCCESS:
      return {
        loading: false,
        ...state
      };
    case userConstants.REGISTER_FAILURE:
      return {
        loading: false,
        ...state
      }
    case userConstants.LOGOUT:
      return {
        loggedIn: false,
        user: { role: "Guest" }
      };
    default:
      return state;
  }
}
