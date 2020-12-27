import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { reducer as form } from 'redux-form'
import signin from "../containers/signin/reducers";
import signup from "../containers/signup/reducers";
import logout from "../containers/logout/reducers";
import askPage from "./../containers/askPage/reducers";
import learnPage from "./../containers/learnPage/reducers";
import learnDetail from "./../containers/learnDetailPage/reducers";
import appReducer from "../containers/App/reducers";
import post from "./../containers/Post/reducers";
import profile from "./../containers/Profile/reducers";
import save from "./../containers/Save/reducers";

export default history =>
  combineReducers({
    router: connectRouter(history),
    appReducer,
    form,
    signin,
    signup,
    logout,
    askPage,
    learnPage,
    learnDetail,
    post,
    profile,
    save,
  });
