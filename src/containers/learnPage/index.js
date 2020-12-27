import React from "react";
import ClassNames from 'classnames';
import { compose, bindActionCreators } from "redux";
import { Route, Switch, Link } from "react-router-dom";
import { connect } from 'react-redux';
import * as host from "./../../constants/host";
import * as learnPageAction from './actions';
import * as commonAction from "./../signin/actions";
import * as getNewFeedAction from "./../askPage/actions";
import * as appAction from "./../App/actions";
import Profile from './../Profile';
import Post from "./../Post";
import Save from './../Save';
import ModalVideo from "./../../components/modal/modalVideo";
import ModalError from "./../../components/modal/modalError";

import "./styles.scss";


class learnPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            onActiveProfile: true,
            onActivePost: false,
            onActiveSave: false,
        }
    }
    componentWillMount() {
        if (!localStorage.getItem("jwtToken")) {
            if (!window.sessionStorage.getItem('jwtToken')) {
                this.props.history.push("/signin");
            }
        }
        this.props.appActionCreators.isGetProfile();
        this.props.getAskPageCreators.getProfile();
        switch(window.location.pathname){
            case '/profile':{
                this.setState({
                    onActiveProfile: true,
                    onActivePost: false,
                    onActiveSave: false,
                })
                break;
            }
            case '/post-detail':{
                this.setState({
                    onActiveProfile: false,
                    onActivePost: true,
                    onActiveSave: false,
                })
                break;
            }
            case '/save-detail':{
                this.setState({
                    onActiveProfile: false,
                    onActivePost: false,
                    onActiveSave: true,
                })
                break;
            }
        }
    }

    onClose = () => {
        this.props.learnPageActionCreators.closeModalError();
    };

    onPushLogin = () => {
        this.props.commonActionCreators.pushLogin();
    };

    openModalVideo = (link) => {
        this.props.learnPageActionCreators.openModalVideo(link);
    };

    closeModalVideo = () => {
        this.props.learnPageActionCreators.closeModalVideo();
    };

    getIdLearn = (id) => {
        this.props.history.push(`/learn/${id}`);
    }

    clickProfile = () => {
        this.setState({
            onActiveProfile: true,
            onActivePost: false,
            onActiveSave: false,
        })
        this.props.history.push('/profile');
    }
    clickPost = () => {
        this.setState({
            onActiveProfile: false,
            onActivePost: true,
            onActiveSave: false,
        })
        this.props.history.push('/post-detail');
    }
    clickSave = () => {
        this.setState({
            onActiveProfile: false,
            onActivePost: false,
            onActiveSave: true,
        })
        this.props.history.push('/save-detail');
    }
    render() {
        if (localStorage.getItem("jwtToken") || window.sessionStorage.getItem('jwtToken')) {
            this.props.signin.isSignInSuccess = true;
        }
        else {
            this.props.signin.isSignInSuccess = false;
        }
        const { open, errors, sectionVideos, openVideo, linkVideo, isLoadsectionVideos } = this.props;
        const { isGetProfile } = this.props.appReducer;

        const {
            userProfile,
        } = this.props.listAsks;
        return (
            <div className="container profile-page">
                {isGetProfile &&
                    <div className="row">
                        <div className="col-sm-3 profile-nav">
                            <div className="profile-avatar">
                                <div className="avatar">
                                    <img src={host.apiUrl + '/product/image/' + userProfile.avatar} alt="avatar" />
                                </div>
                                <div className="user-name"><span>{userProfile.firstName} {userProfile.lastName}</span></div>
                            </div>
                            <div className="list-tast">
                                <ul>
                                    <li className={ClassNames('list-tast-item', this.state.onActiveProfile && 'list-tast-item-active')} onClick={this.clickProfile}>
                                        <Link to={'/profile'} >
                                            <i className="fas fa-user-circle"></i>
                                            <span>Profile</span>
                                        </Link>
                                    </li>
                                    <li className={ClassNames('list-tast-item', this.state.onActivePost && 'list-tast-item-active')} onClick={this.clickPost}>
                                        <Link to={'/post-detail'} >
                                            <i className="fab fa-product-hunt"></i>
                                            <span>post</span>
                                        </Link>
                                    </li>
                                    <li className={ClassNames('list-tast-item', this.state.onActiveSave && 'list-tast-item-active')} onClick={this.clickSave}>
                                        <Link to={'/save-detail'} >
                                            <i className="fas fa-thumbtack"></i>
                                            <span>save</span>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-sm-9">
                            <div className="profile-content">
                                <Switch>
                                    <Route path="/post-detail" exact component={Post} />
                                    <Route path="/save-detail" exact component={Save} />
                                    <Route path="/profile" exact component={Profile} />
                                </Switch>
                            </div>
                        </div>
                    </div>
                }
                <ModalError
                    errors={errors}
                    open={open}
                    onClose={this.onClose}
                    pushLogin={this.onPushLogin}
                />

                <ModalVideo
                    linkVideo={linkVideo}
                    open={openVideo}
                    onCloseModal={this.closeModalVideo}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        appReducer: state.appReducer,
        learns: state.learnPage.learns,
        open: state.learnPage.open,
        errors: state.learnPage.errors,
        sectionVideos: state.learnPage.sectionVideos,
        openVideo: state.learnPage.openVideo,
        linkVideo: state.learnPage.linkVideo,
        lazyLoading: state.learnPage.lazyLoading,
        signin: state.signin,
        learnDetail: state.learnPage.learnDetail,
        isLoadsectionVideos: state.learnPage.isLoadsectionVideos,

        listAsks: state.askPage,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        appActionCreators: bindActionCreators(appAction, dispatch),
        learnPageActionCreators: bindActionCreators(learnPageAction, dispatch),
        commonActionCreators: bindActionCreators(commonAction, dispatch),
        getAskPageCreators: bindActionCreators(getNewFeedAction, dispatch),
    }
};

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps
);

export default compose(withConnect)(learnPage);
