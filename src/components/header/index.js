import React from 'react';
import { compose, bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import _ from 'lodash';

import * as host from "./../../constants/host";
import * as getLogout from "./../../containers/logout/actions";
import * as appAction from "./../../containers/App/actions";
import './style.scss';

class header extends React.Component {
    handleLogout = (e) => {
        e.preventDefault();
        localStorage.clear();
        sessionStorage.clear();
        this.props.history.push("/signin");
        this.props.signin.isSignInSuccess = false;
        this.props.getLogoutCreators.logout();
    }

    closeModal = () => {
        this.props.onCloseModal();
    }

    handleGetProfile = () => {
        this.props.history.push("/profile");
        this.props.appActionCreators.isGetProfile();
    }

    render() {
        const { userProfile } = this.props;
        console.log(userProfile);
        
        return (
            <div>
                <nav className="navbar navbar-expand-sm navbar-maxdino">
                    <Link to={'/'} className="navbar-brand"><img src="./../assets/images/logo.png" alt="logo" /></Link>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto visible-desktop"><Link to={'/'}>Student Market</Link></ul>
                        <ul className="navbar-nav navbar-noti-img-dropdown d-flex align-items-center visible-desktop">
                            <li className="nav-item nav-noti">
                                <a href="/404"><span className="icon-noti" /></a>
                            </li>
                            <li className="nav-item dropdown nav-img dropleft menu-left-dropdown">
                                <a href="/404" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                                    <img src={ !_.isUndefined(userProfile.avatar)  ? host.apiUrl + '/product/image/' + userProfile.avatar : './assets/images/avatar-df.jpg'} alt="avatar" />
                                    <span className="icon-arrow-down" /></a>
                                <ul className="dropdown-menu menu-user-dropdown">
                                    <li>
                                        <a onClick={this.handleGetProfile}>Profile<i className="fas fa-user-circle ml-auto pull-right"></i>
                                        </a>
                                    </li>
                                    <hr className="hr-menu" />
                                    {/* <li>
                                        <a href="/change-password">Change password<i className="fas fa-exchange-alt ml-auto pull-right"></i></a>
                                    </li> */}
                                    <hr className="hr-menu" />
                                    <li>
                                        <a onClick={e => this.handleLogout(e)}>Logout<i className="fas fa-sign-out-alt ml-auto pull-right"></i></a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        signin: state.signin,
        userProfile: state.askPage.userProfile,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        getLogoutCreators: bindActionCreators(getLogout, dispatch),
        appActionCreators: bindActionCreators(appAction, dispatch),
    };
};
const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withConnect)(header);

