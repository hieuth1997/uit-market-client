import * as types from "./constants";

const initialState = {
  errors: [],
  postSave: [],
  open: false,
  isLoading: false,
  openModalChangeProfile: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {

    //get profile
    case types.GET_SAVE: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case types.GET_SAVE_SUCCESS: {
      const { data } = action.payload;
      return {
        ...state,
        postSave: data,
        isLoading: false,
      };
    }
    case types.GET_SAVE_ERROR: {
      let { error } = action.payload;
      return {
        ...state,
        errors: error,
        isLoading: false,
        open: true,
      };
    }
    //modal
    case types.CLOSE_ERROR_MODAL: {
      return {
        ...state,
        open: false,
        isLoading: false,
      };
    }
    default:
      return state;
  }
};

export default reducer;
