// Package Imports
import React from 'react';
import autoBind from 'react-autobind';
import {Button, FormGroup} from 'react-bootstrap';
import PropTypes from 'prop-types';
import {Meteor} from 'meteor/meteor';
import {Accounts} from 'meteor/accounts-base';
import {Roles} from 'meteor/alanning:roles';
import {withRouter} from 'react-router-dom';
import {Bert} from 'meteor/themeteorchef:bert';
import $ from 'jquery';
import 'jquery-validation';

// Collection(s) & Custom File(s) Imports
//import TextComp from '../components/TextComp/TextComp';

class ForgotPassword extends React.Component {
    constructor(props) {
        super(props);
        autoBind(this);
    };

    /* Routes to Login window */
    routeToLogin() {
        window.location = '/login';
    };

    componentDidMount() {
        const component = this;
        $(component.form).validate({
            rules: {
                emailAddress: {required: true, email: true},
            },
            messages: {
                emailAddress: {required: 'Please enter your email address.', email: 'Is this email address correct?'},
            },
            submitHandler() {
                component.handleSubmit(component.form);
            },
        });
    };

    /* Submits form and sends email*/
    handleSubmit(form) {
        const {history} = this.props;
        Accounts.forgotPassword({email: form.emailAddress.value}, function (e,r){
            if (e) {
                console.log(e.reason);
            }
            else {
                // success
            }
        });
        Bert.defaults = {hideDelay: 3500};
        Bert.alert('Forgot Password Email Sent', 'success', 'growl-top-left', 'fa-info');
        history.push('/login');  //push(path, [state]) - (function) Pushes a new entry onto the history stack
    };

    /* Renders Registration form */
    render() {
        return (
            <div className="RegistrationBackGround">
                <div className="Registration">
                    <h1>Forgot Password</h1>
                    <br/>
                    <form ref={form => (this.form = form)} onSubmit={event => event.preventDefault()}>
                        <FormGroup>
                            <input type="email" name="emailAddress" className="form-control"
                                   placeholder="Email Address"/>
                        </FormGroup>
                        <FormGroup>
                            <br/>
                            <Button id="SubmitButton" type="submit" bsStyle="primary">Send Email</Button>
                            <Button id="BackButton" onClick={this.routeToLogin}>Back</Button>
                        </FormGroup>
                    </form>
                </div>
            </div>
        );
    }
}

ForgotPassword.propTypes = {
    history: PropTypes.object.isRequired,
};
export default withRouter(ForgotPassword);
