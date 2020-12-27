import * as types from "./constants";
//get profile
export const getSavePost = () => {
  return {
    type: types.GET_SAVE,
  };
};

export const getSavePostSuccess = data => {
  return {
    type: types.GET_SAVE_SUCCESS,
    payload: {
      data
    }
  };
};

export const getSavePostError = error => {
  return {
    type: types.GET_SAVE_ERROR,
    payload: {
      error
    }
  };
};

export const closeModalError = () => {
  return {
    type: types.CLOSE_ERROR_MODAL
  };
};

export const openModalChangeProfile = () => {
  return {
    type: types.OPEN_MODAL_CHANGE_PROFILE,
  };
};

export const closeModalChangeProfile = () => {
  return {
    type: types.CLOSE_MODAL_CHANGE_PROFILE,
  };
};

export const changeProfile = (data) => {
  return {
    type: types.CHANGE_PROFILE,
    payload: {
      data
    }
  };
};

export const changeProfileSuccess = data => {
  return {
    type: types.CHANGE_PROFILE_SUCCESS,
    payload: {
      data
    }
  };
};

export const changeProfileError = error => {
  return {
    type: types.CHANGE_PROFILE_ERROR,
    payload: {
      error
    }
  };
};