
import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { FormGroup } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { Registration } from './Registration.jsx';


export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.routeToRegistration = this.routeToRegistration.bind(this);
        this.routeToApp = this.routeToApp.bind(this);
        this.verifyUser = this.verifyUser.bind(this);
        this.state = {
            email: '',
            password: '',
        };
    }

    routeToRegistration () {
        window.location = '/registration';
    }

    routeToApp () {
        window.location ='/app/weightEntry';
    }


    verifyUser() {
        event.preventDefault();

        console.log(this.state.email);
        console.log(this.state.password);

        const emailAddr = this.state.email;
        const pswd = this.state.password;

        //var isUser = User.findOne({"email": emailAddr, "password": pswd});

        Meteor.call('verifyUser_MM', emailAddr,pswd, (err,data)=> {

            if(data) {
                this.routeToApp();
            } else {
                Bert.defaults = {hideDelay: 3500};
                Bert.alert('Invalid Email And/Or Password', 'warning', 'growl-top-left', 'fa-warning');
            }
        });
    };

    handleEmail = (e) => {
        e.persist();
        this.setState({ email: e.target.value });
    };

    handlePassword = (e) => {
        e.persist();
        this.setState({ password: e.target.value });
    };

    render() {
        return (
            <div class = "LoginBackGround">
                <div class = "Login">
                    <h1>Hydration Manager</h1>
                    <br/>
                    <FormGroup>
                        <FormControl placeholder='Email' label='email' type='email' onChange={this.handleEmail}/><br/>
                        <FormControl placeholder='Password' label='password' type='password' onChange={this.handlePassword}/>
                    </FormGroup>
                    <div class = "LoginButtons">
                        <Button onClick = {this.verifyUser}>Login</Button>
                        <Button onClick = {this.routeToRegistration}>Register</Button>
                        <br/>
                        {/*TODO: Make forgot password do something */}
                        <Button>Forgot Password</Button>
                    </div>
                    <br/>
                    <p>A University of South Carolina Capstone Project</p>
                </div>
            </div>
        )
    }
}
