const LOG_IN = "LOG_IN";

const initialState = {
  userId: null
};

export const logIn = userId => dispatch => {
  dispatch({
    type: LOG_IN,
    payload: userId
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN:
      return {
        userId: action.payload
      };
    default:
      return state;
  }
};

export default reducer;
