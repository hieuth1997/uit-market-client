import React, { Component } from 'react';
import './styles.scss';
import ClassNames from 'classnames';
import * as host from "./../../constants/host";
import Like from './../like';
import ListComments from './../listComments';
import { Link } from "react-router-dom";

export class SectionFeed extends Component {
    constructor(props) {
        super(props);
        this.state = {
            changeColorIcon: false,
            checkClickLike: false,
            checkLiked: false,
            changeColorIconSave: false,
        };
    }
    componentWillMount() {
        if (this.props.post.postTo.liked) {
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

        if (this.props.post.postTo.pinned) {
            this.setState({
                changeColorIconSave: !this.state.changeColorIconSave,
            })
        } else {
            this.setState({
                changeColorIconSave: this.state.changeColorIconSave,
            })
        }
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
        await this.props.onLikeAsk(this.props.post.id);
        await this.setState({
            changeColorIcon: !this.state.changeColorIcon,
            checkClickLike: !this.state.checkClickLike,
        })
    };
    handleDeleteAsk = (event) => {
        event.preventDefault();
        this.props.openModalDelete(this.props.post.id);
    }
    handleClickImg = (event) => {
        event.preventDefault();
        this.props.openModalImg();
        this.props.setImage(host.apiUrl + this.props.post.image);
    }

    idPost = (event) => {
        event.preventDefault();
        this.props.getIdPost(this.props.post.id);
    }

    savePost = () => {
        this.props.setSavePost(this.props.post.id);
        this.setState({
            changeColorIconSave: !this.state.changeColorIconSave,
        })
    }

    render() {
        const { post, addComment, editMargin, disable } = this.props;
        let numLike = 0;
        if (this.state.checkClickLike) {
            if (this.state.checkLiked) {
                numLike = post.numberOfLikes - 1;
            } else {
                numLike = post.numberOfLikes + 1;
            }
        } else {
            numLike = post.numberOfLikes;
        }

        return (
            <div className="section section-home feed">
                <div className="post-feed-img" onClick={e => this.idPost(e)}>
                    {
                        post.banner !== null ?
                            <img className="img-content-ask" src={`${host.apiUrl}/product/image/${post.banner}`} alt="feed" /> : ''
                    }
                </div>
                <div className="item-feed">
                    <div className="dropdown">
                        <a href="/" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                            <span className="icon-more" /></a>
                        <ul className="dropdown-menu dropdown-menu-feed">
                            <li><a href="/" onClick={e => this.handleDeleteAsk(e)}>Delete</a></li>
                        </ul>
                    </div>
                    <div className="head-post">
                        <div className="avatar-user"><img className="user-img" src={host.apiUrl + '/product/image/' + post.userTo.avatar} alt="avatar" /></div>
                        <div className="head-post-content">
                            <div className="head-post-name-user">{post.userTo.firstName} {post.userTo.lastName}</div>
                            <div className="head-post-story-subtitle">
                                <div className="date"><span className="icon-calendar" />{this.formatDate(post.createdDate)}</div>

                            </div>
                        </div>
                    </div>
                    <div className="content-post" onClick={e => this.idPost(e)}>
                        <div className="post-feed">
                            <div className="post-feed-content">
                                <div className="post-feed-detail">
                                    {post.title}
                                    <br />
                                </div>
                            </div>
                        </div>
                        <div className="post-feed price">
                            {post.price} đ.
                        </div>
                    </div>
                    <div className="footer-post">
                        <Like disable={disable} like={this.state.changeColorIcon} onLikeAsk={this.onLikeAsk} numLike={numLike} />
                        <div className="ratting" onClick={e => this.idPost(e)}>
                            <span className="icon-comment" />
                            <b>{post.numberOfComments}</b> Comments
                        </div>
                        <div className={ClassNames(
                            'ratting save-post',
                            this.state.changeColorIconSave && 'save-color',
                        )} onClick={this.savePost}>
                            <i className="fas fa-thumbtack"></i>
                            Save
                        </div>
                    </div>
                </div>
                <div className={editMargin}></div>
            </div>
        )
    }
}

export default SectionFeed;
