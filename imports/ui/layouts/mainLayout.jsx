import React from 'react';
import { App } from '../components/app.jsx';
import Login from '../pages/Login.jsx';
import Registration from '../pages/Registration.jsx';
import {
    Route,
    Link,
    Redirect,
    withRouter
} from 'react-router-dom'

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