import React, { Component } from 'react';
import Form from 'muicss/lib/react/form';
import Input from 'muicss/lib/react/input';
import Button from 'muicss/lib/react/button';
import Container from 'muicss/lib/react/container';

{/* CSS : https://www.muicss.com/docs/v1/react/introduction */}

export default class Login extends React.Component {
    render() {
        return (
            <div>
                <Header/>
                <LoginForm/>
            </div>
        )
    }
}

class Header extends React.Component {
    render(){
        return(
            <div className = "mui--text-center">
                <h1>Hydration Mangager</h1>
                <br/>
            </div>
        )
    }
}

{/* TODO: If only can figure out how to apply css to the Form and the Inputs so that it doesnt strech the entire screen */}
{/* I put the entire thing in a container so it doesn't streach the entire screen*/}

class LoginForm extends React.Component {
    render() {
        return (
            <div className="mui--text-center">
                <Container>
                    <Form className="mui--text-left">
                        <Input label="Email Address" type="email" floatingLabel={true} required={true}/>
                        <Input label="Password" type="password" floatingLabel={true} required={true}/>
                    </Form>
                    <br/>
                    <Button variant="raised">Login</Button>
                    <Button variant="raised">Register</Button>
                    <br/>
                    <Button variant="raised">Forgot Password</Button>
                    <br/>
                    <sub name="tagline">A University of South Carolina Capstone Project</sub>
                </Container>
            </div>
        )
    }
}

/*
class Registration extends React.Component {
    render() {
        return (
            <div className="mui--text-center">
                <Container>
                </Container>
            </div>
        )
    }
}

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