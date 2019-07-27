import { userConstants } from "../constants/userConstants";

export function users(state = {}, action) {
  switch (action.type) {
    case userConstants.GETALL_REQUEST:
      return {
        loading: true
      };
    case userConstants.GETALL_SUCCESS:
      return {
        loading: false,
        items: action.users
      };
    case userConstants.GETALL_FAILURE:
      return {
        loading: false,
        error: action.error
      };
    default:
      return state;
  }
}
