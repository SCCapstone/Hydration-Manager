import React, { Component } from 'react';
import Form from 'muicss/lib/react/form';
import Input from 'muicss/lib/react/input';
import Button from 'muicss/lib/react/button';
import Container from 'muicss/lib/react/container';


{/*TODO: Add the information to the Database - Justin */}
export default class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.routeToApp = this.routeToApp.bind(this);
    }
    routeToApp () {
        window.location ='/app';
    }
    render() {
        return(
            <div>
                <Container className = "mui--text-left">
                    <h1>Registration</h1>
                    <br/>
                    <Form>
                        <Input label = "Your Name" floatingLabel = {true} required = {true}/>
                        <Input label = "Email Address" type = "email" floatingLabel = {true} required = {true} />
                        <Input label = "Password" type = "password" floatingLabel = {true} required = {true} />
                        <Input label = "Confirm Password" type = "password" floatingLabel = {true} required = {true} />
                    </Form>
                    <br/>
                    <div className = "mui--text-right">
                        <Button variant = "raised" onClick={this.routeToApp}>Create Account</Button>
                    </div>
                </Container>
            </div>
        )
    }
}