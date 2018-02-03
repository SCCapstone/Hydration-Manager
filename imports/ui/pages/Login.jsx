import React, { Component } from 'react';
import Form from 'muicss/lib/react/form';
import Input from 'muicss/lib/react/input';
import Button from 'muicss/lib/react/button';
import Container from 'muicss/lib/react/container';
import { Registration } from './Registration.jsx';


{/* CSS : https://www.muicss.com/docs/v1/react/introduction */}


{/* TODO: If only can figure out how to apply css to the Form and the Inputs so that it doesnt strech the entire screen - Justin*/}
{/* I put the entire thing in a container so it doesn't streach the entire screen - Justin*/}

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.routeToRegistration = this.routeToRegistration.bind(this);
        this.routeToApp = this.routeToApp.bind(this);
        this.verifyUser = this.verifyUser.bind(this);
    }

    routeToRegistration () {
       window.location ='/registration';
    }

    routeToApp () {
        window.location ='/app';
    }

    verifyUser() {
      event.preventDefault();

      console.log(this.email.controlEl.value)
      console.log(this.pswd.controlEl.value)

      var emailAddr = this.email.controlEl.value;
      var pswd = this.pswd.controlEl.value;

      {/* var isUser = SiteUser.findOne({"email": emailAddr, "password": pswd}); */}

      Meteor.call('verifyUser_MM', emailAddr,pswd, (err,data)=> {

        if(data) {
          this.routeToApp();
          this.email.controlEl.value = "";
          this.pswd.controlEl.value = "";
        } else {
          Bert.defaults = {hideDelay: 6500}
          Bert.alert('Invalid Email And/Or Password','warning', 'fixed-top', 'fa-warning');
        }
      });
    }

    render() {
        return (
            <div className = "mui--text-center">
                <h1>Hydration Manager</h1>
                <br/>
                <Container>
                    <Form className = "mui--text-left">
                      <Input className= "email" ref={el => {this.email = el;}} label = "Email Address" type = "email" floatingLabel = {true} required = {true} />
                      <Input className = "password" ref={el => {this.pswd = el;}} label = "Password" type = "password" floatingLabel = {true} required = {true} />
                    </Form>
                <Button className= "Login" onClick = {this.verifyUser} variant = "raised" >Login</Button>
                <Button variant = "raised" onClick={this.routeToRegistration}>Register</Button>
                <br/>
                    {/*TODO: Make forgot password do something */}
                <Button variant = "raised">Forgot Password</Button>
                <br/>
                </Container>
                <sub name = "tagline">A University of South Carolina Capstone Project</sub>
            </div>
        )
    }
}
