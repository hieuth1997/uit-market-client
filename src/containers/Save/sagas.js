import { call, takeLatest, put, select } from "redux-saga/effects";
import axios from "axios";

import {
  getSavePostSuccess,
  getSavePostError,
} from "./actions";

import * as constNewFeed from "./constants";
import * as api from "./../../constants/endpoint";
import * as host from "./../../constants/host";

const apigetSave = async () => {
  let userId = await localStorage.getItem("userId");
  let token = await localStorage.getItem("jwtToken");
  if (!token) token = await sessionStorage.getItem("jwtToken");
  let result = await axios.get(`${host.apiUrl}${api.apigetSave}/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    },
    timeout: 100000
  });
  return result;
};

function* getSave() {
  try {
    const resp = yield call(apigetSave);
    const { data, status } = resp;
    if (status === 200) {
      yield put(getSavePostSuccess(data.data.result));
    }
  } catch (error) {
    if (error.response && error.response.data.error) {
      yield put(getSavePostError(error.response.data));
    } else {
      yield put(getSavePostError(error));
    }
  }
}

function* savePostSaga() {
  yield takeLatest(constNewFeed.GET_SAVE, getSave);
}

export default savePostSaga();
