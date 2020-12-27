import React from "react";
import _ from 'lodash';
import ClassNames from 'classnames';
import * as host from "./../../constants/host";
import { compose, bindActionCreators } from "redux";
import { connect } from 'react-redux';
import * as pageAction from './actions';
import * as commonAction from "./../signin/actions";
import * as getNewFeedAction from "./../askPage/actions";
import * as appAction from "./../App/actions";

import ModalImage from "./../../components/modal/modalImg";
import ListImageCarousel from "./../../components/ListImageCarousel";
import Like from './../../components/like';
import ListComments from "./../../components/listComments";
import ModalVideo from "./../../components/modal/modalVideo";
import ModalError from "./../../components/modal/modalError";
import SpinnerModal from "./../../components/SpinnerModal";

import "./styles.scss";


class learnDetailPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            changeColorIcon: false,
            checkClickLike: false,
            checkLiked: false,
            checkClickComment: false,
            changeColorIconSave: false,
        };
    }

    async componentWillMount() {
        if (!localStorage.getItem("jwtToken")) {
            if (!window.sessionStorage.getItem('jwtToken')) {
                this.props.history.push("/signin");
            }
        }
        await this.props.appActionCreators.isNotGetProfile();
        this.props.getAskPageCreators.getProfile();
        await this.props.pageActionCreators.setIdLearn(this.props.match.params.id);
        await this.props.getLearnDetail()
            .then((result) => {

                if (result.liked) {
                    this.setState({
                        changeColorIcon: !this.state.changeColorIcon,
                        checkLiked: !this.state.checkLiked,
                    })
                } else {
                    this.setState({
                        changeColorIcon: this.state.changeColorIcon,
                        checkLiked: this.state.checkLiked,
                    })
                }

                if (result.pinned) {
                    this.setState({
                        changeColorIconSave: !this.state.changeColorIconSave,
                    })
                } else {
                    this.setState({
                        changeColorIconSave: this.state.changeColorIconSave,
                    })
                }
            })
    }

    nth = (d) => {
        if (d > 3 && d < 21) return 'th';
        switch (d % 10) {
            case 1: return "st";
            case 2: return "nd";
            case 3: return "rd";
            default: return "th";
        }
    }
    formatDate = (date) => {
        var fortnightAway = new Date(date),
            dateFormat = fortnightAway.getDate(),
            monthFormat = ["January", "February", "March", "April", "May", "June", "July",
                "August", "September", "October", "November", "December"][fortnightAway.getMonth()];
        return (dateFormat + this.nth(dateFormat) + " " + monthFormat + ", " + fortnightAway.getFullYear());
    }
    onLikeAsk = async () => {
        this.props.getAskPageCreators.likeAsk(this.props.match.params.id);
        await this.setState({
            changeColorIcon: !this.state.changeColorIcon,
            checkClickLike: !this.state.checkClickLike,
        })
    };
    getComment = () => {
        this.props.getAskPageCreators.getComment(this.props.match.params.id);
        this.setState({
            checkClickComment: !this.state.checkClickComment,
        })
    };

    addCommentPost = comment => {
        this.props.getAskPageCreators.addComment(comment);
    };

    onClose = () => {
        this.props.pageActionCreators.closeModalError();
    };

    onPushLogin = () => {
        this.props.commonActionCreators.pushLogin();
    };

    openModalVideo = (link) => {
        this.props.pageActionCreators.openModalVideo(link);
    };

    closeModalVideo = () => {
        this.props.pageActionCreators.closeModalVideo();
    };

    onCloseModalImg = () => {
        this.props.pageActionCreators.closeModalImage();
    }

    openModalImg = () => {
        this.props.pageActionCreators.openModalImage();
    }

    setLinkImage = (link) => {
        this.props.pageActionCreators.setLinkImage(link);
    }

    savePost = () => {
        this.props.pageActionCreators.savePost(this.props.match.params.id);
        this.setState({
            changeColorIconSave: !this.state.changeColorIconSave,
        })
    }

    render() {
        const {
            learnDetail,
            openModalImage,
            linkImage,
            open,
            errors,
            sectionVideos,
            openVideo,
            linkVideo,
            isLoadsectionVideos,
            isLoadingLearnDetail
        } = this.props.postDetail;

        const {
            askComment,
            userProfile,
        } = this.props.listAsks;

        let date = new Date();
        let userData = learnDetail.userTo;
        if (!_.isUndefined(userData)) {
            userData = learnDetail.userTo;
        } else {
            userData = {
                username: "default",
                firstName: "default",
                lastName: "default",
                phoneNumber: "default",
                active: 0,
                email: "default",
                gender: 0,
                enabled: true,
                address: "default",
                avatar: "default.jpg",
                savePostId: null,
            }
        }

        console.log(learnDetail);

        let numLike = 0;
        if (this.state.checkClickLike) {
            if (this.state.checkLiked) {
                numLike = learnDetail.numberOfLikes - 1;
            } else {
                numLike = learnDetail.numberOfLikes + 1;
            }
        } else {
            numLike = learnDetail.numberOfLikes;
        }

        return (
            <div>
                <div className="container product-detail">
                    <div className="row">
                        <div className="col-sm-8 product-detail-content">
                            <div className="list-image">
                                <ListImageCarousel listImageProduct={learnDetail.productImageTos} />
                            </div>
                            <div className="content-post">
                                <div className="content-item post-title">
                                    <i className="fas fa-address-book"></i>
                                    <span>{learnDetail.title}</span>
                                    <br />
                                </div>
                                <div className=" content-item product-price">
                                    <i className="fas fa-dollar-sign"></i>
                                    <span>{learnDetail.price}</span>
                                </div>
                                <div className="content-item product-content">
                                    <i className="fas fa-address-card"></i>
                                    <span>{learnDetail.content}</span>
                                </div>
                                <div className="content-item">
                                    <i className=" fas fa-phone-alt"></i>
                                    {userData.phoneNumber}
                                </div>
                                <div className="content-item">
                                    <i className="fas fa-map-marker-alt"></i>
                                    {userData.address}
                                </div>
                                {/* <div>
                                    <div className=" content-item status">
                                        <i className="fab fa-accusoft"></i>
                                        Status: <span>{learnDetail.state === 0 ? 'Còn hàng' : 'Hết hàng'}</span>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                        <div className="col-sm-4 product-detail-connection">
                            <div className="item-feed">
                                <div className="head-post">
                                    <div className="avatar-user">
                                        <img src={host.apiUrl + '/product/image/' + userData.avatar} alt="avatar" />
                                    </div>
                                    <div className="head-post-content">
                                        <div className="head-post-name-user">{userData.firstName} {userData.lastName}</div>
                                        <div className="head-post-story-subtitle">
                                            <div className="date"><span className="icon-calendar" />Today, {this.formatDate(date)}</div>

                                        </div>
                                    </div>
                                </div>
                                <div className="footer-post">
                                    <Like disable={true} like={this.state.changeColorIcon} onLikeAsk={this.onLikeAsk} numLike={numLike} />
                                    <div className="ratting" onClick={this.getComment}>
                                        <span className="icon-comment" />
                                        <b>{learnDetail.numberOfComments}</b> Comments
                        </div>
                                    <div className={ClassNames(
                                        'ratting save-post',
                                        this.state.changeColorIconSave && 'save-color',
                                    )} onClick={this.savePost}>
                                        <i className="fas fa-thumbtack"></i>
                                        <span>Save</span>
                                    </div>
                                </div>
                                <ListComments
                                    askComment={askComment}
                                    addComment={this.addCommentPost}
                                    postId={this.props.match.params.id}
                                    avatar={userProfile.avatar}
                                    checkClickComment={this.state.checkClickComment}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <SpinnerModal visible={isLoadingLearnDetail} />

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

                <ModalImage
                    open={openModalImage}
                    onClose={this.onCloseModalImg}
                    img={linkImage}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        postDetail: state.learnDetail,
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
        getLearnDetail: () => {
            return new Promise((resolve, reject) => {
                return dispatch(pageAction.getLearnDetail(resolve, reject));
            });
        },
    }
};

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps
);

export default compose(withConnect)(learnDetailPage);
