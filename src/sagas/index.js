import { all } from "redux-saga/effects";
import onSiginSaga from "./../containers/signin/sagas";
import onSigupSaga from "./../containers/signup/sagas";
import onLogoutSaga from "./../containers/logout/sagas";
import onLearnSaga from "./../containers/learnPage/sagas";
import getAskPage from "./../containers/askPage/sagas";
import learnDetail from "./../containers/learnDetailPage/sagas";
import post from "./../containers/Post/sagas";
import profile from "./../containers/Profile/sagas";
import save from "./../containers/Save/sagas";

function* rootSaga() {
  yield all([
    onLearnSaga,
    getAskPage,
    onSiginSaga,
    onSigupSaga,
    onLogoutSaga,
    learnDetail,
    post,
    profile,
    save,
  ]);
}

export default rootSaga;
