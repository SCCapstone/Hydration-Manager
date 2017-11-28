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
    }
    routeToRegistration () {
       window.location ='/registration';
    }
    render() {
        return (
            <div className = "mui--text-center">
                <h1>Hydration Manager</h1>
                <br/>
                <Container>
                    <Form className = "mui--text-left" >
                        <Input label = "Email Address" type = "email" floatingLabel = {true} required = {true} />
                        <Input label = "Password" type = "password" floatingLabel = {true} required = {true} />
                    </Form>
                    <br/>
                    <Button variant = "raised" >Login</Button>
                    {/*<Button variant = "raised"><Link to ='/registration'>Register</Link></Button>*/}
                    {/*The above acomplishes the same thing as a onClick, may have to go back to it for protected links - Justin*/}
                    <Button variant = "raised" onClick={this.routeToRegistration}>Register</Button>
                    <br/>
                    <Button variant = "raised">Forgot Password</Button>
                    <br/>
                    <sub name = "tagline">A University of South Carolina Capstone Project</sub>
                </Container>
            </div>
        )
    }
}

