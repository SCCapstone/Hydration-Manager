import React from 'react';
import createBrowserHistory from 'history/createBrowserHistory';
import { BrowserRouter } from 'react-router-dom';
import { Index } from '../../ui/layouts/index.jsx';
// import { LoginLayout } from '../../ui/layouts/login_layout';

const browserHistory = createBrowserHistory();

export const renderRoutes = () => (
    <BrowserRouter>
        <Index />
    </BrowserRouter>
)