import React, { Component } from 'react';
import './styles.css';
import * as host from "./../../constants/host";

export class AskComment extends Component {
    render() {
        const { listComments } = this.props;
        return (
            <div className="item-ask-comment row">
                <div className="col-sm-1 avatar-comment">
                    <img src={host.apiUrl + '/product/image/' + listComments.userTo.avatar} alt="avatar" />
                </div>
                <div className="item-ask-comment-content col-sm-11">
                    <span className="username-comment">{listComments.userTo.firstName} {listComments.userTo.lastName}</span>
                    <span className="content-comment">{listComments.comment}</span>
                </div>
            </div>
        )
    }
}

export default AskComment;
