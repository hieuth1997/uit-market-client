import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import isEmpty from 'lodash/isEmpty';

import * as actions from './actions';
import * as appAction from "./../App/actions";
import * as getNewFeedAction from "./../askPage/actions";

import Eye from '../../components/eye';
import ModalError from "./../../components/modal/modalError";
import './styles.scss';

const validateInput = (values) => {
    const errors = {};

    if (!values.username) {
        errors.username = 'Username is Required';
    } else if (values.username.length > 15) {
        errors.username = 'Must be 15 characters or less';
    }

    if (!values.email) {
        errors.email = 'Email is Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }

    if (isEmpty(values.firstName)) {
        errors.firstName = 'First Name is Required';
    }
    if (isEmpty(values.lastName)) {
        errors.lastName = 'Last Name is required';
    }
    if (isEmpty(values.address)) {
        errors.address = 'Address is required';
    }
    if (isEmpty(values.phoneNumber)) {
        errors.phoneNumber = 'Phone Number is required';
    }
    return errors;
};

const renderField = ({
    input,
    label,
    type,
    placeholder,
    className,
    meta: { touched, error, warning }
}) => (
        <div>
            <label className="label-config">{label}</label>
            <div>
                <input {...input} type={type} placeholder={placeholder} className={className} />
                {touched &&
                    ((error && <span className="validate-error">{error}</span>) ||
                        (warning && <span className="validate-error">{warning}</span>))
                }
            </div>
        </div>
    )

class SignUp extends Component {
    componentWillMount() {
        this.props.appActionCreators.isNotGetProfile();
        this.props.getAskPageCreators.getSchool();
    }
    submit = (values) => {
        const dataSend = { ...values, schoolId: parseInt(this.props.schoolId, 10), gender: parseInt(values.gender, 10) }
        console.log(dataSend);
        this.props.requestSignup(dataSend);
    }
    toggleShow = () => {
        this.props.showPassword();
    }
    toggleReShow = () => {
        this.props.showRePassword();
    }
    toggleCheckBox = () => {
        this.props.checkBox();
    }
    onClose = () => {
        this.props.closeModalError();
    };
    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        // this.validateField(name, value);
    };

    handleChangeSchool = async (e) => {
        e.preventDefault();
        console.log(e.target.value);
        await this.props.pageActionCreators.putSchool(e.target.value);
    }

    render() {
        const {
            open,
            errorsSignUp,
            hidden,
            checkAgr,
            handleSubmit,
            submitting,
            signup: {
                isSignUpRequest,
                isSignUpSuccess
            }
        } = this.props;

        const {
            listSchool: listSchool = [],

        } = this.props.listAsks;

        return (
            <div className="container-fluid container-config">
                <ModalError
                    errors={errorsSignUp}
                    open={open}
                    onClose={this.onClose}
                />
                <div className="row row-config">
                    <div className="col-sm-5 col-config">
                        <div className="img-config">
                            <img src="./assets/images/logo.png" alt="logo" />
                        </div>
                        <form className="form-submit-config" onSubmit={handleSubmit(this.submit)}>
                            <div className="form-group">
                                <Field
                                    className="input-config"
                                    name="username"
                                    type="text"
                                    id="username"
                                    placeholder="User Name"
                                    component={renderField}

                                />
                            </div>
                            <div className="form-group">
                                <Field
                                    className="input-config"
                                    name="email"
                                    type="email"
                                    id="email"
                                    placeholder="Email"
                                    component={renderField}
                                />
                            </div>
                            <div className="form-group form-eye">
                                <Field
                                    className="input-config"
                                    name="password"
                                    type={hidden ? "password" : "text"}
                                    id="password"
                                    placeholder="Password"
                                    component={renderField}
                                />
                                <div className="div-eye" onClick={this.toggleShow}>
                                    <Eye eye={hidden} ></Eye>
                                </div>
                            </div>
                            <div className="form-group">
                                <Field
                                    className="input-config"
                                    name="firstName"
                                    type="text"
                                    id="firstName"
                                    placeholder="First Name"
                                    component={renderField}
                                />
                            </div>
                            <div className="form-group">
                                <Field
                                    className="input-config"
                                    name="lastName"
                                    type="text"
                                    id="lastName"
                                    placeholder="Last Name"
                                    component={renderField}
                                />
                            </div>

                            <div>
                                <label className="label-config-black">Gender</label>
                                <div>
                                    <label className="label-config-white male-config"><Field name="gender" component={"input"} type="radio" value="1" /> Male</label>
                                    <label className="label-config-white"><Field name="gender" component={"input"} type="radio" value="0" /> Female</label>
                                </div>
                            </div>
                            <div className="form-group">
                                <Field
                                    className="input-config"
                                    name="phoneNumber"
                                    type="number"
                                    id="phoneNumber"
                                    placeholder="Phone Number"
                                    component={renderField}
                                />
                            </div>
                            <div className="select-search">
                                <select name="carlist" form="carform" onChange={this.handleChangeSchool}>
                                    <option default selected disabled>School</option>
                                    {
                                        listSchool && listSchool.map((item, index) => {
                                            return <option value={item.id} key={index}>{item.schoolName}</option>
                                        })
                                    }
                                </select>
                            </div>
                            <div className="form-group">
                                <Field
                                    className="input-config"
                                    name="address"
                                    type="text"
                                    id="address"
                                    placeholder="Address"
                                    component={renderField}
                                />
                            </div>

                            <div className="checkbox-remember">
                                <input className="input-config" type="checkbox" id="remember" onClick={this.toggleCheckBox} />
                                <label className="label-config-black" htmlFor="remember">Agree the terms and policy</label>
                            </div>
                            <button className="form-btn-config"
                                action="submit">
                                {isSignUpRequest &&
                                    <div className="loading-post-ask">
                                        Waiting<img className="img-loading-post-ask" src="/images/loading-fff.gif" alt="loading post ask" />
                                    </div>}
                                {!isSignUpRequest && !isSignUpSuccess && <div>Sign Up</div>}
                                {!isSignUpRequest && isSignUpSuccess && <div>Sign Up</div>}
                            </button>
                        </form>
                        <div className="text-bottom-signup">
                            <span className="text-signup-config label-config-white">Do not have an account?</span>
                            <Link to="/signin" className="link-login-config label-config-black">Sign In</Link>
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}
const mapStateToProps = state => {
    return {
        signup: state.signup,
        hidden: state.signup.hidden,
        hiddenRe: state.signup.hiddenRe,
        checkAgr: state.signup.checkAgr,
        formErrors: state.signup.formErrors,
        nameValid: state.signup.nameValid,
        emailValid: state.signup.emailValid,
        passwordValid: state.signup.passwordValid,
        retypePasswordValid: state.signup.retypePasswordValid,
        formValid: state.signup.formValid,
        open: state.signup.open,
        errorsSignUp: state.signup.errorsSignUp,
        schoolId: state.signup.schoolId,

        listAsks: state.askPage,
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        requestSignup: (obj) => {
            dispatch(actions.requestSignup(obj))
        },
        checkBox: () => {
            dispatch(actions.checkBox())
        },
        showPassword: () => {
            dispatch(actions.showPassword())
        },
        showRePassword: () => {
            dispatch(actions.showRePassword())
        },
        getFormErrors: (obj) => {
            dispatch(actions.getFormErrors(obj))
        },
        getNameValid: (obj) => {
            dispatch(actions.getNameValid(obj))
        },
        getEmailValid: (obj) => {
            dispatch(actions.getEmailValid(obj))
        },
        getPasswordValid: (obj) => {
            dispatch(actions.getPasswordValid(obj))
        },
        getRePasswordValid: (obj) => {
            dispatch(actions.getRePasswordValid(obj))
        },
        getFormValid: () => {
            dispatch(actions.getFormValid())
        },
        closeModalError: () => {
            dispatch(actions.closeModalError())
        },
        pageActionCreators: bindActionCreators(actions, dispatch),
        appActionCreators: bindActionCreators(appAction, dispatch),
        getAskPageCreators: bindActionCreators(getNewFeedAction, dispatch),
    }
};
const connected = connect(mapStateToProps, mapDispatchToProps)(SignUp);
export default reduxForm({
    form: 'signup',
    validate: validateInput,
})(connected)
