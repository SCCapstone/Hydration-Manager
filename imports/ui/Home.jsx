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
                <header/>
                <login/>
            </div>
        )
    }
}

class header extends React.Component {
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

class login extends React.Component {
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

class registration extends React.Component {
    render() {
        return (
            <div className="mui--text-center">
                <Container>
                </Container>
            </div>
        )
    }
}

class forgotpassword extends React.Component {
    render() {
        return (
            <div className="mui--text-center">
                <Container>
                </Container>
            </div>
        )
    }
}

class main extends React.Component {
    render() {
        return (
            <div className="mui--text-center">
                <Container>
                </Container>
            </div>
        )
    }
}

class dataentry extends React.Component {
    render() {
        return (
            <div className="mui--text-center">
                <Container>
                </Container>
            </div>
        )
    }
}

class masterreport extends React.Component {
    render() {
        return (
            <div className="mui--text-center">
                <Container>
                </Container>
            </div>
        )
    }
}

class alerts extends React.Component {
    render() {
        return (
            <div className="mui--text-center">
                <Container>
                </Container>
            </div>
        )
    }
}

class athletereport extends React.Component {
    render() {
        return (
            <div className="mui--text-center">
                <Container>
                </Container>
            </div>
        )
    }
}

class teammanagement extends React.Component {
    render() {
        return (
            <div className="mui--text-center">
                <Container>
                </Container>
            </div>
        )
    }
}

class userpermissions extends React.Component {
    render() {
        return (
            <div className="mui--text-center">
                <Container>
                </Container>
            </div>
        )
    }
}