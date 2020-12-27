import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';

import * as homeAction from "./../../../containers/askPage/actions";
import { Modal, Button, Row, Col } from 'react-bootstrap';
import "./styles.scss";

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

export class modalChangeProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            schoolId: '',
        };
    }
    componentWillMount(){
        this.props.pageActionCreators.getSchool();
    }
    handleClose = () => {
        this.props.onCloseModal();
    }

    submit = (values) => {
        const dataSend = { ...values, schoolId: parseInt(this.state.schoolId, 10), gender: parseInt(values.gender, 10) }
        console.log(dataSend);
        this.props.changeProfile(dataSend);
    }

    handleChangeSchool = async (e) => {
        e.preventDefault();
        console.log(e.target.value);
        this.setState({
            schoolId: e.target.value,
        })
    }

    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        console.log(name);

    };
    render() {
        const { open, handleSubmit } = this.props;
        const {listSchool}=this.props.askPages;
        return (
            <div>
                <Modal
                    size="lg"
                    show={open}
                    onHide={this.handleClose}
                    aria-labelledby="example-modal-sizes-title-lg"
                    className="modal-change-profile"
                >
                    <form className="form-submit-config" onSubmit={handleSubmit(this.submit)}>
                        <Modal.Header closeButton className="modal-header">
                            <Modal.Title id="example-modal-sizes-title-lg">Change Profile</Modal.Title>
                        </Modal.Header>
                        <Modal.Body className="modal-body">
                            <Row className="show-grid">
                                <Col xs={12} md={3}>
                                    <code>
                                        <div>Username</div>
                                    </code>
                                </Col>
                                <Col xs={6} md={9}>
                                    <code>
                                        <div>
                                            <Field
                                                className="modal-input-config"
                                                name="username"
                                                type="text"
                                                placeholder="Please input username..."
                                                component={renderField}

                                            />
                                        </div>
                                    </code>
                                </Col>
                            </Row>

                            <Row className="show-grid">
                                <Col xs={12} md={3}>
                                    <code>
                                        <div>First Name</div>
                                    </code>
                                </Col>
                                <Col xs={6} md={9}>
                                    <code>
                                        <div>
                                            <Field
                                                className="modal-input-config"
                                                name="firstName"
                                                type="text"
                                                id="firstName"
                                                placeholder="Please input First Name..."
                                                component={renderField}

                                            />
                                        </div>
                                    </code>
                                </Col>
                            </Row>

                            <Row className="show-grid">
                                <Col xs={12} md={3}>
                                    <code>
                                        <div>Last Name</div>
                                    </code>
                                </Col>
                                <Col xs={6} md={9}>
                                    <code>
                                        <div>
                                            <Field
                                                className="modal-input-config"
                                                name="lastName"
                                                type="text"
                                                id="lastName"
                                                placeholder="Please input Last Name..."
                                                component={renderField}

                                            />
                                        </div>
                                    </code>
                                </Col>
                            </Row>

                            <Row className="show-grid">
                                <Col xs={12} md={3}>
                                    <code>
                                        <div>Email</div>
                                    </code>
                                </Col>
                                <Col xs={6} md={9}>
                                    <code>
                                        <div>
                                            <Field
                                                className="modal-input-config"
                                                name="email"
                                                type="text"
                                                id="email"
                                                placeholder="Please input Email..."

                                                component={renderField}

                                            />
                                        </div>
                                    </code>
                                </Col>
                            </Row>

                            <Row className="show-grid">
                                <Col xs={12} md={3}>
                                    <code>
                                        <div>Phone Number</div>
                                    </code>
                                </Col>
                                <Col xs={6} md={9}>
                                    <code>
                                        <div>
                                            <Field
                                                className="modal-input-config"
                                                name="phoneNumber"
                                                type="text"
                                                id="phoneNumber"
                                                placeholder="Please input Phone Number..."

                                                component={renderField}

                                            />
                                        </div>
                                    </code>
                                </Col>
                            </Row>

                            <Row className="show-grid">
                                <Col xs={12} md={3}>
                                    <code>
                                        <div>Address</div>
                                    </code>
                                </Col>
                                <Col xs={6} md={9}>
                                    <code>
                                        <div>
                                            <Field
                                                className="modal-input-config"
                                                name="address"
                                                type="text"
                                                id="address"
                                                placeholder="Please input Address..."
                                                component={renderField}
                                            />
                                        </div>
                                    </code>
                                </Col>
                            </Row>

                            <Row className="show-grid">
                                <Col xs={12} md={3}>
                                    <code>
                                        <div>Gender</div>
                                    </code>
                                </Col>
                                <Col xs={6} md={9}>
                                    <code>
                                        <div>
                                            <label className="label-config-white male-config"><Field name="gender" component={"input"} type="radio" value="1" /> Male</label>
                                            <label className="label-config-white"><Field name="gender" component={"input"} type="radio" value="0" /> Female</label>
                                        </div>
                                    </code>
                                </Col>
                            </Row>

                            <Row className="show-grid">
                                <Col xs={12} md={3}>
                                    <code>
                                        <div>School</div>
                                    </code>
                                </Col>
                                <Col xs={6} md={9}>
                                    <code>
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
                                    </code>
                                </Col>
                            </Row>
                        </Modal.Body>

                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.handleClose}>Close</Button>
                            <button className="btn btn-primary" action="submit">Save Changes</button>
                        </Modal.Footer>
                    </form>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        askPages: state.askPage,
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        pageActionCreators: bindActionCreators(homeAction, dispatch),
    }
};
const connected = connect(mapStateToProps, mapDispatchToProps)(modalChangeProfile);
export default reduxForm({
    form: 'modalChangeProfile',
    validate: validateInput,
})(connected);
