import React from 'react';
import  Navigation  from './navigation.jsx';
import { AppRouting } from './appRouting.jsx';
import { BrowserRouter } from 'react-router-dom';

/* Contains the main application */

export const App = () => (
    <BrowserRouter>
        <div>
            <Navigation />
            <div className = "AppContent">
                <AppRouting />
            </div>
        </div>
    </BrowserRouter>
);