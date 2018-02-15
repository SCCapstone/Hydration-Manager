import React from 'react';
import { Header } from './header.jsx';
import { Navigation } from './navigation.jsx';
import { AppRouting } from './appRouting.jsx';
import { BrowserRouter } from 'react-router-dom';

/* Contains the main application */

export const App = () => (
    <BrowserRouter>
        <div>
            <Header />
            <Navigation />
            <AppRouting />
        </div>
    </BrowserRouter>
);