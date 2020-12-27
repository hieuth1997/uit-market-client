import React, { Component } from 'react';
import { compose, bindActionCreators } from "redux";
import { connect } from 'react-redux';
import * as getNewFeedAction from "./../askPage/actions";
import * as appAction from "./../App/actions";
import * as pageAction from "./actions";

import SpinnerModal from "./../../components/SpinnerModal";
import ModalError from "./../../components/modal/modalError";
import ModalChangeProfile from "./../../components/modal/modalChangeProfile";
import './styles.scss';

export class Profile extends Component {
    componentWillMount() {
        if (!localStorage.getItem("jwtToken")) {
            if (!window.sessionStorage.getItem('jwtToken')) {
                this.props.history.push("/signin");
            }
        }
        this.props.appActionCreators.isGetProfile();
        this.props.pageActionCreators.getProfile();
    }

    onClose = () => {
        this.props.pageActionCreators.closeModalError();
    };

    closeModal = () => {
        this.props.pageActionCreators.closeModalChangeProfile();
    };

    handleOpenModal = () => {
        this.props.pageActionCreators.openModalChangeProfile();
    }

    handleChangeProfile = async (data) => {
        await this.props.pageActionCreators.changeProfile(data);
        await this.props.pageActionCreators.getProfile();
    }
    render() {
        const {
            userProfile,
            errors,
            open,
            isLoading,
            openModalChangeProfile,
        } = this.props.profile;

        console.log(userProfile);

        return (
            <div className="profile-detail">
                <div className="info-user">
                    <i className="fas fa-user-circle"></i>
                    <span className="title">Username:  </span>
                    <span className="content">{userProfile.username}</span>
                </div>
                <div className="info-user">
                    <i className="fas fa-user-circle"></i>
                    <span className="title">First Name: </span>
                    <span className="content">{userProfile.firstName}</span>
                </div>
                <div className="info-user">
                    <i className="fas fa-user-circle"></i>
                    <span className="title">Last Name: </span>
                    <span className="content">{userProfile.lastName}</span>
                </div>
                <div className="info-user">
                    <i className="fas fa-user-circle"></i>
                    <span className="title">Gender: </span>
                    <span className="content">{userProfile.gender === 1 ? 'Male' : 'Female'}</span>
                </div>
                <div className="info-user">
                    <i className="fas fa-user-circle"></i>
                    <span className="title">Email: </span>
                    <span className="content">{userProfile.email}</span>
                </div>
                <div className="info-user">
                    <i className="fas fa-user-circle"></i>
                    <span className="title">Phone Number: </span>
                    <span className="content">{userProfile.phoneNumber}</span>
                </div>
                <div className="info-user">
                    <i className="fas fa-user-circle"></i>
                    <span className="title">Address: </span>
                    <span className="content">{userProfile.address}</span>
                </div>
                <div className="change-profile">
                    <button className="btn btn-primary" onClick={this.handleOpenModal}>Change Profile</button>
                </div>

                <ModalError
                    errors={errors}
                    open={open}
                    onClose={this.onClose}
                />

                <SpinnerModal visible={isLoading} />

                <ModalChangeProfile
                    open={openModalChangeProfile}
                    onCloseModal={this.closeModal}
                    changeProfile={(data) => this.handleChangeProfile(data)}
                />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        profile: state.profile,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        appActionCreators: bindActionCreators(appAction, dispatch),
        pageActionCreators: bindActionCreators(pageAction, dispatch),
        getAskPageCreators: bindActionCreators(getNewFeedAction, dispatch),
    }
};

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps
);

export default compose(withConnect)(Profile);
