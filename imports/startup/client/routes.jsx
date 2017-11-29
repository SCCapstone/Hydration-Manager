import React from 'react';
import { createBrowserHistory } from 'history/createBrowserHistory';
import { BrowserRouter } from 'react-router-dom';
import { MainLayout } from '../../ui/layouts/mainLayout.jsx';

// const browserHistory = createBrowserHistory();

/* Initializes the router.*/

export const renderRoutes = () => (
    <BrowserRouter>
        <MainLayout />
    </BrowserRouter>
)