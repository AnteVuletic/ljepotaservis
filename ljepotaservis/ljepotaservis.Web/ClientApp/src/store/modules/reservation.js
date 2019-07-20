const CHANGE_DATE = "CHANGE_DATE";

const initialState = {
  date: null
};

export const changeDate = date => dispatch => {
  dispatch({
    type: CHANGE_DATE,
    payload: date
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_DATE:
      return {
        date: action.payload
      };
    default:
      return state;
  }
};

export default reducer;
