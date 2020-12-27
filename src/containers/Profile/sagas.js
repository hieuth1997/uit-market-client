import { call, takeLatest, put, select } from "redux-saga/effects";
import axios from "axios";

import {
  getProfileSuccess,
  getProfileError,

  changeProfileSuccess,
  changeProfileError,
} from "./actions";

import * as constNewFeed from "./constants";
import * as api from "./../../constants/endpoint";
import * as host from "./../../constants/host";

const apiGetProfile = async () => {
  let userId = await localStorage.getItem("userId");
  let token = await localStorage.getItem("jwtToken");
  if (!token) token = await sessionStorage.getItem("jwtToken");
  let result = await axios.get(`${host.apiUrl}${api.apiGetProfile}/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    },
    timeout: 100000
  });
  return result;
};

function* getProfile() {
  try {
    const resp = yield call(apiGetProfile);
    const { data, status } = resp;
    if (status === 200) {
      yield put(getProfileSuccess(data.data.result));
    }
  } catch (error) {
    if (error.response && error.response.data.error) {
      yield put(getProfileError(error.response.data));
    } else {
      yield put(getProfileError(error));
    }
  }
}

const changeProfileApi = async (data) => {
  let userId = await localStorage.getItem("userId");
  let token = await localStorage.getItem("jwtToken");
  if (!token) token = await sessionStorage.getItem("jwtToken");
  let result = await axios({
    method: "PUT",
    url: `${host.apiUrl}${api.apiChangeProfile}/${userId}`,
    data: data,
    headers: {
      Authorization: `Bearer ${token}`
    },
  });
  return result;
};

function* changeProfile(action) {
  try {
    const { data } = action.payload;
    const response = yield call(changeProfileApi, data);
    if (response.status === 200) {
      yield put(changeProfileSuccess(data.data.result));
    }
  }
  catch (error) {
    if (error.response && error.response.data.error) {
      yield put(changeProfileError(error.response.data));
    } else {
      yield put(changeProfileError(error));
    }
  }
}

function* profileSaga() {
  yield takeLatest(constNewFeed.GET_PROFILE, getProfile);
  yield takeLatest(constNewFeed.CHANGE_PROFILE, changeProfile);
}

export default profileSaga();
