import React, { Component } from 'react';
import Form from 'muicss/lib/react/form';
import Input from 'muicss/lib/react/input';
import Button from 'muicss/lib/react/button';
import Container from 'muicss/lib/react/container';

{/* CSS : https://www.muicss.com/docs/v1/react/introduction */}

export default class Home extends React.Component {
    render() {
        return (
            <div>
                <Login/>
            </div>
        )
    }
}

class Login extends React.Component {
    render() {
        return (
            <div className = "mui--text-center">
                <h1>Hydration Mangager</h1>
                <br/>
                <Container>
                    <Form className = "mui--text-left" >
                        <Input label = "Email Address" type = "email" floatingLabel = {true} required = {true} />
                        <Input label = "Password" type = "password" floatingLabel = {true} required = {true} />
                    </Form>
                    <br/>
                    <Button variant = "raised" >Login</Button>
                    <Button variant = "raised">Register</Button>
                    <br/>
                    <Button variant = "raised">Forgot Password</Button>
                    <br/>
                    <sub name = "tagline">A University of South Carolina Capstone Project</sub>
                </Container>
            </div>
        )
    }
}


class Registration extends React.Component {
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
                        <Button variant = "raised">Create Account</Button>
                    </div>
                </Container>
            </div>
        )
    }
}
/*
class Forgotpassword extends React.Component {
    render() {
        return (
            <div className="mui--text-center">
                <Container>
                </Container>
            </div>
        )
    }
}

class Main extends React.Component {
    render() {
        return (
            <div className="mui--text-center">
                <Container>
                </Container>
            </div>
        )
    }
}

class Dataentry extends React.Component {
    render() {
        return (
            <div className="mui--text-center">
                <Container>
                </Container>
            </div>
        )
    }
}

class Masterreport extends React.Component {
    render() {
        return (
            <div className="mui--text-center">
                <Container>
                </Container>
            </div>
        )
    }
}

class Alerts extends React.Component {
    render() {
        return (
            <div className="mui--text-center">
                <Container>
                </Container>
            </div>
        )
    }
}

class Athletereport extends React.Component {
    render() {
        return (
            <div className="mui--text-center">
                <Container>
                </Container>
            </div>
        )
    }
}

class Teammanagement extends React.Component {
    render() {
        return (
            <div className="mui--text-center">
                <Container>
                </Container>
            </div>
        )
    }
}

class Userpermissions extends React.Component {
    render() {
        return (
            <div className="mui--text-center">
                <Container>
                </Container>
            </div>
        )
    }
}
*/