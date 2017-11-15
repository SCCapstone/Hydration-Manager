import React from 'react';
import { App } from '../components/app.jsx';
import Login from '../pages/Login.jsx';
import {
    Route,
    Link,
    Redirect,
    withRouter
} from 'react-router-dom'

/* The idea here is that this mainLayout will be used as a
* security buffer, either directing to login or to the application
* based on whether the user is logged in.
*
* Not sure exactly how it would work, but the way I'm thinking
* the '/' route would redirect to either one of these routes based
* on whether or not the user is authenticated. -George
* */
export const MainLayout = () => (
    <div>
        <Route path = "/app" component={App}/>
        <Route path = "/login" component={Login}/>
    </div>
)