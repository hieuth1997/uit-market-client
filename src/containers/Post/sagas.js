import { call, takeLatest, put, select } from "redux-saga/effects";
import {
  // getNewFeedSuccess,
  // getNewFeedError,

  postStatusSuccess,
  postStatusError,

  getSectionNewsSuccess,
  getSectionNewsError,

  getVideoSuccess,
  getVideoError,

  getConnectionSuccess,
  getConnectionError,

  likeAskSuccess,
  likeAskError,

  addCommentSuccess,
  addCommentError,
  getCommentSuccess,
  getCommentError,

  getProfileSuccess,
  getProfileError,
  closeModalError,

  getCategorySuccess,
  getCategoryError,
} from "./actions";

import {
  PUSH_SIGNIN
} from '../signin/constants';

import * as constNewFeed from "./constants";
import * as api from "./../../constants/endpoint";
import * as host from "./../../constants/host";
import { push } from 'connected-react-router';
import axios from "axios";

const apiGetCategory = async () => {
  let token = await localStorage.getItem("jwtToken");
  if (!token) token = await sessionStorage.getItem("jwtToken");
  let result = await axios.get(`${host.apiUrl}${api.apiGetCategory}`, {
    headers: {
      Authorization: `Bearer ${token}`
    },
    timeout: 100000
  });
  return result;
};

const apiPostStatus = async (newPost, getStatePost) => {

  let formData = new FormData()
  if (newPost.bannerFile !== undefined) {
    if (newPost.bannerFile[0] !== undefined) {
      formData.append('bannerFile', newPost.bannerFile[0],
      );
    }
  }

  if (newPost.productImageFiles !== undefined) {
    for (const file of newPost.productImageFiles) {
      formData.append('productImageFiles', file);
    }
  }

  const userId = await localStorage.getItem("userId");
  let token = await localStorage.getItem("jwtToken");
  if (!token) token = await sessionStorage.getItem("jwtToken");
  let result = await axios({
    method: "POST",
    url: `${host.apiUrl}${api.apiPostAsk}?title=${newPost.title}&price=${newPost.price}&content=${newPost.content}&productCategoryId=${getStatePost.categoryId}&userId=${userId}`,
    data: formData,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return result;
};

function* postStatus({ payload }) {
  try {
    const { resolve } = payload;
    let newPost = payload.data;
    const getStatePost = yield select(state => state.post);
    const resp = yield call(apiPostStatus, newPost, getStatePost);
    const { data, status } = resp;
    if (status === 200) {
      yield put(postStatusSuccess(data.data.result));
      yield resolve(data.data.result)
    }
  } catch (error) {
    if (error.response && error.response.data.error) {
      if (error.response.status === 401) {
        yield put({ type: PUSH_SIGNIN });
        yield put(closeModalError());
      }
      else {
        yield put(postStatusError(error.response.data));
      }
    } else {
      yield put(postStatusError(error));
    }
  }
}

function* getCategory() {
  try {
    const resp = yield call(apiGetCategory);
    const { data, status } = resp;
    if (status === 200) {
      yield put(getCategorySuccess(data.data.result));
    }
  } catch (error) {
    if (error.response && error.response.data.error) {
      if (error.response.status === 401) {
        yield put({ type: PUSH_SIGNIN });
        yield put(closeModalError());
      }
      else {
        yield put(getCategoryError(error.response.data));
      }
    } else {
      yield put(push("/500"));
      yield put(getCategoryError(error));
    }
  }
}

function* postSaga() {
  yield takeLatest(constNewFeed.POST_STATUS, postStatus);
  yield takeLatest(constNewFeed.GET_CATEGORY, getCategory);
}

export default postSaga();
