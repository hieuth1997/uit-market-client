import React, { Component } from "react";
import { Route, Router } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';

import Signin from "./containers/signin";
import Signup from "./containers/signup";
import Learn from "./containers/learnPage";
import LearnDetail from "./containers/learnDetailPage";
import AskPage from './containers/askPage';
import ErrorPage from "./components/notFound";
import InternalError from "./components/internalError";
import Header from "./components/header";

import * as appAction from "./containers/App/actions";
import { history } from "./redux";

class App extends Component {
  render() {
    const { isGetProfile } = this.props.appReducer;
    console.log(isGetProfile);
    return (
      <Router history={history}>
        <Header history={history} />
        <Learn history={history} />
        <Route path="/signin" exact component={Signin} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/learn/:id" exact component={LearnDetail} />
        <Route path="/" exact component={AskPage} />
        <Route path="/404" exact component={ErrorPage} />
        <Route path="/500" exact component={InternalError} />
      </Router>
    );
  }
}

const mapStateToProps = state => {
  return {
    appReducer: state.appReducer,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    appActionCreators: bindActionCreators(appAction, dispatch)
  };
};

let withConnect = connect(mapStateToProps, mapDispatchToProps)(App);
export default withConnect;
