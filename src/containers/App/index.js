import React, { Component } from 'react'
import { reduxForm } from 'redux-form';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import * as getNewFeedAction from "./actions";
import * as commonAction from "./../signin/actions";
import './styles.scss';

export class App extends Component {
    componentWillMount() {
    }

    render() {
        return (
            <div className="container" >
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
    
    };
};
const mapDispatchToProps = dispatch => {
    return {
        getAskPageCreators: bindActionCreators(getNewFeedAction, dispatch),
        commonActionCreators: bindActionCreators(commonAction, dispatch)
    };
};

let withConnect = connect(mapStateToProps, mapDispatchToProps)(App);
export default reduxForm({
    form: 'signin',
})(withConnect);

