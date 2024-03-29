
import { call, takeLatest, put, select } from "redux-saga/effects";
import {
} from "./actions";
import * as types from "./constants";
import * as apiHost from "./../../constants/host";
import * as apiEndPoint from "./../../constants/endpoint";
import { getVideoSuccess, getLearnDetailSuccess, getVideoError, getLearnDetailError } from "./actions";
import {
    PUSH_SIGNIN
} from '../signin/constants';
import { push } from 'connected-react-router';
import axios from "axios";


const apiGetLearnDetail = async getStateLearnDetail => {
    let userId = await localStorage.getItem("userId");
    let token = await localStorage.getItem("jwtToken");
    if (!token) token = await sessionStorage.getItem("jwtToken");
    let url = `${apiHost.apiUrl}${apiEndPoint.apiGetLearnDetail}${getStateLearnDetail.idLearnDetail}?myUserId=${userId}`;
    let result = await axios({
        method: "GET",
        url: url,
        headers: {
            Authorization: `Bearer ${token}`
        },
        timeout: 100000
    });
    return result;
};

const apiGetVideos = async () => {
    let token = await localStorage.getItem("jwtToken");
    if (!token) token = await sessionStorage.getItem("jwtToken");
    let result = await axios.get(`${apiHost.apiUrl}/${apiEndPoint.apiGetVideos}?offset=0&limit=3&sort=desc`, {
        headers: {
            Authorization: `Bearer ${token}`
        },
        timeout: 10000
    });
    return result;
};


function* getSectionVideo() {
    try {
        const resp = yield call(apiGetVideos);
        const { data, status } = resp;
        if (status === 200) {
            yield put(getVideoSuccess(data.data.listVideos));
        }
    } catch (error) {
        if (error.response && error.response.data.error) {
            yield put(getVideoError(error.response.data));
            if (error.response.status === 401) {
                yield put({ type: PUSH_SIGNIN });
            }
        } else {
            yield put(getVideoError(error));
        }
    }
}

function* getLearnDetail(action) {
    const { resolve, reject } = action;
    try {
        const getStateLearnDetail = yield select(state => state.learnDetail);
        const resp = yield call(apiGetLearnDetail, getStateLearnDetail);
        const { data, status } = resp;
        if (status === 200) {
            yield resolve(data.data.result.postTo);
            yield put(getLearnDetailSuccess(data.data.result));
        }
    } catch (error) {
        yield reject(error);
        if (error.response && error.response.data.error) {
            yield put(getLearnDetailError(error.response.data));
        } else {
            yield put(push("/500"));
            yield put(getLearnDetailError(error));
        }
    }
}

const apiSavePost = async productId => {
    let userId = await localStorage.getItem("userId");
    let token = await localStorage.getItem("jwtToken");
    if (!token) token = await sessionStorage.getItem("jwtToken");
    let result = await axios({
        method: "PUT",
        url: `${apiHost.apiUrl}${apiEndPoint.apiSavePost}/${productId}/update/pin?userId=${userId}`,
        headers: {
            Authorization: `Bearer ${token}`
        },
    });
    return result;
};

function* savePost(action) {
    try {
        let productId = action.productId;
        const resp = yield call(apiSavePost, productId);

    } catch (error) {
        if (error.response && error.response.data.error) {
            if (error.response.status === 401) {
                yield put({ type: PUSH_SIGNIN });
            }
        } else {
            console.log(error);
        }
    }
}
function* getListLearnDetail() {
    yield takeLatest(types.GET_VIDEO_LEARN_DETAIL, getSectionVideo);
    yield takeLatest(types.GET_LEARN_DETAIL_DETAIL, getLearnDetail);
    yield takeLatest(types.SAVE_POST, savePost);
}

export default getListLearnDetail();