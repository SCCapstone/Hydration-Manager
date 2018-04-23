import React, { Component } from 'react';
import {Button} from 'react-bootstrap';
import {FormGroup} from 'react-bootstrap';
import {FormControl} from 'react-bootstrap';

export default class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.routeToLogin = this.routeToLogin.bind(this);
        this.addSiteUser = this.addSiteUser.bind(this);
        this.state = {
            email: '',
            password: '',
            passwordConfirm: '',
        };
    }

    routeToLogin () {
        window.location ='/login';
    }

    addSiteUser() {
        event.preventDefault();

        console.log(this.state.email);

        const emailAddr = this.state.email;
        const pswd = this.state.password;
        const conf_pswd = this.state.passwordConfirm;

        console.log(this.state.email);

        if (conf_pswd === pswd && pswd != '') {
            {/* addNewSiteUser --> Meteor.method in /server/methods
                               Inserts data into SiteUser collection  -- Jacob  */}
            Meteor.call('addNewUser', emailAddr,pswd, ()=> {
                Bert.defaults = {hideDelay: 3500};
                Bert.alert('Account Created!','success', 'growl-top-left', 'fa-check');
                this.routeToLogin();
            });
        } else if(emailAddr == '') {
            Bert.defaults = {hideDelay: 3500};
            Bert.alert('Email field must contain a valid email', 'warning', 'growl-top-left', 'fa-warning');
            }
        else{
            Bert.defaults = {hideDelay: 3500};
            Bert.alert('Password Entries Do NOT Match', 'warning', 'growl-top-left', 'fa-warning');
            {/* clear pswd entries */}
            this.state.password = "";
            this.state.passwordConfirm = ""
        }
    }

    handleEmail = (e) => {
        e.persist();
        this.setState({ email: e.target.value });
    };

    handlePassword = (e) => {
        e.persist();
        this.setState({ password: e.target.value });
    };

    handleConfirm = (e) => {
        e.persist();
        this.setState({ passwordConfirm: e.target.value });
    };


    render() {
        return(
            <div class = "RegistrationBackGround">
                <div class = "Registration">
                    <h1>Registration</h1>
                    <br/>
                    <FormGroup>
                        <FormControl placeholder='Email' label='email' type='text' onChange={this.handleEmail}/><br/>
                        <FormControl placeholder='Password' label='password' type='password' onChange={this.handlePassword}/><br/>
                        <FormControl placeholder='Confirm password' label='passwordConfirm' type='password' onChange={this.handleConfirm}/><br/>
                    </FormGroup>
                    <Button onClick={this.addSiteUser}>Create Account</Button>
                </div>
            </div>
        )
    }
}
