import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as postPageAction from "./actions";
import * as commonAction from "./../signin/actions";
import validateInput from '../../validate';

import { PostImage } from "./../../components/postImage";
import SpinnerModal from "./../../components/SpinnerModal";
import ModalError from "./../../components/modal/modalError";
import './styles.scss';

const renderFieldTextarea = ({
    input,
    label,
    type,
    rows,
    placeholder,
    className,
    meta: { touched, error, warning }
}) => (
        <div>
            <label>{label}</label>
            <div>
                <textarea {...input} type={type} rows={rows} placeholder={placeholder} className={className} />
                {touched &&
                    ((error && <span className="validate-error">{error}</span>) ||
                        (warning && <span className="validate-error">{warning}</span>))
                }
            </div>
        </div>
    )

const renderField = ({
    input,
    label,
    type,
    placeholder,
    className,
    meta: { touched, error, warning }
}) => (
        <div>
            <label>{label}</label>
            <div>
                <input {...input} type={type} placeholder={placeholder} className={className} />
                {touched &&
                    ((error && <span className="validate-error">{error}</span>) ||
                        (warning && <span className="validate-error">{warning}</span>))
                }
            </div>
        </div>
    )

export class Post extends Component {
    fileObj = [];
    fileArray = [];

    constructor(props) {
        super(props)
        this.state = {
            singleFile: null,
            multiFile: [null]
        }
    }

    handleChangeSigleFile = (e) => {
        e.preventDefault();
        let files = e.target.files;
        this.setState({
            singleFile: URL.createObjectURL(files[0])
        })
    }

    handleChangeMultiFile = (e) => {
        e.preventDefault();
        this.fileObj.push(e.target.files)
        for (let i = 0; i < this.fileObj[0].length; i++) {
            this.fileArray.push(URL.createObjectURL(this.fileObj[0][i]))
        }
        this.setState({ multiFile: this.fileArray })
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

    addPost = async (values) => {
        const { reset } = this.props;
        await this.props.postStatus(values)
            .then((rs) => {
                if (rs !== '') {
                    reset();
                    this.setState({
                        singleFile: null,
                        multiFile: [null]
                    })
                    this.fileArray = [];
                    this.props.history.push(`/learn/${rs.id}`);
                }
            })
    };

    handleChange = async (e) => {
        e.preventDefault();
        await this.props.postPageCreators.putCategory(e.target.value);
    }

    onClose = () => {
        this.props.postPageCreators.closeModalError();
    };

    componentWillMount() {
        if (!localStorage.getItem("jwtToken")) {
            if (!window.sessionStorage.getItem('jwtToken')) {
                this.props.history.push("/signin");
            }
        }
        this.props.postPageCreators.getCategory();
    }

    render() {
        const {
            category: category = [],
            isLoading,
            errors,
            open,
        } = this.props.postData;

        const {
            submitting,
            handleSubmit,
        } = this.props;

        const {
            userProfile,
        } = this.props.profile;

        var date = new Date();

        return (
            <div className="section section-post">
                <div className="head-post">
                    <div className="avatar-user"><img src='./../assets/images/avatar-male.png' alt="avatar" /></div>
                    <div className="head-post-content">
                        <div className="head-post-name-user">{userProfile.firstName} {userProfile.lastName}</div>
                        <div className="head-post-story-subtitle">
                            <div className="date"><span className="icon-calendar" />Today, {this.formatDate(date)}</div>

                        </div>
                    </div>
                </div>

                <div className="content-post">
                    <form onSubmit={handleSubmit(this.addPost)} enctype="multipart/form-data">
                        <Field
                            className="input-post-content"
                            name="title"
                            type="text"
                            rows="2"
                            placeholder="Title..."
                            component={renderFieldTextarea}
                        />

                        <Field
                            className="input-post-content"
                            name="content"
                            type="text"
                            rows="3"
                            placeholder="Content..."
                            component={renderFieldTextarea}
                        />
                        <div className="select-category">
                            <select name="carlist" form="carform" onChange={this.handleChange}>
                                <option className="label-grey" default selected disabled>Category</option>
                                {
                                    category && category.map((item, index) => {
                                        return <option value={item.id} key={index}>{item.categoryName}</option>
                                    })
                                }
                            </select>
                        </div>

                        <Field
                            className="input-post-price"
                            name="price"
                            type="number"
                            placeholder="Price..."
                            component={renderField}
                        />

                        <div className="footer-post">
                            <div className="row">
                                <div className="col-sm-12 get-banner">
                                    <div className="icon-ask-config" >

                                        <Field
                                            name="bannerFile"
                                            type="file"
                                            component={PostImage}
                                            label={'Banner'}
                                            multiple={false}
                                            handleChange={(e) => this.handleChangeSigleFile(e)}
                                        />
                                    </div>
                                    <div className="img-chosen">
                                        {this.state.singleFile && <img src={this.state.singleFile} alt="sigle file" />}
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-sm-8 get-banner">
                                    <div className="icon-ask-config" >

                                        <Field
                                            name="productImageFiles"
                                            type="file"
                                            component={PostImage}
                                            label={'Image Product'}
                                            multiple={true}
                                            handleChange={(e) => this.handleChangeMultiFile(e)}
                                        />
                                    </div>
                                    <div className="img-chosen">

                                        {(this.fileArray || []).map((url, index) => (
                                            <img src={url} alt="..." key={index} />
                                        ))}
                                    </div>
                                </div>
                                <div className="col-sm-4">

                                    <button className="btn-post-status" action="submit">
                                        POST
                            {
                                            isLoading ?
                                                <div className="loading-post-ask">
                                                    <img className="img-loading-post-ask" src={process.env.PUBLIC_URL + "/images/loading-fff.gif"} alt="loading post ask" />
                                                </div> : null
                                        }
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <SpinnerModal visible={isLoading} />
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
        newFeeds: state.askPage.listAsks,
        postData: state.post,
        profile: state.profile,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        postPageCreators: bindActionCreators(postPageAction, dispatch),
        commonActionCreators: bindActionCreators(commonAction, dispatch),
        postStatus: (values) => {
            return new Promise((resolve, reject) => {
                return dispatch(postPageAction.postStatus(resolve, reject, values));
            });
        },
    };
};

let withConnect = connect(mapStateToProps, mapDispatchToProps)(Post);
export default reduxForm({
    form: 'addPost',
    validate: validateInput,
})(withConnect);
