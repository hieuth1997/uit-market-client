import { call, takeLatest, put, select } from "redux-saga/effects";
import {
  getNewFeedSuccess,
  getNewFeedError,
  argeeDeleteSuccess,

  postStatusSuccess,
  postStatusError,

  getSchoolSuccess,
  getSchoolError,

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

const apiGetNewFeed = async getStateAskPage => {
  let userId = await localStorage.getItem("userId");
  let token = await localStorage.getItem("jwtToken");
  if (!token) token = await sessionStorage.getItem("jwtToken");
  const { offset, limit, sortDate, sortPrice, keyword, schoolId, categoryId } = getStateAskPage.lazyLoading;
  let result = await axios.get(`${host.apiUrl}${api.apiViewAskPost}?offset=${offset}&limit=${limit}&productCategoryId=${categoryId}&schoolId=${schoolId}&priceOrderedBy=${sortPrice}&createdDateOrderedBy=${sortDate}&searching=${keyword}&myUserId=${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    },
    timeout: 100000
  });
  return result;
};

const apigetSchool = async token => {
  let result = await axios.get(`${host.apiUrl}${api.apigetSchool}`, {
    headers: {
      Authorization: `Bearer ${token}`
    },
    timeout: 100000
  });
  return result;
};

const apiGetVideos = async token => {
  let result = await axios.get(`${host.apiUrl}${api.apiGetVideos}?offset=0&limit=3&sort=desc`, {
    headers: {
      Authorization: `Bearer ${token}`
    },
    timeout: 100000
  });
  return result;
};

const apiGetConnections = async token => {
  let result = await axios.get(`${host.apiUrl}${api.apiGetConnections}`, {
    headers: {
      Authorization: `Bearer ${token}`
    },
    timeout: 100000
  });
  return result;
};

const apiDeleteStatus = async idPost => {
  let token = await localStorage.getItem("jwtToken");
  if (!token) token = await sessionStorage.getItem("jwtToken");
  let result = await axios({
    method: "DELETE",
    url: `${host.apiUrl}${api.apiDeleteAsk}/${idPost}`,
    headers: {
      Authorization: `Bearer ${token}`
    },
  });
  return result;
};

const apiLikeAsk = async postId => {
  let userId = await localStorage.getItem("userId");
  let token = await localStorage.getItem("jwtToken");
  if (!token) token = await sessionStorage.getItem("jwtToken");
  let result = await axios({
    method: "PUT",
    url: `${host.apiUrl}${api.apiReaction}/${postId}/update/like?userId=${userId}`,
    headers: {
      Authorization: `Bearer ${token}`
    },
  });
  return result;
};

const apiAddComment = async comment => {
  console.log(comment);
  let userId = await localStorage.getItem("userId");
  let token = await localStorage.getItem("jwtToken");
  if (!token) token = await sessionStorage.getItem("jwtToken");
  const commentData = {
    ...comment,
    "userId": userId
  }
  console.log(commentData);

  let result = await axios({
    method: "POST",
    url: `${host.apiUrl}${api.apiAddComment}`,
    data: commentData,
    headers: {
      Authorization: `Bearer ${token}`
    },
  });
  return result;
};

const apiGetComments = async askId => {
  let token = await localStorage.getItem("jwtToken");
  if (!token) token = await sessionStorage.getItem("jwtToken");
  let result = await axios.get(`${host.apiUrl}${api.apiGetComments}/${askId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    },
    timeout: 100000
  });
  return result;
};
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
function* getNewFeed() {
  try {
    const getStateAskPage = yield select(state => state.askPage);
    const resp = yield call(apiGetNewFeed, getStateAskPage);
    const { data, status } = resp;
    if (status === 200) {
      yield put(getNewFeedSuccess(data.data.result));
    }
  } catch (error) {
    if (error.response && error.response.data.error) {
      if (error.response.status === 401) {
        yield put({ type: PUSH_SIGNIN });
        yield put(closeModalError());
      }
      else {
        yield put(getNewFeedError(error.response.data));
      }
    } else {
      yield put(push("/500"));
      yield put(getNewFeedError(error));
    }
  }
}

