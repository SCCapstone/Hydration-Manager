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
        //console.log(Meteor.env.MAIL_URL);
        Accounts.forgotPassword({email: form.emailAddress.value}, function (e, r) {
            if (e) {
                Bert.defaults = {hideDelay: 3500};
                Bert.alert(e.reason, 'success', 'growl-top-left', 'fa-info');
            }
            else {
                // success
                Bert.defaults = {hideDelay: 3500};
                Bert.alert('Forgot Password Email Sent', 'success', 'growl-top-left', 'fa-info');
                history.push('/login');  //push(path, [state]) - (function) Pushes a new entry onto the history stack
            }
        });

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
//export MAIL_URL='smtps://postmaster%40sandbox2128a703612c4650830c88f0cb89b932.mailgun.org:127c6297173d29c775e482dc6a500b5c-833f99c3-fe2c07f1@smtp.mailgun.org:587';
