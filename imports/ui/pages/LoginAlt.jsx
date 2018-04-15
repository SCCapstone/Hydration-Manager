// Package Imports
import {Meteor} from 'meteor/meteor';
import React from 'react';
import autoBind from 'react-autobind';
import {FormGroup, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {Bert} from 'meteor/themeteorchef:bert';
import $ from 'jquery';
import 'jquery-validation';

// Custom File Imports

export default class LoginAlt extends React.Component {
    constructor(props) {
        super(props);
        autoBind(this);
    };

    componentDidMount() {
        const component = this;
        $(component.form).validate({
            rules: {
                emailAddress: {required: true, email: true},
                password: {required: true},
            },
            messages: {
                emailAddress: {required: 'Enter email address here.', email: 'Is this email address correct?'},
                password: {required: 'Enter password here.'},
            },
            submitHandler() {
                component.handleSubmit(component.form);
            },
        });
    };

    handleSubmit(form) {
        Meteor.loginWithPassword(form.emailAddress.value, form.password.value, (error) => {
            if (error) {
                Bert.alert(error.reason, 'danger');
            } else {
                Bert.alert('Welcome back!', 'success');
            }
        });
    };

    routeToRegistration() {
        window.location = '/registration';
    };

    render() {
        return (
            <div className="LoginBackGround">
                <div className="Login">
                    <h1>Hydration Manager</h1>
                    <br/>
                    <form ref={form => (this.form = form)} onSubmit={event => event.preventDefault()}>
                        <FormGroup className="email">
                            <input type="email" name="emailAddress" className="form-control"
                                   placeholder="Email Address"/>
                        </FormGroup>
                        <FormGroup className="password">
                            <input type="password" name="password" className="form-control" placeholder="Password"/>
                            <p id="password"><Link to="">Forgot Password?</Link>.</p>
                        </FormGroup>
                        <FormGroup id="LoginButtonContainer">
                            <Button id="LoginButton" type="submit" bsStyle="primary"
                                    className="login">Login</Button><br/>
                            <p>{'Don\'t have an account?'} <Link to="/registration">Sign Up</Link>.</p>
                        </FormGroup>
                    </form>
                </div>
            </div>

        );
    }
}