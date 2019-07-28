import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { users } from "./reducers/users";
import { authentication } from "./reducers/authentication";

const middleware = [thunk];
const rootReducer = combineReducers({
  users,
  authentication
});
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
