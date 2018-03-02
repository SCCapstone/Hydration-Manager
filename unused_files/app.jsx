// Package Imports
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

// Custom File Imports
import  Navigation  from './navigation.jsx';
import { AppRouting } from './appRouting.jsx';

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