function* getSchool() {
  try {
    let token;
    if (localStorage.getItem("jwtToken")) {
      token = yield localStorage.getItem("jwtToken");
    }
    else {
      token = yield sessionStorage.getItem("jwtToken");
    }
    const resp = yield call(apigetSchool, token);
    const { data, status } = resp;

    if (status === 200) {
      yield put(getSchoolSuccess(data.data.result));
    }
  } catch (error) {
    if (error.response && error.response.data.error) {
      if (error.response.status === 401) {
        yield put({ type: PUSH_SIGNIN });
        yield put(closeModalError());
      }
      else {
        yield put(getSchoolError(error.response.data));
      }
    } else {
      yield put(getSchoolError(error));
    }
  }
}

function* getSectionConnection() {
  try {
    let token;
    if (localStorage.getItem("jwtToken")) {
      token = yield localStorage.getItem("jwtToken");
    }
    else {
      token = yield sessionStorage.getItem("jwtToken");
    }
    const resp = yield call(apiGetConnections, token);
    const { data, status } = resp;
    if (status === 200) {
      yield put(getConnectionSuccess(data.data));
    }
  } catch (error) {
    if (error.response && error.response.data.error) {
      yield put(getConnectionError(error.response.data));
    } else {
      yield put(getConnectionError(error));
    }
  }
}

function* getSectionVideo() {
  try {
    let token = localStorage.getItem("jwtToken");
    if (!token) token = sessionStorage.getItem("jwtToken");
    const resp = yield call(apiGetVideos, token);
    const { data, status } = resp;
    if (status === 200) {
      yield put(getVideoSuccess(data.data.listVideos));
    }
  } catch (error) {
    if (error.response && error.response.data.error) {
      yield put(getVideoError(error.response.data));
    } else {
      yield put(getVideoError(error));
    }
  }
}

function* deleteStatus({ payload }) {
  try {
    let isPost = payload.data;
    const resp = yield call(apiDeleteStatus, isPost);
    const { status } = resp;
    if (status === 200) {
      yield put(argeeDeleteSuccess(isPost));
    }
  } catch (error) {
    if (error.response && error.response.data.error) {
      if (error.response.status === 401) {
        yield put({ type: PUSH_SIGNIN });
        yield put(closeModalError());
      }
      else {
        yield put(getNewFeedError(error.response.data));
      }
    } else {
      yield put(getNewFeedError(error));
    }
  }
}

function* likeAsk({ payload }) {
  try {
    let postId = payload.data;
    const resp = yield call(apiLikeAsk, postId);
    const { data, status } = resp;
    if (status === 200) {
      yield put(likeAskSuccess(data.data));
    }
  } catch (error) {
    if (error.response && error.response.data.error) {
      if (error.response.status === 401) {
        yield put({ type: PUSH_SIGNIN });
        yield put(closeModalError());
      }
      else {
        yield put(likeAskError(error.response.data));
      }
    } else {
      yield put(likeAskError(error));
    }
  }
}

function* addComment({ payload }) {
  try {
    let comment = payload.data;
    const resp = yield call(apiAddComment, comment);
    const { data, status } = resp;
    console.log(data);
    
    if (status === 200) {
      yield put(addCommentSuccess(data.data.result));
    }
  } catch (error) {
    if (error.response && error.response.data.error) {
      yield put(addCommentError(error.response.data));
    } else {
      yield put(addCommentError(error));
    }
  }
}

function* getComment({ payload }) {
  try {
    let askId = payload.data;
    const resp = yield call(apiGetComments, askId);
    const { data, status } = resp;
    if (status === 200) {
      yield put(getCommentSuccess(data.data.result));
    }
  } catch (error) {
    if (error.response && error.response.data.error) {
      yield put(getCommentError(error.response.data));
    } else {
      yield put(getCommentError(error));
    }
  }
}
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

function* getNewFeedSaga() {
  yield takeLatest(constNewFeed.GET_NEW_FEED, getNewFeed);
  yield takeLatest(constNewFeed.GET_SECTION_NEWS, getSchool);
  yield takeLatest(constNewFeed.GET_VIDEO, getSectionVideo);
  yield takeLatest(constNewFeed.GET_CONNECTION, getSectionConnection);
  yield takeLatest(constNewFeed.LIKE_ASK, likeAsk);
  yield takeLatest(constNewFeed.ADD_COMMENT, addComment);
  yield takeLatest(constNewFeed.GET_COMMENT, getComment);

  yield takeLatest(constNewFeed.ARGEE_DELETE, deleteStatus);
  yield takeLatest(constNewFeed.GET_PROFILE, getProfile);


  yield takeLatest(constNewFeed.GET_CATEGORY, getCategory);
}

export default getNewFeedSaga();
