import * as types from "./constants";

// user post product
export const postStatus = (resolve, reject, data) => {
  return {
    type: types.POST_STATUS,
    payload: {
      resolve, reject,
      data
    }
  };
};

export const postStatusSuccess = data => {
  return {
    type: types.POST_STATUS_SUCCESS,
    payload: {
      data
    }
  };
};

export const postStatusError = error => {
  return {
    type: types.POST_STATUS_ERROR,
    payload: {
      error
    }
  };
};

export const closeModalError = () => {
  return {
    type: types.CLOSE_GET_NEW_FEED_ERROR_MODAL
  };
};

//get profile
export const getProfile = () => {
  return {
    type: types.GET_PROFILE,
  };
};

export const getProfileSuccess = data => {
  return {
    type: types.GET_PROFILE_SUCCESS,
    payload: {
      data
    }
  };
};

export const getProfileError = error => {
  return {
    type: types.GET_PROFILE_ERROR,
    payload: {
      error
    }
  };
};

//get Category
export const getCategory = data => {
  return {
    type: types.GET_CATEGORY,
    payload: {
      data
    }
  };
};

export const getCategorySuccess = data => {
  return {
    type: types.GET_CATEGORY_SUCCESS,
    payload: {
      data
    }
  };
};

export const getCategoryError = error => {
  return {
    type: types.GET_CATEGORY_ERROR,
    payload: {
      error
    }
  };
};

export const putCategory = value => {
  return {
    type: types.PUT_CATEGORY,
    payload: {
      value
    }
  };
};