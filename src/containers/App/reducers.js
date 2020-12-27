import * as types from "./constants";

const initialState = {
  isGetProfile: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.IS_GET_PROFILE: {
      return {
        ...state,
        isGetProfile: true,
      };
    }
    case types.IS_NOT_GET_PROFILE: {
      return {
        ...state,
        isGetProfile: false,
      };
    }
    default:
      return state;
  }
};

export default reducer;
