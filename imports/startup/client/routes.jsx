import React from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { mount } from 'react-mounter';

import Home from '../../ui/pages/Home.jsx';
import Dashboard from '../../ui/pages/Dashboard.jsx';
import { LoginLayout } from '../../ui/layouts/login_layout';

FlowRouter.notfound = {
    action: mount(LoginLayout, {
        content: <h1>404: Not Found</h1>
    })

}

FlowRouter.route('/', {
    name: 'login',
    action() {
        mount(LoginLayout, {
            content: <Home />
        })
    }
})

FlowRouter.route('/dashboard', {
    name: 'dashboard',
    action () {
        mount(LoginLayout, {
            content: <Dashboard />
        })
    }
})