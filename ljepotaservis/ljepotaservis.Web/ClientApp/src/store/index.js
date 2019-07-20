import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import userReducer from "./modules/user";
import reservationReducer from "./modules/reservation";

const middleware = [thunk];
const rootReducer = combineReducers({
  user: userReducer,
  reservation: reservationReducer
});
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
