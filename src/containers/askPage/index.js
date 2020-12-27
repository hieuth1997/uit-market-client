import React, { Component } from 'react'
import { reduxForm } from 'redux-form';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as getNewFeedAction from "./actions";
import * as appAction from "./../App/actions";
import * as pageDetailAction from "./../learnDetailPage/actions";
import SectionNews from './../../components/sectionNews';
import SectionFeed from './../../components/sectionFeed';
import ModalError from "./../../components/modal/modalError";

import './styles.scss';

export class AskPage extends Component {
    constructor(props) {
        super(props);
    }
    componentWillMount() {
        if (!localStorage.getItem("jwtToken")) {
            if (!window.sessionStorage.getItem('jwtToken')) {
                this.props.history.push("/signin");
            }
        }
        this.props.appActionCreators.isNotGetProfile();
        this.props.getAskPageCreators.getProfile();
        this.props.getAskPageCreators.setFetchingData();
        this.props.getAskPageCreators.getNewFeed();
    }
    componentDidMount() {
        this.props.getAskPageCreators.getSchool();
        this.props.getAskPageCreators.getCategory();
    }
    componentDidMount() {
        window.addEventListener('scroll', this.loadOnScroll);
    }
    loadOnScroll = (e) => {
        if (this.props.listAsks.lazyLoading.isFetched) return;
        var el = document.getElementById('ask-is-end');
        var rect = el.getBoundingClientRect();
        var isAtEnd = (
            rect.bottom - 1 <= (window.innerHeight || document.documentElement.clientHeight)
        );
        if (isAtEnd) {
            if (!this.props.listAsks.lazyLoading.isFetching) {
                this.props.getAskPageCreators.getNewFeed();
            }
        }
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.loadOnScroll);
    }
    addComment = async comment => {
        await this.props.getAskPageCreators.addComment(comment);
        await this.props.getAskPageCreators.getConnection();
    };
    getComment = async askId => {
        this.props.getAskPageCreators.getComment(askId);
    };
    onClose = () => {
        this.props.getAskPageCreators.closeModalError();
    };
    openModalVideo = (data) => {
        this.props.getAskPageCreators.openModalVideo(data);
    };
    closeModalVideo = () => {
        this.props.getAskPageCreators.closeModalVideo();
    };
    onLikeAsk = async (data) => {
        await this.props.getAskPageCreators.likeAsk(data);
    };
    openModalDelete = data => {
        this.props.getAskPageCreators.openModalDelete(data);
    };
    closeModalDelete = () => {
        this.props.getAskPageCreators.closeModalDelete();
    };
    argeeDelete = () => {
        this.props.getAskPageCreators.argeeDelete(this.props.idAskDelete);
    };
    onCloseModalImg = () => {
        this.props.getAskPageCreators.closeModalImage();
    }
    setLinkImage = (link) => {
        this.props.getAskPageCreators.setLinkImage(link);
    }
    handleChangeSearch = (e) => {
        this.props.getAskPageCreators.setKeywordSearch(e.target.value);
    }
    handleSubmit = async (event) => {
        event.preventDefault();
        await this.props.getAskPageCreators.getTopSearch();
        await this.props.getAskPageCreators.getNewFeed();
    }
    getIdPost = (id) => {
        this.props.history.push(`/learn/${id}`);
    }
    putSavePost = (productId) => {
        this.props.pageDetailActionCreators.savePost(productId);
    }
    handleChangeSchool = async (e) => {
        e.preventDefault();
        await this.props.getAskPageCreators.filterBySchool(e.target.value);
        await this.props.getAskPageCreators.getNewFeed();
    }
    handleChangeCategory = async (e) => {
        e.preventDefault();
        await this.props.getAskPageCreators.filterByCategory(e.target.value);
        await this.props.getAskPageCreators.getNewFeed();
    }
    handleChangeFilter = async (e) => {
        e.preventDefault();
        await this.props.getAskPageCreators.filterByValue(e.target.value);
        await this.props.getAskPageCreators.getNewFeed();
    }

    render() {
        const {
            listAsks: listAsks = [],
            listSchool: listSchool = [],
            sectionNews: sectionNews = [],
            category: category = [],
            errors,
            open,
            lazyLoading,
        } = this.props.listAsks;

        console.log('list product: ', listAsks);

        return (
            <div className="container" >
                <SectionNews post={sectionNews} />
                <div className="container">
                    <div className="row">
                        <div className="col-sm-2"></div>
                        <div className="col-sm-8">
                            <div className="form-search">
                                <form onSubmit={e => this.handleSubmit(e)} className="form-inline my-2 my-lg-0 d-flex">
                                    <button className="form-button-search" type="button"><span className="icon-search" /></button>
                                    <input
                                        className="form-control mr-sm-2 form-input-search"
                                        onBlur={this.closeModal}
                                        id="inputSearch"
                                        onChange={e => this.handleChangeSearch(e)}
                                        type="search"
                                        placeholder="Search on student market"
                                        aria-label="Search"
                                    />
                                </form>
                            </div>
                            <div className="select-search">
                                <select name="carlist" form="carform" onChange={this.handleChangeSchool}>
                                    <option default selected disabled>School</option>
                                    {
                                        listSchool && listSchool.map((item, index) => {
                                            return <option value={item.id} key={index}>{item.schoolName}</option>
                                        })
                                    }
                                    <option value="0">Not set</option>
                                </select>
                            </div>
                            <div className="group-filter">
                                <div className="category select-search select-50">
                                    <select name="carlist" form="carform" onChange={this.handleChangeCategory}>
                                        <option className="label-grey" default selected disabled>Category</option>
                                        {
                                            category && category.map((item, index) => {
                                                return <option value={item.id} key={index}>{item.categoryName}</option>
                                            })
                                        }
                                        <option value="0">Not set</option>
                                    </select>
                                </div>
                                <div className="select-search select-50">
                                    <select name="carlist" form="carform" onChange={this.handleChangeFilter}>
                                        <option default selected disabled>Filter</option>
                                        <option value="1">Date increases</option>
                                        <option value="2">Date decrease</option>
                                        <option value="3">Price increases</option>
                                        <option value="4">Price decrease</option>
                                        <option value="0">Not set</option>
                                    </select>
                                </div>
                            </div>
                            {
                                listAsks.map((post, index) => {
                                    return <SectionFeed
                                        onLikeAsk={this.onLikeAsk}
                                        addComment={this.addComment}
                                        getComment={this.getComment}
                                        setImage={link => this.setLinkImage(link)}
                                        post={post}
                                        disable={true}
                                        key={index}
                                        getIdPost={id => this.getIdPost(id)}
                                        setSavePost={productId => this.putSavePost(productId)}
                                    />
                                })
                            }
                            {
                                !lazyLoading.isFetched ?
                                    <div id="ask-is-end" className="loading-ask">
                                        <img className="img-loading-ask" src={process.env.PUBLIC_URL + "/images/loading.gif"} alt="loading learn list" />
                                    </div> : null
                            }
                        </div>
                        <div className="col-sm-2">
                            <div className="suggest-login">
                                <div><img src="./assets/images/suggest-login.gif" alt="suggest-login" /></div>
                                <div className="suggest">
                                    <div className="suggest-title"><span>Bạn có sản phẩm cần bán, gia nhập chợ sinh viên ngay!</span></div>
                                    <div className="suggest-btnlogin" onClick={() => {
                                        this.props.history.push('/post-detail');
                                        this.props.appActionCreators.isGetProfile();
                                    }}><span>Rao bán ngay</span></div>
                                    <div className="suggest-signup" onClick={() => this.props.history.push('/signup')}><span>Đăng ký tài khoản</span></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12">

                        </div>
                    </div>
                </div>
                <ModalError
                    errors={errors}
                    open={open}
                    onClose={this.onClose}
                />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        listAsks: state.askPage,
        signin: state.signin,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        getAskPageCreators: bindActionCreators(getNewFeedAction, dispatch),
        appActionCreators: bindActionCreators(appAction, dispatch),
        pageDetailActionCreators: bindActionCreators(pageDetailAction, dispatch),
    };
};

let withConnect = connect(mapStateToProps, mapDispatchToProps)(AskPage);
export default reduxForm({
    form: 'signin',
})(withConnect);

