import React, { Component } from 'react';
import Form from 'muicss/lib/react/form';
import Input from 'muicss/lib/react/input';
import Button from 'muicss/lib/react/button';
import Container from 'muicss/lib/react/container';

{/* import {SiteUser} from '../../api/users.jsx' */}

export default class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.routeToLogin = this.routeToLogin.bind(this);
        this.routeToApp = this.routeToRegistration.bind(this);
    }

    routeToLogin () {
        window.location ='/login';
    }
    addSiteUser(event) {
      event.preventDefault();

      var emailAddr = this.email.controlEl.value;
      var pswd = this.pswd.controlEl.value;
      var conf_pswd = this.con_pswd.controlEl.value;

      if (conf_pswd === pswd) {
        {/* addNewSiteUser --> Meteor.method in /server/methods
                               Inserts data into SiteUser collection  -- Jacob  */}
        Meteor.call('addNewSiteUser', emailAddr,pswd, ()=> {
            Bert.defaults = {hideDelay: 4500}
            Bert.alert('Account Created','success', 'fixed-top', 'fa-check');
            this.routeToLogin();
        });
      } else {
        Bert.defaults = {hideDelay: 6500}
        Bert.alert('Password Entries Do NOT Match','danger', 'fixed-top', 'fa-frown-o');
        {/* clear pswd entries */}
        this.pswd.controlEl.value = "";
        this.con_pswd.controlEl.value = ""
      }
    }

    render() {
        return(
            <div>
                <Container className = "mui--text-left">
                    <h1>Registration</h1>
                    <br/>
                    <Form className= "new-siteuser" onSubmit={this.addSiteUser.bind(this)}>
                        <Input ref={el => {this.email = el;}} label = "Email Address" type = "email" floatingLabel = {true} required = {true} />
                        <Input ref={el => {this.pswd = el;}} label = "Password" type = "password" floatingLabel = {true} required = {true} />
                        <Input ref={el => {this.con_pswd = el;}} label = "Confirm Password" type = "password" floatingLabel = {true} required = {true} />
                        <Button variant="raised">Create Account</Button>
                    </Form>
                    <br/>
                </Container>
            </div>
        )
    }
}
