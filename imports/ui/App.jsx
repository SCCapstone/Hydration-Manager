import React, { Component } from 'react';
import Form from 'muicss/lib/react/form';
import Input from 'muicss/lib/react/input';
import Button from 'muicss/lib/react/button';

{/* CSS : https://www.muicss.com/docs/v1/react/introduction */}

export default class App extends React.Component {
    render() {
        return (
            <div>
                <Header/>
                <Content/>
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
class Content extends React.Component {
    render(){
        return(
            <div className = "mui--text-center" >
                <div>
                    <Form>
                        <Input label = "Email Address" type = "email" floatingLabel = {true} required = {true} />
                        <Input label = "Password" type = "password" floatingLabel = {true} required = {true} />
                    </Form>
                </div>
                <br/>
                <Button variant = "raised">Login</Button>
                <Button variant = "raised">Register</Button>
                <br/>
                <Button variant = "raised">Forgot Password</Button>
                <br/>
                <sub name = "tagline">A University of South Carolina Capstone Project</sub>
            </div>
        )
    }
}

