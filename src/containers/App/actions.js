import * as types from "./constants";
// get Ask post
export const isGetProfile = () => {
  return {
    type: types.IS_GET_PROFILE,
  };
};

export const isNotGetProfile = () => {
  return {
    type: types.IS_NOT_GET_PROFILE,
  };
};