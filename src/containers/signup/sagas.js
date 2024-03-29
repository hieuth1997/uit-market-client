import { takeLatest, call, put } from 'redux-saga/effects'
import * as api from "./../../constants/endpoint";
import * as host from "./../../constants/host";
import axios from 'axios';
import { push } from 'connected-react-router'
import {
    SIGNUP_REQUESTING,
    SIGNUP_SUCCESS,
    SIGNUP_ERROR,
    SIGNUP_ERROR_CATCH
} from './constants'

async function signupApi(data) {
    let response = await axios.post(`${host.apiUrl}${api.apiSignup}`, data);
    return response;
};

function* signupFlow(action) {
    try {
        const { data } = action;
        const response = yield call(signupApi, data);
        if(response.status === 200) {
            yield put({ type: SIGNUP_SUCCESS, response });
            yield put(push("/signin"));
        }
    }
    catch (error) {
        if (error.response && error.response.data.error) {
            yield put({ type: SIGNUP_ERROR, error });
        } 
        else {
            yield put({ type: SIGNUP_ERROR_CATCH, error });
        }
    }
}

function* signupWatcher() {
    yield takeLatest(SIGNUP_REQUESTING, signupFlow)
}

export default signupWatcher()
