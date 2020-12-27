import React from 'react';

class Like extends React.Component {
    handleClickLike = () => {
        if (this.props.disable) {
            this.props.onLikeAsk();
        }
    }
    render() {
        const { like, numLike } = this.props;
        return (
            <div className="ratting" onClick={this.handleClickLike}>
                {like ?
                    <i className="fas fa-heart fa-heart-color"></i>
                    :
                    <i className="fas fa-heart"></i>
                }
                <b>{numLike}</b> Like
                        </div>
        )
    }
}

export default Like;