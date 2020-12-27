import * as types from "./constants";

const initialState = {
  errors: [],
  userProfile: [],
  open: false,
  isLoading: false,
  openModalChangeProfile: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {

    //get profile
    case types.GET_PROFILE: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case types.GET_PROFILE_SUCCESS: {
      const { data } = action.payload;
      return {
        ...state,
        userProfile: data,
        isLoading: false,
      };
    }
    case types.GET_PROFILE_ERROR: {
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
    case types.OPEN_MODAL_CHANGE_PROFILE: {
      return {
        ...state,
        openModalChangeProfile: true,
      };
    }
    case types.CLOSE_MODAL_CHANGE_PROFILE: {
      return {
        ...state,
        openModalChangeProfile: false,
      };
    }

    
    case types.CHANGE_PROFILE: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case types.CHANGE_PROFILE_SUCCESS: {
      const { data } = action.payload;
      return {
        ...state,
        userProfile: data,
        isLoading: false,
      };
    }
    case types.CHANGE_PROFILE_ERROR: {
      let { error } = action.payload;
      return {
        ...state,
        errors: error,
        open: true,
        isLoading: false,
      };
    }
    default:
      return state;
  }
};

export default reducer;
