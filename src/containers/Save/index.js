import React from "react";
import _ from 'lodash';
import * as host from "./../../constants/host";
import { compose, bindActionCreators } from "redux";
import { connect } from 'react-redux';
import * as pageAction from './actions';
import * as commonAction from "./../signin/actions";
import * as getNewFeedAction from "./../askPage/actions";
import * as appAction from "./../App/actions";

import ModalError from "./../../components/modal/modalError";
import SpinnerModal from "./../../components/SpinnerModal";

import "./styles.scss";


class Save extends React.Component {
    constructor(props) {
        super(props);
    }

    onClose = () => {
        this.props.pageActionCreators.closeModalError();
    };

    getIdPost = (id) => {
        this.props.history.push(`/learn/${id}`);
    }
    
    async componentWillMount() {
        if (!localStorage.getItem("jwtToken")) {
            if (!window.sessionStorage.getItem('jwtToken')) {
                this.props.history.push("/signin");
            }
        }
        await this.props.appActionCreators.isGetProfile();
        await this.props.pageActionCreators.getSavePost();
    }

    render() {
        const {
            postSave,
            open,
            errors,
            isLoading
        } = this.props.savePost;

        const {
            askComment,
            userProfile,
        } = this.props.listAsks;
        console.log(postSave);

        return (
            <div>
                <div className="container save-detail">
                    <div className="row">
                        <div className="col-sm-10 save-detail-content">
                            {
                                postSave && postSave.map((item, index) => {

                                   return <div className="save-item" key={index}>
                                        <div className="save-item-img">
                                            <img className="save-img" src={host.apiUrl + '/product/image/' + item.banner} alt="post-save" />
                                        </div>
                                        <div className="save-item-content">
                                            <div className="save-item-title"><span>{item.title}</span></div>
                                            <div className="save-item-get-detail" onClick={(id)=>this.getIdPost(item.id)}>
                                                <span className="view-detail">View Detail</span>
                                            </div>
                                        </div>
                                    </div>
                                })
                            }
                        </div>
                    </div>

                </div>
                <div className="col-sm-2 save-detail-connection">

                    <SpinnerModal visible={isLoading} />

                    <ModalError
                        errors={errors}
                        open={open}
                        onClose={this.onClose}
                        pushLogin={this.onPushLogin}
                    />
                </div>
            </div >
        );
    }
}

const mapStateToProps = (state) => {
    return {
        savePost: state.save,
        listAsks: state.askPage,
        signin: state.signin,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        pageActionCreators: bindActionCreators(pageAction, dispatch),
        commonActionCreators: bindActionCreators(commonAction, dispatch),
        getAskPageCreators: bindActionCreators(getNewFeedAction, dispatch),
        appActionCreators: bindActionCreators(appAction, dispatch),
    }
};

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps
);

export default compose(withConnect)(Save);
