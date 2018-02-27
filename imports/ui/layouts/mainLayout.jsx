// Package Imports
import React from 'react';
import { Link, Redirect, Route, withRouter } from 'react-router-dom'

// Custom File Imports
import { App } from '../components/app.jsx';
import Login from '../../../unused_files/Login.jsx';
import Registration from '../../../unused_files/Registration.jsx';


/* The idea here is that this mainLayout will be used as a
* security buffer, either directing to login.js or to the application
* based on whether the user is logged in.
*
* Not sure exactly how it would work, but the way I'm thinking
* the '/' route would redirect to either one of these routes based
* on whether or not the user is authenticated. -George
* */

const SendToLogin = () => (
    <Redirect to="/login" />
)

export const MainLayout = () => (
    <div>
        <Route exact path = "/" component={SendToLogin}/>
        <Route path = "/app" component={App}/>
        <Route path = "/login" component={Login}/>
        <Route path = "/registration" component={Registration}/>
    </div>
)